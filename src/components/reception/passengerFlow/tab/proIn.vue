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
                    type="date"
                    @change="beginChange"
                    placeholder="选择日期">
                </el-date-picker>
                <div class="total_date1_down"></div>
            </div>
            <div class="total_date_title">省内客流量</div>
            <div class="total_date1">
                <el-date-picker
                    popper-class="down_date"
                    :clearable="false"
                    clear-icon="clearIcon"
                    v-model="endValue"
                    :picker-options="pickerOptions1"
                    ref="focesInput"
                    @change="endChange"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
                <div class="total_date1_down"></div>
            </div>
            <div class=" total_top10">客流量排行</div>
        </div>
        <div class="pass_container" ref="proInEchart"></div>
        <!-- 客源地排行 -->
        <div class="total_page_top10" ref="scenicProIn"></div>
    </div>
</template>

<script>
import moment from "moment"
export default {
    data(){
        return {
            beginValue: moment(new Date(new Date().getTime() - 7 * 24 * 3600 * 1000)).format('YYYY-MM-DD'),
            endValue:  moment(new Date(new Date().getTime() - 1 * 24 * 3600 * 1000)).format('YYYY-MM-DD'),
            proInEchart: null,
            scenicProInEc: null,
            proName: [],
            proData: [],
            mapProData: [],
            pickerOptions0: {
                disabledDate: (time) => {
                    return time.getTime() > new Date(new Date().getTime() - 1 * 24 * 3600 * 1000);

                }
            },
            pickerOptions1: {
                disabledDate: (time) => {
                    // return time.getTime() > new Date(new Date().getTime() - 1 * 24 * 3600 * 1000);
                    return time.getTime() <  new Date(this.beginValue).getTime() || time.getTime() > new Date(new Date().getTime() - 1 * 24 * 3600 * 1000)
                }
            }
        }
    },
    methods: {
        beginChange(data){
            this.beginValue = data
            // this.$refs.focesInput.focus();
            this.getProData()
        },
        endChange(data){
            this.endValue = data
            this.getProData()
        },
        async getProData(){
            var res = await this.$http.get(
                `/aone/getZheJiangCityCount?endTime=${this.endValue.replace(/-/g, '')}&startTime=${this.beginValue.replace(/-/g, '')}`
            )
            this.mapProData = []
            this.proName = []
            this.proData = []
            let{data} = res.data
            if(data.length != 0){
                data.forEach(item=>{
                    if(item.city){
                        this.mapProData.push(
                            [{name: item.city.replace('市', ''), value: item.count}, {name: '舟山'}]
                        )
                    }
                })
                var sortData = data.sort(compare('count', true))
                sortData.forEach(item=>{
                    if(item.city){
                        this.proName.push(item.city)
                        this.proData.push(item.count)
                    }
                })
                

            }
            this.provInMap()
            this.scenicTop()
        },
         provInMap(proInMap){
            var myChart = this.$echarts.init(this.$refs.proInEchart);
            var geoCoordMap = {
                '上海': [121.4648, 31.2891],
                '东莞': [113.8953, 22.901],
                '东营': [118.7073, 37.5513],
                '中山': [113.4229, 22.478],
                '临汾': [111.4783, 36.1615],
                '临沂': [118.3118, 35.2936],
                '丹东': [124.541, 40.4242],
                '丽水': [119.5642, 28.1854],
                '乌鲁木齐': [87.9236, 43.5883],
                '佛山': [112.8955, 23.1097],
                '保定': [115.0488, 39.0948],
                '兰州': [103.5901, 36.3043],
                '包头': [110.3467, 41.4899],
                '北京': [116.4551, 40.2539],
                '北海': [109.314, 21.6211],
                '南京': [118.8062, 31.9208],
                '南宁': [108.479, 23.1152],
                '南昌': [116.0046, 28.6633],
                '南通': [121.1023, 32.1625],
                '厦门': [118.1689, 24.6478],
                '台州': [121.1353, 28.6688],
                '合肥': [117.29, 32.0581],
                '呼和浩特': [111.4124, 40.4901],
                '咸阳': [108.4131, 34.8706],
                '哈尔滨': [127.9688, 45.368],
                '唐山': [118.4766, 39.6826],
                '嘉兴': [120.9155, 30.6354],
                '大同': [113.7854, 39.8035],
                '大连': [122.2229, 39.4409],
                '天津': [117.4219, 39.4189],
                '太原': [112.3352, 37.9413],
                '威海': [121.9482, 37.1393],
                '宁波': [121.5967, 29.6466],
                '宝鸡': [107.1826, 34.3433],
                '宿迁': [118.5535, 33.7775],
                '常州': [119.4543, 31.5582],
                '广州': [113.5107, 23.2196],
                '廊坊': [116.521, 39.0509],
                '延安': [109.1052, 36.4252],
                '张家口': [115.1477, 40.8527],
                '徐州': [117.5208, 34.3268],
                '德州': [116.6858, 37.2107],
                '惠州': [114.6204, 23.1647],
                '成都': [103.9526, 30.7617],
                '扬州': [119.4653, 32.8162],
                '承德': [117.5757, 41.4075],
                '拉萨': [91.1865, 30.1465],
                '无锡': [120.3442, 31.5527],
                '日照': [119.2786, 35.5023],
                '昆明': [102.9199, 25.4663],
                '杭州': [119.5313, 29.8773],
                '枣庄': [117.323, 34.8926],
                '柳州': [109.3799, 24.9774],
                '株洲': [113.5327, 27.0319],
                '武汉': [114.3896, 30.6628],
                '汕头': [117.1692, 23.3405],
                '江门': [112.6318, 22.1484],
                '沈阳': [123.1238, 42.1216],
                '沧州': [116.8286, 38.2104],
                '河源': [114.917, 23.9722],
                '泉州': [118.3228, 25.1147],
                '泰安': [117.0264, 36.0516],
                '泰州': [120.0586, 32.5525],
                '济南': [117.1582, 36.8701],
                '济宁': [116.8286, 35.3375],
                '海口': [110.3893, 19.8516],
                '淄博': [118.0371, 36.6064],
                '淮安': [118.927, 33.4039],
                '深圳': [114.5435, 22.5439],
                '清远': [112.9175, 24.3292],
                '温州': [120.498, 27.8119],
                '渭南': [109.7864, 35.0299],
                '湖州': [119.8608, 30.7782],
                '湘潭': [112.5439, 27.7075],
                '滨州': [117.8174, 37.4963],
                '潍坊': [119.0918, 36.524],
                '烟台': [120.7397, 37.5128],
                '玉溪': [101.9312, 23.8898],
                '珠海': [113.7305, 22.1155],
                '盐城': [120.2234, 33.5577],
                '盘锦': [121.9482, 41.0449],
                '石家庄': [114.4995, 38.1006],
                '福州': [119.4543, 25.9222],
                '秦皇岛': [119.2126, 40.0232],
                '绍兴': [120.564, 29.7565],
                '聊城': [115.9167, 36.4032],
                '肇庆': [112.1265, 23.5822],
                '舟山': [122.2559, 30.2234],
                '苏州': [120.6519, 31.3989],
                '莱芜': [117.6526, 36.2714],
                '菏泽': [115.6201, 35.2057],
                '营口': [122.4316, 40.4297],
                '葫芦岛': [120.1575, 40.578],
                '衡水': [115.8838, 37.7161],
                '衢州': [118.6853, 28.8666],
                '西宁': [101.4038, 36.8207],
                '西安': [109.1162, 34.2004],
                '贵阳': [106.6992, 26.7682],
                '连云港': [119.1248, 34.552],
                '邢台': [114.8071, 37.2821],
                '邯郸': [114.4775, 36.535],
                '郑州': [113.4668, 34.6234],
                '鄂尔多斯': [108.9734, 39.2487],
                '重庆': [107.7539, 30.1904],
                '金华': [120.0037, 29.1028],
                '铜川': [109.0393, 35.1947],
                '银川': [106.3586, 38.1775],
                '镇江': [119.4763, 31.9702],
                '长春': [125.8154, 44.2584],
                '长沙': [113.0823, 28.2568],
                '长治': [112.8625, 36.4746],
                '阳泉': [113.4778, 38.0951],
                '青岛': [120.4651, 36.3373],
                '韶关': [113.7964, 24.7028]
            };

            
            var BJData = this.mapProData;
            // console.log(BJData)
            // var BJData = [
            //     [ { name: '湖州', value: 95 }, { name: '舟山' }],
            //     // [{ name: '舟山' }, { name: '杭州', value: 90 }],
            //     // [{ name: '舟山' }, { name: '金华', value: 80 }],
            //     [{ name: '温州', value: 70 }, { name: '舟山' }],
            //     [ { name: '绍兴', value: 60 }, { name: '舟山' }],
            //     [ { name: '宁波', value: 50 }, { name: '舟山' }],
            //     // [ { name: '衢州', value: 40 }, { name: '舟山' }],
            //     // [ { name: '嘉兴', value: 30 }, { name: '舟山' }]
            // ];
            var planePath = 'path://M4560,4996.6c-530.4-68.2-932.1-239.8-1201.2-514.8c-156-159.9-508.9-803.4-598.6-1092c-50.7-161.9-52.7-384.2-11.7-840.5c39-421.2,42.9-386.1-54.6-432.9c-117-56.5-208.7-138.4-241.8-216.4c-23.4-58.5-23.4-72.2,7.8-136.5c44.8-93.6,93.6-99.4,263.2-31.2l134.6,54.6l58.5-58.5l58.5-58.5l-48.8-536.3C2822.5-3.2,2808.9-360.1,2846-1095.2c9.7-218.4,5.8-386.1-19.5-663c-66.3-723.5-2-1550.3,159.9-2039.7c72.1-216.4,157.9-366.6,278.8-487.5c87.8-89.7,142.3-122.9,304.2-189.2c349.1-146.3,805.3-257.4,1232.4-302.3c173.6-17.5,269.1-17.5,438.8,0c659.1,74.1,1347.5,298.3,1544.4,505.1c140.4,146.3,255.4,399.7,329.6,733.2c101.4,440.7,134.6,1197.3,80,1758.9c-42.9,432.9-46.8,838.5-11.7,982.8c40.9,165.8,9.8,733.2-107.2,1959.8l-50.7,524.6l58.5,56.6l56.6,56.6l150.1-62.4c175.5-74.1,228.1-64.3,265.2,48.8c39,122.9-42.9,235.9-251.6,341.3l-85.8,44.8l13.6,157.9c7.8,87.8,21.4,261.3,31.2,384.2c25.4,300.3,23.4,503.1-1.9,627.9c-29.3,128.7-397.8,863.9-514.8,1019.9c-222.3,298.3-563.6,489.5-1066.6,596.7C5470.7,5004.4,4797.9,5025.8,4560,4996.6z M5517.5,3073.9c444.6-76.1,811.2-255.5,1051.1-516.8c195-208.7,189.1-152.1,85.8-906.7c-48.8-358.8-93.6-657.2-97.5-661.1c-5.9-5.8-117,11.7-247.7,39c-544,111.2-762.4,134.6-1269.4,134.6c-522.6,2-717.6-19.5-1271.4-128.7c-169.6-33.1-312-56.5-315.9-52.6c-3.9,3.9-48.8,304.2-99.4,664.9l-89.7,657.2l48.8,85.8c56.5,93.6,232,273,356.9,362.7c255.4,183.3,663,313.9,1127.1,360.8C4936.4,3126.5,5338.1,3105.1,5517.5,3073.9z M6443.7-2179.4v-702l-70.2-76.1c-187.2-210.6-573.3-321.8-1197.3-347.1c-717.6-29.2-1302.6,101.4-1519.1,335.4l-80,87.8v692.3c0,380.2,7.8,692.2,15.6,692.2c9.8,0,81.9-17.5,161.9-37c319.8-81.9,618.1-107.3,1236.3-107.3c631.8,0,920.4,25.4,1255.8,113.1c91.6,25.3,173.6,46.8,183.3,48.8C6437.9-1479.4,6443.7-1793.3,6443.7-2179.4z';
            var convertData = function(data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    var fromCoord = geoCoordMap[dataItem[0].name];
                    var toCoord = geoCoordMap[dataItem[1].name];
                    if (fromCoord && toCoord) {
                        res.push({
                            fromName: dataItem[0].name,
                            toName: dataItem[1].name,
                            coords: [fromCoord, toCoord]
                        });
                    }
                }
                return res;
            };
            
            var color = ['#fff', '#f0f', '#ff0'];
            var series = [];
            [
                ['舟山', BJData],
            ].forEach(function(item, i) {
                series.push({   //飞行线
                    name: item[0],
                    type: 'lines',
                    zlevel: 1,
                    effect: {
                        show: true,
                        period: 6,
                        trailLength: 0.7,
                        color: '#fff',
                        symbolSize: 3
                    },
                    lineStyle: {
                        normal: {
                            color: '#00FFFF',  //航线颜色
                            width: 1,
                            curveness: 0.2
                        }
                    },
                    data: convertData(item[1])
                }, {
                    // name: item[0] ,
                    type: 'lines',
                    zlevel: 2,
                    symbol: ['none', 'arrow'],
                    symbolSize: 10,
                    effect: {
                        show: true,
                        period: 6,
                        trailLength: 0,
                        symbol: planePath,
                        symbolSize: 15
                    },
                    lineStyle: {
                        normal: {
                            color: '#00FFFF',   //飞机颜色
                            width: 1,
                            opacity: 0.6,
                            curveness: 0.2
                        }
                    },
                    data: convertData(item[1])
                }, {
                    // name: item[0] + ' Top10',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    zlevel: 2,
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            formatter: '{b}'
                        }
                    },
                    symbolSize: function(val) {
                        return val[2] / val[2] + 8;    //圈圈大小
                    },
                    itemStyle: {
                        normal: {
                            color: '#00FFFF'
                        },
                        label:{
                            show: true,
                            textStyle:{
                                fontSize: 14
                            }
                        }
                    },
                    data: item[1].map(function(dataItem) {
                        return {
                            name: dataItem[0].name,
                            value: geoCoordMap[dataItem[0].name].concat([dataItem[0].value])
                        };
                    })
                });
            });
            
            var option = {
                tooltip: {
                    trigger: 'item',
                    formatter: function(data){
                        // console.log(data)
                        if(data){
                            if(data.value){
                                var dataD = data.value[2]
                            } else {
                                // var dataD = data.value[2]
                            }
                        }
                        return dataD
                    }
                },
                geo: {
                    map: '浙江',
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            show: true,
                            textStyle: {
                                color: "#fff",
                                fontSize: 12,
                                fontFamily: "Arial"
                            },
                            borderColor: '#2A8EE8',
                            borderWidth: 1,
                            areaColor: {
                                type: 'radial',
                                x: 0.5,
                                y: 0.5,
                                r: 0.8,
                                colorStops: [{
                                    offset: 0,
                                    color: '#065494' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#084279' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            },
                            shadowColor: '0px 2px 68px 0px rgba(8,66,121,1)',
                        },
                        emphasis: {
                            areaColor: '#389BB7',
                            borderWidth: 0
                        }
                    }
                },
                series: series
            };
            myChart.setOption(option);
        },
        // top10
        scenicTop(){
            var proInName = this.proName
            var proInData = this.proData
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
                    formatter: '{b}{c}',
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
                        interval: 0,
                        textStyle: {
                            color: '#fff',
                            fontSize: 14
                        },
                        interval: 0
                    },
                    data: proInName
                },
                series: [
                    {
                        name: '来源地',
                        type: 'bar',
                        barWidth: '25%',
                        data: proInData,
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
        // this.provInMap()
        // this.scenicTop()
        console.log(this.beginValue)
        this.getProData()
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
    .wh100{
        width: 100%;
        height: 100%;
    }
    /*  */
    .clearIcon{
        content: '';
    }
    .el-date-editor.el-input.el-input--prefix.el-input--suffix.el-date-editor--month input{
        color: #fff;
    }
    .el-date-editor.el-input.el-input--prefix.el-input--suffix.el-date-editor--month input{
        color: #fff;
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
</style>
