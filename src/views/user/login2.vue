<template>
  <div class="login">
    <div class="middle">
      <div class="middle-left">
        <img src="../../assets/images/login.png" class="middle-left-img">
      </div>
      <div class="middle-right">
        <div class="title">{{title}}——登录</div>
        <form autocomplete="off" method="post" style="height:49.77%;">
          <div class="inputBox">
            <input type="text" name="username" v-model="loginForm.username" required autocomplete="new-username"
              tabindex="1" @blur="verify('username')">
            <label>用户名</label>
            <span class="warning" v-show="inputName">请输入用户名！</span>
          </div>
          <div class="inputBox">
            <input :type="passwordType" name="password" v-model="loginForm.password" required
              autoComplete="new-password" @blur="verify('password')" @keyup.enter="handleLogin">
            <label>密码</label>
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
            <span class="warning" v-show="inputPass">请输入密码！</span>
          </div>
          <button class="button" type="button" @click="handleLogin">登录</button>
        </form>
      </div>
    </div>
    <div class="bottom">
      <div class="link">
        <a href="http://www.xlcwnet.com/aboutus">关于我们</a> -
        <a href="http://www.xlcwnet.com/career"> 加入我们</a> -
        <a href="http://www.xlcwnet.com/contact">联系我们</a> -
        <a href="http://www.xlcwnet.com/index/pro">用户协议</a>
      </div>
      <div>©2020 深圳市XXXXX网络​技术有限公司 版权所有 (粤ICP备14XXXX1号-3)</div>
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
        title: title,// 系统标题
        loginForm: {
          username: '',
          password: '',
        },
        inputName: false,
        inputPass: false,
        redirect: undefined,
        passwordType: 'password',
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login {
    background: url(../../assets/images/bg1.png) no-repeat center;
    background-size: 100% 100%;
    -moz-background-size:100% 100%;
    min-height: 100%;
    width: 100%;
    overflow: hidden;
  }

  .middle {
    height: 45.41vh;
    width: 85.34vh;
    margin: 0 auto;
    display: flex;
    margin-top: 23.80vh;

    .middle-left {
      background-image: linear-gradient(to top right, #2375FF, #67AAFE);
      width: 50%;
      height: 100%;
      border-radius: 10px 0 0 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      display:flex;
    }

    .middle-left-img{
      width:281px;
      height:217px;
      margin:auto;
    }

    .middle-right {
      width: 50%;
      height: 100%;
      border-radius: 0 10px 10px 0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      padding: 5.21% 6.16%;

      .title {
        color: #2375FF;
        font-size: 24px;
        font-weight: 600;
        font-family: 'Microsoft YaHei';
        margin-bottom: 18.15%;
      }

      .button {
        margin-top: 9%;
        width: 100%;
        height: 48px;
        background: #2375FF;
        border: 0;
        border-radius: 5px;
        color: #fff;
        font-size: 18px;
        outline: none;
      }

      .button:hover {
        background: #67AAFE;
      }

      .button:active {
        transform: scale(0.95, 0.95)
      }
    }
  }

  .bottom {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%) translateY(0%);
    text-align: center;
    color: #999;
    font-size: 13px;
    line-height:20px;

    .link a {
      color: #999;
    }

    .link a:hover {
      color: #333;
    }
  }

  .inputBox {
    position: relative;
    height: 38%;
  }

  .inputBox input {
    width: 100%;
    padding: 15px 0 5px 0;
    font-size: 14px;
    color: #666;
    letter-spacing: 1px;
    margin-bottom: 16px;
    border: none;
    border-bottom: 1px solid rgba(35,117,255,0.5);
    outline: none;
    background: transparent;
  }

  input:-internal-autofill-previewed,
  input:-internal-autofill-selected {
    -webkit-text-fill-color: #666;
    transition: background-color 5000s ease-out 0.5s;
  }

  .inputBox label {
    position: absolute;
    top: 5px;
    left: 10px;
    padding: 10px 0;
    letter-spacing: 1px;
    font-size: 13px;
    color: rgba(35,117,255,0.5);
    pointer-events: none;
    transition: .5s;
  }


  .inputBox input:focus~label,
  .inputBox input:valid~label {
    top: -18px;
    left: 0;
    color: #2375FF;
    font-size: 12px;
  }

  .inputBox .warning {
    font-size: 12px;
    color: #F56C6C;
    position: relative;
    top: -18px;
    left: 10px;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 15px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
  }
</style>