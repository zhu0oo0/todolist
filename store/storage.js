// import cryptojs from "@/utils/cryptojs.js"

class Storage {
	// token
	static getToken() {
		let token = uni.getStorageSync('access_token')
		return token || "";
	}
	static setToken(token = "") {
		uni.setStorageSync('access_token', token)
	}
	static removeToken() {
		uni.removeStorageSync('access_token')
	}
	
	// roleType
	static getRoleType() {
		let roleType = uni.getStorageSync('roleType')
		return roleType || "";
	}
	static setRoleType(roleType = "") {
		uni.setStorageSync('roleType', roleType)
	}
	static removeRoleType() {
		uni.removeStorageSync('roleType')
	}

	// depotId
	static getDepotId() {
		let depotId = uni.getStorageSync('depotId')
		return depotId || "";
	}
	static setDepotId(depotId = "") {
		uni.setStorageSync('depotId', depotId)
	}
	static removeDepotId() {
		uni.removeStorageSync('depotId')
	}
	
	// userInfo
	static getUserInfo() {
		let userInfo = uni.getStorageSync('userInfo')
		return userInfo || "";
	}
	static setUserInfo(userInfo = "") {
		uni.setStorageSync('userInfo', userInfo)
	}
	static removeUserInfo() {
		uni.removeStorageSync('userInfo')
	}

	static setCache(key, value) {
		return uni.setStorageSync(key, value)
	}
	static getCache(key) {
		return uni.getStorageSync(key)
	}
	static removeCache(key) {
		uni.removeStorageSync(key)
	}
	// 清除
	static clear() {
		uni.clearStorageSync()
		uni.clearStorage()
	}
	static isLogin() {
		const token = uni.getStorageSync('access_token')
		if (token) {
			return true;
		} else {
			return false;
		}
	}
	static setOver(over) {
		uni.setStorageSync('is_over', over)
	}
	static isOver() {
		const over = uni.getStorageSync('isOver')
		return over;
	}
	static resetToken() {
		return this.getToken();
	}
}

export default Storage
