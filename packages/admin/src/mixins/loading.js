/**
 * @date 2020/04/30 11:40
 * @author 潜
 * @description 全局loading
 */
export default {
  data () {
    return {
      loading: false
    }
  },
  methods: {
    openLoading (options) {
      options = {
        lock: true,
        ...options
      }
      this.loading = this.$loading(options)
    },
    closeLoading () {
      this.loading.close()
    }
  }
}
