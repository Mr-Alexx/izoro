<template>
  <div class="base-box table-box">
    <el-card class="article-list table-box__table">
      <div class="table-wrapper">
        <vxe-grid
          ref="table"
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

      <div class="table-footer">
        <div>
          <el-button type="primary" @click="handleEdit('add')">新增分类</el-button>
          <el-popconfirm
            icon="el-icon-info"
            icon-color="red"
            title="确定要删除选中的分类吗？"
            @confirm="handleDelete"
          >
            <el-button slot="reference" type="danger">批量删除</el-button>
          </el-popconfirm></div>
        <AppPagination v-model="pagination" @update="fetchList" />
      </div>
    </el-card>

    <el-dialog :visible.sync="showDialog" :title="currentTitle">
      <el-row :gutter="20">
        <el-col :span="14">
          <el-input v-model="name" placeholder="请输入分类名称" />
        </el-col>
        <el-col :span="10">
          <el-button type="primary" :loading="updateLoading" @click="updateCategory">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { fetchCategories, updateCategory, deleteCategories, addCategory } from '@/api/category'

export default {
  name: 'CategoryManage',
  data () {
    return {
      fansNumList: [],
      data: [],
      currentRow: {},
      showDialog: false,
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
                <el-button type='primary' size='mini' onClick={ this.handleEdit.bind(this, 'edit', row) } style='margin-right: 5px'>编辑</el-button>
                <el-popconfirm
                  icon='el-icon-info'
                  icon-color='red'
                  title='确定要删除该分类吗？'
                  onConfirm={ this.handleDelete.bind(this, row, rowIndex) }
                >
                  <el-button slot='reference' type='danger' size='mini'>删除</el-button>
                </el-popconfirm>
              </div>
            ]
          }
        }}
      ],
      currentTitle: '',
      name: '',
      updateLoading: false
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
     * @create 2021/03/15 22:37
     * @desc 编辑分类
     * @param { string } type
     * @param { object } row
     */
    handleEdit (type = 'edit', row) {
      if (type === 'add') {
        this.name = ''
        this.currentTitle = '新增一级分类'
      } else {
        this.name = row.name
        this.currentTitle = `${row.name} (id: ${row.id})`
      }
      this.currentRow = row
      this.showDialog = true
    },
    /**
     * @create 2021/01/12 17:37
     * @desc 删除行
     * @param { Object } row
     * @param { Number } rowIndex
     */
    async handleDelete (row) {
      this.deleteLoading = true
      const ids = row ? [row.id] : this.$refs.table.getCheckboxRecords().map(v => v.id)
      if (ids.length === 0) {
        return this.$message.info('请选择要删除的分类！')
      }
      try {
        await deleteCategories(ids)
        this.$message.success('删除成功！')
        this.fetchList()
      } catch (err) {
        console.error(err)
      }
      this.deleteLoading = false
    },
    async updateCategory () {
      if (!this.name) { return }

      this.updateLoading = true
      try {
        !this.currentRow ? await addCategory({ name: this.name }) : await updateCategory({ ...this.currentRow, name: this.name })
        this.showDialog = false
        this.$message.success('操作成功')
        this.fetchList()
      } catch (err) {
        console.error(err)
      }
      this.updateLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
