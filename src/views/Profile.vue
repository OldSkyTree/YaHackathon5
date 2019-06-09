<template>
  <section>
    {{ user.username }}
		<button type="button" @click="fight">В бой</button>

		<div v-if="isPending">
			{{ currentPendingMessage }}
		</div>

    <chat />
    <users-online />
  </section>
</template>

<script>

import chat from '../components/chat.vue';
import usersOnline from '../components/users-online.vue';

export default {
	components: {
		chat,
		usersOnline
	},
	data() {
		return {
			user: JSON.parse(localStorage.getItem('user')),
			isPending: false,
			currentPendingMessage: 'Ох, парень... Давно по щщам не получал?',
			pendingMessages: [
				'Еще не струсил? Звони Илону и сваливай на Марс пока не поздно.',
				'undefined',
				'Ха, думал все сломалось и ты избежишь боя?',
				'Не получиться, дружок!',
				'Межгалактические бои это тебе не костыли на реакте писать...',
				'Тут все серьезно.',
				'Ладно, харе трепаться, нашли соперничка тебе',
				'Всего-то чемпион галактики по грекоримской борьбе и стрельбе из бластера'
			]
		};
	},
	methods: {
		fight() {
			
			fetch('http://localhost:3000/fight', {
				method: 'POST',
				body: JSON.stringify({
					token: this.user.token
				}),
				headers: { 'Content-type': 'application/json;charset=utf-8' }
			})
				.then(res => res.json())
				.then(res => {
					
					if(res.status === 'ok') {
						setInterval(() => {
							fetch(`http://localhost:3000/status?token=${this.user.token}&combat_id=${res.combat.id}`, {
								method: 'GET'
							})
								.then(res => res.json())
								.then(res => {
									if(res.status === 'ok' && res.combat.status === 'pending') {
										if(!this.isPending) {
											this.updatePendingMessage();
										}
										this.isPending = true;
									}
									else if(res.status === 'ok' && res.combat.status === 'progress') {
										this.$router.push({
											name: 'battle',
											params: { combat: res.combat }
										});
									}
								})
								.catch(err => {
									// eslint-disable-next-line no-console
									console.error(err);
								});
						}, 1000);
					}
				})
				.catch(err => {
					// eslint-disable-next-line no-console
					console.error(err);
				});
		},
		updatePendingMessage() {
			let counter = 0;

			setInterval(() => {
				this.currentPendingMessage = this.pendingMessages[counter];

				if(counter < this.pendingMessages.length - 1) {
					counter++;
				}
			}, 2500);
		}
	}
};
</script>