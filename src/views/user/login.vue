<template>
	<div class="login-container">
		<el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
			<div class="title-container">
				<h3 class="title">{{title}}——登录</h3>
			</div>

			<el-form-item prop="username">
				<span class="svg-container">
					<svg-icon icon-class="user" />
				</span>
				<el-input ref="username" v-model="loginForm.username" placeholder="用户名" name="username" type="text" tabindex="1"
				 auto-complete="on" />
			</el-form-item>

			<el-form-item prop="password">
				<span class="svg-container">
					<svg-icon icon-class="password" />
				</span>
				<el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="密码"
				 name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
				<span class="show-pwd" @click="showPwd">
					<svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
				</span>
			</el-form-item>

			<div class="go-register" @click="goRegister">没有账号</div>

			<el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
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
	import bcrypt from 'bcryptjs'
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
				handler: function(route) {
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

						var salt = bcrypt.genSaltSync(12); //定义密码加密的计算强度,默认10
						var hash = bcrypt.hashSync(this.loginForm.password, salt); //变量hash就是加密后的密码

						let param = {
							username:this.loginForm.username,
							password:hash
						}
						this.$store.dispatch('user/login', param).then(() => {
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
	/* 修复input 背景不协调 和光标变色 */
	/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

	$bg:#283443;
	$light_gray:#fff;
	$cursor: #fff;

	@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
		.login-container .el-input input {
			color: $cursor;
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
				border: 0;
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

	.login-container {
		min-height: 100%;
		width: 100%;
		background-color: $bg;
		overflow: hidden;

		.login-form {
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

		.go-register {
			color: $light_gray;
			float: right;
			font-size: 13px;
			margin: -10px 0 10px;
			cursor: pointer;
			text-decoration: underline
		}
	}
</style>
