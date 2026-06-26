export default function welcome({
    empresa = "MapLive",
    logo = "https://via.placeholder.com/180x60?text=LOGO",
    nome = "Cliente",
    titulo = "Bem-vindo!",
    mensagem = "Sua conta foi criada com sucesso. Agora você já pode acessar todos os recursos da plataforma.",
    botaoTexto = "Acessar Minha Conta",
    botaoLink = "#",
    suporte = "suporte@maplive.com",
    site = "https://maplive.com",
    ano = new Date().getFullYear()
}) {

    return `
<!DOCTYPE html>
<html lang="pt-BR">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>${titulo}</title>

<style>

body{
    margin:0;
    padding:0;
    background:#f4f6f9;
    font-family:Arial,Helvetica,sans-serif;
}

table{
    border-collapse:collapse;
}

.container{
    max-width:650px;
    margin:auto;
    background:#ffffff;
    border-radius:12px;
    overflow:hidden;
}

.header{
    background:#0d6efd;
    padding:40px;
    text-align:center;
}

.header img{
    max-width:180px;
}

.content{
    padding:45px;
}

h1{
    color:#222;
    margin-top:0;
    font-size:30px;
}

p{
    color:#555;
    line-height:1.8;
    font-size:16px;
}

.button{

    display:inline-block;

    padding:16px 34px;

    background:#0d6efd;

    color:#ffffff !important;

    text-decoration:none;

    border-radius:6px;

    font-weight:bold;

    margin-top:25px;

}

.info{

    margin-top:35px;

    padding:20px;

    background:#f8f9fa;

    border-left:5px solid #0d6efd;

    color:#666;

}

.footer{

    background:#f5f5f5;

    padding:30px;

    text-align:center;

    color:#888;

    font-size:13px;

}

.footer a{

    color:#0d6efd;

    text-decoration:none;

}

.social{

    margin-top:20px;

}

.social a{

    margin:0 8px;

    text-decoration:none;

    color:#0d6efd;

}

@media only screen and (max-width:600px){

.content{

padding:25px;

}

.header{

padding:25px;

}

h1{

font-size:24px;

}

.button{

display:block;

text-align:center;

}

}

</style>

</head>

<body>

<table width="100%" bgcolor="#f4f6f9" cellpadding="20">

<tr>

<td>

<table class="container" width="100%">

<tr>

<td class="header">

<img src="${logo}" alt="${empresa}">

</td>

</tr>

<tr>

<td class="content">

<h1>${titulo}</h1>

<p>Olá <strong>${nome}</strong>,</p>

<p>${mensagem}</p>

<center>

<a href="${botaoLink}" class="button">

${botaoTexto}

</a>

</center>

<div class="info">

<strong>O que você pode fazer agora?</strong>

<ul>

<li>✔ Completar seu cadastro</li>

<li>✔ Atualizar seus dados</li>

<li>✔ Explorar os recursos disponíveis</li>

<li>✔ Alterar sua senha quando desejar</li>

<li>✔ Entrar em contato com nosso suporte</li>

</ul>

</div>

<p>

Caso o botão acima não funcione, copie e cole o endereço abaixo no navegador:

</p>

<p>

<a href="${botaoLink}">

${botaoLink}

</a>

</p>

<p>

Se você não reconhece este cadastro, ignore este e-mail.

</p>

</td>

</tr>

<tr>

<td class="footer">

<strong>${empresa}</strong>

<br><br>

Suporte:

<a href="mailto:${suporte}">

${suporte}

</a>

<br><br>

Site:

<a href="${site}">

${site}

</a>

<div class="social">

<a href="#">Facebook</a>

|

<a href="#">Instagram</a>

|

<a href="#">LinkedIn</a>

</div>

<br>

© ${ano} ${empresa}

<br>

Todos os direitos reservados.

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>

</html>
`;

}