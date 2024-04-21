<template>
	<view class="search">
		<!-- 输入框背景图 -->
		<image src="../../static/emt_inpute.png" mode="aspectFit" class="search_bk"></image>
		<!-- 输入框 -->
		<input v-model="searchValue" placeholder="来找首好歌吧~" class="input" @confirm="search"/>

	</view>
</template>

<script setup lang="ts">
	import {ref,nextTick } from 'vue';
	import {useIndexStore} from '../../pinia/useIndex';
	
	//试着将内容绑定在pinia的相应参数上
	const searchValue=ref<string>('');
	
	
	function search(){
		useIndexStore().musicItems.length=0;
		useIndexStore().changeSearchValue(searchValue.value);
		useIndexStore().search();
		// nextTick(()=>{
		// console.log('数据似乎发生了变更',useIndexStore().searchValue);
		// })
		
	}
	
</script>

<style lang="less" scoped>
	.search{
		margin-top: 50rpx;
		text-align: center;
		height: 120rpx;
		// 背景图
		.search_bk{
			z-index: -1;
			height: 120rpx;
		}
		// 输入框
		.input{
			position: relative;
			top: -120rpx;
			left: 200rpx;
			width: 40vw;
			height: 100rpx;
			text-align: center;
		}
	}
</style>
