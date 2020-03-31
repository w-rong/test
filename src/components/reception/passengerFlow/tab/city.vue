<template>
    <div class="total_page">
        <div class="total_date">
            <div class="total_date1">
                <el-date-picker
                    popper-class="down_date"
                    :clearable="false"
                    clear-icon="clearIcon"
                    v-model="beginValue"
                    value-format="yyyy-MM-dd"
                    @change="beginChange"
                    :picker-options="pickerOptions0"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
                <div class="total_date1_down"></div>
            </div>
            <div class="total_date_title">城市客流量</div>
            <div class="total_date1">
                <el-date-picker
                    popper-class="down_date"
                    :clearable="false"
                    clear-icon="clearIcon"
                    v-model="endValue"
                    ref="focesInput"
                    @change="endChange"
                    :picker-options="pickerOptions1"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
                <div class="total_date1_down"></div>
            </div>
        </div>
        <div class="total_container" ref="totalechart"></div>
    </div>
</template>

<script>
import moment from "moment"
import qs from 'qs'
export default {
    data(){
        return {
            beginValue: moment(new Date(new Date().getTime() - 7 * 24 * 3600 * 1000)).format('YYYY-MM-DD'),
            endValue: moment(new Date(new Date().getTime() - 1 * 24 * 3600 * 1000)).format('YYYY-MM-DD'),
            totalEc: null,
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
            },
        }
    },
    methods: {
        beginChange(data){
            this.beginValue = data
            this.totalEchartFn()
            // this.$refs.focesInput.focus();
        },
        endChange(data){
            this.endValue = data
            this.totalEchartFn()
        },
        async totalEchartFn(){
            var startTime = this.beginValue.replace(/-/g, '')
            var endTime = this.endValue.replace(/-/g, '')
            var res = await this.$http.get(
                `/aone/getCityCount?endTime=${endTime}&startTime=${startTime}`
            )
            let {data, code} = res.data
            var dataAxis = [];
            var data1 = []
            let sortData = data.sort(compare("count",false)).slice(0, 10)
            sortData.forEach(element => {
                if(element.city){
                    dataAxis.push(element.city.replace('市', ''))
                    data1.push(element.count)
                }
            });

            this.totalEc = this.$echarts.init(this.$refs.totalechart)
            var yMax = Math.max(...data1);
            var maxY = Number(yMax +( yMax/6)).toFixed(0)
            var dataShadow = [];

            for (var i = 0; i < data1.length; i++) {
                dataShadow.push(maxY);
            }

            var option = {
                title: {
                    text: data1.length == 0 ? '暂无数据' : '单位: （人次）',
                    x: data1.length == 0 ? 'center' : '48%',
                    y: data1.length == 0 ? 'center' : '95%',
                    textStyle: {
                        color: data1.length == 0 ? '#bcbcbc' : '#58B9D8',
                        fontWeight: data1.length == 0 ? 600 :  400,
                        fontSize: data1.length == 0 ? 16 : 14
                    }
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: function(data){
                            return data[1].axisValue + data[1].value+'人'
                    }
                },
                xAxis: {
                    type: 'category',
                    data: dataAxis,
                    axisLabel: {
                        textStyle: {
                            color: '#C2E2F8',
                            fontSize: 14
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
                },
                grid: [
                    {
                        top: '10%',
                        left: '15%',
                        bottom: '10%',
                        right: '5%',
                    }
                ],
                yAxis: {
                    type: 'value',
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#346B85',
                            fontSize: 14
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
			        max: maxY,
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
                        barWidth: '30%',
                        itemStyle: {
                            color: 'rgba(0,39,71,1)',
                            emphasis: {
                                show:false
                            }
                        },
                        barGap: '-100%',
                        barCategoryGap: '40%',
                        data: dataShadow,
                        animation: false
                    },
                    {
                        type: 'bar',
                        barWidth: '30%',
                        itemStyle: {
                            normal:{
                                color: new this.$echarts.graphic.LinearGradient(
                                    0, 0,  0, 1,
                                    [
                                        {offset: 0, color: '#0D5EA0'},
                                        {offset: 1, color: '#05CBD7'}
                                    ]
                                ),
                                label: {
                                    show: true,
                                    position: 'top',
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
            this.totalEc.setOption(option);
            window.addEventListener('resize', this.resizeHandler)
        },
        resizeHandler(){
            this.totalEc.resize()
        }
    },
    mounted(){
        this.totalEchartFn()
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
    
    .el-date-editor.el-input.el-input--prefix.el-input--suffix.el-date-editor--month input{
        color: #fff;
    }
    .wh100{
        width: 100%;
        height: 100%;
    }
    /*  */
    .clearIcon{
        content: '';
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
    .total_date{
        width: 56%;
        height: 13%;
        margin: 0 auto;
        display: flex;
    }
    .total_container{
        width: 70%;
        flex: 1;
        margin: 0 auto;
        display: flex;
    }
    .total_date1{
        /* width: 28%; */
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
</style>
