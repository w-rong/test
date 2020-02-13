import Vue from 'vue'
import Vuex from 'vuex'
import theindex from './modules/theindex';

// vue过滤器
// 过滤景区等级
Vue.filter('scenicLevel', function (value) {
    if (value == 0) {
        return '未评级'
    } else if (value == 1) {
        return 'A'
    } else if (value == 2) {
        return 'AA'
    } else if (value == 3) {
        return 'AAA'
    } else if (value == 4) {
        return 'AAAA'
    } else if (value == 5) {
        return 'AAAAA'
    }
})
// 过滤性别
Vue.filter('sex', function (value) {
    if (value == 0) {
        return '男'
    } else if (value == 1) {
        return '女'
    }
})
// 过滤时间
Vue.filter('time', function (value) {
    return value.substring(0,11)
})
Vue.filter('date', function (value) {
    return value.substring(0,10)
})
// 过滤事件分类
Vue.filter('eventType',function(value){
    if (value == 1) {
        return '自然灾害'
    } else if(value == 2){
        return '事故灾害'
    } else if(value == 3){
        return '突发公共卫生事件'
    } else if(value == 4){
        return '突发社会安全事件'
    } else if(value == 5){
        return '其他'
    } 
});
// 过滤事件等级
Vue.filter('eventLevel',function(value){
    if (value == 1) {
        return '特别重大'
    } else if(value == 2){
        return '重大'
    } else if(value == 3){
        return '较大'
    } else if(value == 4){
        return '一般'
    } 
});
// 过滤状态
Vue.filter('eventStatus',function(value){
    if (value == 1) {
        return '待处理'
    } else if(value == 2){
        return '处理中'
    } else if(value == 3){
        return '已发布'
    } else if(value == 4){
        return '已上报' 
    } else if(value == 5){
        return '已处理' 
    } else if(value == 6){
        return '已添加至应急案例'
    }  
});
// 过滤预案级别
Vue.filter('levelPlan',function(value){
    if (value == 1) {
        return '国家级'
    } else if(value == 2){
        return '省级'
    } else if(value == 3){
        return '地市级'
    } else if(value == 4){
        return '区县级'
    } else if(value == 5){
        return '风险源级'
    } else if(value == 6){
        return '其他'
    } 
});
// 过滤预案类型
Vue.filter('planType',function(value){
    if (value == 1) {
        return '自然灾害'
    } else if(value == 2){
        return '事故灾害'
    } else if(value == 3){
        return '突发公共卫生事件'
    } else if(value == 4){
        return '突发社会安全事件'
    } else if(value == 5){
        return '其他'
    } 
});
// 过滤是否启用
Vue.filter('isEnable',function(value){
    if (value == 0) {
        return '未启用'
    } else if(value == 1){
        return '已启用'
    }
});
// 过滤好中差评
Vue.filter('isComment',function(value){
    if (value == 0) {
        return '差评'
    } else if(value == 1){
        return '好评'
    } else if(value == 2){
        return '中评'
    }
});
// 过滤酒店、景区、餐馆
Vue.filter('isHotel',function(value){
    if (value == 'HOTEL') {
        return '酒店'
    } else if(value == 'SCENIC'){
        return '景区'
    } else if(value == 'RESTAURANT'){
        return '餐馆'
    }
});
// 过滤酒店、景区、餐馆
Vue.filter('isHotelLittle',function(value){
    if (value == 'hotel') {
        return '酒店'
    } else if(value == 'scenic'){
        return '景区'
    } else if(value == 'restaurant'){
        return '餐馆'
    }
});
// 过滤平台
Vue.filter('isOrigin',function(value){
    if (value == 'LVMAMA') {
        return '驴妈妈'
    } else if(value == 'MEITUAN'){
        return '美团'
    } else if(value == 'QUNAR'){
        return '去哪儿'
    } else if(value == 'TONGCHENGLVYOU'){
        return '同程'
    } else if(value == 'TUNIU'){
        return '途牛'
    } else if(value == 'XIECHENG'){
        return '携程'
    }
});
// 过滤事件状态
Vue.filter('eventStatus',function(value){
    if (value == '0') {
        return '未处理'
    } else if(value == '1'){
        return '处理中'
    } else if(value == '2'){
        return '已完成'
    } 
});
Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        theindex,
    }
})
export default store