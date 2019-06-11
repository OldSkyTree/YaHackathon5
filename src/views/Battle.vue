<template>
  <section>
    {{ combat }}
    {{ combat.you }}
    
    <div>
      Вы: {{ you.username }} ({{ you.health }})
    </div>
    <div>
      Противник: {{ enemy.username }} ({{ enemy.health }})
    </div>
    {{ statusCombat }}

    <button
      :disabled="isWaitingForEnemy"
      @click="fight"
    >
      Fight!
    </button>
  </section>
</template>

<script>
export default {
	data() {
		return {
			isWaitingForEnemy: false,
			combat: '',
			hit: 'удар в голову',
			blocks: ['защита головы', 'защита туловища'],
			you: {
				username: '',
				health: ''
			},
			enemy: {
				username: '',
				health: ''
			},
			statusCombat: ''
		};
	},
	created() {
		this.combat = this.$route.params.combat;
    
		this.you = this.combat.you;
		this.enemy = this.combat.enemy;

	},
	methods: {
		updateHealth(newUserData, oldUserData) {
			if(newUserData.health !== oldUserData.health) {
				oldUserData.health = newUserData.health;
			}
		},
		fight() {
			if(this.isWaitingForEnemy) return;

			fetch('http://localhost:3000/turn', {
				method: 'POST',
				body: JSON.stringify({
					token: this.combat.you.token,
					combat_id: this.combat.id,
					turn: JSON.stringify({
						hit: this.hit,
						blocks: this.blocks,
					})
				}),
				headers: { 'Content-type': 'application/json;charset=utf-8' }
			})
				.then(res => res.json())
				.then(res => {

					if(res.status === 'ok') {

						let getStatus = setInterval(() => {
							fetch(`http://localhost:3000/status?token=${this.combat.you.token}&combat_id=${this.combat.id}`, {
								method: 'GET'
							})
								.then(res => res.json())
								.then(res => {
									if (res.status === 'ok' && res.combat.status === 'finished') {
										clearInterval(getStatus);

										let battleStatus;
                    
										if(this.you.health > this.enemy.health) {
											battleStatus = 'Ты выиграл';
										}
										else if(this.you.health < this.enemy.health) {
											battleStatus = 'Ты проиграл';
										}
										else {
											battleStatus = 'Ничья!';
										}

										alert(`Битва окончена! ${battleStatus}`);

										this.$router.push({ path: '/profile' });
									}
									else if(res.status === 'ok' && res.combat.turn_status) {
										clearInterval(getStatus);
										this.isWaitingForEnemy = false;

										this.statusCombat = 'Пришло время делать ход!';
									}
									else if(res.status === 'ok' && !res.combat.turn_status) {
										this.isWaitingForEnemy = true;
                    
										this.statusCombat = 'Ждем ход противника!';
									}

									this.updateHealth(res.combat.you, this.you);
									this.updateHealth(res.combat.enemy, this.enemy);
                  
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

		}
	}
};
</script>
