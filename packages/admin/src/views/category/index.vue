<template>
  <div class="base-box table-box">
    <el-card class="article-list table-box__table">
      <div class="table-wrapper">
        <vxe-grid
          :loading="loading"
          :data="data"
          border="inner"
          size="small"
          align="center"
          height="100%"
          :columns="columns"
          :empty-render="{ name: 'Empty' }"
        />
      </div>
      <AppPagination v-model="pagination" @update="fetchList" />
    </el-card>

    <el-dialog :visible.sync="showDialog" :title="currentTitle">
      xxx
    </el-dialog>
  </div>
</template>

<script>
import { fetchCategories } from '@/api/category'

export default {
  name: 'CategoryManage',
  data () {
    return {
      fansNumList: [],
      data: [],
      currentRow: {},
      showDialog: false,
      currentTitle: '粉丝总量',
      pagination: {
        page: 1,
        pageSize: 20,
        total: 0
      },
      loading: false,
      columns: [
        { type: 'checkbox', width: 50 },
        { field: 'name', title: '分类名称', minWidth: 120 },
        { field: 'id', title: '分类ID', width: 80 },
        { field: 'level', title: '分类层级', width: 80 },
        { field: 'create_at', title: '创建时间', minWidth: 120 },
        { field: 'update_at', title: '更新时间', minWidth: 120 },
        { title: '操作', minWidth: 140, fixed: 'right', slots: {
          default: ({ row, rowIndex }) => {
            return [
              <div>
                <el-button type='primary' size='mini'>编辑</el-button>
                <el-button type='danger' size='mini' onClick={ this.handleDelete.bind(this, row, rowIndex) }>删除</el-button>
              </div>
            ]
          }
        }}
      ]
    }
  },
  created () {
    this.fetchList()
  },
  methods: {
    async fetchList () {
      this.loading = true
      try {
        const data = await fetchCategories()
        this.data = data.list
        this.pagination.total = data.total * 1
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    /**
     * @create 2021/01/12 17:37
     * @desc 删除行
     * @param { Object } row
     * @param { Number } rowIndex
     */
    handleDelete (row, rowIndex) {
      console.log(row, rowIndex)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
