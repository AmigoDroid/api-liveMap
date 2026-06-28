import bcrypt from "bcrypt";
import crypto from "crypto";
import db from "../models/index.js";
import { enviarConviteUsuario } from "../services/email.service.js";

// ─────────────────────────────────────────────
// CONVIDAR USUÁRIO (pré-cadastro simples)
// ─────────────────────────────────────────────
export async function convidarUsuario(req, res) {
    const { email, permissoes = [] } = req.body;
    const { provedorId } = req.usuario; // vem do middleware

    if (!email) {
        return res.status(400).json({ success: false, message: "Email obrigatório" });
    }

    const jaExiste = await db.Usuario.findOne({ where: { email } });
    if (jaExiste) {
        return res.status(409).json({ success: false, message: "Email já cadastrado" });
    }

    const tokenConvite = crypto.randomBytes(32).toString("hex");
    const expira = new Date(Date.now() + 48 * 60 * 60 * 1000);

    const usuario = await db.Usuario.create({
        provedorId,
        email,
        permissoes,
        status: "PENDENTE",
        tokenConvite,
        tokenConviteExpira: expira
    });

    const provedor = await db.Provedor.findByPk(provedorId, { attributes: ["nome"] });
    const linkConvite = `${process.env.APP_URL}/completar-cadastro?token=${tokenConvite}`;
    await enviarConviteUsuario({ email, nomeProvedor: provedor.nome, linkConvite });

    return res.status(201).json({
        success: true,
        message: "Convite enviado",
        usuarioId: usuario.id
    });
}

// ─────────────────────────────────────────────
// CADASTRO COMPLETO DE USUÁRIO (sem convite)
// ─────────────────────────────────────────────
export async function cadastrarUsuario(req, res) {
    const { email, nome, senha, permissoes = [] } = req.body;
    const { provedorId } = req.usuario;

    if (!email || !nome || !senha) {
        return res.status(400).json({ success: false, message: "email, nome e senha são obrigatórios" });
    }

    const jaExiste = await db.Usuario.findOne({ where: { email } });
    if (jaExiste) {
        return res.status(409).json({ success: false, message: "Email já cadastrado" });
    }

    const senhaHash = await bcrypt.hash(senha, 12);

    const usuario = await db.Usuario.create({
        provedorId,
        nome,
        email,
        senhaHash,
        permissoes,
        status: "ATIVO"
    });

    return res.status(201).json({ success: true, usuarioId: usuario.id });
}

// ─────────────────────────────────────────────
// LISTAR USUÁRIOS DO PROVEDOR
// ─────────────────────────────────────────────
export async function listarUsuarios(req, res) {
    const { provedorId } = req.usuario;

    const usuarios = await db.Usuario.findAll({
        where: { provedorId },
        attributes: ["id", "nome", "email", "permissoes", "status", "ultimoLogin", "createdAt"]
    });

    return res.json({ success: true, usuarios });
}

// ─────────────────────────────────────────────
// ATUALIZAR PERMISSÕES (sem novo login necessário)
// ─────────────────────────────────────────────
export async function atualizarPermissoes(req, res) {
    const { id } = req.params;
    const { permissoes } = req.body;
    const { provedorId } = req.usuario;

    if (!Array.isArray(permissoes)) {
        return res.status(400).json({ success: false, message: "permissoes deve ser um array" });
    }

    const usuario = await db.Usuario.findOne({ where: { id, provedorId } });
    if (!usuario) {
        return res.status(404).json({ success: false, message: "Usuário não encontrado" });
    }

    await usuario.update({ permissoes });

    return res.json({
        success: true,
        message: "Permissões atualizadas. Efeito imediato — sem necessidade de novo login.",
        permissoes
    });
}

// ─────────────────────────────────────────────
// ADICIONAR / REMOVER PERMISSÃO INDIVIDUAL
// ─────────────────────────────────────────────
export async function adicionarPermissao(req, res) {
    const { id } = req.params;
    const { permissao } = req.body;
    const { provedorId } = req.usuario;

    const usuario = await db.Usuario.findOne({ where: { id, provedorId } });
    if (!usuario) return res.status(404).json({ success: false, message: "Usuário não encontrado" });

    const novas = [...new Set([...usuario.permissoes, permissao])];
    await usuario.update({ permissoes: novas });

    return res.json({ success: true, permissoes: novas });
}

export async function removerPermissao(req, res) {
    const { id } = req.params;
    const { permissao } = req.body;
    const { provedorId } = req.usuario;

    const usuario = await db.Usuario.findOne({ where: { id, provedorId } });
    if (!usuario) return res.status(404).json({ success: false, message: "Usuário não encontrado" });

    const novas = usuario.permissoes.filter(p => p !== permissao);
    await usuario.update({ permissoes: novas });

    return res.json({ success: true, permissoes: novas });
}

// ─────────────────────────────────────────────
// ATIVAR / INATIVAR USUÁRIO
// ─────────────────────────────────────────────
export async function alterarStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    const { provedorId } = req.usuario;

    if (!["ATIVO", "INATIVO"].includes(status)) {
        return res.status(400).json({ success: false, message: "Status deve ser ATIVO ou INATIVO" });
    }

    const usuario = await db.Usuario.findOne({ where: { id, provedorId } });
    if (!usuario) return res.status(404).json({ success: false, message: "Usuário não encontrado" });

    await usuario.update({ status });
    return res.json({ success: true, status });
}
