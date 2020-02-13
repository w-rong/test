<template>
    <div class="root">
        <h3>旅游消费</h3>
        <div class="content">
            <dl class="total">
                <dd class="def all">
                    <div class="icon">
                        <img src="@/assets/img/consumption/leftgroup.png" alt="">
                        <img src="@/assets/img/consumption/allplay@2x.png" alt="">
                    </div>
                    <div class="text">
                        <p><strong>{{total / 10000 | fixed}}</strong>万元</p>
                        <p>消费总额</p>
                    </div>
                </dd>
                <dd class="def people">
                    <div class="icon">
                        <img src="@/assets/img/consumption/leftgroup.png" alt="">
                        <img src="@/assets/img/consumption/people@2x.png" alt="">
                    </div>
                    <div class="text">
                        <p><strong>{{avg | fixed}}</strong>元</p>
                        <p>人均消费</p>
                    </div>
                </dd>
            </dl>
            <div class="telval"></div>
            <div class="chart">
                <div class="pie">
                    <img src="@/assets/img/consumption/ring@2x.png" alt="">
                    <img src="@/assets/img/consumption/rightgroup@2x.png" alt="">
                    <div class="pie-echarts" ref="pie-echarts"></div>
                </div>
                <ul class="text">
                    <li>
                        <label for="">景区</label>
                        <p>{{scenic | fixed}}万元</p>
                    </li>
                    <li>
                        <label for="">酒店</label>
                        <p>{{hotel | fixed}}万元</p>
                    </li>
                    <li>
                        <label for="">餐饮</label>
                        <p>{{catering | fixed}}万元</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import {options, setData} from '../options/consumption'
import axios from '@/http'
import { getDate } from '@/utils/utils'
import qs  from "qs"

export default {
    data () {
        return {
            total: 0,
            scenic: 0,
            hotel: 0,
            catering: 0,
            avg: 0,
        }
    },
    filters:{
        fixed(value){
            return value.toFixed(0)
        }
    },
    mounted () {
        let chart = this.$echarts.init(this.$refs['pie-echarts'])
        chart.setOption(options)

        // axios.post('/tourist/findTouristConsumption', {queryTime: getDate()})
        
        axios.post('/tourist/findTouristConsumption', qs.stringify({queryTime: '2019-12'}))
                .then(data => {
                    console.log(data.data.data);
                    this.total = data.data.data.total
                    this.scenic = data.data.data.scenic
                    this.hotel = data.data.data.hotel
                    this.catering = data.data.data.catering
                    this.avg = data.data.data.avg

                    chart.setOption({
                        series: [
                            {
                                data: setData(data.data.data.scenic, data.data.data.hotel, data.data.data.catering)
                            }
                        ]
                    })

                    setTimeout(function () {
                        chart.resize();
                    })
                })
    }
}
</script>

<style scoped lang="less">
    .root{
        .rimStyle();
    }
    .content{
        height: 23.5rem - 2.95rem;
        display: flex;
        padding: 0.9rem 2rem;

        .total{
            .def{
                background: url('../../../assets/img/consumption/bg@2x.png') no-repeat;
                background-size: 9.25rem 4.3rem;
                width: 9.75rem;
                height: 4.3rem;
                .flexDefault(flex-start);
                position: relative;

                .icon{
                    width: 3.4rem;
                    height: 3.4rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img{
                        position: absolute;
                        &:nth-child(1) {
                            width: 3.4rem;
                            height: 3.4rem;
                            .move_rotate();
                        }
                        &:nth-child(2) {
                            width: 1.7rem;
                            height: 1.7rem;
                        }
                    }
                }

                .text{
                    font-size: 0.8rem;
                    color: #BFE0FF;
                    margin-left: 1rem;

                    strong{
                        font-size: 1.2rem;
                    }
                    p:last-child{
                        font-size: 0.7rem;
                        margin-top: 0.1rem;
                    }
                }
                .text li{
                    display: flex;
                    justify-content: space-between;
                }
            }
            .all{
                margin-bottom: 0.5rem;
            }
        }

        .telval{
            background: url('../../../assets/img/consumption/rect@2x.png') no-repeat;
            background-size: 0.05rem 9.35rem;
            height: 9.35rem;
            width: 0.05rem;
            margin-left: 0.5rem;
            margin-right: 2.75rem;
        }
        .chart{
            .pie{
                width: 5.75rem;
                height: 5.75rem;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                img{
                    position: absolute;
                    &:nth-child(1) {
                        width: 5.75rem;
                        height: 5.75rem;
                        .move_rotate();
                    }
                    &:nth-child(2) {
                        width: 3.2rem;
                        height: 3.2rem;
                    }
                }

                .pie-echarts{
                    width: 5.75rem;
                    height: 5.75rem;
                }
            }

            .text{
                font-size: 0.7rem;
                color: #4A739A;
                margin-top: 0.75rem;

                li{
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    position: relative;
                    margin-bottom: 0.5rem;

                    &::after{
                        position: absolute;
                        content: '';
                        width: 0.4rem;
                        height: 0.4rem;
                        border-radius: 50%;
                        overflow: hidden;
                        left: -0.4rem;
                    }

                    &:nth-child(1)::after{
                        background: #0CE3DC;
                    }
                    &:nth-child(2)::after{
                        background: #F6B64A;
                    }
                    &:nth-child(3)::after{
                        background: #1A97FF;
                    }

                    label{
                        margin-right: 0.5rem;
                    }

                    p{
                        color: #BFE0FF;
                    }
                }
            }
        }
    }
</style>

