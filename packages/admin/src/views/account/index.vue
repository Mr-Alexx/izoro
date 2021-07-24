<template>
  <div class="base-box table-box">
    <AppSearch :options="searchOptions" :action="fetchList" block-button />

    <el-card class="base-box--top article-list table-box__table">
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
import { fetchTalentConditions } from '@/api/tiktok'
import { fetchUserList } from '@/api/user'

export default {
  name: 'ArticleManage',
  data () {
    return {
      form: {},
      labelWidth: '40px',
      category: '',
      fansNumList: [],
      data: [],
      currentRow: {},
      showDialog: false,
      currentTitle: '',
      pagination: {
        page: 1,
        pageSize: 20,
        total: 0
      },
      loading: false,
      columns: [
        { type: 'checkbox', width: 50 },
        { field: 'account', title: '帐号', minWidth: 120 },
        { field: 'nickname', title: '昵称', formatter: 'formatEmpty', minWidth: 100 },
        { field: 'status_text', title: '状态', minWidth: 100 },
        { field: 'role', title: '角色', width: 100 },
        { field: 'login_times', title: '登陆次数', formatter: 'formatEmpty', width: 100 },
        { field: 'created_at', title: '创建时间', width: 100 },
        { field: 'last_login_at', title: '上一次登录时间', formatter: 'formatEmpty', minWidth: 100 },
        { field: 'last_login_location', title: '上一次登陆地点', formatter: 'formatEmpty', minWidth: 120 },
        { field: 'last_login_ip', title: '上一次登陆IP', formatter: 'formatEmpty', width: 120 },
        { field: 'email', title: '邮箱', formatter: 'formatEmpty', width: 120 },
        { title: '操作', minWidth: 140, fixed: 'right', slots: {
          default: ({ row }) => {
            return [
              <template>
                <el-button>编辑</el-button>
                <el-button>删除</el-button>
              </template>
            ]
          }
        }}
      ]
    }
  },
  computed: {
    searchOptions () {
      return [
        { key: 'keyword', xs: 24, sm: 12, md: 8, lg: 8, label: '用户名', component: { name: 'input' }},
        { key: 'status', xs: 24, sm: 12, md: 8, lg: 8, label: '帐号状态', component: { name: 'select', placeholder: '请选择', options: [] }},
        { key: 'created_at', xs: 24, sm: 12, md: 8, lg: 8, label: '创建时间', component: { name: 'range' }}
      ]
    }
  },
  created () {
    // this.fetchTalentConditions()
    this.fetchList()
  },
  methods: {
    async fetchTalentConditions () {
      try {
        const data = await fetchTalentConditions()
        this.fansNumList = data.fansNumList || []
      } catch (err) {
        console.error(err)
      }
    },
    async fetchList (form) {
      this.loading = true
      try {
        form && (this.form = form)

        const data = await fetchUserList()
        this.data = data.list
        this.pagination.total = data.total * 1
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    /**
     * @create 2021/01/12 13:48
     * @desc 查看图表
     * @param { Object } row
     * @param { String } key 对应的字段名称
     * @param { String } title
     */
    viewChart (row, key, title) {
      this.currentRow = row
      this.currentTitle = title
      this.showDialog = true
    },
    /**
     * @create 2021/01/12 17:37
     * @desc 删除行
     * @param { Object } row
     * @param { Number } rowIndex
     */
    deleteRow (row, rowIndex) {

    }
  }
}
</script>

<style lang="scss" scoped>
.search-item-wrapper {
  display: flex;

  &+.search-item-wrapper {
    margin-top: 15px;
  }

  >span {
    width: 40px;
    font-size: 13px;
    line-height: 28px;
    color: $text-color-dark;
  }

  >div {
    flex: 1;
  }

  >>>.el-form-item__label, >>>.el-form-item__content {
    line-height: 28px;
  }
  >>>.el-form-item__label, >>>.el-checkbox__label {
    font-size: 12px;
    font-weight: 400;
  }
  .el-form-item {
    margin-bottom: 5px;
  }
}

>>>.vxe-table.size--small .vxe-body--column:not(.col--ellipsis){
  padding:15px 0;
}
</style>
