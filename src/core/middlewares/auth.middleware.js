import jwt from "jsonwebtoken";
import db from "../models/index.js";

export async function autenticar(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // Busca usuário atualizado do banco (permissões sempre frescas, sem novo login)
        const usuario = await db.Usuario.findByPk(payload.id, {
            attributes: ["id", "nome", "email", "permissoes", "status", "provedorId"]
        });

        if (!usuario) {
            return res.status(401).json({ success: false, message: "Usuário não encontrado" });
        }

        if (usuario.status !== "ATIVO") {
            return res.status(403).json({ success: false, message: "Usuário inativo ou pendente" });
        }

        req.usuario = usuario;
        next();

    } catch (err) {
        return res.status(401).json({ success: false, message: "Token inválido ou expirado" });
    }
}

// Middleware de permissão — uso: temPermissao("EDITAR_REDE")
export function temPermissao(...permissoesNecessarias) {
    return (req, res, next) => {
        const permissoesUsuario = req.usuario?.permissoes ?? [];

        const temTodas = permissoesNecessarias.every(p => permissoesUsuario.includes(p));

        if (!temTodas) {
            return res.status(403).json({
                success: false,
                message: "Sem permissão para esta ação",
                necessario: permissoesNecessarias
            });
        }

        next();
    };
}
