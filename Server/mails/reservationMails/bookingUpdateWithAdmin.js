const nodemailer = require("nodemailer");

const bookingUpdateWithAdmin = function (Mail, status) {
  const likeMail = ` 
  <h3>Cher(e) ${Mail}</h3>
  <br/>
  <p>Votre réservation est ${status}</p>
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
      subject: "Mise à jour de votre réservation ",
      text: "Mise à jour de votre réservation ",
      html: likeMail,
    });
    console.log("Message sent: %s", info.messageId);
  }

  main().catch(console.error);
};

module.exports = bookingUpdateWithAdmin;
