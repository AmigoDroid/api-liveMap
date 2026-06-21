import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "../routes/main.route.js";
import config from "../config/config.js";
import { initializeDatabase } from "../database/sync.js";

const porta = config.port;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(router);
//db
initializeDatabase().then(() => {
  app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
  });
}).catch((err) => {
  console.error("Falha ao inicializar banco:", err);
  process.exit(1);
});

app.listen(porta,()=>{
  console.log(`Servidor rodando na porta ${porta}`);
});