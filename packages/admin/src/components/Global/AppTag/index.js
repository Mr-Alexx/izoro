import AppTag from './index.vue'

AppTag.install = function (Vue) {
  Vue.component(AppTag.name, AppTag)
}

export default AppTag
