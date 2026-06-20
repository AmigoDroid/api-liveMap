import { Router } from "express";
const admin = Router();

admin.get("/", (req, res) => {
  res.send("Admin route");
});
export default admin;