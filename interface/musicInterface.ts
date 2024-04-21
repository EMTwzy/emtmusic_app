export interface musicI {
	id : number,          //音乐id
	mid : string,         //mid 意义不明
	vid : string,          //音乐vid
	song : string,         //歌曲名
	subtitle : string,         //音乐标题
	singer : string,           //歌手
	album : string,           //群体
	pay : string,         //是否付费 付费
	time : string,         //时间	"2016-07-08"
	bpm : null
	quality : string,         //品质	"臻品母带2.0"
	interval : string,         //时长	"4分10秒"
	size : string,         //大小	"189.21MB"
	kbps : string,         //速度	"6336kbps"
	cover : string,         //封面
	link : string,            //qq链接
	url : string,
	[propsName:string]:any
}