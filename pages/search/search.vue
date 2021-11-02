<template>
	<view class="content">
		<view>
			<u-search @search="gameSearch()" @custom="gameSearch()" placeholder="请输入游戏名称" v-model="keyword" :show-action="true" action-text="搜索" :animation="true"></u-search>
		</view>
		<!-- <u-card v-for="(item,index) in searchresult" :key="item.appId" :title="item.title" @click="gameDetails(index)">
			<view slot="body">
				<image :src="item.imgUrl" mode="widthFix"></image>
			</view>
			<view slot="foot">
				<view>{{item.released}}</view>
			</view>
		</u-card> -->
		<uni-list v-for="(item,index) in searchresult" :key="item.appId">
			<uni-list-item clickable @click="gameDetails(item.appId)" :title="item.title" :note="item.released">
			</uni-list-item>
		</uni-list>
		<u-tabbar :list="tabbar" :mid-button="false"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Search',
				tabbar: '',
				keyword: '',
				apikey:'2b4db10647548c96d99c4a634d27a08845d2afa6',
				searchresult:'',
				searchresultshow:false,
				id:'',
				page:'1',
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
					url:`https://steam2.p.rapidapi.com/search/${this.keyword}/page/${this.page}`,
					method:"GET",
					header:{
						'x-rapidapi-host': 'steam2.p.rapidapi.com',
						'x-rapidapi-key': '7c7226b912mshaeb4467163fc24cp121efdjsn6e9e15bd83c6'
					},
					success: (res) => {
					        console.log(res);
							console.log(res.data);
							this.searchresult = res.data;
					    }
				})
			},
			searchClilk(){
				this.page = '1'
				this.gameSearch()
			},
			gameDetails(data){
				console.log(data);
				this.id = data;
				uni.navigateTo({
					url:`/pages/gameDetails/gameDetails?data=${this.id}`,
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
