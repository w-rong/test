<template>
    <div class="weather">
        <div class="W_title">
            <!-- <div class="W_title_txt">天气罗盘</div> -->
                <headtop :title='pageTitle'/>
        </div>
        <div class="W_container">
            <div class="W_menuT">
                <div class="W_menuT_sider_bj"></div>
                <div class="W_menuT_content">
                    <div class="W_menuT_item" v-for="(item, index) in scenicList" :key="index"  :class="{ active:index == iconNowIndex}" @click="changeScenic(item, index, iconNowIndex)">
                        <div class="W_menuT_item_txt">{{item | scenicReplace}}</div>
                        <div class="W_menuT_item_rotate"  :class="{ active:index == iconNowIndex}"></div>
                    </div>
                </div>
            </div>
            <div class="W_right">
                <div class="W_right_bj">
                    <div class="W_right_top">
                        <div class="W_scenic_detail">
                            <p class="W_scenic_detail_name">{{scenicName}}</p>
                            <p class="W_scenic_detail_date">{{currDate}} {{currWeak}} {{currNongLi}}</p>
                            <p class="W_scenic_detail_wendu">
                                实况：<span>{{currWeater}}</span>  &nbsp;&nbsp;
                                气温：<span>{{currWDmin}}~{{currWDmax}}°C</span><br/>
                                风：<span>{{windDirectCn}}{{windLevelCn}}</span><br/>
                            </p>
                            <p class="W_scenic_detail_richu"><img src="../../assets/hotel/W_sun_up.png" alt=""> 日出：<span>{{richu}}</span></p> 
                            <p class="W_scenic_detail_riluo"><img src="../../assets/hotel/W_sun_down.png" alt=""> 日落：<span>{{riluo}}</span></p>
                        </div>
                        <div class="W_scenic_weakWeater">
                            <div class="W_scenic_weater_item">
                                <div class="W_scenic_weater_item_img W_sun">
                                    <img  v-if="aWeakLiat1.houres == 'whiteDay'" :src="dayImgList[0]" alt="">
                                    <img  v-else :src="nightImgList[0]" alt="">
                                </div>
                                <div class="W_scenic_weater_item_wendu"><span class="currWendu">{{dryBulTemp}}</span> <span class="currCentigrade">℃</span><span> {{aWeakLiat1.dayWtString}}(实时)</span></div>
                                <div class="W_scenic_weater_item_rander">{{aWeakLiat1.minTemp}}~{{aWeakLiat1.maxTemp}}℃</div>
                                <div class="W_scenic_weater_item_status" v-if="aWeakLiat1.houres == 'whiteDay'">{{aWeakLiat1.dayWtString}}</div>
                                <div class="W_scenic_weater_item_status" v-else>{{aWeakLiat1.nightWtString}}</div>
                                <div class="W_scenic_weater_item_feng" v-if="aWeakLiat1.houres == 'whiteDay'">{{aWeakLiat1.dayWindD}} {{aWeakLiat1.dayWindV}}</div>
                                <div class="W_scenic_weater_item_feng" v-else>{{aWeakLiat1.nightWindD}} {{aWeakLiat1.nightWindV}}</div>
                            </div>
                            <div class="W_scenic_weater_item_more" v-for="(item, index) in aWeakLiat" :key="index">
                                <div class="W_scenic_weater_item_wendu  haveMarg">
                                    <p>{{item.weekDay}}</p>
                                    <p>{{item.dateTime}}</p>
                                </div>
                                <div class="W_scenic_weater_item_img w38">
                                    <img :src="dayImgList[index + 1]" alt="">
                                    <!-- <img  v-else :src="nightImgList[index + 1]" alt=""> -->
                                </div>
                                <div class="W_scenic_weater_item_rander">{{item.minTemp}}~{{item.maxTemp}}℃</div>
                                <div class="W_scenic_weater_item_status" v-if="item.houres == 'whiteDay'">{{item.dayWtString}}</div>
                                <div class="W_scenic_weater_item_status" v-else>{{item.nightWtString}}</div>
                                <div class="W_scenic_weater_item_feng" v-if="item.houres == 'whiteDay'">{{item.dayWindD}}{{item.dayWindV}}</div>
                                <div class="W_scenic_weater_item_feng" v-else>{{item.nightWindD}}{{item.nightWindV}}</div>
                            </div>
                        </div>
                        
                    </div>
                    <div class="W_right_bottom">
                        <div class="W_scenic_bottom_name">逐小时播报</div>
                        <div class="W_scenic_bottom_cont">
                            <div class="W_scenic_bottom_icon">
                                <div class="W_scenic_bottom_icon_item" v-for="(item, index) in weterHour" :key="index" >
                                    <div class="W_scenic_bottom_icon_item_img">
                                        <img :src="item.url" alt="">
                                    </div>
                                    <div class="W_scenic_bottom_icon_item_leave">{{item.windLevelCn}}</div>
                                    <div class="W_scenic_bottom_icon_item_wendu">{{item.t}} <span class="centigrade">℃</span> </div>
                                </div>
                            </div>
                            <div class="W_weater_hover" ref="weater_hoverEc"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
           
    </div>
</template>

<script>
import headtop from '@/components/header/headtop';
export default {
    components: {
        headtop
    },
    filters:{
        scenicReplace(value){
            return value.replace('风景名胜区', '').replace('景区', '').replace('风景旅游区', '')
        }
    },
    data(){
        return{
            currWDmin: '',  //最高温度
            currWDmax: '',   //最低温度
            windLevelCn: '',  //风级
            windDirectCn: '',  //风向
            currWeak: '',    //星期
            currDate: '',  //日期
            currNongLi: '',   //农历
            currWeater: '',     //天气
            dryBulTemp: '',     //当前温度
            richu: '',
            riluo: '',
            pageTitle: '天气罗盘',
            scenicName: '',
            iconNowIndex: 0,
            scenicList: [],  //景区列表
            currDay: null,
            aWeakLiat: [],
            aWeakLiat1: null,
            weaterList: [],
            weterHour:[],
            weaterHourEc: null,
            lon: '',  //经度
            lat: '',  //维度
            dayImgList: [],
            nightImgList: [],

        }
    },
    methods: {
        // 景区列表
        async getScenitList(){
            var res = await this.$http.get(
                `/scenic/findScenicListName`
            )
            let {data, code} = res.data
            this.scenicList = []
            data.forEach(element => {
                this.scenicList.push(element.scenicName)
            });
            this.scenicName = this.scenicList[0]
            
            this.changeScenic(this.scenicName, 0)
        },
        // 实时天气
        async getDetail(){
            var res = await this.$http.get(
                `/base/getPuTuoWeather`
            )
            let {data, code} = res.data
            this.currWDmin = data.data.minTemp
            this.currWDmax = data.data.maxTemp
            this.dryBulTemp = data.data.dryBulTemp
        },
        // 景区实时
        async scenicWeater(){
            var res = await this.$http.get(
                `/base/getScenicWeatherByHour?lat=${this.lat}&lon=${this.lon}`
            )
            let {data} = res.data.data
            this.windDirectCn = data['windDirectCn']
            this.windLevelCn = data['windLevelCn']
            this.currWeater = data['ww']
        },
        // 日出日落
        async getSUN(){
            var res = await this.$http.get(
                `/base/getSunRiseAndOut`
            )
            let {data} = res.data
            this.richu = data.data.sunriseTime
            this.riluo = data.data.sunsetTime
        },
        // 未来七天
        async getAweak(){
            var res = await this.$http.get(
                `/base/getPuTuoWeatherWeek`
            )
            let data = res.data.data.data.list
            this.dayImgList = []   //白天天气图片
            this.nightImgList = []   //晚上天气图片
            if(data.length != 0){
                data.forEach(item=>{
                    var dateDay =  item.dateTime.split(' ')[0].split('-')[1] +'月'+item.dateTime.split(' ')[0].split('-')[2]+'日'
                    var houre =  item.dateTime.split(' ')[1].split(':')[0]
                    item.dateTime = dateDay
                    if(houre >= 8 && houre <= 18){
                         item.houres = 'whiteDay'
                    } else{
                         item.houres = 'blackDay'
                    }
                    
                    switch(item.dayWtString) {
                        case '晴':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/1晴.gif')); break;
                        case '少云':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/2少云.gif')); break;
                        case '多云':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/3多云.gif')); break;
                        case '阴天':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/4阴.gif')); break;
                        case '阴':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/4阴.gif')); break;
                        case '小雨':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/5雨.gif')); break;
                        case '雨':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/5雨.gif')); break;
                        case '中雨':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/6中雨.gif')); break;
                        case '大雨':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/7大雨.gif')); break;
                        case '暴雨':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/8暴雨.gif')); break;
                        case '大暴雨':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/9大暴雨.gif')); break;
                        case '特大暴雨':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/10特大暴雨.gif')); break;
                        case '雷阵雨':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/11雷阵雨.gif')); break;
                        case '浮尘':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/12浮尘.gif')); break;
                        case '扬沙':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/13扬沙.gif')); break;
                        case '雨夹雪':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/14雨夹雪.gif')); break;
                        case '小雪':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/15小雪.gif')); break;
                        case '雪':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/15小雪.gif')); break;
                        case '中雪':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/16中雪.gif')); break;
                        case '大雪':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/17大雪.gif')); break;
                        case '暴雪':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/18暴雪.gif')); break;
                        case '冻雨':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/19冻雨.gif')); break;
                        case '沙尘暴':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/20沙尘暴.gif')); break;
                        case '雷阵雨伴有冰雹':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/21雷阵雨伴有冰雹.gif')); break;
                        case '强沙尘暴':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/22沙尘暴.gif')); break;
                        case '雾':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/23雾.gif')); break;
                        case '阵雪':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/24阵雪.gif')); break;
                        case '阵雨':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/25阵雨.gif')); break;
                        case '小到中雨':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/26小到中雨.gif')); break;
                        case '中到大雨':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/27中到大雨.gif')); break;
                        case '大到暴雨':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/28大到暴雨.gif')); break;
                        case '暴雨到大暴雨':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/29暴雨到大暴雨.gif')); break;
                        case '大暴雨到特大暴雨':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/30大暴雨到特大暴雨.gif')); break;
                        case '小到中雪':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/31小到中雪.gif')); break;
                        case '中到大雪':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/32中到大雪.gif')); break;
                        case '大到暴雪':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/33大到暴雪.gif')); break;
                        case '小雨转中雨':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/26小到中雨.gif')); break;
                        case '中雨转大雨':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/27中到大雨.gif')); break;
                        case '大雨转暴雨':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/28大到暴雨.gif')); break;
                        case '小雪转中雪':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/31小到中雪.gif')); break;
                        case '中雪转大雪':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/32中到大雪.gif')); break;
                        case '大雪转暴雪':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/33大到暴雪.gif')); break;
                        case '霾':
                            this.dayImgList.push(require('../../assets/hotel/dayWhite/53雾霾.gif')); break;
                        
                            // 默认代码块
                    }
                })
            }
            this.aWeakLiat = data.splice(1,7)
            this.aWeakLiat1 = data[0]
        },
        // 逐时
        async getHoures(){
            var res = await this.$http.get(
                `/base/getWeatherByHour?lat=${this.lat}&lon=${this.lon}`
            )
            let {data} = res.data.data
            console.log(res)
            this.weterHour = []
            var hourName = []
            var hourData = []
            if(data.length != 0){
                var currData1 = data
                var data12 = currData1.splice(0,12)
                data12.forEach(item=>{
                    this.weterHour.push(
                        {
                            url: require('../../assets/hotel/W_hour_icon.png'),
                            windLevelCn: item.windLevelCn,
                            t: item.t,
                        }
                    )
                    hourName.push(item.forecastTime.slice(8,10)+':00' )
                    hourData.push(item.t)
                })
                
            }
            console.log(hourName)
            var that = this
            setTimeout(() => {
                
                that.hourEc(hourName, hourData)
            }, 500);
        },
        
        hourEc(hourName, hourData){
            this.weaterHourEc = this.$echarts.init(this.$refs.weater_hoverEc)
            var option = {
                grid: {
                    left: '3%',
                    right: '2%',
                    bottom: '0%',
                    top: '2%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#1d9bca'
                        }
                    },
                    axisLabel:{
                        show: true,
                        textStyle: {
                            color: '#cbeaff',
                        },
                        fontSize: 12,
                        interval: 0,
                    },
                    data: hourName
                },
                yAxis: {
                    type: 'value',
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel:{
                        show: false,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#1d9bca'
                        }
                    },
                },
                series: [{
                    data: hourData,
                    type: 'line',
                    symbol:'emptyCircle',    //设定为实心点
                    symbolSize: 10,
                    itemStyle: {
                        normal:{
                            color: '#1d9bca',
                            itemStyle: { //圆圈样式
                                borderWidth: 2,
                                color:'#7decf5',
                            },
                        }
                    },
                    areaStyle: {
                        color: new this.$echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#1D9BCA'},
                                {offset: 1, color: '#072745'}

                            ]
                        ),
                    }
                }]
            };
            this.weaterHourEc.setOption(option)
            window.addEventListener('resize', this.resizeHandler)
        },
        changeScenic(name, index, b){
            this.iconNowIndex = index
            this.scenicName = name
            if(name == '杉杉普陀天地景区'){this.lon = '122.33512499'; this.lat = '29.98086562'}
            if(name == '沈家门渔港小镇景区'){this.lon = '122.291953'; this.lat = '29.946139'}
            if(name == '舟山桃花岛风景旅游区'){this.lon = '122.2720453'; this.lat = '29.820563'}
            if(name == '普陀白沙岛景区'){this.lon = '122.41739181'; this.lat = '29.92633927'}
            if(name == '普陀山风景名胜区'){this.lon = '122.397608'; this.lat = '30.007976'}
            if(name == '朱家尖景区'){this.lon = '122.41312486'; this.lat = '29.88758923'}
            if(name == '蚂蚁岛'){this.lon = '122.266022'; this.lat = '29.865191'}
            if(name == '干施岱村'){this.lon = '122.282304'; this.lat = '30.014406'}
            if(name == '东沙村'){this.lon = '122.414305'; this.lat = '29.885872'}
            if(name == '东极岛'){this.lon = '122.683739'; this.lat = '30.19453'}
            this.getHoures()
            this.scenicWeater()
        },
        
        // 
        async getWeater(){
            var res = await this.$http.get(
                `/base/listWeatherForJiSu?nowCity=普陀区`
            )
            let {data, code} = res.data
            console.log(data)
            this.currDate = data['日期']
            this.currWeak = data['星期']
            this.currNongLi = data['农历年日期']
            // this.currWeater = data['天气']

            
        },
        resizeHandler(){
            this.weaterHourEc.resize()
        }
    },
    mounted(){
        
        this.getScenitList()   //景区列表
        this.getSUN()   //日出日落
        this.getAweak()   //未来一周
        this.getDetail()    //实时
        this.getWeater()   //
    }
}
Array.prototype.unique = function () {
     var temp = {},
         arr = [],
         len = this.length;
     for (var i = 0; i < len; i++) {
         if (!temp[this[i]]) {
             temp[this[i]] = 'abc';
             arr.push(this[i]);
         }
     }
     return arr;
 }     
</script>

<style>
    .W_scenic_weater_item_wendu.haveMarg{
        margin-top: -25px;
    }
    
    .weather{
        width: 100%;
        height: 100%;
        background: url('../../assets/hotel/F_bg.jpg') no-repeat;
        background-size: 100% 100%;
        font-family: 'PingFang SC';
        overflow: hidden;
    }
    .W_title{
        width: 100%;
        height: 8.61%;
        /* background: url('../../assets/hotel/pass_title.png') no-repeat;
        background-size: 100% 100%; */
        position: relative;
    }
    .W_title_txt{
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
    .W_container{
        width: 100%;
        height: 91.38%;
        box-sizing: border-box;
        position: relative;
    }
    .W_menuT{
        width: 300px;
        height: 100%;
        padding-right: 30px;
        box-sizing: border-box;
        position: relative;
        float: left;
    }
    .W_menuT_sider_bj{
        width: 91px;
        height: 92%;
        background: url('../../assets/hotel/W_side_bj.png') no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
    .W_menuT_content{
        width: 198px;
        height:100%;
        padding-top: 65px;
        box-sizing: border-box;
        margin-left: 75px;
        position: relative;
    }
    @keyframes mapRotateColor {  
        0%{
            -webkit-transform:rotate(0deg);
        }
        100%{
            -webkit-transform:rotate(-360deg);
        }
    }
    .W_menuT_item_rotate{
        width: 62px;
        height: 62px;
        float: left;
        position: absolute;
        left: 9.8px;
        top: 0;
        background: url('../../assets/hotel/default_bg2.png') no-repeat;
        background-size: 100% 100%;
        z-index: 66;
        -webkit-animation: mapRotateColor 3.7s 1s linear infinite;
    }
    .W_menuT_item_rotate.active{
        background: url('../../assets/hotel/big2.png') no-repeat;
        background-size: 100% 100%;
    }
    .W_menuT_item{
        width: 180px;
        height: 62px;
        background: url('../../assets/hotel/weater_icon_d.png') no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
        position: relative;
    }
    .W_menuT_item.active{
        width: 180px;
        height: 62px;
        background: url('../../assets/hotel/weater_icon_a.png') no-repeat;
        background-size: 100% 100%;
    }
    .W_menuT_item_txt{
        line-height: 62px;
        font-size: 15px;
        margin-left: 79px;
        color: #fff;
    }
    .W_right{
        float: right;
        width: calc(100% - 300px);
        height: 100%;
        padding: 1% 7% 2% 1%;
        box-sizing: border-box;
    }
    .W_right_bj{
        width: 100%; 
        height: 100%;
        background: url('../../assets/hotel/W_weater_bj.png') no-repeat;
        background-size: 100% 100%;
        padding: 8% 10%;
        box-sizing: border-box;
        position: relative;
    }
    .W_scenic_detail{
        width: 260px;
        height:250px;
        color: #cbeaff;
        float: left;
    }
    .W_scenic_detail span{
        color: #fbbd52;
    }
    .W_scenic_detail_name, .W_scenic_bottom_name{
        height: 28px;
        font-size: 26px;
        font-weight: bold;
    }
    .W_scenic_detail_date{
        height: 14px;
        margin-top: 18px;
        font-size: 14px;
    }
    .W_scenic_detail_wendu{
        margin-top: 25px;
        font-size: 15px;
        line-height: 28px;
    }
    .W_scenic_detail_richu{
        margin-top: 35px;
        line-height: 34px;
        font-size: 15px;
    }
    .W_scenic_detail_riluo{
        margin-top: 10px;
        line-height: 34px;
        font-size: 15px;
    }
    .W_scenic_detail_richu img, .W_scenic_detail_riluo img{
        width: 35px;
        height: 30px;
        display: inline-block;
        margin-top: 2px;
        vertical-align: middle;
    }
    .W_scenic_weakWeater{
        width: calc(100% - 260px);
        height: 270px;
        float: right;
        display: flex;
        padding-top: 5%;
        box-sizing: border-box;
        margin-top: 9%;
        /* background-color: #fff; */
    }
    .W_scenic_weater_item, .W_scenic_weater_item_more{
        width: 125px;
        text-align: center;
        height: 100%;
        font-size: 14px;
        line-height: 14px;
        font-weight: 500;
        float: left;
        color: #9ebad0;
        border-right: 1px solid rgba(165, 205, 245, 0.5);
    }
    .W_scenic_weater_item_more{
        flex: 1;
    }
    .W_scenic_weater_item_img{
        width: 60px;
        height: 60px;
        margin: 0 auto;
    }
    .W_scenic_weater_item_img.w38{
        width: 38px;
        height:38px;
        margin-top: 21px;
    }
    .W_scenic_weater_item_img img{
        width: 100%;
        height: 100%;
        display: block;
    }
    .W_scenic_weater_item_img.W_sun{
        margin-top: -34.5px;
    }
    .W_scenic_weater_item_wendu{
        height: 50px;
        margin-top: 10px;
        position: relative;
    }
    .W_scenic_weater_item_wendu p{
        height: 27px; 
    }
    .currWendu{
        font-size: 26px;
        font-weight: bold;
        letter-spacing: -1px
    }
    .currCentigrade{
        position: absolute;
        font-size: 14px;
        font-weight: 600;
        top: -14px;
    }
    .W_scenic_weater_item_rander{
        height: 16px;
        margin-top: 18px;
    }
    .W_scenic_weater_item_status{
        height: 16px;
        margin-top: 15px;
    }
    .W_scenic_weater_item_feng{
        height: 16px;
        margin-top: 15px;
    }
    .W_right_top{
        width: 100%;
        height: 60%;
    }
    .W_right_bottom{
        width: 100%;
        height: 40%;
    }
    .W_scenic_bottom_name{
        color: #cbeaff;
        line-height: 27px;
        font-size: 22px;
    }
    .W_scenic_bottom_cont{
        width: 100%; 
        height: calc(100% - 30px);
        padding: 0 29px;
        box-sizing: border-box;
    }
    .W_scenic_bottom_icon{
        width: 100%;
        height: 100px;
        display: flex;
        padding-top: 2%;
        box-sizing: border-box;
    }
    .W_scenic_bottom_icon_item{
        flex: 1;
        height: 100%;
        font-size: 12px;
        color: #cbeaff;
        text-align: center;
    }
    .W_scenic_bottom_icon_item_img{
        width: 23px;
        height: 23px;
        margin: 0 auto;
    }
    .W_scenic_bottom_icon_item_img img{
        display: block;
        width: 100%;
        height: 100%;
    }
    .W_scenic_bottom_icon_item_leave{
        height: 14px;
        margin-top: 5px;
    }
    .W_scenic_bottom_icon_item_wendu{
        height: 13px;
        margin-top: 8px;
        position: relative;
    }
    .W_scenic_bottom_icon_item_wendu .centigrade{
        position: absolute;
        top: -4px;
        font-size: 12px;
    }
    .W_weater_hover{
        width: 100%;
        height: calc(100% - 100px);
    }
    





    @media screen and (min-width: 1700px) {
        .W_right {
            padding: 3% 11% 5% 0%;
            box-sizing: border-box;
        }
        .W_right_bj{
            padding: 4% 10% 6% 10%;
        }
    }
    @media screen and (min-width: 1500px) {
        .W_scenic_weakWeater {
            margin-top: 3%;
        }
    }
    @media screen and (max-width: 1500px) {
        .W_scenic_weakWeater {
            margin-top: 3%;
        }
    }

    @media screen and (max-width: 1400px) {
        .W_scenic_detail{
            width: 230px;
        }
        .W_scenic_weakWeater{
            width: calc(100% - 230px);
        }
        .W_scenic_detail_name{
            font-size: 22px;
        }
        .W_right_bj{
            padding: 3% 10%;
        }
        .W_scenic_detail_richu{
            margin-top: 19px;
        }
        .W_scenic_weakWeater{
            margin-top: 0;
        }
        .W_scenic_detail_wendu, .W_scenic_detail_richu, .W_scenic_detail_riluo{
            font-size: 12px;
        }
        .W_scenic_detail_riluo{
            margin-top: 0;
        }
        .W_scenic_bottom_icon{
            height: 60px;
            padding-top: 3px;
            box-sizing: border-box;
        }
        .W_weater_hover{
            height: calc(100% - 60px);
        }
        .W_scenic_bottom_name{
            font-size: 18px;
        }
        .W_scenic_bottom_icon_item_wendu{
            margin-top: 3px;
        }
        .W_scenic_detail{
            padding-top: 15px;
            box-sizing: border-box;
        }
        .W_scenic_detail_wendu{
            margin-top: 12px;
        }
        .W_scenic_detail_richu{
            margin-top: 10px;
        }
        .W_scenic_weater_item_more, .W_scenic_weater_item{
            font-size: 12px;
        }
        .W_scenic_weakWeater{
            height: 249px;
        }
        .W_right_top{
            height: 57%;
        }
        .W_right_bottom{
            height: 43%;
            padding-bottom: 22px;
            box-sizing: border-box;
        }
        .W_scenic_weater_item_img.W_sun{
            margin-top: -29px;
        }
        .W_scenic_weater_item_wendu.haveMarg{
            margin-top: -19px;
        }
        .W_menuT_content{
            padding-top: 46px;
            box-sizing: border-box;
        }
        .W_menuT_item.active, .W_menuT_item{
            width: 140px;
            height: 47px;
        }
        .W_menuT_item_rotate{
            width: 47px;
            height: 47px;
            left: 8.9px;
        }
        .W_menuT_item_txt{
            margin-left: 54px;
            font-size: 12px;
            line-height: 47px;
        }
    }
</style>