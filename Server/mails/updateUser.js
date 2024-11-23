const nodemailer = require("nodemailer");

const updateUser = function (Mail, coordonnées) {
  const likeMail = ` 
  <h2>Bienvenue chez Loca-voiture</h2>
  <br/>
  <p>Cher(e) ${Mail},</p>
  <br/>
  <p>Vos informations ont bien été mise à jour</p>
  <br/>
  <p>Les modifications concernent : ${coordonnées}</p>
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
      text: "Compte mis à jour",
      html: likeMail,
    });
    console.log("Message sent: %s", info.messageId);
  }

  main().catch(console.error);
};

module.exports = updateUser;
