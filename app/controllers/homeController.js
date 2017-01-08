class HomeController {
	getRoot(request, response) {
		response.sendFile('index.html');
	}
}

module.exports = new HomeController();