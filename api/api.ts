import {https} from '../utils/https';
//interface
import {itemsI} from '../interface/itemsInterface';
import {musicI} from '../interface/musicInterface';
//下载
import { downMusic } from '../utils/downMusic';

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
		if(res.data==null)
		res=await https('/Tencent','GET',{id});
		return res.data;
	}catch(error){
		uni.showToast({
			title:'资源获取失败',
			icon:'none'
		});
	}
}

//获取下载源
export const downloadMusic=async(id:number,options:number):Promise<musicI>=>{
	try{
		let res:musicI=await https('/Tencent','GET',{id,q:options});
		console.log('@downloadMusic',res.data.url);
		if(res.data==null)
		res=await https('/Tencent','GET',{id,q:options});
		else
		downMusic(res.data.url,res.data.song,res.data.singer);
		return res.data.url;
	}catch(error){
		uni.showToast({
			title:'下载失败，可以考虑换一个音质',
			icon:'none'
		})
	}
}