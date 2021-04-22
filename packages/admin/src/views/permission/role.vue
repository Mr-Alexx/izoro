<template>
  <div class="base-box table-box">
    <AppSearch :options="searchOptions" :action="fetchList" />

    <el-card class="base-box--top talent-list table-box__table">
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
      <div>
        <el-button style="float: left; margin-top: 20px; margin-right: 10px;" type="primary" @click="openDialog()">新增角色</el-button>
        <AppPagination v-model="pagination" @update="fetchList" />
      </div>
    </el-card>

    <el-dialog width="500px" :visible.sync="showDialog" :title="dialogTitle">
      <AppForm
        ref="form"
        v-model="form"
        :options="formOptions"
        label-width="60px"
        show-button
        :loading="confirmLoading"
        :disabled="actionType === 'view'"
        @cancel="showDialog = false"
        @confirm="handleSubmit"
      />
    </el-dialog>
  </div>
</template>

<script>
import { FETCH_ROLE_LIST, ADD_ROLE, EDIT_ROLE, DELETE_ROLE } from '@/api/system'
const ROLE_STATUS_LIST = [
  { value: 0, label: '禁用' },
  { value: 1, label: '启用' }
]

export default {
  name: 'Role',
  data () {
    return {
      searchOptions: [
        { key: 'name', label: '角色', component: { name: 'input' }},
        { key: 'status', label: '状态', component: { name: 'select', options: ROLE_STATUS_LIST, clearable: true }}
      ],
      loading: false,
      data: [],
      columns: [
        { type: 'seq', title: '序号', width: 50 },
        { field: 'name', title: '角色名称', minWidth: 80 },
        { field: 'description', title: '描述', minWidth: 120, formatter: 'formatEmpty' },
        { field: 'status', title: '状态', minWidth: 60, slots: {
          default: ({ row }) => [
            <el-tag type={ row.status === 0 ? 'error' : 'success' }>{ ROLE_STATUS_LIST.filter(v => v.value === row.status)[0].label }</el-tag>
          ]
        }},
        { field: 'create_at', title: '创建时间', minWidth: 100, formatter: 'time' },
        { field: 'update_at', title: '更新新建', minWidth: 100, formatter: 'time' },
        { title: '操作', minWidth: 100, fixed: 'right', slots: {
          default: ({ row }) => {
            return [
              <div class='operation-wrapper'>
                <el-tooltip content='查看' placement='top'>
                  <i class='el-icon-view success' onClick={ this.openDialog.bind(this, 'view', row) }/>
                </el-tooltip>
                <el-divider direction='vertical'/>
                <el-tooltip content='编辑' placement='top'>
                  <i class='el-icon-edit-outline primary' onClick={ this.openDialog.bind(this, 'edit', row) }/>
                </el-tooltip>
                <el-divider direction='vertical'/>
                <el-tooltip content='新增子菜单' placement='top'>
                  <i class='el-icon-plus warning' onClick={ this.openDialog.bind(this, 'create', row) }/>
                </el-tooltip>
                <el-divider direction='vertical'/>
                <el-popconfirm
                  icon='el-icon-info'
                  icon-color='red'
                  title='确定要删除该角色吗？'
                  onConfirm={ this.handleDelete.bind(this, row) }
                >
                  <el-tooltip content='删除' slot='reference' placement='top'>
                    <i class='el-icon-delete danger'/>
                  </el-tooltip>
                </el-popconfirm>
              </div>
            ]
          }
        }}
      ],
      pagination: {
        page: 1,
        pageSize: 20,
        total: 0
      },
      showDialog: false,
      confirmLoading: false,
      form: {},
      formOptions: [
        { key: 'name', label: '名称', span: 24, required: true, component: { name: 'input' }},
        { key: 'status', label: '状态', span: 24, required: true, component: { name: 'select', options: ROLE_STATUS_LIST }},
        { key: 'description', label: '描述', span: 24, component: { name: 'input', type: 'textarea' }}
      ],
      dialogTitle: '新增角色',
      actionType: 'create'
    }
  },
  created () {
    this.fetchList()
  },
  methods: {
    async fetchList (form) {
      this.loading = true
      try {
        const data = await FETCH_ROLE_LIST({
          page: this.pagination.page,
          limit: this.pagination.pageSize,
          ...form
        })
        this.data = data.list
        this.pagination.total = data.total
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    openDialog (type = 'create', row = {}) {
      this.actionType = type
      this.dialogTitle = type === 'create'
        ? '新增角色' : type === 'edit'
          ? `编辑角色-${row.name}` : `查看角色-${row.name}`
      this.showDialog = true
      this.$nextTick(() => {
        this.$refs.form.form = row
        console.log(this.form)
      })
    },
    /**
     * @description 删除角色
     * @param { Object } row
     */
    async handleDelete (row) {
      try {
        await DELETE_ROLE(row.id)
        this.$message.success('删除成功！')
        this.fetchList()
      } catch (err) {
        this.$message.error(err)
      }
    },
    /**
     * @description 创建/编辑角色
     * @param { Object } form
     */
    handleSubmit (form) {
      if (this.actionType === 'view') {
        this.showDialog = false
        return
      }

      this.$refs.form.validate().then(async () => {
        this.confirmLoading = true
        try {
          this.actionType === 'create' ? await ADD_ROLE(form) : await EDIT_ROLE(form.id, form)
          this.$message.success(this.actionType === 'edit' ? '编辑成功！' : '新增成功！')
          this.showDialog = false
          this.fetchList()
        } catch (err) {
          this.$message({
            type: 'error',
            message: err
          })
        } finally {
          this.confirmLoading = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
