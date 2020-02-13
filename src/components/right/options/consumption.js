import echarts from 'echarts';

export function setData (a, b, c) {
    let all = Number(a) + Number(b) + Number(c)
    let one = Math.round(28 * (a / all))
    let two = Math.round(28 * (b / all)) + one
    return Array(28).fill(20).map((d, idx) => {
        let obj = {
            value: 20
        }
        if (idx < one) {
            obj.itemStyle = {
                color: '#0ce3dc'
            }
        } else if (idx < two) {
            obj.itemStyle = {
                color: '#F6B64A'
            }
        } else {
            obj.itemStyle = {
                color: '#1a97ff'
            }
        }

        return obj
    })
}

export var options = {
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['62%', '82%'],
            color: ['#0ce3dc', '#F6B64A', '#1a97ff'],
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: setData(13, 24, 66)
        }
    ]
}