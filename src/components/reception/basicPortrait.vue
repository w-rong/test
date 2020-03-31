<template>
    <div class="basicPortrait">
        <div class="BP_title">
            <!-- <div class="BP_nav">  -->
                <headtop :title='pageTitle'/>
            <!-- </div> -->
            <!-- <div class="BP_title_txt">游客画像分析</div> -->
            <div class="total_date1_basic">
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
        <div class="BP_container">
            <div class="BP_left">
                <div class="BP_info_title">
                    <div class="BP_info_title_txt">游客基础属性</div>
                </div>
                <div class="BP_info_container">
                    <div class="BP_info_1">
                        <div class="BP_info_gender">
                            <div class="BP_info_1_title">
                                <div class="BP_info_1_title_txt">性别</div>
                            </div>
                            <div class="BP_info_1_con gender">
                                <div class="BP_info_1_nan">
                                    <img src="../../assets/hotel/man.png" alt="">
                                    <div class="BP_info_1_nan_data">{{Number(Number(male)*100).toFixed(2)}}%</div>
                                </div>
                                <div class="BP_info_1_echart" ref="BP_gender" v-if="inResize">
                                    <svg :width="genderR * 2 + 10" :height="genderR * 2 + 10" version="1.1"  class="pie"
                                            xmlns="http://www.w3.org/2000/svg">
                                        <circle :cx="genderWidth" :cy="genderWidth" :r="genderR - 5" stroke="#08b0ff" class="ring manchart">
                                            <animate attributeName="stroke-dashoffset" :to="-getVal(male, 251)" dur="1s" fill="freeze"></animate>
                                        </circle>
                                        <circle :cx="genderWidth" :cy="genderWidth" :r="genderR * 0.7" stroke="rgba(0,87,168,0.1)" class="ring"></circle>
                                        <circle :cx="genderWidth" :cy="genderWidth" :r="genderR * 0.7" stroke="#ff78ba" class="ring womanchart">
                                            <animate attributeName="stroke-dashoffset" :to="getVal(female, 198)" dur="1s" fill="freeze"></animate>
                                        </circle>
                                        <circle :cx="genderWidth" :cy="genderWidth" :r="genderR" stroke="rgba(0,87,168,0.5)" fill="none" stroke-width="2"></circle>
                                        <circle :cx="genderWidth" :cy="genderWidth" :r="genderR * 0.75" stroke="rgba(0,87,168,0.5)" fill="none" stroke-width="2"></circle>
                                        <circle :cx="genderWidth" :cy="genderWidth" r="2" fill="#0057A8"></circle>
                                        <line :x1="genderWidth" :y1="genderWidth" :x2="genderWidth" y2="0" stroke="#0057A8"></line>
                                        <line :x1="genderWidth" :y1="genderWidth" :x2="endPoint[0]" :y2="endPoint[1]" stroke="#0057A8" class="endline"></line>
                                    </svg>
                                </div>
                                <div class="BP_info_1_nv">
                                    <img src="../../assets/hotel/woman.png" alt="">
                                    <div class="BP_info_1_nan_nv">{{Number(Number(1 - male)*100).toFixed(2)}}%</div>
                                </div>
                            </div>
                        </div>
                        <div class="BP_info_age">
                            <div class="BP_info_1_title">
                                <div class="BP_info_1_title_txt">年龄段</div>
                            </div>
                            <div class="BP_info_1_con" ref="BP_age">
                                
                            </div>
                        </div>
                    </div>
                    <div class="BP_info_2">
                        <div class="BP_info_2_title">
                            <div class="BP_info_2_title_con">
                                <div class="BP_info_1_title_txt">游客身份</div>
                            </div>
                            <div class="BP_info_2_title_line"></div>
                        </div>
                        <div class="BP_info_2_content ider">
                            <ul v-if="inResize">
                                    <li v-for="(i, idx) in list" :key="idx">
                                        <label>{{i.name}}</label>
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
                            <!-- <div class="BP_info_2_item" ref="BP_portrait_ec1"></div>
                            <div class="BP_info_2_item" ref="BP_portrait_ec2"></div>
                            <div class="BP_info_2_item" ref="BP_portrait_ec3"></div>
                            <div class="BP_info_2_item" ref="BP_portrait_ec4"></div> -->
                        </div>
                    </div>
                    <div class="BP_info_3">
                        <div class="BP_info_2_title">
                            <div class="BP_info_2_title_con">
                                <div class="BP_info_1_title_txt">子女阶段分布</div>
                            </div>
                            <div class="BP_info_2_title_line"></div>
                        </div>
                        <div class="BP_info_3_content" ref="BP_ageDistribution"></div>
                    </div>
                    <div class="BP_info_4">
                        <div class="BP_info_2_title">
                            <div class="BP_info_2_title_con">
                                <div class="BP_info_1_title_txt">游玩时长</div>
                            </div>
                            <div class="BP_info_2_title_line"></div>
                        </div>
                        <div class="BP_info_3_content playTime" ref="BP_playTime"></div>
                    </div>
                </div>
            </div>
            <div class="BP_right">
                <div class="BP_right_top">
                    <!-- 游客来源 -->
                    <div class="BP_lai">
                        <div class="BP_lai_title">
                            <div class="BP_info_title_txt">游客来源分布</div>
                        </div>
                        <div class="BP_lai_container">
                            <div class="BP_lai_container_1">
                                <div class="BP_selectElement">
                                    <el-select v-model="scenicNameSelectValue" placeholder="请选择" @change="selectScenicCome" 
                                            popper-class="mySelectStyle">
                                        <el-option
                                            v-for="(item,index) in listScinic"
                                            :key="index"
                                            :label="item.scenicName"
                                            :value="item.scenicName">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="BP_lai_container_echart" ref="tourist_lai"></div>
                            </div>
                        </div>
                    </div>
                    <!-- 去向 -->
                    <div class="BP_qu">
                        <div class="BP_qu_title">
                            <div class="BP_info_title_txt">游客去向分布</div>
                        </div>
                        <div class="BP_qu_container">
                            <div class="BP_lai_container_1">
                                <div class="BP_selectElement">
                                    <el-select v-model="scenicNameSelectValueLeave" placeholder="请选择" @change="selectScenicLeave" 
                                            popper-class="mySelectStyle">
                                        <el-option
                                            v-for="(item,index) in listScinic"
                                            :key="index"
                                            :label="item.scenicName"
                                            :value="item.scenicName">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="BP_lai_container_echart" ref="tourist_qu"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="BP_right_bottom">
                    <div class="BP_right_bottom_title">
                        <div class="BP_info_title_txt">各区域参观轨迹</div>
                    </div>
                    <div class="BP_right_bottom_echart">
                        <div class="BP_chooseData">
                            <div class="BP_chooseData_btn" @click="showCheck">
                                <img src="../../assets/hotel/chooseIcon.png" alt="">&nbsp;&nbsp;比较
                            </div>
                            <div class="BP_choose_list">
                                <div class="BP_choose_list_bg">
                                    <el-tag
                                        color="#0A5EA3"
                                        :hit="false"
                                        v-for="tag in checkedScinic"
                                        :key="tag"
                                        closable
                                        @close="closeScenic(tag)"
                                        type="info">
                                        {{tag}}
                                    </el-tag>
                                    
                                        <!-- @close="closeScenic(tag)" -->
                                </div>
                            </div>
                        </div>
                        <div class="BP_show_check" v-show="scenicCheck" @mouseleave="scenicLeave">
                            <el-checkbox-group v-model="checkedScinic" @change="checkScenicName" text-color="#fff">
                                <el-checkbox v-for="(item,index) in listScinic" :label="item.scenicName" :checked="item.checked" :key="index">{{item.scenicName}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <div class="BP_bottom_echarts" ref="visitScenicEchart"></div>
                    </div>
                </div>
            </div>
        </div>
           
    </div>
</template>

<script>
import headtop from '@/components/header/headtop';
import aa from '@/assets/xf_bj.json'
import qs from 'qs'
import moment from "moment"

const genderR = 45
function angle (an) {
    let r = 51
    let angle = Math.PI / 180 * an;
    let y = genderR + 5 +r*Math.sin(angle)    //线的角度
    let x = genderR + 5 +r*Math.cos(angle)

    return [x, y]
}
export default {
    components: {
        headtop
    },
    computed: {
        genderWidth () {
            return this.genderR + 5
        },
        endPoint () {
            return angle(360 * (this.female / 100))
        }
    },
    filters:{
        fixed(value){
            return value.toFixed(2)
        }
    },
    data(){
        return{
            pageTitle: '游客画像分析',
            inResize: true,
            list: [
                {
                    value: 0.4,
                    name: '已婚'
                },
                {
                    value: 0,
                    name: '携子'
                },
                {
                    value: 0,
                    name: '旅游达人'
                }
            ],
            genderR: 40,
            male: 0,
            female: 0,
            scenicCheck: false,
            mounthValue:  moment(new Date()).format('YYYY-MM'),
            touristComeEc: null,
            touristLeaveEc: null,
            genderEc: null,
            ageEc: null,
            portraitEc: null,
            ageDistributionEc: null,
            visitScenicEc: null,
            playTimeEc: null,
            newNodes: [],
            nodesData: [],
            playDayName: [],
            playDayData: [],
            ageDistriName: [],
            ageDistriData: [],
            checkedScinic: ['普陀山风景名胜区'],   //景区复选
            listScinic: [],   //景区复选
            scenicNameSelectValue: '',
            scenicNameSelectValueLeave: '',
            pickerOptions1: {
                disabledDate: (time) => {
                    return  time.getTime() > new Date(new Date().getTime()) || time.getTime() < new Date('2019-10-01').getTime();
                }
            }
        }
    },
    methods: {
        scenicLeave(){
            this.scenicCheck = false
        },
        getVal (val, max) {
            return max * (1 - val)
        },
        choseMonth(data){
            this.mounthValue = data
            this.touristCome()
            this.touristLeave()
            // this.gender()
            this.age()
            this.getIdentity()
            // this.reTravel()
            this.getAgePlay()
            this.getGuiji()
            this.inResize = false;
            var that = this
            setTimeout(() => {
                that.inResize = true
            }, 100);
        },
        // 游客来源
        async touristCome(){
            this.proInEc = this.$echarts.init(this.$refs.tourist_lai)
            this.proInEc.showLoading({textColor: '#fff',maskColor: 'rgba(255, 255, 255, 0)'})
            
            var res = await this.$http.post(
                `/analysis/findTouristSourceTarget`,
                qs.stringify({
                    queryTime: this.mounthValue,
                    // queryTime: this.mounthValue,
                    scenicName: this.scenicNameSelectValue,
                    type: '来源'
                })
            )
            let {data, code} = res.data

            let sortData = jsonSort(data, false)
            var dataAxis = [];
            var data1 = [];
            sortData.forEach((item)=>{
                dataAxis.push(item.name.replace('市', ''))
                data1.push(item.value)
            })
            if(code == 10000){
                this.proInEc.hideLoading()
            } else {
                this.proInEc.hideLoading()
            }
            
            var option = {
                title: {
                    show: data1.length == 0,
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
                    // z: 10
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
                        data: data1
                    }
                ]
            };
            this.proInEc.setOption(option);
            window.addEventListener('resize', this.resizeHandler)
        },
        async touristLeave(){
            this.touristLeaveEc = this.$echarts.init(this.$refs.tourist_qu)


            this.touristLeaveEc.showLoading({textColor: '#fff',maskColor: 'rgba(255, 255, 255, 0)'})
            
            var res = await this.$http.post(
                `/analysis/findTouristSourceTarget`,
                qs.stringify({
                    queryTime: this.mounthValue,
                    // queryTime: this.mounthValue,
                    scenicName: this.scenicNameSelectValueLeave,
                    type: '去向'
                })
            )
            let {data, code} = res.data
            let sortData = jsonSort(data, false)
            var dataAxis = [];
            var data1 = [];
            sortData.forEach((item)=>{
                dataAxis.push(item.name.replace('市', ''))
                data1.push(item.value)
            })
            if(code == 10000){
                this.touristLeaveEc.hideLoading()
            } else {
                this.touristLeaveEc.hideLoading()
            }
           
        
            var option = {
                title: {
                    show: data1.length == 0,
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
                        data: data1
                    }
                ]
            };
            this.touristLeaveEc.setOption(option);
            window.addEventListener('resize', this.resizeHandler)
        },
        async age(){
            this.ageEc = this.$echarts.init(this.$refs.BP_age)
            var res = await this.$http.post(
                `/tourist/findPortraitAttributeByJiguang`,
                qs.stringify({
                    queryTime: this.mounthValue
                })
            )
            let {data, code} = res.data
            if(data.length == 0){
                this.female = 0
                this.male = 0
            }
            let ageInfo = []
            let ageName = []
            let ageData = []
            let colorValue= []

            let ageRandom = []
            let ageRandomName = []
            let ageRandomData = []
            var that = this
            data.forEach(item=>{
                if(item.attribute == '16-25岁' || item.attribute == '26-35岁' || item.attribute == '36-45岁' || item.attribute == '大于46岁'){
                    ageInfo.push({name: item.attribute, value: item.percent})
                } else if(item.attribute == '婴幼儿' || item.attribute == '孕育期' || item.attribute == '青少年'){
                    ageRandom.push({name: item.attribute, value: item.percent})
                } else if(item.attribute == '女'){
                    this.female = Number(item.percent/100)
                }else if(item.attribute == '男'){
                    this.male = Number(item.percent/100)
                } else if(item.attribute == '已婚'){
                    var married = Number(item.percent/100).toFixed(2)
                    that.list[0].value = married
                }
            })
            let total = 0
            let totalColor = 0
            let ageTotal = 0
            // 年龄分布是否100%
            ageInfo.forEach((item)=>{
                total+= Number(Number(item.value).toFixed(2))
                ageName.push(item.name)
                ageData.push({name: item.name, value: Number(item.value).toFixed(2)})
                colorValue.push(Number(item.value)/100)
            })
            if(total < 100){
                ageData[ageData.length-1].value = (Number(ageData[ageData.length-1].value) + (100 - total)).toFixed(2)
            }
            colorValue.forEach(item=>{
                totalColor+= Number(item)
            })
            if(totalColor < 1){
                colorValue[colorValue.length - 1] = colorValue[colorValue.length - 1] + totalColor
            }

            // 年龄阶段分布是否100%
            this.ageDistriName = []
            this.ageDistriData = []
            ageRandom.sort(compare('value', false)).forEach(item=>{
                ageTotal += Number(Number(item.value).toFixed(2))
                this.ageDistriName.push(item.name)
                this.ageDistriData.push(Number(item.value).toFixed(2))
            })
            if(ageTotal < 100){
                this.ageDistriData[this.ageDistriData.length-1] = (Number(this.ageDistriData[this.ageDistriData.length-1]) + (100 - ageTotal)).toFixed(2)
            }

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
                    show: ageData.length == 0,
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
                    left: '57%',
                    top: '15%',
                    icon: "circle",
                    itemWidth: 7,  // 设置宽度
                    itemHeight: 7, // 设置高度
                    itemGap: 6,
                    textStyle: {
                        color: '#B2D2E3'
                    },
                    data: ageData,
                    formatter: function(params) {
                        var legendIndex = 0;
                        ageData.forEach(function (v, i) {
                            if (v.name == params) {
                                legendIndex = i;
                            }
                        });
                        return params + ":" + ageData[legendIndex].value +'%';
                    }
                },
                
                series: [
                    {
                        name: '统计',
                        type: 'gauge',
                        splitNumber: 10, //刻度数量
                        radius: '55%', //图表尺寸
                        center: ['35%', '50%'],
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
                        radius: ['62%', '64%'],
                        center: ['35%', '50%'],
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
                        data: ageData
                    }
                ]
            };
            this.ageEc.setOption(option)
            this.ageDistribution()
            window.addEventListener('resize', this.resizeHandler)
        },
        async getIdentity(){
            var res = await this.$http.post(
                `/tourist/findPortraitIdentity`,
                qs.stringify({
                    queryTime: this.mounthValue,
                })
            )
            let {data, code} = res.data
            // console.log(res)
            let married = 0
            let withChild = 0
            let tourismDr = 0
            var that = this
            for(var key in data){
                // if(key == 'married'){
                //     married = Number(data[key]).toFixed(2)
                //     that.list[0].value = married
                //     //  = {name: '已婚', value: married}
                // }
                    
                if(key == 'withChild'){
                    withChild = Number(data[key]).toFixed(2)
                    that.list[1].value =  withChild
                }
                if(key == 'tourismDr'){
                    tourismDr = Number(data[key]).toFixed(2)
                    that.list[2].value = tourismDr
                }
            }
        },
        // 重游率
        // async reTravel(){
        //     var res = await this.$http.post(
        //         `/tourist/findPortraitRevisit`,
        //         qs.stringify({
        //             queryTime: this.mounthValue
        //         })
        //     )
        //     let {data, code} = res.data
        //     var reData = Number(Number(data.revisitRatio)).toFixed(2)
        //     this.list[3].value = reData
        //     var marriageEchat = this.$refs.BP_portrait_ec4
        // },
        async getAgePlay(){
            var res = await this.$http.post(
                `/tourist/findTouristChildPeriodAndStayTime`,
                qs.stringify({
                    // queryTime: '2020-01'
                    queryTime: this.mounthValue
                })
            )
            let {data, code} = res.data
            this.playDayName = []
            this.playDayData = []
            var data11 = []
            var dataDay = []
            
            for(var key in data){
                if(key == '1天' || key == '2天' || key == '3天' || key == '4天'){
                    dataDay.push({name: key.replace('天', ''), value: data[key]})
                }
            }
            if(dataDay.length != 0){
                let dayTotal = 0
                var sortDay = dataDay.sort(compare('name', true))
                sortDay.forEach(item=>{
                    this.playDayName.push(item.name+'天'); 
                    this.playDayData.push({name: item.name+'天', value: Number(item.value).toFixed(2)})
                })
                this.playDayData.forEach(item=>{
                    dayTotal += Number(item.value)
                })
                console.log(dayTotal)
                if(dayTotal < 100){
                    this.playDayData[this.playDayData.length - 1].value = (Number(this.playDayData[this.playDayData.length - 1].value) + Number(100 - dayTotal)).toFixed(2)
                }else{
                    this.playDayData[this.playDayData.length - 1].value = (Number(this.playDayData[this.playDayData.length - 1].value) - Number(dayTotal - 100)).toFixed(2)
                }
            }
            this.playTime()
        },
        ageDistribution(){
            this.ageDistributionEc = this.$echarts.init(this.$refs.BP_ageDistribution)
            var yMax = 100;
            var dataShadow = [];
            for (var i = 0; i < this.ageDistriData.length; i++) {
                dataShadow.push(yMax);
            }
            let total = 0
            // ageData.forEach(item=>{
            //     total += item
            // })
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
                    left: '5%',
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
                        data : this.ageDistriName,
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
                            show: true,
                            textStyle: {
                                fontSize: 12,
                                color: '#BFE0FF',
                            },
                        },
                        axisTick: {       //y轴刻度线
                            show: false
                        },
                    },
                    {
                        show: true,
                        inverse: true,
                        data: this.ageDistriData,
                        axisLabel: {
                            formatter: function(data){
                                return data+'%'
                            },
                            textStyle: {
                                fontSize: 12,
                                color: '#0CE3DC',
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
                series : [
                    { // For shadow
                        type: 'bar',
                        barGap: '-100%',
                        barWidth: '40%',
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
                                color: '#0E304D',
                                borderColor: 'rgba(9,200,153,0.2)',
                                borderWidth: 0.6,
                                // color: '#f00'
                            }
                        }
                    },
                    {
                        name:'直接访问',
                        type:'bar',
                        barWidth: '40%',
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
                                // label: {
                                //     formatter: "{b}",
                                //     show: true,
                                //     position: "top",
                                //     textStyle: {
                                //         fontSize: 12,
                                //         color: "#BFE0FF"
                                //     }
                                // },
                                color: new this.$echarts.graphic.LinearGradient(
                                    0, 0, 1, 0,
                                    [
                                        {offset: 0, color: '#0D5EA0'},
                                        {offset: 1, color: '#05CBD7'}

                                    ]
                                ),
                            }
                        },
                        data: this.ageDistriData
                    }
                ]
            };
            this.ageDistributionEc.setOption(option);
            window.addEventListener('resize', this.resizeHandler)
        },
        playTime(){
            let lengeData = this.playDayData
            this.playTimeEc = this.$echarts.init(this.$refs.BP_playTime)
            var option = {
                color: ['#93CB44', '#14B2FF','#FF824A', '#4260FF'],
                title:{
                    show: this.playDayData.length == 0,//平常时设置为false，隐藏没有数据的文字提示
                    textStyle:{
                        color:'#bcbcbc'
                    },
                    text:'暂无数据',
                    left:'center',
                    top:'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b} : {c} %'
                },
                legend: {
                    orient: 'vertical',
                    left: '60%',
                    itemWidth: 10,
                    itemHeight: 8,
                    itemGap: 10,
                    textStyle:{
                        color: '#fff',
                        fontSize: 13
                    },
                    data: this.playDayName,
                    formatter: function(data){
                        var currIndex = 0
                        lengeData.forEach((item, i)=>{
                            if(item.name == data){
                                currIndex = i
                            }
                        })
                        return data +  lengeData[currIndex].value + '%'
                    },
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: ['32%', '47%'],
                        center: ['35%', '39%'],
                        
                        data: this.playDayData,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            this.playTimeEc.setOption(option);
            window.addEventListener('resize', this.resizeHandler)
        },
        visitScenic(){
            this.visitScenicEc = this.$echarts.init(this.$refs.visitScenicEchart)
            var option = {
                title:{
                    show: this.newNodes.length == 0,//平常时设置为false，隐藏没有数据的文字提示
                    textStyle:{
                        color:'#bcbcbc'
                    },
                    text:'暂无数据',
                    left:'center',
                    top:'center'
                },
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove'
                },
                animation: false,
                series: [
                    {
                        type: 'sankey',
                        focusNodeAdjacency: 'allEdges',
                        nodeAlign: 'left',
                        data: this.newNodes,
                        links: this.nodesData,
                        lineStyle: {
                            normal: {
                                color: '#fff',
                                // curveness: 0.9
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                fontSize: 14,
                                color: '#fff'
                            },
                        },
                    }
                ]
            };
          
            this.visitScenicEc.setOption(option);
            window.addEventListener('resize', this.resizeHandler)
        },
        // 显示复选框
        showCheck(){
            this.scenicCheck = !(this.scenicCheck)
        },
        // 获取景区
        async getScenic(){
            var res = await this.$http.get(
                `/scenic/findScenicListName`
            )
            let {data, code} = res.data
            data.forEach((item)=>{
                item.checked = false
            })
            this.listScinic = data
            this.scenicNameSelectValue = data[0].scenicName
            this.scenicNameSelectValueLeave = data[0].scenicName
            this.touristCome()  //根据景区名获取
            this.touristLeave()  //根据景区名获取
            // this.checkedScinic = data[0].scenicName    //默认轨迹
        },
        // select景区事件
        selectScenicCome(){
            this.touristCome()  //根据景区名获取
        },
        selectScenicLeave(){
            this.touristLeave()  //根据景区名获取
        },
        // 删除tag
        closeScenic(tag){
            // 删除数组内对应名称
            let nameIdx = this.checkedScinic.findIndex(item => item == tag);
            this.checkedScinic.splice(nameIdx, 1);
            this.getGuiji()
        },
        // 复选框
        checkScenicName(){
            this.getGuiji()
        },
        // 轨迹
        async getGuiji(){
            // 重新渲染轨迹图
            var res = await this.$http.post(
                `/analysis/findTouristVisitingTrace`,
                qs.stringify({
                    queryTime: '2020-01',
                    // queryTime: this.mounthValue,
                    scenicName: this.checkedScinic.join(','),
                })
            )


            let {data, code} = res.data
            console.log(res)
            let guijiLinkSou = []
            let nodes = []
            let nodesData = []
            var that = this
            // data.map(item =>{
            //     that.checkedScinic.map(items => {
            //         if(item.linkSource == items){
            //             guijiLinkSou.push(item)
            //         }
            //     })
            // })
            data.forEach((item)=>{
                nodes.push({name:item.source})
                nodes.push({name:item.target})
                nodesData.push({source: item.source, target: item.target, value: item.value})
            })
            var newNodes = [];
            var obj = {};
            for(var i =0; i<nodes.length; i++){
                if(!obj[nodes[i].name]){
                    newNodes.push(nodes[i]);
                    obj[nodes[i].name] = true;
                }
            }
            this.newNodes = newNodes
            this.nodesData = nodesData
            console.log(this.newNodes)
            console.log(this.nodesData)
            this.visitScenic()
        },
        resizeHandler(){
            this.proInEc.resize()
            this.touristLeaveEc.resize()
            this.genderEc.resize()
            this.ageEc.resize()
            this.portraitEc.resize()
            this.ageDistributionEc.resize()
            this.visitScenicEc.resize()
            this.playTimeEc.resize()
        },
    },
    mounted(){
        this.getScenic()
        this.getAgePlay()
        this.getGuiji()
        // this.touristCome()
        // this.touristLeave()
        // this.gender()
        this.age()
        // this.marriage()
        // this.child()
        // this.travelPerson()
        // this.reTravel()
        // this.ageDistribution()
        this.getIdentity()
        this.visitScenic()
        // this.playTime()
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
    
    .basicPortrait .el-tag.el-tag--info{
        color: #FEFEFE;
    }
    .basicPortrait .tag{
        padding: 0 5px 0 2px;
    }
    .basicPortrait .el-tag, .el-tag.el-tag--info{
        border: none;
        color: #FEFEFE;
        margin-left: 2px;
    }
    .basicPortrait .el-tag.el-tag--info.el-tag--light{
        color: #fff;
    }
    .basicPortrait .el-icon-close:before{
        color: #fff;
    }
    .total_date1_basic .el-icon-date:before{
        background: url('../../assets/hotel/date_icon.png') no-repeat;
        background-size: 100% 100%;
        width: 21px;
        height: 21px;
        position: absolute;
        top: 14px;
        left: 0;
        margin-right: 2px;
    }
    .total_date1_basic .el-icon-date:before{
        content: '';
    }
    .el-picker-panel.down_date{
        background-color: #072342;
    }
    .total_date1_basic .el-date-editor.el-input{
        width: 130px;
        cursor: pointer;
    } 
    .total_date1_basic .el-date-editor.el-input input{
        background-color: transparent;
        color: #ABCBFF;
        cursor: pointer;
        border: none;
    }
    .total_date1_basic .el-input__prefix{
        left: 46px;
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
    .el-select-dropdown.mySelectStyle, .el-select-dropdown.mySelectStyle .el-select-dropdown__list{
        background-color: #082343;
    }
    .el-select-dropdown.mySelectStyle .el-select-dropdown__item{
        color: #9EBAD0;
        background-color: #082343;
    }
    .el-select-dropdown.mySelectStyle .el-select-dropdown__item.hover{
        background-color: #082343;
        color: #eee;
    }
    .el-select-dropdown.mySelectStyle{
        border: 1px solid rgba(21, 129, 218, 1);
    }
    .BP_selectElement .el-input__inner{
        /* background-color: #082343; */
        background: url('../../assets/hotel/P_scenic_bj.png') no-repeat;
        background-size: 100% 100%;
        text-align: center;
        border: none;
        padding: 0 5px;
        color: #9EBAD0;
    }
    .el-select{
        height: 30px;
    }
    .el-checkbox{
        /* background-color: #fff; */
        color: #fff;
    }
    
    .ider{
        width: 100%;
    }
    .ider ul{
        /* position: absolute; */
        display: flex;
        width: 100%;
        height: 100%;
    }
    .ider ul li{
        float: left;
        width: 25%;
        height: 110px;
        position: relative;
        /* position: absolute;
        left: 0;
        top: 0; */
        font-size: 12px;
    }
    .ider ul li label{
        width: 25px;
        height: 16px;
        color: #fff;
        display: block;
        text-align: center;
        position: absolute;
        writing-mode: vertical-lr;
        bottom: -20px;
        left: 50%;
        margin-left: -13px;
        /* transform: translate(-50%); */
    }
    .ider ul li img{
        display: block;
        width: 110px;
        /* width: auto; */
        height: 110px;
        margin: 0 auto;
        /* position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%); */
    }
    .ider ul li .pie{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

    }
    .ider ul li:nth-child(1) img, .ider ul li:nth-child(3) img{
        -webkit-animation: mapRotateColor 3.7s 1s linear infinite;
        /* left: 117px;
        top: 7px; */
    }
    .ider ul li:nth-child(2) img, .ider ul li:nth-child(4) img{
        -webkit-animation: mapRotateColor1 3.7s 1s linear infinite;
    }
    .ider ul li p{
        text-align: center;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: #0CE3DC;
    }
    .ider circle{
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
    .total_date1_basic{
        /* width: 20%; */
        width: 188px;
        height: 48px;
        position: absolute;
        cursor: pointer;
        top: 0px;
        right: 20px;
        z-index: 999;
    }
    .total_date1_basic input{
        width: 188px;
        height: 48px;
        text-align: center;
        color: #ABCBFF;
        background: url('../../assets/hotel/dateBj.png') no-repeat;
        background-size: 100% 100%;
    }

    .BP_nav{
        width: 141px;
        height: 45px;
        position: absolute;
        top: 50%;
        left: 50px;
        margin-top: -22px;
    }
    .basicPortrait{
        width: 100%;
        height: 100%;
        background: url('../../assets/hotel/F_bg.jpg') no-repeat;
        background-size: 100% 100%;
        font-family: 'PingFang SC';
        overflow: hidden;
    }
    .BP_title{
        width: 100%;
        height: 8.61%;
        /* background: url('../../assets/hotel/pass_title.png') no-repeat;
        background-size: 100% 100%; */
        position: relative;
    }
    .BP_selectElement{
        width: 160px;
        height: 30px;
        position: absolute;
        top: 5px;
        right: 15px;
        z-index: 666;
    }
    .BP_title_txt{
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
    .BP_container{
        width: 100%;
        height: 91.38%;
        box-sizing: border-box;
        position: relative;
        padding: 8px 20px 20px 20px;
        box-sizing: border-box;
    }
    .BP_left{
        float: left;
        width: 36.5%;
        height: 100%;
        background: url('../../assets/hotel/F_r1.png') no-repeat;
        background-size: 100% 100%;
    }
    .BP_info_title{
        width: 100%;
        height: 5.7%;
        background: url('../../assets/hotel/F_c1_title.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
        margin-top: 3px;
    }
    .BP_info_title_txt{
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
    .BP_info_container{
        width: 100%;
        height: 94.3%;
        padding: 0 30px 0 25px;
        box-sizing: border-box;
    }
    .BP_info_1{
        width: 100%;
        height: 28.8%;
    }
    .BP_info_gender, .BP_info_age{
        width: 50%;
        height: 100%;
        float: left;
    }
    .BP_info_1_title{
        width: 165px;
        height: 38px;
        margin-top: 20px;
        background: url('../../assets/hotel/BP_info_title.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
    }
    .BP_info_1_title_txt{
        width: 100%;
        height: 22px;
        line-height: 22px;
        text-align: center;
        position: absolute;
        top: 50%;
        margin-top: -11px;
        font-size: 14px;
        color: #B2D2E3;
        font-weight:bold;
    }
    .BP_info_1_con{
        width: 100%;
        height: calc(100% - 58px);
    }
    .BP_info_1_con.gender{
        width: 235px;
        margin: 0 auto;
    }
    .BP_info_1_nan, .BP_info_1_nv{
        width: 60px;
        height: 100%;
        float: left;
        padding-top: 35px;
        box-sizing: border-box;
    }
    .BP_info_1_nan img, .BP_info_1_nv img{
        width: 42px;
        height: 79px;
        margin: 0 auto;
        display: block;
    }
    .BP_info_1_nan_data, .BP_info_1_nan_nv{
        width: 100%;
        height: 16px;
        text-align: center;
        color: #48BBF9;
    }
    .BP_info_1_nan_nv{
        color: #FD78B9;
    }
    .BP_info_1_echart{
        width: 100px;
        /* width: calc(100% - 145px); */
        height: 100%;
        float: left;
        position: relative;
    }
    .BP_info_1_echart svg{
        position: absolute;
        top: 50%;
        margin-top: -45px;
    }
    .ring{
        fill: none;
        stroke-width: 4;
    }
    .manchart {
        stroke-dasharray: 251;
        stroke-dashoffset: 0;
        /* transform: rotatez(-90deg);
        transform-origin: 52px; */
    }
    .womanchart {
        stroke-dasharray: 198;
        stroke-dashoffset: 198;
        /* transform: rotatez(-90deg);
        transform-origin: 57px; */
    }
    /* .endline{
        transform: rotate(-90deg);
        transform-origin:50px;
    } */
    .BP_info_2{
        width: 100%;
        height: 25.7%;
    }
    .BP_info_2_title{
        width: 100%;
        height: 38px;
        position: relative;
    }
    .BP_info_2_title_con{
        width: 165px;
        height: 38px;
        background: url('../../assets/hotel/BP_info_title.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
        float: left;
    }
    .BP_info_2_title_line{
        float: left;
        width: calc(100% - 167px);
        height: 0px;
        border-bottom: 2px dashed #006AA6;
        position: absolute;
        top: 18px;
        left: 167px;
    }
    .BP_info_2_content, .BP_info_3_content{
        width: 100%;
        height: calc(100% - 38px);
        padding: 20px 0 30px 0;
        box-sizing: border-box;
        display: flex;
    }
    .BP_info_2_content{
        padding: 0 0 15px 0;
        box-sizing: border-box;
    }
    .BP_info_3_content{
        padding: 0;
    }
    .BP_info_3_content.playTime{
        width: 80%;
        height: calc(100% - 38px);
        margin: 0 auto;
    }
    .BP_info_2_item{
        flex: 1;
    }
    .BP_info_3{
        width: 100%;
        height: 21.3%;
    }
    .BP_info_4{
        width: 100%;
        height: 24.2%;
    }
    .BP_right{
        width: calc(63.4% - 20px);
        height: 100%;
        float: left;
        margin-left: 20px;
    }
    .BP_right_top{
        width: 100%;
        height: 49.4%;
    }
    .BP_lai, .BP_qu{
        height: 100%;
        width: 49.39%;
        float: left;
        background: url('../../assets/hotel/BP_lai_qu.png') no-repeat;
        background-size: 100% 100%;
    }
    .BP_qu{
        width: calc(50.5% - 20px);
        margin-left: 20px;
    }
    .BP_lai_title, .BP_qu_title{
        width: 100%;
        height: 12.17%;
        background: url('../../assets/hotel/BP_lai.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
    }
    .BP_qu_title{
        background: url('../../assets/hotel/BP_qu.png') no-repeat;
        background-size: 100% 100%;
    }
    .BP_lai_container, .BP_qu_container{
        width: 100%;
        height: 87.8%;
    }
    .BP_lai_container_1{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .BP_lai_container_echart{
        width: 100%;
        height: 100%;
        padding-top: 40px;
        box-sizing: border-box;
    }
    .BP_right_bottom{
        width: 100%;
        height: calc(50.5% - 20px);
        margin-top: 20px;
        background: url('../../assets/hotel/BP_right_bottom.png') no-repeat;
        background-size: 100% 100%;
    }
    .BP_right_bottom_title{
        width: 100%;
        height: 12.17%;
        background: url('../../assets/hotel/BP_right_bottom_tit.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
    }
    .BP_right_bottom_echart{
        width: 100%;
        height: 87.8%;
        padding: 0 30px;
        box-sizing: border-box;
        position: relative;
    }
    .BP_show_check{
        width: 166px;
        height: 220px;
        border-radius: 5px;
        position: absolute;
        top: 47px;
        left: 23px;
        background-color: #082343;
        color: #9EBAD0;
        padding-top: 7px;
        padding-left: 7px;
        box-sizing: border-box;
        border: 1px solid #9EBAD0;
        z-index: 666;
    }
    .BP_show_check .el-checkbox__label{
        font-size: 12px;
        color: #ABCBFF;
    }
    .BP_chooseData{
        width: 100%;
        height: 42px;
        margin-top: 25px;
    }
    .BP_chooseData_btn{
        width: 80px;
        height: 100%;
        line-height: 42px;
        color: #ABCBFF;
        font-size: 16px;
        float: left;
        cursor: pointer;
    }
    .BP_chooseData_btn img{
        width: 20px;
        height: 20px;
        display: inline-block;
        vertical-align: middle;
    }
    .BP_choose_list{
        width: calc(100% - 100px);
        height: 42px;
    }
    .BP_choose_list_bg{
        width: 85%;
        height: 42px;
        float: left;
        background:rgba(8,63,108,0.66);
        border:1px solid rgba(21, 129, 218, 1);
        padding-top: 5px;
        box-sizing: border-box;
    }
    .BP_bottom_echarts{
        width: 100%;
        height: calc(100% - 67px);
        padding-bottom: 10px;
        box-sizing: border-box;
    }
    @media screen and (max-width: 1400px) {
        .BP_info_1_nan, .BP_info_1_nv{
            padding-top: 0;
        }
        .BP_info_1_nan img, .BP_info_1_nv img{
            width: 36px;
            height: 68px;
        }
        .BP_selectElement{
            width: 160px;
        }
        .BP_selectElement .el-input__inner{
            height: 33px;
        }
        .BP_info_1_title{
            margin-top: 10px;
        }
        .BP_info_1_title, .BP_info_2_title_con{
            width: 140px;
            height: 30px;
        }
        .BP_selectElement{
            top: 13px;
        }
        .BP_choose_list_bg{
            height: 29px;
        }
        .BP_chooseData{
            margin-top: 11px;
        }
        .BP_chooseData_btn{
            line-height: 28px;
        }
        /* .ider ul li img{
            width: 80px;
            height: 80px;
            display: block;
        } */
        .ider ul li label{
            bottom: -10px;
        }
    }
</style>