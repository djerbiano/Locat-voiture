const { handleErrors } = require("../utils/helpers");
const sendMailFromContactPage = require("../mails/contact/sendMailFromContactPage");

const controller = {
  // Contact (user send message without compte from contact page)
  contact: async (req, res) => {
    try {
      const { email, phone, message } = req.body;

      if (!email || !phone || !message) {
        return handleErrors(res, 400, {
          message: "Veuillez renseigner tous les champs",
        });
      }

      // send email
      sendMailFromContactPage(email, phone, message);

      return res
        .status(200)
        .json({ message: "Votre message a bien été envoyé" });
    } catch (error) {
      return handleErrors(res, 400, {
        message: error.message,
      });
    }
  },
};

module.exports = controller;
