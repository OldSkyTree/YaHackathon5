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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
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
  color: #42b983;
}
</style>
