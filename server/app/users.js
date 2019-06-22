const axios = require('axios');
const fs = require('fs');

// const BASE_URL = 'https://combats-api-ya.herokuapp.com';
const BASE_URL = 'http://localhost:3333';

module.exports = {
	init: function() {
		if (!this._users) {
			this._users = JSON.parse(
				fs.readFileSync('./server/json/users.json')
			);
		}
	},

	updateLocalDB : function(axiosPromise, res) {
		var self = this;
		axiosPromise.then(function (response) {
			let data = response.data;
			const { id, username } = data.user;
			self.add({
				id,
				username
			});
			self.write();
			res.send(data);
		}).catch(function (response) {
			if (response.response) {
				const data = response.response.data;
				res.status(response.response.status).send(data);
			}
			else {
				// eslint-disable-next-line no-console
				console.error(response);
				res.status(500).send();
			}
		});
	},

	registerUser : function(username, password) {
		return sendPost('register', username, password);
	},

	loginUser : function(username, password) {
		return sendPost('login', username, password);
	},

	usersRating : function() {
		this.init();
		return this._users.reduce(function (result, current) {
			let user = {
				username: current.username ? current.username : current.id,
				winrate: ''
			};
			
			let wins = 0;
			let loses = 0;
			if (!current.combats) {
				return result;
			}
			current.combats.forEach(function (current) {
				switch(current.result) {
				case 'victory':
					wins++; 
					break;
				case 'defeat':
					loses++;
					break;
				case 'draw':
					wins++;
					loses++;
					break;
				default:
					break;
				}
			});
			user.winrate = (wins / (wins + loses)).toFixed(2) * 100;

			result.push(user);
			
			return result;
		}, []).sort((a, b) => {
			return b.winrate - a.winrate;
		});
	},

	addBattle: function(user_id, combat_id, result) {
		let user = this.get(user_id);
		if (!user) {
			this.add({ id: user_id });
			user = this.get(user_id);
		}
		if (!user.combats) user.combats = [];
		user.combats.push({
			id: combat_id,
			result
		});
		this.write();
		return true;
	},

	get: function(id) {
		this.init();

		return this._users.find(function(item) { return item.id === id; });
	},
	
	add: function(user) {
		this.init();

		let existUser = this.get(user.id);
		if (existUser) {
			existUser = Object.assign(existUser, user);
		}
		else {
			this._users.push(user);
		}
	},

	write: function() {
		this.init();
		fs.writeFileSync('./server/json/users.json', JSON.stringify(this._users, null, 4));
	}
};

const formUrlEncoded = x =>
	Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '');

const sendPost = function(endpoint, username, password) {
	return axios({
		method : 'post',
		url : `${BASE_URL}/${endpoint}`,
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		data : formUrlEncoded({
			username,
			password
		}) 
	});
};