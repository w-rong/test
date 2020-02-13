import icon_stat from '@/assets/img/maps/icon-1@2x.png';

export var options = {
    geo: {
        map: 'zhoushan',
        // zoom: 3.7,
        // top: '29%',
        // left: '20.5%',
        // aspectScale: 0.87,
        zoom: 3.37,
        top: '23%',
        left: '16%',
        aspectScale: 0.86,
        center: [122.272198,29.809068],
        label: {
            emphasis: {
                show: false
            }
        },
        itemStyle: {
            normal: {
                color: 'rgba(51, 69, 89, 0)', //地图背景色
                // color: 'red', //地图背景色
                // borderColor: '#516a89', //省市边界线00fcff 516a89
                borderWidth: 0
            },
            emphasis: {
                color: 'rgba(37, 43, 61, 0)' //悬浮背景
            }
        }
    },
    series: [
        {
            type: 'scatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            symbol: `image://${icon_stat}`,
            symbolSize: 60,
            // data: [[122.244028,29.769449]],
        }
    ]
}
