<template>
  <div>
    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :pager-count="5"
      background
      :page-sizes="[20, 30, 40, 50, 100, 200]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      class="hidden-xs-only"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- 适合手机端 -->
    <div class="hidden-sm-and-up">
      <el-pagination
        small
        :current-page="page"
        :pager-count="5"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pageSize"
        layout="total, sizes"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <el-pagination
        small
        :current-page="page"
        :pager-count="5"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
/**
 * @create 2021/01/12 15:22
 * @desc 基于element-ui封装的分页，适配移动端
 */
export default {
  name: 'BiPagination',
  props: {
    page: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 20
    },
    total: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleSizeChange (value) {
      this.$emit('size-change', value)
    },
    handleCurrentChange (value) {
      this.$emit('current-change', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-pagination {
  padding-top: $main-space;
  text-align: right;
}
.hidden-sm-and-up .el-pagination {
  text-align: left;
}
</style>
