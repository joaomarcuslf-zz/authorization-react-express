module.exports = function (app) {
  // @route: GET /
  app.get('/', function(request, response) {
    app.app.controllers.homeController.getRoot(app, request, response);
  });
};
