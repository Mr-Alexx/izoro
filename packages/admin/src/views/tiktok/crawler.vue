<template>
  <div v-loading="pageLoading" class="base-box table-box">
    <el-card class="table-box__table">
      <div class="top-button">
        <el-button type="primary" size="small" @click="showDialog = true">新增爬虫条件</el-button>
      </div>
      <div class="table-wrapper">
        <vxe-table
          ref="table"
          :loading="loading"
          :data="data"
          border="inner"
          size="small"
          align="center"
          height="100%"
          :empty-render="{ name: 'Empty' }"
        >
          <vxe-table-column type="checkbox" width="60" />
          <vxe-table-column field="keyword" title="关键字" min-width="80" />
          <vxe-table-column field="dimension" title="维度" min-width="80" />
          <vxe-table-column field="relativeCategory" title="关联类目" min-width="80" />
          <vxe-table-column title="抓取条件" min-width="80">
            <template>111</template>
          </vxe-table-column>
          <vxe-table-column field="times" title="抓取次数" :formatter="formatNum" min-width="80" />
          <vxe-table-column title="抓取总数" min-width="80">
            <span slot-scope="{ row }" class="primary">{{ row.totalNum | toThousandFilter }}</span>
          </vxe-table-column>
          <vxe-table-column field="createdTime" title="创建时间" min-width="140" />
          <vxe-table-column field="lastGrabTime" title="最后抓取时间" min-width="140" />
          <vxe-table-column title="状态" min-width="80">
            <template slot-scope="{ row }">
              <el-tag :type="row.statusText === '进行中' ? 'success' : row.statusText === '未开始' ? 'info' : 'danger'" size="small">{{ row.statusText }}</el-tag>
            </template>
          </vxe-table-column>
          <vxe-table-column title="操作" width="130" fixed="right">
            <template slot-scope="{ row, $rowIndex }">
              <el-button type="text" size="small" :disabled="row.status!=0" @click="handleStart(row)">开始</el-button>
              <el-button type="text" size="small" :disabled="row.status==1||row.status==2" @click="editCondition(row)">编辑</el-button>
              <el-popconfirm
                title="确定要删除该爬虫条件吗？"
                @confirm="deleteRow(row, $rowIndex)"
              >
                <el-button
                  slot="reference"
                  type="text"
                  size="small"
                  :disabled="row.status==1"
                  @click="currentRow = row"
                >删除</el-button>
              </el-popconfirm>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>

      <!-- 分页 -->
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" style="padding-top: 20px">
          <span>批量操作：</span>
          <el-button-group>
            <el-button @click="handleButtonClick(1)">批量开始</el-button>
            <!-- <el-button @click="handleButtonClick(2)">批量暂停</el-button> -->
            <el-button @click="handleButtonClick(3)">批量删除</el-button>
          </el-button-group>
        </el-col>
        <el-col :xs="24" :sm="12">
          <AppPagination v-model="pagination" @update="fetchList" />
        </el-col>
      </el-row>
    </el-card>

    <el-dialog :visible.sync="showDialog" title="新增爬虫条件" width="780px">
      <el-form ref="form" :model="form" :rules="rules">
        <!-- 基础设置 -->
        <div>
          <el-divider content-position="left">基础设置</el-divider>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12">
              <el-form-item label="关键词" prop="keyword" :label-width="labelWidth">
                <el-input v-model="form.keyword" size="small" placeholder="将以该关键词去搜索后进行抓取" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12">
              <el-form-item>
                <el-radio-group v-model="form.dimension">
                  <el-radio v-for="item in dimensionList" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
                </el-radio-group>
                <!-- <el-checkbox-group v-model="form.dimensions">
                  <el-checkbox v-for="item in dimensionList" :key="item.value" :label="item.value">{{ item.label }}</el-checkbox>
                </el-checkbox-group> -->
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 抓取条件 -->
        <div>
          <el-divider content-position="left">抓取条件</el-divider>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="8">
              <el-form-item label="粉丝数" :label-width="labelWidth">
                <el-select v-model="form.conditions.fansNum" size="small">
                  <el-option v-for="(item, i) in fansNumList" :key="i" :value="item.value" :label="item.label" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="8">
              <el-form-item label="获赞数" :label-width="labelWidth">
                <el-select v-model="form.conditions.likeNum" size="small">
                  <el-option v-for="(item, i) in likeNumList" :key="i" :value="item.value" :label="item.label" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="8">
              <el-form-item label="作品数" :label-width="labelWidth">
                <el-select v-model="form.conditions.worksNum" size="small">
                  <el-option v-for="(item, i) in worksNumList" :key="i" :value="item.value" :label="item.label" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :xs="24" :sm="8">
              <el-form-item label="是否开通橱窗" :label-width="labelWidth">
                <el-select v-model="form.conditions.isOpenWindow" size="small">
                  <el-option v-for="(item, i) in isOpenWindowList" :key="i" :value="item.value" :label="item.label" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="8">
              <el-form-item label="区域" :label-width="labelWidth">
                <el-select v-model="form.conditions.area" size="small">
                  <el-option v-for="(item, i) in areaList" :key="i" :value="item.value" :label="item.label" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="8">
              <el-form-item label="抓取最大条数" :label-width="labelWidth">
                <!-- <el-select v-model="form.conditions.maxItem" size="small">
                  <el-option v-for="(item, i) in percentageOfFansList" :key="i" :value="item.value" :label="item.label" />
                </el-select> -->
                <el-input v-model.number="form.conditions.maxItem" min="1" max="10000" placeholder="请输入内容" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :xs="24" :sm="8">
              <el-form-item label="年龄" :label-width="labelWidth">
                <el-select v-model="form.conditions.age" size="small">
                  <el-option v-for="(item, i) in ageList" :key="i" :value="item.value" :label="item.label" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <div slot="footer" class="text-center">
        <el-button size="small" @click="showDialog = false">取消</el-button>
        <el-button type="primary" size="small" :loading="isSaving" @click="addCondition">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchCrawlerList, fetchCrawlerConditions, fetchUpdateCrawler, fetchCrawlerUpdateStatus } from '@/api/tiktok'
import { mapGetters } from 'vuex'
import mixins from './mixins/crawler'
import { toThousandFilter } from '@/filters'

export default {
  name: 'Crawler',
  mixins: [mixins],
  data () {
    return {
      pageLoading: false,
      loading: false,
      data: [],
      pagination: {
        page: 1,
        pageSize: 20,
        total: 0
      },
      showDialog: false,
      form: {
        dimension: 1,
        conditions: {
          fansNum: '0-10000',
          likeNum: '',
          worksNum: '',
          isOpenWindow: '',
          area: '',
          percentageOfFans: '',
          age: '',
          maxItem: 1
        },
        id: ''
      },
      rules: {
        keyword: [{ required: true, trigger: 'blur', message: '请添加关键词' }]
      },
      labelWidth: '100px',
      isSaving: false
    }
  },
  computed: {
    ...mapGetters([
      'tableHeight'
    ])
  },
  created () {
    this.fetchList()
    this.fetchCrawlerConditions()
  },
  methods: {
    async fetchList () {
      this.loading = true
      try {
        const data = await fetchCrawlerList(this.pagination)
        this.data = data.list || []
        this.pagination.total = data.total * 1
        console.log(data)
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    /**
     * @create 2021/01/19 15:05
     * @desc 批量处理功能
     * @param { Number } type 1: 批量开始，2: 批量暂停，3: 批量删除
     */
    handleButtonClick (type = 1) {
      // 获取选中记录
      const list = this.$refs.table.getCheckboxRecords()
      console.log(list)
      if (list.length === 0) {
        return this.$message.info('请选择要处理的爬虫条件！')
      }
      this.pageLoading = true
      const ids = []
      list.forEach(item => {
        ids.push(item.id)
      })
      console.log(ids)
      const test = (status) => {
        fetchCrawlerUpdateStatus({
          ids: ids.join(','),
          status
        }).then(() => {
          setTimeout(() => {
            this.pageLoading = false
            this.$refs.table.clearCheckboxRow()
            this.$message.success('处理成功！')
          }, 500)
          this.fetchList()
        }).catch(err => {
          console.error(err)
        })
      }
      switch (type) {
        case 1: // 批量开始
          test(1)
          break
        case 2: // 批量暂停
          test(2)
          break
        case 3: // 批量删除
          test(3)
          break
      }
    },
    editCondition (row) {
      this.showDialog = true
      console.log(row)
      this.form.conditions = row.conditions
      if (!this.form.conditions.maxItem) {
        this.form.conditions.maxItem = 1
      }
      this.form.keyword = row.keyword
      this.form.dimension = row.dimension
      this.form.id = row.id
    },
    /**
     * @create 2021/01/19 10:51
     * @desc 新增爬虫条件
     */
    addCondition () {
      console.log(this.form)
      this.$refs.form.validate(valid => {
        if (!valid) { return }

        this.isSaving = true
        fetchUpdateCrawler({
          keyword: this.form.keyword,
          dimension: this.form.dimension,
          fans: this.form.conditions.fansNum,
          digg: this.form.conditions.likeNum,
          video: this.form.conditions.worksNum,
          is_entry_shop: this.form.isOpenWindow,
          area_china_id: this.form.conditions.area,
          digg_fans_rate: this.form.conditions.percentageOfFans,
          age: this.form.conditions.age,
          max_item: this.form.conditions.maxItem,
          id: this.form.id
        }).then(() => {
          setTimeout(() => {
            this.isSaving = false
            this.$message.success('新增成功！')
            this.showDialog = false
            this.form = {
              dimension: 1,
              conditions: {
                fansNum: '0-10000',
                likeNum: '',
                worksNum: '',
                isOpenWindow: '',
                area: '',
                percentageOfFans: '',
                age: '',
                maxItem: 1
              },
              id: ''
            }
            this.fetchList()
          }, 500)
        }).catch(err => {
          console.error(err)
        })
      })
    },
    formatNum ({ cellValue }) {
      return toThousandFilter(cellValue)
    },
    /**
     * @create 2021/01/19 15:36
     * @desc 删除爬虫条件，单个、批量都行
     */
    deleteRow (row, rowIndex) {
      this.pageLoading = true
      fetchCrawlerUpdateStatus({
        ids: row.id,
        status: 3
      }).then(() => {
        setTimeout(() => {
          this.pageLoading = false
          this.$refs.table.clearCheckboxRow()
          this.$message.success('处理成功！')
        }, 500)
        this.data.splice(rowIndex, 1)
      }).catch(err => {
        console.error(err)
      })
    },
    handleStart (row) {
      this.pageLoading = true
      fetchCrawlerUpdateStatus({
        ids: row.id,
        status: 1
      }).then(() => {
        setTimeout(() => {
          this.pageLoading = false
          this.$refs.table.clearCheckboxRow()
          this.$message.success('处理成功！')
        }, 500)
        this.fetchList()
      }).catch(err => {
        console.error(err)
      })
    },
    // 获取爬虫条件数据
    async fetchCrawlerConditions () {
      this.conditionsLoading = true
      try {
        const data = await fetchCrawlerConditions()
        this.crawlerConditions = data
        this.ageList = data.ageList || []
        this.areaList = data.areaList || []
        this.dimensionList = data.dimensionList || []
        this.fansNumList = data.fansNumList || []
        this.isOpenWindowList = data.isOpenWindowList || []
        this.likeNumList = data.likeNumList || []
        this.percentageOfFansList = data.percentageOfFansList || []
        this.worksNumList = data.worksNumList || []
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.top-button {
  margin-bottom: 15px;
  display: flex;
  justify-content: flex-end;
}
>>>.el-form-item {
  margin-bottom: 5px;
}

.el-radio {
  margin-right: 10px;

  >>>.el-radio__label {
    padding-left: 5px;
  }
}
</style>
