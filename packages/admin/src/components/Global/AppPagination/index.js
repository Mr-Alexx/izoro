import AppPagination from './index.vue'

AppPagination.install = (Vue) => {
  Vue.component(AppPagination.name, AppPagination)
}

export default AppPagination
