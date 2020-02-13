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
                    type="date"
                    placeholder="选择日期">
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
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
                <div class="total_date1_down"></div>
            </div>
        </div>
        <div class="total_container" ref="totalechart">ssss</div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            beginValue: new Date(),
            endValue: new Date(),
            totalEc: null
        }
    },
    methods: {
        totalEchartFn(){
            this.totalEc = this.$echarts.init(this.$refs.totalechart)
            var dataAxis = ['沈家门渔港小镇', '杉杉普陀天地', '舟山桃花岛', '普陀白沙岛','普陀山', '朱家尖', '干施岱村', '蚂蚁岛村', '东沙村', '白沙港村', '盐厂村', '东晓村', '塔湾村'];
            var data = [220, 182, 191, 234, 214,220, 182, 191, 234, 214,343,232];
            var yMax = 500;
            var dataShadow = [];

            for (var i = 0; i < data.length; i++) {
                dataShadow.push(yMax);
            }

            var option = {
                title: {
                    text: data.length == 0 ? '暂无数据' : '单位: （人次）',
                    x: data.length == 0 ? 'center' : '48%',
                    y: data.length == 0 ? 'center' : '95%',
                    textStyle: {
                        color: data.length == 0 ? '#bcbcbc' : '#58B9D8',
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
                        right: '5%',
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
</script>

<style>
    .wh100{
        width: 100%;
        height: 100%;
    }
    /*  */
    .clearIcon{
        content: '';
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
        width: 70%;
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
