<template>
    <div class="customerValue">
        <div class="CV_title">
            <!-- <div class="W_title_txt">天气罗盘</div> -->
            <headtop :title='pageTitle'/>
            <div class="cv_date">
                <el-date-picker
                    popper-class="down_date"
                    :clearable="false"
                    :editable="false"
                    clear-icon="clearIcon"
                    v-model="monthValue"
                    value-format="yyyy-MM"
                    type="month"
                    @change="choseMonth"
                    placeholder="选择日期">
                </el-date-picker>
                <!-- <div class="total_date1_down"></div> -->
            </div>
        </div>
        <div class="CV_container">
            <div class="CV_top">
                <div class="CV_top_left">
                    <div class="CV_top_left_title">
                        <div class="CV_top_left_title_txt">固定资产分析</div>
                    </div>
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
                    <div class="CV_top_right_title">
                        <div class="CV_top_left_title_txt">手机品牌分布</div>
                    </div>
                    <div class="CV_top_right_cont" ref="chekInHotel"></div>
                </div>
            </div>
            <div class="CV_bottom">
                <div class="CV_bottom_title">
                    <div class="CV_top_left_title_txt">消费能力统计</div>
                </div>
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
                            <div class="CV_car_echart_bottom">{{haveCar}}%</div>
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
import moment from "moment"
export default {
    components: {
        headtop
    },
    data(){
        return {
            pageTitle: '客户价值分析',
            monthValue: moment(new Date(new Date().getTime() )).format('YYYY-MM'),
            haveCar: 0,
            touristEc: null,
            priceEc: null,
            chekInHotelEc: null,
            carEc: null,
        }
    },
    methods: {
        choseMonth(data){
            this.mounthValue = data
            this.grade()
            this.incom()
            this.consumption()
            this.price()
            this.hotel()
            this.car()
        },
        //小区档次
        async grade(){
            var hotelName = []
            var hotelData = []
            var res = await this.$http.get(
                `/customer/findHouseEstateLevel?queryTime=${this.monthValue}`
            )
            let {data} = res.data
            if(data.length != 0){
                data.forEach(element => {
                    hotelName.push(element.valueName)
                    hotelData.push({name:element.valueName, value: element.levelValue})
                });
            }
            this.touristXf(hotelName, hotelData, this.$refs.gradeEchart)
        },
        //收入能力水平
        async incom(){
            var hotelName = []
            var hotelData = []
            var res = await this.$http.get(
                `/customer/findIncomeLevel?queryTime=${this.monthValue}`
            )
            let {data} = res.data
            if(data.length != 0){
                data.forEach(element => {
                    hotelName.push(element.valueName)
                    hotelData.push({name:element.valueName, value: element.levelValue})
                });
            }
            // console.log(res)
            this.touristXf(hotelName, hotelData, this.$refs.incomeEcharts)
        },
        //消费能力水平
        async consumption(){
            var hotelName = []
            var hotelData = []
            var res = await this.$http.get(
                `/customer/findConsumeLevel?queryTime=${this.monthValue}`
            )
            let {data} = res.data
            if(data.length != 0){
                data.forEach(element => {
                    hotelName.push(element.valueName)
                    hotelData.push({name:element.valueName, value: element.levelValue})
                });
            }
            this.touristXf(hotelName, hotelData, this.$refs.consumpEchart)
        },
        //价格分布
        async price(){
            this.priceEc = this.$echarts.init(this.$refs.priceEcharts)
            var dataAxis = [];
            var dataPrice = [];

            var res = await this.$http.get(
                `/customer/findHousePriceDistribute?queryTime=${this.monthValue}`
            )
            let {data} = res.data
            var total = 0
            var sortData = jsonSort(data[0], false)
            if(sortData.legnth != 0){
                sortData.forEach(item=>{
                    total+= Number(item.value)
                })
            }
            var sddss = sortData.sort(compare('value'), false)
            sddss.forEach(element => {
                dataAxis.push(element.name)
                dataPrice.push(((element.value / total)*100).toFixed(2))
            });


            var option = {
                title: {
                    show: dataPrice.length == 0,
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
                        left: '15%',
                        bottom: '17%',
                        right: '15%',
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
                        data: dataPrice
                    }
                ]
            };
            this.priceEc.setOption(option);
            window.addEventListener('resize', this.resizeHandler)
        },
        // 手机
        async hotel(){
            this.chekInHotelEc = this.$echarts.init(this.$refs.chekInHotel)
            var hotelName = []
            var hotelData = []
            var res = await this.$http.get(
                `/customer/findPhoneLabelDistribute?queryTime=${this.monthValue}`
            )
            let {data} = res.data
            if(data.length != 0){
                var total = 0
                data.forEach(item => {
                    total += Number(item.levelValue)
                });
                var top8 = data.sort(compare('levelValue', false)).slice(0,8)
                top8.forEach(item=>{
                    hotelName.push(item.valueName)
                    hotelData.push(((item.levelValue / total)*100).toFixed(2))
                })
            }
            // console.log(res)
            var option = {
                title: {
                    show: hotelName.length == 0,
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
                    data: hotelName,
                    axisLabel: {
                        textStyle: {
                            color: '#C2E2F8',
                            fontSize: 12
                        },
                        
                    interval: 0,
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
                },
                grid: [
                    {
                        top: '25%',
                        left: '15%',
                        bottom: '15%',
                        right: '15%',
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
                        data: hotelData
                    }
                ]
            };

            this.chekInHotelEc.setOption(option)
            window.addEventListener('resize', this.resizeHandler)
        },
        async car(){
            this.carEc = this.$echarts.init(this.$refs.carEchart)
            var touristName = ['有车']
            var touristData = []
            var yMax = 100;
            var dataShadow = [];

             var res = await this.$http.get(
                `/customer/findCarPossessSituation?queryTime=${this.monthValue}`
            )
            let {data} = res.data
            // console.log(res)
            if(data.length != 0){
                var haveCarValue = 0
                yMax = 0

                data.forEach(item=>{
                    if(item.valueName == 'Y' ){
                        touristData[0] = item.levelValue
                        haveCarValue = item.levelValue
                    }
                    yMax += Number(item.levelValue)
                })
                dataShadow[0] = yMax
                this.haveCar = Number(Number(haveCarValue / yMax)*100).toFixed(2)
            } else {
                dataShadow[0] = 100
                this.haveCar = 0

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
                    bottom: '3%',
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
                        barWidth: '60%',
                        data: dataShadow,
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
                        barWidth: '60%',
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
                title: {
                    show: touristName.length == 0,
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
                    formatter: '{b} : {c} '
                },
                legend: {
                    left: 'center',
                    bottom: '5%',
                    show: true,
                    itemWidth: 20,  // 设置宽度
                    itemHeight: 10,
                    textStyle: {
                        color: '#FFFFFF',
                        fontSize: 12
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
                            image: touristName.length==0? '': giftImageUrl,
                            width: 35,
                            height: 35
                        },
                        left: 'center',
                        top: '38%',
                    }]
                },
                series: [
                    {
                        name: '面积模式',
                        type: 'pie',
                        radius: [22, 65],
                        center: ['50%', '45%'],
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
                                length: 8,  
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
function jsonSort(jsonObj, desc) {
    let arr = [];
    for (var key in jsonObj) {
        arr.push({name:key, value: jsonObj[key]})
    }
    var newArr = arr.sort(compare("value",desc))
    return newArr
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

<style Scoped>
    
    .cv_date .el-icon-date:before{
        background: url('../../assets/hotel/date_icon.png') no-repeat;
        background-size: 100% 100%;
        width: 21px;
        height: 21px;
        position: absolute;
        top: 14px;
        left: 0;
        margin-right: 2px;
    }
    .cv_date .el-icon-date:before{
        content: '';
    }
    .cv_date .el-date-editor.el-input{
        width: 130px;
        cursor: pointer;
    } 
    .cv_date .el-date-editor.el-input input{
        background-color: transparent;
        cursor: pointer;
        border: none;
        color: #fff;
    }
    .cv_date .el-input__prefix{
        left: 46px;
    }
    .cv_date{
        /* width: 20%; */
        width: 188px;
        height: 48px;
        position: absolute;
        cursor: pointer;
        top: 0px;
        right: 20px;
        z-index: 999;
    }
    .cv_date input{
        width: 188px;
        height: 48px;
        text-align: center;
        color: #ABCBFF;
        background: url('../../assets/hotel/dateBj.png') no-repeat;
        background-size: 100% 100%;
    }
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
        position: relative;
    }
    .CV_top_left_title_txt{
        width: 100%;
        height: 22px;
        text-align: center;
        position: absolute;
        top: 50%;
        margin-top: -11px;
        font-size: 16px;
        color: #CBEAFF;
        font-weight:bold;
        /* text-shadow:0px 1px 0px rgba(0, 0, 0, 1); */
    }
    .CV_top_left_cont, .CV_top_right_cont{
        width: 100%;
        height: 87.82%;
    }
    .CV_top_right_title{
        background: url('../../assets/hotel/CV_phone.png') no-repeat;
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
        padding-bottom: 13px;
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
        position: relative;
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
        padding-bottom: 13px;
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
        text-align: left;
    }
    .CV_car_echart_ec{
        width: 100%;
        height: 40px;
    }
    .CV_car_echart_bottom{
        text-align: left;
        font-size: 18px;
        color: #05C9D6;
        font-weight: 500;
    }
    @media screen and (max-width: 1400px) {
        .CV_grade_title, .CV_price_title{
            margin-top: 9px;
        }
        .CV_income_title, .CV_xf_title{
            margin-top: 9px;
        }
        .CV_grade_echarts{
            padding-bottom: 5px;
            box-sizing: border-box;
        }
        .CV_income_echart, .CV_xf_echart, .CV_car_echart{
            
            padding-bottom: 5px;
            box-sizing: border-box;
        }
        .CV_income_echart, .CV_xf_echart, .CV_car_echart{
            height: calc(100% - 47px);
        }
        .CV_car_detail{
            margin-top: 5px;
        }
    }
</style>
