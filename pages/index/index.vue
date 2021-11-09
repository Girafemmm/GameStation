<template>
	<view>
		<view>首页占位</view>
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
			}
		},
		onLoad() {
			this.tabbar = this.$store.state.tabbar
		},
		onShow(){
			
		},
		methods: {
			
			
		}
	}
</script>

<style>

</style>
