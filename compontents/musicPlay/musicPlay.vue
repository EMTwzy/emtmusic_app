<template>
	<view class="audio">
		<!-- 进度条 -->
		<progress :percent="pros" stroke-width="4" class="progress" @click="tapPro" />
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
	//进度条 当前视窗的大小 / 比例/位置 
	const viewWidth = ref(0);
	uni.getSystemInfo({
		success: (res) => {
			console.log(res.windowWidth);
			viewWidth.value = res.windowWidth;
		}
	})
	const scale = ref(0);
	const pros = ref(0);
	//当前位时间 /当前总时间
	const currentTime = ref(0);
	const duration = ref(0);



	//当现位发生变化后改变进度条长度
	watch(currentTime, () => {
		pros.value = currentTime.value / duration.value * 100;
		console.log('看看currentTime', currentTime.value);
		console.log('现在的位标', pros.value);
	});

	//监听当前是否有指定播放
	function init() {
		if (useIndex.musicSelected.url != '' && useIndex.musicSelected.url != undefined) {
			isPlay.value = true;
			// 如果当前src地址与pinia地址不一致，以pinia地址为准
			if (useIndex.musicSelected.url !== innerAudioContext.src) {
				innerAudioContext.src = useIndex.musicSelected.url;
				currentTime.value = 0;
			}
			innerAudioContext.play();
			timeUpdate();
		} else {
			isPlay.value = false;
			innerAudioContext.pause();
		}
	}
	//可以进行播放时进行数据值的初始化
	innerAudioContext.onCanplay(() => {
		//初次播放后测算总长度与定位现长度
		//currentTime.value = innerAudioContext.currentTime;
		duration.value = innerAudioContext.duration;
		console.log('总位', duration.value, '现位', currentTime.value, 'innerAudioContext', innerAudioContext);
	});
	//播放自然结束时
	innerAudioContext.onEnded(()=>{
		isPlay.value = false;
		timeUpdate();
	})
	// 更新进度条变化
	function timeUpdate() {
		const time = setInterval(() => {
			if (isPlay.value == true) {
				currentTime.value++;
			} else {
				clearInterval(time);
			}
		}, 1000);
	} 
	



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
				timeUpdate();
				break;
		}
	}

	//进度条的拖拽
	function tapPro(e) {
		if (duration.value != 0) {
			scale.value = e.detail.x / viewWidth.value;
			scale.value = parseFloat(scale.value.toFixed(2));   //将比例结果转为2个小数位
			pros.value = scale.value * 100;        //设置进度条
			currentTime.value = scale.value * duration.value;  //当前播放位
			innerAudioContext.seek( scale.value * duration.value);  //设置audio的当前位
			console.log('@tapPro看看位标/比例/音频位', pros.value, scale.value, currentTime.value,scale.value*duration.value);
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