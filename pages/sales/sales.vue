<template>
	<view class="content">
		<u-card class="specials" title="特别推荐" :sub-title="subTitle" foot-border-top="true" head-border-bottom="true">
				<view v-for="(item,index) in specials" @click="gameDetails(item)" class="" slot="body">
					<view class="specials-card">
						<image class="specials-card-img" :src="item.large_capsule_image" mode="widthFix"></image>
						<view class="specials-card-title">{{item.name}}</view>
						<view class="specials-card-discount">
							<view class="specials-card-discount-percent">{{'-' + item.discount_percent + '%'}}</view>
							<view class="specials-card-price">
								<text class="specials-card-originprice">{{item.currency}}&nbsp;{{item.original_price}}</text>
								<text class="specials-card-finalprice">{{item.currency}}&nbsp;{{item.final_price}}</text>
							</view>
						</view>
					</view>
				</view>
			</u-card>
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
					    }
				})
			},
			getPrice(data){
				console.log(data)
				for(var i=0;i<data.length;i++){
					// if(data[i].currency = 'CNY'){
					// 	data[i].currency = '￥'
					// }
					data[i].original_price = (data[i].original_price /100).toFixed(2);
					data[i].final_price = (data[i].final_price /100).toFixed(2);
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
			background-color: #e6ebf4;
		}
	.specials{
			width: 100%;
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
		padding-left: 5px;
		font-weight: bold;
	}
	.specials-card-discount{
		
	}
	.specials-card-price{
		display: inline-block;
		position: relative;
		top: 5px;
		padding-left: 5px;
		text-align: center;
	}
	.specials-card-discount-percent{
		display: inline-block;
		background-color: #71C671;
		color: white;
		height: 100%;
		font-size: 27px;
		padding: 4px;
		border-bottom-left-radius:15px;
		border-top-right-radius:15px;
	}
	.specials-card-originprice{
		color: #55575b;
		display: block;
		text-align:right;
		text-decoration:line-through;
	}
	.specials-card-finalprice{
		font-weight: bold;
		display: block;
		text-align:right;
	}
</style>
