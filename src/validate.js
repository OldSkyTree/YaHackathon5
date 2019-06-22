export default {
	install (Vue) {

		Vue.prototype.$validateErrorsMsgFrom = errors => {
			if(errors) {
				return errors.map(error => error.msg);
			}
		};

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

				if (fields[key].spaces && fields[key].value.includes(' ')) {
					checkField(key);

					errors[key].push({
						type: 'spaces',
						msg: `Пробелы в ${fields[key].label} запрещены!`
					});
				}
			}

			return {
				isValid: Object.keys(errors).length === 0,
				errors
			};
		};

	}
};
