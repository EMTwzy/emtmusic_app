import {https} from '../utils/https';
import {useIndexStore} from '../pinia/useIndex';
//interface
import {itemsI} from '../interface/itemsInterface';
import {musicI} from '../interface/musicInterface';

//获取指定名称音乐的列表内容
export const searchList=async(name:string,page:number):Promise<itemsI>=>{
	try{
		console.log('看看请求参数',name,page);
		let res:itemsI=await https('/Tencent','GET',{word:name,page});
		console.log('@searchList',res.data);
		return res.data;
	}catch(error){
		uni.showToast({
			title:name+'查询失败',
			icon:'error'
		});
	}
}

//获取指定音乐项的数据信息
export const searchMusic=async(id:number):Promise<musicI>=>{
	try{
		let res:musicI=await https('/Tencent','GET',{id});
		console.log('@searchMusic',res.data);
		return res.data;
	}catch(error){
		uni.showToast({
			title:'资源获取失败',
			icon:'none'
		});
	}
}