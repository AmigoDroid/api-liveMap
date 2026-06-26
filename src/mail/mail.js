// email.js

export async function enviarEmail({
    para,
    nome = "",
    assunto,
    html,
    texto = ""
}) {
    try {
        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": process.env.BREVO_API_KEY
            },
            body: JSON.stringify({
                sender: {
                    name: "Pronto Delivery",
                    email: "contato@prontodelivery.com.br"
                },
                to: [
                    {
                        email: para,
                        name: nome
                    }
                ],
                subject: assunto,
                htmlContent: html,
                textContent: texto
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(JSON.stringify(data));
        }

        return data;

    } catch (err) {
        console.error("Erro ao enviar email:", err.message);
        throw err;
    }
}