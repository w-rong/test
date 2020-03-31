<template>
    <div class="user_head">
        <el-row class="head">
            <el-col :span="4" class="h100">
                <div class="home_title">后台管理系统</div>
            </el-col>
            <el-col :span="17"  class="h100">
                <div>&nbsp;</div>
            </el-col>
            <el-col :span="3" class="par h100">
                <div class="logout" @click="showExit">
                    欢迎登陆{{propname}}<a href="#"></a>
                </div>
                <div class="exitStyle" v-show="exitShow" @click.prevent="logexit">退出</div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
     data(){
        return{
            exitShow: false,
            propname: ''
        }
    },
    methods: {
        showExit(){
            console.log('aa')
            this.exitShow = !(this.exitShow)
        },
        logexit(){
            this.$router.push('/')
        }
    },
    mounted(){
        
    }
}
</script>

<style>
    .user_head{
        width: 100%;
        height: 80px;
    }
    .head{
        background-color: #5e87b0;
        height: 80px;  
        line-height: 80px;  
        padding: 0;
        margin: 0;
    }
    .home_title {
        /* height: 100%;
        line-height: 80px; */
        font-size: 24px;
        color: #fff;
        text-align: center
    }
    .logout {
        width: 94%;
        height: 100%;
        line-height: 80px;
        text-align: left;
        margin-right: 10px;
        color: #fff;
    }
    .logout a {
        width: 100px;
        display: block;
        color: #fff;
        text-decoration: none;
    }
    .logout a:hover {
        color: red
    }
    .par{
        position: relative;
        cursor: pointer;
    }
    .exitStyle{
        position: absolute;
        top: 50px;
        right: 30px;
        color: #fff;
        cursor: pointer;
    }
</style>
