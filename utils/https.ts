
const baseUrl='https://api.vkeys.cn/V1/Music';

export const https=	(url:string,method:options,data:any)=>{
	return new Promise((resolve,reject)=>{
		uni.showLoading({
			title:'加载中，有点慢，请耐心等待'
		})
		uni.request({
			url:baseUrl+url,
			method:method,
			data:data,
			header:{
				'content-type':'application/json',  //默认请求头
			},
			success:(res)=>{
				if(res.statusCode==200)
				resolve(res.data);
				else{
					reject(baseUrl+url+'请求失败');
				}
				uni.hideLoading();
			},
			fail:(error)=>{
				reject(error);
				uni.hideLoading();
				uni.showToast({
					title:'获取失败！请等服务器冷却后再重试',
					icon:'none',
					duration:1500
				})
			}
		})
		
	})
}