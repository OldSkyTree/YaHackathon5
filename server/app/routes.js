const users = require('./users');
const axios = require('axios');

const BASE_URL = 'http://localhost:3333';

module.exports = function(app) {
	app.post('/register', function(req, res) {
		const {username, password} = req.body;

		users.registerUser(username, password)
			.then(function (response) {
				let user = response.data.user;
				res.send(user);
			})
			.catch(function (response) {
				const data = response.response.data;
				res.status(response.response.status).send(data);
			});
	});

	app.post('/login', function (req, res) {
		const {username, password} = req.body;

		users.loginUser(username, password)
			.then(function (response) {
				let user = response.data.user;
				res.send(user);
			})
			.catch(function (response) {
				let data = response.response.data;
				res.status(response.response.status).send(data);
			});
	});
    
	app.get('/ping', function (req, res) {
		axios.get(`${BASE_URL}/ping`)
			.then(function (response) {
				res.send(response.data);
			});
	});

	app.get('/online', function(req, res) {
		axios.get(`${BASE_URL}/online`)
			.then(function (response) {
				res.send(response.data);
			});
	});

	app.get('/whoami', function(req, res) {
		
		let token = req.query.token;

		axios.get(`${BASE_URL}/whoami`, {
			params: { token }
		})
			.then(function (response) {
				let user = response.data.user;
				res.send(user);
			})
			.catch(function (response) {
				const data = response.response.data;
				res.status(response.response.status).send(data);
			});
	});
};