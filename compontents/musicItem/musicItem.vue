<template>
	<view class="item" @click="showOptions">
		<uni-row>
			<uni-col :span="4">
				<!-- 图片封面 -->
				<image :src="data.obj.cover==''?'../../static/load.jpg':data.obj.cover" mode="aspectFit"></image>
			</uni-col>
			<uni-col :span="2">
				&nbsp;
			</uni-col>
			<uni-col :span="18">
				<div class="infor">
					{{data.obj.song}}
					<p>{{data.obj.singer}}</p>
				</div>
			</uni-col>

		</uni-row>


	</view>
</template>

<script setup lang="ts">
	import { defineProps } from 'vue';
	import { useIndexStore } from '../../pinia/useIndex';
	//导入itemsInterface
	import { itemsI } from '../../interface/itemsInterface';

	const data = defineProps<{
		obj : itemsI
	}>()
	//显示options
	const useIndex=useIndexStore();
	function showOptions(){
		useIndex.showOptions=true;
	//当前项被选中
		useIndex.selectId=data.obj.id;
	}
</script>

<style lang="less" scoped>
	.item {
		width: 80%;
		margin: 0 auto;
		margin-top: 20rpx;
		height: 120rpx;
		border: 1rpx solid #ccc;
		background-color: rgba(128, 128, 128, 0.6);
		box-shadow: #ccc;

		image {
			width: 120rpx;
			height: 120rpx;
			float: left;
		}

		.infor {
			padding: 1rpx;
		}
	}
</style>