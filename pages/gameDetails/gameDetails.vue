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
			<u-tag class="gamedetails-header-body-tag" v-for="(item,index) in gameinfo.genres" :key="item.id" :text="item.description" mode="light" shape="circle" />
			<!-- <u-line color="grey" /> -->
			<u-grid :col="2">
					<u-grid-item>
						<img src="/static/custom-icon/status.svg" class="m_img">
						<view class="grid-text">在线人数</view>
						<view class="grid-text" v-if="currentPlayer">{{currentPlayer}}</view>
						<view class="grid-text" v-else>暂无</view>
					</u-grid-item>
					<u-grid-item>
						<img src="/static/custom-icon/logo-metacritic.svg" class="m_img">
						<view class="grid-text">Metacritic评分</view>
						<view class="grid-text" v-if="gameinfo.metacritic">{{gameinfo.metacritic.score}}</view>
						<view class="grid-text" v-else>暂无</view>
					</u-grid-item>
				</u-grid>
			<view class="historylow-info">
				<view><u-icon name="coupon"></u-icon>历史最低价<span class="history_low_span">(数据来源:IsThereAnyDeals)</span></view>
				<u-cell-group>
					<u-cell-item :title="priceinfo.lowest.store" :label="priceinfo.lowest.recorded" :value="priceinfo.lowest.price_formatted" :arrow="false">
					</u-cell-item>
				</u-cell-group>
			</view>
			<view class="currentprice-info">
				<view><u-icon name="bag"></u-icon>Steam目前售价</view>
				<u-cell-group>
					<u-cell-item title="Steam" :value="gameinfo.price_overview.final_formatted" :arrow="false">
					</u-cell-item>
				</u-cell-group>
			</view>
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
				priceinfo:'',
				apikey:'2b4db10647548c96d99c4a634d27a08845d2afa6',
				currentPlayer:'',
			}
		},
		onLoad(option) {
			console.log(option)
			this.id = option.data
			this.getGameinfo();
			this.getPriceinfo();
			this.getCurrentPlayer();
		},
		methods: {
			getGameinfo(){
				uni.request({
					// url需要更换
					url:`http://store.steampowered.com/api/appdetails?appids=${this.id}&cc=cn`,
					method:"GET",
					success: (res) => {
					        console.log(res.data[this.id].data);
							this.gameinfo = res.data[this.id].data
					    }
				})
			},
			getPriceinfo(){
				uni.request({
					url:`https://api.isthereanydeal.com/v01/game/overview/?key=${this.apikey}&region=cn&country=CN&shop=steam&ids=app%2F${this.id}`,
					method:"GET",
					success: (res) => {
					        console.log(res);
							console.log(res.data.data[`app/${this.id}`]);
							this.priceinfo = res.data.data[`app/${this.id}`]
							console.log(this.priceinfo.lowest.recorded);
							this.timeTransfer(this.priceinfo.lowest.recorded);
					    }
				})
			},
			getCurrentPlayer(){
				uni.request({
					url:`https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?access_token=${this.$store.state.access_token}&appid=${this.id}`,
					method:"GET",
					success: (res) => {
					        console.log(res.data.response.player_count);
							this.currentPlayer = res.data.response.player_count;
					    } 
				})
			},
			timeTransfer(res){
				var timestrap = res * 1000
				var date = new Date(timestrap);
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
				// var M = date.getMonth() + '-';
				var D = date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate();
				this.priceinfo.lowest.recorded = Y+M+D
				console.log(Y+M+D);
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
.m_img{
	height: 23px;
	width: 23px;
}
.history_low_span{
	font-size: 13px;
	color:#66686d
}
</style>
