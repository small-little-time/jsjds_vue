<template>
    <div class="welcome" :style ="welcome">

        <div class="container">
 			<div class="welcome-text">
                <h3>让我们开始吧！</h3>
                {{username}}
            </div>
            <div class="welcome-desc">
                <p>若有账号问题，请联系相应管理员哦！</p>
            </div>
			<form class="form">
                <div id = "form_1">
                    <label  class="control-label"  id="username_pre" >学号</label>
                    <div class="label_u"  >
                        <input type="text" id="username" class="form-input" v-model="stuid">
                        <div id="underline"></div>
                    </div>
                </div>
                <div  id = "form_2">
                    <label  class="control-label_p" id="password_pre">密码</label>
                    <div class="label_p" style="height: 60px;" >
                        <input type="password" id="password" class="form-input" v-model="stupassword">
                        <div id="underline_p"></div>
                    </div>
                </div>
				<button type="button" class="loginById" id="login-botton" v-on:click="login">登录</button><br/>
                <button type="button" class="loginByYiBan"  v-on:click="yb_login" ><img class="yiban_logo" :src= "require('../assets/yiban_logo.png')" width=18 height=18 />易班登录</button><br/>
                <!-- <button type="button" class="loginByQQ"  onclick="login();">QQ登录</button><br/> -->
			</form>
		</div>
    </div>
 
</template>

<script>
import $ from "jquery";
import axios from 'axios';

export default {
    name: 'productdetailspage',
    data() {
        return {
            welcome: {
                height:"100%",
                backgroundImage: "url(" + require("../assets/welcome.svg") + ")",
          },
          stuid:"",
          stupassword:""
        
        }
    },
    methods:{
        yb_login:function(){
            window.location.href = this.store.state.baseUrl+"/access/init"
        },
        login : function () {
            var that = this;
            if(!this.store.state.isLogin){
                this.axios({
                    url: this.store.state.baseUrl+'/auth/login',
                    method: 'POST',
                    data:this.$qs.stringify({
                        username: that.stuid,
                        password: that.stupassword
                    })
                }).then((res) => {
                    if(res.data.code!='200'){
                        this.$message.error(res.data.errorMessage);
                    }else{
                        that.store.state.token='Bearer '+res.data.data.token
                        that.store.state.isLogin=true
                        localStorage.setItem("token",that.store.state.token);
                        localStorage.setItem("isLogin",that.store.state.isLogin);
                        localStorage.setItem("createtime",new Date().getTime())
                        var temp = this;
                        setTimeout(function(){
                            temp.$message({
                                message: '欢迎登录易班共享平台',
                                type: 'success'
                            });
                        },500)
                        this.$router.push({ path: '/selfinfo' });
                    }
                }, (err) => {
            
                }) 
            }else{
                this.$message.error('您已成功登陆，请勿重新操作');
            }
        },
        init(){
            // 若输入框有值，调整
            if($("#password").val()!=""){
                $("#password_pre").css({"font-size":"16px","margin":"183px 0 0 0"})
            }
            if($("#username").val()!=""){
                $("#username_pre").css({"font-size":"16px","margin":"123px 0 0 0"})
            }
            $("#username").focus(function(){
                $("#username_pre").css({"font-size":"16px","margin":"-34px 0 0 0"})
                $("#underline").css({"width":"78%","left":"11%"});
            })
            $("#username").blur(function(){
                if($("#username").val()==""){
                    $("#username_pre").css({"font-size":"18px","margin":"0px 0 0 0"})
                }
                $("#underline").css({"width":"0%","left":"50%"});
            })
            $("#password").focus(function(){
                $("#password_pre").css({"font-size":"16px","margin":"-30px 0 0 0"})
                $("#underline_p").css({"width":"78%","left":"11%"});
            })
            $("#password").blur(function(){
                if($("#password").val()==""){
                    $("#password_pre").css({"font-size":"18px","margin":"0px 0 0 0"})
                }
                $("#underline_p").css({"width":"0%","left":"50%"});
            })
        }
    },
    beforeCreate:function(){
        if(this.store.state.isLogin){
            that.$router.push('/sign')
        }
    },
    mounted:function(){
        let id = this.$route.params.userid;
        this.init();
    }
    
}
</script>

<style>
    *{margin:0px;padding: 0px;}
    .welcome{
       background-position: -196px -293px;
       overflow: hidden;
    }
    .yiban_logo{
        margin-top: 8px;
    }
    .container{
        width: 360px;
        height:191px;
        /* left:50%;
        top:31%; */
        text-align: center;
        margin-top: 3rem;
    }
    .welcome-text {
        font-size: 32px;
	    margin-bottom: 10px;
	    text-align: center;
	}
	.welcome-desc {
	    margin-bottom: 40px;
	    text-align: center;
	    font-weight: 200;
        font-size: 16px;
	}
    .label_u label{color: #004736}
	.label_p label{color: #004736}
     #underline{
	    width: 0;
	    height: 2px;
	    background: #2FA78A ;
	    position: absolute;
	    top: 42px;
	    left: 50%;
	    transition: all .8s;
	}

	#underline_p{
	    width: 0;
	    height: 2px;
	    background: #2FA78A ;
	    position: absolute;
	    top: 124px;
	    left: 50%;
	    transition: all .8s;
	}
    .control-label{
		    color: #2d2d2d;
		    top: 13px;
            left:46px;
	    	font-size: 22px;
		    font-weight: 400;
		    margin: 0px 0 0 0;
		    position: absolute;
	        pointer-events: none;
	        -webkit-transition: .3s ease all;
	    	-o-transition: .3s ease all;
	    	transition: .3s ease-in-out all;
	}
	.control-label_p{
		    color: #2d2d2d;
		    top: 93.5px;
            left:46px;
	    	font-size: 22px;
		    font-weight: 400;
		    margin: 0px 0 0 0;
		    position: absolute;
	        pointer-events: none;
	        -webkit-transition: .3s ease all;
	    	-o-transition: .3s ease all;
	    	transition: .3s ease-in-out all;
	}
    form{
        position: relative;
        z-index: 2;
    }
    .form .form-input{
        outline: none;
        border: 1px solid rgba(255,255,255,0.4);
        background: rgba(255,255,255,0.2);
        width: 250px;
        border-radius: 4px;
        padding: 10px 15px;
        margin:0 auto 10px;
        font-size: 18px;
        color: #2d2d2d;
        display: block;
        transition-duration: 0.25s;
        font-weight: 300;
        margin-top: 40px;
    }
    form input:hover{
        background: rgba(255,255,255,0.4);
    }
    .form .form-input:focus{
        background: #fff;
        color: #5Eafce;
    }
    form .loginById{
        outline: none;
        background-color: #20344c;
        border:0;
        margin-top: 20px;
        /* padding: 10px 15px; */
        color: #fff;
        border-radius: 3px;
        width: 80%;
        height:44px;
        cursor: pointer;
        font-size: 18px;
        line-height: 44px;
        transition-duration: 0.25s;
    }
    form .loginById:hover{
        background: rgb(26, 46, 70);
    }
    form .loginByYiBan{
        outline: none;
        background-color: #20344c;
        border:0;
        margin-top: 20px;
        /* padding: 10px 15px; */
        color: #fff;
        border-radius: 3px;
        width: 80%;
        height:44px;
        cursor: pointer;
        font-size: 18px;
        line-height: 44px;
        transition-duration: 0.25s;
    }
    form .loginByYiBan:hover{
        background: rgb(26, 46, 70);
    }
    form .loginByQQ{
        outline: none;
        background-color: #20344c;
        border:0;
        margin-top: 20px;
        /* padding: 10px 15px; */
        color: #fff;
        border-radius: 3px;
        width: 80%;
        height:44px;
        cursor: pointer;
        font-size: 18px;
        line-height: 44px;
        transition-duration: 0.25s;
    }
    form .loginByQQ:hover{
        background: rgb(26, 46, 70);
    }


</style>
