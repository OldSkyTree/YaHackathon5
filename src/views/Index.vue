<template>
    <section>
        <formSignin v-if="formShow === 'signin'" v-on:switch-form="switchForm"/>
        <formSignup v-else-if="formShow === 'signup'" v-on:switch-form="switchForm"/>
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
        }
    },
    methods: {
        switchForm(formName) {
            this.formShow = formName;
        }
    }
    
}
</script>
