<template>
    <div class="monitor">
        <div class="M_title">
            <headtop :title='pageTitle'/>
            <!-- <div class="M_title_txt">视频监控</div> -->
        </div>
        <div class="M_container">
           <div class="M_menu">
                <ul>
                    <li v-for="(list1, index) in lists" :key="index">
                        <a class="p_title" v-on:click="curshow1(list1)">
                            <div class="menu_icon"><img :src="list1.url" alt=""></div>
                            &nbsp;&nbsp;{{list1.name}}
                        </a>
                        <ul v-if="list1.flag1">
                            <li class="p_item" v-for="(list, index) in list1.sublist1" :key="index">
                                <a class="p_title p_title1" v-on:click="curshow(list)">
                                    <div class="menu_img"><img :src="list.url" alt=""></div>
                                    &nbsp;&nbsp;{{list.name}}
                                    <b :class="list.flag ? 'down': 'up'">^</b>
                                </a>
                                <ul class="c_item" v-if="list.flag">
                                    <li class="p_item_3" :key="index">
                                        <el-checkbox-group v-model="checkedValue" @change="checkedFn">
                                            <el-checkbox  v-for="(sub, index) in list.sublist" :key="index" :label="sub.name">
                                                <a>{{sub.name}}</a>
                                            </el-checkbox>
                                        </el-checkbox-group>
                                    </li> 
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
           </div>
           <div class="M_monitor">
               <div class="M_monitor_item" v-for="(item, index) in checkedValue" :key="index">
                   <div class="M_monitor_item_btn">
                        <div class="M_monitor_item_allScreen" @click="closeVideo(index)">
                            <img src="../../assets/hotel/M_close.png" alt="">
                        </div>
                        <div class="M_monitor_item_close" @click="allScreenVideo(index)">
                            <img src="../../assets/hotel/M_all_screen.png" alt="">
                        </div>
                   </div>
                   <div class="M_monitor_item_video">{{index}}</div>
               </div>
           </div>
        </div>
    </div>
</template>

<script>
import headtop from '@/components/header/headtop';
export default {
    components: {
        headtop
    },
    data(){
        return {
            pageTitle: '视频监控',
            checkedValue: [],
            lists: [
                {
                    name: '景区',
                    flag1: false,
                    url: require('../../assets/hotel/M_menu_icon.png'),
                    sublist1: [
                        {
                            name: '杉杉普陀天地',
                            url: require('../../assets/hotel/M_menu_1.png'),
                            flag: false,
                            sublist: [
                                { name: '南大门'}, 
                                { name: '东大门'}, 
                                { name: '西大门'}, 
                            ]
                        },
                        {
                            name: '沈家门渔港小镇',
                            url: require('../../assets/hotel/M_menu_1.png'),
                            flag: false,
                            sublist: [
                                { name: '裙子'}, 
                                { name: '套装'}
                            ],
                        },
                    ]
                },
                {
                    name: '网吧',
                    flag1: false,
                    url: require('../../assets/hotel/M_menu_icon.png'),
                    sublist1: [
                        {
                            name: '母婴用品',
                            url: require('../../assets/hotel/M_menu_1.png'),
                            flag: false,
                            sublist: [
                                { name: '奶粉'}, 
                                { name: '奶34粉'}, 
                                { name: '奶333粉'}, 
                            ]
                        }
                    ]
                },
                {
                    name: '娱乐场所',
                    flag1: false,
                    url: require('../../assets/hotel/M_menu_icon.png'),
                    sublist1: [
                        {
                            name: 'yyylllcccsss',
                            url: require('../../assets/hotel/M_menu_1.png'),
                            flag: false,
                            sublist: [
                                { name: '奶粉'}, 
                                { name: '奶粉2'}, 
                                { name: '奶粉3'}, 
                            ]
                        }
                    ]
                },
                {
                    name: '文体场所',
                    flag1: false,
                    url: require('../../assets/hotel/M_menu_icon.png'),
                    sublist1: [
                        {
                            name: '足球场',
                            url: require('../../assets/hotel/M_menu_1.png'),
                            flag: false,
                            sublist: [
                                { name: '奶粉'}, 
                            ]
                        }
                    ]
                },
                
            ],
        }
    },
    methods: {
        curshow1: function(list){
            console.log(list)
            //如果状态是点开的，那么再次点击就隐藏
            if(list.flag1){
                list.flag1 = false;
            }
            //若当前的是隐藏，则点击当前的显示，其余的隐藏
            else{
                for(let i=0;i<this.lists.length;i++){
                    this.lists[i].flag1 = false;
                }
                list.flag1 = true;
            }
            
        },
        curshow: function(list){
            //如果状态是点开的，那么再次点击就隐藏
            if(list.flag){
                list.flag=false;
            }
            //若当前的是隐藏，则点击当前的显示，其余的隐藏
            else{
                for(let i=0;i<this.lists.length;i++){
                    this.lists[i].flag=false;
                }
                list.flag = true;
            }
            
        },
        checkedFn(){
            console.log(this.checkedValue)
        },
        closeVideo(index){
            this.checkedValue.splice(index, 1)
        },
        allScreenVideo(){
        }
    },
   
}
</script>

<style>
    .monitor{
        width: 100%;
        height: 100%;
        background: url('../../assets/hotel/F_bg.jpg') no-repeat;
        background-size: 100% 100%;
        font-family: 'PingFang SC';
        overflow: hidden;
    }
    .M_title{
        width: 100%;
        height: 8.61%;
        /* background: url('../../assets/hotel/pass_title.png') no-repeat;
        background-size: 100% 100%; */
        position: relative;
    }
    .M_title_txt{
        width: 100%;
        height: 22px;
        line-height: 10px;
        font-size: 22px;
        text-align: center;
        color: #CBEAFF;
        position: absolute;
        top: 50%;
        margin-top: -11px;
        font-weight:bold;
        text-shadow:0px 1px 0px rgba(0, 0, 0, 1);
        font-family: PingFang SC;
    }
    .M_container{
        width: 100%;
        height: 91.38%;
        box-sizing: border-box;
        position: relative;
    }
    .M_menu{
        width: 268px;
        height: 100%;
        border-right: 2px solid #053762;
        background: #00213c;
        float: left;
        font-size: 16px;
        color: #fff;
    }
    a {
        color: #fff;
        text-decoration: none;
    }
    .p_title {
        color: #fff;
        display: block;
        padding: 8px;
        box-sizing: border-box;
        cursor: pointer;
        background-color: #0b67a0;
        margin-bottom: 12px;
        line-height: 39px;
    }
    .menu_icon{
        width: 19px;
        height: 19px;
        float: left;
        margin-top: 10px;
    }
    .menu_img{
        width: 39px;
        height: 39px;
        float: left;
    }
    .menu_img img, .menu_icon img{
        display: block;
        width: 100%;
        height: 100%;
    }
    .p_title.p_title1{
        padding: 8px 15px 8px 30px;
        box-sizing: border-box;
        background: #00213c;
        margin-bottom: 0;
    }
    .p_title b{
        float: right;
        transition: all ease 1s;
        -webkit-transition: all ease 1s;
        -o-transition: all ease 1s;
        -moz-transition:　all ease 1s;
        -ms-transition: all ease 1s;
    }
    .up {
        transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
    }
    .down {
        transform: rotate(180deg);
        -webkit-transform: rotate(180deg);
        -o-transform: rotate(180deg);
        -moz-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
    }
    .p_title:hover {
        color: #999;
    }
    .p_item_3{
        padding-left: 60px;
        box-sizing: border-box;
    }
    .p_item_3 .el-checkbox{
        width: 100%;
    }
    .p_item_3 .el-checkbox__label{
        text-align: center;
    }
    .p_item_3 .el-checkbox__label a{
        padding: 10px 0px 10px 10px;
    }
    .c_item  a{
        display: block;
        padding: 10px 20px 10px 60px;
        box-sizing: border-box;
        background: #00213c;
        color: #fff;
    }
    .c_item li{
        cursor: pointer;
    }
    .c_item li a:hover {
        color: #999;
    }
    .M_monitor{
        width: calc(100% - 270px);
        height: 100%;
        padding: 20px 3px 20px 13px;
        box-sizing: border-box;
        float: right;
    }
    .M_monitor_item{
        width: 32%;
        height: 36%;
        background: url('../../assets/hotel/M_item_bj.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
        padding: 35px 30px 30px 30px;
        box-sizing: border-box;
        float: left;
        margin-right: 1%;
        margin-bottom: 50px;
    }
    .M_monitor_item_btn{
        width: 100%;
        height: 20px;
        position: absolute;
        top: 7px;
        right: 23px;
    }
    .M_monitor_item_allScreen{
        width: 17px;
        height: 17px;
        float: right;
        margin-top: 2px;
        margin-right: 2px;
    }
    .M_monitor_item_close{
        width: 26px;
        height: 20px;
        float: right;
        margin-right: 12px;
    }
    .M_monitor_item_allScreen img, .M_monitor_item_close img{
        width: 100%;
        height: 100%;
        display: block;
    }
    .M_monitor_item_video{
        width: 100%;
        height: 100%;
    }
</style>
