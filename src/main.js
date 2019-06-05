import Vue from 'vue';
import App from './App.vue';

import VueRouter from 'vue-router';
import Validate from './validate.js';

Vue.use(VueRouter);
Vue.use(Validate);

import Index from './views/Index';
import AboutGame from './views/AboutGame';
import TopPlayers from './views/TopPlayers';
import AboutDevelopers from './views/AboutDevelopers';

const router = new VueRouter({
	routes: [
		{ path: '/', component: Index },
		{ path: '/about-game', component: AboutGame },
		{ path: '/top-players', component: TopPlayers },
		{ path: '/about-developers', component: AboutDevelopers }
	]
});

new Vue({
	el: '#app',
	router,
	render: h => h(App)
});





