<template>
    <div class="touristXF">
        <div class="XF_title">
            <headtop :title='pageTitle'/>
            <!-- <div class="XF_title_txt">旅游消费分析</div> -->
            <div class="XF_date">
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
            </div>
        </div>
        <div class="XF_container">
                
            <div class="XF_container_top">
                <!-- 游客画像 -->
                <div class="XF_container_left">
                    <div class="XF_portrait_title">
                        <div class="XF_portrait_title_txt">游客消费画像</div>
                    </div>
                    <div class="XF_portrait_container">
                        <div class="XF_portrait">
                            <div class="XF_portraitkDetail">
                                当月旅游总人数 <span>{{allTourist}}</span>人&nbsp;&nbsp;&nbsp;&nbsp;
                                平均年龄 <span>{{Number(avgTourist).toFixed(0)}}</span>岁
                            </div>
                        </div>
                        <div class="portraitEc">
                            <div class="XF_portrait_top">
                                <div class="XF_portrait_gender gender">
                                    <div class="XF_portrait_gender_nan">
                                        <div class="XF_portrait_gender_nan_img"><img src="../../assets/hotel/man.png" alt=""></div>
                                        <div class="XF_portrait_gender_nan_txt">{{Number(Number(male)*100).toFixed(2)}}%</div>
                                    </div>
                                    <div class="XF_portrait_gender_ec" v-if="inResize">
                                        <svg :width="genderR * 2 + 10" :height="genderR * 2 + 10" version="1.1"  class="pie"
                                                xmlns="http://www.w3.org/2000/svg">
                                            <circle :cx="genderWidth" :cy="genderWidth" :r="genderR - 5" stroke="#08b0ff" class="ring manchart">
                                                <animate attributeName="stroke-dashoffset" :to="-getVal(male, 251)" dur="1s" fill="freeze"></animate>
                                            </circle>
                                            <circle :cx="genderWidth" :cy="genderWidth" :r="genderR * 0.7" stroke="rgba(0,87,168,0.1)" class="ring"></circle>
                                            <circle :cx="genderWidth" :cy="genderWidth" :r="genderR * 0.7" stroke="#ff78ba" class="ring womanchart">
                                                <animate attributeName="stroke-dashoffset" :to="getVal(female, 198)" dur="1s" fill="freeze"></animate>
                                            </circle>
                                            <circle :cx="genderWidth" :cy="genderWidth" :r="genderR" stroke="rgba(0,87,168,0.5)" fill="none" stroke-width="1"></circle>
                                            <circle :cx="genderWidth" :cy="genderWidth" :r="genderR * 0.75" stroke="rgba(0,87,168,0.5)" fill="none" stroke-width="1"></circle>
                                            <circle :cx="genderWidth" :cy="genderWidth" r="2" fill="#0057A8"></circle>
                                            <line :x1="genderWidth" :y1="genderWidth" :x2="genderWidth" y2="0" stroke="#0057A8"></line>
                                            <line :x1="genderWidth" :y1="genderWidth" :x2="endPoint[0]" :y2="endPoint[1]" stroke="#0057A8" class="endline"></line>
                                        </svg>
                                    </div>
                                    <div class="XF_portrait_gender_nv">
                                        <div class="XF_portrait_gender_nan_img"><img src="../../assets/hotel/woman.png" alt=""></div>
                                        <div class="XF_portrait_gender_nv_txt">{{Number(Number(female)*100).toFixed(2)}}%</div>
                                    </div>
                                </div>
                                <div class="XF_portrait_age" ref="ageEcharts">c</div>
                            </div>
                            <div class="XF_portrait_bottom ider">
                                <ul v-if="inResize">
                                    <li v-for="(i, idx) in list" :key="idx">
                                        <div class="XF_portrait_bottom_text">{{i.name}}</div>
                                        <!-- <label>{{i.name}}</label> -->
                                        <img src="@/assets/img/portrait/chartbg@2x.png" alt="">
                                        <svg width="106" height="106" version="1.1"  class="pie"
                                                xmlns="http://www.w3.org/2000/svg">
                                            <defs>
                                                <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%"> 
                                                    <stop offset="0%" stop-color="#92cbfe"/> 
                                                    <stop offset="100%" stop-color="#2382f7"/> 
                                                </linearGradient>
                                            </defs>
                                            <circle cx="53" cy="53" r="28" stroke="url(#linear)">
                                                <animate attributeName="stroke-dashoffset" :to="getVal(i.value, 175)" dur="1s" fill="freeze"></animate>
                                            </circle>
                                        </svg>
                                        <p>
                                            <b>{{i.value * 100 | fixed}}</b>%
                                        </p>
                                    </li>
                                </ul>
                                <!-- <div class="XF_portrait_bottom_ec" ref="XF_portrait_bottom_ec1"></div>
                                <div class="XF_portrait_bottom_ec" ref="XF_portrait_bottom_ec2"></div>
                                <div class="XF_portrait_bottom_ec" ref="XF_portrait_bottom_ec3"></div>
                                <div class="XF_portrait_bottom_ec" ref="XF_portrait_bottom_ec4"></div> -->
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
                <div class="tourist_total_title">
                    <div class="XF_portrait_title_txt">游客消费统计</div>
                </div>
                <div class="tourist_total_container">
                    <div class="tourist_total_1">
                        <div class="tourist_total_1_title">景点消费分析</div>
                        <div class="tourist_total_1_detial">
                            景点人均消费 <span>{{Number(scenicAvg).toFixed(2)}}</span>元&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            较上个周期增长<span>{{scenicZZ}}%</span>
                        </div>
                        <div class="tourist_total_1_echart" ref="touristEcharts1"></div>
                    </div>
                    <div class="tourist_total_2">
                        <div class="tourist_total_1_title">餐馆消费分析</div>
                        <div class="tourist_total_1_detial">
                            人均消费 <span>{{Number(cateringAvg).toFixed(2)}}</span>元&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            较上个周期增长<span>{{foodZZ}}%</span>
                        </div>
                        <div class="tourist_total_1_echart" ref="touristEcharts2"></div>
                    </div>
                    <div class="tourist_total_3">
                        <div class="tourist_total_1_title">酒店消费分析</div>
                        <div class="tourist_total_1_detial">
                            人均消费 <span>{{Number(hotelAvg).toFixed(2)}}</span>元&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            较上个周期增长<span>{{hotelZZ}}%</span>
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
const genderR = 45

function angle (an) {
    let r = 51
    let angle = Math.PI / 180 * an;
    let y = genderR + 5 +r*Math.sin(angle)
    let x = genderR + 5 +r*Math.cos(angle)

    return [x, y]
}

export default {
    components: {
        headtop
    },
    data(){
        return {
            mounthValue: moment(new Date()).format('YYYY-MM'),
            inResize: true,
            list: [
                {
                    value: 0,
                    name: '已婚'
                },
                {
                    value: 0,
                    name: '携子'
                },
                {
                    value: 0,
                    name: '旅游达人'
                },
                // {
                //     value: 0,
                //     name: '重游率'
                // }
            ],
            genderR: genderR,
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
            beginValue: moment(new Date()).startOf('month').format("YYYY-MM-DD"),
            endValue: moment(new Date()).endOf('month').format("YYYY-MM-DD"),
            cityIndex1: 0,
            cityTab: ['城市', '省份'],
            aweakEc: null,
            cityEc: null,
            touristEc: null,
            portraitEc: null,
            ageEc: null,
            // genderEc: null,
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
            scenicZZ: 0,
            hotelZZ: 0,
            foodZZ: 0,
            pickerOptions1: {
                disabledDate: (time) => {
                    return  time.getTime() > new Date(new Date().getTime()) || time.getTime() < new Date('2019-10-01').getTime();
                }
            }
        }
    },
    filters:{
        fixed(value){
            return value.toFixed(2)
        }
    },
    computed: {
        genderWidth () {
            return this.genderR + 5
        },
        endPoint () {
            return angle(360 * (this.female / 100))
        }
    },
    methods: {
        getVal (val, max) {
            return max * (1 - val)
        },
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
            // console.log(res)
            let ageInfo = []
            let portraitName = []
            let portraitData = []
            let colorValue = []
            this.female  = 0
            this.male  = 0
            for(var key in data){
                if(key == 'age2025'){ageInfo.push({name: '20-25岁', id: '1', value: data[key]})}
                if(key == 'age2530'){ageInfo.push({name: '25-30岁', id: '2', value: data[key]})}
                if(key == 'age3035'){ageInfo.push({name: '30-35岁', id: '3', value: data[key]})}
                if(key == 'age3540'){ageInfo.push({name: '35-40岁', id: '4', value: data[key]})}
                if(key == 'age40'){ageInfo.push({name: '40岁以上', id: '5', value: data[key]})}
                if(key == 'female'){this.female = Number(data[key])}
                if(key == 'male'){this.male = Number(data[key])}
                if(key == 'allTourist'){this.allTourist = data[key]}
                if(key == 'avgTourist'){this.avgTourist = data[key]}
            
            }
            var sortData = ageInfo.sort(compare("id",true))
            sortData.forEach((item)=>{
                portraitName.push(item.name)
                portraitData.push({name: item.name, value: Math.round(item.value * 10000) / 100})
                colorValue.push(Number(item.value))
            })
            this.portraitAge(portraitName, portraitData, colorValue)
            // this.gender()
        },
        portraitAge(portraitName, portraitData, colorValue){
            let total = 0
            let totalColor = 0
            portraitData.forEach(item=>{
                total+= Number(item.value)
            })
            if(total < 100){
                portraitData[portraitData.length-1].value = (Number(portraitData[portraitData.length-1].value) + (100 - Number(total.toFixed(2)))).toFixed(2)
            }
            colorValue.forEach(item=>{
                totalColor+= Number(item)
            })
            if(totalColor < 1){
                colorValue[colorValue.length - 1] = colorValue[colorValue.length - 1] + totalColor
            }

            this.ageEc = this.$echarts.init(this.$refs.ageEcharts)
            var colors = ['#02d7cb','#f5c70f','#fa9837','#ae52ff','#4fdb5b']
            function setColors (data) {
                let result = []
                data.reduce((old, d, idx) => {
                    let now = old + parseFloat(d)
                    result.push([now, colors[idx]])
                    return now
                }, 0)
                result.push([1, 'rgba(255,255,255,0)'])
                return result
            }
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
                    formatter: '{b}: {c}%'
                },
                legend: {
                    orient: 'vertical',
                    left: '47%',
                    top: '5%',
                    icon: "circle",
                    padding: [0,0,0,0],
                    itemWidth: 7,  // 设置宽度
                    itemHeight: 7, // 设置高度
                    itemGap: 6,
                    textStyle: {
                        color: '#B2D2E3',
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
                
                series: [
                    {
                        name: '统计',
                        type: 'gauge',
                        splitNumber: 10, //刻度数量
                        radius: '50%', //图表尺寸
                        center: ['27%', '40%'],
                        startAngle: 90,
                        endAngle: -270,
                        axisLine: {
                            show: false,
                            lineStyle: {
                                width: 2,
                                shadowBlur: 0,
                                color: setColors(colorValue)
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: true,
                            lineStyle: {
                                color: 'auto',
                                width: 1
                            },
                            length: 8,
                            splitNumber: 6
                        },
                        axisLabel: {
                            show: false
                        },
                    }, {
                        name:'访问来源',
                        type:'pie',
                        radius: ['59%', '61%'],
                        center: ['27%', '40%'],
                        color: colors,
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        label: {
                            normal: {
                                show: false
                            }
                        },
                        data: portraitData
                    }
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
            // console.log(res)
            let married = 0
            let withChild = 0
            let tourismDr = 0
            var that = this
            for(var key in data){
                if(key == 'married'){
                    married = Number(Number(data[key])).toFixed(2)
                    that.list[0].value = married
                }
                if(key == 'hasChild'){
                    withChild = Number(Number(data[key])).toFixed(2)
                    that.list[1].value =  withChild
                }
                if(key == 'tourismDr'){
                    tourismDr = Number(Number(data[key])).toFixed(2)
                    that.list[2].value = tourismDr
                }
            }
            // console.log(this.list)
            // this.marriage(married)
            // this.child(withChild)
            // this.travelPerson(tourismDr)
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
            var reData = Number(Number(data.revisitRatio)).toFixed(2)
            var marriageEchat = this.$refs.XF_portrait_bottom_ec4
            // this.list[3] = {
            //             name: '重游率',
            //             value: reData
            //         }
            // this.list[3].value = reData
            // this.portraitBottom(reData, marriageEchat, '重游率')
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
            var proTotal = 0
            var cityTotal = 0
            for(var key in data){
                if(key == 'provinceData'){
                    var jsStyleData = jsonSort(JSON.parse(data[key]), false).slice(0,6)
                    if(jsStyleData.length != 0){
                        jsStyleData.forEach((item)=>{
                            cityTotal += Math.round(Number(item.value) * 10000) / 100
                            this.proName.push(item.name)
                            this.proData.push({name: item.name, value:Math.round(item.value * 10000) / 100})
                        })
                        if(cityTotal < 100){
                            this.proName.push('其他')
                            this.proData.push({name: '其他', value: Number(100 - cityTotal).toFixed(2)})
                        }
                    }
                }
                if(key == 'cityData'){
                    var jsStyleData = jsonSort(JSON.parse(data[key]), false).slice(0,6)
                    if(jsStyleData.length != 0){
                        jsStyleData.forEach((item)=>{
                            proTotal += Math.round(Number(item.value) * 10000) / 100
                            this.cityName.push(item.name)
                            this.cityData.push({name: item.name, value: Math.round(item.value * 10000) / 100})
                        })
                        if(proTotal < 100){
                            this.cityName.push('其他')
                            this.cityData.push({name: '其他', value: Number(100 - proTotal).toFixed(2)})
                        }
                    }
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
            console.log(res)
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
            });
            let sliceData = data
            if(data.length < 8){
                sliceData.forEach(item => {
                    Xdate.push(String(item.dateTime).slice(4,6)+'/'+String(item.dateTime).slice(6,8))
                    series3.push(item.avgCatering)
                    series2.push(item.avgScenic)
                    series1.push(item.avgHotel)
                    
                });
            } else if(data.length <= 20){
                for(var i = 0; i <= data.length; i+=4){
                    if((data[i])){
                        Xdate.push(String(data[i].dateTime).slice(4,6)+'/'+String(data[i].dateTime).slice(6,8))
                        series3.push(data[i].avgCatering)
                        series2.push(data[i].avgScenic)
                        series1.push(data[i].avgHotel)
                    }else{
                        break
                    }
                }
            } else{
                for(var i = 0; i <= data.length; i+=5){
                    if(data[i]){
                        Xdate.push(String(data[i].dateTime).slice(4,6)+'/'+String(data[i].dateTime).slice(6,8))
                        series3.push(data[i].avgCatering)
                        series2.push(data[i].avgScenic)
                        series1.push(data[i].avgHotel)
                    }else {
                        break
                    }
                }
            }
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
                    left: '65%',
                    top: '10%',
                    itemWidth: 12,  // 设置宽度
                    itemHeight: 12, // 设置高度
                    itemGap: 12,
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
                        center: ['35%', '40%'],
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
                        color: ['#ED5400', '#1FB5A5','#EC87BF','#8256E8','#FFD184','#E35D68','#4EABFF']
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
            console.log(res)
            this.cateringAvg = 0
            this.hotelAvg = 0
            this.scenicAvg = 0
            this.scenicZZ = 0
            this.foodZZ = 0
            this.hotelZZ = 0
            this.hotelName = []
            this.hotelData = []
            this.cateringName = []
            this.cateringData = []
            this.scenicName = []
            this.scenicData = []
            for(var key in data){
                if(key == 'cateringAvg'){this.cateringAvg = data[key]} //餐饮
                if(key == 'hotelAvg'){this.hotelAvg = data[key]} //酒店
                if(key == 'scenicAvg'){this.scenicAvg = data[key]} //景区
                if(key == 'hotelOrder'){
                    var jsStyleData = JSON.parse(data[key])
                    for(var key in jsStyleData){
                        this.hotelName.push(key)
                        this.hotelData.push({name: key, value: (Number(jsStyleData[key])*100).toFixed(2)})
                    }
                }
                if(key == 'cateringOrder'){   //餐饮
                    var jsStyleData = JSON.parse(data[key])
                    for(var key in jsStyleData){
                        this.cateringName.push(key)
                        this.cateringData.push({name: key, value: (Number(jsStyleData[key])*100).toFixed(2)})
                    }
                }
                if(key == 'scenicOrder'){
                    var jsStyleData = JSON.parse(data[key])
                    for(var key in jsStyleData){
                        this.scenicName.push(key)
                        this.scenicData.push({name: key, value: (Number(jsStyleData[key])*100).toFixed(2)})
                    }
                }
                var scenicValue = 0
                var foodValue = 0
                var hotelValue = 0
                if(Number(data['lastScenicAvg']) != 0){
                    this.scenicZZ = Number((Number(data['scenicAvg']) / Number(data['lastScenicAvg']))).toFixed(2)
                }
                if(Number(data['lastCateringAvg']) != 0){
                    this.foodZZ = Number((Number(data['cateringAvg']) / Number(data['lastCateringAvg']))*100).toFixed(2)
                }
                if(Number(data['lastHotelAvg']) != 0){
                    this.hotelZZ = Number((Number(data['hotelAvg']) / Number(data['lastHotelAvg']))*100 ).toFixed(2)
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
            console.log(touristData)
            this.touristEc = this.$echarts.init(touristEcharts)
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
                    formatter: '{b} : {c}%',
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
                            width: 30,
                            height: 30
                        },
                        left: 'center',
                        top: 'center',
                    }]
                },
                series: [
                    {
                        name: '面积模式',
                        type: 'pie',
                        radius: [26, 60],
                        center: ['50%', '50%'],
                        roseType: 'area',
                        label: {
                            normal: {
                                textStyle: {
                                    color: '#fff'  // 改变标示文字的颜色
                                },
                                padding: [20, -70],
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
                                    return  Number(data.data.value) + '%'+valueTxt +'\n'
                                },
                            }
                        },
                        labelLine:{  
                            normal:{  
                                length: 12,  
                                length2: 70, 
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
        },
        choseMonth(data){
            this.mounthValue = data
            this.beginValue = moment(new Date(data)).startOf('month').format("YYYY-MM-DD")
            this.endValue = moment(new Date(data)).endOf('month').format("YYYY-MM-DD")
            this.nearWeak()
            this.getPortrait()
            this.toggleCityTab1(0)
            this.getConsume()
            this.getIdentity()
            this.inResize = false;
            var that = this
            setTimeout(() => {
                that.inResize = true
            }, 100);
        },
        beginChange(data){
            this.beginValue = data
            var endTime = moment(new Date((new Date(data)).getTime(data)+ 6 * 24 * 3600 * 1000)).format('YYYY-MM-DD')
            this.endValue = endTime
            this.nearWeak()
            this.getPortrait()
            this.toggleCityTab1(0)
            this.getConsume()
            this.getIdentity()
            this.inResize = false;
            var that = this
            setTimeout(() => {
                that.inResize = true
            }, 100);
            // this.$refs.focesInput.focus();
        },
        endChange(data){
            this.endValue = data
            var beginTime = moment(new Date((new Date(data)).getTime(data)- 6 * 24 * 3600 * 1000)).format('YYYY-MM-DD')
            this.beginValue = beginTime
            this.nearWeak()
            this.getPortrait()
            this.toggleCityTab1(0)
            this.getConsume()
            this.getIdentity()
            this.inResize = false;
            var that = this
            setTimeout(() => {
                that.inResize = true
            }, 100);
        }
    },
    mounted(){
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
        // this.gender()
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
    .XF_date .el-icon-date:before{
        background: url('../../assets/hotel/date_icon.png') no-repeat;
        background-size: 100% 100%;
        width: 21px;
        height: 21px;
        position: absolute;
        top: 14px;
        left: 0;
        margin-right: 2px;
        content: '';
    }
    .XF_date .el-date-editor.el-input{
        width: 130px;
        cursor: pointer;
    } 
    .XF_date .el-date-editor.el-input input{
        cursor: pointer;
        border: none;
        color: #ABCBFF;
        background-color: transparent;
    }
    .XF_date .el-input__prefix{
        left: 46px;
    }
    .XF_date{
        /* width: 20%; */
        width: 188px;
        height: 48px;
        position: absolute;
        cursor: pointer;
        top: 0px;
        right: 20px;
        z-index: 999;
    }
    .XF_date input{
        width: 188px;
        height: 48px;
        text-align: center;
        color: #ABCBFF;
        background: url('../../assets/hotel/dateBj.png') no-repeat;
        background-size: 100% 100%;
    }
    .el-picker-panel.down_date{
        background-color: #072342;
        color: #ABCBFF;
    }
    .el-picker-panel.down_date .el-date-picker__header-label{
        color: #ABCBFF;
    }
    .el-picker-panel.down_date .el-picker-panel__icon-btn{
        color: #ABCBFF;
    }
    .el-picker-panel.down_date .el-date-table td.disabled div{
        background-color: #072342;
        color: #999;
    }
    .el-picker-panel.down_date .normal.disabled{
        color: #aaa;
    }
    .touristXF .el-input--prefix .el-input__inner{
        color: #ABCBFF;
        border: none;
    }
    .XF_portrait_bottom_text{
        width: 100%;
        text-align: center;
        position: absolute;
        bottom: -12px;
        color: #ABCCEB;
    }
    .XF_portrait_bottom.ider{
        width: 100%;
    }
    .XF_portrait_bottom.ider ul{
        /* position: absolute; */
        display: flex;
        width: 100%;
        height: 100%;
    }
    .XF_portrait_bottom.ider ul li{
        float: left;
        width: 25%;
        height: 85%;
        position: relative;
        /* position: absolute;
        left: 0;
        top: 0; */
        font-size: 12px;
    }
    .XF_portrait_bottom.ider ul li:nth-child(1){
        margin-left: 10%;
    }
    .XF_portrait_bottom.ider ul li label{
        width: 25px;
        height: 16px;
        color: #fff;
        text-align: center;
        position: absolute;
        writing-mode: vertical-lr;
        bottom: -8px;
        left: 50%;
        transform: translate(-50%);
    }
    .XF_portrait_bottom.ider ul li img{
        display: block;
        width: 100px;
        /* width: auto; */
        height: 100px;
        margin: 0 auto;
        /* position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%); */
    }
    .XF_portrait_bottom.ider ul li .pie{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

    }
    .XF_portrait_bottom.ider ul li:nth-child(1) img, .ider ul li:nth-child(3) img{
        -webkit-animation: mapRotateColor 3.7s 1s linear infinite;
        /* left: 117px;
        top: 7px; */
    }
    .XF_portrait_bottom.ider ul li:nth-child(2) img, .XF_portrait_bottom.ider ul li:nth-child(4) img{
        -webkit-animation: mapRotateColor1 3.7s 1s linear infinite;
    }
    .XF_portrait_bottom.ider ul li p{
        text-align: center;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: #0CE3DC;
    }
    .XF_portrait_bottom.ider circle{
        stroke-linecap: round;
        fill: none;
        stroke-width: 4;
        stroke-dasharray: 175;
        stroke-dashoffset: 175;
        transform: rotatez(-90deg);
        transform-origin: 53px;
    }
    @keyframes mapRotateColor {  
        0%{
            -webkit-transform:rotate(0deg);
        }
        100%{
            -webkit-transform:rotate(-360deg);
        }
    }
    @keyframes mapRotateColor1 {  
        0%{
            -webkit-transform:rotate(0deg);
        }
        100%{
            -webkit-transform:rotate(360deg);
        }
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
        width: 188px;
        height: 48px;
        position: absolute;
        cursor: pointer;
        top: 0px;
        right: 20px;
        z-index: 999;
    }
    .XF_date .el-input__inner{
        width: 188px;
        height: 48px;
        text-align: center;
        color: #ABCBFF;
        background: url('../../assets/hotel/dateBj.png') no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
    }
    /* .XF_date .el-icon-date:before{
        background: url('../../assets/hotel/date_icon.png') no-repeat;
        background-size: 100% 100%;
        width: 21px;
        height: 21px;
        position: absolute;
        top: 14px;
        left: 0;
        margin-right: 2px;
    } */
    .XF_container_top{
        height: 49.5%;
        width: 100%;
        cursor: pointer;
    }
    /* .XF_date1_down{
        width: 10px;
        height: 6px;
        background: url('../../assets/hotel/pass_down.png') no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 50%;
        margin-top: -3px;
        right: 10%;
        pointer-events: none;
    } */
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
        height: 12.11%;
        background: url('../../assets/hotel/CV_bottom_title.png') no-repeat;
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
        margin-top: 15px;
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
        height: calc(100% - 80px);
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
        height: 12.5%;
        background: url('../../assets/hotel/F_l1_title.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
        margin-top: 1%;
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
    .XF_portrait_gender .gender{
        width: 245px;
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
        width: 100px;
        /* width: calc(100% - 120px); */
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
    .XF_portrait_gender_ec .gender-area {
        font-size: 14px;
        display: flex;
        color: #4ABFFE;
        justify-content: center;
        align-items: center;
        margin-top: 22px;
        text-align: center;
    }
    .XF_portrait_gender_ec .man, .XF_portrait_gender_ec .woman{
        max-width: 50px;
        overflow: hidden;
    }
    .XF_portrait_gender_ec .ring{
        fill: none;
        stroke-width: 4;
    }
    .XF_portrait_gender_ec .manchart {
        stroke-dasharray: 251;
        stroke-dashoffset: 0;
        transform: rotatez(-90deg);
        transform-origin: 50px;
    }
    .XF_portrait_gender_ec .womanchart {
        stroke-dasharray: 198;
        stroke-dashoffset: 198;
        transform: rotatez(-90deg);
        transform-origin: 50px;
    }
    .XF_portrait_gender_ec .endline{
        transform: rotate(-90deg);
        transform-origin: 50px;
    }
    .XF_portrait_gender_ec .decoration{
        background: url('../../assets/img/portrait/decoration@2x.png') no-repeat;
        background-size: 201px 47px;
        width: 201px;
        height: 47px;
        position: absolute;
        bottom: 25px;
    }
    @media screen and (max-width: 1500px){
        .XF_portrait_gender_ec{
            width: 90px;
        }
        .XF_portrait_gender_nan, .XF_portrait_gender_nv{
            width: 45px;
        }
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
            margin-top: 0px;
            font-size: 13px;
        }
        .XF_date{
            width: 188px;
        }
        .el-date-editor.el-input, .el-date-editor.el-input__inner{
            width: 100%;
            border: none;
            color: #ABCBFF;
        }
        .XF_portrait_bottom.ider ul li img{
            display: block;
            width: 75px;
            height: 75px;
        }
        .XF_btn_detail > li{
            width: 85px;
            height: 28px;
            line-height: 28px;
        }
    }
</style>
