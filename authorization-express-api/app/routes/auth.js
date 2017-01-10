let authController = require('../controllers/authController');

module.exports = function (organization, version, app) {
  // @route: POST /:organization/:version/login
  app.post(`/${organization}/${version}/login`, authController.login);

  // @route: POST /:organization/:version/signup
  app.post(`/${organization}/${version}/signup`, authController.signup);
};
