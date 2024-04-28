<template>
	<topBar></topBar>
	<view class="content">
		<!-- 背景 -->
		<image src="../../static/phone_bk.jpg" mode="aspectFill" class="bk"></image>
		<!-- 查询组件 -->
		<musicSearch></musicSearch>
		<!-- 音乐列表项组件 -->
		<div v-if="items.length>1">
			<musicItem v-for="item in items" :key='item.id' :obj="item" class="item"></musicItem>
		</div>
		
		<!-- 音乐播放 -->
			<musicPlay></musicPlay>
	</view>
	<!-- 选择操作 -->
	<div v-show="showOptions">
		<optionsItem></optionsItem>
	</div>
	<wrap-version-update id="540613223891013" @check="handleCheck"></wrap-version-update>

</template>

<script setup>
	import {
		computed
	} from 'vue';
	import {
		onReachBottom,onLoad
	} from '@dcloudio/uni-app';
	//导入音乐列表项组件	//导入音乐查询项组件	//导入自定义导航栏 //导入音乐播放组件
	import musicItem from '../../compontents/musicItem/musicItem.vue';
	import musicSearch from '../../compontents/musicSearch/musicSearch.vue';
	import topBar from '../../compontents/topBar/topBar.vue';
	import musicPlay from '../../compontents/musicPlay/musicPlay.vue';
	import optionsItem from '../../compontents/optionsItem/optionsItem.vue';
	//导入pinia、interface
	import {
		useIndexStore
	} from '../../pinia/useIndex';
	import { getPath } from '../../utils/getPath';
	
	import WrapVersionUpdate from '@/uni_modules/wrap-version-update/components/wrap-version-update/wrap-version-update.nvue'
	
	//使用useIndex
	const useIndex = useIndexStore();
	//查询内容列表
	const items = computed(() => useIndex.musicItems);
	//被选择项的内容
	const musicSelected=computed(()=>useIndex.musicSelected);
	//是否显示操作项
	const showOptions=computed(()=>useIndex.showOptions);

	onReachBottom(() => {
		console.log('触底了！');
		if (useIndex.searchValue != '') {
			useIndex.page++;
			useIndex.search();
		}
	})
	
	onLoad(()=>{
		// 初始化下载地址
		//getPath();
		useIndex.downPath="/storage/emulated/0/EMT音乐";
	})
	
	//更新就隐藏底部菜单栏
		function handleCheck(e){
			if(e.needUpdate){
				uni.hideTabBar();
			}
		}
</script>

<style lang="less">
	.content {

		// 背景图片
		.bk {
			width: 100vw;
			height: 100vh;
			position: fixed;
			z-index: -15;
		}
		
		
	}

</style>