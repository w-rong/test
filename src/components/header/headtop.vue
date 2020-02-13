<template>
    <div class="headerroot">
        <h1>{{title}}</h1>
        <div class="nav" v-clickoutside="handleClose">
            <h3 @click="shownav">首页</h3>
            <transition name="slide-fade">
                <ul v-if="navshow">
                    <!-- <li>首页</li> -->
                     <router-link  tag="li" v-for="(item, index) in navList" :key="index" :to="{path: item.path}" >{{item.name}}</router-link>
                </ul>
            </transition>
        </div>
    </div>
</template>

<script>

const clickoutside = {
    // 初始化指令
    bind(el, binding, vnode) {
        function documentHandler(e) {
            // 这里判断点击的元素是否是本身，是本身，则返回
            if (el.contains(e.target)) {
                return false;
            }
            // 判断指令中是否绑定了函数
            if (binding.expression) {
                // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
                binding.value(e);
            }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener('click', documentHandler);
    },
    unbind(el, binding) {
        // 解除事件监听
        document.removeEventListener('click', el.__vueClickOutside__);
        delete el.__vueClickOutside__;
    },
};

export default {
    props: ['title'],
    data () {
        return {
            navshow: false,
            navList: [
                {name: '首页', path: '/index'},
                {name: '天气罗盘', path: '/weather'},
                {name: '景区客流量统计', path: '/passengerFlow'},
                {name: '车流量统计', path: '/vehicleTotal'},
                {name: '视频监控', path: '/monitor'},
                {name: '旅游消费', path: '/touristXF'},
                {name: '游客画像', path: '/basicPortrait'},
                {name: '旅游饭店检测系统', path: '/hotel'},
                {name: '口碑监测系统', path: '/wordMouth'},
            ]
        }
    },
    directives: {clickoutside},
    methods: {
        shownav () {
            this.navshow = true
        },
        handleClose () {
            this.navshow = false
        }
    }
}
</script>

<style scoped lang="less">
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */ {
        transform: translateX(10px);
        opacity: 0;
    }
    .headerroot{
        height: 4.5rem;
        background: url('../../../public/static/img/headtop.png') no-repeat;
        background-size: 100% 100%;
        text-align: center;
        color: #E1F5FF;
        font-size: 1.5rem;
        line-height: 3.85rem;
        position: relative;
        z-index: 99;

        .nav{
            position: absolute;
            left: 2.5%;
            top: 0.55rem;
            background: url('../../assets/img/header/default.png') no-repeat;
            background-size: 8.1rem 2rem;
            font-size: 16px;
            line-height: 2rem;
            color: #CBEAFF;
            width: 8.1rem;
            height: 2rem;
            text-align: left;
            cursor: pointer;
            &:hover{
                background-image: url('../../assets/img/header/checked.png');
            }

            h3{
                padding-left: 1.2rem;
            }

            ul{
                position: absolute;
                top: 2.2rem;
                background: url('../../assets/img/header/dragDown.png') no-repeat;
                // background-size: 8.1rem 12.8rem;
                background-size: 100% 100%;
                padding-bottom: 0.5rem;
                width: 8.15rem;
                // height: 12.8rem;
                .flexDefault();
                flex-flow: column;

                li{
                    width: 7.2rem;
                    height: 1.7rem;
                    line-height: 1.7rem;
                    background-repeat: no-repeat;
                    background-size: 7.2rem 1.7rem;
                    font-size: 0.7rem;
                    padding-left: 1rem;
                    box-sizing: border-box;
                    &:hover{
                        background-image: url('../../assets/img/header/hovered.png');
                    }
                }

                .checked{
                    background-image: url('../../assets/img/header/checkeds.png');
                }
            }
        }
    }
</style>

