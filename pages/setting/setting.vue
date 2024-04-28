<template>
	<view class="setting">
		<uni-row class="row" @click="show(1)">
			关于本应用
		</uni-row>
		<uni-row class="row" @click="isShow=!isShow" :class="{isShow:isShow}">
			<text v-if="!isShow">文件存储位置</text>
			<text v-if="isShow">{{path}}</text>
		</uni-row>
		<uni-row class="row" @click="show(2)">
			作者有话说
		</uni-row>
	</view>
</template>

<script setup lang="ts">
	import {ref,computed} from 'vue';
	import { useIndexStore } from '../../pinia/useIndex';
	
	const isShow=ref(false);
	const path=computed(()=>useIndexStore().downPath);
	
	const arr1=`    本应用资源全部来源于网络，如有冒犯十分抱歉，关于本应用存在的一些奇怪bug...并非本人原因，总而言之，如有问题或建议可以向emt1731041348@outlook.com传达`;
	const arr2=`本软件的用处并非是作为常用听歌软件，而是作为音乐下载工具存在`;
	
	function show(options){
		switch(options){
			case 1:
			uni.showModal({
				content:arr1,
				showCancel:false
			});
			break;
			case 2:
			uni.showModal({
				content:arr2,
				showCancel:false
			})
		}
	}

</script>

<style lang="less" scoped>
	.setting{
		
		.row{
			width: 100%;
			line-height: 10rpx;
			padding: 50rpx;
			text-align: center;
			border: 1rpx solid #ccc;
		}
		.isShow{
			text-align: left;
			font-size: 20rpx;
			overflow-x: auto;
		}
	}
</style>