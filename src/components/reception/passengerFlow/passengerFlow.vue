<template>
    <div class="Passeng">
        <div class="Passeng_title">
            <!-- <div class="Passeng_title_txt">景区客流量统计</div> -->
                <headtop :title='pageTitle'/>
        </div>
        <div class="Passeng_container">
            <div class="Passeng_container_nav">
                <div class="Passeng_container_nav_conbg"></div>
                <div class="Passeng_container_nav_con">
                    <div class="P_nav_con_item" v-for="(item, index) in itemList" :key="index"  :class="{ active:index == iconNowIndex}" @click="icontoggleTab(index)">
                        <div class="P_nav_con_item_txt">{{item}}</div>
                    </div>
                    <!-- <div class="Passeng_container_nav_con1" v-for="(item, index) in itemList" :key="index" @click="icontoggleTab(index)"> -->
                        <!-- <div style="height: 60%; width: 100%;display: flex;">
                            <div class="Passeng_container_nav_con1_l">
                                <img :src="index == iconNowIndex ? item.actBig1 : item.big1" alt="" class="Passeng_container_nav_con1_l_img1 big1Rotate">
                                <img :src="index == iconNowIndex ? item.actBig2 : item.big2" alt="" class="Passeng_container_nav_con1_l_img1 big2Rotate">
                                <img :src="index == iconNowIndex ? item.actBig3 : item.big3" alt="" class="Passeng_container_nav_con1_l_img1 big1Rotate">
                                <img src="../../../assets/hotel/big_icon.png" alt="" class="Passeng_container_nav_con1_l_img1">
                            </div>
                            <div class="Passeng_container_nav_con1_r">
                                <img :src="index == iconNowIndex ? item.actBig4 : item.big4"  alt="" class="Passeng_container_nav_con1_r_img">
                                <div class="Passeng_container_nav_con1_r_txt">{{item.text}}</div>
                            </div>
                        </div> -->
                    <!-- </div> -->
                </div>

            </div>
            <div class="Passeng_container_item">
                <div class="Passeng_container_item_bg">
                    <total class="Passeng_container_item_content"  v-if="iconNowIndex===0"/>
                    <proIn class="Passeng_container_item_content"  v-if="iconNowIndex===1"/>
                    <proOut class="Passeng_container_item_content"  v-if="iconNowIndex===2"/>
                    <city class="Passeng_container_item_content"  v-if="iconNowIndex===3"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import headtop from '@/components/header/headtop';
import city from '@/components/reception/passengerFlow/tab/city.vue'
import proIn from '@/components/reception/passengerFlow/tab/proIn.vue'
import proOut from '@/components/reception/passengerFlow/tab/proOut.vue'
import total from '@/components/reception/passengerFlow/tab/total.vue'
export default {
    components: {
        city,proIn,proOut,total,headtop
    },
    data(){
        return{
            pageTitle: '景区客流量统计',
            iconNowIndex: 0,
            itemList: ['客流量统计','省内客流量','省外客流量','城市客流量']
        }
    },
    methods: {
        icontoggleTab(index){
            this.iconNowIndex = index
        }
    }
}
</script>

<style>
    .el-picker-panel.down_date{
        background-color: #072342;
    }
    .el-picker-panel.down_date .el-date-picker__header-label{
        color: #ABCBFF;
    }
    .el-picker-panel.down_date .el-picker-panel__icon-btn{
        color: #ABCBFF;
    }
    .Passeng{
        width: 100%;
        height: 100%;
        background: url('../../../assets/hotel/F_bg.jpg') no-repeat;
        background-size: 100% 100%;
    }
    .Passeng_title{
        width: 100%;
        height: 8.7%;
        /* background: url('../../../assets/hotel/pass_title.png') no-repeat;
        background-size: 100% 100%; */
        position: relative;
    }
    .Passeng_title_txt{
        height: 22px;
        width: 100%;
        margin-top: -11px;
        position: absolute;
        top: 50%;
        text-align: center;
        font-family:PingFang SC;
        line-height: 10px;
        font-size: 22px;
        text-shadow:0px 1px 0px rgba(0, 0, 0, 1);
        font-weight:bold;
        color:#CBEAFF;
    }
    .Passeng_container{
        height: 91.2%;
        width: 100%;
        display: flex;
        padding: 4% 0;
        box-sizing: border-box;
        /* margin-top: 3%; */
    }
    /* 侧边栏 */
     .Passeng_container_nav{
        width: 300px;
        height: 100%;
        float: left;
        position: relative;
    }
    .Passeng_container_nav_conbg{
        width: 91px;
        height: 75%;
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 6;
        background: url('../../../assets/hotel/P_side_bj.png') no-repeat;
        background-size: 100% 100%;
    }
    .Passeng_container_nav_con{
        width: 198px;
        height: 100%;
        margin-left: 70px;
        position: relative;
        padding-top: 57px;
        box-sizing: border-box;
    }
    .P_nav_con_item{
        width: 100%; 
        height: 68px;
        background: url('../../../assets/hotel/W_navDefault_bj.png') no-repeat;
        background-size: auto 100%;
        cursor: pointer;
        margin-bottom: 16px;
    }
    .P_nav_con_item.active{
        width: 198px;
        height: 68px;
        background: url('../../../assets/hotel/W_navActive_bj.png') no-repeat;
        background-size: auto 100%;
    }
    .P_nav_con_item_txt{
        line-height: 68px;
        font-size: 16px;
        margin-left: 82px;
        color: #fff;
    }

    .Passeng_container_nav_con1{
        width: 78.62%;
        height: 25%;
        display: flex;
        position: relative;
        cursor: pointer;
    }
    .Passeng_container_nav_con1_l{
        width: 34.97%;
        height: 100%;
        /* padding-bottom: 30%; */
        box-sizing: border-box;
        position: relative;
    }
    .Passeng_container_nav_con1_r{
        flex: 1;
        height: 100%;
        /* padding-bottom: 30%; */
        box-sizing: border-box;
        position: relative;
    }
    .Passeng_container_nav_con1_l_img1{
        display: block;
        height: 100%;
        /* width: 100%; */
        position: absolute;
        left: 0;
        top: 0;
    }
    .Passeng_container_nav_con1_r_img{
        width: 120%;
        height: 88%;
        /* height: 52.3%; */
        display: block;
        position: absolute;
        top: 6%;
        left: -17%;
    }
    .Passeng_container_nav_con1_r_txt{
        width: 100%;
        height: 18px;
        line-height: 18px;
        color: #cbeaff;
        position: absolute;
        top: 50%;
        margin-top: -9px;
    }
    .big1Rotate{
        -webkit-animation: reveRotate1 6s 1s linear infinite;
    }
    .big2Rotate{
        -webkit-animation: normalRotate1 6s 1s linear infinite;
    }
    @keyframes reveRotate1 {  
        0%{
            -webkit-transform:rotate(0deg);
        }
        100%{
            -webkit-transform:rotate(360deg);
        }
    }
    @keyframes normalRotate1 {  
        0%{
            -webkit-transform:rotate(0deg);
        }
        100%{
            -webkit-transform:rotate(-360deg);
        }
    }



    /* 内容区 */
    .Passeng_container_item{
        height: 100%;
        flex: 1;
        padding-right: 15.6%;
        box-sizing: border-box;
    }
    .Passeng_container_item_bg{
        width: 100%;
        height: 100%;
        background: url('../../../assets/hotel/pass_item_bg.png') no-repeat;
        background-size: 100% 100%;
    }
    .Passeng_container_item_content{
        width: 100%;
        height: 100%;
    }
    @media screen and (max-width: 1400px) {
        .Passeng_container_nav_con{
            padding-top: 33px;
            box-sizing: border-box;
        }
        .P_nav_con_item.active, .P_nav_con_item{
            height: 53px;
        }
        .P_nav_con_item_txt{
            margin-left: 64px;
            font-size: 14px;
            line-height: 53px;
        }
    }
</style>
