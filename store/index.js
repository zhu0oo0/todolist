import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);//vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state:{//存放状态
		student: "",
		tabbarName: 'index',
	},
	getters: {
		student: (store) => store.student,
		tabbarName: (store) => store.tabbarName
	},
	mutations: {
		SET_STUDENT(state, student) {
			state.student = student
		},
		SET_TABBAR_NAME(state, tabbarName) {
			state.tabbarName = tabbarName
		}
	},
	actions: {
		setStudent({commit}, student) {
			const resetData = student
			if(student && student.titivateDetail) {
				const {txkMsg, hzMsg} = student.titivateDetail;
				if (txkMsg) {
					resetData.txkMsg = JSON.parse(txkMsg)
				}
				if (hzMsg) {
					resetData.hzMsg = JSON.parse(hzMsg)
				}
			}
			commit('SET_STUDENT', resetData)
		},
		setTabbarName({commit}, tabbarName) {
			commit('SET_TABBAR_NAME', tabbarName)
		}
	}
})
export default store;