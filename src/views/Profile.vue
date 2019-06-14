<template>
  <section class="profile">
    <div class="container">
      <div class="top-page-block">
        <div class="user-info">
          <h3 class="user-info__name">
            {{ user.username }}
          </h3>
        </div>
        <div class="user-actions">
          <button
            type="button"
            @click="fight"
          >
            В бой
          </button>

          <div v-if="isPending">
            {{ currentPendingMessage }}
          </div>
        </div>
      </div>
      <div class="bottom-page-block">
        <chat />
        <users-online />
      </div>
    </div>
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

<style>
	.profile {
		text-align: center;
	}

	.user-info {
		width: 25%;
		display: flex;
		flex-flow: row wrap;
		align-items: flex-start;
		background: url('../assets/img-fighter1.jpg') no-repeat center center/cover;
	}

	.user-info__name {
		width: 100%;
		padding: 5px;
		background: rgba(0, 0, 0, 0.4);
		text-align: center;
	}

	.user-actions {
		width: 50%;
		padding: 0 10px;
		box-sizing: border-box;
	}
</style>
