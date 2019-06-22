const axios = require('axios');
const users = require('./users');
const _ = require('lodash');

// const BASE_URL = 'https://combats-api-ya.herokuapp.com';
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

	strike : function(token, combat_id, turn) {
		return axios({
			method : 'post',
			url : `${BASE_URL}/turn`,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			data : formUrlEncoded({
				token,
				combat_id,
				turn
			})
		});
	},
    
	getCombatInfo: function(token, combat_id) {
		return axios.get(`${BASE_URL}/status`, {
			params: { token, combat_id }
		});
	},

	processCombatResponse: function (axiosPromise, res) {
		axiosPromise.then(function (response) {
			let data = response.data;
			if (data.combat.status === 'finished') {
				const yourHealth = data.combat.you.health;
				const enemyHealth = data.combat.enemy.health;
				let result;
				if (yourHealth <= 0 &&  enemyHealth <= 0) {
					result = 'draw';
				}
				else if (yourHealth > 0) {
					result = 'victory';
				}
				else {
					result = 'defeat';
				}
				users.addBattle(data.combat.you.id, data.combat.id, result);
			}
			res.send(data);
		}).catch(function (response) {
			if (response && response.response) {
				const data = response.response.data;
				res.status(response.response.status).send(data);
			}
			else {
				res.status(500);
			}
		});
	},
	
	generateFunnyPhrase: function(hit, blocked, origin, target) {

		const phrases_hit = [
			`Находчивый ${getHtmlUsername(origin)} провел хук справа, лишив ${getHtmlUsername(target)} надежды на победу`,
			`Отчаявшийся ${getHtmlUsername(origin)} наградил ${getHtmlUsername(target)} дубиной по ${getHtmlPart(hit)}, и он не увернулся`,
			`${getHtmlUsername(origin)} оказался не таким уж и беспомощным и ударил ${getHtmlUsername(target)} в ${getHtmlPart(hit)}`,
			`Хитрый ${getHtmlUsername(origin)} сводил мамку ${getHtmlUsername(target)} в кино`
		];
		const phrases_block = [
			`${getHtmlUsername(origin)} нанес жесткий удар по ${getHtmlPart(hit)}, но ${getHtmlUsername(target)} отбился`,
			`${getHtmlUsername(origin)} хотел разбить ${getHtmlUsername(target)} ${getHtmlPart(hit)}, но поскользнулся на голубином помёте`,
			`${getHtmlUsername(origin)} отвратным образом убил ${getHtmlUsername(target)} но появившаяся из ниоткуда <span class="log_message_user">[Angel]</span> воскресила его`,
			`${getHtmlUsername(origin)} хотел было ударить ${getHtmlUsername(target)}, но вспомнил, что он работает в 1С`
		];

		if (blocked) {
			return _.sample(phrases_block);
		}
		else {
			return _.sample(phrases_hit);
		}
	}
};

const formUrlEncoded = x =>
	Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '');

const getHtmlUsername = user => {
	return `<span class="log_message_user">[${user.username}]</span>`;
};

const getHtmlPart = part => {
	const bodyParts = ['Голова', 'Пояс', 'Корпус', 'Ноги'];
	return `<span class="log_message_part">${bodyParts[part + 1]}</span>`;
};