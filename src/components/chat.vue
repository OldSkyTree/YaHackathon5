<template>
  <section class="chat">
    <div
      class="tabs"
    > 
      <div class="tabs__nav">
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
      <div class="tabs__content">
        <div
          v-if="activetab === -1"
          class="tabs__content-item"
        >
          <div
            v-for="(message, index) in messages"
            :key="index"    
          >
            {{ new Date(message.timestamp).toLocaleTimeString() }}
            @{{ message.user.username }}
            
            {{ message.message }}
          </div>
        </div>
        <div
          v-for="(chat, upper_index) in chats"
          :key="upper_index"
        >
          <div
            v-if="activetab === upper_index"
            class="tabs__content-item"
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

    <form class="send-message">
      <textarea 
        v-model="newMessage"
        class="send-message__textarea"
      />
      <button
        type="button"
        class="send-message__btn"
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
.chat {
  width: 75%;
  padding-right: 20px;
  box-sizing: border-box;
}

.tabs {  
  width: 100%;
}

/* Style the tabs */
.tabs__nav {
  overflow: hidden;
  margin-left: 20px;
  /*hide bottom border*/ 
  margin-bottom: -1px; 
}

.tabs__nav ul {
  list-style-type: none;
  margin-left: 20px;
}

.tabs__nav a {
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
.tabs__nav a:last-child { 
  border-right: 1px solid #ccc;
}

/* Change background color of tabs on hover */
.tabs__nav a:hover {
  background-color: #aaa;
  color: #fff;
}

/* Styling for active tab */
.tabs__nav a.active {
  background-color: #fff;
  color: #484848;
  border-bottom: 2px solid #fff;
  cursor: default;
}

/* Style the tab content */
.tabs__content {
  background-color: #202020;
  border: 1px solid #ccc;
  padding: 10px 20px;
  box-sizing: border-box;
  height: 80px;
  overflow-x: auto;
}

.send-message {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
}
.send-message__textarea {
  width: 80%;
  padding: 10px 15px;
  box-sizing: border-box;
  resize: none;
  height: 50px;
  font-size: 16px;
}
.send-message__btn {
  width: 20%;
  box-sizing: border-box;
}
</style>
