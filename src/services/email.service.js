import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

export async function enviarConviteProvedor({ email, nomeProvedor, linkConvite }) {
    await transporter.sendMail({
        from: `"LiveMap" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `Convite para completar seu cadastro — ${nomeProvedor}`,
        html: `
            <div style="font-family:sans-serif;max-width:520px;margin:auto">
                <h2>Bem-vindo ao LiveMap!</h2>
                <p>Seu provedor <strong>${nomeProvedor}</strong> foi pré-cadastrado.</p>
                <p>Clique no botão abaixo para definir sua senha e ativar o acesso:</p>
                <a href="${linkConvite}"
                   style="display:inline-block;padding:12px 24px;background:#2563eb;color:#fff;border-radius:6px;text-decoration:none;font-weight:bold">
                    Completar cadastro
                </a>
                <p style="color:#888;font-size:12px;margin-top:24px">
                    Este link expira em 48 horas. Se você não solicitou este acesso, ignore este email.
                </p>
            </div>
        `
    });
}

export async function enviarConviteUsuario({ email, nomeProvedor, linkConvite }) {
    await transporter.sendMail({
        from: `"LiveMap" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `Você foi convidado para o LiveMap — ${nomeProvedor}`,
        html: `
            <div style="font-family:sans-serif;max-width:520px;margin:auto">
                <h2>Você foi convidado!</h2>
                <p>Você recebeu um convite para acessar o <strong>LiveMap</strong> do provedor <strong>${nomeProvedor}</strong>.</p>
                <p>Clique abaixo para definir sua senha e ativar seu acesso:</p>
                <a href="${linkConvite}"
                   style="display:inline-block;padding:12px 24px;background:#2563eb;color:#fff;border-radius:6px;text-decoration:none;font-weight:bold">
                    Ativar minha conta
                </a>
                <p style="color:#888;font-size:12px;margin-top:24px">
                    Este link expira em 48 horas.
                </p>
            </div>
        `
    });
}
