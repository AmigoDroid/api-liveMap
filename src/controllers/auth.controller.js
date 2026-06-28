import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import db from "../models/index.js";
import { enviarConviteProvedor, enviarConviteUsuario } from "../services/email.service.js";
import { PERMISSOES_ADMIN_PADRAO } from "../config/permissoes.js";

// ─────────────────────────────────────────────
// LOGIN
// ─────────────────────────────────────────────
export async function login(req, res) {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ success: false, message: "Email e senha são obrigatórios" });
    }

    const usuario = await db.Usuario.findOne({ where: { email } });

    if (!usuario || !usuario.senhaHash) {
        return res.status(401).json({ success: false, message: "Credenciais inválidas" });
    }

    if (usuario.status !== "ATIVO") {
        return res.status(403).json({ success: false, message: "Conta pendente ou inativa" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senhaHash);
    if (!senhaValida) {
        return res.status(401).json({ success: false, message: "Credenciais inválidas" });
    }

    // JWT carrega só o id — permissões são sempre buscadas no banco pelo middleware
    const token = jwt.sign(
        { id: usuario.id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "8h" }
    );

    await usuario.update({ ultimoLogin: new Date() });

    return res.json({
        success: true,
        token,
        usuario: {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            permissoes: usuario.permissoes,
            provedorId: usuario.provedorId
        }
    });
}

// ─────────────────────────────────────────────
// PRÉ-CADASTRO DE PROVEDOR (envia convite)
// ─────────────────────────────────────────────
export async function preCadastrarProvedor(req, res) {
    const { nome, email, cnpj, telefone, razaoSocial } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ success: false, message: "Nome e email são obrigatórios" });
    }

    const t = await db.sequelize.transaction();
    try {
        const provedorExistente = await db.Provedor.findOne({ where: { email }, transaction: t });
        if (provedorExistente) {
            await t.rollback();
            return res.status(409).json({ success: false, message: "Provedor já cadastrado com este email" });
        }

        const provedor = await db.Provedor.create(
            { nome, email, cnpj, telefone, razaoSocial, ativo: false },
            { transaction: t }
        );

        const tokenConvite = crypto.randomBytes(32).toString("hex");
        const expira = new Date(Date.now() + 48 * 60 * 60 * 1000); // 48h

        await db.Usuario.create({
            provedorId: provedor.id,
            email,
            permissoes: PERMISSOES_ADMIN_PADRAO,
            status: "PENDENTE",
            tokenConvite,
            tokenConviteExpira: expira
        }, { transaction: t });

        await t.commit();

        const linkConvite = `${process.env.APP_URL}/completar-cadastro?token=${tokenConvite}`;
        await enviarConviteProvedor({ email, nomeProvedor: nome, linkConvite });

        return res.status(201).json({
            success: true,
            message: "Provedor pré-cadastrado. Convite enviado por email.",
            provedorId: provedor.id
        });

    } catch (err) {
        await t.rollback();
        console.error(err);
        return res.status(500).json({ success: false, message: "Erro interno" });
    }
}

// ─────────────────────────────────────────────
// CADASTRO COMPLETO DE PROVEDOR (sem convite)
// ─────────────────────────────────────────────
export async function cadastrarProvedorCompleto(req, res) {
    const { nome, email, cnpj, telefone, razaoSocial, senha, nomeAdmin } = req.body;

    if (!nome || !email || !senha || !nomeAdmin) {
        return res.status(400).json({ success: false, message: "nome, email, senha e nomeAdmin são obrigatórios" });
    }

    const t = await db.sequelize.transaction();
    try {
        const emailExiste = await db.Usuario.findOne({ where: { email }, transaction: t });
        if (emailExiste) {
            await t.rollback();
            return res.status(409).json({ success: false, message: "Email já cadastrado" });
        }

        const provedor = await db.Provedor.create(
            { nome, email, cnpj, telefone, razaoSocial, ativo: true },
            { transaction: t }
        );

        const senhaHash = await bcrypt.hash(senha, 12);

        await db.Usuario.create({
            provedorId: provedor.id,
            nome: nomeAdmin,
            email,
            senhaHash,
            permissoes: PERMISSOES_ADMIN_PADRAO,
            status: "ATIVO"
        }, { transaction: t });

        await t.commit();

        return res.status(201).json({
            success: true,
            message: "Provedor e admin cadastrados com sucesso.",
            provedorId: provedor.id
        });

    } catch (err) {
        await t.rollback();
        console.error(err);
        return res.status(500).json({ success: false, message: "Erro interno" });
    }
}

// ─────────────────────────────────────────────
// COMPLETAR CADASTRO VIA TOKEN (link do email)
// ─────────────────────────────────────────────
export async function completarCadastro(req, res) {
    const { token, nome, senha } = req.body;

    if (!token || !nome || !senha) {
        return res.status(400).json({ success: false, message: "token, nome e senha são obrigatórios" });
    }

    const usuario = await db.Usuario.findOne({ where: { tokenConvite: token } });

    if (!usuario) {
        return res.status(404).json({ success: false, message: "Token inválido" });
    }

    if (new Date() > usuario.tokenConviteExpira) {
        return res.status(410).json({ success: false, message: "Token expirado. Solicite um novo convite." });
    }

    const senhaHash = await bcrypt.hash(senha, 12);

    await usuario.update({
        nome,
        senhaHash,
        status: "ATIVO",
        tokenConvite: null,
        tokenConviteExpira: null
    });

    // Ativa o provedor também
    if (usuario.provedorId) {
        await db.Provedor.update({ ativo: true }, { where: { id: usuario.provedorId } });
    }

    return res.json({ success: true, message: "Cadastro concluído. Você já pode fazer login." });
}
