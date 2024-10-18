import Storage from './../store/storage.js';

const ENV = require('./../.env.js')

const HttpCodes = {
	UNAUTHORIZED: 401, //登录失效
}

class request {
	static request(method, url, data = null, that = null) {
		let promise = new Promise(function(resolve, reject) {
			let _data, Ctype
			if ((method === 'POST') || (method === 'PUT') || (method === 'DELETE')) {
				_data = data
				/*_data = {
				body: CryptoJS.Encrypt(JSON.stringify(data))
				}*/
				Ctype = 'application/json'
			} else {
				_data = data
				Ctype = 'application/json'
			}
			let _url
			if (process.env.NODE_ENV !== 'production') {
				_url = ENV.APP_DEV_URL + url
			} else {
				_url = ENV.APP_PROD_URL + url
			}
			const param = {
				url: _url,
				method: method,
				data: _data,
				header: {
					'X-Access-Token': Storage.getToken(),
					'Content-Type': Ctype,
				},
				success(res) {
					uni.hideLoading();
					if (res.statusCode === 200) {
						if (res.data.code === 200) {
							resolve(res.data)
						} else {
							if (res.statusCode === 200) {
								if (res.data.code === 401) {
									uni.showToast({
										title: res.data.message || res.data,
										icon: 'none',
										duration: 2000
									});
									uni.removeStorageSync()
									uni.clearStorageSync()
									uni.clearStorage()
									// 当前没有登录
									return uni.navigateTo({
										url: '/pages/h5-login/h5-login'
									})
								}
							}
							reject(res)
						}
					} else {
						reject(res)
					}
				},
				fail(res) {
					uni.hideLoading();
					reject(res)
				}
			}
			uni.request(param)
		}).catch((res) => {
			uni.hideLoading();
			if (res.statusCode === 200) {
				if (res.data.code === 201) {
					Storage.clear()
					return uni.redirectTo({
						url: '/pages/h5-login/h5-login'
					})
				}
				if (res.data.code === 401) {
					uni.showToast({
						title: res.data.message || res.data,
						icon: 'none',
						duration: 2000
					});
					Storage.clear()
					uni.redirectTo({
						url: "/pages/h5-login/h5-login"
					})
				}
				if (res.data.code !== 200) {
					console.log('服务器错误：', res.data)
					uni.showToast({
						title: res.data.message || res.data,
						icon: 'none',
						duration: 2000
					});
					return res.data
				}
			} else {
				if (res.data === 'loginOut') {
					Storage.clear()
					return uni.redirectTo({
						url: "/pages/h5-login/h5-login"
					})
				}
				uni.showToast({
					title: res.data.message || res.data,
					icon: 'none',
					duration: 2000
				});
				console.log('请求错误：', res)
			}
		})
		return promise
	}

	static get(url, data, that) {
		return this.request('GET', url, data, that)
	}

	static post(url, data, that) {
		return this.request('POST', url, data, that)
	}

	static put(url, data, that) {
		return this.request('PUT', url, data, that)
	}

	static delete(url, data, that) {
		return this.request('DELETE', url, data, that)
	}
}

export default request