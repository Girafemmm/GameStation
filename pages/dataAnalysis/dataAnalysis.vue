<template>
	<view>
		<!-- <web-view src="https://steamdb.info/embed/?appid=753" height="100" style="border:0;overflow:hidden;width:100%" loading="lazy"></web-view> -->
		
		<u-tabbar :list="tabbar" :mid-button="false"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'DataAnalysis',
				tabbar: ''
			}
		},
		onLoad() {
			this.tabbar = this.$store.state.tabbar
		},
		methods: {
	
		}
	}
</script>

<style>

</style>
