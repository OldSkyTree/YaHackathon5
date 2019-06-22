<template>
  <section class="page-section">
    <div class="container">
      <div class="page-section__content">
        <h1>Топ игроков</h1>
        <ol class="top">
          <li
            v-for="(user, index) in topList"
            :key="index"
          >
            {{ (index + 1) }}. {{ user.username }} ({{ user.winrate }}%)
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<script>
export default {
	data() {
		return {
			topList: []
		};
	},
	created() {
		fetch('http://localhost:3000/top-player', {
			method: 'GET'
		})
			.then(res => res.json())
			.then(res => {
				this.topList = res;
			});
	}
};
</script>

<style>
.top li {
  display: block;
  margin: 1.5em 0;
}
</style>
