// 自定义全局组件
import Vue from 'vue'
import AppTag from '@/components/Global/AppTag'
import AppSearch from '@/components/Global/AppSearch'
import AppPagination from '@/components/Global/AppPagination'
import AppForm from '@/components/Global/AppForm'
import AppDatePicker from '@/components/Global/AppDatePicker'
// import AppImage from '@/components/Global/AppImage'

Vue.use(AppTag)
Vue.use(AppSearch)
Vue.use(AppPagination)
Vue.use(AppForm)
Vue.use(AppDatePicker)
// Vue.use(AppImage)
