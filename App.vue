<script>
	const ENV = require('./.env.js');
	const base = process.env.NODE_ENV !== 'production' ? ENV.APP_DEV_URL : ENV.APP_PROD_URL
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			uni.getSystemInfo({
				success: async (res) => {
					uni.setStorageSync("isIos", false)
					if (res.platform == 'ios') {
						uni.setStorageSync("isIos", true)
					}
				}
			})
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {
			userInfo: null,
			isLogin: false,
			baseUrl: base,
			imageBaseUrl: '',
		},
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/uview-ui_2/index.scss";
	@import "./common/style/index.scss";
</style>