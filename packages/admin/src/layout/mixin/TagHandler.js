/**
 * @date 2020/04/21 15:27
 * @author 潜
 * @description 动态修改已访问的tag导航标题
 */
export default {
  data () {
    return {
      tempRoute: {}
    }
  },
  created () {
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    setTagsViewTitle (title) {
      const id = this.$route.params.id
      this.title = `${title}${id ? '-' + id : ''}`
      const route = Object.assign({}, this.tempRoute, {
        title: this.title
      })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle (title) {
      document.title = `${title} - ${this.$route.params.id}`
    }
  }
}
