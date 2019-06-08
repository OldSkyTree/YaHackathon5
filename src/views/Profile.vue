<template>
  <section>
    {{ user.username }}
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
			user: JSON.parse(localStorage.getItem('user'))
		};
	}
};
</script>