class HomeController {
	getRoot(app, request, response) {
		response.sendFile('index.html');
	}
}

module.exports = new HomeController();