const nodemailer = require("nodemailer");

const validationNewPassword = function (Mail) {
  const likeMail = ` 
  <p>Bonjour ${Mail},</p>
  <br/>
  <p>Votre mot de passe a bien été mis à jour</p>
  <br/>
  <br/>
  <h3>L'équipe Loca-voiture</h3>
   
    `;
  const userMail = Mail;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASSWORD,
    },
  });
  async function main() {
    const info = await transporter.sendMail({
      from: '"Loca-voiture 👻" <admin@loca-voiture.com>',
      to: userMail,
      subject: "Compte mis à jour",
      text: "Compte mis à jour",
      html: likeMail,
    });
    console.log("Message sent: %s", info.messageId);
  }

  main().catch(console.error);
};

module.exports = validationNewPassword;
