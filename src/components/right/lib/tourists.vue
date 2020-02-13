<template>
    <div class="root">
        <h3>游客来源地分析</h3>
        <div ref="bar" class="bar"></div>
    </div>
</template>

<script>
import {options} from '../options/tourists'
import axios from '@/http'

export default {
    data () {
        return {
            list: []
        }
    },
    mounted () {
        let chart = this.$echarts.init(this.$refs.bar)
        chart.setOption(options)
    
        axios.get('/base/getTravelSource', {params: { rdate: '2019-12'}})
            .then(data => {
                let touristList;
                let resdata = data.data.data;
                let values = Object.values(resdata).slice(0,6)
                touristList = jsonSort(resdata,false).slice(0,6)
                console.log(touristList);
                let touristAddress = []
                let touristAccount = []
                touristList.forEach(element => {
                    touristAddress.push(element.name)
                    touristAccount.push(element.value)
      });
                chart.setOption({
                    xAxis: {
                        data: touristAddress
                    },
                    yAxis: {
                        nameGap: 30 * window.scale
                    },
                    series: [
                        {
                            data:  touristAccount,
                            barCategoryGap: window.scale * 28
                        },
                        {
                            data: touristAccount,
                            barCategoryGap: window.scale * 28
                        }
                    ]
                })

                setTimeout(function () {
                    chart.resize();
                })
            })
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

<style scoped lang="less">
    .root{
        .rimStyle();

        .bar{
            height: 15rem - 2.95rem;
            .flexDefault();
        }
    }
</style>

