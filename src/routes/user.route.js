import { Router } from "express";
import { autenticar, temPermissao } from "../middlewares/auth.middleware.js";
import {
    convidarUsuario,
    cadastrarUsuario,
    listarUsuarios,
    atualizarPermissoes,
    adicionarPermissao,
    removerPermissao,
    alterarStatus
} from "../controllers/usuario.controller.js";

const router = Router();

// Todas as rotas abaixo exigem autenticação
router.use(autenticar);

// Listar usuários do provedor
router.get("/", temPermissao("GERENCIAR_USUARIOS"), listarUsuarios);

// Convidar usuário (envia email)
router.post("/convidar", temPermissao("GERENCIAR_USUARIOS"), convidarUsuario);

// Cadastrar usuário completo (sem email)
router.post("/", temPermissao("GERENCIAR_USUARIOS"), cadastrarUsuario);

// Atualizar todas as permissões de uma vez
router.put("/:id/permissoes", temPermissao("GERENCIAR_USUARIOS"), atualizarPermissoes);

// Adicionar / remover permissão individual
router.post("/:id/permissoes/adicionar", temPermissao("GERENCIAR_USUARIOS"), adicionarPermissao);
router.post("/:id/permissoes/remover", temPermissao("GERENCIAR_USUARIOS"), removerPermissao);

// Ativar / inativar
router.patch("/:id/status", temPermissao("GERENCIAR_USUARIOS"), alterarStatus);

export default router;
