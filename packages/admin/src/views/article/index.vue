<template>
  <div class="base-box table-box">
    <AppSearch :options="searchOptions" :action="fetchList" block-button />

    <el-card class="base-box--top artcile-list table-box__table">
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
import { fetchArticleList } from '@/api/article'

export default {
  name: 'ArticleManage',
  data () {
    return {
      form: {},
      labelWidth: '40px',
      category: '',
      categoryList: [],
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
        { field: 'title', title: '标题', minWidth: 120 },
        { field: 'category', title: '分类', minWidth: 100 },
        { field: 'tags', title: '标签', minWidth: 100 },
        { field: 'views', title: '阅读次数', width: 100 },
        { field: 'likes', title: '点赞人数', width: 100 },
        { field: 'publish_status', title: '发布状态', width: 100 },
        { field: 'public_status', title: '公开状态', width: 100 },
        { field: 'publish_at', title: '发布时间', minWidth: 140 },
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
        { key: 'keyword', xs: 24, sm: 12, md: 8, lg: 8, label: '关键词', component: { name: 'input' }},
        { key: 'category', xs: 24, sm: 12, md: 8, lg: 8, label: '分类', component: { name: 'select', placeholder: '请选择', options: this.categoryList }},
        { key: 'publish_status', xs: 24, sm: 12, md: 8, lg: 8, label: '发布状态', component: { name: 'select', placeholder: '请选择', options: [] }},
        { key: 'tags', xs: 24, sm: 12, md: 8, lg: 8, label: '标签', component: { name: 'select', placeholder: '请选择', multiple: true, options: [] }},
        { key: 'create_at', xs: 24, sm: 12, md: 8, lg: 8, label: '创建时间', component: { name: 'range' }},
        { key: 'publish_at', xs: 24, sm: 12, md: 8, lg: 8, label: '发布时间', component: { name: 'range' }}
      ]
    }
  },
  created () {
    this.fetchTalentConditions()
    this.fetchList()
  },
  methods: {
    async fetchTalentConditions () {
      try {
        const data = await fetchTalentConditions()
        this.categoryList = [{ label: '不限', value: '' }].concat(data.categoryList || [])
        this.fansNumList = data.fansNumList || []
      } catch (err) {
        console.error(err)
      }
    },
    async fetchList (form) {
      this.loading = true
      try {
        form && (this.form = form)

        const data = await fetchArticleList()
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
