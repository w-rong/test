<template>
    <div class="monitor">
        <div class="M_title">
            <headtop :title='pageTitle'/>
        </div>
        <div class="M_container">
           <div class="M_menu">
               <div class="M_menu_top">
                   <img src="../../assets/hotel/M_menu_icon.png" alt="">&nbsp;&nbsp;景区
               </div>
                <ul class="M_menu_content">
                    <!-- <li class="p_item" v-for="(item, index) in CameraIndexList" :key="index">
                        <a class=" " :class="{p_title:true, p_title1:true, active: currIndex==index}" v-on:click="changeJK(item.cameraIndexCode, index)">
                            <div class="menu_img">
                                <img src="../../assets/hotel/M_menu_1.png" alt="">
                            </div>
                            &nbsp;&nbsp;&nbsp;&nbsp;{{item.cameraName}}
                        </a>  -->
                        <!-- <el-checkbox-group v-model="checkedValue">
                            <el-checkbox v-for="(item, index) in CameraIndexList"  @change="changeJK(item.cameraIndexCode)" :key="index" :label="item.cameraIndexCode">
                                <div class="p_item_item">
                                    <a>{{item.cameraName}}</a>
                                </div>
                            </el-checkbox>
                        </el-checkbox-group> -->
                        
                    <!-- </li> -->
                    
                    <li class="p_item" v-for="(item, index) in CameraIndexList1" :key="index">
                        <a class="p_title p_title1" v-on:click="curshow(item, index)">
                            <div class="menu_img">
                                <img src="../../assets/hotel/M_menu_1.png" alt="">
                            </div>
                            &nbsp;&nbsp;&nbsp;&nbsp;{{item.cameraName}}
                            <img class="p_item_right"  :src="item.flag ? require('../../assets/hotel/down.png'): require('../../assets/hotel/up.png')" />
                        </a> 
                        <ul class="c_item" v-if="item.flag">
                            <li class="p_item_3" :key="index">
                                <!-- <a>{{sub.name}}</a> -->
                                <div  v-for="(sub, index1) in item.mList" :key="index1" :class="{c_item_list:true, active: index1 == checkedIndex}" @click="changeJK(sub.cameraIndexCode, index1)">{{sub.cameraName}}</div>
                            </li> 
                        </ul>
                    </li>
                </ul>
           </div>
           <div class="M_monitor">
                <!--  <div class="M_monitor_item" v-for="(item, index) in checkedValue" :key="index">
                   <div class="M_monitor_item_btn">
                        <div class="M_monitor_item_allScreen" @click="closeVideo(index)">
                            <img src="../../assets/hotel/M_close.png" alt="">
                        </div>
                        <div class="M_monitor_item_close" @click="allScreenVideo(index)">
                            <img src="../../assets/hotel/M_all_screen.png" alt="">
                        </div>
                   </div>
                   <div class="M_monitor_item_video">{{index}}</div>
               </div>-->
                <!--预览界面-->
                <div id="operate" class="M_monitor_item">
                    <!-- <div class="topbutton"> -->
                        <!-- <span class="topBtns" :class="playMode === 0 ? 'activeBtn' : ''" @click="previewClick">预览</span>
                        <span class="topBtns" :class="playMode === 1 ? 'activeBtn' : ''" @click="playBack">回放</span> -->
                    <!-- </div> -->
                    <div id="playBox" v-html="oWebControl === null ? playText : ''"> </div>
                </div>
           </div> 
        </div>
    </div>
</template>

<script>
import headtop from '@/components/header/headtop';
import '@/assets/js/jsencrypt.min.js'
import {WebControl} from '@/assets/js/jsWebControl-1.0.0.min.js'
export default {
    components: {
        headtop
    },
    data(){
        return {
            checkedIndex: 0,
            currIndex: 0,
            pageTitle: '视频监控',
            textarea: '',
            pagNumber: 1,
            pagSize: 9999,
            CameraIndexList1: [],
            CameraIndexList: [],
            checkedValue: [],
            lists: [
                {
                    name: '杉杉普陀天地',
                    url: require('../../assets/hotel/M_menu_1.png'),
                    flag: false,
                    sublist: [
                        { name: '南大门'}, 
                        { name: '东大门'}, 
                        { name: '西大门'}, 
                    ]
                },    
            ],
            // sublist: [],
            monitoringList: [],
            oWebControl: null,
			pubKey: '', // 公钥
			appkey: '21160258',
			secret: 'xfztMxGXnPfYStP4EOKS',
			ip: '113.214.37.162',
			port: '1443',
			width: 900,
			height: 200, // 弹框高度
			playHeight: 600,
			layout: '1x1',
			left: '00',
			top: '50',
			buttonIDs: '0,16,256,257,258,259,260,512,513,514,515,516,517,768,769',
			initCount: 0,
			playMode: 0, // 0 预览 1回放
			playText: '启动中。。。',
            cameraIndexCode:  '', // 监控点编号
            // cameraIndexCode: 'bcecd3030097454fbb2c1ff6591198c4' || '', // 监控点编号
            // "bcecd3030097454fbb2c1ff6591198c4",ec31030c508a4b15a359a2db651639f5
		
        }
    },
    methods: {
        changeJK(index, index1){
            this.currIndex = index1
            this.cameraIndexCode = index
            this.checkedIndex = index1
            this.previewClick()
            // console.log(this.checkedValue)
            // console.log(index)
            // var that = this
            
            // this.checkedValue.forEach(item=>{
            //     that.cameraIndexCode = item
            //     this.previewClick()
            // })
            //  that.cameraIndexCode = that.cameraIndexCode[that.cameraIndexCode.length - 1]
            // if(this.checkedValue.length == 1){
            //     this.layout = '1x1'
            // } else if(this.checkedValue.length == 2){
            //     this.layout = '1x2'
            // } else if(this.checkedValue.length > 2 && this.checkedValue.length <= 4){
            //     this.layout = '2x2'
            // }else if(this.checkedValue.length > 4 && this.checkedValue.length <= 9){
            //     this.layout = '3x3'
            // }
            var that = this
            this.oWebControl.JS_RequestInterface({
				funcName: "setLayout",
				argument: JSON.stringify({
					layout: that.layout                     //可指定播放窗口
				})
			});
        },
        // 获取监控列表
        async getMonitorList(){
            var res = await this.$http.get(
                `/base/listPtMonitorPoint?pagNumber=${this.pagNumber}&pagSize=${this.pagSize}`,
            )
            let {data, code} = res.data
            // console.log(res)
            this.lists = []
            if(data.list.length != 0){
                data.list.forEach(item => {
                    this.lists.push(
                        {
                            name: item.scenicName, 
                            id: item.id, 
                            url: require('../../assets/hotel/M_menu_1.png'),
                            flag: false,
                            sublist: []
                        }
                    )
                });
                this.lists[0].sublist[0] = {name: '图书馆', monitoringplatformName: 'ca9f7f8c21f5448a8f5135a7d19e1d27'}
                this.lists[0].sublist[1] = {name: '博物馆', monitoringplatformName: '18899199f4da4849a9b0a783c93cf4b8'}
            }
        },
        async curshow(list, index){
            //如果状态是点开的，那么再次点击就隐藏
            if(list.flag){
                list.flag=false;
            }//若当前的是隐藏，则点击当前的显示，其余的隐藏
            else{
                for( let i = 0; i < this.CameraIndexList1.length; i++){
                    this.CameraIndexList1[i].flag = false;
                }
                this.CameraIndexList1[index].flag = true;
            }


        },
        // 获取监控点编号
        async getCameraIndexCode(){
            var res = await this.$http.get(
                `/base/getCameraIndexCode`
            )
            let newArr = []
            let newArr1 = []
            let data = res.data.data.data.list
            
            data.forEach(item=>{
                if(item.cameraName != '文化馆'){
                    newArr.push(item)
                }else{
                    newArr1.push(item)
                }
            })
            this.CameraIndexList = newArr.concat(newArr1)

            var arr = newArr.concat(newArr1)
            var res = [];
            var narr = [];
            for(var i = 0; i<arr.length; i++){
                var n = res.indexOf(arr[i].encodeDevIndexCode);
                if(n == -1){
                    res.push(arr[i].encodeDevIndexCode);
                    narr.push({cameraName:arr[i].cameraName, mList:[arr[i]]})
                }else{
                    // 有相同
                    narr[n].mList.push(arr[i])

                    // narr[n].fraction.push(arr[i])
                    if(narr[n].mList.length > 1){
                        let a = narr[n].mList[0].cameraName
                        let b = narr[n].mList[1].cameraName
    
                        
                        let commonStr = ''
                        for (let j = 0; j < a.length ; j++) {
                            if (a[j] === b[j]){
                                commonStr += a[j]
                            }
                        }
                        narr[n].cameraName = commonStr

                    }
                }
            }

            narr.forEach(item=>{
                item.flag = false
            })
            console.log(narr)
            narr.forEach(item=>{
                item.mList.forEach((item1, index)=>{
                    let strList = item1.cameraName.split('')
                    
                })
            })


            this.CameraIndexList1 = narr
            
        },
        checkedFn(){
            this.cameraIndexCode = this.checkedValue[0]

        },
        closeVideo(index){
            this.checkedValue.splice(index, 1)
        },
        allScreenVideo(){
        }, 
        // 监控
       handleClose() {
			if (this.oWebControl) {
				this.oWebControl.JS_RequestInterface({
						funcName: "stopAllPreview"
				});
				this.oWebControl.JS_HideWnd();
				this.oWebControl.JS_Disconnect().then(
						() => {  // 断开与插件服务连接成功
						}, 
						() => {  // 断开与插件服务连接失败 
						});
				this.oWebControl = null;
			}
			this.$emit('close');
		},
		// 推送消息
		cbIntegrationCallBack(oData) {
			// console.log(oData, '推送消息');
		},
		// RSA加密
		setEncrypt (value) {
			/* eslint-disable */
			let encrypt = new JSEncrypt();
			encrypt.setPublicKey(this.pubKey);
			return encrypt.encrypt(value);
		},
		initPlugin(callback) {
            // console.log(callback)
			/* eslint-disable */
			let that = this;
			this.oWebControl = new WebControl({
					szPluginContainer: "playBox",                       // 指定容器id
					iServicePortStart: 15900,                           // 指定起止端口号，建议使用该值
					iServicePortEnd: 15909,
					szClassId: "23BF3B0A-2C56-4D97-9C03-0CB103AA8F11",  // 用于IE10使用ActiveX的clsid
					cbConnectSuccess: function () {                     // 创建WebControl实例成功
						that.oWebControl.JS_StartService("window", {      // WebControl实例创建成功后需要启动服务
							dllPath: "./VideoPluginConnect.dll"             // 值"./VideoPluginConnect.dll"写死 
						}).then(function () {                             // 启动插件服务成功
							that.oWebControl.JS_SetWindowControlCallback({  // 设置消息回调
								cbIntegrationCallBack: that.cbIntegrationCallBack
							});
							
							that.oWebControl.JS_CreateWnd("playBox", that.width, that.playHeight).then(function () { // JS_CreateWnd创建视频播放窗口，宽高可设定
								that.init(callback);  // 创建播放实例成功后初始化
							});
						}, function () { // 启动插件服务失败
						});
					},
					cbConnectError: function () { // 创建WebControl实例失败
						that.oWebControl = null;
						that.playText = '插件未启动，正在尝试启动，请稍候...';
						WebControl.JS_WakeUp("VideoWebPlugin://"); // 程序未启动时执行error函数，采用wakeup来启动程序
						that.initCount++;
						if (that.initCount < 3) {
							setTimeout(function () {
								that.initPlugin();
							}, 3000)
						} else {
							that.playText = '<div style="color: #fff; width:100%;">插件启动失败，请检查插件是否安装！<a style="color: #ccc;" href="http://47.96.94.56:8081/VideoWebPlugin.exe">请检查下载</a></div>';
						}
					},
					cbConnectClose: function (bNormalClose) {
						// 异常断开：bNormalClose = false
						// JS_Disconnect正常断开：bNormalClose = true	
						console.log("cbConnectClose");
						that.oWebControl = null;
					}
			});
		},
		// 获取公钥
		getPubKey (callback) {
			this.oWebControl.JS_RequestInterface({
					funcName: "getRSAPubKey",
					argument: JSON.stringify({
							keyLength: 1024
					})
			}).then((oData) => {
					if (oData.responseMsg.data) {
							this.pubKey = oData.responseMsg.data;
							callback()
					}
			})
		},
		init(callback) {
			let that = this;
			this.getPubKey(() => {
					// //////////////////////////////// 请自行修改以下变量值	////////////////////////////////////
					let appkey = '21160258';                           // 综合安防管理平台提供的appkey，必填
					let secret = that.setEncrypt('xfztMxGXnPfYStP4EOKS');// 综合安防管理平台提供的secret，必填
					let ip = '113.214.37.162';                           // 综合安防管理平台IP地址，必填
					let playMode = 0;                                  // 初始播放模式：0-预览，1-回放
					let port = 1443;                                    // 综合安防管理平台端口，若启用HTTPS协议，默认443
					let snapDir = "D:\\SnapDir";                       // 抓图存储路径
					let videoDir = "D:\\VideoDir";                     // 紧急录像或录像剪辑存储路径
					let layout = that.layout;                          // playMode指定模式的布局
					let enableHTTPS = 1;                               // 是否启用HTTPS协议与综合安防管理平台交互，是为1，否为0
					let encryptedFields = 'secret';					   				 // 加密字段，默认加密领域为secret
					let showToolbar = 1;                               // 是否显示工具栏，0-不显示，非0-显示
					let showSmart = 1;                                 // 是否显示智能信息（如配置移动侦测后画面上的线框），0-不显示，非0-显示
					let buttonIDs = "0,16,256,257,258,259,260,512,513,514,515,516,517,768,769";                    // 自定义工具条按钮
					// /////////////////////////////// 请自行修改以上变量值	////////////////////////////////////
					that.oWebControl.JS_RequestInterface({
							funcName: "init",
							argument: JSON.stringify({
									appkey: appkey,                            // API网关提供的appkey
									secret: secret,                            // API网关提供的secret
									ip: ip,                                    // API网关IP地址
									playMode: playMode,                        // 播放模式（决定显示预览还是回放界面）
									port: port,                                // 端口
									snapDir: snapDir,                          // 抓图存储路径
									videoDir: videoDir,                        // 紧急录像或录像剪辑存储路径
									layout: layout,                            // 布局
									enableHTTPS: enableHTTPS,                  // 是否启用HTTPS协议
									encryptedFields: encryptedFields,          // 加密字段
									showToolbar: showToolbar,                  // 是否显示工具栏
									showSmart: showSmart,                      // 是否显示智能信息
									buttonIDs: buttonIDs                       // 自定义工具条按钮
							})
					}).then((oData) => {
							that.oWebControl.JS_Resize(that.width, that.playHeight);  // 初始化后resize一次，规避firefox下首次显示窗口后插件窗口未与DIV窗口重合问题
							if (callback) {
								callback();
							}
					});
			});
		},
		// 视频预览功能
		previewClick() {
			if (!this.oWebControl) {
				return;
			}
			// 如果是回放，重新初始化
			if (this.playMode === 1) {
				this.playMode = 0;
				this.oWebControl.JS_HideWnd();
				this.initPlugin(() => {
					this.previewVideo();
				});
				
			} else if (this.playMode === 0) {
				this.previewVideo();
			}
		},
		previewVideo() {
            // console.log('LLLL')
			let cameraIndexCode = this.cameraIndexCode;             // 获取输入的监控点编号值，必填
			let streamMode = 0;                                     // 主子码流标识：0-主码流，1-子码流
			let transMode = 0;                                      // 传输协议：0-UDP，1-TCP
			let gpuMode = 0;                                        // 是否启用GPU硬解，0-不启用，1-启用
			let wndId = -1;                                         // 播放窗口序号（在2x2以上布局下可指定播放窗口）
			
			this.oWebControl.JS_RequestInterface({
					funcName: "startPreview",
					argument: JSON.stringify({
                        cameraIndexCode: cameraIndexCode.trim(),        // 监控点编号
                        streamMode: streamMode,                         // 主子码流标识
                        transMode: transMode,                           // 传输协议
                        gpuMode: gpuMode,                               // 是否开启GPU硬解
                        wndId: wndId                                    // 可指定播放窗口
					})
			})
		},
		// 回放
		playBack() {
			if (!this.oWebControl) {
				return;
			}
			// 如果是预览
			if (this.playMode === 0) {
				this.playMode = 1;
				this.oWebControl.JS_HideWnd();
				this.initPlugin(() => {
					this.backVideo();
				});
			} else if (this.playMode === 1) {
					this.backVideo();
			}
		},
		backVideo() {
			let cameraIndexCode = this.cameraIndexCode;
			// 前30天
			let date = new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000);
			let month = date.getMonth() + 1 < 10 ? ('0' + date.getMonth() + 1) : (date.getMonth()+ 1);
			// 开始时间当天00点
			let str = date.getFullYear() + '/' + month + '/' + date.getDate() + ' 00:00:00'
			let startTime = String(parseInt(new Date(str).getTime() / 1000) -  3 * 60 * 60);
			let endTime = String(parseInt(date.getTime() / 1000));
			this.oWebControl.JS_RequestInterface({
				funcName: "startPlayback",
				argument: JSON.stringify({
					cameraIndexCode: cameraIndexCode.trim(), // 监控点编号
					startTimeStamp: startTime, // 录像查询开始时间戳，单位：秒
					endTimeStamp: endTime, // 录像查询结束时间戳，单位：秒
					recordLocation: 1, // 录像存储类型 0-中心存储 1-设备存储
					transMode: 0, // 传输协议 ，0-UDP 1-TCP
					gpuMode: 0, // 是否开启 GPU 硬解，0-不开启 1-开启
					wndId: -1                         //可指定播放窗口
				})
			});
        },

    },
    mounted(){
        this.getCameraIndexCode()
        // this.getMonitorList()
        // this.webVideo = new WebVideo()
        this.appkey = this.appKey;
		this.secret = this.appSecret;
		this.ip = this.ip;
		this.port = this.port;
		// 设置top left
		let bodyW = this.width
        let bodyH = this.height;
		this.left = this.left;
		this.top = this.top;
		
		this.initPlugin(() => {
                this.previewVideo();
            });
    },
    destroyed () {
        console.log('destroyed')
        if (this.oWebControl != null){
			this.oWebControl.JS_HideWnd();   // 先让窗口隐藏，规避插件窗口滞后于浏览器消失问题
			this.oWebControl.JS_Disconnect().then(function(){}, function() {});
		}
    }
   
}

let a = '桃花寨公交车';
let b = '桃花寨车道们';
let comm = '';
for (let i = 0; i < a.length ; i++) {
    if (a[i] === b[i]){
        comm += a[i]
    }else {
        break;
    }
}
console.log(comm)

var arr = [
    {
        nid: 0,
        name: "小学语文",
        fraction: 80
    },
    {
        nid: 0,
        name: "初中语文",
        fraction: 2220
    },
    {
        nid: 1,
        name: "数学",
        fraction: 54
    },
]
var res = [];
var narr = [];
for(var i =0; i<arr.length; i++){
    var n = res.indexOf(arr[i].nid);
    console.log(i)
    if(n == -1){
        res.push(arr[i].nid);
        narr.push({name:arr[i].name,fraction:[arr[i]]})
    }else{
        // 有相同
        console.log(i)
        narr[n].fraction.push(arr[i])
        let a = narr[0].fraction[0].name
        let b = narr[0].fraction[1].name

        
        let commonStr = ''
        for (let j = 0; j < a.length ; j++) {
            if (a[j] === b[j]){
                commonStr += a[j]
            }
        }
        narr[n].name = commonStr
    }
}
console.log(narr)




</script>

<style>
    .monitor .p_title.p_title1.active{
        background: #164265;
    }
    .monitor .M_container .M_menu_content .el-checkbox{
        width: 100%;
        padding-left: 30px;
        box-sizing: border-box;
    }
    .p_item_item{
        width: 100%;
        height: 40px;
    }
    .M_menu_content{
        width: 100%;
        height: 85%;
        margin: 0 auto;      
        overflow: auto;
    }
    .M_menu_content::-webkit-scrollbar {/*滚动条整体样式*/
        width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }

    .M_menu_content::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background:linear-gradient(0deg,rgba(58,126,255,1) 0%,rgba(58,126,255,1) 0%,rgba(6,203,233,1) 0%,rgba(25,151,254,1) 100%);
    }
    .M_menu_content::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 10px;
        background: #053762;
    }
    .monitor{
        width: 100%;
        height: 100%;
        background: url('../../assets/hotel/F_bg.jpg') no-repeat;
        background-size: 100% 100%;
        font-family: 'PingFang SC';
        overflow: hidden;
    }
    .M_title{
        width: 100%;
        height: 8.61%;
        /* background: url('../../assets/hotel/pass_title.png') no-repeat;
        background-size: 100% 100%; */
        position: relative;
    }
    .M_menu_top{
        width: 100%;
        height: 52px;
        background-color: #0B67A0;
        padding-left: 16px;
        box-sizing: border-box;
        line-height: 52px;
    }
    .M_menu_top img{
        width: 19px;
        height: 18px;
        display: inline-block;
        vertical-align: middle;
    }
    .M_title_txt{
        width: 100%;
        height: 22px;
        line-height: 10px;
        font-size: 22px;
        text-align: center;
        color: #CBEAFF;
        position: absolute;
        top: 50%;
        margin-top: -11px;
        font-weight:bold;
        text-shadow:0px 1px 0px rgba(0, 0, 0, 1);
    }
    .M_container{
        width: 100%;
        height: 91.38%;
        box-sizing: border-box;
        position: relative;
    }
    .M_menu{
        width: 268px;
        height: 100%;
        /* border-right: 2px solid #053762; */
        background: #00213c;
        float: left;
        font-size: 16px;
        color: #fff;
    }
    .M_menu a {
        color: #fff;
        text-decoration: none;
    }
    .p_title {
        color: #fff;
        display: block;
        padding: 8px;
        box-sizing: border-box;
        cursor: pointer;
        background-color: #0b67a0;
        margin-bottom: 12px;
        line-height: 39px;
    }
    .menu_icon{
        width: 19px;
        height: 19px;
        float: left;
        margin-top: 10px;
    }
    .menu_img{
        width: 39px;
        height: 39px;
        float: left;
        margin-right: 6px;
    }
    .menu_img > img, .menu_icon img{
        display: block;
        width: 100%;
        height: 100%;
    }
    .p_item_right{
        width: 17px;
        height: 10px;
        display: inline-block;
        float: right;
        margin-top: 13px;
    }
    .p_title.p_title1{
        padding: 8px 15px 8px 20px;
        box-sizing: border-box;
        background: #00213c;
        margin-bottom: 0;
    }
    .p_title b{
        float: right;
        transition: all ease 1s;
        -webkit-transition: all ease 1s;
        -o-transition: all ease 1s;
        -moz-transition:　all ease 1s;
        -ms-transition: all ease 1s;
    }
    .up {
        /* transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -ms-transform: rotate(0deg); */
        
        width: 17px;
        height: 10px;
        display: inline-block;
        background: url('../../assets/hotel/up.png')
    }
    .down {
        width: 17px;
        height: 10px;
        display: inline-block;
        background: url('../../assets/hotel/down.png');
        /* transform: rotate(180deg);
        -webkit-transform: rotate(180deg);
        -o-transform: rotate(180deg);
        -moz-transform: rotate(180deg);
        -ms-transform: rotate(180deg); */
    }
    .p_title:hover {
        color: #999;
    }
    .p_item_3{
        /* padding-left: 60px;
        box-sizing: border-box; */
    }
    .c_item_list{
        line-height: 45px;
        padding-left: 60px;
        box-sizing: border-box;
    }
    .c_item_list.active{
        background-color: #053762;
    }
    .p_item_3 .el-checkbox{
        width: 100%;
    }
    .p_item_3 .el-checkbox__label{
        text-align: center;
    }
    .p_item_3 .el-checkbox__label a{
        padding: 10px 0px 10px 10px;
    }
    .c_item  a{
        display: block;
        padding: 10px 20px 10px 60px;
        box-sizing: border-box;
        background: #00213c;
        color: #fff;
    }
    .c_item li{
        cursor: pointer;
    }
    .c_item li a:hover {
        color: #999;
    }
    .M_monitor{
        width: calc(100% - 270px);
        height: 100%;
        padding: 20px 3px 20px 13px;
        box-sizing: border-box;
        float: right;
    }
    .M_monitor_item{
        width: 400px;
        color: #fff;
        position: relative;
        box-sizing: border-box;
        float: left;
        margin-right: 1%;
        margin-bottom: 50px;
    }
    .topBtns{
        width: 50px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        color: #B2D2E3;
        cursor: pointer;
    }
    .M_monitor_item_btn{
        width: 100%;
        height: 20px;
        position: absolute;
        top: 7px;
        right: 23px;
    }
    .M_monitor_item_allScreen{
        width: 17px;
        height: 17px;
        float: right;
        margin-top: 2px;
        margin-right: 2px;
    }
    .M_monitor_item_close{
        width: 26px;
        height: 20px;
        float: right;
        margin-right: 12px;
    }
    .M_monitor_item_allScreen img, .M_monitor_item_close img{
        width: 100%;
        height: 100%;
        display: block;
    }
    .M_monitor_item_video{
        width: 100%;
        height: 100%;
    }
    .openF{
        /* display: none; */
    }
</style>
