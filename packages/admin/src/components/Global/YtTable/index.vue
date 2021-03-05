<template>
  <div class="base-box base-box--bg base-box--top">
    <div class="total-info">
      第{{ startEndNum }}条，共{{ pagination.total | num }}条数据

      <el-button type="primary" @click="customColumn">
        <i class="iconfont icon-guolv"></i>
        定制列
      </el-button>
    </div>
    <d2-crud
      :columns="colums"
      :data="data"
      :index-row="indexRow"
      :row-handle="rowHandle"
      :options="options"
      :pagination="pagination"
      :loading="loading"
      @view="checkDetail"
      @pagination-current-change="changePage"
      @pagination-size-change="changePageSize"
    />
  </div>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Object,
      default () {
        return {
          total: 0,
          currentPage: 1,
          pageSize: 20,
          pageSizes: [20, 30, 40, 50, 100],
          layout: 'sizes, prev, pager, next, jumper, ->'
        }
      }
    }
  },
  data () {
    return {
      pagination: {
        total: 0,
        currentPage: 1,
        pageSize: 20,
        pageSizes: [20, 30, 40, 50, 100],
        layout: 'sizes, prev, pager, next, jumper, ->'
      },
      options: {
        border: true,
        highlightCurrentRow: true,
        height: 400
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
