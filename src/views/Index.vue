<template>
    <section class="section">
        <el-form class="login">
            <el-form-item label="Login">
                <el-input placeholder="Login" v-model="user.name">4</el-input> 
            </el-form-item>
            <el-form-item label="Password">
                <el-input placeholder="Password" v-model="user.password" show-password> </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="success">Log in</el-button>
            </el-form-item>
        </el-form>
    </section>
</template>
<script>
export default {
    data() {
        return {
            user: {
                name: '',
                password: ''
            }
        }
    }
}
</script>

<style>
.section {
    display: flex;
}
.login {
   margin: auto; 
   width: 40%;
   
}
</style>
