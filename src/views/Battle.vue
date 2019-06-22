<template>
  <section class="page-section">
    <div class="container">
      <div class="hidden">
        {{ combat }}
        {{ combat.you }}
      </div>
      <div class="page-section__top-block">
        <div class="fighter fighter_friend">
          <h3 class="fighter__name">
            {{ you.username }}
          </h3>
          <div class="fighter__health">
            <span class="fighter__health-text">
              {{ you.health }}
            </span>
            <span class="fighter__health-bar" />
          </div>
        </div>
        <div class="fight">
          <div class="fight__actions">
            <div class="fight__btns">
              <h3 class="fight__btns-title">
                Атака
              </h3>
              <button class="fight__btn fight__btn_attack">
                Голова
              </button>
              <button class="fight__btn fight__btn_attack">
                Пояс
              </button>
              <button class="fight__btn fight__btn_attack">
                Корпус
              </button>
              <button class="fight__btn fight__btn_attack">
                Ноги
              </button>
            </div>
            <div class="fight__btns">
              <h3 class="fight__btns-title">
                Защита
              </h3>
              <button class="fight__btn fight__btn_defence">
                Голова
              </button>
              <button class="fight__btn fight__btn_defence">
                Пояс
              </button>
              <button class="fight__btn fight__btn_defence">
                Корпус
              </button>
              <button class="fight__btn fight__btn_defence">
                Ноги
              </button>
            </div>
            <div class="fight__hit">
              <button
                :disabled="isWaitingForEnemy"
                class="btn-secondary fight__hit-btn"
                @click="fight"
              >
                Fight!
              </button>
            </div>
          </div>
          <div class="fight__log">
            <ul>
              <li>[06:00] [Lord of the Pit] нанес первый удар, но предусмотрительный [Helpless Knight] отбил удар</li>
              <li>[06:00] [Lord of the Pit] нанес первый удар, но предусмотрительный [Helpless Knight] отбил удар</li>
              <li>[06:00] [Lord of the Pit] нанес первый удар, но предусмотрительный [Helpless Knight] отбил удар</li>
              <li>[06:00] [Lord of the Pit] нанес первый удар, но предусмотрительный [Helpless Knight] отбил удар</li>
            </ul>
          </div>
        </div>
        <div class="fighter fighter_enemy">
          <h3 class="fighter__name">
            {{ enemy.username }}
          </h3>
          <div class="fighter__health">
            <span class="fighter__health-text">
              {{ enemy.health }}
            </span>
            <span class="fighter__health-bar" />
          </div>
        </div>
      </div>
      <div class="page-section__bottom-block">
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
<style>
	.fighter {
		width: 25%;
    height: 100%;
		display: flex;
		flex-flow: row wrap;
		align-items: flex-start;
	}

	.fighter_friend {
		background: url('../assets/img-fighter1.jpg') no-repeat center center/cover;
	}

	.fighter_enemy {
		background: url('../assets/img-fighter2.jpg') no-repeat center center/cover;
	}

	.fighter__name {
		width: 100%;
		padding: 5px;
		background: rgba(0, 0, 0, 0.4);
		text-align: center;
	}

  .fighter__health {
    width: 100%;
    padding: 5px;
    background: rgba(0, 0, 0, 1);
    text-align: center;
    margin-top: auto;
    position: relative;
  }

	.fighter__health-bar {
    display: block;
		width: 100%;
		height: 100%;
		background: #398354;
    position: absolute;
    left: 0;
    top: 0;
	}

  .fighter__health-text {
    z-index: 10;
    position: relative;
  }

	.fight {
		width: 50%;
    height: 100%;
		padding: 0 10px;
		box-sizing: border-box;
	}

	.fight__actions {
		height: 60%;
		display: flex;
		flex-flow: row wrap;
	}
	
	.fight__btns {
		width: 50%;
		display: flex;
		flex-flow: row wrap;
		padding: 10px;
		box-sizing: border-box;
    align-content: flex-start;
	}

	.fight__btn {
		width: 50%;
		border: none;
		cursor: pointer;
		color: #fff;
    padding: 10px 5px;
    box-sizing: border-box;
	}

	.fight__btn_attack {
		background: #915757;
	}

	.fight__btn_attack:hover {
		background: #b49797;
	}

	.fight__btn_defence {
		background: #398354;
	}

	.fight__btn_defence:hover {
		background: #89ae97;
	}

	.fight__btns-title {
		width: 100%;
		text-align: center;
	}

	.fight__hit {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: flex-start;
	}

	.fight__hit-btn {
		font-size: 18px;
	}

	.fight__log {
		height: 40%;
		overflow-x: auto;
		background: #202020;
    border: 1px solid #ccc;
    padding: 10px;
    margin: 0 10px;
    box-sizing: border-box;
	}

	/*********************************** Responsive styles */

	@media screen and (max-width: 1023px) {
    .fight-section .container,
    .top-page-block,
    .bottom-page-block {
      height: auto;
    }

    .fight__btn {
      width: 50%;
    }
  }
</style>
