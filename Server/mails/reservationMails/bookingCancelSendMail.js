const nodemailer = require("nodemailer");

const bookingCancelSendMail = function (Mail) {
  const likeMail = ` 
  <h3>Cher(e) ${Mail}</h3>
  <br/>
  <p>Votre réservation a bien été annulée</p>
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
      subject: "Réservation annulée",
      text: "Réservation annulée",
      html: likeMail,
    });
    console.log("Message sent: %s", info.messageId);
  }

  main().catch(console.error);
};

module.exports = bookingCancelSendMail;
