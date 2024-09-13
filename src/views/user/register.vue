<template>
  <div class="register-container">
    <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="register-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">{{title}}——注册</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="registerForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="registerForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"/>
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item prop="surePassword">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="surePasswordType"
          ref="surePassword"
          v-model="registerForm.surePassword"
          :type="surePasswordType"
          placeholder="确认密码"
          name="surePassword"
          tabindex="3"
          @keyup.enter.native="handleRegister"/>
        <span class="show-pwd" @click="showSurePwd">
          <svg-icon :icon-class="surePasswordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <div class="go-login" @click="goLogin">已有账号</div>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleRegister">注册</el-button>
    </el-form>
  </div>
</template>
<script>
import { isValidNumAndLetter } from '@/utils/validate'
import { title } from '@/settings.js'
export default {
  name: 'Register',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isValidNumAndLetter(value)) {
        callback(new Error('请填写正确的用户名！'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位！'))
      } else {
        callback()
      }
    }
    const validatesurePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位！'))
      } else if(value!=this.registerForm.password){
        callback(new Error('确认密码与密码不一致！'))
      }else {
        callback()
      }
    }
    return {
      title: title,// 系统标题
      registerForm: {// 表单
        username: '',
        password: '',
        surePassword: '',
      },
      registerRules: {// 表单验证
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        surePassword: [{ required: true, trigger: 'blur', validator: validatesurePassword }]
      },
      loading: false,// 注册按钮加载
      passwordType: 'password',// 密码是否显示
      surePasswordType: 'password',// 确认密码是否显示
    }
  },
  methods: {
    // 密码是否显示
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
    // 确认密码是否显示
    showSurePwd() {
      if (this.surePasswordType === 'password') {
        this.surePasswordType = ''
      } else {
        this.surePasswordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.surePassword.focus()
      })
    },
    // 注册
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/register', this.registerForm).then(() => {
            this.$message.success('注册成功，返回登录！')
            this.$router.push('/login')  
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    // 注册
    goLogin(){
      this.$router.push('/login')  
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .register-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.register-container {
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
        box-shadow: 0 0 0px 1000px $bg inset !important;
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

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.register-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .register-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
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

  .go-login{
    color: $light_gray;
    float:right;
    font-size:13px;
    margin: -10px 0 10px;
    cursor:pointer;
    text-decoration:underline
  }
}
</style>
