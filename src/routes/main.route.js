import { Router } from "express";

// Routes
import user from "./user.route.js";
import admin from "./master/admin.route.js";

const router = Router();

// Register routes
router.use("/user", user);
router.use("/admin", admin);

// 404 handler
router.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

export default router;