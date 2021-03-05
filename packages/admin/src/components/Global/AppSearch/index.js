import AppSearch from './index.vue'

AppSearch.install = (Vue) => {
  Vue.component(AppSearch.name, AppSearch)
}

export default AppSearch
