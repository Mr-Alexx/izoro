<template>
  <div>
    <el-card class="has-tools">
      <template #header>
        <span>数据概览</span>
        <div>
          <el-radio-group v-model="quickDateType" size="small">
            <el-radio-button :label="1">近3天</el-radio-button>
            <el-radio-button :label="2">近7天</el-radio-button>
            <el-radio-button :label="3">近30天</el-radio-button>
            <el-radio-button :label="4">近90天</el-radio-button>
          </el-radio-group>
        </div>
      </template>
      <div class="statistics-wrapper">
        <ul class="content-list1">
          <li>
            <i class="iconfont icon-fans"></i>
            <div>
              <span>场均转粉率</span>
              <em>{{ statisticsInfo.averageTurnRate | money }}%</em>
            </div>
          </li>
          <li>
            <i class="iconfont icon-time"></i>
            <div>
              <span>场均停留</span>
              <em>{{ statisticsInfo.averageStayTime | getTime }}</em>
            </div>
          </li>
          <li>
            <i class="iconfont icon-file"></i>
            <div>
              <span>场均成交率</span>
              <em>{{ statisticsInfo.averageTurnoverRate | money }}%</em>
            </div>
          </li>
          <li>
            <i class="iconfont icon-wallet"></i>
            <div>
              <span>场均销售额/销量</span>
              <em>
                ¥{{ statisticsInfo.averageSalesAmount | money | toTenThousand }}
                /
                {{ statisticsInfo.averageSalesNum | toTenThousand }}
              </em>
            </div>
          </li>
        </ul>

        <ul class="content-list2">
          <li>
            <span>场均互动率</span>
            <em>{{ statisticsInfo.averageInteractionRate | money }}%</em>
          </li>
          <li>
            <span>场均人数</span>
            <em>{{ statisticsInfo.averageViewsNum | toTenThousand }}%</em>
          </li>
          <li>
            <span>场均在线</span>
            <em>{{ statisticsInfo.averageOnlineNum | toTenThousand }}</em>
          </li>
          <li>
            <span>观看人数峰值</span>
            <em>{{ statisticsInfo.viewsPeakNum | toTenThousand }}</em>
          </li>
        </ul>
      </div>
    </el-card>

    <el-card class="base-box--top">
      <vxe-table
        :loading="loading"
        :data="list"
        border="inner"
        size="small"
        align="center"
        :max-height="tableHeight"
        show-footer
        :footer-method="footerMethod"
      >
        <vxe-table-column type="seq" title="序号" width="60" />
        <vxe-table-column field="startTime" title="开播时间" min-width="80" />
        <vxe-table-column title="直播时长" min-width="80">
          <template slot-scope="{ row }">{{ row.duration | getTime }}</template>
        </vxe-table-column>
        <vxe-table-column field="peakPopularity" title="人气峰值" :formatter="formatNum" min-width="80" />
        <vxe-table-column field="soundWaveIncome" title="音浪收入" :formatter="formatNum" min-width="80" />
        <vxe-table-column field="averageViewsNum" title="场均观看人数" :formatter="formatNum" min-width="120" />
        <vxe-table-column field="goodsNum" title="商品数量" :formatter="formatNum" min-width="80" />
        <vxe-table-column field="salesNum" title="销量" :formatter="formatNum" min-width="80" />
        <vxe-table-column field="salesAmount" title="销售额" :formatter="formatNum" min-width="80" />
        <vxe-table-column field="turnoverRate" title="成交率" :formatter="formatNum" min-width="80" />
        <vxe-table-column title="操作" width="60" fixed="right">
          <template slot-scope="{ row }">
            <el-button type="text" size="small">
              <router-link to="/">详情</router-link>
            </el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </el-card>
  </div>
</template>

<script>
import { fetchTalentLiveAnalysisData } from '@/api/tiktok'
import { mapGetters } from 'vuex'
import { money, toThousandFilter } from '@/filters'

export default {
  name: 'LiveAnalysis',
  filters: {
    getTime (value) {
      value = value || 0
      const h = parseInt(value / 3600) // .padStart(2, '0')
      const m = parseInt((value % 3600) / 60)// .padStart(2, '0')
      const s = (value % 3600) % 60 // .padStart(2, '0')
      return `${h}小时${m}分${s}秒`
    }
  },
  data () {
    return {
      quickDateType: 1,
      data: {},
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'tableHeight'
    ]),
    statisticsInfo () {
      return this.data.statisticsInfo || {}
    },
    list () {
      return (this.data.liveRecords || {}).list || []
    },
    recordSummary () {
      return (this.data.liveRecords || {}).statistics || {}
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    /**
     * @create 2021/01/15 09:34
     * @desc 获取数据
     */
    async fetchData () {
      try {
        const data = await fetchTalentLiveAnalysisData(this.$route.params.id)
        this.data = data
      } catch (err) {
        console.error(err)
      }
    },
    /**
     * @create 2021/01/15 15:02
     * @desc 图表合计
     */
    footerMethod ({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '总计'
          }
          if ([3, 4, 5, 6, 7, 8].includes(columnIndex)) {
            return toThousandFilter(money(this.recordSummary[column.property]))
          }
          return null
        })
      ]
    },
    formatNum ({ cellValue }) {
      return toThousandFilter(money(cellValue))
    }
  }
}
</script>

<style lang="scss" scoped>
>>>.vxe-footer--row {
  font-weight: bold;

  .vxe-footer--column {
    padding: 15px 0 !important;
  }
}
</style>
