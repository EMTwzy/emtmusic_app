<template>
	<view class="options_bk">
		<view class="content">
			<uni-row v-for="item in selectedItem" :key="item" @click.stop="selected(item)">
				{{item}}
			</uni-row>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { useIndexStore } from '../../pinia/useIndex';
	import { downloadMusic } from '../../api/api';
	const selectedItem = [
		'播放', '下载：低音质', '下载：中音质', '下载：高音质','取消'
	];
	
	const useIndex=useIndexStore();
	function selected(item){
		let index=selectedItem.indexOf(item);
		console.log('选择项',item,index);
		switch(index){
			case 0:		//播放
			useIndex.playMusic();
			break;
			case 1:		//下载：低
			downloadMusic(useIndex.selectId,3);
			break;
			case 2:		//下载：中
			downloadMusic(useIndex.selectId,6);
			break;
			case 3:		//下载：高
			downloadMusic(useIndex.selectId,9);
			break;
		};
		useIndex.showOptions=false;
		
	}
	
</script>

<style lang="less" scoped>

		.content {
			position: fixed;
			top: calc(50% - 125rpx);
			left: calc(50% - 140rpx);
			width: 300rpx;
			height: 300rpx;
			margin: 0 auto;
			border: 1rpx solid white;
			text-align: center;
			border-radius: 5%;
			background-color: lightseagreen;
			::v-deep .uni-row {
				border-bottom: 1rpx solid #ccc;
				margin-top: 10rpx;

				&:hover {
					background-color: whitesmoke;
				}
			}
		}

</style>