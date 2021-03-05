import YtTable from './index.vue'

const install = (Vue) => {
  Vue.component('YtTable', YtTable)
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
