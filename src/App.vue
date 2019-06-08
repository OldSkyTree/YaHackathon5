<template>
  <div id="app">
    <headerMain />
    <router-view />
    <footerMain />
  </div>
</template>

<script>

import headerMain from './components/header-main';
import footerMain from './components/footer-main';

export default {
	name: 'App',
	components: {
		headerMain,
		footerMain
	},
	data () {
		return {
			msg: 'Welcome to Your Vue.js App'
		};
	}
};
</script>

<style>
@import url('//fonts.googleapis.com/css?family=Roboto:400,500&display=swap&subset=cyrillic');
body {
  background: #010205 url('assets/body-login-bg.jpg') no-repeat center top/cover;
}
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px 15px;
}

.container {
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  display: flex;
  flex-flow: row wrap;
}

h1 {
  font-size: 32px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #fff;
}
</style>
