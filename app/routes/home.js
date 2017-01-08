let homeController = require('../controllers/homeController');

module.exports = function (app) {
  // @route: GET /
  app.get('/', function(request, response) {
    homeController.getRoot(request, response);
  });
};
