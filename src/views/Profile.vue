<template>
  <section>
    {{ user }}
    
    <users-online/>

  </section>
</template>

<script>
import usersOnline from '../components/users-online.vue';

export default {
    components: {
        usersOnline
    },
	data() {
		return {
			user: JSON.parse(localStorage.getItem('user'))
		};
	}
};
</script>