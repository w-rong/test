const colors = ['#2080F7', '#02D7CB', '#F5C70F', '#AE52FF', '#FA9837', '#4FDB5D']

export function setColors (data) {
    let result = []
    data.reduce((old, d, idx) => {
        let now = old + parseFloat(d)
        result.push([now, colors[idx]])
        return now
    }, 0)
    result.push([1, 'rgba(255,255,255,0)'])
    return result
}

export var options = {
    series: [
        {
            name: '统计',
            type: 'gauge',
            splitNumber: 10, //刻度数量
            radius: '60%', //图表尺寸
            center: ['50%', '50%'],
            startAngle: 90,
            endAngle: -270,
            axisLine: {
                show: false,
                lineStyle: {
                    width: 2,
                    shadowBlur: 0,
                    color: setColors([0.1, 0.9])
                }
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: true,
                lineStyle: {
                    color: 'auto',
                    width: 1
                },
                length: 8,
                splitNumber: 6
            },
            axisLabel: {
                show: false
            },
        }, {
            name:'访问来源',
            type:'pie',
            radius: ['72%', '74%'],
            color: colors,
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: [40, 40, 40, 40]
        }
    ]
}
