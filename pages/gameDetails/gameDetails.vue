<template>
	<view>
		<h2>游戏详情</h2>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'gamedetails',
				plain:'',
				gameinfo:'',
			}
		},
		onLoad(option) {
			console.log(option)
			this.plain = option.data
			this.getGameinfo();
		},
		methods: {
			getGameinfo(){
				uni.request({
					// url需要更换
					url:`http://store.steampowered.com/api/appdetails?appids=${this.appid}`,
					method:"GET",
					success: (res) => {
					        console.log(res);
							this.gameinfo = res
					    }
				})
			}
		
		}
	}
</script>

<style>

</style>
