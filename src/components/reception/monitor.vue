<template>
    <div class="monitor">
        <div class="M_title">
            <headtop :title='pageTitle'/>
            <!-- <div class="M_title_txt">视频监控</div> -->
        </div>
        <div class="M_container">
           <div class="M_menu">
                <ul>
                    <li class="p_item" v-for="(item, index) in lists" :key="index">
                        <a class="p_title p_title1" v-on:click="curshow(item, item.id)">
                            <div class="menu_img">
                                <img :src="item.url" alt="">
                            </div>
                            &nbsp;&nbsp;{{item.name}}
                            <b :class="item.flag ? 'down': 'up'">^</b>
                        </a>
                        <ul class="c_item" v-if="item.flag">
                            <!-- <li class="p_item_3" :key="index">
                                <el-checkbox-group v-model="checkedValue" @change="checkedFn">
                                    <el-checkbox  v-for="(sub, index) in item.sublist" :key="index" :label="sub.name">
                                        <a>{{sub.name}}</a>
                                    </el-checkbox>
                                </el-checkbox-group>
                            </li>  -->
                        </ul>
                    </li>
                    <!-- </li> -->
                    <!-- <li v-for="(list1, index) in lists" :key="index">
                        <a class="p_title" v-on:click="curshow1(list1)">
                            <div class="menu_icon"><img :src="list1.url" alt=""></div>
                            &nbsp;&nbsp;{{list1.name}}
                        </a>
                        <ul v-if="list1.flag1">
                            <li class="p_item" v-for="(list, index) in list1.sublist1" :key="index">
                                <a class="p_title p_title1" v-on:click="curshow(list)">
                                    <div class="menu_img"><img :src="list.url" alt=""></div>
                                    &nbsp;&nbsp;{{list.name}}
                                    <b :class="list.flag ? 'down': 'up'">^</b>
                                </a>
                                <ul class="c_item" v-if="list.flag">
                                    <li class="p_item_3" :key="index">
                                        <el-checkbox-group v-model="checkedValue" @change="checkedFn">
                                            <el-checkbox  v-for="(sub, index) in list.sublist" :key="index" :label="sub.name">
                                                <a>{{sub.name}}</a>
                                            </el-checkbox>
                                        </el-checkbox-group>
                                    </li> 
                                </ul>
                            </li>
                        </ul>
                    </li> -->
                </ul>
           </div>
           <!-- <div class="M_monitor">
               <div class="M_monitor_item" v-for="(item, index) in checkedValue" :key="index">
                   <div class="M_monitor_item_btn">
                        <div class="M_monitor_item_allScreen" @click="closeVideo(index)">
                            <img src="../../assets/hotel/M_close.png" alt="">
                        </div>
                        <div class="M_monitor_item_close" @click="allScreenVideo(index)">
                            <img src="../../assets/hotel/M_all_screen.png" alt="">
                        </div>
                   </div>
                   <div class="M_monitor_item_video">{{index}}</div>
               </div>
           </div> -->
           <div style="width: 60%; height: 100%;float:left;">
                <!--预览界面-->
                <div id="operate" class="operate">
                    <div class="module">
                        <div class="item"><span class="label">监控点编号：</span><input id="cameraIndexCode" type="text"  v-model="inputValue"></div>
                        <div class="item" style="margin-top: 20px;margin-left: 100px;">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <button style="width:20px;padding:0;margin:0;" id="startPreview" class="btn" @click="yulan()">预览</button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <button style="width:90px;padding:0;margin:0;" id="stopAllPreview" class="btn">停止全部预览</button>
                        </div>
                    </div>
                </div>
                <!--视频窗口展示-->
                <div id="playWnd" class="playWnd" style="left: 109px; top: 133px;"></div>
           </div>
        </div>
    </div>
</template>

<script>
import headtop from '@/components/header/headtop';
// import '@/assets/js/jquery-1.12.4.min.js'
import {WebVideo} from '@/assets/js/WebVideo.js'
// import '@/assets/js/jsencrypt.min.js'
import '@/assets/js/jsWebControl-1.0.0.min.js'
export default {
    components: {
        headtop
    },
    data(){
        return {
            pageTitle: '视频监控',
            pagNumber: 1,
            pagSize: 9999,
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
            initCount: 0,
            pubKey: '',
            inputValue: '',
            oWebControl: null,
            WebControl: null
        }
    },
    methods: {
        async getMonitorList(){
            var res = await this.$http.get(
                `/base/listPtScenicMonitorPlatform?pagNumber=${this.pagNumber}&pagSize=${this.pagSize}`,
            )
            let {data, code} = res.data
            console.log(res)
            this.lists = []
            if(data.list.length != 0){
                data.list.forEach(item => {
                    this.lists.push(
                        {
                            name: item.scenicName, 
                            id: item.id, 
                            url: require('../../assets/hotel/M_menu_1.png'),
                            flag: false
                        }
                    )
                });
            }

        },
        async curshow(list, id){
            //如果状态是点开的，那么再次点击就隐藏
            if(list.flag){
                list.flag=false;
            }//若当前的是隐藏，则点击当前的显示，其余的隐藏
            else{
                for(let i=0;i<this.lists.length;i++){
                    this.lists[i].flag=false;
                }
                list.flag = true;
            }
            
            var res = await this.$http.get(
                `/base/getPtScenicMonitorPlatformById?id=${id}`
            )
            console.log(res)
        },
        checkedFn(){
            console.log(this.checkedValue)
        },
        closeVideo(index){
            this.checkedValue.splice(index, 1)
        },
        allScreenVideo(){
        }, 
        // 监控
        yulan(){
            var cameraIndexCode  = this.inputValue     //获取输入的监控点编号值，必填
            var streamMode = 0;                                     //主子码流标识：0-主码流，1-子码流
            var transMode = 1;                                      //传输协议：0-UDP，1-TCP
            var gpuMode = 0;                                        //是否启用GPU硬解，0-不启用，1-启用
            var wndId = -1;                                         //播放窗口序号（在2x2以上布局下可指定播放窗口）

            cameraIndexCode = cameraIndexCode.replace(/(^\s*)/g, "");
            cameraIndexCode = cameraIndexCode.replace(/(\s*$)/g, "");

            this.oWebControl.JS_RequestInterface({
                funcName: "startPreview",
                argument: JSON.stringify({
                    cameraIndexCode:cameraIndexCode,                //监控点编号
                    streamMode: streamMode,                         //主子码流标识
                    transMode: transMode,                           //传输协议
                    gpuMode: gpuMode,                               //是否开启GPU硬解
                    wndId:wndId                                     //可指定播放窗口
                })
            })
        },
        initPlugin () {
            var that = this
            this.oWebControl = new WebControl({
                szPluginContainer: "playWnd",                       // 指定容器id
                iServicePortStart: 15900,                           // 指定起止端口号，建议使用该值
                iServicePortEnd: 15909,                             
                szClassId:"23BF3B0A-2C56-4D97-9C03-0CB103AA8F11",   // 用于IE10使用ActiveX的clsid
                cbConnectSuccess: function () {                     // 创建WebControl实例成功											
                    this.oWebControl.JS_StartService("window", {         // WebControl实例创建成功后需要启动服务
                        dllPath: "./VideoPluginConnect.dll"         // 值"./VideoPluginConnect.dll"写死 
                    }).then(function () {                           // 启动插件服务成功
                        this.oWebControl.JS_SetWindowControlCallback({   // 设置消息回调
                            cbIntegrationCallBack: this.cbIntegrationCallBack
                        });
                        
                        this.oWebControl.JS_CreateWnd("playWnd", 1000, 600).then(function () { //JS_CreateWnd创建视频播放窗口，宽高可设定
                            this.init();  // 创建播放实例成功后初始化
                        });
                    }, function () { // 启动插件服务失败
                    });
                },
                cbConnectError: function () { // 创建WebControl实例失败
                    this.oWebControl = null;
                    $("#playWnd").html("插件未启动，正在尝试启动，请稍候...");
                    this.WebControl.JS_WakeUp("VideoWebPlugin://"); // 程序未启动时执行error函数，采用wakeup来启动程序
                    this.initCount ++;
                    if (this.initCount < 3) {                             
                        setTimeout(function () {
                            initPlugin();
                        }, 3000)
                    } else {
                        $("#playWnd").html("插件启动失败，请检查插件是否安装！");
                    }
                },
                cbConnectClose: function (bNormalClose) {            
                    // 异常断开：bNormalClose = false
                    // JS_Disconnect正常断开：bNormalClose = true	
                    console.log("cbConnectClose");
                    this.oWebControl = null;
                }
            });
            console.log(this.oWebControl)
        },
        setCallbacks(){
            this.oWebControl.JS_SetWindowControlCallback({
                cbIntegrationCallBack: this.cbIntegrationCallBack
            });
        },
        cbIntegrationCallBack(oData) {
            showCBInfo(JSON.stringify(oData.responseMsg));
        },
        init(){
            var that = this
            this.getPubKey(function () {
                
                ////////////////////////////////// 请自行修改以下变量值	////////////////////////////////////		
                var appkey = "21160258";                           //综合安防管理平台提供的appkey，必填
                var secret = this.setEncrypt("xfztMxGXnPfYStP4EOKS");   //综合安防管理平台提供的secret，必填
                var ip = "113.214.37.162";                           //综合安防管理平台IP地址，必填
                var playMode = 0;                                  //初始播放模式：0-预览，1-回放
                var port = 1443;                                    //综合安防管理平台端口，若启用HTTPS协议，默认443
                var snapDir = "D:\\SnapDir";                       //抓图存储路径
                var videoDir = "D:\\VideoDir";                     //紧急录像或录像剪辑存储路径
                var layout = "1x1";                                //playMode指定模式的布局
                var enableHTTPS = 1;                               //是否启用HTTPS协议与综合安防管理平台交互，是为1，否为0
                var encryptedFields = 'secret';					   //加密字段，默认加密领域为secret
                var showToolbar = 1;                               //是否显示工具栏，0-不显示，非0-显示
                var showSmart = 1;                                 //是否显示智能信息（如配置移动侦测后画面上的线框），0-不显示，非0-显示
                var buttonIDs = "0,16,256,257,258,259,260,512,513,514,515,516,517,768,769";  //自定义工具条按钮
                ////////////////////////////////// 请自行修改以上变量值	////////////////////////////////////

                this.oWebControl.JS_RequestInterface({
                    funcName: "init",
                    argument: JSON.stringify({
                        appkey: appkey,                            //API网关提供的appkey
                        secret: secret,                            //API网关提供的secret
                        ip: ip,                                    //API网关IP地址
                        playMode: playMode,                        //播放模式（决定显示预览还是回放界面）
                        port: port,                                //端口
                        snapDir: snapDir,                          //抓图存储路径
                        videoDir: videoDir,                        //紧急录像或录像剪辑存储路径
                        layout: layout,                            //布局
                        enableHTTPS: enableHTTPS,                  //是否启用HTTPS协议
                        encryptedFields: encryptedFields,          //加密字段
                        showToolbar: showToolbar,                  //是否显示工具栏
                        showSmart: showSmart,                      //是否显示智能信息
                        buttonIDs: buttonIDs                       //自定义工具条按钮
                    })
                }).then(function (oData) {
                    this.oWebControl.JS_Resize(1000, 600);  // 初始化后resize一次，规避firefox下首次显示窗口后插件窗口未与DIV窗口重合问题
                });
            });
        },
        getPubKey (callback) {
            this.oWebControl.JS_RequestInterface({
                funcName: "getRSAPubKey",
                argument: JSON.stringify({
                    keyLength: 1024
                })
            }).then(function (oData) {
                console.log(oData);
                if (oData.responseMsg.data) {
                    this.pubKey = oData.responseMsg.data;
                    callback()
                }
            })
        },
        setEncrypt (value) {
            var encrypt = new JSEncrypt();
            encrypt.setPublicKey(this.pubKey);
            return encrypt.encrypt(value);
        },
        setWndCover() {
            var iWidth = $(window).width();
            var iHeight = $(window).height();
            var oDivRect = $("#playWnd").get(0).getBoundingClientRect();

            var iCoverLeft = (oDivRect.left < 0) ? Math.abs(oDivRect.left): 0;
            var iCoverTop = (oDivRect.top < 0) ? Math.abs(oDivRect.top): 0;
            var iCoverRight = (oDivRect.right - iWidth > 0) ? Math.round(oDivRect.right - iWidth) : 0;
            var iCoverBottom = (oDivRect.bottom - iHeight > 0) ? Math.round(oDivRect.bottom - iHeight) : 0;

            iCoverLeft = (iCoverLeft > 1000) ? 1000 : iCoverLeft;
            iCoverTop = (iCoverTop > 600) ? 600 : iCoverTop;
            iCoverRight = (iCoverRight > 1000) ? 1000 : iCoverRight;
            iCoverBottom = (iCoverBottom > 600) ? 600 : iCoverBottom;

            this.oWebControl.JS_RepairPartWindow(0, 0, 1001, 600);    // 多1个像素点防止还原后边界缺失一个像素条
            if (iCoverLeft != 0) {
                this.oWebControl.JS_CuttingPartWindow(0, 0, iCoverLeft, 600);
            }
            if (iCoverTop != 0) {
                this.oWebControl.JS_CuttingPartWindow(0, 0, 1001, iCoverTop);    // 多剪掉一个像素条，防止出现剪掉一部分窗口后出现一个像素条
            }
            if (iCoverRight != 0) {
                this.oWebControl.JS_CuttingPartWindow(1000 - iCoverRight, 0, iCoverRight, 600);
            }
            if (iCoverBottom != 0) {
                this.oWebControl.JS_CuttingPartWindow(0, 600 - iCoverBottom, 1000, iCoverBottom);
            }
        }

    },
    mounted(){
        this.getMonitorList()
        // this.webVideo = new WebVideo()
    }
   
}

</script>

<style>
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
        border-right: 2px solid #053762;
        background: #00213c;
        float: left;
        font-size: 16px;
        color: #fff;
    }
    a {
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
    }
    .menu_img img, .menu_icon img{
        display: block;
        width: 100%;
        height: 100%;
    }
    .p_title.p_title1{
        padding: 8px 15px 8px 30px;
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
        transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
    }
    .down {
        transform: rotate(180deg);
        -webkit-transform: rotate(180deg);
        -o-transform: rotate(180deg);
        -moz-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
    }
    .p_title:hover {
        color: #999;
    }
    .p_item_3{
        padding-left: 60px;
        box-sizing: border-box;
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
        width: 32%;
        height: 36%;
        background: url('../../assets/hotel/M_item_bj.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
        padding: 35px 30px 30px 30px;
        box-sizing: border-box;
        float: left;
        margin-right: 1%;
        margin-bottom: 50px;
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
</style>
