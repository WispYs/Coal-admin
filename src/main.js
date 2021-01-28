import Vue from 'vue'

import App from './App'
import store from './store'
import router from './router'
import '@/permission'

import 'normalize.css/normalize.css' // 标准化css样式
import '@/assets/styles/index.scss'
import 'font-awesome/css/font-awesome.min.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 注册 Icon 组件
import Icon from '@/components/Icon'
Vue.component('icon', Icon)

// 引入echart
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
