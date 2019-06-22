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
import Profile from './views/Profile';
import Battle from './views/Battle';
import NotFound from './views/NotFound';

const router = new VueRouter({
	routes: [
		{ path: '*', redirect: '/404'},
		{ path: '/404', component: NotFound },
		{ path: '/', component: Index },
		{ path: '/about-game', component: AboutGame },
		{ path: '/top-players', component: TopPlayers },
		{ path: '/about-developers', component: AboutDevelopers },
		{
			path: '/profile',
			component: Profile,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/battle',
			name: 'battle',
			component: Battle,
			props: true,
			meta: {
				requiresAuth: true
			}
		}
	]
});

router.beforeEach((to, from, next) => {
	
	if (to.matched.some(record => record.meta.requiresAuth)) {

		const user = localStorage.getItem('user');

		if(!user) {
			next({
				path: '/'
			});
		}

		fetch(`http://localhost:3000/whoami?token=${JSON.parse(user).token}`, {
			method: 'GET',
			headers: { 'Content-type': 'application/json;charset=utf-8' }
		})
			.then(res => res.json())
			.then(res => {
				if(res.status !== 'error') {
					next();
				}
				else {
					next({
						path: '/'
					});
				}
			})
			.catch(err => {
				// eslint-disable-next-line no-console
				console.error(err);
			});
	}
	else {
		next();
	}
});

new Vue({
	el: '#app',
	router,
	render: h => h(App)
});





