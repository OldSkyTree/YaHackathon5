<template>
  <form action="">
    <h2>Регистрация</h2>
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
      @click="signUp"
    >
      Создать аккаунт
    </button>
    <label>
      <input
        v-model="user.codex.value"
        type="checkbox"
      >
      <span>Нажимая на кнопку Войти, вы соглашаетесь с межгалактическим кодексом №756/4</span>
      {{ $validateErrorsMsgFrom(errors.codex) }}
    </label>
    <div>
      У вас уже есть аккаунт? <button
        type="button"
        @click="switchForm"
      >
        войдите в систему
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
				},
				codex: {
					name: 'codex',
					label: 'Кодекс',
					value: false,
					required: true
				}
			},
			errors: {}
		};
	},
	methods: {
		signUp() {
			const validation = this.$validate(this.user);

			if(validation.isValid) {
				fetch('http://localhost:3000/register', {
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
		},
		switchForm() {
			this.$emit('switch-form', 'signin');
		}
	}
};
</script>
