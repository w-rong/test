<template>
    <div class="root" ref="root">
        <div class="amimate-bg"></div>
        <div class="chart-map" ref="chartMap" :style="{width: `${width}px`, height: `${height}px`}"></div>
        <div class="statistical">
            <h4>实时游客统计</h4>
            <p>{{number}}</p>
            <img class="line" src="@/assets/img/maps/Line 2@2x.png" alt="">
            <img class="line top" src="@/assets/img/maps/Line 2@2x.png" alt="">
        </div>
        <div class="data-show">
            <label for="">数据展示:</label>
            <ul>
                <li @click="changeBox(index)" v-for="(item, index) in lists" :key="index"  >
                    <div class="checkbox" :style="{backgroundImage: `url(${checkIndex==index ? checkedImg : nocheckedImg})`}"></div>
                    <p>{{item.name}}</p>
                </li>
                <!-- <li @click="change('spot')">
                    <div class="checkbox" :style="{backgroundImage: `url(${spotState ? checkedImg : nocheckedImg})`}"></div>
                    <p>景区</p>
                </li>
                <li @click="change('ship')">
                    <div class="checkbox" :style="{backgroundImage: `url(${shipState ? checkedImg : nocheckedImg})`}"></div>
                    <p>船流分析</p>
                </li>
                <li @click="change('museum')">
                    <div class="checkbox" :style="{backgroundImage: `url(${museumState ? checkedImg : nocheckedImg})`}"></div>
                    <p>文博物馆</p>
                </li> -->
            </ul>
        </div>
        <div class="points">
            <div v-for="(i, idx) in points" :key="idx" :class="[hoverIdx === idx ? 'enter' : 'leave']" class="points-icon" v-show="checkIndex==0"
                :style="{left: `${i[0]}px`, top: `${i[1]}px`}" @mouseenter="() => enter(idx)" @mouseleave="leave" @click="() => checked(idx)"></div>
            <div class="dialog" v-if="checkedIdx >= 0" :style="{left: `${points[checkedIdx][0] + (scale * 5)}px`, top: `${points[checkedIdx][1] - (scale * 200) - (scale * 25)}px`}">
                <div class="content">
                    <div class="image">
                        <img src="@/assets/img/maps/3.png" alt="">
                    </div>
                    <div class="text">
                        <div>
                            <span>{{realTimeTourist[checkedIdx].scenicName}}</span>
                        </div>
                        <div>
                            <label for="">客流量:</label>
                            <span>{{realTimeTourist[checkedIdx].realAmount}}人</span>
                        </div>
                        <!-- <h4>{{realTimeTourist[checkedIdx].scenicName}}</h4> -->
                        <div>
                            <label for="">拥挤度:</label>
                            <span>{{realTimeTourist[checkedIdx].saturation}}</span>
                        </div>
                        <div>
                            <label for="">最大承载量:</label>
                            <span>{{realTimeTourist[checkedIdx].maxAmount}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="map_tag"  v-show="checkIndex==0">
            <img src="../../../assets/img/maps/icon-1@2x.png" alt="">
            <span>景区</span>
        </div>
    </div>
</template>

<script>
import {options} from '../options/maps';
import zhoushan from '../../../../public/static/zhoushan.json';
import nocheckedImg from '@/assets/img/maps/nochecked@2x.png';
import checkedImg from '@/assets/img/maps/checked@2x.png';

import axios from '@/http'
import { setTimeout } from 'timers';

export default {
    data () {
        return {
            nocheckedImg,
            checkedImg,
            lists:[{name:'景区'},{name:'船流'},{name:'文博物馆'}],
            checkIndex:0,
            spotState: true,
            shipState: false,
            museumState: false,
            chart: null,
            points: [],
            checkedIdx: -1,
            hoverIdx: -1,
            number: 0,
            realTimeTourist: [],
            scale: window.scale,
            width: 0,
            height: 0
        }
    },
    methods: {
        change (type) {
            if (type === 'spot') {
                this.spotState = !this.spotState
            } else if (type === 'ship'){
                this.shipState = !this.shipState
            } else {
                this.museumState = !this.museumState
            }
        },
        changeBox(index){
            this.checkIndex = index
        },
        initChart () {
            this.$echarts.registerMap('zhoushan', zhoushan);
            let dom = this.$refs.root

            setTimeout(() => {
                this.width = dom.clientWidth
                this.height = dom.clientHeight * 1.1
                
                this.$nextTick(() => {
                    let chart = this.chart = this.$echarts.init(this.$refs.chartMap);
                    chart.setOption(options);
                })
            })
        },
        leave () {
            this.hoverIdx = -1
        },
        enter (idx) {
            this.hoverIdx = idx
        },
        checked (idx) {
            this.checkedIdx = idx
        }
    },
    mounted () {
        this.initChart()

        axios.get('/base/getTotalPersonNumber', {params: {rdate: '2019-12'}})
            .then(data => this.number = data.data.data)

        axios.post('/scenic/findScenicRealTimeTourist')
            .then(data => {
                console.log(data);
                this.realTimeTourist = data.data.data
                data.data.data.forEach(d => {
                    let p = this.chart.convertToPixel('geo', [d.lng, d.lat])
                    this.points.push([p[0] - (this.scale * 24), p[1] - (this.scale * 23.5)])
                })
            })
    }
}
</script>

<style scoped lang="less">
    @keyframes shooting {
        0%{
            transform: translatey(-100%);
        }
        100%{
            transform: translatey(200%);
        }
    }
    @keyframes enter {
        0%{
            transform: scale(1) rotatez(-15deg);
        }
        80%{
            transform: scale(1.2) rotatez(-15deg);
        }
        100%{
            transform: scale(1.15) rotatez(-15deg);
        }
    }
    @keyframes leave {
        0%{
            transform: scale(1.15) rotatez(-15deg);
        }
        80%{
            transform: scale(0.95) rotatez(-15deg);
        }
        100%{
            transform: scale(1) rotatez(-15deg);
        }
    }

    @keyframes move {
        0%{
            transform: translate(0px);
        }
        100%{
            transform: translate(115%);
        }
    }
    @keyframes movereverse {
        0%{
            transform: translate(115%);
        }
        100%{
            transform: translate(0px);
        }
    }
    .root{
        width: 43rem;
        height: 32rem;
        margin-top: 1rem;
        background: url('../../../../public/static/img/map.png') no-repeat;
        background-size: 33.75rem 36.9rem;
        position: relative;
        // overflow: hidden;
        &>div{
            position: absolute;
        }

        .chart-map{
            // width: 100%;
            // height: 110%;
            // width: 771px;
            // height: 631px;
            transform: rotateZ(15deg);
        }

        .amimate-bg{
            width: 100%;
            background: url('../../../../public/static/img/light@2x.png') no-repeat;
            height: 100%;
            background-size: 40.55rem 33.45rem;
            animation: shooting 5s ease-in;
            animation-fill-mode: forwards;
        }

        .statistical{
            left: 0;
            top: 0;
            padding-left: 1.5rem;
            background: url('../../../assets/img/maps/statistical.png') no-repeat;
            width: 10.8rem;
            height: 5.15rem;
            background-size: 10.8rem 5.15rem;
            flex-direction: column;
            .flexDefault();

            .line{
                width: 4.35rem;
                height: 0.1rem;
                position: absolute;
                bottom: 0;
                left: 0;
                animation: move ease-in 5s infinite alternate;

                &.top{
                    top: 0;
                    animation: movereverse ease-in 5s infinite alternate;
                }
            }
            h4{
                color: #BFE0FF;
                font-size: 0.8rem;
                line-height: 1.1rem;
            }
            p{
                font-size: 2rem;
                color: #0CE3DC;
            }
        }

        .data-show{
            left: 0;
            top: 7rem;
            font-size: 0.8rem;
            color: #BFE0FF;
            z-index: 99;
            .flexDefault(flex-start, flex-start);

            label{
                margin-right: 0.5rem;
            }

            ul{
                position: relative;
                top: -5px;
                li{
                    cursor: pointer;
                    margin-bottom: 0.5rem;
                    .flexDefault(flex-start);
                    .checkbox{
                        width: 1.45rem;
                        height: 1.45rem;
                        background-size: 1.45rem;
                        background-repeat: no-repeat;
                        padding: 0 0.1rem;
                        position: relative;
                        top: 0.1rem;
                    }
                }
            }
        }

        .points{
            width: 100%;
            height: 110%;
            transform: rotateZ(15deg);

            .points-icon{
                position: absolute;
                width: 4.5rem;
                height: 4.5rem;
                background: url('../../../assets/img/maps/icon-1@2x.png') no-repeat;
                background-size: 2.4rem 2.35rem;
                width: 2.4rem;
                height: 2.35rem;
                transform: rotatez(-15deg);
                transform-origin: center bottom;
                cursor: pointer;
            }
            .points-icon.enter{
                animation: enter .2s ease-in-out;
                animation-fill-mode: forwards;
            }
            .points-icon.leave{
                animation: leave .2s ease-in-out;
                animation-fill-mode: forwards;
            }
        }

        .dialog{
            transform: rotatez(-15deg) translateZ(0);
            transform-origin: center bottom;
            background: url('../../../assets/img/maps/dialog.png') no-repeat;
            // width: 7.9rem;
            // height: 4.7rem;
            width: 15.85rem;
            height: 9.4rem;
            background-size: contain;
            left: 0;
            top: 0;
            position: absolute;

            .content{
                position: absolute;
                right: 0;
                top: 0;
                // width: 6.85rem;
                // height: 3.5rem;
                width: 13.85rem;
                height: 6.8rem;
                font-size: 0.7rem;
                box-sizing: border-box;
                color: #BFE0FF;
                .flexDefault();
                justify-content: flex-start;

                .image{
                    width: 4.2rem;
                    height: 4.55rem;
                    margin: 0 0.5rem 0 0.75rem;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }

                .text{
                    line-height: 1.15rem;
                    label{
                        margin-right: 0.5rem;
                    }
                    h4{
                        color: #42E1EF;
                    }

                    &>div:nth-child(2){
                        span{
                            color: #f5c70f;
                        }
                    }
                    &>div:nth-child(4){
                        span{
                            color: #d78d0b;
                        }
                    }
                }
            }
        }
    }
    .map_tag{
        width: 8rem;
        height: 4rem;
        line-height: 4rem;
        position: absolute;
        right: 0;
        bottom: 1rem;
    }
    .map_tag img{
        width: 4rem;
        height: 4rem;
    }
    .map_tag span{
        display: inline-block;
        width: 4rem;
        height: 4rem;
        // text-align: center;
        // line-height: 4rem;
        color: #fff;
        font-size: 1.2rem;
        position: absolute;
        right: 0;
        top: 0;
    }
</style>

