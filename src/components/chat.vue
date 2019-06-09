<template>
  <section>
    <ul class="chat">
      <li
        v-for="(message, index) in messages"
        :key="index"    
      >
        @{{ message.user.username }}
        {{ new Date(message.timestamp).toLocaleTimeString() }} ({{ new Date(message.timestamp).toLocaleDateString() }})

        {{ message.message }}
      </li>
    </ul>
    <form>
      <textarea v-model="newMessage" />
      <button
        type="button"
        @click="send"
      >
        Отправить
      </button>
    </form>
  </section>
</template>
<script>
export default {
	data() {
		return {
			messages: [],
			newMessage: ''
		};
	},
	created() {
		const timestamp = Date.now();

		setInterval(() => {
			const user = localStorage.getItem('user');
			if(!user) return;
            
			const userToken = JSON.parse(user).token;

			fetch(`http://localhost:3000/chat?timestamp=${timestamp}&token=${userToken}`, {
				method: 'GET'
			})
				.then(res => res.json())
				.then(res => {
					if(res.status === 'ok') {
						this.messages = res.chat;
					}
				})
				.catch(err => {
					// eslint-disable-next-line no-console
					console.error(err);
				});


		}, 1000);
	},
	methods: {
		send() {
			const user = localStorage.getItem('user');
			if(!user) return;

			const userToken = JSON.parse(user).token;

			fetch('http://localhost:3000/chat', {
				method: 'POST',
				body: JSON.stringify({
					token: userToken,
					message: this.newMessage
				}),
				headers: { 'Content-type': 'application/json;charset=utf-8' }
			})
				.then(res => res.json())
				.then(res => {
					if(res.status === 'ok') {
						this.newMessage = '';
					}
				})
				.catch(err => {
					// eslint-disable-next-line no-console
					console.error(err);
				});
		}
	}
};
</script>
<style>
  .chat li {
    width: 100%;
    display: block;
    margin: 0 0 10px;
  }
</style>
