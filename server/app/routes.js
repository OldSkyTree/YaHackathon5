const users = require('./users');
const axios = require('axios');

const BASE_URL = 'http://localhost:3333';

module.exports = function(app) {
	app.post('/register', function(req, res) {
		const {username, password} = req.body;

		users.registerUser(username, password)
			.then(function (response) {
				let user = response.data.user;
				res.cookie('token', user.token);
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
				res.cookie('token', user.token);
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
};