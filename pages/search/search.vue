<template>
	<view class="content">
		<view>
			<u-search @search="gameSearch()" @custom="gameSearch()" placeholder="请输入完整的游戏名称" v-model="keyword" :show-action="true" action-text="搜索" :animation="true"></u-search>
		</view>
		<u-card v-for="(item,index) in searchresult" :key="item.id" :title="item.title" @click="gameDetails(index)">
			
		</u-card>
		<u-tabbar :list="tabbar" :mid-button="false"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Search',
				tabbar: '',
				keyword: ' ',
				apikey:'2b4db10647548c96d99c4a634d27a08845d2afa6',
				searchresult:'',
				searchresultshow:false,
				plain:'',
			}
		},
		onLoad() {
			this.tabbar = this.$store.state.tabbar
		},
		onShow() {
			
		},
		methods: {
			gameSearch(){
				console.log(this.keyword);
				uni.request({
					url:"https://api.isthereanydeal.com/v02/search/search",
					method:"GET",
					data:{
						key:this.apikey,
						q:this.keyword,
						strict:'1',
						limit:'100'
					},
					success: (res) => {
					        console.log(res);
							console.log(res.data.data.results);
							this.searchresult = res.data.data.results;
					    }
				})
			},
			gameDetails(data){
				console.log(data);
				this.plain = this.searchresult[data].plain;
				console.log(this.plain);
				uni.navigateTo({
					url:`/pages/gameDetails/gameDetails?data=${this.plain}`,
					// success: function(res) {
					//     res.eventChannel.emit('acceptDataFromOpenerPage', { data: this.appid })
					//   }
				})
				
			}
	
		}
	}
</script>

<style>
.content{
	background-color: #dadada;
}
.search-results{
	
/* 	border-style: solid;
	border-width: 0 0 1px 0;
	padding: 5px 0 5px 3px;
	border-color: #bcbcbc; */
	/* margin-bottom: 5px; */
	/* box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19); */
}
</style>
