

export default {
    install (Vue, options) {

        Vue.prototype.$validateErrorsMsgFrom = errors => {
            if(errors) {
                return errors.map(error => error.msg);
            }
        }

        Vue.prototype.$validate = fields => {
            const errors = {};

            function checkField(field) {
                if(!errors[field]) {
                    errors[field] = [];
                }
            }

            for (let key in fields) {
                if(fields[key].required && !fields[key].value) {
                    checkField(key);

                    errors[key].push({
                        type: 'required',
                        msg: `Поле ${fields[key].label} обязательное!`
                    });
                }

                if(fields[key].min && fields[key].value.length < fields[key].min) {
                    checkField(key);

                    errors[key].push({
                        type: 'min',
                        msg: `Поле ${fields[key].label} не должно быть короче ${fields[key].min} символов!`
                    });
                }
            }

            return {
                isValid: Object.keys(errors).length === 0,
                errors
            }
        }

    }
}
