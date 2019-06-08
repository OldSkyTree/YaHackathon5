const axios = require('axios');

const BASE_URL = 'http://localhost:3333';

module.exports = {
	startFight : function(token) {
		return axios({
			method : 'post',
			url : `${BASE_URL}/fight`,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			data : formUrlEncoded({
				token
			})
		});
	},

	strike : function(user, combat_id, turn) {
		return axios({
			method : 'post',
			url : `${BASE_URL}/turn`,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			data : formUrlEncoded({
				user,
				combat_id,
				turn
			})
		});
	},
    
	getCombatInfo: function(token, combat_id) {
		return axios.get(`${BASE_URL}/status`, {
			params: { token, combat_id }
		});
	}
};

const formUrlEncoded = x =>
	Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '');