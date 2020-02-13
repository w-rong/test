<template>
    <div class="root">
        <h3>舆情分析</h3>
        <ul class="opinion">
            <li v-for="(i, idx) in list" :key="idx" :style="{animationDelay: `${idx * 1000}ms`}">
                <div :style="{transform: `scale(${checked === idx ? 1 : i.scale})`, opacity: `${checked === idx ? 1 : 0.7}`}" @mouseover="over(idx)">
                    <p>{{i.name}}</p>
                    <p>{{i.count}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from '@/http'
import { setTimeout } from 'timers';

export default {
    data () {
        return {
            list: [],
            checked: 0
        }
    },
    methods: {
        random () {
            return parseInt(Math.random()*(5000-0)) + 0 
        },
        over (idx) {
            this.checked = idx
        },
        loop () {
            let self = this
            ;(function step () {
                self.checked += 1
                if (self.checked === self.list.length - 1) {
                    self.checked = 0
                }
                setTimeout(step, 3000)
            })()
        }
    },
    mounted () {
        axios.post('/scenic/findCommentAnalysis')
            .then(data => {
                // console.log(data);
                this.list = data.data.data.map(d => {
                    let obj = {}
                    obj.scale = Math.random() > 0.5 ? 0.6 : 0.5
                    obj.delay = this.random()
                    obj.name = d
                    return obj
                })
                this.loop()
            })
    }
}
</script>

<style scoped lang="less">
    @keyframes float {
        0%{
            transform: translate3d(0, 0, 0);
        }
        100%{
            transform: translate3d(10px, 0px, 0);
        }
    }

    .root{
        .rimStyle();
        position: relative;

        .opinion{
            li{
                z-index: 10;
                text-align: center;
                font-size: 1rem;
                color: #FFFFFF;
                position: absolute;
                animation-direction: alternate;
                animation-name: float;
                animation-timing-function: linear;
                animation-iteration-count: infinite;
                animation-duration: 5s;
                
                &>div{
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    background: url('../../../assets/img/opinion/big@2x.png') no-repeat;
                    background-size: 5.2rem 5rem;
                    width: 5.2rem;
                    height: 5rem;
                    transition: transform .3s ease ;
                }
                p{
                    text-shadow: 0 0 0.25rem #fff;
                }

                p:nth-child(2){
                    font-size: 0.7rem;
                    margin-top: 0.25rem;
                }

                &:nth-child(1){
                    left: 41%;
                    top: 40%;
                }
                &:nth-child(2){
                    left: 20%;
                    top: 57%;
                }
                &:nth-child(3){
                    left: 23%;
                    top: 21%;
                }
                &:nth-child(4){
                    left: 9%;
                    top: 42%;
                }
                &:nth-child(5){
                    left: 50%;
                    top: 63%;
                }
                &:nth-child(6){
                    left: 61%;
                    top: 43%;
                }
                &:nth-child(7){
                    left: 45%;
                    top: 16%;
                }
                &:nth-child(8){
                    left: 69%;
                    top: 18%;
                }
                &:nth-child(9){
                    left: 69%;
                    top: 60%;
                }
                &:nth-child(10){
                    left: 9%;
                    top: 25%;
                }
            }
        }
    }
</style>

