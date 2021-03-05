<template>
  <div class="base-box table-box">
    <AppSearch :options="searchOptions" :action="fetchList" block-button />

    <el-tabs v-model="activeAttention" type="card" class="base-box--top" @tab-click="fetchList">
      <el-tab-pane label="全部达人" name="0" />
      <el-tab-pane label="已关注达人" name="2" />
      <el-tab-pane label="未关注达人" name="1" />
    </el-tabs>
    <el-card class="talent-list table-box__table">
      <div class="table-wrapper">
        <vxe-table
          :loading="loading"
          :data="data"
          border="inner"
          size="small"
          align="center"
          height="100%"
          :empty-render="{ name: 'Empty' }"
        >
          <vxe-table-column type="checkbox" width="50" />
          <vxe-table-column
            min-width="100"
            title="达人"
            align="left"
          >
            <template slot-scope="{ row }">
              <div class="user-info" @click="goDetail(row)">
                <el-image :src="row.avatar" style="width: 45px; height: 45px; border-radius: 50%" />
                <div class="user-info__content">
                  <em class="primary hover-link">{{ row.name }}</em>
                  <span>{{ row.tiktokId }}</span>
                </div>
              </div>
            </template>
          </vxe-table-column>
          <vxe-table-column title="粉丝总量" min-width="90" field="fansNum" sortable>
            <template slot-scope="{ row }">
              <span v-if="row.fansNum > 0" class="label-item">
                <em>{{ row.fansNum | toTenThousand }}</em>
              <!-- <i class="iconfont icon-line-chart" @click="viewChart(row, 'fansNum', column.title)"></i> -->
              </span>
              <span v-else>-</span>
            </template>
          </vxe-table-column>
          <!-- <vxe-table-column title="近30天增粉量" min-width="100">
          <template slot-scope="{ row, column }">
            <span v-if="row.growthNumNear30Days > 0" class="label-item">
              <em>{{ row.growthNumNear30Days | toTenThousand }}</em>
              <i class="iconfont icon-line-chart" @click="viewChart(row, 'growthNumNear30Days', column.title)"></i>
            </span>
            <span v-else>-</span>
          </template>
        </vxe-table-column> -->
          <vxe-table-column
            title="作品量"
            min-width="70"
            field="worksNum"
            sortable
          >
            <template slot-scope="{ row }">
              <span v-if="row.worksNum > 0" class="label-item">
                <em>{{ row.worksNum | toTenThousand }}</em>
              <!-- <i class="iconfont icon-line-chart" @click="viewChart(row, 'worksNum', column.title)"></i> -->
              </span>
              <span v-else>-</span>
            </template>
          </vxe-table-column>
          <!-- <vxe-table-column title="播放均量" min-width="90">
          <template slot-scope="{ row, column }">
            <span v-if="row.averagePlayNum > 0" class="label-item">
              <em>{{ row.averagePlayNum }}%</em>
              <i class="iconfont icon-line-chart" @click="viewChart(row, 'averagePlayNum', column.title)"></i>
            </span>
            <span v-else>-</span>
          </template>
        </vxe-table-column> -->
          <!-- <vxe-table-column title="直播量" min-width="70">
          <template slot-scope="{ row, column }">
            <span v-if="row.liveNum > 0" class="label-item">
              <em>{{ row.liveNum | toTenThousand }}</em>
              <i class="iconfont icon-line-chart" @click="viewChart(row, 'liveNum', column.title)"></i>
            </span>
            <span v-else>-</span>
          </template>
        </vxe-table-column> -->
          <vxe-table-column title="获赞数" min-width="70" field="likeNum" sortable>
            <template slot-scope="{ row }">
              <span v-if="row.likeNum > 0" class="label-item">
                <em>{{ row.likeNum | toTenThousand }}</em>
              <!-- <i class="iconfont icon-line-chart" @click="viewChart(row, 'likeNum', column.title)"></i> -->
              </span>
              <span v-else>-</span>
            </template>
          </vxe-table-column>
          <!-- <vxe-table-column title="赞粉比" min-width="70">
          <template slot-scope="{ row, column }">
            <span v-if="row.likeRate > 0" class="label-item">
              <em>{{ row.likeRate }}%</em>
              <i class="iconfont icon-line-chart" @click="viewChart(row, 'likeRate', column.title)"></i>
            </span>
            <span v-else>-</span>
          </template>
        </vxe-table-column> -->
          <!-- <vxe-table-column title="评论数" min-width="70">
          <template slot-scope="{ row, column }">
            <span v-if="row.commentNum > 0" class="label-item">
              <em>{{ row.commentNum | toTenThousand }}</em>
              <i class="iconfont icon-line-chart" @click="viewChart(row, 'commentNum', column.title)"></i>
            </span>
            <span v-else>-</span>
          </template>
        </vxe-table-column> -->
          <vxe-table-column field="updateAt" title="最近更新时间" min-width="100" sortable />
          <vxe-table-column title="操作" width="140" align="center">
            <div slot-scope="{ row, $rowIndex }" class="operation-wrapper">
              <el-button type="text">
                <router-link :to="`/tiktok/talent-detail/${row.id}`">详情</router-link>
              </el-button>
              <!-- <el-button type="text">+PK</el-button> -->
              <el-button type="text" @click="handleAttention(row)">{{ row.status==2?'已关注':'关注' }}</el-button>
              <!-- <el-button type="text" @click="deleteRow(row, $rowIndex)">删除</el-button> -->
              <el-popconfirm
                :title="`确定要删除该达人(${currentRow.name})吗？`"
                @confirm="deleteRow(row, $rowIndex)"
              >
                <el-button slot="reference" type="text" @click="currentRow = row">删除</el-button>
              </el-popconfirm>
            </div>
          </vxe-table-column>
        </vxe-table>
      </div>
      <AppPagination v-model="pagination" @update="fetchList" />
    </el-card>

    <el-dialog :visible.sync="showDialog" :title="currentTitle">
      xxx
    </el-dialog>
  </div>
</template>

<script>
import { fetchTalentList, fetchTalenUpdate, fetchTalentConditions } from '@/api/tiktok'

export default {
  name: 'TalentLibrary',
  data () {
    return {
      form: {},
      labelWidth: '40px',
      category: '',
      categoryList: [],
      agesList: [],
      fansNumList: [],
      activeAttention: 0,
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
      genderList: []
    }
  },
  computed: {
    searchOptions () {
      return [
        { key: 'category', label: '分类', component: { name: 'select', placeholder: '请选择分类', options: this.categoryList }},
        { key: 'gender', label: '性别', component: { name: 'select', placeholder: '请选择性别', options: this.genderList }},
        { key: 'ages', label: '年龄', component: { name: 'select', placeholder: '请选择年龄', options: this.agesList }},
        { key: 'fansNums', label: '粉丝数', component: { name: 'select', placeholder: '请选择粉丝数', options: this.fansNumList }}
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
        this.agesList = data.ageList || []
        this.categoryList = [{ label: '不限', value: '' }].concat(data.categoryList || [])
        this.fansNumList = data.fansNumList || []
        this.genderList = data.genderList || []
      } catch (err) {
        console.error(err)
      }
    },
    async fetchList (form) {
      this.loading = true
      try {
        form && (this.form = form)

        const data = await fetchTalentList({
          page: this.pagination.page,
          pageSize: this.pagination.pageSize,
          cid: this.category,
          status: Number(this.activeAttention) === 0 ? '' : this.activeAttention,
          gender: this.form.gender ? this.form.gender : 0,
          age: this.form.ages,
          fansNum: this.form.fansNums
        })
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
      // console.log(row, rowIndex)
      // this.currentRow = row
      // this.$confirm(`是否删除达人：${row.name}`, )
      // 调接口
      this.loading = true
      fetchTalenUpdate({ ids: row.id, status: 0 }).then(() => {
        this.loading = false
        this.data.splice(rowIndex, 1)
        this.$message.success('删除成功')
      }).catch(err => {
        console.error(err)
      })
    },
    handleAttention (row) {
      this.loading = true
      fetchTalenUpdate({ ids: row.id, status: Number(row.status) === 1 ? 2 : 1 }).then(() => {
        this.loading = false
        this.$message.success(Number(row.status) === 1 ? '关注成功' : '取消关注成功')
        this.fetchList()
      }).catch(err => {
        console.error(err)
      })
    },
    handleReSet () {
      this.category = ''
      this.form.gender = ''
      this.form.ages = ''
      this.form.fansNums = ''
    },
    goDetail (row) {
      this.$router.push(`/tiktok/talent-detail/${row.id}`)
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

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    em:hover {
      text-decoration: underline;
    }
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    line-height: 17px;
    font-size: 12px;
  }
}

.label-item {
  display: block;
  .iconfont {
    cursor: pointer;
    margin-left: 5px;

    &:hover {
      color: $color-primary;
    }
  }
}

.operation-wrapper {
  display: flex;
  // flex-wrap: wrap;

  .el-button {
    margin: 0;
    width: 50%;
    padding: 3px 0;
    font-size: 12px;
  }
}
>>>.vxe-table.size--small .vxe-body--column:not(.col--ellipsis){
  padding:15px 0;
}
>>>.el-tabs--card>.el-tabs__header{
  border: none;
  margin-bottom: 0;
  .el-tabs__item.is-active{
    border: none;
    background: #fff;
    color: #101010;
  }
  .el-tabs__nav{
    border: none;
  }
  .el-tabs__item{
    border: none;
    margin-left: 5px;
    background: #F8F8FA;
    &:first-child{
      margin-left: 0;
      border-left:1px solid #EBEEF5;
    }
    color:#A9A9AB;
    font-weight: normal;
  }
}
.talent-list{
  border-top-left-radius: 0;
}
</style>
