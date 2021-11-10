<template>
	<view>
		<view class="content">
			<view v-for="(item,index) in top_sellers" @click="gameDetails(item)" class="top-sellers" slot="body">
				<view class="top-sellers-card">
					<image class="top-sellers-img" :src="item.large_capsule_image" mode="widthFix"></image>
					<view>
						<view class="top-sellers-title">{{item.name}}</view>
						<view class="top-sellers-price-discounted" v-if="item.discounted">
							<view class="top-sellers-discounted">
								-{{item.discount_percent}}%
							</view>
							￥{{item.final_price}}
							</view>
						<view class="top-sellers-price" v-else>￥{{item.final_price}}</view>
					</view>
				</view>
			</view>
		</view>
		<u-tabbar :list="tabbar" :mid-button="false"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Index',
				tabbar: '',
				loginuser:'',
				top_sellers:'',
			}
		},
		onLoad() {
			this.tabbar = this.$store.state.tabbar
			this.getdata();
		},
		onShow(){
			
		},
		methods: {
			getdata(){
				uni.request({
					url:"https://store.steampowered.com/api/featuredcategories/?&cc=cn",
					method:"GET",
					success: (res) => {
							console.log(res);
							console.log(res.data.top_sellers.items);
							this.datafilter(res.data.top_sellers.items);
							// this.getCurrencySymble(res.data.specials);
					        this.top_sellers = res.data.top_sellers.items;
							// var time = new Date();
							// console.log(res.data.specials.items.discount_expiration);
							// console.log(time.getTime());
							// this.specials.discount_expiration = res.data.specials.items.discount_expiration - time.getTime();
					    }
				})
			},
			datafilter(data){
				console.log(data)
				var time = new Date();
				for(var i=0;i<data.length;i++){
					// if(data[i].currency = 'CNY'){
					// 	data[i].currency = '￥'
					// }
					data[i].original_price = (data[i].original_price /100).toFixed(2);
					data[i].final_price = (data[i].final_price /100).toFixed(2);
					// console.log(data[i].discount_expiration * 1000)
					// console.log(time.getTime())
					data[i].discount_expiration = (data[i].discount_expiration) - Math.round(new Date() / 1000);
					// console.log(data[i].discount_expiration)
				}	
			},
			gameDetails(data){
				console.log(data);
				this.id = data.id;
				if(data.type==0){
					uni.navigateTo({
					url:`/pages/gameDetails/gameDetails?data=${this.id}`,
				})
				}
				if(data.type==1){
					this.$store.state.subinfo = data
					uni.navigateTo({
					url:`/pages/subDetails/subDetails`,
				})
				}
			}
		}
	}
</script>

<style>
	.content {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			bottom: 10px;
			/* background-color: #e6ebf4; */
		}
	.top-sellers{
			width: 93%;
		}
	.top-sellers-card{
		/* border-style: solid;
		border-width: 1px;
		border-color: #333333; */
		border-radius: 15px;
		margin-bottom: 15px;
		box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
	}
	.top-sellers-img{
		width: 100%;
		border-top-right-radius:15px;
		border-top-left-radius:15px;
		/* width: 215px;
		height: 460px; */
	}
	.top-sellers-title{
		word-break: normal;
		font-weight: bold;
		padding: 5px 0 38px 5px;
	}
	.top-sellers-price{
		border-radius: 15px;
		background-color: #ebebeb;
		color: #007AFF;
		font-weight: bold;
		float: right;
		position: relative;
		right: 15px;
		bottom: 40px;
		padding: 5px 8px 5px 8px;
	}
	.top-sellers-price-discounted{
		border-radius: 15px;
		background-color: #ebebeb;
		color: #007AFF;
		font-weight: bold;
		float: right;
		position: relative;
		right: 15px;
		bottom: 40px;
		padding: 0 8px 0 0;
	}
	.top-sellers-discounted{
		display: inline-block;
		border-radius: 15px;
		padding: 5px 8px 5px 8px ;
		margin-right: 3px;
		background-color: #71C671;
		color: white;
	}
</style>
