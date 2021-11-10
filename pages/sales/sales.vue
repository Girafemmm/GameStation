<template>
	<view class="content">
		<!-- <u-card class="specials" title="特别推荐" :sub-title="subTitle" foot-border-top="true" head-border-bottom="true"> -->
				<view v-for="(item,index) in specials" @click="gameDetails(item)" class="specials" slot="body">
					<view class="specials-card">
						<image class="specials-card-img" :src="item.large_capsule_image" mode="widthFix"></image>
						<view>
							<view class="specials-card-title">{{item.name}}</view>
							<view class="specials-card-price-discounted" v-if="item.discounted">
								<view class="specials-card-discounted">
									-{{item.discount_percent}}%
								</view>
								￥{{item.final_price}}
								</view>
							<view class="specials-card-price" v-else>￥{{item.final_price}}</view>
						</view>
					</view>
				</view>
			<!-- </u-card> -->
		<u-tabbar :list="tabbar" :mid-button="false"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Sales',
				tabbar: '',
				specials:'',
				id:'',
			}
		},
		onLoad() {
			// console.log(this.$store.state.tabbar)
			this.tabbar = this.$store.state.tabbar
			this.getdata();
		},
		methods: {
			getdata(){
				uni.request({
					url:"https://store.steampowered.com/api/featuredcategories/?&cc=cn",
					method:"GET",
					success: (res) => {
							console.log(res);
							console.log(res.data.specials.items);
							this.getPrice(res.data.specials.items);
							// this.getCurrencySymble(res.data.specials);
					        this.specials = res.data.specials.items;
							// var time = new Date();
							// console.log(res.data.specials.items.discount_expiration);
							// console.log(time.getTime());
							// this.specials.discount_expiration = res.data.specials.items.discount_expiration - time.getTime();
					    }
				})
			},
			getPrice(data){
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
	.specials{
			width: 93%;
		}
	.specials-card{
		/* border-style: solid;
		border-width: 1px;
		border-color: #333333; */
		border-radius: 15px;
		margin-bottom: 15px;
		box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
	}
	.specials-card-img{
		width: 100%;
		border-top-right-radius:15px;
		border-top-left-radius:15px;
		/* width: 215px;
		height: 460px; */
	}
	.specials-card-title{
		word-break: normal;
		padding: 5px 0 38px 5px;
		font-weight: bold;
	}
	.specials-card-price{
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
	.specials-card-price-discounted{
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
	.specials-card-discounted{
		display: inline-block;
		border-radius: 15px;
		padding: 5px 8px 5px 8px ;
		margin-right: 3px;
		background-color: #71C671;
		color: white;
	}

</style>
