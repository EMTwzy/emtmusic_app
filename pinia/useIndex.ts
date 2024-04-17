import {defineStore} from 'pinia';

export const useIndexStore=defineStore('index',{
	state:()=>({
		searchValue:'',          //查询内容
		musicItems:[],           //当前查询对象的列表项
		musicSelected:'',        //选择项
	}),
	getters:{
		
	},
	actions:{
		// 改变searchValue的数据值
		changeSearchValue(newValue){
			this.searchValue=newValue;
		}
	}
})