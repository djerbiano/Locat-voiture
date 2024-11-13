
const controller = {
  // registerUser
  registerUser: async (req, res) => {
    try {
      return res.status(404).send({ test: "test" });
    } catch (error) {
      return handleErrors(res, 400, {
        message: error.message,
      });
    }
  },
};

module.exports = controller;
