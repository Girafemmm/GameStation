<template>
	<view>
		<view class="subdetails-header">
			<img class="subdetails-header-img" :src="subinfo.header_image" mode="widthFix">
			<view class="subdetails-header-body">
				<h2 style="font-size: 20px;font-weight: bold;">{{subinfo.name}}</h2>
			</view>
			<view>
				<p>史低占位</p>
			</view>
			<view class="subdetails-discount">
				<view class="subdetails-discount-percent">{{'-' + subinfo.discount_percent + '%'}}</view>
				<view class="subdetails-price">
					<text class="subdetails-originprice">￥&nbsp;{{subinfo.original_price}}</text>
					<text class="subdetails-finalprice">￥&nbsp;{{subinfo.final_price}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'subdetails',
				apikey:'2b4db10647548c96d99c4a634d27a08845d2afa6',
				id:'',
				subinfo:'',
				priceinfo:'',
			}
		},
		onLoad() {
			this.subinfo = this.$store.state.subinfo
			console.log(this.subinfo)
			this.getSubinfo();
		},
		methods: {
			getSubinfo(){
				uni.request({
					url:`https://api.isthereanydeal.com/v01/game/overview/?key=${this.apikey}&region=cn&country=CN&shop=steam&ids=sub%2F${this.subinfo.id}`,
					method:"GET",
					success: (res) => {
					        console.log(res);
							console.log(res.data.data[`sub/${this.subinfo.id}`]);
							this.priceinfo = res.data.data[`sub/${this.subinfo.id}`]
							
					    }
				})
			}
		
		}
	}
</script>

<style>
.subdetails-header{
	width: 95%;
	margin-left: auto;
	margin-right: auto;
/* 	padding-bottom: 10px; */
	border-radius: 15px;
	margin-bottom: 15px;
	box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
}
.subdetails-header-img{
	width: 100%;
	border-top-right-radius:15px;
	border-top-left-radius:15px;
}
.subdetails-header-body{
	margin-left: 8px;
	margin-right: 8px;
}
.subdetails-header-body-tag{
	display: inline-block;
	margin-right: 6px;
	margin-bottom: 5px;
}
.subdetails-price{
		display: inline-block;
		position: relative;
		top: 5px;
		padding-left: 5px;
		text-align: center;
	}
	.subdetails-discount-percent{
		display: inline-block;
		background-color: #71C671;
		color: white;
		height: 100%;
		font-size: 27px;
		padding: 4px;
		border-bottom-left-radius:15px;
		border-top-right-radius:15px;
	}
	.subdetails-originprice{
		color: #55575b;
		display: block;
		text-align:right;
		text-decoration:line-through;
	}
	.subdetails-finalprice{
		font-weight: bold;
		display: block;
		text-align:right;
	}
</style>