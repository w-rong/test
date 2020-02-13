import echarts from 'echarts';

export var options = {
    xAxis: {
        type: 'category',
        axisTick: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#346B85'
            }
        },
        axisLabel: {
            color: '#5583AE',
            fontSize: 14,
            interval: 0,
            margin: 12
        }
    },
    yAxis: {
        type: 'value',
        splitLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#346B85'
            }
        },
        axisLabel: {
            color: '#5583AE',
            fontSize: 14,
            margin: 10
        },
        name: '单位:人',
        nameTextStyle: {
            color: '#BFE0FF',
            align: 'right',
            fontSize: 14,
        },
        nameGap: 30 
    },
    grid: {
        left: '16%',
        right: '8%',
        top: '24%',
        bottom: '23%'
    },
    series: [
        {
            type: 'bar',
            itemStyle: {
                color: new echarts.graphic.LinearGradient(
                    0, 0, 1, 1,
                    [
                        {offset: 0, color: '#36C7E4'},
                        {offset: 1, color: '#1996C4'}
                    ]
                ),
                shadowColor: 'red'
            },
            barCategoryGap: 32,
            data: [],
            z: 2
        },
        {
            barGap: '-100%',
            type: 'bar',
            itemStyle: {
                color: '#002747'
            },
            barCategoryGap: 32,
            data: [6000, 6000],
            z: 1
        }
    ]
}