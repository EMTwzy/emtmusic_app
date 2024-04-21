import { defineStore } from 'pinia';
//导入api方法
import { searchList, searchMusic } from '../api/api';
//导入Interface
import { itemsI } from '../interface/itemsInterface';
import { musicI } from '../interface/musicInterface';

export const useIndexStore = defineStore('index', {
	state: () => ({
		searchValue: '',          //查询内容
		musicItems: [           //当前查询对象的列表项
			{
				"id": 0,
				"mid": '',
				"vid": '',
				"song": '',
				"subtitle": '',
				"singer": '',
				"album": '',
				"pay": '',
				"time": '',
				"bpm": null,
				"quality": '',
				"interval": '',
				"size": '',
				"kbps": '',
				"cover": '',
			}
		],
		musicSelected: {        //选择项
			id: 0,
			mid: '',
			vid: '',
			song: '',
			subtitle: '',
			singer: '',
			album: '',
			pay: '',
			time: '',
			bpm: null,
			quality: '',
			interval: '',
			size: '',
			kbps: '',
			cover: '',
			link: '',
			url: '',
		},
		page: 1,       //页数 默认为1
		selectId: 0,       //被选中项的id
		showOptions: false,   //是否显示选择操作
	}),
	getters: {

	},
	actions: {
		// 改变searchValue的数据值
		changeSearchValue(newValue) {
			this.searchValue = newValue;
		},
		//查询列表
		async search() {
			try {
				if (this.searchValue != '') {
					let res : [itemsI] = await searchList(this.searchValue, this.page);
					this.musicItems = [...this.musicItems, ...res];
					console.log('@pinia/search', this.musicItems);
				}
			} catch (error) {
				console.error('@pinia/search出错了！');
			}

		},
		//根据id获取播放数据
		async playMusic() {
			try {
				if (this.selectId != 0) {
					let res : musicI = await searchMusic(this.selectId);
					this.musicSelected = res;
					console.log('@pinia/playMusic', this.musicSelected);
				}
			} catch (error) {
				console.error('@pinia/playMusic出错了!');
			}
		},
		
		
		
		
	}
})