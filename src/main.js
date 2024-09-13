import Vue from 'vue' // Vue全家桶
import App from './App'
import store from './store'
import router from './router'

import 'normalize.css/normalize.css' // 全局CSS
import '@/styles/index.scss'

import Element from 'element-ui' // 组件库、图标和国际化
import 'element-ui/lib/theme-chalk/index.css'
import VueI18n from 'vue-i18n'
import messages from './language'
import '@/icons' // 图表
import '@/permission' // 权限控制
import '@/styles/element-variables.scss'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: window.localStorage.getItem('lang') == 'zh' ? 'zh' : 'en', // 语言标识 
  messages
})
Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})

import inputFilter from '@/directives/InputFilter.js' // 全局指令
Vue.directive('inputFilter', inputFilter)
import filters from './filters' // 全局过滤器
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

if (process.env.NODE_ENV === 'production') {
  const {
    mockXHR
  } = require('../mock')
  mockXHR()
}
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})