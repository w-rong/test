import echarts from 'echarts';

export var options = {
    xAxis: {
        type: 'value',
        show: false
    },
    yAxis: {
        type: 'category',
        show: false
    },
    grid: {
        left: 10,
        top: 8,
        bottom: 0,
    },
    series: [
        {
            type: 'bar',
            itemStyle: {
                color: new echarts.graphic.LinearGradient(
                    0, 0, 1, 1,
                    [
                        {offset: 0, color: '#00579E'},
                        {offset: 1, color: '#0BAEA9'}
                    ]
                )
            },
            barWidth: '40%',
            data: []
        }
    ]
}