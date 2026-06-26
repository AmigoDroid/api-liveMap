// middlewares/masterKey.middleware.js
export function masterKey(req, res, next) {
    if (req.headers["x-master-key"] !== process.env.MASTER_KEY) {
        return res.status(403).json({ success: false, message: "Acesso negado" });
    }
    next();
}