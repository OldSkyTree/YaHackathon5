<template>
  <form
    method="post"
    action="http://localhost:3000/register"
  >
    <h2>Авторизация</h2>
    <label>
      <span>Логин</span>
      <input
        v-model.trim="user.login.value"
        type="text"
      >
      {{ $validateErrorsMsgFrom(errors.login) }}
    </label>
    <label>
      <span>Пароль</span>
      <input
        v-model.trim="user.password.value"
        type="password"
      >
      {{ $validateErrorsMsgFrom(errors.password) }}
    </label>
    <button
      type="button"
      @click="signIn"
    >
      Войти
    </button>
    <div>
      Если у вас еще нет аккаунта — пройдите простую <button
        type="button"
        @click="$emit('switch-form', 'signup')"
      >
        регистрацию
      </button>
    </div>
  </form>
</template>

<script>
export default {
	data() {
		return {
			user: {
				login: {
					name: 'login',
					label: 'Логин',
					value: '',
					required: true,
					min: 5
				},
				password: {
					name: 'password',
					label: 'Пароль',
					value: '',
					required: true,
					min: 5
				}
			},
			errors: {}
		};
	},
	methods: {
		signIn() {
			const validation = this.$validate(this.user);

			if(validation.isValid) {
				/* eslint-disable no-console */
				console.log('Форма заполнена без ошибок');
				/* eslint-enable no-console */
			}
			else {
				this.errors = validation.errors;
			}
		}
	}
};
</script>
