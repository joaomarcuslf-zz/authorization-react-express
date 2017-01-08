let authController = require('../controllers/authController');

module.exports = function (app) {
  // @route: POST /login
  app.post('/auth', function(request, response) {
    authController.login(request, response);
  });

  app.post('/user', function (request, response) {
    authController.signup(request, response);
  });
};
