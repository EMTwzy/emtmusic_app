<template>
	<view class="audio">
		<!-- 进度条 -->
		<progress :percent="pros" stroke-width="3" class="progress" />
		<uni-row>
			<uni-col span="5">
				<!-- 封面 -->
				<image
					:src="itemSelected.cover==''||itemSelected.cover==undefined?'../../static/logo.png':itemSelected.cover"
					mode="aspectFit"></image>
			</uni-col>
			<uni-col span="14">
				<!-- 音乐名称及歌手 -->
				<view class="audioName">
					<span>{{itemSelected.song==''||itemSelected.song==undefined?'先选一首歌吧':itemSelected.song}}</span>
					<p>{{itemSelected.singer==''||itemSelected.song==undefined?'先选一首歌吧':itemSelected.singer}}</p>
				</view>
			</uni-col>
			<uni-col span="5">
				<!-- 暂停/播放 下载-->
				<view class="audioController">
					<!-- 播放 -->
					<span v-show="!isPlay" @click="changePlay('play')">
						<image src="../../static/play-one.svg" mode="aspectFit"></image>

					</span>

					<!-- 暂停 -->
					<span v-show="isPlay" @click="changePlay('pause')">
						<image src="../../static/pause.svg" mode="aspectFit"></image>
					</span>

					<!-- 下载 -->
					<image src="../../static/download-four.svg" mode="aspectFit"></image>
				</view>
			</uni-col>

		</uni-row>



	</view>
</template>

<script setup lang="ts">
	import { computed, ref, watch } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	import { useIndexStore } from '../../pinia/useIndex';
	import { musicI } from '../../interface/musicInterface';

	const useIndex = useIndexStore();
	const itemSelected = computed(() => useIndex.musicSelected);
	const url = computed(() => useIndex.musicSelected.url);
	//播放or暂停
	const isPlay = ref(false);
	// 构建audio
	const innerAudioContext = uni.createInnerAudioContext();
	innerAudioContext.src = url.value;
	//进度条 比例
	const pros = ref(0);
	//当前位时间 /当前总时间
	const currentTime = ref(0);
	const duration = ref(0);
	//当现位发生变化后改变进度条长度
	watch(currentTime, () => {
		pros.value = currentTime.value / duration.value;
		console.log('现在的位标',pros.value);
	});

	//监听当前是否有指定播放
	function init() {
		if (useIndex.musicSelected.url != '' && useIndex.musicSelected.url != undefined) {
			isPlay.value = true;
			// 如果当前src地址与pinia地址不一致，以pinia地址为准
			if (useIndex.musicSelected.url !== innerAudioContext.src) {
				innerAudioContext.src = useIndex.musicSelected.url;
				currentTime.value=0;
			}
			innerAudioContext.play();
		} else {
			isPlay.value = false;
			innerAudioContext.pause();
		}
	}

	innerAudioContext.onCanplay(() => {
		//初次播放后测算总长度与定位现长度
		currentTime.value = innerAudioContext.currentTime;
		duration.value = innerAudioContext.duration;
		console.log('总位', duration.value, '现位', currentTime.value, 'innerAudioContext', innerAudioContext);
	});
	// 监听播放进度更新事件  
	
	innerAudioContext.onTimeUpdate((res) => {  
		currentTime.value+=20; 
	  // 这里可以更新你界面上的播放进度条或其他需要显示当前时间的组件  
	
	}); 

	//播放/暂停
	function changePlay(options) {
		switch (options) {
			case 'play':
				isPlay.value = true;
				init();
				break;
			case 'pause':
				isPlay.value = false;
				innerAudioContext.pause();
				break;
		}
	}


	onLoad(() => {



	})
</script>

<style lang="less" scoped>
	.audio {
		position: fixed;
		bottom: 0rpx;
		width: 100%;
		margin: 0 auto;
		height: 150rpx;
		background-color: antiquewhite;

		// 封面
		image {
			width: 150rpx;
			height: 150rpx;
		}

		// 音乐信息
		.audioName {
			text-align: center;
			margin-top: 20rpx;

			span {
				font-size: 40rpx;
				overflow: auto;
			}

			p {
				font-size: 20rpx;
				margin-top: 5rpx;
				overflow: auto;
			}
		}

		//音乐控制
		.audioController {
			margin-top: 30rpx;

			image {
				width: 50rpx;
				height: 50rpx;
				padding: 10rpx;
			}
		}
	}
</style>