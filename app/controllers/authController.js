class AuthController {

	login(app, request, response) {
		/*
			@params:
				app: object
				request: object
				response: object

			should validate se request body values then
			check if the user exists on the db
			if it exists and is valid, should generate the user token and save on server cache
			if it does not, it should notify with unauthorized
		*/

		let errorsConstants = app.app.constants.error;
		let httpStatus = app.app.constants.httpStatus;
		let cryptHelper = app.app.helpers.cryptoHelper;
		let validationHelper = app.app.helpers.validationHelper;
		let userModel = app.app.models.user;

		let hasErrors = validationHelper.validateFields(
			request.body,
			[
				{ field: 'username', message: 'Username can\'t be empty' },
				{ field: 'password', message: 'Password can\'t be empty' }
			]
		);


		if (hasErrors) {
			response.status(httpStatus.BAD_REQUEST).send(hasErrors);
			return;
		}

		let login = {
			username: request.body.username,
			password: cryptHelper.generatePasswordHash(request.body.password)
		};

		function authorizeSucess(data) {
			let loggedDate = new Date();
			let token = cryptHelper.generateToken(loggedDate.getTime());

			let loggedUser = {
				username: login.username,
				date: loggedDate,
				token: token
			};

			response.status(httpStatus.SUCCESS)
				.send(loggedUser);
		}

		function authorizeError() {
			response.status(httpStatus.UNAUTHORIZED)
				.send({
					error: errorsConstants.UNAUTHORIZED,
					message: errorsConstants.UNAUTHORIZED_MESSAGE
				});
			return;
		}

		userModel.authorize(
			login,
			authorizeSucess,
			authorizeError
		);
	}

	signup(app, request, response) {
		/*
			@params:
				app: object
				request: object
				response: object

			should validate se request body values then
			check if the user exists on the db
			if it exists should notify conflict user
			if it does not, should create the user
		*/

		let errorsConstants = app.app.constants.error;
		let httpStatus = app.app.constants.httpStatus;
		let cryptHelper = app.app.helpers.cryptoHelper;
		let validationHelper = app.app.helpers.validationHelper;
		let userModel = app.app.models.user;

    let hasErrors = validationHelper.validateFields(
			request.body,
			[
				{ field: 'username', message: 'Username can\'t be empty' },
				{ field: 'password', message: 'Password can\'t be empty' },
				{ field: 'email', message: 'E-mail can\'t be empty' },
			]
		);


		if (hasErrors) {
			response.status(httpStatus.BAD_REQUEST).send(hasErrors);
			return;
		}

		let user = {
			'username': request.body.username,
			'password': cryptHelper.generatePasswordHash(request.body.password),
			'email': request.body.email,
			'createdDate': new Date()
		};

		function insertSuccess(data) {
			response.status(httpStatus.SUCCESS)
				.send(data);
		}

		function insertError() {
			response.status(httpStatus.CONFLICT)
				.send({
					error: errorsConstants.CONFLICT,
					message: errorsConstants.CONFLICT_MESSAGE
				});
			return;
		}

		userModel.findUser(
			{ username: user.username },
			insertError, // Conflict User
			() => userModel.insert(user, insertSuccess)
		);
	}
}

module.exports = new AuthController();