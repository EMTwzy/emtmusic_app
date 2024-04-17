<template>
	<view class="search">
		<!-- 输入框背景图 -->
		<image src="../../static/emt_inpute.png" mode="aspectFit" class="search_bk"></image>
		<!-- 输入框 -->
		<input v-model="searchValue" placeholder="来找首好歌吧~" class="input" @confirm="search"/>

	</view>
</template>

<script setup lang="ts">
	import {ref,watch,nextTick } from 'vue';
	import {useIndexStore} from '../../pinia/useIndex';
	
	//试着将内容绑定在pinia的相应参数上
	const searchValue=ref<string>('');
	
	
	function search(){
		useIndexStore().changeSearchValue(searchValue.value);
		nextTick(()=>{
		console.log('数据似乎发生了变更',useIndexStore().searchValue);
		})
		
	}
	
	watch(searchValue,()=>{
		console.log('@@@@@@@@@@',searchValue.value);
	})
</script>

<style lang="less" scoped>
	.search{
		margin-top: 50rpx;
		text-align: center;
		// 背景图
		.search_bk{
			z-index: -1;
			height: 200rpx;
		}
		// 输入框
		.input{
			position: relative;
			top: -160rpx;
			left: 200rpx;
			width: 40vw;
			height: 100rpx;
			text-align: center;
		}
	}
</style>
