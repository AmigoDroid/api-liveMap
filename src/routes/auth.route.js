import { Router } from "express";
import {
    login,
    preCadastrarProvedor,
    cadastrarProvedorCompleto,
    completarCadastro
} from "../controllers/auth.controller.js";

const router = Router();

// Login
router.post("/login", login);

// Completar cadastro via token do email
router.post("/completar-cadastro", completarCadastro);

// Pré-cadastrar provedor (envia email com link)
router.post("/provedor/pre-cadastro", preCadastrarProvedor);

// Cadastro completo do provedor (sem email, já ativa)
router.post("/provedor/cadastro-completo", cadastrarProvedorCompleto);

export default router;
