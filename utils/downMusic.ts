//下载音乐
import { useIndexStore } from "../pinia/useIndex";
export const downMusic = async (url : string, song : string, singer : string) => {
	try {
		// 后缀
		const last = getLast(url);
		const fileName = singer.replace(/\//g, "&") + '-' + song + '.' + last;
		const filePath = useIndexStore().downPath + '/' + fileName;
		console.log(filePath);
		await createDir('/storage/emulated/0/EMT音乐');
		//注意：url是你要下载的文件路径，  xlsName（变量，随便命名） 是文件的后缀名，用于文件命名和格式修改
		let dtask = plus.downloader.createDownload(url, {
			//1.本地路径开头使用file://;
			//2.Android平台本地绝对路径为"storage/emulated/0",就是用户文件管理器能看到的了;
			//3.创建"xxx"作为文件夹名称，后缀是用于文件命名和格式修改，大家可以使用变量。
			filename: "file:///storage/emulated/0/EMT音乐/" + fileName //利用保存路径，实现下载文件的重命名
		}, (d, status) => {//d为下载的文件对象;status下载状态
			console.log(d)
			if (status == 200) {//下载成功
				console.log("下载成功")
				//d.filename是文件在保存在本地的相对路径，使用下面的API可转为平台绝对路径
				let fileSaveUrl = plus.io.convertLocalFileSystemURL(d.filename);

				uni.showToast({
					title: song,
					icon: 'success',
					duration: 2000
				})
			} else {//下载失败
				console.log("下载失败")
				plus.downloader.clear(); //清除下载任务
			}
		}
		);
		dtask.start();//启用


	} catch (error) {
		console.log('downMusic出现错误');
	}
}

function getLast(url : string) {
	// const url = 'http://ws.stream.qqmusic.qq.com/AI0000207IOG15YbR4.flac?guid=0&vkey=6DC7A4406A9E740AF8DFE3178A2D2FB0B1EE91FDD9E7CE26BCFD43BE09F130D0C7A1A06BB9DF88D6800C31F03C226EB6511F43EEBE1160CA&uin=2965422689&fromtag=119724';  
	// 找到第一个“?”的位置  
	const questionMarkIndex = url.lastIndexOf('?');
	// 如果存在“?”  
	if (questionMarkIndex !== -1) {
		// 从“?”位置向前搜索，找到第一个“.”的位置  
		const dotIndex = url.lastIndexOf('.', questionMarkIndex - 1);
		// 如果存在“.”且它在“?”之前  
		if (dotIndex !== -1 && dotIndex < questionMarkIndex) {
			// 提取“.”和“?”之间的内容  
			const extractedContent = url.substring(dotIndex + 1, questionMarkIndex);
			console.log(extractedContent); // 输出提取的内容  
			return extractedContent;
		} else {
			console.log('utils/getLast，获取后缀的过程中出现问题');
		}
	} else {
		console.log('utils/getLast，获取后缀的过程中出错');
	}
}

const createDir = async(path) => {

	//申请本地存储读写权限
	plus.android.requestPermissions([
		'android.permission.WRITE_EXTERNAL_STORAGE',
		'android.permission.READ_EXTERNAL_STORAGE',
		'android.permission.INTERNET',
		'android.permission.ACCESS_WIFI_STATE'
	], e => {
		//请求成功执行...
		/**
		 * 创建文件夹
		 * @return {boolean} flase=失败（已存在、操作失败），true=成功
		 */
		const File = plus.android.importClass('java.io.File');
		let file = new File(path);
		if (!file.exists()) {
			return file.mkdirs();
		}
		return false;
	}, v => {
		uni.showToast({
			title: '无法获取权限，文件下载出错！',
			icon: 'none',
		})
	})


}