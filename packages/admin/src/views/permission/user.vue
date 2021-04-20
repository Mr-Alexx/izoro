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
        <el-button style="float: left; margin-top: 20px; margin-right: 10px;" type="primary" @click="openDialog()">新增账号</el-button>
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
// DELETE_USER
import { FETCH_USER_LIST, ADD_USER, EDIT_USER } from '@/api/system'
const ACCOUNT_STATUS_LIST = [
  { value: 0, label: '禁用' },
  { value: 1, label: '启用' }
]

export default {
  name: 'User',
  data () {
    return {
      searchOptions: [
        { key: 'account', label: '账号', component: { name: 'input' }},
        { key: 'status', label: '状态', component: { name: 'select', options: ACCOUNT_STATUS_LIST }}
      ],
      loading: false,
      data: [],
      columns: [
        { field: 'avatar', title: '头像', minWidth: 80, slots: {
          default: ({ row }) => {
            return [
              <el-image src={ row.avatar } style='width: 60px; height: 60px'></el-image>
            ]
          }
        }},
        { field: 'account', title: '账号', minWidth: 120 },
        { field: 'nickname', title: '昵称', minWidth: 80, formatter: 'formatEmpty' },
        { field: 'email', title: '邮箱', minWidth: 120, formatter: 'formatEmpty' },
        { field: 'status', title: '状态', minWidth: 60, slots: {
          default: ({ row }) => [
            <el-tag type={ row.status === 0 ? 'error' : 'success' }>{ ACCOUNT_STATUS_LIST.filter(v => v.value === row.status)[0].label }</el-tag>
          ]
        }},
        { field: 'create_at', title: '创建时间', minWidth: 100 },
        { field: 'update_at', title: '更新新建', minWidth: 100 },
        { title: '操作', minWidth: 160, slots: {
          default: ({ row }) => {
            return [
              <el-button size='mini' type='success' onClick={ this.openDialog.bind(this, 'view', row) }>查看</el-button>,
              <el-button size='mini' type='primary' onClick={ this.openDialog.bind(this, 'edit', row) }>编辑</el-button>,
              <el-button size='mini' type='danger'>删除</el-button>
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
        { key: 'account', label: '账号', span: 24, required: true, component: { name: 'input' }},
        { key: 'password', label: '密码', span: 24, required: true, component: { name: 'input', type: 'password' }},
        { key: 'nickname', label: '昵称', span: 24, component: { name: 'input' }},
        { key: 'phone_number', label: '电话', span: 24, component: { name: 'input' }},
        { key: 'email', label: '邮箱', span: 24, component: { name: 'input' }},
        { key: 'avatar', label: '头像', span: 24, component: { name: 'input' }},
        { key: 'status', label: '状态', span: 24, required: true, component: { name: 'select', options: ACCOUNT_STATUS_LIST }}
      ],
      dialogTitle: '新增账号',
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
        const data = await FETCH_USER_LIST({
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
    createAccount (row) {

    },
    openDialog (type = 'create', row = {}) {
      this.actionType = type
      this.dialogTitle = type === 'create'
        ? '新增账号' : type === 'edit'
          ? `编辑账号-${row.account}` : `查看账号-${row.account}`
      this.showDialog = true
      this.$nextTick(() => {
        this.$refs.form.form = row
        console.log(this.form)
      })
    },
    handleSubmit (form) {
      if (this.actionType === 'view') {
        this.showDialog = false
        return
      }

      this.$refs.form.validate().then(async () => {
        this.confirmLoading = true
        try {
          this.actionType === 'create' ? await ADD_USER(form) : await EDIT_USER(form.id, form)
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
