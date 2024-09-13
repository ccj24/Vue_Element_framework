<template>
    <div class="login-container">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
            label-position="left">
            <div class="title-container">
                <div class="title">{{title}}——登录</div>
            </div>

            <el-form-item prop="username">
                <span class="svg-container">
                    <svg-icon icon-class="user" />
                </span>
                <el-input ref="username" v-model="loginForm.username" placeholder="用户名" name="username" type="text"
                    tabindex="1" auto-complete="on" />
            </el-form-item>

            <el-form-item prop="password">
                <span class="svg-container">
                    <svg-icon icon-class="password" />
                </span>
                <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType"
                    placeholder="密码" name="password" tabindex="2" auto-complete="on"
                    @keyup.enter.native="handleLogin" />
                <span class="show-pwd" @click="showPwd">
                    <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                </span>
            </el-form-item>

            <div class="go-register" @click="goRegister">没有账号</div>

            <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
                @click.native.prevent="handleLogin">登录</el-button>
            <div class="angle angle-left-top"></div>
            <div class="angle angle-left-bottom"></div>
            <div class="angle angle-right-top"></div>
            <div class="angle angle-right-bottom"></div>
        </el-form>
    </div>
</template>
<script>
    import {
        isValidNumAndLetter
    } from '@/utils/validate'
    import {
        title
    } from '@/settings.js'
    export default {
        name: 'Login',
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
            return {
                title: title, // 系统标题
                loginForm: { // 表单
                    username: '',
                    password: ''
                },
                loginRules: { // 表单验证
                    username: [{
                        required: true,
                        trigger: 'blur',
                        validator: validateUsername
                    }],
                    password: [{
                        required: true,
                        trigger: 'blur',
                        validator: validatePassword
                    }]
                },
                loading: false, // 登录按钮加载
                passwordType: 'password', // 密码是否显示
                redirect: undefined // 重定向地址
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
            // 登录
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true
                        this.$store.dispatch('user/login', this.loginForm).then(() => {
                            this.$router.push({
                                path: this.redirect || '/'
                            })
                            this.loading = false
                        }).catch(() => {
                            this.loading = false
                        })
                    }
                })
            },
            // 注册
            goRegister() {
                this.$router.push('/register')
            }
        }
    }
</script>

<style lang="scss">
    $bg:#172130;
    $light_gray:#fff;
    $primary_color:#4145FD;

    @supports (-webkit-mask: none) and (not (cater-color: $light_gray)) {
        .login-container .el-input input {
            color: $light_gray;
        }
    }

    .login-container {
        .el-input {
            display: inline-block;
            width: 85%;

            input {
                background: transparent;
                border: 0;
                -webkit-appearance: none;
                border-radius: 0px;
                padding: 0px 5px 0px 15px;
                color: $light_gray;
                caret-color: $light_gray;

                &:-webkit-autofill {
                    box-shadow: 0 0 0px 1000px $bg inset !important;
                    -webkit-text-fill-color: $light_gray !important;
                }
            }
        }

        .el-form-item {
            border: 1px solid rgba(65, 69, 253, 0.4);
            background: $bg;
            border-radius: 5px;
            color: $light_gray;
            height: 44px !important;
        }
    }
</style>

<style lang="scss" scoped>
    $dark_gray:#889aa4;
    $light_gray:#eee;
    $border:4px solid #4145FD;
    $border_after:4px solid #1519a4;
    $border_transparent:4px solid transparent;

    .login-container {
        min-height: 100%;
        width: 100%;
        background: url(../../assets/images/bg2.png) no-repeat center;
        background-size: 100% 100%;
        overflow: hidden;

        .login-form {
            background-color: rgba(92, 116, 152, 0.2);
            position: absolute;
            left: 72%;
            top: 30%;
            width: 25%;
            padding: 35px;
            overflow: hidden;
        }

        .svg-container {
            padding: 4px 5px 6px 15px;
            color: $light_gray;
            vertical-align: middle;
            width: 30px;
            display: inline-block;
        }

        .title-container {
            position: relative;

            .title {
                font-size: 22px;
                color: $light_gray;
                margin: 0px auto 40px auto;
                text-align: center;
                font-weight: 600;
            }
        }

        .show-pwd {
            position: absolute;
            right: 10px;
            top: 4px;
            font-size: 16px;
            color: $dark_gray;
            cursor: pointer;
            user-select: none;
        }

        .go-register {
            color: $dark_gray;
            float: right;
            font-size: 14px;
            cursor: pointer;
            text-decoration: underline;
            margin-bottom: 5px;
        }
    }

    .angle {
        position: absolute;
        width: 25px;
        height: 25px;
    }

    .angle:after,
    .angle:before {
        content: "";
        border-radius: 0;
        font-size: 0;
        width: 0;
        height: 0;
        position: absolute;
        padding: 0;
    }

    .angle-left-top {
        top: 0;
        left: 0;
        border-left: $border;
        border-top: $border;
    }

    .angle-left-top:after {
        top: -4px;
        right: 0;
        border-left: $border_transparent;
        border-right: $border_after;
        border-bottom: $border_after;
    }

    .angle-left-top:before {
        bottom: 0;
        left: -4px;
        border-top: $border_transparent;
        border-right: $border_after;
        border-bottom: $border_after;
    }

    .angle-right-top {
        top: 0;
        right: -2px;
        border-right: $border;
        border-top: $border;
    }

    .angle-right-top:after {
        bottom: 0;
        right: -4px;
        border-right: $border_transparent;
        border-left: $border_after;
        border-bottom: $border_after;
        ;
    }

    .angle-right-top:before {
        top: -4px;
        left: 0;
        border-top: $border_transparent;
        border-left: $border_after;
        border-bottom: $border_after;
    }

    .angle-left-bottom {
        bottom: 0;
        left: 0;
        border-bottom: $border;
        border-left: $border;
    }

    .angle-left-bottom:after {
        bottom: -4px;
        right: 0;
        border-left: $border_transparent;
        border-top: $border_after;
        border-right: $border_after;
        ;
    }

    .angle-left-bottom:before {
        top: 0;
        left: -4px;
        border-left: $border_transparent;
        border-top: $border_after;
        border-right: $border_after;
        ;
    }

    .angle-right-bottom {
        bottom: 0;
        right: -2px;
        border-right: $border;
        border-bottom: $border;
    }

    .angle-right-bottom:after {
        bottom: -4px;
        left: 0;
        border-right: $border_transparent;
        border-top: $border_after;
        border-left: $border_after;
    }

    .angle-right-bottom:before {
        top: 0;
        right: -4px;
        border-right: $border_transparent;
        border-top: $border_after;
        border-left: $border_after;
    }
</style>