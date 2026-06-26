// sms.js

export async function enviarSMS({
    numero,
    mensagem
}) {
    try {

        const response = await fetch("https://api.brevo.com/v3/transactionalSMS/sms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": process.env.BREVO_API_KEY
            },
            body: JSON.stringify({
                sender: "MinhaEmpresa",
                recipient: numero,
                content: mensagem,
                type: "transactional"
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(JSON.stringify(data));
        }

        return data;

    } catch (err) {
        console.error("Erro ao enviar SMS:", err.message);
        throw err;
    }
}