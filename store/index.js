import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		tabbar:[{
					iconPath: "/static/icon/tags-inactive.png",
					selectedIconPath: "/static/icon/tags.png",
					text: '今日折扣',
					// midButton: true,
					pagePath: "/pages/sales/sales"
				},
				{
					iconPath: "/static/icon/search-inactive.png",
					selectedIconPath: "/static/icon/search.png",
					text: '搜索',
					// midButton: true,
					pagePath: "/pages/search/search"
				},
				{
					iconPath: "/static/icon/sever-inactive.png",
					selectedIconPath: "/static/icon/sever.png",
					text: '在线数据',
					// midButton: true,
					pagePath: "/pages/dataAnalysis/dataAnalysis"
				},
			],
		subinfo:'',
	},
    mutations: {},
    actions: {}
})
export default store