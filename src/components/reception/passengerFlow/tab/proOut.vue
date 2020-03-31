<template>
    <div class="total_page">
        <div class="proTotal_date">
            <div class="total_date1">
                <el-date-picker
                    popper-class="down_date"
                    :clearable="false"
                    clear-icon="clearIcon"
                    v-model="beginValue"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions0"
                    @change="beginChange"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
                <div class="total_date1_down"></div>
            </div>
            <div class="total_date_title">省外客流量</div>
            <div class="total_date1">
                <el-date-picker
                    popper-class="down_date"
                    :clearable="false"
                    clear-icon="clearIcon"
                    v-model="endValue"
                    value-format="yyyy-MM-dd"
                    ref="focesInput"
                    @change="endChange"
                    :picker-options="pickerOptions1"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
                <div class="total_date1_down"></div>
            </div>
            <div class=" total_top10">客源地排行Top10</div>
        </div>
        <div class="pass_container" ref="proInEchart"></div>
        <!-- 客源地排行 -->
        <div class="total_page_top10" ref="scenicProIn"></div>
    </div>
</template>

<script>

import qs from 'qs'
import moment from "moment"
export default {
    data(){
        return {
            beginValue: moment(new Date(new Date().getTime() - 7 * 24 * 3600 * 1000)).format('YYYY-MM-DD'),
            endValue: moment(new Date(new Date().getTime() - 1 * 24 * 3600 * 1000)).format('YYYY-MM-DD'),
            proInEchart: null,
            scenicProInEc: null,
            mapData: [],
            proInName: [],
            proInData: [],
            pickerOptions0: {
                disabledDate: (time) => {
                    return time.getTime() > new Date(new Date().getTime() - 1 * 24 * 3600 * 1000);
                
                }
            },
            pickerOptions1: {
                disabledDate: (time) => {
                    return time.getTime() <  new Date(this.beginValue).getTime() || time.getTime() > new Date(new Date().getTime() - 1 * 24 * 3600 * 1000)
                }
            }
        }
    },
    methods: {
        beginChange(data){
            this.beginValue = data
            this.getProOutData()
            // this.$refs.focesInput.focus();
        },
        endChange(data){
            this.endValue = data
            this.getProOutData()
        },
        async getProOutData(){
            var startTime = this.beginValue.replace(/-/g, '')
            var endTime = this.endValue.replace(/-/g, '')
            var res = await this.$http.get(
                // `/aone/getProvinceCount?endTime=20200131&startTime=20200101`
                `/aone/getProvinceCount?endTime=${endTime}&startTime=${startTime}`
            )
            let{data} = res.data
            // console.log(data)
            this.mapData = []
            this.proInName = []
            this.proInData = []
            if(data.length != 0){
                data.forEach(element => {
                    this.mapData.push(
                        {
                            name: element.province.replace(/省|市/g, ''),
                            value: element.count
                        }
                    )

                });
                var sortData = data.sort(compare('count',false)).slice(0,10)
                var top10 = sortData.sort(compare('count',true))
                top10.forEach(item=>{
                    this.proInName.push(item.province)
                    this.proInData.push(item.count)
                })
            }

            this.proOutEch()
            this.scenicTop()
        },
        // map
        proOutEch(){
            this.proInEchart = this.$echarts.init(this.$refs.proInEchart)
            var myData = [
                {name: '舟山', value: [122.207216, 29.985295, 123]}
            ]
            var geoCoordMap = {}
            var data = []
            var mapName = 'china'
            var mapFeatures = this.$echarts.getMap(mapName).geoJson.features;
             mapFeatures.forEach(function(v) {
                // 地区名称
                var name = v.properties.name;
                // 地区经纬度
                geoCoordMap[name] = v.properties.cp;
                data.push({
                    name: name,
                    value: Math.round(Math.random() * 70 + 60)
                })
            });
            // var data = [
            //     {
            //         name: '郑州',
            //         value: 20000 //扩散的大小
            //     },
            //     {
            //         name: '北京',
            //         value: 16000
            //     },
            //     {
            //         name: '香港',
            //         value: 12000
            //     },
            //     {
            //         name: '上海',
            //         value: 14000
            //     },
            // ];
            data = this.mapData
            // geoCoordMap = {
            //     '郑州': [113.649638, 34.75659],
            //     '香港': [114.186133, 22.29343],
            //     '北京': [116.395645, 39.92998],
            //     '上海': [121.487884, 31.24910]
            // };
 
            var convertData = function(data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = geoCoordMap[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        });
                    }
                }
                return res;
            };
            
            var option = {
                tooltip: {
                    trigger: 'item',
                    formatter: function(obj) {
                        return obj.name + '：' + obj.value[2] +'人' ;
                    },
                    textStyle: {
                        fontSize: 18
                    }
                },
                series: [{
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    // data: convertData(data.sort(function(a, b) {
                    //     return b.value - a.value;
                    // }).slice(0, 6)),
                    data: convertData(data),
                    symbolSize: function(val) {
                        return 2;
                    },
                    // symbolSize: function(val) {
                    //     return val[2] / 10000;
                    // },
                    showEffectOn: 'render',
                    zlevel: 2,
                    rippleEffect: {
                        period: 2.5, //波纹秒数
                        brushType: 'fill', //stroke(涟漪)和fill(扩散)，两种效果
                        scale: 20 //波纹范围
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#00FFFF',
                            shadowBlur: 10,
                            shadowColor: 'rgba(0,0,0,.3)'
                        }
                    },
                    zlevel: 1
                }],
                geo: {
                    map: 'china',
                    roam: true,
                    layoutCenter: ['50%', '50%'],
                    layoutSize: "130%",
                    label: {
                        normal: {
                            position: 'top',
                            show: true,
                            textStyle: {
                                color: '#ABCBFF'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: '#0285FF',
                            areaColor: '#084279',
                            label: {
                                show: true,
                                textStyle: {
                                    color: '#ABCBFF'
                                }
                            }
                        },
                        emphasis: {
                            borderColor: '#0285FF',
                            areaColor: '#084279',
                            label: {
                                show: true,
                                textStyle: {
                                    color: '#ABCBFF'
                                }
                            }
                        }
                    }
                }
            }
            this.proInEchart.setOption(option);
            window.addEventListener('resize', this.resizeHandler)
        },
        // top10
        scenicTop(){
            var proInName = ['衢州','杭州', '嘉兴', '金华', '温州', '湖州', '绍兴', '宁波', '舟山',  ]
            var proInData = ['21122', '22322', '23123', '31722', '33322', '41233','41252', '42322', '51233'  ]
            this.scenicProInEc = this.$echarts.init(this.$refs.scenicProIn)
            var option = {
                title:{
                    show: proInData.length == 0,
                    text: '暂无数据',
                    left: 'left',
                    y: '3%',
                    textStyle: {
                        color: '#407AFF'
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    top:'7%',
                    left: '10%',
                    right: '20%',
                    bottom: '1%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    show: false,
                    boundaryGap: ['5%', '25%'],  //防止字体超出
                    axisLine: {
                        show: false,
                    },
                    splitLine: {
                        show: false,//去除网格线
                    },
                },
                yAxis: {
                    type: 'category',
                    axisLine: {
                        show: false,
                    },
                    splitLine: {
                        show: false,//去除网格线
                    },
                    axisTick:{       //y轴刻度线
                        show:false
                    },
                    axisLabel:{
                        textStyle: {
                            color: '#fff',
                            fontSize: 14
                        },
                        interval: 0
                    },
                    data: this.proInName
                },
                series: [
                    {
                        name: '来源地',
                        type: 'bar',
                        barWidth: '25%',
                        data: this.proInData,
                        itemStyle: {
                            normal: {
                                label: {
                                        show: true,
                                        position: 'right',
                                        textStyle: {
                                            color: 'white',
                                            fontSize: 14   //柱形图每个柱上边的标注
                                        }
                                },
                                barBorderRadius:[10, 10, 10, 10],
                                color: new this.$echarts.graphic.LinearGradient(
                                    0, 0, 1, 0,
                                    [
                                        {offset: 0, color: '#074F90'},
                                        {offset: 1, color: '#97D6F3'}

                                    ]
                                ),
                            }
                        },
                    }
                ]
            };
            this.scenicProInEc.setOption(option,true)
            window.addEventListener('resize', this.resizeHandler)
        },
        resizeHandler(){
            // this.proInEchart.resize()
            this.scenicProInEc.resize()
        }
    },
    mounted(){
        this.getProOutData()
        // this.scenicTop()
        // this.proOutEch()
    }
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
    .wh100{
        width: 100%;
        height: 100%;
    }
    .el-date-editor.el-input.el-input--prefix.el-input--suffix.el-date-editor--month input{
        color: #fff;
    }
    /*  */
    .clearIcon{
        content: '';
    }
    .el-picker-panel.down_date .el-date-table td.disabled div{
        background-color: #072342;
        color: #999;
    }
    .el-picker-panel.down_date .el-date-table td.disabled div{
        background-color: #072342;
        color: #999;
    }
    .total_page .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width: 100%;
        height: 100%;
    }
    .total_page .el-input__inner{
        width: 100%;
        border: none;
        color: #3EDCFE;
        background: url('../../../../assets/hotel/pass_date_bg.png') no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
    }
    /*  */
    .total_page{
        width: 100%;
        height: 100%;
        padding-top: 6%;
        padding-bottom: 5%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
    }
    .proTotal_date{
        width: 76%;
        height: 13%;
        margin: 0 auto;
        display: flex;
    }
    .pass_container{
        /* width: 70%; */
        width: 100%;
        height: 82%;
        /* flex: 1; */
        margin-left: 5%;
        padding-right: 37%;
        /* margin: 0 auto; */
        display: flex;
        box-sizing: border-box;
    }
    .total_date1{
        /* width: 20%; */
        width: 169px;
        height: 39px;
        position: relative;
        cursor: pointer;
    }
    .total_date_title{
        width: 30%;
        flex: 1;
        text-align: center;
        font-size: 22px;
        color: #CBEAFF;
        font-family:PingFang SC;
        font-weight:bold;
    }
    .total_date1_down{
        width: 10px;
        height: 6px;
        background: url('../../../../assets/hotel/pass_down.png') no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 50%;
        margin-top: -3px;
        right: 10%;
        pointer-events: none;
    }
    .total_top10{
        height: 39px;
        width: 179px;
        color: #CBEAFF;
        font-size: 16px;
        line-height: 39px;
        font-family:PingFang SC;
        font-weight:bold;
        text-align: center;
        background: url('../../../../assets/hotel/proIn_top10.png') no-repeat;
        background-size: 100% 100%; 
        float: right;
        margin-left: 5%;
    }
    .total_page_top10{
        height: 47.4%;
        width: 25%;
        min-width: 262px;
        background: url('../../../../assets/hotel/proIn_top10_bg.png') no-repeat;
        background-size: 100% 100%; 
        position: absolute;
        top: 18%;
        right: 8%;
    }
    @media screen and (min-width:1500px) {
        .proTotal_date{
            width: 66%;
        }
    }
</style>
