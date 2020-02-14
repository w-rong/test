<template>
    <div class="customerValue">
        <div class="CV_title">
            <!-- <div class="W_title_txt">天气罗盘</div> -->
                <headtop :title='pageTitle'/>
        </div>
        <div class="CV_container">
            <div class="CV_top">
                <div class="CV_top_left">
                    <div class="CV_top_left_title"></div>
                    <div class="CV_top_left_cont">
                        <div class="CV_grade">
                            <div class="CV_grade_title">
                                <div class="CV_grade_title_txt">小区档次</div>
                            </div>
                            <div class="CV_grade_echarts" ref="gradeEchart"></div>
                        </div>
                        <div class="CV_price">
                            <div class="CV_price_title">
                                <div class="CV_price_title_txt">小区价格分布</div>
                            </div>
                            <div class="CV_price_echarts" ref="priceEcharts"></div>
                        </div>
                    </div>
                </div>
                <div class="CV_top_right">
                    <div class="CV_top_right_title"></div>
                    <div class="CV_top_right_cont" ref="chekInHotel"></div>
                </div>
            </div>
            <div class="CV_bottom">
                <div class="CV_bottom_title"></div>
                <div class="CV_bottom_cont">
                    <div class="CV_bottom_item">
                        <div class="CV_income_title">
                            <div class="CV_price_title_txt">收入能力水平分布</div>
                        </div>
                        <div class="CV_income_echart" ref="incomeEcharts"></div>
                    </div>
                    <div class="CV_bottom_item">
                        <div class="CV_xf_title">
                            <div class="CV_price_title_txt">消费能力水平分布</div>
                        </div>
                        <div class="CV_xf_echart" ref="consumpEchart"></div>
                    </div>
                    <div class="CV_bottom_item">
                        <div class="CV_xf_title">
                            <div class="CV_price_title_txt">车辆拥有情况分析</div>
                        </div>
                        <div class="CV_car_echart">
                            <div class="CV_car_detail">
                                <div class="CV_car_icon"><img src="../../assets/hotel/CV_car.png" alt=""></div>
                                <div class="CV_car_txt">有车占比</div>
                            </div>
                            <div class="CV_car_echart_ec" ref="carEchart"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        
</template>

<script>
import headtop from '@/components/header/headtop';
import bb from '@/assets/xf_scenicbj.json'
export default {
    components: {
        headtop
    },
    data(){
        return {
            pageTitle: '客户价值分析',
            touristEc: null,
            priceEc: null,
            chekInHotelEc: null,
            carEc: null,
        }
    },
    methods: {
        //小区档次
        grade(){
            var hotelName = ['高', '中高', '中等', '中低']
            var hotelData = [
                    {value: 38, name: '高'},
                    {value: 22, name: '中高'},
                    {value: 23, name: '中等'},
                    {value: 17, name: '中低'}
                ]
            this.touristXf(hotelName, hotelData, this.$refs.gradeEchart)
        },
        //收入能力水平
        incom(){
            var hotelName = ['高', '低', '中']
            var hotelData = [
                    {value: 38, name: '高'},
                    {value: 50, name: '低'},
                    {value: 12, name: '中'}
                ]
            this.touristXf(hotelName, hotelData, this.$refs.incomeEcharts)
        },
        //消费能力水平
        consumption(){
            var hotelName = ['高', '低', '中']
            var hotelData = [
                    {value: 28, name: '高'},
                    {value: 50, name: '低'},
                    {value: 22, name: '中'}
                ]
            this.touristXf(hotelName, hotelData, this.$refs.consumpEchart)
        },
        //价格分布
        price(){
            this.priceEc = this.$echarts.init(this.$refs.priceEcharts)
            var dataAxis = ['<5', '5-10', '10-20', '20-30','30-40', '40-50'];
            var data = [22,21,33,23,34,41];
            
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
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: '{b} {c}%'
                },
                xAxis: {
                    name: '(千元)',
                    nameTextStyle: {
                        color: '#C2E2F8',
                        fontSize : 12
                    },
                    type: 'category',
                    data: dataAxis,
                    axisLabel: {
                        textStyle: {
                            color: '#C2E2F8'
                        }
                    },
                    axisTick: {
                        show: true
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#346B85'
                        }
                    },
                    splitLine: {
                        show: false,//网格线
                    },
                    interval: 0,
                    z: 10
                },
                grid: [
                    {
                        top: '15%',
                        left: '5%',
                        bottom: '20%',
                        right: '18%',
                    }
                ],
                yAxis: {
                    type: 'value',
                    name: '占比',
                    nameTextStyle: {
                        color: '#C2E2F8',
                        fontSize : 12
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#346B85'
                        }
                    },
                    axisTick: {
                        show: true
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#C2E2F8'
                        }
                    },
                    splitLine: {
                        show: true,//网格线
                        lineStyle: {
                            color: '#346B85'
                        }
                    },
                },
                dataZoom: [
                    {
                        type: 'inside'
                    }
                ],
                series: [
                    {
                        type: 'bar',
                        barWidth: '40%',
                        itemStyle: {
                            normal:{
                                color: new this.$echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#0D5EA0'},
                                        {offset: 1, color: '#05CBD7'}

                                    ]
                                ),
                                label: {
                                    show: true,
                                    position: 'top',
                                    formatter: "{c}%",
                                    textStyle: {
                                        color: '#C2E2F8',
                                        fontSize: 12   //柱形图每个柱上边的标注
                                    },
                                },
                            },
                            
                        },
                        data: data
                    }
                ]
            };
            this.priceEc.setOption(option);
            window.addEventListener('resize', this.resizeHandler)
        },
        // 酒店入住时间趋势
        hotel(){
            this.chekInHotelEc = this.$echarts.init(this.$refs.chekInHotel)
            var option = {
                grid: [
                    {
                        top: '15%',
                        left: '10%',
                        bottom: '15%',
                        right: '8%',
                    }
                ],
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLabel: {
                        textStyle: {
                            color: '#C2E2F8'
                        }
                    },
                    axisTick: {
                        show: true
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#346B85'
                        }
                    },
                    splitLine: {
                        show: false,//网格线
                    },
                    interval: 0,
                    data: ['12:00', '3:00', '6:00', '9:00', '10:00', '1:00', '2:00']
                },
                yAxis: {
                    // type: 'value',
                    // name: '占比',
                    // nameTextStyle: {
                    //     color: '#C2E2F8',
                    //     fontSize : 12
                    // },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#346B85'
                        }
                    },
                    axisTick: {
                        show: true
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#C2E2F8',
                        }
                    },
                    splitLine: {
                        show: true,//网格线
                        lineStyle: {
                            color: '#346B85'
                        }
                    },
                },
                series: [{
                    symbolSize: 10,
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    areaStyle: {},
                    itemStyle: {
                        normal:{
                            color: new this.$echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#0D5EA0'},
                                    {offset: 1, color: '#05CBD7'}

                                ]
                            ),
                            label: {
                                show: false,
                            },
                        },
                    },
                }]
            };

            this.chekInHotelEc.setOption(option)
            window.addEventListener('resize', this.resizeHandler)
        },
        car(){
            this.carEc = this.$echarts.init(this.$refs.carEchart)
            var touristName = ['青少年期']
            var touristData = [59]
            var yMax = 6000;
            var dataShadow = [];

            for (var i = 0; i < touristData.length; i++) {
                dataShadow.push(yMax);
            }
            var option = {
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: function(data){
                            return data[1].axisValue + data[1].value+'%'
                    }
                },
                grid: {
                    left: '0%',
                    right: '10%',
                    bottom: '15%',
                    top:'0%',
                    containLabel: true
                },
                xAxis : [
                    {
                        axisLine:{      //坐标轴线
                            show: false,
                            lineStyle:{
                                color:'#333333',
                            }
                        },
                        axisLabel: {
                            show: false,
                            textStyle: {
                                color: '#BFE0FF'
                            }
                        },
                        splitLine: {
                            show: false,//去除网格线
                        },
                        axisTick: {       //y轴刻度线
                            show: false
                        },
                    }
                ],
                yAxis : [
                    {
                        show: true,
                        data : touristName,
                        inverse: true,
                        axisLine:{
                            show: false,
                            lineStyle:{
                                color:'#333333',
                            }
                        },
                        axisTick:{
                            lineStyle:{color:'#333333'}    // x轴刻度的颜色
                        },
                        axisLabel: {
                            show: false,
                            textStyle: {
                                fontSize: 12,
                                color: '#BFE0FF',
                            },
                        },
                        axisTick: {       //y轴刻度线
                            show: false
                        },
                    }
                ],
                series : [
                    { // For shadow
                        type: 'bar',
                        itemStyle: {
                            color: 'rgba(0,39,71,1)'
                        },
                        barGap: '-100%',
                        barWidth: '30%',
                        data: [100],
                        animation: false,
                        hoverAnimation: false,
                        label: {
                            show: false,
                            normal:{
                                position: 'inside',
                                textStyle: {
                                    fontSize: 14,
                                    color: "#BFE0FF"
                                },
                                position: 'right'
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: 'none',
                                borderColor: 'rgba(9,200,153,0.2)',
                                borderWidth: 0.6
                            }
                        }
                    },
                    {
                        name:'直接访问',
                        type:'bar',
                        barWidth: '30%',
                        label:{
                            
                            normal:{
                                textStyle: {
                                    fontSize: 14,
                                    color: "#BFE0FF"
                                },
                                position: 'bottom',
                            } 
                        },
                        itemStyle:{
                            normal:{
                                label: {
                                    formatter: "{c}",
                                    show: false,
                                    // position: ["left","bottom"],
                                    left: '0%',
                                    bottom: '0%',
                                    textStyle: {
                                        fontSize: 12,
                                        color: "#BFE0FF"
                                    }
                                },
                                color: new this.$echarts.graphic.LinearGradient(
                                    0, 0, 1, 0,
                                    [
                                        {offset: 0, color: '#0D5EA0'},
                                        {offset: 1, color: '#05CBD7'}

                                    ]
                                ),
                            }
                        },
                        data: touristData
                    }
                ]
            };
            this.carEc.setOption(option)
            window.addEventListener('resize', this.resizeHandler)
        },
        touristXf(touristName, touristData, touristEcharts){
            this.touristEc = this.$echarts.init(touristEcharts )
            var giftImageUrl = bb.bb
            var option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b} : {c} ({d}%)'
                },
                legend: {
                    left: 'center',
                    top: '88%',
                    show: true,
                    itemWidth: 25,  // 设置宽度
                    itemHeight: 10,
                    textStyle: {
                        color: '#FFFFFF',
                        fontSize: 16
                    },
                    data: touristName
                },
                toolbox: {
                    show: false
                },
                graphic: {
                    elements: [{
                        type: 'image',
                        style: {
                            image: giftImageUrl,
                            width: 45,
                            height: 45
                        },
                        left: 'center',
                        top: '31%',
                    }]
                },
                series: [
                    {
                        name: '面积模式',
                        type: 'pie',
                        radius: [27, 83],
                        center: ['50%', '40%'],
                        roseType: 'area',
                        label: {
                            normal: {
                                formatter: '{b|{b}} {a|{d}%}\n',
                                borderWidth: 20,
                                borderRadius: 4,
                                padding: [-10, -60],
                                rich: {
                                    a: {
                                        fontSize: 12,
                                        lineHeight: 12,
                                        color: '#CBEAFF'
                                    },
                                    b: {
                                        fontSize: 12,
                                        lineHeight: 12,
                                        color: '#CBEAFF'
                                    }
                                },
                            }
                        },
                        labelLine:{  
                            normal:{  
                                length: 6,  
                                length2: 60, 
                                lineStyle: {
                                    color: "#28b1c7"  // 改变标示线的颜色
                                } 
                            },
                        },
                        data: touristData,
                        color: ['#FDD100', '#FF4873','#20B3A8','#257FB1']
                    }
                ]
            };
            this.touristEc.setOption(option)
            window.addEventListener('resize', this.resizeHandler)
        },
        resizeHandler(){
            this.touristEc.resize()
            this.priceEc.resize()
            this.chekInHotelEc.resize()
            this.carEc.resize()
        }
    },
    mounted(){
        this.grade()
        this.price()
        this.hotel()
        this.incom()
        this.consumption()
        this.car()
    }
}
</script>

<style>
    .customerValue{
        width: 100%;
        height: 100%;
        background: url('../../assets/hotel/F_bg.jpg') no-repeat;
        background-size: 100% 100%;
        font-family: 'PingFang SC';
        overflow: hidden;
    }
    .CV_title{
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
    .CV_container{
        width: 100%;
        height: 91.38%;
        box-sizing: border-box;
        position: relative;
        padding: 20px;
        box-sizing: border-box;
    }
    .CV_top{
        height: 48.43%;
        width: 100%;
    }
    .CV_top_left{
        height: 100%;
        width: 61.2%;
        float: left;
        background: url('../../assets/hotel/CV_left_bj.png') no-repeat;
        background-size: 100% 100%;
    }
    .CV_top_left_title, .CV_top_right_title{
        width: 100%;
        height: 12.17%;
        background: url('../../assets/hotel/CV_left_title.png') no-repeat;
        background-size: 100% 100%;
    }
    .CV_top_left_cont, .CV_top_right_cont{
        width: 100%;
        height: 87.82%;
    }
    .CV_top_right_title{
        background: url('../../assets/hotel/CV_right_title.png') no-repeat;
        background-size: 100% 100%;
    }
    .CV_top_right{
        width: calc(38.7% - 20px);
        height: 100%;
        margin-left: 20px;
        float: left;
        background: url('../../assets/hotel/CV_right_bj.png') no-repeat;
        background-size: 100% 100%;
    }
    .CV_grade, .CV_price{
        width: 48.47%;
        height: 100%;
        float: left;
    }
    .CV_price{
        width: 51.52%
    }
    .CV_grade_title, .CV_price_title{
        width: 165px;
        height: 38px;
        margin-top: 26px;
        margin-left: 40px;
        background: url('../../assets/hotel/BP_info_title.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
    }
    .CV_price_title{
        margin-left: 0px;
    }
    .CV_grade_title_txt, .CV_price_title_txt{
        width: 100%;
        height: 22px;
        line-height: 22px;
        font-size: 14px;
        text-align: center;
        color: #B2D2E3;
        position: absolute;
        top: 50%;
        margin-top: -11px;
        font-weight:bold;
    }
    .CV_grade_echarts, .CV_price_echarts{
        width: 100%;
        height: calc(100% - 64px);
    }
    .CV_grade_echarts{
        padding-bottom: 30px;
        box-sizing: border-box;
    }
    .CV_bottom{
        height: calc(51.55% - 20px);
        width: 100%;
        margin-top: 20px;
        background: url('../../assets/hotel/CV_bottom_bj.png') no-repeat;
        background-size: 100% 100%;
    }
    .CV_bottom_title{
        width: 100%;
        height: 11.81%;
        background: url('../../assets/hotel/CV_bottom_title.png') no-repeat;
        background-size: 100% 100%;
    }
    .CV_bottom_cont{
        width: 100%;
        height: 88.1%;
        display: flex;
    }
    .CV_bottom_item{
        flex: 1;
        height: 100%;
    }
    .CV_income_title, .CV_xf_title{
        width: 198px;
        height: 38px;
        margin-top: 30px;
        margin-left: 90px;
        background: url('../../assets/hotel/CV_bottom_item.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
    }
    .CV_xf_title{
        margin-left: 0;
    }
    .CV_income_echart, .CV_xf_echart, .CV_car_echart{
        width: 100%;
        height: calc(100% - 70px);
        padding-bottom: 30px;
        box-sizing: border-box;
    }
    .CV_car_icon{
        width: 45px;
        height: 37px;
    }
    .CV_car_icon img{
        width: 100%;
        height: 100%;
        display: inline-block;
    }
    .CV_car_detail{
        width: 100%;
        height: 80px;
        margin-top: 45px;
        padding-left: 5px;
        box-sizing: border-box;
    }
    .CV_car_txt{
        width: 95px;
        height: 20px;
        margin-top: 13px;
        font-size: 20px;
        color: #05C9D6;
        font-weight: 500;
        text-align: center;
    }
    .CV_car_echart_ec{
        width: 100%;
        height: calc(100% - 120px);
    }
</style>
