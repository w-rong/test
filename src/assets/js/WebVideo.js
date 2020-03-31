
//声明公用变量
var initCount = 0;
var pubKey = '';

// 创建播放实例
function initPlugin () {
    oWebControl = new WebControl({
        szPluginContainer: "playWnd",                       // 指定容器id
        iServicePortStart: 15900,                           // 指定起止端口号，建议使用该值
        iServicePortEnd: 15909,                             
        szClassId:"23BF3B0A-2C56-4D97-9C03-0CB103AA8F11",   // 用于IE10使用ActiveX的clsid
        cbConnectSuccess: function () {                     // 创建WebControl实例成功											
            oWebControl.JS_StartService("window", {         // WebControl实例创建成功后需要启动服务
                dllPath: "./VideoPluginConnect.dll"         // 值"./VideoPluginConnect.dll"写死 
            }).then(function () {                           // 启动插件服务成功
                oWebControl.JS_SetWindowControlCallback({   // 设置消息回调
                    cbIntegrationCallBack: cbIntegrationCallBack
                });
                
                oWebControl.JS_CreateWnd("playWnd", 1000, 600).then(function () { //JS_CreateWnd创建视频播放窗口，宽高可设定
                    init();  // 创建播放实例成功后初始化
                });
            }, function () { // 启动插件服务失败
            });
        },
        cbConnectError: function () { // 创建WebControl实例失败
            oWebControl = null;
            $("#playWnd").html("插件未启动，正在尝试启动，请稍候...");
            WebControl.JS_WakeUp("VideoWebPlugin://"); // 程序未启动时执行error函数，采用wakeup来启动程序
            initCount ++;
            if (initCount < 3) {                             
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
            oWebControl = null;
        }
    });
}

// 设置窗口控制回调
function setCallbacks() {
    oWebControl.JS_SetWindowControlCallback({
        cbIntegrationCallBack: cbIntegrationCallBack
    });
}

// 推送消息
function cbIntegrationCallBack(oData) {
    showCBInfo(JSON.stringify(oData.responseMsg));
}

//初始化
function init()
{
    getPubKey(function () {
        
        ////////////////////////////////// 请自行修改以下变量值	////////////////////////////////////		
        var appkey = "21160258";                           //综合安防管理平台提供的appkey，必填
        var secret = setEncrypt("xfztMxGXnPfYStP4EOKS");   //综合安防管理平台提供的secret，必填
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

        oWebControl.JS_RequestInterface({
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
            oWebControl.JS_Resize(1000, 600);  // 初始化后resize一次，规避firefox下首次显示窗口后插件窗口未与DIV窗口重合问题
        });
    });
}

//获取公钥
function getPubKey (callback) {
    oWebControl.JS_RequestInterface({
        funcName: "getRSAPubKey",
        argument: JSON.stringify({
            keyLength: 1024
        })
    }).then(function (oData) {
        console.log(oData);
        if (oData.responseMsg.data) {
            pubKey = oData.responseMsg.data;
            callback()
        }
    })
}

//RSA加密
function setEncrypt (value) {
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(pubKey);
    return encrypt.encrypt(value);
}


// 设置窗口裁剪，当因滚动条滚动导致窗口需要被遮住的情况下需要JS_CuttingPartWindow部分窗口
function setWndCover() {
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

    oWebControl.JS_RepairPartWindow(0, 0, 1001, 600);    // 多1个像素点防止还原后边界缺失一个像素条
    if (iCoverLeft != 0) {
        oWebControl.JS_CuttingPartWindow(0, 0, iCoverLeft, 600);
    }
    if (iCoverTop != 0) {
        oWebControl.JS_CuttingPartWindow(0, 0, 1001, iCoverTop);    // 多剪掉一个像素条，防止出现剪掉一部分窗口后出现一个像素条
    }
    if (iCoverRight != 0) {
        oWebControl.JS_CuttingPartWindow(1000 - iCoverRight, 0, iCoverRight, 600);
    }
    if (iCoverBottom != 0) {
        oWebControl.JS_CuttingPartWindow(0, 600 - iCoverBottom, 1000, iCoverBottom);
    }
}


export default {
    initPlugin,
    setCallbacks,
    cbIntegrationCallBack,
    init,
    getPubKey,
    setEncrypt,

}
