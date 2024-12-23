const nodemailer = require("nodemailer");

const sendMailFromContactPage = function (Mail, phone, message) {
  const likeMail = ` 
  <h2>Bienvenue chez Loca-voiture</h2>
  <br/>
  <p>Bonjour,</p>
  <br/>
  <p>Nous avons bien reçu votre message</p>
  <br/>
  <p>Votre email : ${Mail}</p>
  <br/>
  <p>Votre téléphone : ${phone}</p>
  <br/>
  <p>Vous nous avez envoyé:</p>
  <br/>
  <p>Votre message:</p>
  <br/>
  <p>${message}</p>
  <br/>
  <br/>
  <h3>L'équipe Loca-voiture</h3>
   
    `;
  const userMail = Mail;
  const admin = process.env.MAIL_ADMIN_CONTACT_FORM;
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
      to: `${userMail}, ${admin}`,
      subject: "Nous avons reçu votre message",
      text: "Nous avons reçu votre message",
      html: likeMail,
    });
    console.log("Message sent: %s", info.messageId);
  }

  main().catch(console.error);
};

module.exports = sendMailFromContactPage;
