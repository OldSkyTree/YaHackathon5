const users = require('./users');
const chat = require('./chat');
const combat = require('./combat');
const axios = require('axios');

// const BASE_URL = 'https://combats-api-ya.herokuapp.com';
const BASE_URL = 'http://localhost:3333';

module.exports = function(app) {
	app.post('/register', function(req, res) {
		const {username, password} = req.body;

		users.updateLocalDB(users.registerUser(username, password), res);
		// returnOriginData(users.registerUser(username, password), res);
	});

	app.post('/login', function (req, res) {
		const {username, password} = req.body;

		users.updateLocalDB(users.loginUser(username, password), res);
		// returnOriginData(users.loginUser(username, password), res);
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
		let { token, timestamp } = req.query;

		returnOriginData(chat.getMessages(token, timestamp), res);
	});

	app.post('/chat', function (req, res) {
		let { token, message, timestamp } = req.body;

		returnOriginData(chat.sendMessage(token, message, timestamp), res);
	});

	app.get('/super-chat', function (req, res) {
		let { token, timestamp, username } = req.query;

		const userRegExp = /^(@\w+)\s/;

		chat.getMessages(token, timestamp).then(function (response) {
			let data = response.data;

			let generalChat = [];
			let privateChats = {};

			if (data && data.status === 'ok') {
				data.chat.forEach(element => {
					const receiver = userRegExp.exec(element.message);
					if (receiver) {
						const receiverName = receiver[1].substring(1);
						element.message = element.message.replace(receiver[0], '');

						if (receiverName === username) {
							pushMessageToDialog(privateChats, element.user.username, element);
						}
						else if (element.user.username === username) {
							pushMessageToDialog(privateChats, receiverName, element);
						}
					}
					else {
						generalChat.push(element);
					}
				});
			}
			res.send({
				status: 'ok',
				generalChat, 
				privateChats 
			});
		}).catch(function (response) {
			const data = response.response.data;
			res.status(response.response.status).send(data);
		});
	});

	app.post('/fight', function (req, res) {
		let { token } = req.body;

		returnOriginData(combat.startFight(token), res);
	});

	app.post('/turn', function (req, res) {
		let { token, combat_id, turn } = req.body;

		returnOriginData(combat.strike(token, combat_id, turn), res);
	});

	app.get('/status', function (req, res) {
		let { token, combat_id } = req.query;

		combat.processCombatResponse(combat.getCombatInfo(token, combat_id), res);
	});

	app.get('/top-player', function (req, res) {
		const { token } = req.query;
		res.send(users.usersRating(token));
	});

	app.get('/log', function(req, res) {
		let {token, combat_id} = req.query;

		var self = combat;
		combat.getCombatInfo(token, combat_id)
			.then(function (response) {
				const data = response.data;
				res.send(data.combat.results.reduce(function(result, current) {
					current.forEach(function(strike) {
						const { hit, blocked, origin, target } = strike;
						const message = self.generateFunnyPhrase(hit, blocked, origin, target);
						result.push({
							message,
							timestamp : origin.last_active,
							user: origin
						});
					});
					return result;
				}, []));
			})
			.catch(function(error) {
				if (error.response) {
					const data = error.response.data;
					res.status(error.response.status).send(data);
				}
				else {
					// eslint-disable-next-line no-console
					console.error('Error:', error);
					res.status(500);
				}
			});
	});
};

const returnOriginData = function (axiosPromise, res) {
	axiosPromise.then(function (response) {
		let data = response.data;
		res.send(data);
	}).catch(function (error) {
		if (error.response) {
			const data = error.response.data;
			res.status(error.response.status).send(data);
		}
		else {
			// eslint-disable-next-line no-console
			console.error('Error:', error);
			res.status(500);
		}
	});
};

const pushMessageToDialog = function(chat, dialog, message) {
	if (!chat[dialog]) {
		chat[dialog] = [];
	}
	chat[dialog].push(message);
};
