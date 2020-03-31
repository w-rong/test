<template>
    <div class="total_page">
        <div class="total_date">
            <div class="total_date1">
                
                <el-date-picker
                    v-model="beginValue"
                    type="date"
                    value-format="yyyy-MM-dd"
                    @change="beginChange"
                    popper-class="down_date"
                    :clearable="false"
                    :picker-options="pickerOptions0">
                </el-date-picker>
                <div class="total_date1_down"></div>
            </div>
            <div class="total_date_title">客流量统计</div>
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
                    type="date">
                </el-date-picker>
                <div class="total_date1_down"></div>
            </div>
        </div>
        <div class="total_container" ref="totalechart">ssss</div>
    </div>
</template>

<script>
import moment from "moment"
export default {
    watch:{
        beginValue(newval, oldval){
            console.log(newval , oldval)
        }
    },
    data(){
        return {
            beginValue: moment(new Date(new Date().getTime() - 7 * 24 * 3600 * 1000)).format('YYYY-MM-DD'),
            endValue: moment(new Date(new Date().getTime() - 1 * 24 * 3600 * 1000)).format('YYYY-MM-DD'),
            totalEc: null,
            pickerOptions0: {
                disabledDate: (time) => {
                    // if (this.beginValue != "") {
                        // return time.getTime() > new Date(new Date().getTime() - 7 * 24 * 3600 * 1000) && time.getTime() > new Date(new Date().getTime() - 1 * 24 * 3600 * 1000);
                    // } else {
                        return time.getTime() > new Date(new Date().getTime() - 1 * 24 * 3600 * 1000);
                    // }
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
        async totalEchartFn(){
            this.totalEc = this.$echarts.init(this.$refs.totalechart)
            this.totalEc.showLoading({textColor: '#fff',maskColor: 'rgba(255, 255, 255, 0)'})
            
            var res = await this.$http.get(
                `/scenic/getScenicVolumeStatistics?startTime=${this.beginValue}&endTime=${this.endValue}`
            )
            let {data, code} = res.data
            console.log(res)
            var dataAxis = [];
            var scenicData = [];
            var sortData = data.sort(compare("passengerNum",true))
            if(sortData.length != 0){
                sortData.forEach(item => {
                    dataAxis.push(item.scenicName)
                    scenicData.push(item.passengerNum)
                });
            }
            var yMax = Math.max(...scenicData) + 1000;
            var dataShadow = [];

            for (var i = 0; i < scenicData.length; i++) {
                dataShadow.push(yMax);
            }

            if(code == 10000){
                this.totalEc.hideLoading()
            } else {
                this.totalEc.hideLoading()
            }
            var option = {
                title:{
                    show: scenicData.length == 0,//平常时设置为false，隐藏没有数据的文字提示
                    textStyle:{
                        color:'#bcbcbc'
                    },
                    text:'暂无数据',
                    left:'center',
                    top:'center'
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
                    // name: '单位:(人次)',
                    // nameTextStyle: {
                    //     padding: [0, 0, -70, -300]    // 四个数字分别为上右下左与原位置距离
                    // },
                    type: 'value',
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
                    z: 10
                },
                grid: [
                    {
                        top: '10%',
                        left: '15%',
                        bottom: '10%',
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
                            color: '#C2E2F8'
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
                            color: 'rgba(0,39,71,1)',
                        },
                        label: {
                            normal: {
                                show: false,
                            },
                            emphasis: {
                                show: false,
                            },
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
                                        color: '#0CE3DC',
                                        fontSize: 12   //柱形图每个柱上边的标注
                                    },
                                },
                            },
                            
                        },
                        data: scenicData
                    }
                ]
            };
            this.totalEc.setOption(option);
            window.addEventListener('resize', this.resizeHandler)
        },
        beginChange(data){
            console.log(data)
            this.beginValue = data
            this.totalEchartFn()
            // this.$refs.focesInput.focus();
        },
        endChange(data){
            console.log(data)
            this.endValue = data
            this.totalEchartFn()
        },
        resizeHandler(){
            this.totalEc.resize()
        }
    },
    mounted(){
        // console.log(this.beginValue)
        // console.log(this.endValue)
        // console.log(new Date(this.endValue).getMonth()+1)
        // var beginTime = new Date(this.beginValue).getFullYear()+'-'+new Date(this.beginValue).getMonth()+1 +'-'+new Date(this.beginValue).getDate()
        // var endTime = new Date(this.endValue).getFullYear()+'-'+new Date(this.endValue).getMonth()+1 +'-'+new Date(this.endValue).getDate()
        // var beginTime =  moment(new Date(new Date().getTime() - 7 * 24 * 3600 * 1000)).format('YYYY-MM-DD')
        // var endTime  =  moment(new Date(new Date().getTime() - 1 * 24 * 3600 * 1000)).format('YYYY-MM-DD')
        // console.log(beginTime)
     
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
        position: relative;
    }
    .total_date{
        width: 56%;
        height: 13%;
        margin: 0 auto;
        display: flex;
    }
    .total_container{
        width: 76%;
        flex: 1;
        margin: 0 auto;
        display: flex;
    }
    .total_date1{
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
