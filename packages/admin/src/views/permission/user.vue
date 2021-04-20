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
        @cancel="showDialog = false"
        @confirm="handleSubmit"
      />
    </el-dialog>
  </div>
</template>

<script>
// , ADD_USER, EDIT_USER, DELETE_USER
import { FETCH_USER_LIST } from '@/api/system'
const ACCOUNT_STATUS_LIST = [
  { value: 1, label: '启用' },
  { value: 0, label: '禁用' }
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
        { field: 'status', title: '状态', minWidth: 60 },
        { field: 'create_at', title: '创建时间', minWidth: 100 },
        { field: 'update_at', title: '更新新建', minWidth: 100 },
        { title: '操作', minWidth: 120, slots: {
          default: (row) => {
            return [
              <el-button size='mini' type='success'>查看</el-button>,
              <el-button size='mini' type='primary'>编辑</el-button>,
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
        { key: 'status', label: '状态', span: 24, required: true, component: { name: 'select', options: [] }}
      ],
      dialogTitle: '新增账号'
    }
  },
  created () {
    FETCH_USER_LIST().then(data => (this.data = data.list))
  },
  methods: {
    fetchList () {

    },
    createAccount () {

    },
    openDialog (type = 'create', row = {}) {
      this.form = row
      this.dialogTitle = type === 'create'
        ? '新增账号' : type === 'edit'
          ? `编辑账号-${row.account}` : `查看账号-${row.account}`
      this.showDialog = true
    },
    handleSubmit () {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
