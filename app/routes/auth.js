let authController = require('../controllers/authController');

module.exports = function (app) {
  // @route: POST /login
  app.post('/login', authController.login);

  // @route: POST /signup
  app.post('/signup', authController.signup);
};
