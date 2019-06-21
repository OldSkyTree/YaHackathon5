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

	registerUser : function(username, password) {
		return sendPost('register', username, password);
	},

	loginUser : function(username, password) {
		return sendPost('login', username, password);
	},

	addBattle: function(user_id, combat_id, result) {
		let user = this.get(user_id);
		if (!user) {
			this.add(user_id);
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
	
	add: function(id) {
		this.init();

		this._users.push({ id });
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