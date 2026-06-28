import { coreServer } from "./server/server.js";
import NotificationManager from "./mail/NotificationManager.js";
import welcome from "./mail/templates/welcome.js";
coreServer().startServer();

//estou testando se o e-mail está funcionando, caso esteja funcionando, o e-mail será enviado para o endereço de e-mail informado abaixo.
const html = welcome({mensagem:"olá seja bem vindo",botaoLink:"https://maplive.com",botaoTexto:"Acessar Minha Conta"});
//NotificationManager.email({para:"canalmeuovo36@gmail.com",nome:"Luciano",texto:"Seja bem vindo",assunto:"Conta criada",mensagem:"f",html:html});