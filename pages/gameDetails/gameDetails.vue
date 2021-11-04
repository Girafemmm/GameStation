<template>
	<view class="gamedetails-header">
		<img class="gamedetails-header-img" :src="gameinfo.header_image" mode="widthFix">
		<view class="gamedetails-header-body">
			<h2 style="font-size: 20px;font-weight: bold;">{{gameinfo.name}}</h2>
			<u-line color="grey" />
			<p>发售日期：{{gameinfo.release_date.date}}</p>
			<p>开发商：<u-tag style="margin-right: 5px;" v-for="(item,index) in gameinfo.developers" mode="light" shape="circle" type="info" size="mini" :text="item"></u-tag></p>
			<p>发行商：<u-tag style="margin-right: 5px;" v-for="(item,index) in gameinfo.publishers" mode="light" shape="circle" type="info" size="mini" :text="item"></u-tag></p>
			<p>{{gameinfo.short_description}}</p>
			<u-tag class="gamedetails-header-body-tag" v-for="(item,index) in gameinfo.categories" :key="item.id" :text="item.description" mode="light" shape="circle" />
			<u-line color="grey" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'gamedetails',
				id:'',
				gameinfo:'',
			}
		},
		onLoad(option) {
			console.log(option)
			this.id = option.data
			this.getGameinfo();
		},
		methods: {
			getGameinfo(){
				uni.request({
					// url需要更换
					url:`http://store.steampowered.com/api/appdetails?appids=${this.id}`,
					method:"GET",
					success: (res) => {
					        console.log(res.data[this.id].data);
							this.gameinfo = res.data[this.id].data
					    }
				})
			}
		
		}
	}
</script>

<style>
.gamedetails-header{
	width: 95%;
	margin-left: auto;
	margin-right: auto;
	padding-bottom: 10px;
	border-radius: 15px;
	margin-bottom: 15px;
	box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
}
.gamedetails-header-img{
	width: 100%;
	border-top-right-radius:15px;
	border-top-left-radius:15px;
}
.gamedetails-header-body{
	margin-left: 8px;
	margin-right: 8px;
}
.gamedetails-header-body-tag{
	display: inline-block;
	margin-right: 6px;
	margin-bottom: 5px;
}
</style>
