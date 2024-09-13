<template>
  <div class="login">
    <div class="login-left">
      <div class="login-left-title">
        <div class="login-logo"></div>
        <div class="login-title">{{title}}</div>
      </div>
      <img src="../../assets/images/login2.png" />
    </div>

    <div class="login-right">
      <div class="login-card">
        <h2 class="card-title">欢迎登录</h2>
        <div class="card-item">
          <div class="card-item-top">
            <div class="card-item-name">用户名</div>
            <input type="text" name="username" v-model="loginForm.username" required autocomplete="new-username"
              placeholder="请输入用户名" @blur="verify('username')" />
          </div>
          <div class="card-item-warning" v-show="inputName">用户名不能为空！</div>
        </div>
        <div class="card-item">
          <div class="card-item-top">
            <div class="card-item-name">密码</div>
            <input type="password" name="password" v-model="loginForm.password" required autocomplete="new-password"
              placeholder="请输入密码！" @blur="verify('password')" @keyup.enter="handleLogin" />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </div>
          <div class="card-item-warning" v-show="inputPass">密码不能为空！</div>
        </div>
        <el-checkbox style="margin-top: 8%;">记住登录密码</el-checkbox>
        <span style="float:right;margin-top: 8%;">忘记密码？</span>
        <el-button class="card-button" @click="handleLogin">登录</el-button>
        <div class="card-footer">
          <span>短信验证码登录</span>
          <span> 没有账号？<span style="color:#c79156">立即注册</span></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    title
  } from '@/settings.js'
  export default {
    name: 'Login',
    data() {
      return {
        title: title, // 系统标题
        loginForm: {
          username: '',
          password: ''
        },
        passwordType: 'password',
        redirect: undefined,
        inputName: false,
        inputPass: false,
      }
    },
    watch: {
      $route: {
        handler: function (route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    methods: {
      verify(val) {
        if (val == 'username') {
          this.inputName = this.loginForm.username ? false : true
        } else {
          this.inputPass = this.loginForm.password ? false : true
        }
      },
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      handleLogin() {
        if (!this.loginForm.username) {
          this.inputName = true
          return
        } else if (!this.loginForm.password) {
          this.inputPass = true
          return
        } else {
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$store.dispatch('user/getPermissions').then(() => {
              this.$router.push({
                path: this.redirect || '/dashboard'
              })
            }).catch(() => {})
          }).catch(() => {})
        }
      },
    }
  }
</script>
<style lang="scss" scoped>
  .login {
    background: #22252f;
    min-height: 100%;
    width: 100%;
    display: flex;
    padding: 5%;
  }

  .login-left {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 55%;
    color: #fff;
    padding-left: 5%;

    .login-left-title {
      display: flex;
      margin-left:10%;
      margin-bottom:-5%;
    }

    .login-logo {
      background: url(../../assets/images/logo.png) no-repeat center;
      background-size: 100% 100%;
      height: 50px;
      width: 50px;
      display: inline-block;
      margin-right: 15px;
    }

    .login-title {
      font-weight: 600;
      font-size: 28px;
      line-height: 50px;
    }

    img {
      width: 100%;
      height: 90%;
    }
  }

  .login-right {
    display: flex;
    width: 45%;

    .login-card {
      width: 35vh;
      height: 42vh;
      min-width:300px;
      min-height:350px;
      background: #fff;
      margin: auto;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      border-radius: 8px;
      padding: 3.5%;
      color: #606266;
      font-size: 14px;
      position: relative;
    }

    .card-title {
      text-align: center;
      color: #484848;
      letter-spacing: 1px;
      margin-bottom: 13%;
    }

    .card-item {
      height: 16%;
    }

    .card-item-top {
      border-bottom: 1px solid #E4E7ED;
      padding-bottom: 3%;
      display: flex;
    }

    .card-item-name {
      color: #303133;
      font-size: 15px;
      width: 25%;
    }

    .card-item-top input {
      width: 80%;
      letter-spacing: 1px;
      border: none;
      outline: none;
      background: #fff;
    }

    ::-webkit-input-placeholder {
      color: #C0C4CC;
    }

    input:-internal-autofill-previewed,
    input:-internal-autofill-selected {
      -webkit-text-fill-color: #606266;
      transition: #fff 5000s ease-out 0.5s;
    }

    .card-item-warning {
      color: #F56C6C;
    }

    .card-button {
      width: 100%;
      background-color: #c79156;
      color: #fff;
      border:none;
    }

    .card-button:hover{
      transform: scale(0.95, 0.95)
    }

    .show-pwd {
      position: relative;
      right: 5px;
      top: 5px;
      cursor: pointer;
      user-select: none;
    }

    .card-footer{
      position:absolute;
      bottom: 3%;
      width:90%;
      display: flex;
      justify-content: space-between;
    }
  }
</style>