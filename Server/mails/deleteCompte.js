const nodemailer = require("nodemailer");

const sendMailDeleteCompte = function (Mail, message) {
  const likeMail = ` 
  <h2>Bonjour,</h2>
  <br/>
  <p>Cher(e) ${Mail},</p>
  <br/>
  <p>${message}</p>
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
      subject: "Compte supprimé",
      text: "Compte supprimé",
      html: likeMail,
    });
    console.log("Message sent: %s", info.messageId);
  }

  main().catch(console.error);
};

module.exports = sendMailDeleteCompte;
