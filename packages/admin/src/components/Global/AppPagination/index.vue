<template>
  <div class="app-pagination">
    <!-- 分页 background -->
    <el-pagination
      :current-page="value.page"
      :pager-count="5"
      :page-sizes="[20, 30, 40, 50, 100, 200]"
      :page-size="value.pageSize"
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
        :current-page="value.page"
        :pager-count="5"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="value.pageSize"
        layout="total, sizes"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <el-pagination
        small
        :current-page="value.page"
        :pager-count="5"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="value.pageSize"
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
  name: 'AppPagination',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    total () {
      return Number(this.value.total || 0)
    }
  },
  methods: {
    handleSizeChange (value) {
      // this.$emit('size-change', value)
      this.$emit('change', { ...this.value, pageSize: value })
      this.$emit('update')
    },
    handleCurrentChange (value) {
      // this.$emit('current-change', value)
      this.$emit('change', { ...this.value, page: value })
      this.$emit('update')
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
