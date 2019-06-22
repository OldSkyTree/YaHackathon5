const axios = require('axios');

// const BASE_URL = 'https://combats-api-ya.herokuapp.com';
const BASE_URL = 'http://localhost:3333';

module.exports = {
	sendMessage : function(token, message, timestamp) {
		return axios({
			method : 'post',
			url : `${BASE_URL}/chat`,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			data : formUrlEncoded({
				token,
				message,
				timestamp
			}) 
		});
	},

	getMessages : function(token, timestamp) {
		return axios.get(`${BASE_URL}/chat`, {
			params: { token, timestamp }
		});
	}
};

const formUrlEncoded = x =>
	Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '');