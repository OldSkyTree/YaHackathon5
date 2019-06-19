<template>
  <div class="users-online">
    <h3 class="users-online__title">
      Пользователи online
    </h3>
    <ul class="users-online__list">
      <li
        v-for="(user, index) in usersOnline"
        :key="index"
        class="users-online__list-item"
      >
        {{ user.username }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
	data() {
		return {
			usersOnline: []
		};
	},
	created() {
		this.updateUsersOnline();
		setInterval(() => {
			this.updateUsersOnline();
		}, 5000);
	},
	methods: {
		updateUsersOnline() {
			fetch('http://localhost:3000/online')
				.then(res => res.json())
				.then(res => {
					if(res.status === 'ok') {
						this.usersOnline = res.users;
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
  .users-online {
    width: 25%;
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
  }

  .users-online__title {
    margin: 0;
    padding: 11px 15px;
    background: #202020;
    color: #fff;
    border: 1px solid #ccc;
    border-bottom: none;
    width: 100%;
    box-sizing: border-box;
    border-radius: 10px 10px 0 0;
    height: 43px;
    overflow: hidden;
  }

  .users-online__list {
    width: 100%;
    margin: 0;
    background: #202020;
    border: 1px solid #ccc;
    padding: 10px;
    box-sizing: border-box;
    height: calc(100% - 43px);
    overflow-x: auto;
  }

  .users-online__list-item {
    width: 100%;
    margin: 0 0 5px;
  }

  /*********************************** Responsive styles */

  @media screen and (max-width: 1023px) {
    .users-online {
      width: 100%;
    }
  }
</style>

