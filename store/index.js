import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		tabbar:[
				{
					iconPath: "/static/icon/international-inactive.png",
					selectedIconPath: "/static/icon/international.png",
					text: '首页',
					// midButton: true,
					pagePath: "/pages/index/index"
				},
				{
					iconPath: "/static/icon/discount-inactive.png",
					selectedIconPath: "/static/icon/discount.png",
					text: '折扣推荐',
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
		access_token:'e80b98380f4df62f2f561e77acaf140d',
	},
    mutations: {},
    actions: {}
})
export default store