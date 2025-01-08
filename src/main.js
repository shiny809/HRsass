import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import zhLocale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n中文
// 多语言
import i18n from '@/lang'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import * as directives from './directives'
import components from './components'
import * as filters from '@/filters'
import CheckPermission from './mixin/checkPermission'

// 注册 所有自定义指令

Object.keys(directives).forEach(key => {
  // 遍历所有的导出的指令对象 完成自定义全局注册
  Vue.directive(key, directives[key])
})

// 注册自定义组件
Vue.use(components)

// 注册过滤器
Object.keys(filters).forEach(key => {
// 遍历所有对象，完成过滤器所有注册
  Vue.filter(key, filters[key])
})

// 全局混入 检查对象
Vue.mixin(CheckPermission) // 所有组件都拥有了检查对象
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { zhLocale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
// 设置element为当前的语言
Vue.use(ElementUI, {
  // element-ui本身支持 i18n的处理
  i18n: (key, value) => i18n.t(key, value)// t方法会去 对应的语言包寻找内容
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
