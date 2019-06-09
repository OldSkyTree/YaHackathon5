<template>
  <section>
    <div
      id="tabs"
      class="tabs-container"
    > 
      <div class="tabs">
        <a
          :class="[ activetab === -1 ? 'active' : '' ]"
          @click="activetab = -1"
        >Общий</a>
        <a
          v-for="(chat, index) in chats"
          :key="index" 
          :class="[ activetab === index ? 'active' : '' ]" 
          @click="activetab = index"
        >{{ chat.chatName }}</a>
      </div>
      <div class="content">
        <div
          v-if="activetab === -1"
          class="tabcontent"
        >
          <div
            v-for="(message, index) in messages"
            :key="index"    
          >
            @{{ message.user.username }}
            {{ new Date(message.timestamp).toLocaleTimeString() }}

            {{ message.message }}
          </div>
        </div>
        <div
          v-for="(chat, upper_index) in chats"
          :key="upper_index"
        >
          <div
            v-if="activetab === upper_index"
            class="tabcontent"
          >
            <div
              v-for="(message, index) in chat"
              :key="index"
            >
              @{{ message.user.username }}
              {{ new Date(message.timestamp).toLocaleTimeString() }} ({{ new Date(message.timestamp).toLocaleDateString() }})

              {{ message.message }}
            </div>
          </div>
        </div>
      </div>
    </div>

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
			chats: [],
			messages: [],
			newMessage: '',
			activetab: -1
		};
	},
	created() {
		const timestamp = Date.now();

		setInterval(() => {
			const user = localStorage.getItem('user');
			if(!user) return;

			const userToken = JSON.parse(user).token;
			const userName = JSON.parse(user).username;

			fetch(`http://localhost:3000/super-chat?timestamp=${timestamp}&token=${userToken}&username=${userName}`,{
				method: 'GET'
			})
				.then(res => {
					return res.json();
				})
				.then(res => {
					if(res.status === 'ok') {
						this.messages = res.generalChat;
						this.chats = [];
						Object.keys(res.privateChats).forEach(element => {
							res.privateChats[element].chatName = element;
							this.chats.push(res.privateChats[element]);
						});
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

			let message = this.newMessage;

			if (this.activetab !== -1) {
				message = `@${this.chats[this.activetab].chatName} ${this.newMessage}`;
			}

			fetch('http://localhost:3000/chat', {
				method: 'POST',
				body: JSON.stringify({
					token: userToken,
					message
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
.tabs-container {  
    max-width: 620px; 
    min-width: 420px;
    margin: 40px auto;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.9em;
    color: #888;
}

/* Style the tabs */
.tabs {
  overflow: hidden;
  margin-left: 20px;
  /*hide bottom border*/ 
  margin-bottom: -2px; 
}

.tabs ul {
  list-style-type: none;
  margin-left: 20px;
}

.tabs a{
  color: #000;
  float: left;
  cursor: pointer;
  padding: 12px 24px;
  transition: background-color 0.2s;
  border: 1px solid #ccc;
  border-right: none;
  background-color: #f1f1f1;
  border-radius: 10px 10px 0 0;
  font-weight: bold;

}
.tabs a:last-child { 
  border-right: 1px solid #ccc;
}

/* Change background color of tabs on hover */
.tabs a:hover {
  background-color: #aaa;
  color: #fff;
}

/* Styling for active tab */
.tabs a.active {
  background-color: #fff;
  color: #484848;
  border-bottom: 2px solid #fff;
  cursor: default;
}

/* Style the tab content */
.tabcontent {
  padding: 30px;
  background-color: #202020;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 3px 3px 6px #e1e1e1
}
</style>
