<template>
	<view class="content">
		<view>
			<h2>Sales</h2>
		</view>
		<u-card title="特别推荐" :sub-title="subTitle" foot-border-top="true" head-border-bottom="true">
				<view v-for="(item,index) in specials" class="" slot="body">
					<view class="specials-card">
						<image :src="item.header_image" mode="aspectFit"></image>
						<view class="u-body-item-title u-line-2">{{item.name}}</view>
					</view>
				</view>
			</u-card>
		<u-tabbar :list="tabbar" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Sales',
				tabbar: '',
				specials:'',
			}
		},
		onLoad() {
			// console.log(this.$store.state.tabbar)
			this.tabbar = this.$store.state.tabbar
			console.log(this.tabbar)
			this.getdata();
		},
		methods: {
			getdata(){
				uni.request({
					url:"https://store.steampowered.com/api/featuredcategories",
					method:"GET",
					success: (res) => {
					        console.log(res.data);
					        this.specials = res.data.specials.items;
							console.log(this.specials);
					    }
				})
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
		}
	.specials-card{
		border: #333333;
	}
</style>
