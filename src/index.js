import { coreServer } from "./server/server.js";
import NotificationManager from "./mail/NotificationManager.js";
import welcome from "./mail/templates/welcome.js";
coreServer().startServer();
const html = welcome({mensagem:"olá seja bem vindo",botaoLink:"https://maplive.com",botaoTexto:"Acessar Minha Conta"});
NotificationManager.email({para:"canalmeuovo36@gmail.com",nome:"Luciano",texto:"Seja bem vindo",assunto:"Conta criada",mensagem:"f",html:html});