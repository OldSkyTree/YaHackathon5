<template>
  <section class="entry-section">
    <div class="container">
      <div class="about-us">
        <h1 class="about-us__title">
          Cosmos Battle
        </h1>
        <p>
          Some great and funny text.
        </p>
      </div>
      <div class="entry-form__container">
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
  .entry-section {
    width: 100%;
    box-sizing: border-box;
    padding: 20px 30px;
    display: flex;
    align-items: center;
    height: calc(100vh - 120px);
  }
  .about-us {
    width: 50%;
    box-sizing: border-box;
    padding: 20px 30px;
  }

  .about-us__title {
    color: #fff;
    position: relative;
    padding: 0 0 20px;
    margin: 0 0 20px; 
    font-size: 44px;
  }

  .about-us__title::after {
    content: '';
    display: block;
    width: 100px;
    height: 2px;
    background: #fff;
    position: absolute;
    left: 0;
    bottom: 0;
  }

  .entry-form__container {
    background: rgba(10, 25, 32, 0.8);
    width: 50%;
    box-sizing: border-box;
    padding: 25px 30px;
  }

  .entry-form {
    width: 100%;
    margin: 0;
  }

  .entry-form__title {
    color: #fff;
    text-align: center;
    margin: 0 0 15px;
  }

  .input {
    width: 100%;
    display: block;
    color: #fff;
    margin: 0 0 10px;
  }

  .input__label {
    width: 100%;
    display: block;
    margin: 0 0 5px;
    color: #fff;
  }

  .input__element {
    height: 40px;
    width: 100%;
    margin: 0 0 5px;
    padding: 0 10px;
    box-sizing: border-box;
    background: #fff;
    color: #000;
    font-size: 16px;
    font-weight: 500;
    border: none;
  }

  .buttons-holder {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 0 0 20px;
  }

  .buttons-holder button {
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

  .entry-form__options {
    width: 100%;
    color: #fff;
    font-size: 14px;
    text-align: center;
  }

  .entry-form__options-btn {
    background: transparent;
    border: none;
    color: #fff;
    display: inline;
    font-size: 14px;
    text-decoration: underline;
    padding: 0;
    margin: 0;
  }

  .entry-form__options-btn:hover {
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

  .agreement__input {
    width: 15px;
    height: 15px;
    margin: 2px 10px 0 0;
  }

  .agreement__label {
    width: calc(100% - 25px);
  }

  .entry-form__errors {
    display: block;
    width: 100%;
    font-size: 12px;
    color: #db2829;
  }

  /*********************************** Responsive styles */

  @media screen and (max-width: 767px) {
    .about-us { 
      width: 100%; 
      order: 2; 
    }
    .entry-form__container { 
      width: 100%; 
      margin: 0 0 20px; 
    }
  }
</style>
