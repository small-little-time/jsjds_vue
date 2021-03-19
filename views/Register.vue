<template>
  <div :style="welcome" class="welcome">

    <div class="container">
      <div class="welcome-text">
        <h3>欢迎新同学！</h3>
      </div>
      <div class="welcome-desc">
        <p>先给自己设置一个密码吧！</p>
      </div>
      <form class="form">
        <div id="form_1">
          <label id="username_pre" class="control-label">学号</label>
          <div class="label_u">
            <input id="username" v-model="stuid" type="text" class="form-input" disabled>
            <div id="underline"/>
          </div>
        </div>
        <div id="form_2">
          <label id="password_pre" class="control-label_p">密码</label>
          <div class="label_p" style="height: 60px;">
            <input id="password" v-model="stupassword" type="password" class="form-input">
            <div id="underline_p"/>
          </div>
        </div>
        <div id="form_2">
          <label id="repassword_pre" class="control-label_rep">确认密码</label>
          <div class="label_p" style="height: 60px;">
            <input id="repassword" v-model="restupassword" type="password" class="form-input">
            <div id="underline_rep"/>
          </div>
        </div>
        <button id="login-botton" type="button" class="loginById" @click="register">完成</button>
        <br>
        <!-- <button type="button" class="loginByYiBan"  onclick="login();" ><img class="yiban_logo" :src= "require('../assets/yiban_logo.png')" width=18 height=18 />易班登录</button><br/> -->
        <!-- <button type="button" class="loginByQQ"  onclick="login();">QQ登录</button><br/> -->
      </form>
    </div>
  </div>

</template>

<script>
import $ from 'jquery'
import axios from 'axios'
import { regist } from '../api/api'

export default {
  name: 'Productdetailspage',
  data() {
    return {
      welcome: {
        height: '100%',
        backgroundImage: 'url(' + require('../assets/welcome.svg') + ')'
      },
      stuid: '',
      stupassword: '',
      restupassword: '',
      accessToken: ''

    }
  },
  beforeCreate: function() {
    if (this.store.state.isLogin) {
      // eslint-disable-next-line no-undef
      that.$router.push('/sign')
    }
  },
  mounted: function() {
    this.stuid = this.$route.query.userid
    this.accessToken = this.$route.query.accessToken
    console.log(this.$route.query)
  },
  methods: {
    register: function() {
      if (this.stupassword !== this.restupassword) {
        this.$message.error('两次输入的密码不一致哦！')
      } else if (this.stupassword.length < 6) {
        this.$message.error('密码需大于6位')
      } else {
        const para = this.$qs.stringify({
          stuid: this.stuid,
          stupassword: this.stupassword,
          accessToken: this.accessToken
        })
        this.axios({
          url: this.store.state.baseUrl + '/access/regist',
          method: 'POST',
          data: para
        }).then((res) => {
          console.log(res)
          if (res.data.code !== '200') {
            this.$message.error(res.data.errorMessage)
          } else {
            this.store.state.token = 'Bearer ' + res.data.data.token
            this.store.state.isLogin = true
            localStorage.setItem('token', this.store.state.token)
            localStorage.setItem('isLogin', this.store.state.isLogin)
            localStorage.setItem('createtime', new Date().getTime())
            this.$message({
              showClose: true,
              message: '注册成功，正在返回主页',
              type: 'success'
            })
            this.$router.push({ path: '/' })
          }
        }, (err) => {
        })
      }
    }

  }

}
$(function() {
  // 若输入框有值，调整
  if ($('#password').val() != '') {
    $('#password_pre').css({ 'font-size': '16px', 'margin': '183px 0 0 0' })
  }
  if ($('#username').val() != '') {
    $('#username_pre').css({ 'font-size': '16px', 'margin': '-34px 0 0 0' })
  }
  if ($('#repassword').val() != '') {
    $('#repassword_pre').css({ 'font-size': '16px', 'margin': '-34px 0 0 0' })
  }
  $('#username').focus(function() {
    $('#username_pre').css({ 'font-size': '16px', 'margin': '-34px 0 0 0' })
    $('#underline').css({ 'width': '78%', 'left': '11%' })
  })
  $('#username').blur(function() {
    if ($('#username').val() == '') {
      $('#username_pre').css({ 'font-size': '18px', 'margin': '0px 0 0 0' })
    }
    $('#underline').css({ 'width': '0%', 'left': '50%' })
  })
  $('#password').focus(function() {
    $('#password_pre').css({ 'font-size': '16px', 'margin': '-30px 0 0 0' })
    $('#underline_p').css({ 'width': '78%', 'left': '11%' })
  })
  $('#password').blur(function() {
    if ($('#password').val() == '') {
      $('#password_pre').css({ 'font-size': '18px', 'margin': '0px 0 0 0' })
    }
    $('#underline_p').css({ 'width': '0%', 'left': '50%' })
  })
  $('#repassword').focus(function() {
    $('#repassword_pre').css({ 'font-size': '16px', 'margin': '-30px 0 0 0' })
    $('#underline_rep').css({ 'width': '78%', 'left': '11%' })
  })
  $('#repassword').blur(function() {
    if ($('#repassword').val() == '') {
      $('#repassword_pre').css({ 'font-size': '18px', 'margin': '0px 0 0 0' })
    }
    $('#underline_rep').css({ 'width': '0%', 'left': '50%' })
  })
})
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
    #underline_rep{
	    width: 0;
	    height: 2px;
	    background: #2FA78A ;
	    position: absolute;
	    top: 226px;
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
    .control-label_rep{
		    color: #2d2d2d;
		    top: 189.5px;
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
