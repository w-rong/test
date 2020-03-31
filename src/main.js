import '@/assets/reset.css'
import '@/assets/index.less'
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import echarts from 'echarts'
import 'echarts/lib/chart/bar'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.use(Element)
import 'echarts/map/js/china.js'
import 'echarts/map/js/province/zhejiang.js'
import '@/common/font/font.css'
import axios from 'axios'
import myaxios from '@/assets/js/myAxios.js'


Vue.use(myaxios)
// Vue.prototype.$http = axios
// Vue.prototype.axios = axios
// let a = localStorage.getItem("Authorization")
// var stoken = xhr.getResponseHeader('Authorization');
// console.log(stoken);
// console.log(a);
// axios.defaults.headers.common['Authorization'] = a

// router.beforeEach(function (to, from, next) {
    // var paths = to.path.substr(1, to.path.length)
//     if (!localStorage.getItem("Authorization")) {
//         if (to.path != '/') {
//             next(`/?${paths}`)
//         }
//     } else {
//         var a = localStorage.getItem("Authorization")
//         axios.interceptors.request.use(function (config) {
//             //       axios.defaults.headers.common['Authorization'] = a
//             config.headers.Authorization = a
//             // 在发送请求之前做些什么
//             return config
//         }, function (error) {
//             // 对请求错误做些什么
//             // console.log("err");
//             // console.log(error);
//             // return next(`/?${paths}`)
//         });
//         axios.interceptors.response.use(function (config) {
//           axios.defaults.headers.common['Authorization'] = a
//             return config
//         }, function (error) {
//             // 对请求错误做些什么
//             // console.log("err");
//             // console.log(error);
//             // localStorage.clear();
//             return next(`/?${paths}`)
//         });
//     }
//     next()
// })

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')

// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })
