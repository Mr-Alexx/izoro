import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import '@/styles/variables.css'
import 'normalize.css/normalize.css'
import './icons' // icon
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'

// 按需引入vxe-table
import './plugins/utils'
import './plugins/table'

import '@/styles/index.scss'

import './permission'

// 按需引入echarts和自定义echarts主题
const echarts = require('echarts/lib/echarts')
import theme from '@/assets/plugins/echarts/custom.js'

import * as filters from './filters' // global filters
import throttleDebounce from '@/directive/throttle-debounce'

// 自定义全局组件
import './plugins/global-component'

// if (process.env.NODE_ENV === 'development') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(ElementUI, { size: 'small' })
// Vue.use(Table)

// directives
Vue.use(throttleDebounce)

Vue.config.productionTip = false

// 按需引入echarts
// bar
require('echarts/lib/chart/bar')
// line
require('echarts/lib/chart/line')
// pie
require('echarts/lib/chart/pie')
// others
require('echarts/lib/component/tooltip')
require('echarts/lib/component/axisPointer')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
require('echarts/lib/component/legendScroll')
require('echarts/lib/component/dataZoom')
require('echarts/lib/component/toolbox')

if (process.env.NODE_ENV === 'product') {
  // 阿里云前端监控 -- 仅在线上环境生效
  const BrowserLogger = require('alife-logger')
  BrowserLogger.singleton({ pid: 'bgqvnio3qj@774480e6fa20186', appType: 'web', imgUrl: 'https://arms-retcode.aliyuncs.com/r.png?', sendResource: true, enableLinkTrace: true, behavior: true, useFmp: true })
}

// 重写echarts init方法，加入默认主题
Vue.prototype.$echarts = {
  ...echarts,
  init: function (dom) {
    return echarts.init(dom, theme)
  }
}

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
