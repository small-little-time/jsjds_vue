<template>
   <div>
        登录成功，正常返回主页
   </div>
    
</template>

<script>
export default {
    data(){
        return{
            token:''
        }
    },
    mounted:function(){
        this.token = this.$route.query.token;
        this.store.state.token='Bearer '+this.token
        this.store.state.isLogin=true
        localStorage.setItem("token",this.store.state.token);
        localStorage.setItem("isLogin",this.store.state.isLogin);
        localStorage.setItem("createtime",new Date().getTime())
        this.$router.push({ path: '/selfinfo' });
    }
}
</script>

<style>

</style>
