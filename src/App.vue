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
    font: 14px 'Roboto', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 0;
    margin: 0;
    color: #fff;
  }

  .hidden {
    display: none;
  }

  #app {
    background: #010205 url('assets/body-login-bg.jpg') no-repeat center top/cover;
    padding: 0 0 38px;
    margin: 0;
    min-height: 100vh;
    position: relative;
    box-sizing: border-box;
  }

  .container {
    width: 100%;
    max-width: 1160px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    flex-flow: row wrap;
    box-sizing: border-box;
  }

  h1, h2, h3 {
    font-weight: normal;
    margin: 0 0 10px;
  }

  h1 {
    font-size: 32px;
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
    text-decoration: underline;
  }

  a:hover {
    color: #fff;
    text-decoration: none;
  }

  .top-page-block {
    width: 100%;
    height: 70vh;
    max-height: 350px;
    padding: 0 0 20px;
    display: flex;
    flex-flow: row wrap;
    box-sizing: border-box;
  }

  .bottom-page-block {
    width: 100%;
    height: 30vh;
    max-height: 175px;
    display: flex;
    flex-flow: row wrap;
  }
  
  /*********************************** Responsive styles */

  @media screen and (max-width: 767px), (max-height: 767px) {
    #app {
      height: auto;
    }
  }
</style>
