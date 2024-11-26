const nodemailer = require("nodemailer");

const resetPasswordSendLink = function (Mail, resetLink) {
  const likeMail = ` 
  <p>Bonjour ${Mail},</p>
  <br/>
  <p>Suite à votre demande, vous pouvez changer votre mot de passe en cliquant sur le lien suivant :</p>
  <p>Vous avez 10 minutes pour effectuer le changement</p>
  <br/>
  <a href="${resetLink}">Modifier votre mot de passe</a>
  <br/>
  <p>Si vous n'ête pas à l'origine de cette demande, veuillez ignorer ce mail</p>
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
      subject: "Changement de mot de passe",
      text: "Changement de mot de passe",
      html: likeMail,
    });
    console.log("Message sent: %s", info.messageId);
  }

  main().catch(console.error);
};

module.exports = resetPasswordSendLink;
