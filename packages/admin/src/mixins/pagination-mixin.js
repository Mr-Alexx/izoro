export default {
  methods: {
    /**
     * @date 2020/09/22 17:14
     * @description 更改页码
     * @param { Number } page
     */
    changePage (page) {
      this.table.pagination.currentPage = page
      this.fetchList()
    },
    /**
     * @date 2020/09/22 17:14
     * @description 更改每页数量
     * @param { Number } pageSize
     */
    changePageSize (pageSize) {
      this.table.pagination.pageSize = pageSize
      this.fetchList()
    }
  }
}
