<template>
    <div class="basicPortrait">
        <div class="BP_title">
            <!-- <div class="BP_nav">  -->
                <headtop :title='pageTitle'/>
            <!-- </div> -->
            <!-- <div class="BP_title_txt">游客画像分析</div> -->

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
                            <div class="BP_info_1_con">
                                <div class="BP_info_1_nan">
                                    <img src="../../assets/hotel/man.png" alt="">
                                    <div class="BP_info_1_nan_data">68.6%</div>
                                </div>
                                <div class="BP_info_1_echart" ref="BP_gender"></div>
                                <div class="BP_info_1_nv">
                                    <img src="../../assets/hotel/woman.png" alt="">
                                    <div class="BP_info_1_nan_nv">31.4%</div>
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
                        <div class="BP_info_2_content">
                            <div class="BP_info_2_item" ref="BP_portrait_ec1"></div>
                            <div class="BP_info_2_item" ref="BP_portrait_ec2"></div>
                            <div class="BP_info_2_item" ref="BP_portrait_ec3"></div>
                            <div class="BP_info_2_item" ref="BP_portrait_ec4"></div>
                        </div>
                    </div>
                    <div class="BP_info_3">
                        <div class="BP_info_2_title">
                            <div class="BP_info_2_title_con">
                                <div class="BP_info_1_title_txt">游客身份</div>
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
                    <div class="BP_lai">
                        <div class="BP_lai_title"></div>
                        <div class="BP_lai_container" ref="tourist_lai"></div>
                    </div>
                    <div class="BP_qu">
                        <div class="BP_qu_title"></div>
                        <div class="BP_qu_container" ref="tourist_qu"></div>
                    </div>
                </div>
                <div class="BP_right_bottom">
                    <div class="BP_right_bottom_title"></div>
                    <div class="BP_right_bottom_echart">
                        <div class="BP_chooseData">
                            <div class="BP_chooseData_btn">
                                <img src="../../assets/hotel/BP_right_bottom_tit.png" alt="">&nbsp;&nbsp;比较
                            </div>
                            <div class="BP_choose_list">
                                <div class="BP_choose_list_bg"></div>
                            </div>
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
export default {
    components: {
        headtop
    },
    data(){
        return{
            pageTitle: '游客画像分析',
            touristComeEc: null,
            touristLeaveEc: null,
            genderEc: null,
            ageEc: null,
            portraitEc: null,
            ageDistributionEc: null,
            visitScenicEc: null,
            playTimeEc: null,
        }
    },
    methods: {
        touristCome(){
            this.proInEc = this.$echarts.init(this.$refs.tourist_lai)
            var dataAxis = ['舟山', '嘉兴', '丽水', '温州','绍兴', '苏州', '湖州', '金华', ];
            var data = [22,21,33,23,34,41,54,43];
            
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
        touristLeave(){
            this.touristLeaveEc = this.$echarts.init(this.$refs.tourist_qu)
            var dataAxis = ['舟山', '嘉兴', '丽水', '温州','绍兴', '苏州', '湖州', '金华', ];
            var data = [22,21,33,23,34,41,54,43];
            
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
            this.touristLeaveEc.setOption(option);
            window.addEventListener('resize', this.resizeHandler)
        },
        gender(){
            this.genderEc = this.$echarts.init(this.$refs.BP_gender)
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
        age(){
            this.ageEc = this.$echarts.init(this.$refs.BP_age)
            
            var option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: '60%',
                    bottom: '15%',
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
            var marriageEchat = this.$refs.BP_portrait_ec1
            this.portraitBottom(20, marriageEchat)
        },
        child(){
            var marriageEchat = this.$refs.BP_portrait_ec2
            this.portraitBottom(60, marriageEchat)
        },
        travelPerson(){
            var marriageEchat = this.$refs.BP_portrait_ec3
            this.portraitBottom(40, marriageEchat)
        },
        reTravel(){
            var marriageEchat = this.$refs.BP_portrait_ec4
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
        ageDistribution(){
            this.ageDistributionEc = this.$echarts.init(this.$refs.BP_ageDistribution)
            var touristName = ['孕育期','幼儿期','青少年期']
            var touristData = [5924, 592,678]
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
                        barWidth: '30%',
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
                        barWidth: '30%',
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
                        data: touristData
                    }
                ]
            };
            this.ageDistributionEc.setOption(option);
            window.addEventListener('resize', this.resizeHandler)
        },
        playTime(){
            this.playTimeEc = this.$echarts.init(this.$refs.BP_playTime)
            var data = [{
                    name: "一天",
                    value: 0.20
                },
                {
                    name: "两天",
                    value: 0.53
                },
                {
                    name: "三天",
                    value: 0.20
                },
                {
                    name: "四天",
                    value: 0.7
                }
            ];
            var dataStyle = { 
                normal: {
                    label: {show:true},
                    labelLine: {
                        normal: {
                            length: 100,
                            length2: 100,
                            lineStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    shadowBlur: 40,
                    shadowColor: 'rgba(40, 40, 40, 0.5)',
                }
            };
            var placeHolderStyle = {
                normal : {
                    color: 'rgba(0,0,0,0)',
                    label: {show:true},
                    labelLine: {
                        show: true,
                        normal: {
                            length: 100,
                            length2: 100,
                            lineStyle: {
                                color: '#fff'
                            }
                        }
                    },
                },
                emphasis : {
                    color: 'rgba(0,0,0,0)'
                }
            };
            var legendData=[];
            function getData(data) {
                var sortData=data.sort((a,b)=>{
                    return b.value-a.value
                });
                var res = [];
                for (let i = 0; i < sortData.length; i++) {
                    legendData.push({name: sortData[i].name, value: sortData[i].value});
                    res.push({
                        type: 'pie',
                        clockWise: false, //顺时加载
                        hoverAnimation: false, //鼠标移入变大
                        startAngle: i * 600, //起始角度
                        center: ['40%', '35%'],
                        // radius: [40 - i * 5, 60 - i * 5],
            　　　　　　　radius: [55 - i * 15 + '%', 47 - i * 15 + '%'],
                        itemStyle: dataStyle,
                        data: [{
                            value: sortData[i].value,
                            name: sortData[i].name
                        }, {
                            value: 1 - sortData[i].value,
                            name:'invisible',
                            itemStyle: placeHolderStyle,
                        }]
                    });
                }
                return res;
            }
            var option = {
                color: ['#93CB44', '#14B2FF','#FF824A', '#4260FF'],
                tooltip : {
                    show: true,
                    formatter: "{b} : {c} ({d}%)"
                },
                grid: {
                    left: '7%',
                    right: '7%',
                    bottom: '30%',
                    top: '5%',
                    containLabel: true
                },
                legend: {
                    orient: 'vertical',
                    itemGap:12,
                    itemWidth: 12,  // 设置宽度
                    itemHeight: 12, // 设置高度
                    left: '73%',
                    bottom: '40%',
                    textStyle:{
                        color: '#B2D2E3',
                        fontSize: 14
                    },
                    // formatter: function(data1){
                    //     console.log(data1)
                    //     for(var i = 0; i < data.length; i++){
                    //         return data[i].name+data[i].value
                    //     }
                    // },
                    data:legendData
                },
                series : getData(data)
            };
            this.playTimeEc.setOption(option);
            window.addEventListener('resize', this.resizeHandler)
        },
        visitScenic(){
            this.visitScenicEc = this.$echarts.init(this.$refs.visitScenicEchart)
            var city={
                '研究人群':'#4260FF',
                '南北湖':'#BF7626',
                '绮园':'#BF7626',
                '核电小镇':'#BF7626'
            }
            var population=[
                {source: "研究人群",target: "南北湖", value: 4567},
                {source: "研究人群", target: "绮园", value: 1234},
                {source: "核电小镇", target: "香港", value: 3234}];
            var data=[];
            var citylist=[];
            for(var key in city){
                citylist.push(
                    {name: key,itemStyle: {color:city[key]}}
                )
            }
            for(var i=0;i<population.length;i++){
                var color = '#06CBE9'
                data.push(
                    {source: population[i].source,
                    target: population[i].target,
                    value: population[i].value,
                        lineStyle: {
                        color:color
                        }
                    }
                )
            }
            var option = {
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove'
                },
                series: [
                    {
                        type: 'sankey',
                        data: citylist,
                        links: data,
                        focusNodeAdjacency: 'allEdges',
                        itemStyle: {
                            color:'#FFFFFF',
                            normal: {
                                label: {
                                    textStyle: {
                                        color:'#FFFFFF', 
                                    }
                                }
                            },
                        },
                        lineStyle: {
                            color:'#FFFFFF',
                            curveness: 0.5,
                            opacity:0.5
                        }
                    }
                ]
            }
            this.visitScenicEc.setOption(option);
            window.addEventListener('resize', this.resizeHandler)
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
        this.touristCome()
        this.touristLeave()
        this.gender()
        this.age()
        this.marriage()
        this.child()
        this.travelPerson()
        this.reTravel()
        this.ageDistribution()
        this.visitScenic()
        this.playTime()
    }
}
</script>

<style>
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
        font-family: PingFang SC;
    }
    .BP_container{
        width: 100%;
        height: 91.38%;
        box-sizing: border-box;
        position: relative;
        padding: 20px;
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
        font-family: 'PingFang SC';
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
        text-align: center;
        position: absolute;
        top: 50%;
        margin-top: -11px;
        font-size: 14px;
        color: #B2D2E3;
        font-weight:bold;
        /* font-family: 'PingFang SC'; */
    }
    .BP_info_1_con{
        width: 100%;
        height: calc(100% - 58px);
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
        width: calc(100% - 145px);
        height: 100%;
        float: left;
    }
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
    .BP_info_3_content{
        padding: 0;
    }
    .BP_info_3_content.playTime{
        width: 60%;
        height: 100%;
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
    }
    .BP_qu_title{
        background: url('../../assets/hotel/BP_qu.png') no-repeat;
        background-size: 100% 100%;
    }
    .BP_lai_container, .BP_qu_container{
        width: 100%;
        height: 87.8%;
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
    }
    .BP_right_bottom_echart{
        width: 100%;
        height: 87.8%;
        padding: 0 30px;
        box-sizing: border-box;
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
    }
    .BP_bottom_echarts{
        width: 100%;
        height: calc(100% - 67px);
    }
</style>