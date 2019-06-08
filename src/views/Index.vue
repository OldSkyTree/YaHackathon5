<template>
  <section class="login-info">
    <div class="container">
      <div class="about-us">
        <h1>Cosmos Battle</h1>
        <p>
          Some great and funny text.
        </p>
      </div>
      <div class="form-holder">
        <formSignin
          v-if="formShow === 'signin'"
          @switch-form="switchForm"
        />
        <formSignup
          v-else-if="formShow === 'signup'"
          @switch-form="switchForm"
        />
      </div>
    </div>
  </section>
</template>

<script>
import formSignin from '../components/form-signin';
import formSignup from '../components/form-signup';

export default {
	components: {
		formSignin,
		formSignup
	},
	data() {
		return {
			formShow: 'signin'
		};
	},
	methods: {
		switchForm(formName) {
			this.formShow = formName;
		}
	}
    
};
</script>
<style>
  .login-info {
    padding: 50px 0;
  }
  .about-us, .form-holder {
    width: 50%;
    box-sizing: border-box;
    padding: 20px 30px;
    text-align: left;
  }

  .about-us h1 {
    color: #fff;
    position: relative;
    padding: 0 0 20px;
    margin: 0 0 20px; 
  }

  .about-us h1::after {
    content: '';
    display: block;
    width: 100px;
    height: 2px;
    background: #fff;
    position: absolute;
    left: 0;
    bottom: 0;
  }

  .about-us p {
    color: #fff;
  }

  .form-holder {
    background: rgba(10, 25, 32, 0.8);
  }
  .form-holder h2 {
    color: #fff;
    text-align: center;
  }
  form {
    width: 100%;
    margin: 0;
  }
  form label {
    width: 100%;
    display: block;
    color: #fff;
  }
  form label > span {
    width: 100%;
    display: block;
    margin: 0 0 5px;
    color: #fff;
  }
  form input[type="text"],
  form input[type="password"] {
    height: 40px;
    width: 100%;
    margin: 0 0 20px;
    padding: 0 10px;
    box-sizing: border-box;
    background: #fff;
    color: #000;
    font-size: 16px;
    font-weight: 500;
  }
  form .button-holder {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 0 0 20px;
  }
  form .button-holder button {
    height: 40px;
    display: inline-block;
    margin: 0 auto;
    padding: 0 50px;
    box-sizing: border-box;
    background: #db2829;
    color: #fff;
    border: none;
    font-size: 20px;
    cursor: pointer; 
  }
  .addition-actions {
    width: 100%;
    color: #fff;
    font-size: 14px;
    text-align: center;
  }
  .addition-actions button {
    background: transparent;
    border: none;
    color: #fff;
    display: inline;
    font-size: 14px;
    text-decoration: underline;
    padding: 0;
    margin: 0;
  }
  .addition-actions button:hover {
    text-decoration: none;
    cursor: pointer;
  }
  .agreement {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    margin: 0 0 20px;
    font-size: 14px;
    line-height: 1.4em;
  }
  .agreement input {
    width: 15px;
    height: 15px;
    margin: 2px 10px 0 0;
  }
  .agreement span {
    width: calc(100% - 25px);
  }
  .errors {
    display: block;
    width: 100%;
    font-size: 14px;
    color: #db2829;
    padding: 10px 0;
  }
</style>
