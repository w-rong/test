<template>
    <div class="touristXF">
        <div class="XF_title">
            <headtop :title='pageTitle'/>
            <!-- <div class="XF_title_txt">旅游消费分析</div> -->
        </div>
        <div class="XF_container">
            <div class="XF_date">
                <div class="XF_date1">
                    <el-date-picker
                        popper-class="down_date"
                        :clearable="false"
                        clear-icon="clearIcon"
                        v-model="beginValue"
                        @change="beginChange"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                    <div class="XF_date1_down"></div>
                </div>
                <div class="XF_date2">
                    <el-date-picker
                        popper-class="down_date"
                        :clearable="false"
                        clear-icon="clearIcon"
                        v-model="endValue"
                        ref="focesInput"
                        @change="endChange"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                    <div class="XF_date1_down"></div>
                </div>
            </div>
            <div class="XF_container_top">
                <!-- 游客画像 -->
                <div class="XF_container_left">
                    <div class="XF_portrait_title">
                        <div class="XF_portrait_title_txt">游客消费画像</div>
                    </div>
                    <div class="XF_portrait_container">
                        <div class="XF_portrait">
                            <div class="XF_portraitkDetail">
                                一周旅游总人数 <span>{{allTourist}}</span>人&nbsp;&nbsp;&nbsp;&nbsp;
                                平均年龄 <span>{{avgTourist}}</span>岁
                            </div>
                        </div>
                        <div class="portraitEc">
                            <div class="XF_portrait_top">
                                <div class="XF_portrait_gender">
                                    <div class="XF_portrait_gender_nan">
                                        <div class="XF_portrait_gender_nan_img"><img src="../../assets/hotel/man.png" alt=""></div>
                                        <div class="XF_portrait_gender_nan_txt">{{Number(male).toFixed(2)}}%</div>
                                    </div>
                                    <div class="XF_portrait_gender_ec" ref="genderEcharts"></div>
                                    <div class="XF_portrait_gender_nv">
                                        <div class="XF_portrait_gender_nan_img"><img src="../../assets/hotel/woman.png" alt=""></div>
                                        <div class="XF_portrait_gender_nv_txt">{{Number(female).toFixed(2)}}%</div>
                                    </div>
                                </div>
                                <div class="XF_portrait_age" ref="ageEcharts">c</div>
                            </div>
                            <div class="XF_portrait_bottom">
                                <div class="XF_portrait_bottom_ec" ref="XF_portrait_bottom_ec1"></div>
                                <div class="XF_portrait_bottom_ec" ref="XF_portrait_bottom_ec2"></div>
                                <div class="XF_portrait_bottom_ec" ref="XF_portrait_bottom_ec3"></div>
                                <div class="XF_portrait_bottom_ec" ref="XF_portrait_bottom_ec4"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--游客消费分析  -->
                <div class="XF_container_center">
                    <div class="XF_portrait_title">
                        <div class="XF_portrait_title_txt">游客消费分析</div>
                    </div>
                    <div class="XF_analysis_container">
                        <div class="XF_nearAweek">
                            <div class="XF_nearAweekDetail">
                                旅游总消费 <span>{{Number(totalXF).toFixed(2)}}</span>元&nbsp;&nbsp;&nbsp;&nbsp;
                                人均消费 <span>{{Number(avgXF).toFixed(2)}}</span>元
                            </div>
                        </div>
                        <div class="touristTuEc"  ref="aweakTotal"></div>
                    </div>
                </div>
                <!--游客常驻占比 -->
                <div class="XF_container_right">
                    <div class="XF_portrait_title">
                        <div class="XF_portrait_title_txt">游客常住地占比</div>
                    </div>
                    <div class="XF_city_container">
                        <div class="XF_city_tab">
                            <div class="XF_btn_detail XF_detail_w50">
                                <li :class="{active:index===cityIndex1}" v-for="(item,index) in cityTab" :key="index" @click.stop="toggleCityTab1(index)">
                                    <div>{{item}}</div>    
                                </li>  
                            </div>
                        </div>
                        <div class="XF_city_echart" ref="cityEchart"></div>
                    </div>
                </div>
            </div>
            <div class="XF_container_bottom">
                <div class="tourist_total_title"></div>
                <div class="tourist_total_container">
                    <div class="tourist_total_1">
                        <div class="tourist_total_1_title">景点消费分析</div>
                        <div class="tourist_total_1_detial">
                            景点人均消费 <span>{{Number(scenicAvg).toFixed(2)}}</span>元&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            较上个周期增长<span>1%</span>
                        </div>
                        <div class="tourist_total_1_echart" ref="touristEcharts1"></div>
                    </div>
                    <div class="tourist_total_2">
                        <div class="tourist_total_1_title">餐馆消费分析</div>
                        <div class="tourist_total_1_detial">
                            人均消费 <span>{{Number(cateringAvg).toFixed(2)}}</span>元&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            较上个周期增长<span>1%</span>
                        </div>
                        <div class="tourist_total_1_echart" ref="touristEcharts2"></div>
                    </div>
                    <div class="tourist_total_3">
                        <div class="tourist_total_1_title">酒店消费分析</div>
                        <div class="tourist_total_1_detial">
                            人均消费 <span>{{Number(hotelAvg).toFixed(2)}}</span>元&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            较上个周期增长<span>2%</span>
                        </div>
                        <div class="tourist_total_1_echart" ref="touristEcharts3"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import headtop from '@/components/header/headtop';
import aa from '@/assets/xf_bj.json'
import bb from '@/assets/xf_scenicbj.json'
import qs from 'qs'
import moment from "moment"
export default {
    components: {
        headtop
    },
    data(){
        return {
            female: 0,
            male: 0,
            totalXF: 0,
            avgXF: 0,
            allTourist: 0,
            avgTourist: 0,
            cateringAvg: 0,
            hotelAvg: 0,
            scenicAvg: 0,
            pageTitle: '旅游消费分析',
            beginValue: moment(new Date(new Date().getTime() - 7 * 24 * 3600 * 1000)).format('YYYY-MM-DD'),
            endValue: moment(new Date(new Date().getTime() - 1 * 24 * 3600 * 1000)).format('YYYY-MM-DD'),
            cityIndex1: 0,
            cityTab: ['城市', '省份'],
            aweakEc: null,
            cityEc: null,
            touristEc: null,
            portraitEc: null,
            ageEc: null,
            genderEc: null,
            cityName: [],
            cityData: [],
            proName: [],
            proData: [],
            portraitName: [],
            portraitData: [],
            hotelName: [],
            hotelData: [],
            cateringName: [],
            cateringData: [],
            scenicName: [],
            scenicData: [],
        }
    },
    methods: {
        // 游客画像
        async getPortrait(){
            var res = await this.$http.post(
                `/analysis/findTouristConsumePortrait`,
                qs.stringify({
                    endDate: this.endValue,
                    startDate: this.beginValue
                })
            )
            let {data, code} = res.data
            // age
            let ageInfo = []
            let portraitName = []
            let portraitData = []
            for(var key in data){
                if(key == 'age2025'){ageInfo.push({name: '20-25岁', id: '1', value: data[key]})}
                if(key == 'age2530'){ageInfo.push({name: '25-30岁', id: '2', value: data[key]})}
                if(key == 'age3035'){ageInfo.push({name: '30-35岁', id: '3', value: data[key]})}
                if(key == 'age3540'){ageInfo.push({name: '35-40岁', id: '4', value: data[key]})}
                if(key == 'age40'){ageInfo.push({name: '40岁以上', id: '5', value: data[key]})}
                // gender /cf
                if(key == 'female'){this.female = Number(data[key])*100}
                if(key == 'male'){this.male = Number(data[key])*100}
                if(key == 'allTourist'){this.allTourist = data[key]}
                if(key == 'avgTourist'){this.avgTourist = data[key]}
            
            }
            var sortData = ageInfo.sort(compare("id",true))
            sortData.forEach((item)=>{
                portraitName.push(item.name)
                portraitData.push({name: item.name, value: Math.round(item.value * 10000) / 100})
            })
            this.portraitAge(portraitName, portraitData)
            this.gender()
        },
        // 游客消费
        gender(){
            this.genderEc = this.$echarts.init(this.$refs.genderEcharts)
            var option = {
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        center: ['50%', '50%'],
                        radius: ['60%', '75%'],
                        avoidLabelOverlap: false,
                        hoverAnimation: false, //鼠标移入变大
                        label:{
                            show: false
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [
                            {value: this.female, name: '女', itemStyle: {normal: {color: '#f087d1'}}},
                            {value: 100 - Number(this.female), name: '男', itemStyle: {normal: {color: '#10b7ff'}}}
                        ],
                    }
                ]
            };
            this.genderEc.setOption(option)
            let myChart =this.genderEc;//解决echarts中this指向问题
            myChart.dispatchAction({
                type: 'highlight',
                name: '女'
            });
            window.addEventListener('resize', this.resizeHandler)
        },
        portraitAge(portraitName, portraitData){
            this.ageEc = this.$echarts.init(this.$refs.ageEcharts)
            
            var option = {
                title: {
                    show: portraitData.length == 0,
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
                    formatter: '{b}: {c}'
                },
                legend: {
                    orient: 'vertical',
                    left: '50%',
                    top: '5%',
                    icon: "circle",
                    itemWidth: 7,  // 设置宽度
                    itemHeight: 7, // 设置高度
                    itemGap: 6,
                    textStyle: {
                        color: '#B2D2E3'
                    },
                    data: portraitName,
                    formatter: function(params) {
                        var legendIndex = 0;
                        portraitData.forEach(function (v, i) {
                            if (v.name == params) {
                                legendIndex = i;
                            }
                        });
                        return params + ":" + portraitData[legendIndex].value +'%';
                    }
                },
                color: ['#02d7cb','#f5c70f','#fa9837','#ae52ff','#4fdb5b',],
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        center: ['30%', '50%'],
                        radius: ['50%', '60%'],
                        avoidLabelOverlap: false,
                        hoverAnimation: false, //鼠标移入变大
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: portraitData,
                    },
                     {
                        name: '外边框',
                        type: 'pie',
                        hoverAnimation: false, //鼠标移入变大
                        center: ['30%', '50%'],
                        radius: ['68%', '70%'],
                        label: {
                            normal: {
                                show: false,
                            }
                        },
                        data: portraitData,
                    },
                ]
            };
            this.ageEc.setOption(option)
            window.addEventListener('resize', this.resizeHandler)
        },
        // 游客身份
        async getIdentity(){
            var res = await this.$http.get(
                `/analysis/findTouristConsumePortraitMarriedInfo?endDate=${this.endValue}&startDate=${this.beginValue}`,
            )
            let {data, code} = res.data
            let married = 0
            let withChild = 0
            let tourismDr = 0
            for(var key in data){
                if(key == 'married'){married = Number(Number(data[key])*100).toFixed(2)}
                if(key == 'hasChild'){withChild = Number(Number(data[key])*100).toFixed(2)}
                if(key == 'tourismDr'){tourismDr = Number(Number(data[key])*100).toFixed(2)}
            }
            this.marriage(married)
            this.child(withChild)
            this.travelPerson(tourismDr)
        },
        marriage(data){
            var marriageEchat = this.$refs.XF_portrait_bottom_ec1
            this.portraitBottom(data, marriageEchat, '已婚')
        },
        child(data){
            var marriageEchat = this.$refs.XF_portrait_bottom_ec2
            this.portraitBottom(data, marriageEchat, '携子')
        },
        travelPerson(data){
            var marriageEchat = this.$refs.XF_portrait_bottom_ec3
            this.portraitBottom(data, marriageEchat, '旅游达人')
        },
        async reTravel(){
             var res = await this.$http.post(
                `/tourist/findPortraitRevisit`,
                qs.stringify({
                    queryTime: '2020-01-20',
                    startDate: '2020-01-13'
                })
            )
            let {data, code} = res.data
            // console.log(res)
            var reData = Number(Number(data.revisitRatio)*100).toFixed(2)
            var marriageEchat = this.$refs.XF_portrait_bottom_ec4
            this.portraitBottom(reData, marriageEchat, '重游率')
        },
        portraitBottom(passData, refEchart, name){
            this.portraitEc = this.$echarts.init(refEchart)
            var giftImageUrl = aa.aa;
            var option = {
                title:{
                    show:true,//平常时设置为false，隐藏没有数据的文字提示
                    textStyle:{
                        color:'#bcbcbc',
                        fontSize: 14
                    },
                    text: name,
                    left:'center',
                    top:'78%'
                },
                grid: [
                    {
                        top: '0%',
                        left: '10%',
                        right: '10%',
                        bottom: '30%'
                    }
                ],
                graphic: {
                    elements: [{
                        type: 'image',
                        style: {
                            image: giftImageUrl,
                            width: 85,
                            height: 85
                        },
                        left: 'center',
                        top: '0%',
                    }]
                },
                series: [
                    {
                        type: 'pie',
                        center: ['50%', '40.5%'],
                        radius: ['38%', '52%'],
                        color:'#62b62f',
                        itemStyle: {
                            normal:{
                                color: new this.$echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#93ccff'},
                                        {offset: 1, color: '#2181f7'}

                                    ]
                                )
                            }
                        },
                        hoverAnimation:false,
                        data: [
                            {
                                value: passData,
                                name: '女消费',
                                labelLine: {    //引导线设置
                                    normal: {
                                        show: false,   //引导线显示
                                    }
                                },
                                label: {
                                    show: true,
                                    normal: {
                                        position: 'center',
                                        formatter : passData+'%',
                                        textStyle: {
                                            fontSize: 12,
                                            color:'#fff',
                                        }
                                    }
                                }
                            }, 
                            {
                                value: 100 - passData,
                                name: '男消费',
                                label: {
                                    show: false,
                                    normal: {
                                    },
                                    emphasis: {
                                        show: false,
                                    }
                                },
                                labelLine: {    //引导线设置
                                    normal: {
                                        show: false,   //引导线显示
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: 'rgba(0,0,0,.1)'
                                    },
                                    emphasis: {
                                        show: false,
                                    }
                                },
                            }
                        ]
                    }
                ]
            };
            this.portraitEc.setOption(option)
            window.addEventListener('resize', this.resizeHandler)
        },
        async toggleCityTab1(index){
            this.cityIndex1 = index
            this.cityName = []
            this.cityData = []
            var res = await this.$http.post(
                `/analysis/findTouristProvinceCity`,
                qs.stringify({
                    endDate: this.endValue,
                    startDate: this.beginValue
                })
            )
            let {data, code} = res.data
            // console.log(res)
            this.proName = []
            this.proData = []
            for(var key in data){
                if(key == 'provinceData'){
                    var jsStyleData = jsonSort(JSON.parse(data[key]), false).slice(0,10)
                    jsStyleData.forEach((item)=>{
                        this.proName.push(item.name)
                        this.proData.push({name: item.name, value:Math.round(item.value * 10000) / 100})
                    })
                }
                if(key == 'cityData'){
                    var jsStyleData = jsonSort(JSON.parse(data[key]), false).slice(0,10)
                    jsStyleData.forEach((item)=>{
                        this.cityName.push(item.name)
                        this.cityData.push({name: item.name, value: Math.round(item.value * 10000) / 100})
                    })
                }
            }

            if(index == 1){
                this.city(this.proName, this.proData)
            } 
            if(index == 0){
                this.city(this.cityName, this.cityData)
            }
        },
        // 游客消费分析
        async nearWeak(){
            this.aweakEc = this.$echarts.init(this.$refs.aweakTotal)
            this.aweakEc.showLoading({textColor: '#fff',maskColor: 'rgba(255, 255, 255, 0)'})
            var res = await this.$http.post(
                `/analysis/findTouristConsume`,
                qs.stringify({
                    endDate: this.endValue,
                    startDate: this.beginValue
                })
            )
            let {data, code} = res.data
            var Xdate = []
            var series1 = []   //酒店
            var series2 = []   //景区
            var series3 = []    //餐饮
            this.totalXF = 0
            this.avgXF = 0
            data.forEach(item => {
                this.totalXF += Number(item.total)
                this.avgXF += Number(item.avgConsumption)
                Xdate.push(String(item.dateTime).slice(4,6)+'/'+String(item.dateTime).slice(6,8))
                series3.push(item.avgCatering)
                series2.push(item.avgScenic)
                series1.push(item.avgHotel)
            });
            if(this.avgXF != 0){
                this.avgXF = this.avgXF / data.length
            }
            if(code == 10000){
                this.aweakEc.hideLoading()
            } else {
                this.aweakEc.hideLoading()
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
                    data: ['酒店消费', '景区消费', '餐饮消费'],
                    textStyle: {
                        color: '#B2D2E3'
                    },
                    y: '85%'
                },
                grid: {
                    left: '7%',
                    right: '7%',
                    bottom: '20%',
                    top: '5%',
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
                        name:'酒店消费',
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
                        name:'景区消费',
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
                        name:'餐饮消费',
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
        // 城市省份
        city(cpName, cpData){
            this.cityEc = this.$echarts.init(this.$refs.cityEchart)
            var option = {
                title: {
                    show: cpData.length == 0,
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
                    formatter: '{b}: {c}%'
                },
                legend: {
                    orient: 'vertical',
                    left: '50%',
                    bottom: '25%',
                    itemWidth: 12,  // 设置宽度
                    itemHeight: 12, // 设置高度
                    itemGap: 16,
                    textStyle:{
                        color: '#B2D2E3',
                        fontSize: 12
                    },
                    data: cpName,
                    formatter: function(params) {
                        var legendIndex = 0;
                        cpData.forEach(function (v, i) {
                            if (v.name == params) {
                                legendIndex = i;
                            }
                        });
                        return params + ":" + cpData[legendIndex].value +'%';
                    }
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '65%',
                        center: ['30%', '40%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: cpData,
                        color: ['#F6C80F','#EC87BF','#8256E8','#FFD184','#E35D68','#4EABFF']
                    }
                ]
            };
            this.cityEc.setOption(option)
            window.addEventListener('resize', this.resizeHandler)
        },
        // 获取消费
        async getConsume(){
            var res = await this.$http.post(
                `/analysis/findTouristConsumeStatistics`,
                qs.stringify({
                    endDate: this.endValue,
                    startDate: this.beginValue
                })
            )
            let {data, code} = res.data
            // console.log(res)
            this.hotelName = []
            this.hotelData = []
            this.cateringName = []
            this.cateringData = []
            for(var key in data){
                if(key == 'cateringAvg'){this.cateringAvg = data[key]} //餐饮
                if(key == 'hotelAvg'){this.hotelAvg = data[key]} //酒店
                if(key == 'scenicAvg'){this.scenicAvg = data[key]} //景区
                if(key == 'hotelOrder'){
                    var jsStyleData = JSON.parse(data[key])
                    for(var key in jsStyleData){
                        this.hotelName.push(key)
                        this.hotelData.push({name: key, value: jsStyleData[key]})
                    }
                }
                if(key == 'cateringOrder'){   //餐饮
                    var jsStyleData = JSON.parse(data[key])
                    for(var key in jsStyleData){
                        this.cateringName.push(key)
                        this.cateringData.push({name: key, value: jsStyleData[key]})
                    }
                }
                if(key == 'scenicOrder'){
                    var jsStyleData = JSON.parse(data[key])
                    for(var key in jsStyleData){
                        this.scenicName.push(key)
                        this.scenicData.push({name: key, value: jsStyleData[key]})
                    }
                }
            }
            this.hotel()
            this.restaurant()
            this.scenic()
        },
        // 游客消费统计
        scenic(){
            this.touristXf(this.scenicName, this.scenicData, this.$refs.touristEcharts1)
        },
        restaurant(){
            this.touristXf(this.cateringName, this.cateringData, this.$refs.touristEcharts2)
        },
        hotel(){
            this.touristXf(this.hotelName, this.hotelData, this.$refs.touristEcharts3)
        },
        touristXf(touristName, touristData, touristEcharts){
            this.touristEc = this.$echarts.init(touristEcharts )
            var giftImageUrl = bb.bb
            var option = {
                title:{
                    show: touristData.length == 0,//平常时设置为false，隐藏没有数据的文字提示
                    textStyle:{
                        color:'#bcbcbc'
                    },
                    text:'暂无数据',
                    left:'center',
                    top:'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b} : {c}%'
                },
                legend: {
                    left: 'center',
                    top: 'bottom',
                    show: false,
                    data: touristName
                },
                toolbox: {
                    show: false
                },
                graphic: {
                    elements: [{
                        type: 'image',
                        style: {
                            image: touristData.length == 0 ? '' : giftImageUrl,
                            width: 45,
                            height: 45
                        },
                        left: 'center',
                        top: 'center',
                    }]
                },
                series: [
                    {
                        name: '面积模式',
                        type: 'pie',
                        radius: [30, 80],
                        center: ['50%', '50%'],
                        roseType: 'area',
                        label: {
                            normal: {
                                textStyle: {
                                    color: '#fff'  // 改变标示文字的颜色
                                },
                                padding: [20, -60],
                                rich: {
                                    a: {
                                        fontSize: 12,
                                        lineHeight: 12,
                                        color: '#fff'
                                    },
                                    b: {
                                        fontSize: 12,
                                        lineHeight: 12,
                                        color: '#fff'
                                    }
                                },
                                itemStyle:{
                                    color: '#fff'
                                },
                                formatter: function(data){
                                    let valueTxt = ''
                                    if(data.data.name.length > 3){
                                        valueTxt = data.data.name.substring(0, 3)+ '..'
                                    } else {
                                        valueTxt = data.data.name
                                    }
                                    return  Number(Number(data.data.value)*100).toFixed(2) + '%'+valueTxt +'\n'
                                },
                                
                            }
                        },
                        labelLine:{  
                            normal:{  
                                length: 6,  
                                length2: 60, 
                                lineStyle: {
                                    color: "#fff"  // 改变标示线的颜色
                                } 
                            },
                        },
                        data: touristData,
                        color: ['#fdd100', '#28b1c7','#ff4873','#7351e3','#ed5400','#4b64ed','#3fecfe']
                    }
                ]
            };
            this.touristEc.setOption(option)
            window.addEventListener('resize', this.resizeHandler)
        },
        resizeHandler(){
            this.aweakEc.resize()
            this.cityEc.resize()
            this.touristEc.resize()
            this.portraitEc.resize()
            this.ageEc.resize()
            this.genderEc.resize()
        },
        beginChange(data){
            this.beginValue = data
            this.$refs.focesInput.focus();
        },
        endChange(data){
            this.endValue = data
            this.nearWeak()
            this.getPortrait()
            this.toggleCityTab1()
            this.getConsume()
            this.getIdentity()
        }
    },
    mounted(){
        // this.beginValue = moment(this.beginValue).format('YYYY-MM-DD')
        // this.endValue = moment(this.endValue).format('YYYY-MM-DD')
        this.getPortrait()
        this.getIdentity()
        this.getConsume()
        this.nearWeak()
        this.toggleCityTab1(0)
        // this.scenic()
        // this.restaurant()
        // this.hotel()
        // this.marriage()
        // this.child()
        // this.travelPerson()
        this.reTravel()
        // this.portraitAge()
        this.gender()
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

<style>
    .el-picker-panel.down_date{
        background-color: #072342;
    }
    .el-picker-panel.down_date .el-date-picker__header-label{
        color: #ABCBFF;
    }
    .el-picker-panel.down_date .el-picker-panel__icon-btn{
        color: #ABCBFF;
    }
    .touristXF{
        width: 100%;
        height: 100%;
        background: url('../../assets/hotel/F_bg.jpg') no-repeat;
        background-size: 100% 100%;
        font-family: 'PingFang SC';
        overflow: hidden;
    }
    .XF_title{
        width: 100%;
        height: 8.61%;
        /* background: url('../../assets/hotel/pass_title.png') no-repeat;
        background-size: 100% 100%; */
        position: relative;
    }
    .XF_title_txt{
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
    .XF_container{
        width: 100%;
        height: 91.38%;
        padding: 8px 20px 20px 20px;
        box-sizing: border-box;
        position: relative;
    }
    .XF_date{
        height: 40px;
        width: 340px;
        position: absolute;
        right: 23px;
        top: -36px;
    }
    .XF_date1, .XF_date2{
        width: 162px;
        height: 31px;
        display: inline-block;
        position: relative;
        z-index:666;
    }   
    .XF_date2{
        float: right;
    }
    .XF_date .el-input__inner{
        width: 162px;
        height: 37px;
        border: none;
        color: #3EDCFE;
        background: url('../../assets/hotel/pass_date_bg.png') no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
    }
    .XF_container_top{
        height: 49.5%;
        width: 100%;
        cursor: pointer;
    }
    .XF_date1_down{
        width: 10px;
        height: 6px;
        background: url('../../assets/hotel/pass_down.png') no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 50%;
        margin-top: -3px;
        right: 10%;
        pointer-events: none;
    }
    .XF_container_bottom{
        height: calc(50.5% - 18px);
        width: 100%;
        margin-top: 18px;
        background: url('../../assets/hotel/XF_bottom_bj.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
    }
    .tourist_total_title{
        width: 100%;
        height: 11.11%;
        background: url('../../assets/hotel/XF_total_bj.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
    }
    .tourist_total_container{
        width: 100%;
        height: 88.5%;
        padding: 0 40px;
        box-sizing: border-box;
        display: flex;
    }
    .tourist_total_1, .tourist_total_2, .tourist_total_3{
        padding-top: 20px;
        box-sizing: border-box;
        flex: 1;
        height: 100%;
    }
    .tourist_total_1_title{
        width: 176px;
        height: 38px;
        margin: 0 auto;
        background: url('../../assets/hotel/XF_bottom_titBj.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
        font-size: 14px;
        line-height: 38px;
        text-align: center;
        color: #CBEAFF;
    }
    .tourist_total_1_detial{
        width: 100%;
        height: 25px;
        color: #B2D2E3;
        margin-top: 25px;
        line-height: 25px;
        text-align: center;
        font-size: 14px;
    }
    .tourist_total_1_detial span{
        font-size: 22px;
        color: #0CE3DC;
        font-weight:bold;
    }
    .tourist_total_1_echart{
        width: 100%;
        height: calc(100% - 90px);
    }
    /* 左 */
    /* 游客画像 */
    .XF_container_left{
        width: 31.5%;
        height: 100%;
        float: left;
        background: url('../../assets/hotel/XF_left_bj.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
    }
    .XF_portrait_title{
        width: 100%;
        height: 13.76%;
        background: url('../../assets/hotel/F_l1_title.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
    }
    .XF_portrait_title_txt{
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
    .XF_portrait_container, .XF_analysis_container, .XF_city_container{
        width: 100%;
        height: 86%;
    }
    /* 中 */
    .XF_container_center{
        width: calc(36% - 40px);
        height: 100%;
        margin: 0 20px;
        float: left;
        background: url('../../assets/hotel/XF_left_bj.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
    }
    .XF_nearAweek, .XF_portrait{
        width: 100%;
        height: 19%;
        position: relative;
    }
    .touristTuEc, .portraitEc{
        width:100%; 
        height:80%;
        padding-bottom: 2%;
        box-sizing:border-box;
    }
    .portraitEc{
        height:80%;
    }
    .portraitEc{
        padding: 0 10px 12px 10px;
        box-sizing: border-box;
    }
    .XF_portrait_top{
        height: 55%;
        width: 100%;
    }
    .XF_portrait_gender, .XF_portrait_age{
        width: 50%;
        height: 100%;
        float: left;
    }
    .XF_portrait_gender{
        padding-left: 5px;
        box-sizing: border-box;
    }
    .XF_portrait_gender_nan, .XF_portrait_gender_nv{
        width: 60px;
        height: 100%;
        float: left;
    }
    .XF_portrait_gender_nan_img{
        width: 100%;
        height: 82px;
    }
    .XF_portrait_gender_nan_img img{
        display: block;
        width: 42px;
        height: 79px;
        margin: 0 auto;
    }
    .XF_portrait_gender_nan_txt, .XF_portrait_gender_nv_txt{
        width: 100%;
        height: calc(100% - 82px);
        text-align: center;
        line-height: 25px;
        font-size: 16px;
        color: #48bbf9;
    }
    .XF_portrait_gender_nv_txt{
        color: #fd78b9;
    }
    .XF_portrait_gender_ec{
        width: calc(100% - 120px);
        height: 100%;
        float: left;
    }
    .XF_portrait_bottom{
        height: 45%;
        width: 100%;
        display: flex;
        /* padding-bottom: 2px;
        box-sizing: border-box; */
    }
    .XF_portrait_bottom_ec{
        flex: 1;
    }
    .XF_nearAweekDetail, .XF_portraitkDetail{
        width: 100%;
        height: 22px;
        color: #B2D2E3;
        text-align: center;
        font-size: 16px;
        text-align: center;
        font-family:PingFang SC;
        font-weight:500;
        position: absolute;
        top: 50%;
        margin-top: -11px;
    }
    .XF_nearAweekDetail span, .XF_portraitkDetail span{
        color: #0CE3DC;
        font-size: 20px;
        font-family:PingFang SC;
        font-weight:bold;
    }
    /* 右 */
    .XF_container_right{
        width: 32%;
        height: 100%;
        float: left;
        background: url('../../assets/hotel/XF_right_bj.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
    }
    .XF_city_tab{
        width: 100%;
        height: 23.8%;
        position: relative;
    }
    .XF_city_echart{
        width: 100%;
        height: 76%;
    }
    .XF_detail_w50{
        width: 230px;
        margin-left: calc( 100% - 230px);
    }
    .XF_detail_w50 li{
        float: right;
    }
    .XF_btn_detail{
        height: 40px;
        width: 100%;
        position: absolute;
        top: 50%;
        margin-top: -11px;
        padding-right: 5%;
        box-sizing: border-box;
        display: flex;
    }
    .XF_btn_detail > li{
        display: block;
        width:93px;
        height:33px;
        background:#00243E;
        border:1px solid rgba(33,217,216,1);
        border-radius:18px;
        color: #ABCBFF;
        font-size: 16px;
        line-height: 33px;
        text-align: center;
        margin-left: 2%;
        cursor: pointer;
    }
    .XF_btn_detail > li.active{
        background: rgba(18,138,255,0.2);
    }
    @media screen and (max-width: 1400px) {
        .XF_portrait_gender_nan_img img{
            width: 36px;
            height: 71px;
        }
        .XF_portrait_gender_nan_img{
            height: 66px;
        }
        .tourist_total_1, .tourist_total_2, .tourist_total_3{
            padding-top: 8px;
            box-sizing: border-box;
        }
        .tourist_total_1_detial{
            margin-top: 8px;
            font-size: 13px;
        }
        .XF_date{
            width: 300px;
        }
        .el-date-editor.el-input, .el-date-editor.el-input__inner{
            width: 100%;
        }
        .XF_date1, .XF_date2{
            width: 140px;
            height: 31px;
        }
    }
</style>
