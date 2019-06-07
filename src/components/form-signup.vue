<template>
    <form action="">
        <h2>Регистрация</h2>
        <label>
            <span>Логин</span>
            <input type="text" v-model.trim="user.login.value">
            {{ $validateErrorsMsgFrom(errors.login) }}
        </label>
        <label>
            <span>Пароль</span>
            <input type="password" v-model.trim="user.password.value">
            {{ $validateErrorsMsgFrom(errors.password) }}
        </label>
        <button type="button" @click="signUp">Создать аккаунт</button>
        <label>
            <input type="checkbox" v-model="user.codex.value">
            <span>Нажимая на кнопку Войти, вы соглашаетесь с межгалактическим кодексом №756/4</span>
            {{ $validateErrorsMsgFrom(errors.codex) }}
        </label>
        <div>
            У вас уже есть аккаунт? <button type="button" @click="switchForm">войдите в систему</button>
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
        }
    },
    methods: {
        signUp() {
            const validation = this.$validate(this.user);

            if(validation.isValid) {
                console.log('Форма заполнена без ошибок');
            }
            else {
                this.errors = validation.errors;
            }
        },
        switchForm() {
            this.$emit('switch-form', 'signin')
        }
    }
}
</script>
