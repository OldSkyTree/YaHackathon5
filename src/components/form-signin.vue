<template>
  <form
    method="post"
    action="http://localhost:3000/register"
    class="entry-form"
  >
    <h2 class="entry-form__title">
      Авторизация
    </h2>
    <label class="input">
      <span class="input__label">Логин</span>
      <input
        v-model.trim="user.login.value"
        type="text"
        class="input__element"
      >
      <span class="entry-form__errors">
        {{ $validateErrorsMsgFrom(errors.login) }}
      </span>
    </label>
    <label class="input">
      <span class="input__label">Пароль</span>
      <input
        v-model.trim="user.password.value"
        type="password"
        class="input__element"
      >
      <span class="entry-form__errors">
        {{ $validateErrorsMsgFrom(errors.password) }}
      </span>
    </label>
    <div class="buttons-holder">
      <button
        type="button"
        @click="signIn"
      >
        Войти
      </button>
    </div>
    <div class="entry-form__options">
      Если у вас еще нет аккаунта — пройдите простую 
      <button
        type="button"
        class="entry-form__options-btn"
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
				fetch('http://localhost:3000/login', {
					method: 'POST',
					body: JSON.stringify({
						username: this.user.login.value,
						password: this.user.password.value
					}),
					headers: { 'Content-type': 'application/json;charset=utf-8' }
				})
					.then(res => res.json())
					.then(res => {
						if(res.status === 'ok') {
							localStorage.setItem('user', JSON.stringify(res.user));
                        
							this.$router.push({ path: '/profile' });
						}
						else {
							// eslint-disable-next-line no-console
							console.error('Error');
						}
					})
					.catch(err => {
						// eslint-disable-next-line no-console
						console.error(err);
					});
			}
			else {
				this.errors = validation.errors;
			}
		}
	}
};
</script>
