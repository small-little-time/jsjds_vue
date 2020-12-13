<template>
  <div class="login-container">
    <transition  name="fade" v-on:before-enter="beforeEnter"  v-on:after-leave="afterLeave">

      <el-form v-if="current=='login'" key="login" ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left" :style="loginsty">
        <div class="title-container">
          <h3 class="title">
            {{ $t('login.title') }}<br><br>
            {{$t('login.opt')}}
          </h3>
          <lang-select class="set-language" />
        </div>

        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            v-model="loginForm.username"
            :placeholder="$t('login.username')"
            name="username"
            type="text"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            v-model="loginForm.password"
            :type="passwordType"
            :placeholder="$t('login.password')"
            name="password"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">
          {{ $t('login.logIn') }}
        </el-button>

        <el-button  type="primary" @click="changeState()" style="float:right">
            {{ $t('login.toregist') }}
          </el-button>
      </el-form>

      <el-form v-else key="regist" ref="registerForm" :model="registerForm" :rules="registerRules" class="login-form" auto-complete="on" label-position="left" :style="registsty">
        <div class="title-container">
          <h3 class="title">
            {{ $t('register.title') }}<br><br>
            {{$t('register.opt')}}
          </h3>
          <lang-select class="set-language" />
        </div>

        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            v-model="registerForm.username"
            :placeholder="$t('register.username')"
            name="username"
            type="text"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            v-model="registerForm.password"
            :type="passwordType"
            :placeholder="$t('register.password')"
            name="password"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-form-item prop="re_password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            v-model="registerForm.re_password"
            :type="passwordType"
            :placeholder="$t('register.re_password')"
            name="re_password"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-form-item prop="vcode" style="width:70%;float:left;">
          <span class="svg-container" >
            <svg-icon icon-class="vcode" />
          </span>
          <el-input
            v-model="registerForm.vcode"
            :placeholder="$t('register.vcode')"
            name="vcode"
            type="text"
            auto-complete="on" @focus="getVcode"/>
        </el-form-item>

        <el-form-item  style="width:25%;float:right;height:50px">
          <img  :src="vcodesrc" width="100%" v-if="vcodeshow" @click="changeVcode" style="border-radius:3px">
          <el-input v-else 
            :placeholder="$t('register.vcodetip')"
          />
        </el-form-item>

        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleRegister">
          {{ $t('register.register') }}
        </el-button>
        <el-button class="gosign-button" type="primary" @click="changeState()" style="float:right">
            {{ $t('register.tologin') }}
        </el-button>
      </el-form>
    </transition>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
import SocialSign from './socialsignin'
import { log } from 'util';
import { registerNewUser } from '@/api/login'

export default {
  name: 'Login',
  components: { LangSelect, SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      if(value.length!=10){
        callback(new Error('请输入正确的学号'))
      }else if(value.substring(0,2)!="16"
      &&value.substring(0,2)!="17"
      &&value.substring(0,2)!="18"
      &&value.substring(0,2)!="19"){
        callback(new Error('请输入正确的学号'))
      }
      callback()
    }
    const validateLloginUsername = (rule, value, callback) => {
      if(value==null||value==''){
        callback(new Error('请输入正确的学号'))
      }
      callback()
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不得少于6个字符'))
      } else {
        callback()
      }
    }

     const validatePhoneNumber = (rule, value, callback) => {
       callback()
      // if (!isvalidatePhoneNumber(value)) {
      //   callback(new Error('Please enter the correct Phone Number'))
      //   this.isDisabled = true
      // } else {
      //   callback()
      //   this.isDisabled = false
      // }
    }
    const validateRePWD = (rule, value, callback) => {
      if (!(value === this.registerForm.password)) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    return {
      current:'login',

      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateLloginUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      redirect: undefined,




      registerForm: {
        username: '',
        password: '',
        re_password: '',
        vcode: ''
      },
      registerRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        phone: [{ required: true, trigger: 'blur', validator: validatePhoneNumber }],
        re_password: [{ required: true, trigger: 'blur', validator: validateRePWD }]
      },
      hasSent: false,
      counttime: 10,
      isDisabled: true,
      loginsty:'left:50%',
      registsty:'left:50%',
      vcodesrc:'',
      vcodeshow:false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleRegister(){
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true
          registerNewUser(this.registerForm).then((res) => {
            this.loading = false
            if(res.data.flag){
              this.$message({
                message: res.data.message,
                type: 'success'
              });
              this.current = 'login'
            }else{
              this.$message.error(res.data.message);
              if(res.data.code==500020){
                this.changeVcode();
              }
              
            }
          }).catch(() => { this.loading = false })

        } else {
          this.$message.error('请先完成注册信息');
          return false
        }
      })
    },
    changeState(){
      if(this.current=="login"){
        this.current = "regist"
      }else{
        this.current = "login"
      }
    },
    beforeEnter(){
      if(this.current=="regist"){
        this.registsty = "left:80%"
      }else{
        this.loginsty="left:80%"
      }
    },
    afterLeave(){
      if(this.current=="regist"){
        this.registsty = "left:50%"
      }else{
        this.loginsty="left:50%"
      }
    },
    getVcode(){
      this.$refs.registerForm.validate(valid => {
        if(this.vcodesrc==''){
          if (valid) {
            this.vcodesrc = "http://119.23.21.54:10010/user-service/user/vcode?stu_num="+this.registerForm.username;
            this.vcodeshow = true;
          }else{
            this.$message.error('请先完成注册信息');
          }
        }
        
      })
    },
    changeVcode(){
      this.$refs.registerForm.validate(valid => {
        if (valid) {
            this.vcodesrc = "http://119.23.21.54:10010/user-service/user/vcode?stu_num="+this.registerForm.username+"&date="+new Date();
          }else{
            this.$message.error('请先完成注册信息');
          }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:/*#283443*/#4d8581;
  $light_gray:#eee;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input{
      color: $cursor;
      &::first-line {
        color: $light_gray;
      }
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  // .login-form {
  //   position: relative;
  //   width: 520px;
  //   max-width: 100%;
  //   padding: 160px 35px 0;
  //   margin: 0 auto;
  //   overflow: hidden;
  // }
  .login-form{
    position: absolute;
    width: 520px;
    max-width: 100%;
    top: 50%;
    -webkit-transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translateX(-50%) translateY(-50%);
    -moz-transform: translateX(-50%) translateY(-50%);
    -ms-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size:18px;
      right: 0px;
      cursor: pointer;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
   .fade-leave-active {
    // transition: opacity .5s;
     animation: moveout .8s;
  }
  .fade-enter-active{
    left:90%;
    animation: movein .8s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  @keyframes moveout {
     10% {
        opacity: 0.9; 
        top: 50%;
        left:50%;
        -webkit-transform: translateX(-50%) translateY(-50%);
        -webkit-transform: translateX(-50%) translateY(-50%);
        -moz-transform: translateX(-50%) translateY(-50%);
        -ms-transform: translateX(-50%) translateY(-50%);
        transform: translateX(-50%) translateY(-50%);
     }
     100% {
        opacity: 0;
        left:10%;
        -webkit-transform: translateX(-50%) translateY(-50%);
        -webkit-transform: translateX(-50%) translateY(-50%);
        -moz-transform: translateX(-50%) translateY(-50%);
        -ms-transform: translateX(-50%) translateY(-50%);
        transform: translateX(-50%) translateY(-50%);
     }
  }
  @keyframes movein {
     10% {
        opacity: 0.1; 
        top: 50%;
        left:80%;
        -webkit-transform: translateX(-50%) translateY(-50%);
        -webkit-transform: translateX(-50%) translateY(-50%);
        -moz-transform: translateX(-50%) translateY(-50%);
        -ms-transform: translateX(-50%) translateY(-50%);
        transform: translateX(-50%) translateY(-50%);
     }
     100% {
        opacity: 1;
        left:50%;
        -webkit-transform: translateX(-50%) translateY(-50%);
        -webkit-transform: translateX(-50%) translateY(-50%);
        -moz-transform: translateX(-50%) translateY(-50%);
        -ms-transform: translateX(-50%) translateY(-50%);
        transform: translateX(-50%) translateY(-50%);
     }
  }
}

</style>
