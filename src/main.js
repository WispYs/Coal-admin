import Vue from 'vue'

import App from './App'
import store from './store'
import router from './router'
import '@/permission'

import ElementUI from 'element-ui'
import '@/icons'

import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css/normalize.css' // 标准化css样式
import '@/assets/styles/index.scss'

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
