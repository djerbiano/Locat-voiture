const nodemailer = require("nodemailer");

const sendMailCreateCompte = function (Mail) {
  const likeMail = ` 
  <h2>Bienvenue chez Loca-voiture</h2>
  <br/>
  <p>Cher(e) ${Mail},</p>
  <br/>
  <p>Votre compte a bien été créé</p>
  <br/>
  <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
  <br/>
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
      subject: "Loca-voiture ✔",
      text: "Compte creé",
      html: likeMail,
    });
    console.log("Message sent: %s", info.messageId);
  }

  main().catch(console.error);
};

module.exports = sendMailCreateCompte;
