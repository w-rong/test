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
                        <div class="W_menuT_item_txt">{{item}}</div>
                    </div>
                </div>
            </div>
            <div class="W_right">
                <div class="W_right_bj">
                    <div class="W_right_top">
                        <div class="W_scenic_detail">
                            <p class="W_scenic_detail_name">{{scenicName}}</p>
                            <p class="W_scenic_detail_date">2010年1月8日 周三 农历一月十四</p>
                            <p class="W_scenic_detail_wendu">
                                实况：<span>晴</span>  &nbsp;&nbsp;
                                气温：<span>16.2</span><br/>
                                风：<span>东南偏南风3级</span><br/>
                            </p>
                            <p class="W_scenic_detail_richu"><img src="../../assets/hotel/W_sun_up.png" alt=""> 日出：<span>06：57</span></p>
                            <p class="W_scenic_detail_riluo"><img src="../../assets/hotel/W_sun_down.png" alt=""> 日落：<span>05：22</span></p>
                        </div>
                        <div class="W_scenic_weakWeater">
                            <div class="W_scenic_weater_item">
                                <div class="W_scenic_weater_item_img W_sun">
                                    <img src="../../assets/hotel/W_sun.png" alt="">
                                </div>
                                <div class="W_scenic_weater_item_wendu"><span>0c晴实时</span></div>
                                <div class="W_scenic_weater_item_rander">-6~8</div>
                                <div class="W_scenic_weater_item_status">晴</div>
                                <div class="W_scenic_weater_item_feng">北风4级</div>
                            </div>
                            <div class="W_scenic_weater_item_more" v-for="(item, index) in weaterList" :key="index">
                                <div class="W_scenic_weater_item_wendu  haveMarg">
                                    <p>{{item.name}}</p>
                                    <p>{{item.date}}</p>
                                </div>
                                <div class="W_scenic_weater_item_img w38">
                                    <img :src="item.url" alt="">
                                </div>
                                <div class="W_scenic_weater_item_rander">{{item.rander}}</div>
                                <div class="W_scenic_weater_item_status">{{item.qing}}</div>
                                <div class="W_scenic_weater_item_feng">{{item.feng}}</div>
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
                                    <div class="W_scenic_bottom_icon_item_leave">{{item.leave}}</div>
                                    <div class="W_scenic_bottom_icon_item_wendu">{{item.wendu}}</div>
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
    data(){
        return{
            pageTitle: '天气罗盘',
            iconNowIndex: 0,
            scenicName: '',
            scenicList: ['普陀本岛','朱家尖','普陀山','东极岛','桃花岛','东福山岛','登步岛','白沙岛','虾峙岛'],
            weaterList: [
                {
                    name: '周一',
                    date: '1月8日',
                    url: require('../../assets/hotel/W_leiYu.png'),
                    rander: '-6~8C',
                    qing: '雷雨',
                    feng: '北风4级'
                },
                {
                    name: '周二',
                    date: '1月9日',
                    url: require('../../assets/hotel/W_yin.png'),
                    rander: '-3~8C',
                    qing: '阴',
                    feng: '北风2级'
                },
                {
                    name: '周三',
                    date: '1月10日',
                    url: require('../../assets/hotel/W_yu.png'),
                    rander: '-6~8C',
                    qing: '雨',
                    feng: '北风6级'
                },
                {
                    name: '周四',
                    date: '1月11日',
                    url: require('../../assets/hotel/W_yu.png'),
                    rander: '-6~9C',
                    qing: '雨',
                    feng: '北风4级'
                },
                {
                    name: '周五',
                    date: '1月12日',
                    url: require('../../assets/hotel/W_yu.png'),
                    rander: '-5~8C',
                    qing: '雨',
                    feng: '北风5级'
                },
                {
                    name: '周六',
                    date: '1月13日',
                    url: require('../../assets/hotel/W_yu.png'),
                    rander: '-11~8C',
                    qing: '雨',
                    feng: '北风4级'
                }
            ],
            weterHour:[
                {
                    url: require('../../assets/hotel/W_hour_icon.png'),
                    leave: '2级',
                    wendu: '14.2C'
                },
                {
                    url: require('../../assets/hotel/W_hour_icon.png'),
                    leave: '2级',
                    wendu: '14.2C'
                },
                {
                    url: require('../../assets/hotel/W_hour_icon.png'),
                    leave: '2级',
                    wendu: '14.2C'
                },
                {
                    url: require('../../assets/hotel/W_hour_icon.png'),
                    leave: '2级',
                    wendu: '14.2C'
                },
                {
                    url: require('../../assets/hotel/W_hour_icon.png'),
                    leave: '2级',
                    wendu: '14.2C'
                },
                {
                    url: require('../../assets/hotel/W_hour_icon.png'),
                    leave: '2级',
                    wendu: '14.2C'
                },
                {
                    url: require('../../assets/hotel/W_hour_icon.png'),
                    leave: '2级',
                    wendu: '14.2C'
                },
                {
                    url: require('../../assets/hotel/W_hour_icon.png'),
                    leave: '2级',
                    wendu: '14.2C'
                },
                {
                    url: require('../../assets/hotel/W_hour_icon.png'),
                    leave: '2级',
                    wendu: '14.2C'
                },
                {
                    url: require('../../assets/hotel/W_hour_icon.png'),
                    leave: '2级',
                    wendu: '14.2C'
                },
                {
                    url: require('../../assets/hotel/W_hour_icon.png'),
                    leave: '2级',
                    wendu: '14.2C'
                },
                {
                    url: require('../../assets/hotel/W_hour_icon.png'),
                    leave: '2级',
                    wendu: '14.2C'
                },
            ],
            weaterHourEc: null
        
        }
    },
    methods: {
        hourEc(){
            this.weaterHourEc = this.$echarts.init(this.$refs.weater_hoverEc)
            var hourName = ['01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00']
            var hourData = [820, 932, 901, 934, 1290, 1330, 1320, 254, 365, 754, 652, 145]
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
                                {offset: 0, color: '#00ccec'},
                                {offset: 1, color: '#008bfb'}

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
        },
        resizeHandler(){
            this.weaterHourEc.resize()
        }
    },
    mounted(){
        this.scenicName = this.scenicList[0]
        this.hourEc()
    }
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
        font-family: PingFang SC;
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
        height: 85%;
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
    }
    .W_menuT_item{
        width: 198px;
        height: 68px;
        background: url('../../assets/hotel/W_navDefault_bj.png') no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
    }
    .W_menuT_item.active{
        width: 198px;
        height: 68px;
        background: url('../../assets/hotel/W_navActive_bj.png') no-repeat;
        background-size: 100% 100%;
    }
    .W_menuT_item_txt{
        line-height: 68px;
        font-size: 16px;
        margin-left: 82px;
        color: #fff;
    }
    .W_right{
        float: right;
        width: calc(100% - 300px);
        height: 100%;
        padding: 3% 7% 5% 0%;
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
        font-size: 16px;
        line-height: 28px;
    }
    .W_scenic_detail_richu{
        margin-top: 35px;
        line-height: 34px;
    }
    .W_scenic_detail_riluo{
        margin-top: 10px;
        line-height: 34px;
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
        height: 290px;
        float: right;
        display: flex;
        padding-top: 5%;
        box-sizing: border-box;
        margin-top: 9%;
        /* background-color: #fff; */
    }
    .W_scenic_weater_item, .W_scenic_weater_item_more{
        width: 102px;
        text-align: center;
        height: 100%;
        font-size: 16px;
        line-height: 16px;
        font-weight: 500;
        float: left;
        color: #9ebad0;
        border-right: 1px solid #a5cdf5;
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
    }
    .W_scenic_weater_item_wendu p{
        height: 27px; 
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
        width: 16px;
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
        margin-top: 17px;

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
</style>