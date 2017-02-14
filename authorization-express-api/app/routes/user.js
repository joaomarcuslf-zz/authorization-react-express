'use strict';
const {
  getUsers,
  getUserByUsername,
  updateUserByUsername,
  deleteUserByUsername
} = require('../controllers/userController');

module.exports = function (organization, version, app, middlewares) {
	app.all(`/${organization}/${version}/user*`, middlewares);

  // @route: GET /:organization/:version/login
  app.get(`/${organization}/${version}/user`, getUsers);

  // @route: GET /:organization/:version/login/:username
  app.get(`/${organization}/${version}/user/:username`, getUserByUsername);

  // @route: PUT /:organization/:version/login/:username
  app.put(`/${organization}/${version}/user/:username`, updateUserByUsername);

  // @route: DELETE /:organization/:version/login/:username
  app.delete(`/${organization}/${version}/user/:username`, deleteUserByUsername);
};
