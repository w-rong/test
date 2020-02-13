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
                                近7天车流量总辆 <span>{{345}}</span>辆&nbsp;&nbsp;&nbsp;&nbsp;
                                最高日流量 <span>{{3454}}</span>辆
                            </div>
                        </div>
                        <div class="portraitEc">
                            <div class="XF_portrait_top">
                                <div class="XF_portrait_gender">
                                    <div class="XF_portrait_gender_nan">
                                        <div class="XF_portrait_gender_nan_img"><img src="../../assets/hotel/man.png" alt=""></div>
                                        <div class="XF_portrait_gender_nan_txt">68.6%</div>
                                    </div>
                                    <div class="XF_portrait_gender_ec" ref="genderEcharts"></div>
                                    <div class="XF_portrait_gender_nv">
                                        <div class="XF_portrait_gender_nan_img"><img src="../../assets/hotel/woman.png" alt=""></div>
                                        <div class="XF_portrait_gender_nv_txt">31.4%</div>
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
                                一周旅游总人数 <span>{{345}}</span>人&nbsp;&nbsp;&nbsp;&nbsp;
                                人均年龄 <span>{{3454}}</span>岁
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
                            景点人均消费 <span>152</span>元&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            较上个周期增长<span>1%</span>
                        </div>
                        <div class="tourist_total_1_echart" ref="touristEcharts1"></div>
                    </div>
                    <div class="tourist_total_2">
                        <div class="tourist_total_1_title">餐馆消费分析</div>
                        <div class="tourist_total_1_detial">
                            人均消费 <span>152</span>元&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            较上个周期增长<span>1%</span>
                        </div>
                        <div class="tourist_total_1_echart" ref="touristEcharts2"></div>
                    </div>
                    <div class="tourist_total_3">
                        <div class="tourist_total_1_title">酒店消费分析</div>
                        <div class="tourist_total_1_detial">
                            人均消费 <span>152</span>元&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            较上个周期增长<span>1%</span>
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
export default {
    components: {
        headtop
    },
    data(){
        return {
            pageTitle: '旅游消费分析',
            beginValue: new Date(),
            endValue: new Date(),
            cityIndex1: 0,
            cityTab: ['城市', '省份'],
            aweakEc: null,
            cityEc: null,
            touristEc: null,
            portraitEc: null,
            ageEc: null,
            genderEc: null,
            cityName: [],
            cityData: []
        }
    },
    methods: {
        // 游客消费
        gender(){
            this.genderEc = this.$echarts.init(this.$refs.genderEcharts)
            var option = {
                tooltip: {
                    show: false,
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
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
                            {value: 20, name: '女', itemStyle: {normal: {color: '#f087d1'}}},
                            {value: 80, name: '男', itemStyle: {normal: {color: '#10b7ff'}}}
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
        portraitAge(){
            this.ageEc = this.$echarts.init(this.$refs.ageEcharts)
            
            var option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: '60%',
                    bottom: '10%',
                    icon: "circle",
                    itemWidth: 8,  // 设置宽度
                    itemHeight: 8, // 设置高度
                    itemGap: 12,
                    textStyle: {
                        color: '#B2D2E3'
                    },
                    data: ['20岁以下', '20-25岁', '25-30岁', '35-40岁', '40岁以上']
                },
                color: ['#02d7cb','#f5c70f','#fa9837','#ae52ff','#4fdb5b',],
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        center: ['33%', '50%'],
                        radius: ['50%', '65%'],
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
                        data: [
                            {value: 335, name: '20岁以下'},
                            {value: 310, name: '20-25岁'},
                            {value: 234, name: '25-30岁'},
                            {value: 135, name: '35-40岁'},
                            {value: 1548, name: '40岁以上'}
                        ],
                    },
                     {
                        name: '外边框',
                        type: 'pie',
                        hoverAnimation: false, //鼠标移入变大
                        center: ['33%', '50%'],
                        radius: ['72%', '75%'],
                        label: {
                            normal: {
                                show: false,
                            }
                        },
                        data: [
                            {value: 335, name: '20岁以下'},
                            {value: 310, name: '20-25岁'},
                            {value: 234, name: '25-30岁'},
                            {value: 135, name: '35-40岁'},
                            {value: 1548, name: '40岁以上'}
                        ],
                    },
                ]
            };
            this.ageEc.setOption(option)
            window.addEventListener('resize', this.resizeHandler)
        },
        marriage(){
            var marriageEchat = this.$refs.XF_portrait_bottom_ec1
            this.portraitBottom(20, marriageEchat)
        },
        child(){
            var marriageEchat = this.$refs.XF_portrait_bottom_ec2
            this.portraitBottom(60, marriageEchat)
        },
        travelPerson(){
            var marriageEchat = this.$refs.XF_portrait_bottom_ec3
            this.portraitBottom(40, marriageEchat)
        },
        reTravel(){
            var marriageEchat = this.$refs.XF_portrait_bottom_ec4
            this.portraitBottom(50, marriageEchat)
        },
        portraitBottom(passData, refEchart){
            this.portraitEc = this.$echarts.init(refEchart)
            var giftImageUrl = aa.aa;
            var option = {
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
                    }]
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['40%', '60%'],
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
                                            fontSize: 14,
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
        toggleCityTab1(index){
            this.cityIndex1 = index
            if(index == 1){
                //省
                this.cityName = ['浙江', '江西', '云南', '湖北', '安徽', '河南']
                this.cityData = [
                    {value: 335, name: '浙江'},
                    {value: 310, name: '江西'},
                    {value: 234, name: '云南'},
                    {value: 135, name: '湖北'},
                    {value: 1548, name: '安徽'},
                    {value: 135, name: '河南'},
                ]
                this.city()
            } 
            if(index == 0){
                this.cityName = ['郑州', '杭州', '南京', '北京', '嘉兴', '连云港']
                this.cityData = [
                    {value: 135, name: '郑州'},
                    {value: 410, name: '杭州'},
                    {value: 254, name: '南京'},
                    {value: 135, name: '北京'},
                    {value: 548, name: '嘉兴'},
                    {value: 635, name: '连云港'},
                ]
                this.city()
            }
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
        city(){
            this.cityEc = this.$echarts.init(this.$refs.cityEchart)
            var option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: '73%',
                    bottom: '25%',
                    itemWidth: 12,  // 设置宽度
                    itemHeight: 12, // 设置高度
                    itemGap: 16,
                    textStyle:{
                        color: '#B2D2E3',
                        fontSize: 14
                    },
                    data: this.cityName
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '65%',
                        center: ['40%', '40%'],
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
                        data: this.cityData,
                        color: ['#F6C80F','#EC87BF','#8256E8','#FFD184','#E35D68','#4EABFF']
                    }
                ]
            };
            this.cityEc.setOption(option)
            window.addEventListener('resize', this.resizeHandler)
        },
        // 游客消费统计
        scenic(){
            var scenicName = ['白沙岛景区', '普陀山风景区', '朱家尖景区', '桃花岛风景区', '沈家门渔港', '普陀天地景区', '干施岱存']
            var scenicData = [
                    {value: 10, name: '白沙岛景区'},
                    {value: 15, name: '普陀山风景区'},
                    {value: 15, name: '朱家尖景区'},
                    {value: 10, name: '桃花岛风景区'},
                    {value: 5, name: '沈家门渔港'},
                    {value: 15, name: '普陀天地景区'},
                    {value: 15, name: '干施岱存'}
                ]
            this.touristXf(scenicName, scenicData, this.$refs.touristEcharts1)
        },
        restaurant(){
            var resName = ['饮品店', '小吃快餐', '本帮江浙菜', '火锅', '自助餐', '烧烤', '日本菜']
            var resData = [
                    {value: 10, name: '饮品店'},
                    {value: 15, name: '小吃快餐'},
                    {value: 15, name: '本帮江浙菜'},
                    {value: 10, name: '火锅'},
                    {value: 5, name: '自助餐'},
                    {value: 15, name: '烧烤'},
                    {value: 15, name: '日本菜'}
                ]
            this.touristXf(resName, resData, this.$refs.touristEcharts2)
        },
        hotel(){
            var hotelName = ['豪华型', '舒适型', '经济型']
            var hotelData = [
                    {value: 12, name: '豪华型'},
                    {value: 38, name: '舒适型'},
                    {value: 50, name: '经济型'}
                ]
            this.touristXf(hotelName, hotelData, this.$refs.touristEcharts3)
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
                            image: giftImageUrl,
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
        }
    },
    mounted(){
        // console.log(aa)
        this.nearWeak()
        this.toggleCityTab1(0)
        this.scenic()
        this.restaurant()
        this.hotel()
        this.marriage()
        this.child()
        this.travelPerson()
        this.reTravel()
        this.portraitAge()
        this.gender()
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
        font-family: PingFang SC;
    }
    .XF_container{
        width: 100%;
        height: 91.38%;
        padding: 20px;
        box-sizing: border-box;
        position: relative;
    }
    .XF_date{
        height: 40px;
        width: 340px;
        position: absolute;
        right: 23px;
        top: -28px;
    }
    .XF_date1, .XF_date2{
        width: 162px;
        height: 31px;
        display: inline-block;
        position: relative;
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
        font-family: 'PingFang SC';
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
        height: 20%;
        position: relative;
    }
    .touristTuEc, .portraitEc{
        width:100%; 
        height:80%;
        padding-bottom: 2%;
        box-sizing:border-box;
    }
    .portraitEc{
        padding: 0 25px 25px 25px;
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
</style>
