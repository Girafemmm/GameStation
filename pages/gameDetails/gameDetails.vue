<template>
	<view>
		<h2>{{gameinfo.name}}</h2>
		<img :src="gameinfo.header_image">
		<p>{{gameinfo.short_description}}</p>
		<p>{{gameinfo.release_date.data}}</p>
		<u-tag v-for="(item,index) in gameinfo.categories" :key="item.id" :text="item.description" mode="dark" />
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

</style>
