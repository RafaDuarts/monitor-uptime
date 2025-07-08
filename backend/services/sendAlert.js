const nodemailer = require("nodemailer");

require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD,
  },
});

function sendAlert(site) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_FROM,
    subject: `🔴 Site fora do ar: ${site.name || site.url}`,
    text: `O site ${site.url} está fora do ar.`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Erro ao enviar alerta:", err);
    } else {
      console.log("📧 Alerta enviado:", info.response);
    }
  });
}

module.exports = sendAlert;
