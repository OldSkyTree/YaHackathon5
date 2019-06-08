<template>
  <section>
    {{ user }}
  </section>
</template>

<script>
export default {
	data() {
		return {
			user: JSON.parse(localStorage.getItem('user'))
		};
	}
};
</script>