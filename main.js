import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import * as api from 'api/api.js'
Vue.prototype.$api = api
import * as compute from 'utils/compute.js'
Vue.prototype.$compute = compute
import store from './store'
Vue.prototype.$store = store
import Storage from './store/storage.js'
Vue.prototype.$storage = Storage

// main.js，注意要在use方法之后执行
import uView from 'uview-ui_2'
Vue.use(uView)
// 如此配置即可
// uni.$u.config.unit = 'rpx'

import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif