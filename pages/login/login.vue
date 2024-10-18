<template>
	<view class="h5-login">
		<view class="h5-login-top">
			<view class="slogan">
				用户登录
			</view>
			<view class="form-item center_space-between">
				<view class="item-box">
					<u--input placeholder="请输入用户名" border="none" color="#fff" v-model="formData.userName"></u--input>
				</view>
			</view>
			<view class="form-item center_space-between">
				<view class="item-box">
					<u--input placeholder="请输入密码" border="none" color="#fff" v-model="formData.password"
						type="password"></u--input>
				</view>
			</view>
			<view class="h5-login-bottom">
				<u-button type="primary" text="登录" @click="confirm"></u-button>
			</view>
		</view>
		<!-- <x-print></x-print> -->
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		hex_md5
	} from '@/utils/md5.js';
	export default {
		data() {
			return {
				formData: {
					// userName: 'txz', // wsg01
					// password: '123456', // 123456
					userName: '',
					password: '',
				}
			};
		},
		onLoad() {
			const isLogin = this.$store.isLogin()
			if (isLogin) { // 未登录跳转登录
				uni.redirectTo({
					url: '/'
				})
			}
		},
		methods: {
			showToast(message) {
				this.$refs.uToast.show({
					type: 'error',
					icon: false,
					title: '失败主题',
					message: message
				})
			},
			confirm() {
				if (!this.formData.userName || !this.formData.password) {
					if (!this.formData.userName) {
						this.showToast('请输入用户名')
						return;
					}
					if (!this.formData.password) {
						this.showToast('请输入密码')
						return;
					}
				}
				const pramas = {
					loginName: this.formData.userName,
					password: hex_md5(this.formData.password)
				}
				uni.showLoading({
					title: "正在登录...",
					mask: true,
				});
				this.$api.login(pramas).then(res => {
					if (res.data.token) {
						this.$store.setToken(res.data.token);
						this.$store.setRoleType(res.data.roleType);
						this.$store.setUserInfo(res.data.user);
						uni.navigateTo({
							url: '/'
						})
					} else {
						this.showToast('用户名或密码错误')
					}
				}).catch(err => {
					console.log(err)
				}).finally(() => {
					uni.hideLoading();
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
	}

	.h5-login {
		width: 100%;
		height: 100%;
		padding: 60px 24px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background: linear-gradient(90deg, #1e1f30, #3f425f 100%);

		.h5-login-top {
			width: 4rem;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		.slogan {
			margin: 23px 0 52px;
			font-size: 32px;
			font-weight: 700;
			text-align: center;
			color: #ffffff;
			line-height: 40px;
		}

		.form-item {
			margin-bottom: 20px;
			border-bottom: 1px solid #777e90;

			.label {
				width: 50px;
				font-size: 15px;
				font-weight: 600;
				color: #5d607b;
				text-align: right;
				padding-right: 10px;
			}

			.item-box {
				flex: 1;
				display: flex;
				align-items: center;
				padding: 4px 0 8px;
				justify-content: space-between;
			}
		}
	}
</style>