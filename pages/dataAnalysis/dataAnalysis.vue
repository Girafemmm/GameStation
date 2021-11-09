<template>
	<view>
		<view>
			<view class="steam-status">
				<image class="steam-status-img" src="https://cdn.cloudflare.steamstatic.com/steam/apps/753/header.jpg?t=1625722346" mode="widthFix"></image>
				<view class="steam-status-foot" slot="foot">Steam当前在线人数：{{loginuser[1]}}</view>
			</view>
		</view>
		<u-tabbar :list="tabbar" :mid-button="false"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'DataAnalysis',
				tabbar: '',
				loginuser:'',
			}
		},
		onLoad() {
			this.tabbar = this.$store.state.tabbar
		},
		onShow(){
			this.getdata();
		},
		methods: {
			getdata(){
				uni.request({
					url:"https://store.steampowered.com/stats/userdata.json",
					method:"GET",
					success: (res) => {
							this.loginuser = res.data[0].data[603]
							console.log(this.loginuser)
					    }
				})
			},
			
		}
	}
</script>

<style>
.steam-status{
	width: 95%;
	margin-left: auto;
	margin-right: auto;
	border-radius: 15px;
	margin-bottom: 15px;
	box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
}
.steam-status-img{
	width: 100%;
	border-top-right-radius:15px;
	border-top-left-radius:15px;
}
.steam-status-foot{
	padding-top: 5px;
	padding-left: 8px;
	padding-bottom: 5px;
}
</style>
