<template>
    <div class="vehicle_bg">
        <div class="vehicle_title">
            <headtop :title='pageTitle'/>
            <!-- <div class="vehicle_title_txt">车流量统计</div> -->
            <div class="vehicle_date1_basic">
                <el-date-picker
                    popper-class="down_date"
                    :clearable="false"
                    :editable="false"
                    clear-icon="clearIcon"
                    v-model="mounthValue"
                    value-format="yyyy-MM"
                    type="month"
                    @change="choseMonth"
                    :picker-options="pickerOptions1"
                    placeholder="选择日期">
                </el-date-picker>
                <!-- <div class="total_date1_down"></div> -->
            </div>
        </div>
        <div class="vehicle_container">
            <el-row :gutter="20" class="h100 w100">
                <!-- left -->
                <el-col  :lg="8" :xl="8" class="h100">
                    <div class="grid-content bg-purple h100">
                        <!-- 车流量统计 -->
                        <div class="V_carTotal">
                            <div class="V_carTotal_title">
                                <div class="V_carTotal_title_txt">车流量统计</div>
                            </div>
                            <div class="V_carTotal_container">
                                <div class="V_carTotal_container_top">总车流量686辆，其中兴普大道A<span> 158 </span>辆占比23% ; 兴普大道B<span> 168 </span>占比24%；兴普大道C<span> 358 </span>占比53%。自驾游车辆<span> 200 </span> 辆，占总车流 量的30% </div>
                                <div class="V_carTotal_container_bottom" ref="carTotalEcharts"></div>
                            </div>
                        </div>
                        <!-- 省内车流占比 -->
                        <div class="V_proIntGDP">
                            <div class="V_carTotal_title">
                                <div class="V_carTotal_title_txt">省内车流占比</div>
                            </div>
                            <div class="V_carTotal_container" ref="proInEchart"></div>
                        </div>
                    </div>
                </el-col>
                <!-- center -->
                <el-col  :lg="9" :xl="9" class="h100">
                    <div class="grid-content bg-purple-light h100">
                        <!-- 近7天流量分析 -->
                        <div class="V_seven">
                            <div class="V_carTotal_title">
                                <div class="V_carTotal_title_txt">近7天流量分析</div>
                            </div>
                            <div class="V_carTotal_container">
                                <div class="V_nearAweek">
                                    <div class="V_nearAweekDetail">
                                        <div class="V_nearAweekDetail_l">近7天车流量总辆 <span>{{345}}</span>辆</div>
                                    </div>
                                    <div class="V_nearAweekDetail">
                                        <div class="V_nearAweekDetail_r">最高日流量 <span>{{3454}}</span>辆</div>
                                    </div>
                                </div>
                                <div class="touristTuEc" style="width:100%; height:100%; padding-top:8%; box-sizing:border-box;"  ref="aweakTotal"></div>
                            </div>
                        </div>
                        <!-- 省外车流占比 -->
                        <div class="V_proOut">
                            <div class="V_carTotal_title">
                                <div class="V_carTotal_title_txt">省外车流占比</div>
                            </div>
                            <div class="V_carTotal_container" ref="proOutEchart"></div>
                        </div>
                    </div>
                </el-col>
                <!-- right -->
                <el-col  :lg="7" :xl="7" class="h100">
                    <div class="grid-content bg-purple h100">
                        <!-- 城市车流占比 -->
                        <div class="V_city">
                            <div class="V_city_title">
                                <div class="V_carTotal_title_txt">城市车流占比</div>
                            </div>
                            <div class="V_city_container" ref="cityEcharts"></div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import qs from 'qs'
import moment from "moment"
import headtop from '@/components/header/headtop';
export default {
    components: {
        headtop
    },
    data(){
        return{
            pageTitle: '车流量统计',
            mounthValue:  moment(new Date()).format('YYYY-MM'),
            proInEc: null,
            proOutEc: null,
            cityEc: null,
            aweakEc: null,
            carTotalEc: null,
            pickerOptions1: {
                disabledDate: (time) => {
                    return  time.getTime() > new Date(new Date().getTime()) || time.getTime() < new Date('2019-10-01').getTime();
                }
            }
        }
    },
    methods: {
        choseMonth(data){
            this.mounthValue = data
        },
        carTotal11(){
            this.carTotalEc = this.$echarts.init(this.$refs.carTotalEcharts)
            var option = {
                title: {
                    text: '世界人口总量',
                    subtext: '数据来自网络'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['2011年', '2012年']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
                },
                series: [
                    {
                        name: '2011年',
                        type: 'bar',
                        data: [18203, 23489, 29034, 104970, 131744, 630230],
                        showBackground: true,
                        backgroundStyle: {
                            color: '#ff0'
                        }
                    },
                    {
                        name: '2012年',
                        type: 'bar',
                        barWidth: '20%',
                        data: [19325, 23438, 31000, 121594, 134141, 681807],
                        showBackground: true,
                        backgroundStyle: {
                            color: '#ff0'
                        }
                    }
                ]
            };
            
            this.carTotalEc.setOption(option);
        },
        carTotal(){
            this.carTotalEc = this.$echarts.init(this.$refs.carTotalEcharts)
            var giftImageUrl = "data:image/png;base64,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";
            var carName = ['兴普大道A', '兴普大道B', '兴普大道C']
            var carDate = [
                {
                    name: '兴普大道A',
                    value: 25
                },
                {
                    name: '兴普大道B',
                    value: 28
                },
                {
                    name: '兴普大道C',
                    value: 32
                }
            ]
            var option = {
                title: {
                    show: carDate.length == 0,
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
                    formatter: "{b}: {c} ({d}%)",
                },
                graphic: {
                    elements: [{
                        type: 'image',
                        style: {
                            image: giftImageUrl,
                            width: 100,
                            height: 100
                        },
                        left: 'center',
                        top: 'center',
                    },
                    {
                        type: 'text',
                        left: 'center',
                        top: '40%',
                        style: {
                            text: '总车辆',
                            textAlign: 'center',
                            fill: '#CBEAFF',
                            width: 30,
                            height: 30,
                            fontSize: 14,
                        }
                    },
                    {
                        type: 'text',
                        left: 'center',
                        top: '40%',
                        style: {
                            text: '\n658辆',
                            textAlign: 'center',
                            fill: '#CBEAFF',
                            width: 30,
                            height: 30,
                            fontSize: 22,
                        }
                    }
                    ]
                },
                legend: {
                    orient: 'vertical',
                    x: '76%',
                    // top: '3%',
                    bottom: '30%',
                    itemWidth: 13,  // 设置宽度
                    itemHeight: 13, // 设置高度
                    itemGap: 18,
                    textStyle:{
                        color: '#fff',
                        fontSize: 14
                    },
                    data: carName
                },
                series: [
                    {
                        name: '设备状态',
                        type: 'pie',
                        radius: ['47%', '64%'],
                        center: ['50%', '50%'],
                        color: ['#1783D6', '#F6A61C', '#7FEBF2'],
                        label: {
                            normal: {
                                formatter: ' {b|{b}}\n {a|{d}%}\n',
                                borderWidth: 20,
                                borderRadius: 4,
                                padding: [-10, -40],
                                rich: {
                                    a: {
                                        fontSize: 12,
                                        lineHeight: 8
                                    },
                                    b: {
                                        fontSize: 12,
                                        lineHeight: 30,
                                    }
                                }
                            }
                        },
                        labelLine:{  
                            normal:{  
                                length: 15,  
                                length2: 45,  
                            },
                        },
                        itemStyle: {
                            borderWidth: 1,
                            borderColor: '#032545'
                        },
                        data: carDate
                    }
                ]
            };
            this.carTotalEc.setOption(option);
            window.addEventListener('resize', this.resizeHandler)
        },
        proIn(){
            this.proInEc = this.$echarts.init(this.$refs.proInEchart)
            var dataAxis = ['舟山', '嘉兴', '丽水', '温州','绍兴', '苏州', '湖州', '金华', ];
            var data = [44,43,41,34,33,30,21,20];
            // var data = [20,21,30,33,34,41,43,44];
            
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
                    type: 'category',
                    data: dataAxis,
                    axisLabel: {
                        textStyle: {
                            color: '#C2E2F8'
                        }
                    },
                    axisTick: {
                        show: false
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
                        left: '10%',
                        bottom: '15%',
                        right: '5%',
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
                        show: false
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
                                        color: '#0CE3DC',
                                        fontSize: 12   //柱形图每个柱上边的标注
                                    },
                                },
                            },
                            
                        },
                        data: data
                    }
                ]
            };
            this.proInEc.setOption(option);
            window.addEventListener('resize', this.resizeHandler)
        },
        proOut(){
            this.proOutEc = this.$echarts.init(this.$refs.proOutEchart)
            var dataAxis = ['舟山', '嘉兴', '丽水', '温州','绍兴', '苏州', '湖州', '金华'];
            var data =  [44,43,41,34,33,30,21,20];
            
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
                    type: 'category',
                    data: dataAxis,
                    axisLabel: {
                        textStyle: {
                            color: '#C2E2F8'
                        }
                    },
                    axisTick: {
                        show: false
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
                        left: '10%',
                        bottom: '15%',
                        right: '5%',
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
                        show: false
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
                                        color: '#0CE3DC',
                                        fontSize: 12   //柱形图每个柱上边的标注
                                    },
                                },
                            },
                            
                        },
                        data: data
                    }
                ]
            };
            this.proOutEc.setOption(option);
            window.addEventListener('resize', this.resizeHandler)
        },
        cityCarGDP(){
            this.cityEc = this.$echarts.init(this.$refs.cityEcharts)
            var touristName = ['杭州市','湖州市','南京市','嘉兴市','北京市','杭州市', '丽水市', '宁波市', '临安市', '广州市']
            var touristData = [56, 30,28, 22, 21, 20, 18, 15,11, 9]
            // var touristData = [6, 15,23, 25, 43, 47, 51, 50,58, 59]
            var yMax = 100;
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
                    left: '10%',
                    right: '10%',
                    bottom: '15%',
                    top:'5%',
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
                        },
                        axisTick: {       //y轴刻度线
                            show: false
                        },
                    },
                    {
                        show: true,
                        inverse: true,
                        data: touristData,
                        axisLabel: {
                            formatter: function(data){
                                    return data+'%'
                                },
                            textStyle: {
                                fontSize: 12,
                                color: '#0CE3DC',
                            },
                        },
                        formatter: '{c}%',
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
                series : [
                    { // For shadow
                        type: 'bar',
                        itemStyle: {
                            color: 'rgba(0,39,71,1)'
                        },
                        barGap: '-100%',
                        barWidth: '29%',
                        data: dataShadow,
                        animation: false,
                        hoverAnimation: false,
                        label: {
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
                        barWidth: '27%',
                        label:{
                            normal:{
                                textStyle: {
                                    fontSize: 14,
                                    color: "#BFE0FF"
                                },
                                position: [5, -16],
                            } 
                        },
                        itemStyle:{
                            normal:{
                                label: {
                                    formatter: "{b}",
                                    show: true,
                                    position: "top",
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
            this.cityEc.setOption(option);
            window.addEventListener('resize', this.resizeHandler)
        },
        nearWeak(){
            this.aweakEc = this.$echarts.init(this.$refs.aweakTotal)
            var Xdate = ['12/12', '12/13', '12/14', '12/15', '12/16', '12/17', '12/18']
            var series1 = [ 233,455,45,45,242,21,2]
            var series2 = [45,454,451,214,545,456,56]
            var series3 = [95,235,364,15,254,325,122]
            var option = {
                tooltip: [
                    {
                        trigger: 'axis',
                        type: 'showTip',
                        // formatter: function(data){
                        //     data.forEach(element => {
                        //         console.log(element.seriesName)
                        //         return  'element.seriesName + element.value'
                        //     });
                        // }
                    }
                ],
                legend: {
                    data: ['兴普大道01', '兴普大道02', '兴普大道03'],
                    textStyle: {
                        color: '#B2D2E3'
                    },
                    y: '85%'
                },
                grid: {
                    left: '3%',
                    right: '8%',
                    bottom: '20%',
                    top: '10%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: Xdate,
                    axisLabel:{
                        show: true,
                        textStyle: {
                            color: '#B2D2E3',
                        },
                        fontSize: 12,
                        interval: 0,
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: 'rgba(178, 210, 227, 0.5)'
                        }
                    },
                },
                yAxis: {
                    type: 'value',
                    axisLabel:{
                        show: true,
                        textStyle: {
                            color: '#B2D2E3',
                        },
                        fontSize: 12,
                        interval: 0,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(178, 210, 227, 0.5)'
                        }
                    },
                    splitLine: {
                        show: true,//网格线
                        lineStyle:{
                            color: ['rgba(178, 210, 227, 0.5)'],  //网格线颜色
                            width: 1,
                            type: 'solid'
                        }
                    },
                },
                series: [
                    {
                        name:'兴普大道01',
                        data: series1,
                        type: 'line',
                        smooth: true,
                        itemStyle : {
                            normal : {
                                lineStyle:{
                                    width:3,//折线宽度
                                }
                            }
                        },
                    },
                    {
                        name:'兴普大道02',
                        data: series2,
                        type: 'line',
                        smooth: true,
                        itemStyle : {
                            normal : {
                                lineStyle:{
                                    width:3,//折线宽度
                                }
                            }
                        },
                    },
                    {
                        name:'兴普大道03',
                        data: series3,
                        type: 'line',
                        smooth: true,
                        itemStyle : {
                            normal : {
                                lineStyle:{
                                    width:3,//折线宽度
                                }
                            }
                        },
                    },
                ],
                color: ['#00D98B', '#F45E23', '#228FFE']
            };
            this.aweakEc.setOption(option)
            window.addEventListener('resize', this.resizeHandler)
        },
        resizeHandler(){
            this.proInEc.resize()
            this.proOutEc.resize()
            this.cityEc.resize()
            this.aweakEc.resize()
            this.carTotalEc.resize()
        }
    },
    mounted(){
        this.proIn()
        this.proOut()
        this.cityCarGDP()
        this.nearWeak()
        this.carTotal()
    }
}
</script>

<style Scoped>
    .vehicle_date1_basic .el-input--prefix .el-input__inner{
        background-color: transparent;
        color: #ABCBFF;
    }
    .vehicle_date1_basic .el-icon-date:before{
        background: url('../../assets/hotel/date_icon.png') no-repeat;
        background-size: 100% 100%;
        width: 21px;
        height: 21px;
        position: absolute;
        top: 14px;
        left: 0;
        margin-right: 2px;
    }
    .vehicle_date1_basic .el-icon-date:before{
        content: '';
    }
    .el-picker-panel.down_date{
        background-color: #072342;
    }
    .el-picker-panel.down_date .el-date-picker__header-label{
        color: #ABCBFF;
    }
    .el-picker-panel.down_date .el-picker-panel__icon-btn{
        color: #ABCBFF;
    }
    
    .el-picker-panel.down_date .el-month-table td .cell{
        color: #ABCBFF;
    }
    .vehicle_date1_basic .el-date-editor.el-input{
        width: 130px;
        cursor: pointer;
    } 
    .vehicle_date1_basic .el-date-editor.el-input input{
        background-color: transparent;
        cursor: pointer;
        border: none;
        color: #ABCBFF;
    }
    .vehicle_date1_basic .el-input__prefix{
        left: 46px;
    }
    .el-row{
        width: 100%;
    }
    .w100{
        width: 100%;
    }
    .h100{
        height: 100%;
    }
    .vehicle_date1_basic{
        /* width: 20%; */
        width: 188px;
        height: 48px;
        position: absolute;
        cursor: pointer;
        top: 0px;
        right: 20px;
        z-index: 999;
    }
    .vehicle_date1_basic input{
        width: 188px;
        height: 48px;
        text-align: center;
        color: #ABCBFF;
        background: url('../../assets/hotel/dateBj.png') no-repeat;
        background-size: 100% 100%;
    }
    .vehicle_bg{
        width: 100%;
        height: 100%;
        background: url('../../assets/hotel/F_bg.jpg') no-repeat;
        background-size: 100% 100%;
        font-family: 'PingFang SC';
    }
    .vehicle_title{
        width: 100%;
        height: 8.61%;
        /* background: url('../../assets/hotel/pass_title.png') no-repeat;
        background-size: 100% 100%; */
        position: relative;
    }
    .vehicle_title_txt{
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
    .vehicle_container{
        width: 100%;
        height: 91.38%;
        padding: 1% 0% 1% 1%;
        box-sizing: border-box;
    }
    .V_carTotal, .V_proIntGDP{
        width: 100%;
        height: 49.5%;
        background: url('../../assets/hotel/V_car_bj.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
    }
    .V_carTotal_title, .V_city_title{
        width: 100%;
        height: 11.85%;
        background: url('../../assets/hotel/F_l1_title.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
    }
    .V_carTotal_title_txt{
        width: 100%;
        height: 22px;
        text-align: center;
        position: absolute;
        top: 50%;
        margin-top: -11px;
        font-size: 16px;
        color: #CBEAFF;
        font-weight:bold;
        text-shadow:0px 1px 0px rgba(0, 0, 0, 1);
    }
    .V_carTotal_container{
        height: 88%;
        width: 100%;
        padding: 4%;
        box-sizing: border-box;
        position: relative;
    }
    .V_carTotal_container_top{
        width: 100%;
        height: 27.5%;
        color: #B2D2E3;
        font-size: 14px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:34px;
    }
    .V_carTotal_container_top span{
        font-size: 20px;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(12,227,220,1);
    }
    .V_carTotal_container_bottom{
        width: 100%;
        height: 72.3%;
    }
    /* 省外占比 */
    .V_proIntGDP{
        height:  calc(50.5% - 20px);
        margin-top: 20px;
        background: url('../../assets/hotel/V_proOut_bj.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
    }
    /* 近7天分析 */
    .V_seven{
        width: 100%;
        height: 49.5%;
        background: url('../../assets/hotel/V_c1_bj.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
    }
    .V_proOut{
        width: 100%;
        height: calc(50.5% - 20px);
        margin-top: 20px;
        background: url('../../assets/hotel/V_c2_bj.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
    }
    .V_nearAweek{
        width: 100%;
        height: 20%;
        position: absolute;
        /* top: 2%; */
        display: flex;
        padding: 0 1%;
        box-sizing: border-box;
    }
    .V_nearAweekDetail{
        flex: 1;
        height: 100%;
        color: #B2D2E3;
        font-size: 16px;
        text-align: center;
        font-family:PingFang SC;
        font-weight:500;
        position: relative;
    }
    .V_nearAweekDetail_l, .V_nearAweekDetail_r{
        width: 100%;
        height: 20px;
        line-height: 25px;
        position: absolute;
        top: 50%;
        margin-top: -10px;
    }
    .V_nearAweekDetail span{
        color: #0CE3DC;
        font-size: 20px;
        font-family:PingFang SC;
        font-weight:bold;
    }
    /* 城市占比 */
    .V_city{
        width: 100%;
        height: 100%;
        background: url('../../assets/hotel/V_right_bj.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
    }
    .V_city_title{
        height: 5.71%;
    }
    .V_city_container{
        height: 88%;
        width: 100%;
    }
    @media screen and (max-width: 1400px) {
        .V_carTotal_container_top{
            font-size: 13px;
            line-height: 23px;
        }
    }
    </style>