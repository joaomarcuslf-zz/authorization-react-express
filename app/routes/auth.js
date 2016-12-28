module.exports = function (app) {
  // @route: POST /login
  app.post('/auth', function(request, response) {
    app.app.controllers.authController.login(app, request, response);
  });

  app.post('/user', function (request, response) {
    app.app.controllers.authController.signup(app, request, response);
  });
};
