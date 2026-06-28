import { Router } from "express";
import { autenticar, temPermissao } from "../middlewares/auth.middleware.js";
import {
    // Visão geral
    mapaGeral,
    // CTO
    listarCTOs, buscarCTO, criarCTO, atualizarCTO, deletarCTO,
    // Cabo
    listarCabos, buscarCabo, criarCabo, atualizarCabo, atualizarTraçadoCabo, deletarCabo,
    // Caixa de Emenda
    listarCaixasEmenda, buscarCaixaEmenda, criarCaixaEmenda, atualizarCaixaEmenda, deletarCaixaEmenda,
    // POP
    listarPops, buscarPop, criarPop, atualizarPop, deletarPop,
} from "../controllers/mapa.controller.js";

const router = Router();

router.use(autenticar);

// ── Visão geral ──────────────────────────────
router.get("/", temPermissao("VER_MAPA"), mapaGeral);

// ── CTO ──────────────────────────────────────
router.get("/cto",          temPermissao("VER_MAPA"),    listarCTOs);
router.get("/cto/:id",      temPermissao("VER_MAPA"),    buscarCTO);
router.post("/cto",         temPermissao("EDITAR_MAPA"), criarCTO);
router.put("/cto/:id",      temPermissao("EDITAR_MAPA"), atualizarCTO);
router.delete("/cto/:id",   temPermissao("EDITAR_MAPA"), deletarCTO);

// ── Cabo ─────────────────────────────────────
router.get("/cabo",              temPermissao("VER_MAPA"),    listarCabos);
router.get("/cabo/:id",          temPermissao("VER_MAPA"),    buscarCabo);
router.post("/cabo",             temPermissao("EDITAR_MAPA"), criarCabo);
router.put("/cabo/:id",          temPermissao("EDITAR_MAPA"), atualizarCabo);
router.put("/cabo/:id/tracado",  temPermissao("EDITAR_MAPA"), atualizarTraçadoCabo);
router.delete("/cabo/:id",       temPermissao("EDITAR_MAPA"), deletarCabo);

// ── Caixa de Emenda ──────────────────────────
router.get("/caixa-emenda",        temPermissao("VER_MAPA"),    listarCaixasEmenda);
router.get("/caixa-emenda/:id",    temPermissao("VER_MAPA"),    buscarCaixaEmenda);
router.post("/caixa-emenda",       temPermissao("EDITAR_MAPA"), criarCaixaEmenda);
router.put("/caixa-emenda/:id",    temPermissao("EDITAR_MAPA"), atualizarCaixaEmenda);
router.delete("/caixa-emenda/:id", temPermissao("EDITAR_MAPA"), deletarCaixaEmenda);

// ── POP ──────────────────────────────────────
router.get("/pop",         temPermissao("VER_MAPA"),    listarPops);
router.get("/pop/:id",     temPermissao("VER_MAPA"),    buscarPop);
router.post("/pop",        temPermissao("EDITAR_MAPA"), criarPop);
router.put("/pop/:id",     temPermissao("EDITAR_MAPA"), atualizarPop);
router.delete("/pop/:id",  temPermissao("EDITAR_MAPA"), deletarPop);

export default router;
