'use strict';
const { login, signup } = require('../controllers/authController');

module.exports = function (organization, version, app) {
  // @route: POST /:organization/:version/login
  app.post(`/${organization}/${version}/login`, login);

  // @route: POST /:organization/:version/signup
  app.post(`/${organization}/${version}/signup`, signup);
};
