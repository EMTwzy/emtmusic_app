<template>
	<topBar></topBar>
	<view class="content">
		<!-- 背景 -->
	<image src="../../static/phone_bk.jpg" mode="aspectFill" class="bk"></image>
		<!-- 查询组件 -->
		<musicSearch></musicSearch>
		<!-- 音乐列表项组件 -->
		<!-- <musicItem></musicItem> -->
	</view>
</template>

<script setup>
//导入音乐列表项组件
import musicItem from '../../compontents/musicItem/musicItem.vue';
//导入音乐查询项组件
import musicSearch from '../../compontents/musicSearch/musicSearch.vue';
//导入自定义导航栏
import topBar from '../../compontents/topBar/topBar.vue';

</script>

<style lang="less">
	
	.content{
		
		// 背景图片
		.bk{
			width: 100vw;
			height: 100vh;
			position: fixed;
			z-index: -15;
		}
	}
</style>
