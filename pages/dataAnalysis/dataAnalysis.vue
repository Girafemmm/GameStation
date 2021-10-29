<template>
	<view>
		<h2>此功能暂未开放</h2>
		<u-tabbar :list="tabbar" :mid-button="true"></u-tabbar>
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
