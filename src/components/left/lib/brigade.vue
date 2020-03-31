<template>
    <div class="root" ref="root">
        <h3>文旅资源统计</h3>
        <ul class="content">
            <li v-for="(i, idx) in list" :key="idx">
                <div class="img" v-if="imgs[idx]">
                    <img :src="imgs[idx].data" alt="" :style="{width: imgs[idx].wh ? '100%' : 'auto', height: !imgs[idx].wh ? '100%' : 'auto'}">
                </div>
                <div class="text">
                    <!-- {{imgs[idx]}} -->
                    <p>{{i[1]}}</p>
                    <p>{{i[0]}}</p>
                </div>
                <!-- <div class="img">
                    <img src="" alt="" :style="{width: imgs[idx].wh ? '100%' : 'auto', height: !imgs[idx].wh ? '100%' : 'auto'}">
                </div>
                <div class="text">
                    <p></p>
                    <p>{{i[0]}}</p>
                </div> -->
            </li>
            <li>
                <div class="img">
                    <img src="../../../assets/img/brigade/more.png" alt="" style="width:100%">
                </div>
                <div class="text">
                    <p></p>
                    <p style="cursor:pointer;" @click="skip()">更多</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from '@/http'

function addImg (num) {
    let res = Array(num).fill({data: null, wh: true})
    for (let i = 0; i < num; i++) {
        import(`@/assets/img/brigade/z${i}.png`).then(data => {
            let obj = {}
            let img = new Image()
            img.src = data.default
            img.onload = function () {
                obj.wh = this.width > this.height
                obj.data = data.default
                res.splice(i, 1, obj)
            }
        })
    }
    return res
}
let imgs = addImg(12)

export default {
    data () {
        return {
            list: [],
            imgs
        }
    },
    mounted () {
        axios.get('/base/getAllSourceCountMin', {params: {isDelete: 0}})
            .then(data => {
                this.list = Object.entries(data.data.data).splice(0,11)
                // console.log(Object.entries(data).splice(0,9));
            })
    },
    methods: {
    skip() {
      const { href } = this.$router.resolve({
        path: "/gis"
      });
      window.open(href, "_blank");
    }
  }
}
</script>

<style scoped lang="less">
    .root{
        .rimStyle();

        .content{
            display: flex;
            flex-wrap: wrap;
            padding:  1rem 0.5rem 0 1.75rem;
            height: 8.7rem;
            align-content: space-between;
            justify-content: space-between;

            li{
                display: flex;
                width: 5.1rem;
                align-items: center;

                .img{
                    margin-right: 0.35rem;
                    width: 1.25rem;
                    height: 1.25rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .text{
                    &>p:nth-child(1) {
                        font-size: 0.9rem;
                        color: #0CE3DC;
                    }
                    &>p:nth-child(2) {
                        font-size: 0.7rem;
                        color: #A7CFF4;
                    }
                }
            }
        }
    }
</style>

