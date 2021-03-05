<template>
  <div>
    <el-card class="has-tools" style="border-top-left-radius:0;">
      <template #header>
        <span>数据概览</span>
        <div>
          <QuickDate @change="quickDateChange" />
        </div>
      </template>
      <div v-loading="loading" class="statistics-wrapper">
        <ul class="content-list1">
          <li>
            <i class="iconfont icon-video"></i>
            <div>
              <span>最新作品数</span>
              <em>{{ statisticsInfo.newWorksNum==0?'-': statisticsInfo.newWorksNum | toTenThousand }}</em>
            </div>
          </li>
          <li>
            <i class="iconfont icon-fans"></i>
            <div>
              <span>粉丝增量</span>
              <em>{{ statisticsInfo.fansNumIncremental==0?'-': statisticsInfo.fansNumIncremental | toTenThousand }}</em>
            </div>
          </li>
          <li>
            <i class="iconfont icon-like"></i>
            <div>
              <span>获赞增量</span>
              <em>{{ statisticsInfo.likeNunIncremental==0?'-':statisticsInfo.likeNunIncremental | toTenThousand }}</em>
            </div>
          </li>
        </ul>

        <ul class="content-list2">
          <li>
            <span>GMV</span>
            <em>{{ statisticsInfo.gmv==0?'-': statisticsInfo.gmv | toTenThousand }}</em>
          </li>
          <li>
            <span>付费率</span>
            <em>{{ statisticsInfo.payRate==0?'-':statisticsInfo.payRate | money }}%</em>
          </li>
          <li>
            <span>橱窗</span>
            <em>{{ statisticsInfo.isOpenWindow ? '已开通' : '未开通' }}</em>
          </li>
          <li>
            <span>直播场次</span>
            <em>{{ statisticsInfo.liveNum==0? '-': statisticsInfo.liveNum | toTenThousand }}</em>
          </li>
        </ul>
      </div>
    </el-card>

    <TrendChart v-loading="loading" title="粉丝趋势" :data="data.fansTrend || []" />
    <TrendChart v-loading="loading" title="点赞趋势" :data="data.likeTrend || []" />
  </div>
</template>

<script>
import TrendChart from './TrendChart'
import { fetchTalentBasicAnalysisData } from '@/api/tiktok'
import QuickDate from '@/components/QuickDate'

export default {
  name: 'BasicAnalysis',
  components: {
    TrendChart,
    QuickDate
  },
  data () {
    return {
      loading: false,
      data: {},
      fansTrendType: 1, // 粉丝趋势图表显示类型，1: 增量，2: 总量
      likeTrendType: 1 // 点赞趋势图表显示类型，1: 增量，2: 总量
    }
  },
  computed: {
    statisticsInfo () {
      return this.data.statisticsInfo || {}
    }
  },
  created () {
    // this.fetchData()
  },
  methods: {
    /**
     * @create 2021/01/15 09:34
     * @desc 获取数据
     */
    async fetchData (dates) {
      this.loading = true
      try {
        let startTime = '', endTime = ''
        if (dates) {
          startTime = dates[0]
          endTime = dates[1]
        }
        const data = await fetchTalentBasicAnalysisData({ id: this.$route.params.id, startTime, endTime })
        this.data = data
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    quickDateChange (dates) {
      this.fetchData(dates)
    },
    getDay (day) {
      var today = new Date()
      var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day
      today.setTime(targetday_milliseconds) // 注意，这行是关键代码
      var tYear = today.getFullYear()
      var tMonth = today.getMonth()
      var tDate = today.getDate()
      tMonth = this.doHandleMonth(tMonth + 1)
      tDate = this.doHandleMonth(tDate)
      return tYear + '-' + tMonth + '-' + tDate
    },
    doHandleMonth (month) {
      var m = month
      if (month.toString().length === 1) {
        m = '0' + month
      }
      return m
    }
  }
}
</script>

<style lang="scss" scoped>
// >>>.el-card.has-chard .el-card__body {
//   padding-right: 0;
// }
.content-list1>li{
  em{
    margin-top: 5px;
  }
}
.content-list2>li{
  em{
    margin-top: 8px;
  }
}
</style>
