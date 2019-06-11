const axios = require('axios');

const BASE_URL = 'https://combats-api-ya.herokuapp.com';

module.exports = {
	registerUser : function(username, password) {
		return sendPost('register', username, password);
	},

	loginUser : function(username, password) {
		return sendPost('login', username, password);
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