import Vue from 'vue';
import App from './App.vue';

import VueRouter from 'vue-router'

Vue.use(VueRouter);

import Index from './views/Index';
import Top from './views/Top';

const router = new VueRouter({
  routes: [
    { path: "/", component: Index },
    { path: "/top", component: Top }
  ]
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
