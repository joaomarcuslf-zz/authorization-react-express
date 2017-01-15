'use strict';
let userController = require('../controllers/userController');

module.exports = function (organization, version, app, middlewares) {
	app.all(`/${organization}/${version}/user*`, middlewares);

  // @route: GET /:organization/:version/login
  app.get(`/${organization}/${version}/user`, userController.getUsers);
};
