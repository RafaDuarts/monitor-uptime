const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD,
  },
});

/**
 * Envia alerta de mudança de status do site
 * @param {Object} site - Documento do site
 * @param {string} status - "UP" ou "DOWN"
 */
function sendAlert(site, status) {
  const isDown = status === "DOWN";

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_FROM,
    subject: isDown
      ? `🔴 Site fora do ar: ${site.name || site.url}`
      : `🟢 Site voltou ao ar: ${site.name || site.url}`,
    html: `
      <h2>${site.name || site.url}</h2>
      <p>Status atual: <strong style="color:${isDown ? "red" : "green"}">${status}</strong></p>
      <p>URL: <a href="${site.url}">${site.url}</a></p>
      <p>Data: ${new Date().toLocaleString()}</p>
    `,
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
