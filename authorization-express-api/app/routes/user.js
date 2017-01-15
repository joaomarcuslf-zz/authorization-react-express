'use strict';
let userController = require('../controllers/userController');

module.exports = function (organization, version, app, middlewares) {
	app.all(`/${organization}/${version}/user*`, middlewares);

  // @route: GET /:organization/:version/login
  app.get(`/${organization}/${version}/user`, userController.getUsers);

  // @route: GET /:organization/:version/login/:username
  app.get(`/${organization}/${version}/user/:username`, userController.getUserByUsername);

  // @route: PUT /:organization/:version/login/:username
  app.put(`/${organization}/${version}/user/:username`, userController.updateUserByUsername);

  // @route: DELETE /:organization/:version/login/:username
  app.delete(`/${organization}/${version}/user/:username`, userController.deleteUserByUsername);
};
