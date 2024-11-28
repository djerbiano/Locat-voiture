const { User } = require("../models/Users.js");
const { handleErrors } = require("../utils/helpers");
// accès unqiuement au admin

async function isAdmin(req, res, next) {
  const user = await User.findOne({ email: req.user.email });
  if (!user || !user.isAdmin) {
    return handleErrors(res, 403, {
      message: "Vous devez vous connecter avec un compte admin",
    });
  }
  next();
}

module.exports = isAdmin;
