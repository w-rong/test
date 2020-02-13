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
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })
