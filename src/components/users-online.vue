<template>
    <div>
        <h3>Пользователи online</h3>
        <ul>
            <li v-for="(user, index) in usersOnline"
                :key="index"
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
        }
    },
    created() {
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
</script>

