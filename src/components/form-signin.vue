<template>
    <form action="">
        <h2>Авторизация</h2>
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
        <button type="button" @click="signIn">Войти</button>
        <div>
            Если у вас еще нет аккаунта — пройдите простую <button type="button" @click="$emit('switch-form', 'signup')">регистрацию</button>
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
        }
    },
    methods: {
        signIn() {
            const validation = this.$validate(this.user);

            if(validation.isValid) {
                console.log('Форма заполнена без ошибок');
            }
            else {
                this.errors = validation.errors;
            }
        }
    }
}
</script>
