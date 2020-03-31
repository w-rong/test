<template>
    <div class="root" ref="root">
        <h3>本月车辆来源TOP5</h3>
        <div class="content">
            <ul class="label">
                <li v-for="(i, idx) in list" :key="idx" >
                    <p>{{i.scenicName}}</p>
                    <p>{{i.touristVolume}}</p>
                </li>
            </ul>
            <div ref="bar" class="bar"></div>
        </div>
    </div>
</template>

<script>
import {options} from '../options/spot'
import axios from '@/http'
import { getDate } from '@/utils/utils'

export default {
    data () {
        return {
            list: []
        }
    },
    mounted () {
        let chart = this.$echarts.init(this.$refs.bar)
        chart.setOption(options)
        
        axios.post(`/scenic/findScenicTouristVolume`, {queryTime: getDate()})
            // .then(data => {
            //     // console.log(data);
            //     let vals = data.map(d => d.touristVolume).reverse()
            //     let max = Math.max(...vals)

            //     chart.setOption({
            //         xAxis: {
            //             max
            //         },
            //         series: [
            //             {
            //                 data: data.map(d => d.touristVolume).reverse(),
            //                 // barCategoryGap: window.scale * 28
            //             }
            //         ]
            //     })
            //     this.list = data

            //     setTimeout(function () {
            //         chart.resize();
            //     }, 0)
            // })
    },
    methods: {
        judeg (data) {
            let len = data.length
            while (len < 5) {
                len++
                data.push({"scenicName": "", "touristVolume": ''})
            }

            while (len > 5) {
                len--
                data.splice(len - 1, 1)
            }
            return data
        }
    }
}
</script>

<style scoped lang="less">
    .root{
        background: url("/static/img/bg.png");
        .rimStyleBig();

        .content{
            height: 15rem - 2.95rem;
            display: flex;
            justify-content: space-between;
            padding: 0 1.15rem;
            position: relative;

            .label{
                width: 100%;
                font-size: 0.6rem;
                color: #ADD5FA;
                margin-top: 0.25rem;

                li{
                    background: url('../../../assets/img/spot/bar@2x.png') no-repeat;
                    background-size: 18.7rem 1.5rem;
                    display: flex;
                    line-height: 1.5rem;
                    justify-content: space-between;
                    margin: 0.55rem 0;
                    &>p:nth-child(1){
                        width: 5.5rem;
                        overflow:hidden;
                        text-overflow:ellipsis;
                        white-space:nowrap;
                        text-align: center; 
                    }
                    &>p:nth-child(2){
                        font-size: 0.8rem;
                        color: #0CE3DC;
                    }
                }
            }

            .bar{
                position: absolute;
                width: 13.4rem;
                height: 88%;
                left: 6.5rem;
            }
        }
    }
</style>

