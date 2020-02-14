<template>
    <div class="hotel_bg">
        <div class="hotel_title">
            <headtop :title='pageTitle'/>
            <!-- <div class="hotel_title_txt">旅游饭店监测系统</div> -->
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
                                            <div class="hotel_count_content_top1_detail_txt">1123652</div>
                                        </div>
                                    </div>
                                    <div class="hotel_count_content_top2">
                                        <div class="hotel_count_content_top2_top">
                                            <div class="hotel_count_content_top2_top_detail">外宾人数</div>
                                        </div>
                                        <div class="hotel_count_content_top2_bottom">
                                            <div class="hotel_count_content_top2_top_detail">345656</div>
                                        </div>
                                    </div>
                                    <div class="hotel_count_content_top3">
                                        <div class="hotel_count_content_top2_top">
                                            <div class="hotel_count_content_top2_top_detail">内宾人数</div>
                                        </div>
                                        <div class="hotel_count_content_top2_bottom">
                                            <div class="hotel_count_content_top2_top_detail">345656</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="hotel_count_content_bottom">
                                    <div class="hotel_count_content_bottom1">
                                        <div class="hotel_count_content_bottom1_total">酒店总数</div>
                                        <div class="hotel_count_content_bottom1_detail">
                                            <div class="hotel_count_content_bottom1_detail_txt">4231</div>
                                        </div>
                                    </div>
                                    <div class="hotel_count_content_bottom2">
                                        <div class="hotel_count_content_bottom1_total">酒店总数</div>
                                        <div class="hotel_count_content_bottom1_detail">
                                            <div class="hotel_count_content_bottom1_detail_txt">4231</div>
                                        </div>
                                    </div>
                                    <div class="hotel_count_content_bottom3">
                                        <div class="hotel_count_content_bottom1_total">床位总数</div>
                                        <div class="hotel_count_content_bottom1_detail3">
                                            <div class="hotel_count_content_bottom1_detail_txt">4231</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 资源统计 -->
                        <div class="hotel_resource">
                            <div class="hotel_sun_title_bg">
                                <div class="hotel_sun_title_txt">省内游客占比</div>
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
                                <div class="hotel_sun_title_txt">酒店基础数据对比</div>
                            </div>
                            <div class="hotel_hotel_container" ref="hotelData"></div>
                        </div>
                    </div>
                </el-col>
                <!-- right -->
                <el-col  :lg="6" :xl="6" class="h100">
                    <div class="grid-content bg-purple">
                        <!-- 游客量对比 -->
                        <div class="hotel_contrast">
                            <div class="hotel_sun_title_bg_r1">
                                <div class="hotel_sun_title_txt">游客量对比</div>
                            </div>
                            <div class="hotel_contrast_content" ref="touristV"></div>
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
export default {
    components: {
        headtop
    },
    data(){
        return{
            pageTitle: '旅游饭店监测系统',
           resourceE: null,
           abroadTop5E: null,
           proOutE: null,
           hotelDataE: null,
           touristVE: null,
           hotelTotal: 0,
           houseTotal: 0,
           bedTotal: 0,  //床位
           guestIn: 0,
           guestOut: 0,
           guestTotal: 0,
        }
    },
    methods: {
        // 获取床位
        async baseInfo(){
            var res = await this.$http.get(
                `/base/getHotelData`
            )
            let {data} = res.data
            this.hotelTotal = data.酒店总数
            this.houseTotal = data.房间总数
            this.bedTotal = data.床位总数
        },
        // 获取内外宾
        async guest(){
            var res = await this.$http.get(
                `/base/getTouristsType`
            )
            let {data} = res.data
            this.guestTotal = 0
            data.forEach(element => {
                this.guestTotal += Number(element.count)
                if(element.nwblx == '内宾'){this.guestIn = element.count}
                if(element.nwblx == '外宾'){this.guestOut = element.count}
            });
        },
        // 省内
        async resource(){
            this.resourceE = this.$echarts.init(this.$refs.resourceE)
            this.resourceE.showLoading({textColor: '#fff',maskColor: 'rgba(255, 255, 255, 0)'})

            var res = await this.$http.get(
                `/base/getAllCityZheJiang`
            )
            let {data, code} = res.data
            var resourceName = []
            var resourceDate = []
            for(var key in data){
                resourceName.push(key)
                resourceDate.push({name: key, value: data[key]})
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
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    x: '65%',
                    // top: '3%',
                    bottom: '10%',
                    itemWidth: 10,  // 设置宽度
                    itemHeight: 10, // 设置高度
                    itemGap: 10,
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
                        radius: [20, 70],
                        center: ['35%', '50%'],
                        roseType: 'radius',
                        label: {
                            show: true,
                            textStyle: {
                                color: '#CBEAFF'
                            },
                            formatter: '{c}'
                        },
                        labelLine: {
                            normal:{  
                                length: 1,
                                length2: 1,
                                lineStyle: {
                                    color: "#CBEAFF"  // 改变标示线的颜色
                                }
                            }
                        },
                        emphasis: {
                            label: {
                                show: true
                            }
                        },
                        data: resourceDate,
                        color: ['#2080F7','#02D9CC','#F6C80F','#B052FF','#FA9837','#4FDB5D','#EB6877','#32C5E9','#EC87BF','#4E33C2','#ED5555',]
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
                `/base/getAbroadPersonCount`
            )
            let {data, code} = res.data
            // console.log(res)
            var dataAxis = [];
            var outData = [];
            var sortData = jsonSort(data[0], true)
            sortData.forEach((item)=>{
                if(item.name == 'Foreigners'){dataAxis.push('其他'); outData.push(item.value)}
                if(item.name == 'HongKong'){dataAxis.push('香港'); outData.push(item.value)}
                if(item.name == 'Macao'){dataAxis.push('澳门'); outData.push(item.value)}
                if(item.name == 'Taiwan'){dataAxis.push('台湾'); outData.push(item.value)}
            })
            var yMax = Math.max(...outData)+50;
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
        // 游客量对比
        touristVolume(){
            this.touristVE = this.$echarts.init(this.$refs.touristV)
            var touristName = ['沈家门金粤轩酒店','沈家门金粤轩酒店','沈家门金粤轩酒店','沈家门金粤轩酒店','沈家门金粤轩酒店','沈家门金粤轩酒店', '沈家门金粤轩酒店', '沈家门金粤轩酒店']
            var touristData = [321, 367,455, 531, 624, 832, 953, 1215]
            var yMax = 1500;
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
                        return data[1].axisValue + data[1].value+'人'
                    }
                },
                grid: {
                    left: '10%',
                    right: '7%',
                    bottom: '7%',
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
                        type : 'category',
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
                        itemStyle: {
                            color: 'rgba(0,39,71,1)'
                        },
                        barGap: '-100%',
                        barCategoryGap: '40%',
                        data: dataShadow,
                        animation: false,
                        hoverAnimation: false,
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
            this.touristVE.setOption(option);
            window.addEventListener('resize', this.resizeHandler)
        },
        // 酒店基础数据对比
        async hotelData(){
            this.hotelDataE = this.$echarts.init(this.$refs.hotelData)
            this.hotelDataE.showLoading({textColor: '#fff',maskColor: 'rgba(255, 255, 255, 0)'})
            var res = await this.$http.get(
                `/base/getHotelLevel`
            )
            let {data, code} = res.data
            console.log(res)
            let name = []
            let hotelData = []
            let roomData = []
            data.forEach((item)=>{
                if(item.level == 0){name.push('经济型'); hotelData.push(item.hotelcount); roomData.push(item.roomcount)}
                if(item.level == 1 || item.level == 2){name.push('舒适型'); hotelData.push(item.hotelcount); roomData.push(item.roomcount)}
                if(item.level == 3|| item.level == 4){name.push('高档型'); hotelData.push(item.hotelcount); roomData.push(item.roomcount)}
                if(item.level == 5){name.push('豪华型'); hotelData.push(item.hotelcount); roomData.push(item.roomcount)}
                if(item.level == 6){name.push('农家乐'); hotelData.push(item.hotelcount); roomData.push(item.roomcount)}
            })
            if(code == 10000){
                this.hotelDataE.hideLoading()
            } else {
                this.hotelDataE.hideLoading()
            }
            var option = {
                color: ['#00D6DA', '#0877C2', '#FA9837'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                        top: '20%',
                        left: '8%',
                        bottom: '20%',
                        right: '15%',
                    },
                legend: {
                    orient: 'vertical',
                    x: '85%',
                    top: '15%',
                    data: ['酒店数', '房间数'],
                    textStyle: {
                        color: '#5583AE'
                    }
                },
                xAxis: [
                    {   
                        splitLine: {
                            show: false,//网格线
                        },
                        axisLabel: {
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
                        type: 'bar',
                        barWidth: '20%',
                        barGap: 0,
                        itemStyle:{
                            normal: {
                                label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: '#CBEAFF',
                                        fontSize: 12   //柱形图每个柱上边的标注
                                    },
                                },
                            }
                        },
                        data: hotelData
                    },
                    {
                        name: '房间数',
                        type: 'bar',
                        barWidth: '20%',
                        itemStyle:{
                            normal: {
                                label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: '#CBEAFF',
                                        fontSize: 12   //柱形图每个柱上边的标注
                                    },
                                },
                            }
                        },
                        data: roomData
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
                `/base/getTravelSource`
            )
            let {data, code} = res.data
            var sortData = jsonSort(data, false).slice(0,5)
            var sortData1 = sortData.sort(compare("value",true))
            var dataAxis = [];
            var proOutData = [];
            sortData1.forEach((item)=>{
                dataAxis.push(item.name)
                proOutData.push(item.value)
            })
            var yMax = Math.max(...proOutData)+50;
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
            this.touristVE.resize()
        },
    },
    mounted(){
        this.resource()
        this.abroadTop()
        this.proOut()
        this.hotelData()
        this.touristVolume()
        this.baseInfo()
        this.guest()
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
        /* background: url('../../assets/hotel/F_title.png') no-repeat;
        background-size: 100% 100%; */
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
        width: 23.75%;
        float: left;
    }
    .hotel_count_content_bottom2{
        margin-left: 10%;
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
    /* 省外游客top5 */
    .hotel_proOutTop5{
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
</style>
