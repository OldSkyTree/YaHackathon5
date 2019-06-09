<template>
    <section>
        <div>
            Вы: {{ combat.you.username }}
        </div>
        <div>
            Противник: {{ combat.enemy.username }}
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            combat: ''
        };
    },
    created() {
        this.combat = this.$route.params.combat;
    }
}
</script>
