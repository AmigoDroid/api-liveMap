import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "../routes/main.route.js";
import config from "../config/config.js";
import {ServerDatabase} from "../database/sync.js";
import NotificationManager from "../mail/NotificationManager.js";

const porta = config.port;
const app = express();
//
app.use(cors());
app.use(bodyParser.json());
app.use(router);
//
export const coreServer = ()=>{

  function startServer() {
    console.log(`iniciando servidor...`);
    
    ServerDatabase().startServer().then(() => {

      app.listen(porta, () => {
        console.log(`Servidor rodando na porta ${porta}`);
      });

  }).catch((error) => {

      console.error("Erro ao iniciar o servidor:", error);
     // process.exit(1);
    });
    //notification manager
    NotificationManager.start();

  }
  return {
    startServer,
  };
}





