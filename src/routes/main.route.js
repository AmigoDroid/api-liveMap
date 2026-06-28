import { Router } from "express";
import authRoutes from "./auth.route.js";
import userRoutes from "./user.route.js";
import adminRoutes from "./master/admin.route.js";
import mapaRoutes from "./mapa.route.js";

const router = Router();

router.use("/auth",     authRoutes);
router.use("/usuarios", userRoutes);
router.use("/admin",    adminRoutes);
router.use("/mapa",     mapaRoutes);

router.use((req, res) => {
    res.status(404).json({ success: false, message: "Rota não encontrada" });
});

export default router;
