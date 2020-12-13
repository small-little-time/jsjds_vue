<template>
    <div>
        <el-input v-model="stuid" placeholder="学号"></el-input>
        <el-input v-model="username" placeholder="用户名"></el-input>
        <el-input v-model="stupassword" placeholder="密码"></el-input>
        <button type="button" class="loginById" id="login-botton" v-on:click="register">完成</button><br/>
    </div>
    
</template>

<script>
export default {
    data(){
        return{
            stuid: '',
            username:'',
            stupassword:''
        }
    },
    methods:{
        register:function(){
            let para = this.$qs.stringify({
                    stuid:this.stuid,
                    stupassword:this.stupassword,
                    username:this.username
                })
                this.axios({
                    url:  this.store.state.baseUrl+'/access/register',
                    method: 'POST',
                    data:para
                }).then((res) => {
                        if(res.data.code='200'){
                            this.$message({
                                message: '恭喜你，这是一条成功消息',
                                type: 'success'
                            });
                        }else{
                            this.$message.error(res.data.errorMessage);
                        }
                }, (err) => {
                }) 
        }
    }
}
</script>

<style>

</style>
