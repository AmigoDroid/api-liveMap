import db from "../models/index.js";

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function provedorDoUsuario(req) {
    return req.usuario.provedorId;
}

function notFound(res, entidade = "Recurso") {
    return res.status(404).json({ success: false, message: `${entidade} não encontrado` });
}

// ─────────────────────────────────────────────
// CTO
// ─────────────────────────────────────────────

export async function listarCTOs(req, res) {
    const provedorId = provedorDoUsuario(req);
    // Filtra por bounding box se enviado: ?minLat=-5&maxLat=-4&minLng=-45&maxLng=-44
    const { minLat, maxLat, minLng, maxLng } = req.query;

    const ctos = await db.CTO.findAll({
        where: { provedorId },
        include: [{ model: db.PortaCTO, as: "portas", attributes: ["id", "numero", "status"] }]
    });

    // Filtra por bbox no JS (simples, sem PostGIS por enquanto)
    let resultado = ctos;
    if (minLat && maxLat && minLng && maxLng) {
        resultado = ctos.filter(c => {
            const loc = c.localizacao;
            if (!loc) return false;
            return loc.lat >= +minLat && loc.lat <= +maxLat &&
                   loc.lng >= +minLng && loc.lng <= +maxLng;
        });
    }

    return res.json({ success: true, total: resultado.length, ctos: resultado });
}

export async function buscarCTO(req, res) {
    const provedorId = provedorDoUsuario(req);
    const cto = await db.CTO.findOne({
        where: { id: req.params.id, provedorId },
        include: [{ model: db.PortaCTO, as: "portas", attributes: ["id", "numero", "status"] }]
    });
    if (!cto) return notFound(res, "CTO");
    return res.json({ success: true, cto });
}

export async function criarCTO(req, res) {
    const provedorId = provedorDoUsuario(req);
    const { codigo, nome, capacidade, status, localizacao } = req.body;

    if (!codigo || !localizacao?.lat || !localizacao?.lng) {
        return res.status(400).json({ success: false, message: "codigo e localizacao (lat, lng) são obrigatórios" });
    }

    const t = await db.sequelize.transaction();
    try {
        const cto = await db.CTO.create(
            { provedorId, codigo, nome, capacidade, status, localizacao },
            { transaction: t }
        );

        // Cria as portas automaticamente conforme a capacidade
        const cap = capacidade || 16;
        const portas = Array.from({ length: cap }, (_, i) => ({
            ctoId: cto.id,
            numero: i + 1,
            status: "LIVRE"
        }));
        await db.PortaCTO.bulkCreate(portas, { transaction: t });

        await t.commit();
        return res.status(201).json({ success: true, cto });
    } catch (err) {
        await t.rollback();
        if (err.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({ success: false, message: "Código de CTO já existe" });
        }
        console.error(err);
        return res.status(500).json({ success: false, message: "Erro interno" });
    }
}

export async function atualizarCTO(req, res) {
    const provedorId = provedorDoUsuario(req);
    const cto = await db.CTO.findOne({ where: { id: req.params.id, provedorId } });
    if (!cto) return notFound(res, "CTO");

    const { nome, status, localizacao, capacidade } = req.body;
    await cto.update({ nome, status, localizacao, capacidade });
    return res.json({ success: true, cto });
}

export async function deletarCTO(req, res) {
    const provedorId = provedorDoUsuario(req);
    const cto = await db.CTO.findOne({ where: { id: req.params.id, provedorId } });
    if (!cto) return notFound(res, "CTO");
    await cto.destroy();
    return res.json({ success: true, message: "CTO removida" });
}

// ─────────────────────────────────────────────
// CABO
// ─────────────────────────────────────────────

export async function listarCabos(req, res) {
    const provedorId = provedorDoUsuario(req);
    const { status, tipo } = req.query;

    const where = { provedorId };
    if (status) where.status = status;
    if (tipo) where.tipo = tipo;

    const cabos = await db.Cabo.findAll({ where });
    return res.json({ success: true, total: cabos.length, cabos });
}

export async function buscarCabo(req, res) {
    const provedorId = provedorDoUsuario(req);
    const cabo = await db.Cabo.findOne({
        where: { id: req.params.id, provedorId },
        include: [{ model: db.PontoCabo, as: "pontos", order: [["ordem", "ASC"]] }]
    });
    if (!cabo) return notFound(res, "Cabo");
    return res.json({ success: true, cabo });
}

export async function criarCabo(req, res) {
    const provedorId = provedorDoUsuario(req);
    const { codigo, tipo, fabricante, quantidadeTubos, quantidadeFibras, status, geometria, pontos } = req.body;

    if (!codigo || !tipo) {
        return res.status(400).json({ success: false, message: "codigo e tipo são obrigatórios" });
    }

    const t = await db.sequelize.transaction();
    try {
        const cabo = await db.Cabo.create(
            { provedorId, codigo, tipo, fabricante, quantidadeTubos, quantidadeFibras, status, geometria },
            { transaction: t }
        );

        // Pontos de passagem do cabo (traçado no mapa)
        if (Array.isArray(pontos) && pontos.length > 0) {
            const pontosCabo = pontos.map((p, i) => ({
                caboId: cabo.id,
                ordem: i,
                localizacao: { lat: p.lat, lng: p.lng }
            }));
            await db.PontoCabo.bulkCreate(pontosCabo, { transaction: t });
        }

        await t.commit();
        return res.status(201).json({ success: true, cabo });
    } catch (err) {
        await t.rollback();
        if (err.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({ success: false, message: "Código de cabo já existe" });
        }
        console.error(err);
        return res.status(500).json({ success: false, message: "Erro interno" });
    }
}

export async function atualizarCabo(req, res) {
    const provedorId = provedorDoUsuario(req);
    const cabo = await db.Cabo.findOne({ where: { id: req.params.id, provedorId } });
    if (!cabo) return notFound(res, "Cabo");

    const { tipo, fabricante, quantidadeTubos, quantidadeFibras, status, geometria } = req.body;
    await cabo.update({ tipo, fabricante, quantidadeTubos, quantidadeFibras, status, geometria });
    return res.json({ success: true, cabo });
}

export async function atualizarTraçadoCabo(req, res) {
    const provedorId = provedorDoUsuario(req);
    const cabo = await db.Cabo.findOne({ where: { id: req.params.id, provedorId } });
    if (!cabo) return notFound(res, "Cabo");

    const { pontos } = req.body; // [{ lat, lng }, ...]
    if (!Array.isArray(pontos)) {
        return res.status(400).json({ success: false, message: "pontos deve ser um array" });
    }

    const t = await db.sequelize.transaction();
    try {
        await db.PontoCabo.destroy({ where: { caboId: cabo.id }, transaction: t });

        const pontosCabo = pontos.map((p, i) => ({
            caboId: cabo.id,
            ordem: i,
            localizacao: { lat: p.lat, lng: p.lng }
        }));
        await db.PontoCabo.bulkCreate(pontosCabo, { transaction: t });
        await t.commit();

        return res.json({ success: true, message: "Traçado atualizado", total: pontos.length });
    } catch (err) {
        await t.rollback();
        console.error(err);
        return res.status(500).json({ success: false, message: "Erro interno" });
    }
}

export async function deletarCabo(req, res) {
    const provedorId = provedorDoUsuario(req);
    const cabo = await db.Cabo.findOne({ where: { id: req.params.id, provedorId } });
    if (!cabo) return notFound(res, "Cabo");
    await cabo.destroy();
    return res.json({ success: true, message: "Cabo removido" });
}

// ─────────────────────────────────────────────
// CAIXA DE EMENDA
// ─────────────────────────────────────────────

export async function listarCaixasEmenda(req, res) {
    const provedorId = provedorDoUsuario(req);
    const caixas = await db.CaixaEmenda.findAll({ where: { provedorId } });
    return res.json({ success: true, total: caixas.length, caixas });
}

export async function buscarCaixaEmenda(req, res) {
    const provedorId = provedorDoUsuario(req);
    const caixa = await db.CaixaEmenda.findOne({ where: { id: req.params.id, provedorId } });
    if (!caixa) return notFound(res, "Caixa de Emenda");
    return res.json({ success: true, caixa });
}

export async function criarCaixaEmenda(req, res) {
    const provedorId = provedorDoUsuario(req);
    const { codigo, tipo, localizacao } = req.body;

    if (!codigo || !tipo || !localizacao?.lat || !localizacao?.lng) {
        return res.status(400).json({ success: false, message: "codigo, tipo e localizacao (lat, lng) são obrigatórios" });
    }

    try {
        const caixa = await db.CaixaEmenda.create({ provedorId, codigo, tipo, localizacao });
        return res.status(201).json({ success: true, caixa });
    } catch (err) {
        if (err.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({ success: false, message: "Código já existe" });
        }
        console.error(err);
        return res.status(500).json({ success: false, message: "Erro interno" });
    }
}

export async function atualizarCaixaEmenda(req, res) {
    const provedorId = provedorDoUsuario(req);
    const caixa = await db.CaixaEmenda.findOne({ where: { id: req.params.id, provedorId } });
    if (!caixa) return notFound(res, "Caixa de Emenda");

    const { tipo, localizacao } = req.body;
    await caixa.update({ tipo, localizacao });
    return res.json({ success: true, caixa });
}

export async function deletarCaixaEmenda(req, res) {
    const provedorId = provedorDoUsuario(req);
    const caixa = await db.CaixaEmenda.findOne({ where: { id: req.params.id, provedorId } });
    if (!caixa) return notFound(res, "Caixa de Emenda");
    await caixa.destroy();
    return res.json({ success: true, message: "Caixa de emenda removida" });
}

// ─────────────────────────────────────────────
// POP
// ─────────────────────────────────────────────

export async function listarPops(req, res) {
    const provedorId = provedorDoUsuario(req);
    const pops = await db.Pop.findAll({ where: { provedorId } });
    return res.json({ success: true, total: pops.length, pops });
}

export async function buscarPop(req, res) {
    const provedorId = provedorDoUsuario(req);
    const pop = await db.Pop.findOne({ where: { id: req.params.id, provedorId } });
    if (!pop) return notFound(res, "Pop");
    return res.json({ success: true, pop });
}

export async function criarPop(req, res) {
    const provedorId = provedorDoUsuario(req);
    const { codigo, nome, endereco, latitude, longitude, status } = req.body;

    if (!nome || !latitude || !longitude) {
        return res.status(400).json({ success: false, message: "nome, latitude e longitude são obrigatórios" });
    }

    try {
        const pop = await db.Pop.create({ provedorId, codigo, nome, endereco, latitude, longitude, status });
        return res.status(201).json({ success: true, pop });
    } catch (err) {
        if (err.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({ success: false, message: "Código de POP já existe" });
        }
        console.error(err);
        return res.status(500).json({ success: false, message: "Erro interno" });
    }
}

export async function atualizarPop(req, res) {
    const provedorId = provedorDoUsuario(req);
    const pop = await db.Pop.findOne({ where: { id: req.params.id, provedorId } });
    if (!pop) return notFound(res, "Pop");

    const { nome, endereco, latitude, longitude, status } = req.body;
    await pop.update({ nome, endereco, latitude, longitude, status });
    return res.json({ success: true, pop });
}

export async function deletarPop(req, res) {
    const provedorId = provedorDoUsuario(req);
    const pop = await db.Pop.findOne({ where: { id: req.params.id, provedorId } });
    if (!pop) return notFound(res, "Pop");
    await pop.destroy();
    return res.json({ success: true, message: "POP removido" });
}

// ─────────────────────────────────────────────
// VISÃO GERAL DO MAPA (tudo de uma vez)
// ─────────────────────────────────────────────

export async function mapaGeral(req, res) {
    const provedorId = provedorDoUsuario(req);

    const [ctos, cabos, caixasEmenda, pops] = await Promise.all([
        db.CTO.findAll({ where: { provedorId }, attributes: ["id", "codigo", "nome", "status", "localizacao", "capacidade"] }),
        db.Cabo.findAll({ where: { provedorId }, attributes: ["id", "codigo", "tipo", "status", "geometria"] }),
        db.CaixaEmenda.findAll({ where: { provedorId }, attributes: ["id", "codigo", "tipo", "localizacao"] }),
        db.Pop.findAll({ where: { provedorId }, attributes: ["id", "codigo", "nome", "status", "latitude", "longitude"] })
    ]);

    return res.json({
        success: true,
        mapa: { ctos, cabos, caixasEmenda, pops }
    });
}
