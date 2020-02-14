<template>
    <div class="netWork">
        <div class="NW_title">
            <headtop :title='pageTitle'/>
        </div>
        <div class="NW_container">
            <div class="NW_top">
                <div class="NW_top_left NW_item">
                    <div class="NW_item_title">
                        <div class="NW_item_txt">互联网APP指数偏好</div>
                    </div>
                    <div class="NW_echarts" ref="netWorkEcharts"></div>
                </div>
                <div class="NW_top_center NW_item">
                    <div class="NW_item_title">
                        <div class="NW_item_txt">旅游出行APP偏好</div>
                    </div>
                    <div class="NW_echarts">
                        <div class="NW_item_btn">
                            <div v-for="(item,index) in travelBtn" :key="index" 
                             :class="{active: index == travelIndex}" 
                             @click="travelChange(index)">{{item}}</div>
                        </div>
                        <div class="NW_item_echart" ref="travel_app_pianhao"  v-show="travelApp"></div>
                        <div class="NW_item_echart" ref="travel_app_set" v-show="travelSet"></div>
                    </div>
                </div>
                <div class="NW_top_right NW_item">
                    <div class="NW_item_title">
                        <div class="NW_item_txt">导航APP偏好</div>
                    </div>
                    <div class="NW_echarts">
                        <div class="NW_item_btn">
                            <div v-for="(item,index) in travelBtn" :key="index" 
                             :class="{active: index == GPSIndex}" 
                             @click="GPSChange(index)">{{item}}</div>
                        </div>
                        <div class="NW_item_echart" ref="GPS_app_pianhao"  v-show="GPSApp"></div>
                        <div class="NW_item_echart" ref="GPS_app_set" v-show="GPSSet"></div>
                    </div>
                </div>
            </div>
            <div class="NW_bottom">
                <div class="NW_top_left NW_item">
                    <div class="NW_item_title">
                        <div class="NW_item_txt">酒店APP偏好</div>
                    </div>
                    <div class="NW_echarts">
                        <div class="NW_item_btn">
                            <div v-for="(item,index) in travelBtn" :key="index" 
                             :class="{active: index == hotelIndex}" 
                             @click="hotelChange(index)">{{item}}</div>
                        </div>
                        <div class="NW_item_echart" ref="hotel_app_pianhao"  v-show="hotelApp"></div>
                        <div class="NW_item_echart" ref="hotel_app_set" v-show="hotelSet"></div>
                    </div>
                </div>
                <div class="NW_top_center NW_item">
                    <div class="NW_item_title">
                        <div class="NW_item_txt">社交网络APP偏好</div>
                    </div>
                    <div class="NW_echarts" ref="shejiao_echart"></div>
                </div>
                <div class="NW_top_right NW_item">
                    <div class="NW_item_title">
                        <div class="NW_item_txt">视频直播APP偏好</div>
                    </div>
                    <div class="NW_echarts" ref="radio_echarts"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import headtop from '@/components/header/headtop';
import qs from 'qs'
import moment from "moment"
export default {
    components: {
        headtop
    },
    data(){
        return{
            pageTitle: '互联网价值分析',
            mounthValue:  moment(new Date()).format('YYYY-MM'),
            travelBtn: ['APP偏好', 'APP安装分布'],
            travelIndex: 0,
            travelApp: true,
            travelSet: false,
            netWorkEc: null,
            travelAppEc: null,
            AappSetEc: null,
            travelName: [],
            tAppData: [],
            tPreData: [],  
            installName: [],  
            installAppData: [],  //app旅行
            GPSApp: true,
            GPSSet: false,
            GPSIndex: 0,
            GPSName: [],
            GPSAppData: [],
            GPSPreData: [],
            GPSinstallName: [],  
            GPSinstallAppData: [], //app导航
            hotelApp: true,
            hotelSet: false,
            hotelIndex: 0,
            hotelName: [],
            hotelAppData: [],
            hotelPreData: [],
            hotelinstallName: [],  
            hotelinstallAppData: [], //app酒店
            SJlName: [],
            SJLocal: [],
            SJNetWork: [],   //社交
            videoName: [],
            videoLocal: [],
            videoNetWork: [],   //视频直播
        }
    },
    methods: {
        // 互联网app指数偏好
        async netApp(){
            this.netWorkEc = this.$echarts.init(this.$refs.netWorkEcharts)
            this.netWorkEc.showLoading({textColor: '#fff',maskColor: 'rgba(255, 255, 255, 0)'})
            
            var res = await this.$http.get(
                `/internet/findInternetAppIndex?queryTime=2020-01`
            )
            let {data, code} = res.data
            var radarData = []
            var bendiData = []
            var quanguoData = []
            if(data.length != 0){
                var maxValue = Math.max.apply(Math, data.map(function(item) {return item.nationwideValue}))
                data.forEach(element => {
                    radarData.push({text: element.data_name, max: maxValue+100})
                    bendiData.push(element.localValue)
                    quanguoData.push(element.nationwideValue)
                });
                
            }
            if(code == 10000){
                this.netWorkEc.hideLoading()
            } else {
                this.netWorkEc.hideLoading()
            }
            var option = {
                title: {
                    show: data.length == 0,
                    text: '暂无数据' ,
                    x: 'center' ,
                    y: 'center' ,
                    textStyle: {
                        color: '#bcbcbc',
                        fontWeight: 600,
                        fontSize:  16
                    }
                },
                tooltip: {
                    trigger: 'item',
                },
                legend: {
                    orient: 'vertical',
                    left: '60%',
                    top: '8%',
                    itemWidth: 8,  // 设置宽度
                    itemHeight: 8,
                    textStyle: {
                        color: '#B2D2E3'
                    },
                    data: ['某软件', '某主食手机'],
                },
                radar: [
                    {
                        indicator: radarData,
                        radius: 80
                    }
                ],
                series: [
                    {
                        type: 'radar',
                        areaStyle: {},
                        data: [
                            {
                                name: '本地值', 
                                value: bendiData,
                                itemStyle: {
                                    normal: {
                                        color: "#30B9F1",
                                        opacity: 0.8,
                                        
                                    }
                                },
                            },
                            {
                                name: '网络值', 
                                value: quanguoData,
                                itemStyle: {
                                    normal: {
                                        color: "#B7464D",
                                        opacity: 0.8,
                                    }
                                },
                            }
                        ]
                    }
                ]
            };

            this.netWorkEc.setOption(option)
            window.addEventListener('resize', this.resizeHandler)
        },
        // 旅游出行
        travelChange(index){
            this.travelIndex = index
            if(index == 0){
                this.travelApp = true
                this.travelSet = false
                var that = this
                setTimeout(() => {
                    that.travelPrefer()
                }, 600);
            }
            if(index == 1){
                this.travelApp = false
                this.travelSet = true
                var that = this
                 setTimeout(() => {
                    that.travelSetfn()
                }, 600);
            }
        },
        async travel(){
            var res = await this.$http.get(
                `/internet/findTravelPerference?queryTime=2020-01`
            )
            let {data, code} = res.data
            this.travelName = []
            this.tAppData = []
            this.tPreData = []
            this.installName = []
            this.installAppData = []
            for(var key in data){
                if(key == 'perferenceIndex'){
                    if(data[key].length != 0){
                        var toptData = data[key].sort(compare('tgi'), false).slice(0, 8)
                        var sortData = toptData.sort(compare('appValue', true))
                        sortData.forEach(item=>{
                            this.travelName.push(item.appName)
                            this.tAppData.push(item.appValue)
                            this.tPreData.push(item.nationwideValue)
                        })
                    }
                }
                if(key == 'installAttri'){
                    if(data[key].length != 0){
                        var toptData = data[key].sort(compare('appValue'), false)
                        toptData.forEach(item=>{
                            this.installName.push(item.appName)
                            this.installAppData.push(item.appValue)
                        })
                    }
                }
            }
        },
        travelPrefer(){
            this.APPechart(this.travelName, this.tAppData, this.tPreData, this.$refs.travel_app_pianhao)
        },
        travelSetfn(){
            this.appSet(this.installName, this.installAppData,  this.$refs.travel_app_set)
        },
        // GPS
        GPSChange(index){
            this.GPSIndex = index
            if(index == 0){
                this.GPSApp = true
                this.GPSSet = false
                var that = this
                setTimeout(() => {
                    that.GPSPrefer()
                }, 600);
            }
            if(index == 1){
                this.GPSApp = false
                this.GPSSet = true
                var that = this
                 setTimeout(() => {
                    that.GPSSetfn()
                }, 600);
            }
        },
        async getGPS(){
            var res = await this.$http.get(
                `/internet/findTravelMapPerference?queryTime=2020-01`
            )
            let {data, code} = res.data
            this.GPSName = []
            this.GPSAppData = []
            this.GPSPreData = []
            this.GPSinstallName = []
            this.GPSinstallAppData = []
            for(var key in data){
                if(key == 'perferenceIndex'){
                    if(data[key].length != 0){
                        var toptData = data[key].sort(compare('tgi'), false).slice(0, 8)
                        var sortData = toptData.sort(compare('appValue', true))
                        sortData.forEach(item=>{
                            this.GPSName.push(item.appName)
                            this.GPSAppData.push(item.appValue)
                            this.GPSPreData.push(item.nationwideValue)
                        })
                    }
                }
                if(key == 'installAttri'){
                    if(data[key].length != 0){
                        var toptData = data[key].sort(compare('appValue'), false)
                        toptData.forEach(item=>{
                            this.GPSinstallName.push(item.appName)
                            this.GPSinstallAppData.push(item.appValue)
                        })
                    }
                }
            }
        },
        GPSPrefer(){
            this.APPechart(this.GPSName, this.GPSAppData, this.GPSPreData, this.$refs.GPS_app_pianhao)
        },
        GPSSetfn(){
            this.appSet(this.GPSinstallName, this.GPSinstallAppData, this.$refs.GPS_app_set)
        },
        // 酒店
        hotelChange(index){
            this.GPSIndex = index
            if(index == 0){
                this.hotelApp = true
                this.hotelSet = false
                var that = this
                setTimeout(() => {
                    that.hotelPrefer()
                }, 600);
            }
            if(index == 1){
                this.hotelApp = false
                this.hotelSet = true
                var that = this
                 setTimeout(() => {
                    that.hotelSetfn()
                }, 600);
            }
        },
        async gethotel(){
            var res = await this.$http.get(
                `/internet/findTravelHotelPerference?queryTime=2020-01`
            )
            let {data, code} = res.data
            this.hotelName = []
            this.hotelAppData = []
            this.hotelPreData = []
            this.hotelinstallName = []
            this.hotelinstallAppData = []
            for(var key in data){
                if(key == 'perferenceIndex'){
                    if(data[key].length != 0){
                        var toptData = data[key].sort(compare('tgi'), false).slice(0, 8)
                        var sortData = toptData.sort(compare('appValue', true))
                        sortData.forEach(item=>{
                            this.hotelName.push(item.appName)
                            this.hotelAppData.push(item.appValue)
                            this.hotelPreData.push(item.nationwideValue)
                        })
                    }
                }
                if(key == 'installAttri'){
                    if(data[key].length != 0){
                        var toptData = data[key].sort(compare('appValue'), false)
                        toptData.forEach(item=>{
                            this.hotelinstallName.push(item.appName)
                            this.hotelinstallAppData.push(item.appValue)
                        })
                    }
                }
            }
        },
        hotelPrefer(){
            this.APPechart(this.hotelName, this.hotelAppData, this.hotelPreData, this.$refs.hotel_app_pianhao)
        },
        hotelSetfn(){
            this.appSet(this.hotelinstallName, this.hotelinstallAppData, this.$refs.hotel_app_set)
        },
        // 社交网络
        async getShejiao(){
            var res = await this.$http.get(
                `/internet/findSoicalAppPerference?queryTime=2020-01`
            )
            let {data, code} = res.data
            this.SJlName = []
            this.SJLocal = []
            this.SJNetWork = []
            if(data.length != 0){
                var toptData = data.sort(compare('localValue', false)).slice(0, 8)
                var sortData = toptData.sort(compare('localValue', true))
                sortData.forEach(item=>{
                    this.SJlName.push(item.data_name)
                    this.SJLocal.push(item.localValue)
                    this.SJNetWork.push(item.nationwideValue)
                })
            }
            this.APPechart(this.SJlName, this.SJLocal, this.SJNetWork, this.$refs.shejiao_echart)
        },
        // 视频直播
        async getVideo(){
            var res = await this.$http.get(
                `/internet/findLiveVideoPerference?queryTime=2020-01`
            )
            let {data, code} = res.data
            this.videoName = []
            this.videoLocal = []
            this.videoNetWork = []
            // console.log(res)
            if(data.length != 0){
                var toptData = data.sort(compare('localValue', false)).slice(0, 8)
                var sortData = toptData.sort(compare('localValue', true))
                sortData.forEach(item=>{
                    this.videoName.push(item.data_name)
                    this.videoLocal.push(item.localValue)
                    this.videoNetWork.push(item.nationwideValue)
                })
            }
            this.APPechart(this.videoName, this.videoLocal, this.videoNetWork, this.$refs.radio_echarts)
        },


        // app偏好
        APPechart(name, appData, avgData, refData){
            this.travelAppEc = this.$echarts.init(refData)
            var yMax = Math.max(...appData);
            var dataShadow = [];
            for (var i = 0; i < appData.length; i++) {
                dataShadow.push(yMax);
            }
            var option = {
                title:{
                    show: appData.length == 0,//平常时设置为false，隐藏没有数据的文字提示
                    textStyle:{
                        color:'#bcbcbc'
                    },
                    text:'暂无数据',
                    left:'center',
                    top:'center'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter:function(data){
                         return data[0].name+'<br>' + ' APP偏好:' + data[2].value+' <br>'+' 平均水平:'+data[3].value
                    },
                },
                legend: {
                    y: '85%',
                    icon: 'circle',
                    itemWidth: 10,
                    itemHeight: 10,
                    textStyle: {
                        color: '#ABCBFF'
                    },
                },
                grid: {
                    top: '4%',
                    left: '6%',
                    right: '9%',
                    bottom: '18%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'value',
                        axisLine: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            show: true,
                            interval: 0,
                            textStyle: {
                                color: '#ABCBFF',
                                fontSize: 14
                            },
                        },
                    }
                ],
                yAxis: [
                    {
                        type: 'category',
                        data: name,
                        axisLine: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            show: true,
                            interval: 0,
                            textStyle: {
                                color: '#ABCBFF',
                                fontSize: 14
                            },
                        },
                    },
                    {
                        show: true,
                        inverse: false,
                        data: appData,
                        axisLabel: {
                            textStyle: {
                                fontSize: 12,
                                color: '#ABCBFF',
                            },
                        },
                        axisLine: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                    }
                ],
                series: [
                    { 
                        type: 'bar',
                        itemStyle: {
                            color: 'rgba(9, 56, 125, 0.5)'
                        },
                        barGap: '-100%',
                        barWidth: 15,
                        barCategoryGap: '40%',
                        data: dataShadow,
                        animation: false
                    },
                    { 
                        type: 'bar',
                        itemStyle: {
                            color: 'rgba(9, 56, 125, 0.5)'
                        },
                        barWidth: 5,
                        barGap: '-100%',
                        barCategoryGap: '40%',
                        data: dataShadow,
                        animation: false
                    },
                    {
                        name: 'APP偏好',
                        type: 'bar',
                        barWidth: 15,
                        stack: '广告',
                        data: appData,
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 1,0,  [{
                                    offset: 0,
                                    color: '#128AFF'
                                }, {
                                    offset: 1,
                                    color: '#00DDFF'
                                }]),
                            },
                            emphasis: {
                                color: new this.$echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#2378f7'},
                                        {offset: 1, color: '#83bff6'}
                                    ]
                                )
                            }
                        },
                    },
                    {
                        name: '平均水平',
                        type: 'bar',
                        barWidth: 5,
                        stack: '搜索引擎',
                        data: avgData,
                        itemStyle: {
                            normal: {
                                color: '#FAAF1F'
                            },
                            
                        },
                    },
                    
                ],
                color: ['#ff0', '#f00']
            };
            this.travelAppEc.setOption(option)
            // window.addEventListener('resize', this.resizeHandler)
        
        },
        // 安装分布
        appSet(installName, installAppData, refData){
            this.AappSetEc = this.$echarts.init(refData);
            var option = {
                title:{
                    show: installAppData.length == 0,//平常时设置为false，隐藏没有数据的文字提示
                    textStyle:{
                        color:'#bcbcbc'
                    },
                    text:'暂无数据',
                    left:'center',
                    top:'center'
                },
                grid: {
                    top: '12%',
                    left: '9%',
                    right: '16%',
                    bottom: '15%',
                    containLabel: true
                },
                xAxis: {
                    name: '（人）',
                    nameTextStyle: {
                        color: '#ABCBFF',
                        fontSize : 12
                    },
                    type: "category",
                    boundaryGap: false,
                    data: installName,
                    axisLine: {
                        lineStyle: {
                            color: "#83A7E1"
                        }
                    },
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    name: '占比',
                    nameTextStyle: {
                        color: '#ABCBFF',
                        fontSize : 12
                    },
                    type: "value",
                    axisLine: {
                        lineStyle: {
                            color: "#83A7E1"
                        }
                    },
                    splitLine: {
                        show: false
                    }
                },
                series: [
                    {
                        data: installAppData,
                        type: "line",
                        areaStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                { offset: 0, color: "#407FFF" },
                                { offset: 1, color: "#00CCCD" }
                                ]) //改变区域颜色
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: "#275F82", //改变折线点的颜色
                                lineStyle: {
                                    color: "#253A5D" //改变折线颜色
                                }
                            }
                        }
                    }
                ]
            };

            this.AappSetEc.setOption(option);
        },
        resizeHandler(){
            // this.netWorkEc.resize()
            // this.travelAppEc.resize()
        }
    },
    mounted(){
        this.netApp()
        this.travel()
        this.getGPS()
        this.gethotel()
        this.getShejiao()
        this.getVideo()
        this.travelChange(0)
        this.GPSChange(0)
        this.hotelChange(0)
    }
}
function compare(property,desc) {
    return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        if(desc==true){
            // 升序排列
            return value1 - value2;
        }else{
            // 降序排列
            return value2 - value1;
        }
    }
}
</script>

<style>
    .netWork{
        width: 100%;
        height: 100%;
        background: url('../../assets/hotel/F_bg.jpg') no-repeat;
        background-size: 100% 100%;
        font-family: 'PingFang SC';
        overflow: hidden;
    }
    .NW_title{
        width: 100%;
        height: 8.61%;
        position: relative;
    }
    .NW_container{
        width: 100%;
        height: 91.38%;
        padding: 8px 20px 20px 20px;
        box-sizing: border-box;
        position: relative;
    }
    .NW_top{
        height: 47.62%;
        width: 100%;
    }
    .NW_bottom{
        width: 100%;
        height: calc(52.37% - 20px);
        margin-top: 20px;
    }
    .NW_item{
        height: 100%;
        background: url('../../assets/hotel/NW_bg.png') no-repeat;
        background-size: 100% 100%;
        float: left;
    }
    .NW_item_title{
        width: 100%;
        height: 11.74%;
        background: url('../../assets/hotel/NW_title.png') no-repeat;
        background-size: 100% 100%;
        margin-top: 5px;
        position: relative;
    }
    .NW_item_txt{
        width: 100%;
        height: 20px;
        line-height: 20px;
        font-size: 18px;
        text-align: center;
        color: #CBEAFF;
        position: absolute;
        top: 50%;
        margin-top: -11px;
        font-weight:bold;
    }
    .NW_echarts{
        width: 100%;
        height: calc(88.2% - 5px);
        overflow: hidden;
    }
    .NW_top_left{
        width: 32%;
    }
    .NW_top_center{
        width: calc(36% - 40px);
        margin: 0 20px;
    }
    .NW_top_right{
        width: 32%;
    }
    .NW_item_btn{
        width: 220px;
        height: 25px;
        margin-top: 20px;
        float: right;
        z-index: 666;
    }
    .NW_item_btn > div{
        width: 97px;
        height: 22px;
        float: left;
        line-height: 22px;
        font-size: 12px;
        color: #ABCBFF;
        text-align: center;
        background: #042646;
        border:1px solid rgba(26,151,255,1);
        border-radius:11px;
        margin-right: 10px;
        cursor: pointer;
    }
    .NW_item_btn > div.active{
        background:rgba(6,64,110,1);
    }
    .NW_item_echart{
        width: 100%;
        height: calc(100% - 45px);
        margin-top: 45px;
    }
</style>
