<template>
    <div class="hotel_bg app-main">
        <div class="hotel_title">
            <!-- <headtop :title='pageTitle'/> -->
            <div class="hotel_title_txt" @click="app-main">旅游饭店监测系统</div>
            <div class="hotel_date">
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
        <div class="hotel_container">
            <el-row :gutter="20" class="h100 w100">
                <!-- left -->
                <el-col  :lg="6" :xl="6" class="h100">
                    <div class="grid-content bg-purple">
                        <div class="hotel_count">
                            <div class="hotel_sun_title_bg">
                                <div class="hotel_sun_title_txt">基础数据概况</div>
                            </div>
                            <div class="hotel_count_content">
                                <div class="hotel_count_content_top">
                                    <div class="hotel_count_content_top1">
                                        <div class="hotel_count_content_top1_total">总人数</div>
                                        <div class="hotel_count_content_top1_detail">
                                            <div class="hotel_count_content_top1_detail_txt">{{guestTotal}}</div>
                                        </div>
                                    </div>
                                    <div class="hotel_count_content_top2">
                                        <div class="hotel_count_content_top2_top">
                                            <div class="hotel_count_content_top2_top_detail">外宾人数</div>
                                        </div>
                                        <div class="hotel_count_content_top2_bottom">
                                            <div class="hotel_count_content_top2_top_detail">{{guestOut}}</div>
                                        </div>
                                    </div>
                                    <div class="hotel_count_content_top3">
                                        <div class="hotel_count_content_top2_top">
                                            <div class="hotel_count_content_top2_top_detail">内宾人数</div>
                                        </div>
                                        <div class="hotel_count_content_top2_bottom">
                                            <div class="hotel_count_content_top2_top_detail">{{guestIn}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="hotel_count_content_bottom">
                                    <div class="hotel_count_content_bottom1">
                                        <div class="hotel_count_content_bottom1_total">酒店总数</div>
                                        <div class="hotel_count_content_bottom1_detail">
                                            <div class="hotel_count_content_bottom1_detail_txt">{{hotelTotal}}</div>
                                        </div>
                                    </div>
                                    <div class="hotel_count_content_bottom2">
                                        <div class="hotel_count_content_bottom1_total">房间总数</div>
                                        <div class="hotel_count_content_bottom1_detail">
                                            <div class="hotel_count_content_bottom1_detail_txt">{{houseTotal}}</div>
                                        </div>
                                    </div>
                                    <div class="hotel_count_content_bottom3">
                                        <div class="hotel_count_content_bottom1_total">床位总数</div>
                                        <div class="hotel_count_content_bottom1_detail3">
                                            <div class="hotel_count_content_bottom1_detail_txt">{{bedTotal}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 资源统计 -->
                        <div class="hotel_resource">
                            <div class="hotel_sun_title_bg">
                                <div class="hotel_sun_title_txt">省内外游客占比</div>
                            </div>
                            <div class="hotel_sun_title_content" ref="resourceE"></div>
                        </div>
                        <!-- 境外游客 -->
                        <div class="hotel_abroadTop5">
                            <div class="hotel_sun_title_bg hotel_title_283">
                                <div class="hotel_sun_title_txt">境外游客来源地Top5</div>
                            </div>
                            <div class="hotel_abroadTop5_content" ref="abroadTop5"></div>
                        </div>
                    </div>
                </el-col>
                <!-- center -->
                <el-col  :lg="12" :xl="12" class="h100">
                    <div class="grid-content bg-purple-light">
                        <!-- map F_c1_title -->
                        <div class="hotel_map">
                            <div class="hotel_map_mapBall"></div>
                            <div class="hotel_map_aperture"></div>
                            <div class="hotel_map_haveColor"></div>
                            <div class="hotel_map_noColor"></div>
                        </div>
                        <!-- 酒店基础数据对比 -->
                        <div class="hotel_hotel">
                            <div class="hotel_sun_title_bg_c1">
                                <div class="hotel_sun_title_txt">入住明细趋势图</div>
                            </div>
                            <div class="hotel_hotel_container" ref="hotelData"></div>
                        </div>
                    </div>
                </el-col>
                <!-- right -->
                <el-col  :lg="6" :xl="6" class="h100">
                    <div class="grid-content bg-purple">
                        <!-- 国内 -->
                        <div class="grid_chinaIn">
                            <div class="hotel_sun_title_bg">
                                <div class="hotel_sun_title_txt">国内游客分析</div>
                            </div>
                            <div class="hotel_proOutTop5_content" >
                                <div class="grid_chinaIn_btn">
                                    <div class="grid_chinaIn_btn_list">
                                        <div class="grid_chinaIn_btn_item" 
                                        v-for="(item, index) in chinaInList" :key="index" 
                                        :class="{active: chinaInIndex == index}"
                                        @click="chinafn(index)">{{item}}</div>
                                    </div>
                                </div>
                                <!-- 年龄 -->
                                <div class="grid_chinaIn_echart" ref="hotel_age" v-show="ageShow "></div>
                                <div class="grid_chinaIn_echart" v-show="genderShow">
                                    <div class="gender-area">
                                        <div class="woman">
                                            <img src="@/assets/img/portrait/man.png" alt="">
                                            <p>{{(male * 10000) / 100 | fixed}}%</p>
                                        </div>
                                        <div class="chart" v-if="inResize">
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
                                        <div class="woman">
                                            <img src="@/assets/img/portrait/woman.png" alt="">
                                            <p>{{(female * 10000) / 100 | fixed}}%</p>
                                        </div>
                                        <div class="decoration"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 境外 -->
                        <div class="grid_chinaOut">
                            <div class="hotel_sun_title_bg">
                                <div class="hotel_sun_title_txt">境外游客分析</div>
                            </div>
                            <div class="hotel_proOutTop5_content" >
                                <div class="grid_chinaIn_btn">
                                    <div class="grid_chinaIn_btn_list">
                                        <div class="grid_chinaIn_btn_item" 
                                        v-for="(item, index) in chinaInList" :key="index" 
                                        :class="{active: chinaOutIndex == index}"
                                        @click="chinaOutfn(index)">{{item}}</div>
                                    </div>
                                </div>
                                <!-- 年龄 -->
                                <div class="grid_chinaIn_echart" ref="chinaOut_age" v-show="ageOutShow "></div>
                                <div class="grid_chinaIn_echart" v-show="genderOutShow">
                                    <div class="gender-area">
                                        <div class="woman">
                                            <img src="@/assets/img/portrait/man.png" alt="">
                                            <p>{{(maleOut * 10000) / 100 | fixed}}%</p>
                                        </div>
                                        <div class="chart"  v-if="inResize">
                                            <svg :width="genderR * 2 + 10" :height="genderR * 2 + 10" version="1.1"  class="pie"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                <circle :cx="genderWidth" :cy="genderWidth" :r="genderR - 5" stroke="#08b0ff" class="ring manchart">
                                                    <animate attributeName="stroke-dashoffset" :to="-getVal(maleOut, 251)" dur="1s" fill="freeze"></animate>
                                                </circle>
                                                <circle :cx="genderWidth" :cy="genderWidth" :r="genderR * 0.7" stroke="rgba(0,87,168,0.1)" class="ring"></circle>
                                                <circle :cx="genderWidth" :cy="genderWidth" :r="genderR * 0.7" stroke="#ff78ba" class="ring womanchart">
                                                    <animate attributeName="stroke-dashoffset" :to="getVal(femaleOut, 198)" dur="1s" fill="freeze"></animate>
                                                </circle>
                                                <circle :cx="genderWidth" :cy="genderWidth" :r="genderR" stroke="rgba(0,87,168,0.5)" fill="none" stroke-width="1"></circle>
                                                <circle :cx="genderWidth" :cy="genderWidth" :r="genderR * 0.75" stroke="rgba(0,87,168,0.5)" fill="none" stroke-width="1"></circle>
                                                <circle :cx="genderWidth" :cy="genderWidth" r="2" fill="#0057A8"></circle>
                                                <line :x1="genderWidth" :y1="genderWidth" :x2="genderWidth" y2="0" stroke="#0057A8"></line>
                                                <line :x1="genderWidth" :y1="genderWidth" :x2="endPoint[0]" :y2="endPoint[1]" stroke="#0057A8" class="endline"></line>
                                            </svg>
                                        </div>
                                        <div class="woman">
                                            <img src="@/assets/img/portrait/woman.png" alt="">
                                            <p>{{(femaleOut * 10000) / 100 | fixed}}%</p>
                                        </div>
                                        <!-- <div class="decoration"></div> -->
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 省外top5 -->
                        <div class="hotel_proOutTop5">
                            <div class="hotel_sun_title_bg hotel_title_283">
                                <div class="hotel_sun_title_txt">省外游客来源地Top5</div>
                            </div>
                            <div class="hotel_proOutTop5_content" ref="proOut"></div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import headtop from '@/components/header/headtop';
import moment from "moment"
import qs from 'qs'
import html2PDF from 'html2canvas'

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
        return{
            inResize: true,
            pageTitle: '旅游饭店监测系统',
            chinaInList: ['年龄分布', '性别分布'],
            genderR: genderR,
            mounthValue:  moment(new Date()).format('YYYY-MM'),
            male: 0,
            female: 0,
            maleOut: 0,
            femaleOut: 0,
            chinaInIndex: 0,
            chinaOutIndex: 0,
            ageShow: true,
            genderShow: false,
            ageOutShow: true,
            genderOutShow: false,
           resourceE: null,
           abroadTop5E: null,
           proOutE: null,
           hotelDataE: null,
           touristVE: null,
           ageEc: null,
           chinaOutEc: null,
           hotelTotal: 0,
           houseTotal: 0,
           bedTotal: 0,  //床位
           guestIn: 0,
           guestOut: 0,
           guestTotal: 0,
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
        choseMonth(data){
            this.mounthValue = data
            this.resource()
            this.proOut()
            this.abroadTop()
            this.getGenserIn()
            this.getGenserOut()
            this.chinaInAge()
            this.chinaOutAge()
            this.chinafn()
            this.chinaOutfn()
            // this.resource()
            this.abroadTop()
            this.hotelData()
            this.guest()
            this.baseInfo()
            this.inResize = false;
            var that = this
            setTimeout(() => {
                that.inResize = true
            }, 100);
        },
        async getGenserIn(){
            var res = await this.$http.get(
                `/base/getTouristsSexByNeiWaiBing?peopleType=境内&rdate=${this.mounthValue}`
            )
            let {data} = res.data
            this.female = 0
            this.male = 0
            if(data.length != 0){
                var total = 0
                data.forEach((item, index)=>{
                    if(item.xb == '女'){this.female = item.count / (data[0].count+data[1].count)}
                    if(item.xb == '男'){this.male = item.count / (data[0].count+data[1].count)}
                })
            }
        },
        async getGenserOut(){
            var res = await this.$http.get(
                `/base/getTouristsSexByNeiWaiBing?peopleType=境外&rdate=${this.mounthValue}`
            )
            let {data} = res.data
            this.maleOut = 0
            this.femaleOut = 0
            if(data.length != 0){
                var total = 0
                data.forEach((item, index)=>{
                    if(item.xb == '女'){this.maleOut = item.count / (data[0].count+data[1].count)}
                    if(item.xb == '男'){this.femaleOut = item.count / (data[0].count+data[1].count)}
                })
            }
        },
        // 国内
        getVal (val, max) {
            return max * (1 - val)
        },
        chinafn(index){
            this.chinaInIndex = index
            if(index == 0){ this.ageShow = true; this.genderShow = false; this.chinaInAge()}
            if(index == 1){ this.ageShow = false; this.genderShow = true;}
        },
        async chinaInAge(){
            var res = await this.$http.get(
                `/base/getTouristsAge?peopleType=境内&rdate=${this.mounthValue}`
            )
            let {data} = res.data
            console.log(data)
            var dataAxis = [];
            var data1 = [];
            var sortData =jsonSort(data, false)
            if(sortData.length != 0){
                sortData.forEach(item=>{
                    dataAxis.push(item.name)
                    data1.push(item.value)
                })
            }
            this.age(dataAxis, data1, this.$refs.hotel_age)
        },
        age(dataAxis, data1, refsData){
            this.ageEc = this.$echarts.init(refsData)
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
                    formatter: '{b} {c}'
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
                        top: '18%',
                        left: '18%',
                        bottom: '17%',
                        right: '5%',
                    }
                ],
                yAxis: {
                    type: 'value',
                    name: '人        ',
                    nameGap: 7,
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
                                        {offset: 0, color: '#05CBD7'},
                                        {offset: 1, color: '#0D5EA0'}

                                    ]
                                ),
                                label: {
                                    show: true,
                                    position: 'top',
                                    formatter: "{c}",
                                    textStyle: {
                                        color: '#C2E2F8',
                                        fontSize: 12   //柱形图每个柱上边的标注
                                    },
                                },
                            },
                            
                        },
                        data: data1
                    }
                ]
            };
            this.ageEc.setOption(option)
            window.addEventListener('resize', this.resizeHandler)
        },
        // 境外
        chinaOutfn(index){
            this.chinaOutIndex = index
            if(index == 0){ this.ageOutShow = true; this.genderOutShow = false; this.chinaOutAge()}
            if(index == 1){ this.ageOutShow = false; this.genderOutShow = true;}
        },
        // 境外年龄
        async chinaOutAge(){
            var res = await this.$http.get(
                `/base/getTouristsAge?peopleType=境外&rdate=${this.mounthValue}`
            )
            let {data} = res.data
            var dataAxis = [];
            var data1 = [];
            var sortData =jsonSort(data, false)
            if(sortData.length != 0){
                sortData.forEach(item=>{
                    dataAxis.push(item.name)
                    data1.push(item.value)
                })
            }
            var that = this
            this.age(dataAxis, data1, this.$refs.chinaOut_age)
           
        },
        // 获取床位
        async baseInfo(){
            this.hotelTotal = 0
            this.houseTotal = 0
            this.bedTotal = 0
            var res = await this.$http.get(
                `/base/getHotelData?rdate=${this.mounthValue}`
            )
            console.log(res)
            let {data} = res.data
            console.log(data.length)
            if(data[0] != null){
                this.hotelTotal = data[0].hotelNum
                this.houseTotal = data[0].roomNum
                this.bedTotal = data[0].badNum
            }
        },
        // 获取内外宾
        async guest(){
            var res = await this.$http.get(
                `/base/getTouristsType?rdate=${this.mounthValue}`
            )
            console.log(res)
            let {data} = res.data
            this.guestTotal = 0
            this.guestIn = 0
            this.guestOut = 0
            if(data.length != 0){
                data.forEach(element => {
                    this.guestTotal += Number(element.count)
                    if(element.nwblx == '内宾'){this.guestIn = element.count}
                    if(element.nwblx == '外宾'){this.guestOut = element.count}
                });

            }
        },
        // 省内
        async resource(){
            this.resourceE = this.$echarts.init(this.$refs.resourceE)
            this.resourceE.showLoading({textColor: '#fff',maskColor: 'rgba(255, 255, 255, 0)'})

            var res = await this.$http.get(
                `/base/getOutAndInProvinceCount?rdate=${this.mounthValue}`
            )
            let {data, code} = res.data
            // console.log(res)
            var resourceName = []
            var resourceDate = []
            var totalProIn = 0
            for(var key in data){
                if(data[key] != 0){
                    resourceName.push(key.replace('人数', ''))
                    resourceDate.push({name: key.replace('人数', ''), value: data[key]})
                    totalProIn += Number(data[key])
                }
            }
            if(code == 10000){
                this.resourceE.hideLoading()
            } else {
                this.resourceE.hideLoading()
            }

            var option = {
                title:{
                    show: resourceDate.length == 0,//平常时设置为false，隐藏没有数据的文字提示
                    textStyle:{
                        color:'#bcbcbc'
                    },
                    text:'暂无数据',
                    left:'center',
                    top:'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b} : {c} 人'
                },
                legend: {
                    orient: 'vertical',
                    x: '75%',
                    // top: '3%',
                    bottom: '40%',
                    itemWidth: 10,  // 设置宽度
                    itemHeight: 10, // 设置高度
                    itemGap: 15,
                    textStyle:{
                        color: '#fff',
                        fontSize: 14
                    },
                    data: resourceName
                },
                toolbox: {
                    show: true,
                    
                },
                grid: {
                    top: '5%',
                    bottom: '10%'
                },
                series: [
                    {
                        name: '半径模式',
                        type: 'pie',
                        radius: [30, 40],
                        center: ['44%', '50%'],
                        // roseType: 'radius',
                        label: {
                            show: true,
                            // textStyle: {
                            //     color: '#CBEAFF'
                            // },
                            // formatter: '{b}{c}'
                            formatter: function(data){
                                // console.log(data)
                                return data.name + Number((data.value / totalProIn)*100).toFixed(2) +'%'
                            }
                        },
                        labelLine: {
                            normal:{  
                                length: 5,
                                // lineStyle: {
                                //     color: "#CBEAFF"  // 改变标示线的颜色
                                // }
                            }
                        },
                        emphasis: {
                            label: {
                                show: true
                            }
                        },
                        data: resourceDate,
                        color: ['#F4A305','#33C6EB']
                    },
                ]
            };
            this.resourceE.setOption(option);
            window.addEventListener('resize', this.resizeHandler)
        },
        // 境外
        async abroadTop(){
            this.abroadTop5E = this.$echarts.init(this.$refs.abroadTop5)
            this.abroadTop5E.showLoading({textColor: '#fff',maskColor: 'rgba(255, 255, 255, 0)'})
            var res = await this.$http.get(
                `/base/getForginerHotel?rdate=${this.mounthValue}`
            )
            let {data, code} = res.data
            // console.log(res)
            var dataAxis = [];
            var outData = [];
            var top5 = data.sort(compare('count', false)).slice(0,5)
            var sortData = top5.sort(compare('count', true))
            sortData.forEach(item =>{
                dataAxis.push(item.lydmc)
                outData.push(item.count)
            })
            var yMax = Math.max(...outData)+10;
            var dataShadow = [];
            for (var i = 0; i < data.length; i++) {
                dataShadow.push(yMax);
            }

            if(code == 10000){
                this.abroadTop5E.hideLoading()
            } else {
                this.abroadTop5E.hideLoading()
            }
            var option = {
                title: {
                    text: data.length == 0 ? '暂无数据' : '单位: 人',
                    x: data.length == 0 ? 'center' : '70%',
                    y: data.length == 0 ? 'center' : '5%',
                    textStyle: {
                        color: data.length == 0 ? '#bcbcbc' : '#B3D4F2',
                        fontWeight: data.length == 0 ? 600 :  400,
                        fontSize: data.length == 0 ? 16 : 14
                    }
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: '{b} {c}'
                },
                xAxis: {
                    type: 'value',
                    axisLabel: {
                        textStyle: {
                            color: '#5583AE'
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
                    z: 10
                },
                grid: [
                    {
                        top: '20%',
                        left: '20%',
                        bottom: '20%',
                        right: '20%',
                    }
                ],
                yAxis: {
                    type: 'category',
                    data: dataAxis,
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
                            color: '#5583AE'
                        }
                    },
                    splitLine: {
                        show: false,//网格线
                    },
                },
                dataZoom: [
                    {
                        type: 'inside'
                    }
                ],
                series: [
                    { // For shadow
                        type: 'bar',
                        itemStyle: {
                            color: 'rgba(0,39,71,1)'
                        },
                        barGap: '-100%',
                        barCategoryGap: '40%',
                        data: dataShadow,
                        animation: false
                    },
                    {
                        type: 'bar',
                        itemStyle: {
                            normal:{
                                color: new this.$echarts.graphic.LinearGradient(
                                    0, 0, 1, 0,
                                    [
                                        {offset: 0, color: '#0D5EA0'},
                                        {offset: 1, color: '#05CBD7'}

                                    ]
                                ),
                                label: {
                                    show: true,
                                    position: 'right',
                                    textStyle: {
                                        color: '#CBEAFF',
                                        fontSize: 12   //柱形图每个柱上边的标注
                                    },
                                },
                            },
                            
                        },
                        data: outData
                    }
                ]
            };
            this.abroadTop5E.setOption(option);
            window.addEventListener('resize', this.resizeHandler)
        },
        // 酒店入住明细
        async hotelData(){
            this.hotelDataE = this.$echarts.init(this.$refs.hotelData)
            var res = await this.$http.get(`/base/getTouristsSet?rdate=${this.mounthValue}`)
            // this.hotelDataE.showLoading({textColor: '#fff',maskColor: 'rgba(255, 255, 255, 0)'})
            let {data} = res.data
            var name = []
            var hotelData = []
            if(data.length > 15){
                var sortData = []
                for(var i = 0; i < data.length; i+=2){
                    sortData.push(data[i])
                }
                sortData.forEach(item=>{
                    var hotelName = item.rdate.split(' ')[0].split('-')[1] +'/'+ item.rdate.split(' ')[0].split('-')[2]
                    name.push(hotelName)
                    hotelData.push(item.count)
                })
            } else{
                var sortData = data
                sortData.forEach(item=>{
                    var hotelName = item.rdate.split(' ')[0].split('-')[1] +'/'+ item.rdate.split(' ')[0].split('-')[2]
                    name.push(hotelName)
                    hotelData.push(item.count)
                })
            }

            var option = {
                color: ['#00D6DA', '#0877C2', '#FA9837'],
                title:{
                    show: data.length == 0,//平常时设置为false，隐藏没有数据的文字提示
                    textStyle:{
                        color:'#bcbcbc'
                    },
                    text:'暂无数据',
                    left:'center',
                    top:'center'
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: '{b}：{c}',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                        top: '20%',
                        left: '15%',
                        bottom: '20%',
                        right: '15%',
                    },
                xAxis: [
                    {   
                        splitLine: {
                            show: false,//网格线
                        },
                        axisLabel: {
                            interval: 0,
                            textStyle: {
                                color: '#5583AE',
                                fontSize: 12,
                            }
                        },
                        type: 'category',
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#346B85'
                            }
                        },
                        interval: 0,
                        data: name
                    }
                ],
                yAxis: [
                    {
                        name: '（人）',
                        nameTextStyle: {
                            color: '#C2E2F8',
                            fontSize : 12
                        },
                        type: 'value',
                        splitLine: {
                            show: false,//网格线
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#5583AE'
                            }
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#346B85'
                            }
                        },
                    }
                ],
                series: [
                    {
                        name: '酒店数',
                        type: 'line',
                        barWidth: '20%',
                        barGap: 0,
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
                        },
                        data: hotelData
                    },
                    
                    
                ]
            };
            this.hotelDataE.setOption(option);
            window.addEventListener('resize', this.resizeHandler)
        },

        // 省外
        async proOut(){
            this.proOutE = this.$echarts.init(this.$refs.proOut)
            this.proOutE.showLoading({textColor: '#fff',maskColor: 'rgba(255, 255, 255, 0)'})
            var res = await this.$http.get(
                `/base/getOutProvince?rdate=${this.mounthValue}`
            )
            console.log(res)
            let currData = []
            let {data, code} = res.data
            if(data.length != 0){
                data.forEach(item=>{
                    if(item.province != '浙江省'){
                        currData.push(item)
                    }
                })
            }
            var sortData1 = currData.sort(compare("rs",false)).slice(0,5).sort(compare('rs', true))
            var dataAxis = [];
            var proOutData = [];
            sortData1.forEach((item)=>{
                dataAxis.push(item.province)
                proOutData.push(item.rs)
            })
            var yMax = Math.max(...proOutData)+ 500;
            var dataShadow = [];
            for (var i = 0; i < data.length; i++) {
                dataShadow.push(yMax);
            }

            if(code == 10000){
                this.proOutE.hideLoading()
            } else {
                this.proOutE.hideLoading()
            }
            var option = {
                title: {
                    text: data.length == 0 ? '暂无数据' : '单位: 人',
                    x: data.length == 0 ? 'center' : '70%',
                    y: data.length == 0 ? 'center' : '5%',
                    textStyle: {
                        color: data.length == 0 ? '#bcbcbc' : '#B3D4F2',
                        fontWeight: data.length == 0 ? 600 :  400,
                        fontSize: data.length == 0 ? 16 : 14
                    }
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: '{b} {c}'
                },
                xAxis: {
                    type: 'value',
                    axisLabel: {
                        textStyle: {
                            color: '#5583AE'
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
                    // max:30,
                    min:0,
                    type: 'value',
                    minInterval: 1500,
                    z: 10
                },
                grid: [
                    {
                        top: '20%',
                        left: '15%',
                        bottom: '20%',
                        right: '15%',
                    }
                ],
                yAxis: {
                    type: 'category',
                    data: dataAxis,
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
                            color: '#5583AE'
                        }
                    },
                    splitLine: {
                        show: false,//网格线
                    },
                },
                dataZoom: [
                    {
                        type: 'inside'
                    }
                ],
                series: [
                    { // For shadow
                        type: 'bar',
                        itemStyle: {
                            color: 'rgba(0,39,71,1)'
                        },
                        barGap: '-100%',
                        barCategoryGap: '40%',
                        data: dataShadow,
                        animation: false
                    },
                    {
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                label: {
                                    formatter: "{c}",
                                    show: true,
                                    position: "right",
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
                            },
                        },
                        data: proOutData
                    }
                ]
            };
            this.proOutE.setOption(option);
            window.addEventListener('resize', this.resizeHandler)
        },
        resizeHandler() {
            this.resourceE.resize()
            this.abroadTop5E.resize()
            this.proOutE.resize()
            this.hotelDataE.resize()
            this.ageEc.resize()
        },
    },
    mounted(){
        this.resource()
        this.abroadTop()
        this.proOut()
        this.hotelData()
        this.baseInfo()
        this.guest()
        this.chinafn(0)
        this.chinaOutfn(0)
        this.getGenserIn()
        this.getGenserOut()
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
    .el-picker-panel.down_date .el-month-table td.disabled .cell{
        background-color: #072342;
        color: #999;
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
    .hotel_date .el-icon-date:before{
        background: url('../../assets/hotel/date_icon.png') no-repeat;
        background-size: 100% 100%;
        width: 21px;
        height: 21px;
        position: absolute;
        top: 14px;
        left: 0;
        margin-right: 2px;
    }
    .hotel_date .el-icon-date:before{
        content: '';
    }
    .hotel_date .el-date-editor.el-input{
        width: 130px;
        cursor: pointer;
    } 
    .hotel_date .el-date-editor.el-input input{
        cursor: pointer;
        border: none;
        color: #ABCBFF;
        background-color: transparent;
    }
    .hotel_date .el-input__prefix{
        left: 46px;
    }
    .hotel_date{
        /* width: 20%; */
        width: 188px;
        height: 48px;
        position: absolute;
        cursor: pointer;
        top: 0px;
        right: 20px;
        z-index: 999;
    }
    .hotel_date input{
        width: 188px;
        height: 48px;
        text-align: center;
        color: #ABCBFF;
        background: url('../../assets/hotel/dateBj.png') no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
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
    .hotel_bg{
        width: 100%;
        height: 100%;
        background: url('../../assets/hotel/F_bg.jpg') no-repeat;
        background-size: 100% 100%;
        font-family: 'PingFang SC';
    }
    .hotel_title{
        width: 100%;
        height: 8.61%;
        background: url('../../assets/hotel/pass_title.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
    }
    .hotel_title_txt{
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
    .hotel_container{
        width: 100%;
        height: 91.38%;
        padding: 0% 0% 1% 1%;
        box-sizing: border-box;
    }
    .grid-content{
        height: 100%;
    }
    .hotel_sun_title_bg{
        width: 100%;
        height: 17.67%;
        background: url('../../assets/hotel/F_l1_title.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
    }
    .hotel_sun_title_bg.hotel_title_283{
        background: url('../../assets/hotel/F_jingwai.png') no-repeat;
        background-size: 100% 100%;
    }
    .hotel_sun_title_bg_r1{
        width: 100%;
        height: 8.5%;
        background: url('../../assets/hotel/F_l1_title.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
    }
    .hotel_sun_title_bg_c1{
        width: 100%;
        height: 17.67%;
        background: url('../../assets/hotel/F_c1_title.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
    }
    .hotel_sun_title_txt{
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
    /* left */
    .hotel_count, .hotel_resource, .hotel_abroadTop5{
        width: 100%;
        height: 32%;
        background: url('../../assets/hotel/F_l1.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
    }
    .hotel_count_content{
        width: 100%;
        height: 82.3%;
        padding: 7% 6.8% 8% 7.6%;
        box-sizing: border-box;
    }
    .hotel_count_content_top{
        width: 100%;
        height: 54.34%;
    }
    .hotel_count_content_bottom{
        width: 100%;
        height: 45.5%;
    }
    .hotel_count_content_top1{
        width: 36%;
        height: 100%;
        float: left;
        box-sizing: border-box;
        margin-right: 10%;
    }
    .hotel_count_content_top1_total{
        width: 100%;
        height: 31%;
        display: block;
        font-size: 18px;
        color: #BFE0FF;
        font-weight:500;
    }
    .hotel_count_content_top1_detail{
        width: 100%;
        height: 46%;
        display: block;
        background: url('../../assets/hotel/F1_total.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
    }
    .hotel_count_content_top1_detail_txt{
        width: 100%;
        height: 22px;
        line-height: 22px;
        position: absolute;
        top: 50%;
        margin-top: -11px;
        color: #0CE3DC;
        font-weight: bold;
        text-align: center;
    }
    .hotel_count_content_top2, .hotel_count_content_top3{
        height: 75%;
        width: 23.5%;
        display: inline-block;
        background: url('../../assets/hotel/F_total1.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
    }
    .hotel_count_content_top2_top, .hotel_count_content_top2_bottom{
        height: 50%;
        width: 100%;
        position: relative;
    }
    .hotel_count_content_top2_top_detail{
        width: 100%;
        height: 18px;
        line-height: 18px;
        color: #CBEAFF;
        text-align: center;
        font-weight: 500;
        font-size: 14px;
        position: absolute;
        top: 50%;
        margin-top: -9px;
    }
    .hotel_count_content_top3{
        float: right;
    }
    .hotel_count_content_bottom1, .hotel_count_content_bottom2{
        height: 100%;
        width: 25.75%;
        float: left;
    }
    .hotel_count_content_bottom2{
        width: 31.75%;
        margin-left: 6%;
    }
    .hotel_count_content_bottom1_total{
        width: 100%;
        height: 40%;
        color: #BFE0FF;
        font-size: 16px;
        font-weight:500;
    }
    .hotel_count_content_bottom1_detail{
        width: 100%;
        height: 60%;
        background: url('../../assets/hotel/F_total_2.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
    }
    .hotel_count_content_bottom1_detail_txt{
        height: 22px;
        width: 100%;
        line-height: 22px;
        text-align: center;
        color: #0CE3DC;
        font-weight:bold;
        position: absolute;
        top: 50%;
        margin-top: -11px;
    }
    .hotel_count_content_bottom3{
        width: 31.75%;
        height: 100%;
        float: right;
    }
    .hotel_count_content_bottom1_detail3{
        height: 60%;
        width: 100%;
        background: url('../../assets/hotel/F_total_2.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
    }



    /* 资源统计 */
    .hotel_resource{
        height: calc(34% - 20px);
        margin-top: 20px;
    }
    .hotel_sun_title_content{
        height: 82.3%;
        width: 100%;
    }
    /* 境外游客top5 */
    .hotel_abroadTop5{
        height: calc(34% - 20px);
        margin-top: 20px;
    }
    .hotel_abroadTop5_content{
        height: 82.3%;
    }
    /* 地图 */
    .hotel_map{
        width: 100%;
        height: 66%;
        position: relative;
        overflow: hidden;
    }
    .hotel_map_mapBall{
        width: 100%;
        height: 100%;
        background: url('../../assets/hotel/F_map.png') no-repeat center center;
        background-size: auto 110% ;
        position: absolute;
        top: 0;
        -webkit-animation: mapScale 0.5s ease-in-out forwards, mapRotate 9s 1s ease-in-out forwards;
    }
    .hotel_map_aperture{
        width: 100%;
        height: 100%;
        background: url('../../assets/hotel/F_aperture.png') no-repeat center center;
        background-size: auto 110% ;
        z-index: 2;
        position: absolute;
        top: 0;
        opacity: 0;
        -webkit-animation: mapScale1 0.2s 1s ease-in-out forwards;
    }
    .hotel_map_haveColor{
        width: 100%;
        height: 100%;
        background: url('../../assets/hotel/F_have_color.png') no-repeat center center;
        background-size: auto 110% ;
        z-index: 1;
        position: absolute;
        top: 0;
        opacity: 0;
        -webkit-animation: mapRotateColorShow 1.2s 1.5s linear forwards,  mapRotateColor 3.7s 1s linear infinite;
    }
    .hotel_map_noColor{
        width: 100%;
        height: 100%;
        background: url('../../assets/hotel/F_no_color.png') no-repeat center center;
        background-size: auto 110% ;
        z-index: 4;
        position: absolute;
        top: 0;
        opacity: 0;
        -webkit-animation: mapRotateNoColorShow 1.2s 3s  linear forwards,  mapRotateNoColor 3.7s 1s linear infinite;
    }
    .grid_chinaIn_echart .gender-area {
        font-size: 14px;
        display: flex;
        color: #4ABFFE;
        justify-content: center;
        align-items: center;
        margin-top: 22px;
        text-align: center;
    }
    .grid_chinaIn_echart .man, .grid_chinaIn_echart .woman{
        max-width: 50px;
        overflow: hidden;
    }
    .grid_chinaIn_echart .ring{
        fill: none;
        stroke-width: 4;
    }
    .grid_chinaIn_echart .manchart {
        stroke-dasharray: 251;
        stroke-dashoffset: 0;
        transform: rotatez(-90deg);
        transform-origin: 50px;
    }
    .grid_chinaIn_echart .womanchart {
        stroke-dasharray: 198;
        stroke-dashoffset: 198;
        transform: rotatez(-90deg);
        transform-origin: 50px;
    }
    .grid_chinaIn_echart .endline{
        transform: rotate(-90deg);
        transform-origin: 50px;
    }
    .grid_chinaIn_echart .decoration{
        background: url('../../assets/img/portrait/decoration@2x.png') no-repeat;
        background-size: 201px 47px;
        width: 201px;
        height: 47px;
        position: absolute;
        bottom: 25px;
    }

    @keyframes mapScale {  
        0%{
            transform: scale(0);  /*开始为原始大小*/
        }
        100%{
            transform: scale(1);
        }
    }
    @keyframes mapScale1 {  
        0%{
            opacity: 1;
            transform: scale(0);  /*开始为原始大小*/
        }
        50%{
            opacity: 1;
            transform: scale(0.5);  /*开始为原始大小*/
        }
        100%{
            opacity: 1;
            transform: scale(1);
        }
    }
    @keyframes mapRotateColor {  
        0%{
            -webkit-transform:rotate(0deg);
        }
        100%{
            -webkit-transform:rotate(-360deg);
        }
    }
    @keyframes mapRotateColorShow {  
        0%{
            opacity: 0;
        }
        90%{
            opacity: 0;
        }
        100%{
           opacity: 1;
        }
    }
    @keyframes mapRotate {  
        0%{
            -webkit-transform:rotate(0deg);
        }
        100%{
            -webkit-transform:rotate(360deg);
        }
    }
    @keyframes mapRotateNoColorShow {  
        0%{
            opacity: 0;
        }
        90%{
            opacity: 0;
        }
        100%{
           opacity: 1;
        }
    }
    @keyframes mapRotateNoColor {  
        0%{
            -webkit-transform:rotate(0deg);
        }
        100%{
            -webkit-transform:rotate(325deg);
        }
    }
    /* 酒店基础数据对比 */
    .hotel_hotel{
        width: 100%;
        height: calc(34% - 20px);
        background: url('../../assets/hotel/F_c_bg.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
        margin-top: 20px;
    }
    .hotel_hotel_container{
        height: 82.3%;
    }
    /* 游客量对比 */
    .hotel_contrast{
        width: 100%;
        height: 66%;
        background: url('../../assets/hotel/F_r1.png') no-repeat;
        background-size: 100% 100%;
        /* margin-top: 1%; */
        position: relative;
    }
    .hotel_contrast_content{
        height: 91.4%;
        width: 100%;
        
    }
    /* 国内 */
    .grid_chinaIn{
        height: 32%;
        width: 100%;
        background: url('../../assets/hotel/F_r1.png') no-repeat;
        background-size: 100% 100%;
    }
    .grid_chinaIn_btn{
        width: 100%;
        height: 25px;
        margin-top: 8px;
    }
    .grid_chinaIn_btn_list{
        width: 200x;
        height: 100%;
        float: right;
    }
    .grid_chinaIn_btn_item{
        display: inline-block;
        width:80px;
        height:22px;
        color: #ABCBFF;
        font-size: 14px;
        text-align: center;
        line-height: 22px;
        background-color: #04223A;
        border:1px solid rgba(26,151,255,1);
        border-radius:11px;
        margin-right: 10px;
        cursor: pointer;
    }
    .grid_chinaIn_btn_item.active{
        background-color: #06406E;
    }
    .grid_chinaIn_echart{
        width: 100%;
        height: calc(100% - 35px);
    }
    .grid_chinaOut{

    }
    /* 省外游客top5 */
    .hotel_proOutTop5, .grid_chinaOut{
        width: 100%;
        height: calc(34% - 20px);
        background: url('../../assets/hotel/F_r1.png') no-repeat;
        background-size: 100% 100%;
        margin-top: 20px;
        position: relative;
    }
    .hotel_proOutTop5_content{
        height: 82.3%;
    }
    @media screen and (max-width: 1400px) {
        .hotel_count_content_bottom1_total, .hotel_count_content_bottom1_detail3, .hotel_count_content_bottom1_detail3{
            font-size: 14px;
        }
    }
</style>
