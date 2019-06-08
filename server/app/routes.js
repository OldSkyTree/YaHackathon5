const users = require('./users');
const chat = require('./chat');
const combat = require('./combat');
const axios = require('axios');

const BASE_URL = 'http://localhost:3333';

module.exports = function(app) {
	app.post('/register', function(req, res) {
		const {username, password} = req.body;

		returnOriginData(users.registerUser(username, password), res);
	});

	app.post('/login', function (req, res) {
		const {username, password} = req.body;

		returnOriginData(users.loginUser(username, password), res);
	});
    
	app.get('/ping', function (req, res) {
		returnOriginData(axios.get(`${BASE_URL}/ping`), res);
	});

	app.get('/online', function(req, res) {
		returnOriginData(axios.get(`${BASE_URL}/online`), res);
	});

	app.get('/whoami', function(req, res) {
		let { token } = req.query;

		returnOriginData(
			axios.get(`${BASE_URL}/whoami`, {
				params: { token }
			}), res);
	});

	app.get('/info', function(req, res) {
		let { token, user_id } = req.query;

		returnOriginData(
			axios.get(`${BASE_URL}/info`, {
				params: { token, user_id }
			}), res);
	});

	app.get('/chat', function (req, res) {
		let { token, timestamp } = req.body;

		returnOriginData(chat.getMessages(token, timestamp), res);
	});

	app.post('/chat', function (req, res) {
		let { token, message, timestamp } = req.body;

		returnOriginData(chat.sendMessage(token, message, timestamp), res);
	});

	app.post('/fight', function (req, res) {
		let { token } = req.body;

		returnOriginData(combat.startFight(token), res);
	});

	app.post('/turn', function (req, res) {
		let { user, combat_id, turn } = req.body;

		returnOriginData(combat.strike(user, combat_id, turn), res);
	});

	app.get('/status', function (req, res) {
		let { token, combat_id } = req.body;

		returnOriginData(combat.getCombatInfo(token, combat_id), res);
	});
};

const returnOriginData = (axiosPromise, res) => {
	axiosPromise.then(function (response) {
		let data = response.data;
		res.send(data);
	}).catch(function (response) {
		const data = response.response.data;
		res.status(response.response.status).send(data);
	});
};