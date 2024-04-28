import { useIndexStore } from "../pinia/useIndex";  

export const getPath=()=>{
	// 使用示例
	const dirPath = "/storage/emulated/EMT音乐"; 
	checkAndCreateDir(dirPath).then(result => {  
	    if (result) {  
	        console.log("目录检查或创建成功");  
			useIndexStore().downPath=dirPath;
	    } else {  
	        console.log("目录检查或创建失败");  
	    }  
	}).catch(error => {  
	    console.error("发生错误：", error);  
	});
}
function checkAndCreateDir(dirPath) {  
    return new Promise((resolve, reject) => {  
        // 检测目录是否存在  
        plus.io.resolveLocalFileSystemURL(dirPath, entry => {  
            // 如果目录存在，直接返回  
            if (entry.isDirectory) {  
                console.log(`${dirPath} 已存在`);  
                resolve(true);  
            } else {  
                // 如果目录不存在，创建目录  
                plus.io.requestFileSystem(plus.io.PRIVATE_DOC, fs => {  
                    fs.root.getDirectory(dirPath, {  
                        create: true // 如果目录不存在，则创建  
                    }, entry => {  
                        console.log(`已创建目录：${dirPath}`);  
                        resolve(true);  
                    }, error => {  
                        console.error(`创建目录失败：${error.message}`);  
                        resolve(false);  
                    });  
                }, error => {  
                    console.error(`获取文件系统失败：${error.message}`);  
                    resolve(false);  
                });  
            }  
        }, error => {  
            // 如果目录不存在且有其他错误，返回失败  
            console.error(`目录不存在且有其他错误：${error.message}`);  
            resolve(false);  
        });  
    });  
}  
  
