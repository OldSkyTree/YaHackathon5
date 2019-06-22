<template>
  <form
    action=""
    class="entry-form"
  >
    <h2 class="entry-form__title">
      Регистрация
    </h2>
    <label class="input">
      <span class="input__label">Логин</span>
      <input
        v-model.trim="user.login.value"
        type="text"
        class="input__element"
      >
      <span class="entry-form__errors">
        <p
          v-for="(error, index) in $validateErrorsMsgFrom(errors.login)"
          :key="index"
        >
          {{ error }}
        </p>
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
        <p
          v-for="(error, index) in $validateErrorsMsgFrom(errors.password)"
          :key="index"
        >
          {{ error }}
        </p>
      </span>
    </label>
    <div class="buttons-holder">
      <button
        type="button"
        @click="signUp"
      >
        Создать аккаунт
      </button>
    </div>
    <label class="agreement">
      <input
        v-model="user.codex.value"
        type="checkbox"
        class="agreement__input"
      >
      <span class="agreement__label">Нажимая на кнопку <i>Создать аккаунт</i>, вы соглашаетесь с межгалактическим кодексом №756/4</span>
      <span class="entry-form__errors">
        <p
          v-for="(error, index) in $validateErrorsMsgFrom(errors.codex)"
          :key="index"
        >
          {{ error }}
        </p>
      </span>
    </label>
    <div class="entry-form__options">
      У вас уже есть аккаунт? 
      <button
        type="button"
        class="entry-form__options-btn"
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
					min: 3,
					spaces: true
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
							this.errors = {
								login: [
									{
										type: 'server',
										msg: res.message
									}
								]
							};
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
