import { EmailParams, MailerSend, Recipient, Sender } from "mailersend";
export async function SendEmail(receiver, receiverName) {
    console.log(process.env.MAILERSEND_DOMAIN);

    const mailerSend = new MailerSend({
        apiKey: `${process.env.MAILERSEND_API_TOKEN}`,
    });

    const sentFrom = new Sender(process.env.MAILERSEND_USERNAME, "Controle de Validade APP");

    const recipients = [
        new Recipient(receiver, receiverName)
    ];
    const nome = receiverName.split(' ')[0]
    console.log(nome);

    const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setReplyTo(sentFrom)
        .setSubject(`Controle de validade APP`)
        .setHtml(`<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alerta de Expiração</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
            text-align: center;
        }
        .alert {
            font-size: 18px;
            font-weight: bold;
            color: red;
            margin-bottom: 20px;
        }
        .btn {
            display: inline-block;
            padding: 12px 20px;
            background: #007BFF;
            color: #ffffff;
            text-decoration: none;
            font-weight: bold;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2 style="color: #333;">Atenção ${nome}! Produtos vencendo em breve</h2>
        <p class="alert">Alguns produtos estão próximos da data de vencimento. Verifique agora para evitar perdas!</p>
        <a href="http://localhost:3000/" class="btn">Ver Produtos</a>
    </div>
</body>
</html>
`)
        .setText("This is the text content");

    await mailerSend.email.send(emailParams);
}
