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
    min-height: 100vh;
  }

  .hidden {
    display: none;
  }

  #app {
    background: #010205 url('assets/body-login-bg.jpg') no-repeat center top/cover;
    padding: 0 0 38px;
    margin: 0;
    height: 100vh;
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

  .btn-primary,
  .btn-secondary {
    padding: 5px 30px;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 16px;
    border: 1px solid #fff;
    border: none;
  }

  .btn-primary {
    background: #202020;
    color: #fff;
  }

  .btn-secondary {
    background: #d92424;
    color: #fff;
  }

  .btn-secondary:disabled {
    background: #ccc;
  }

  .page-section {
    min-height: 530px;
    height: calc(100vh - 120px);
    display: flex;
  }

  .page-section__content {
    background: rgba(10, 25, 32, 0.8);
    width: 100%;
    text-align: center;
    padding: 50px 0;
  }

  .page-section__top-block {
    width: 100%;
    height: 60%;
    min-height: 300px;
    padding: 0 0 20px;
    display: flex;
    flex-flow: row wrap;
    box-sizing: border-box;
  }

  .page-section__bottom-block {
    width: 100%;
    height: 40%;
    min-height: 150px;
    display: flex;
    flex-flow: row wrap;
    margin-top: auto;
  }
  
  /*********************************** Responsive styles */

  @media screen and (max-width: 1023px), (max-height: 640px) {
    #app {
      height: auto;
      min-height: 100vh;
    }
  }
</style>
