<template>
  <BiCard>
    <div slot="title" class="title">
      <i class="el-icon-time"></i>
      实时已支付金额
      <span>(中国时间: {{ realTimeData.time | time('{y}-{m}-{d} {h}:{i}') }})</span>

      <el-radio-group v-if="isEbayAndAmazon" v-model="sourceType" class="source-select" @change="$emit('changeSource', sourceType)">
        <el-radio label="erp">ERP金额</el-radio>
        <el-radio label="platform">平台金额</el-radio>
      </el-radio-group>
    </div>
    <el-row class="realtime-section">
      <el-col class="realtime-section__info" :xs="24" :md="11" :lg="9">
        <el-row :gutter="20" style="width: 100%">
          <el-col :xs="24" :sm="14">
            <CountTo
              class="total-price"
              :prefix="symbol"
              :start-val="0"
              :end-val="total | money"
              :duration="500"
              :decimals="2"
              :style="{ color: '#ff6f29', fontSize: '40px', fontWeight: '600' }"
            />
            <div class="info-bottom">
              <div>
                <span style="margin-right: 15px;">
                  昨天：
                  <em>{{ symbol }}{{ yesterdayTotal | money | toThousandFilter }}</em>
                </span>
                <span>
                  前天：
                  <em>{{ symbol }}{{ beforeYesterdayTotal | money | toThousandFilter }}</em>
                </span>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="10">
            <div class="info">
              <div>
                实时售出 <em>{{ realTimeData.salesNum }}</em>
              </div>
              <div>
                实时订单 <em>{{ realTimeData.orderNum }}</em>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col class="realtime-section__chart" :xs="24" :md="13" :lg="15">
        <div class="chart">
          <!-- 实时折线图 -->
          <div class="chart-wrapper">
            <RealTimeChart :options="options" />
          </div>
          <div class="date-select">

          </div>
        </div>
      </el-col>
    </el-row>
  </BiCard>
</template>

<script>
import { colorPrice, textColorPrimary } from '@/styles/variables.scss'
import RealTimeChart from './RealTimeChart'
import CountTo from 'vue-count-to'
import { mapGetters } from 'vuex'
import { fetchShopTodayInfo, fetchRealTimeChartData } from '@/api/dashboard'
import BiCard from '@/components/BiCard'

// 实时已支付金额
export default {
  name: 'RealTimePaidInfo',
  components: {
    RealTimeChart,
    CountTo,
    BiCard
  },
  props: {
    ids: { // 业务线id，多个id用英文逗号隔开
      type: [String, Number],
      default: ''
    },
    timezone: {
      type: [String, Number],
      default: 'cn'
    }
  },
  data () {
    return {
      total: 0,
      yesterdayTotal: 0,
      beforeYesterdayTotal: 0,
      colorPrice,
      textColorPrimary,
      timer: null,
      realTimeData: {
        time: '', // 实时时间 取到分
        salesNum: 0, // 实时销售数量
        orderNum: 0, // 实时订单数量
        today: {}, // 当天数据
        yesterday: {} // 昨天数据
      },
      sourceType: 'platform', // 数据源，取自ERP或者取自平台，只有在ebay和amazon业务线时可以切换
      abort: false
    }
  },
  computed: {
    ...mapGetters([
      'symbol'
    ]),
    isEbayAndAmazon () {
      const id = Number(this.ids)
      return id === 1 || id === 2
    },
    options () {
      const todayList = this.realTimeData.today.data || []
      const todayTotalList = this.realTimeData.today.upToData || []
      const todayData = todayList.map((v, i) => {
        return {
          value: v,
          upToTotal: todayTotalList[i]
        }
      })
      const yesterdayList = this.realTimeData.yesterday.data || []
      const yesterdayTotalList = this.realTimeData.yesterday.upToData || []
      const yesterdayData = yesterdayList.map((v, i) => {
        return {
          value: v,
          upToTotal: yesterdayTotalList[i]
        }
      })
      return {
        series: [
          {
            name: this.realTimeData.today.name,
            symbol: 'emptyCircle',
            symbolSize: 2,
            showSymbol: false, // 只在显示tooltips时显示
            data: todayData
          },
          {
            name: this.realTimeData.yesterday.name,
            data: yesterdayData
          }
        ]
      }
    }
  },
  watch: {
    'realTimeData.time' (newV) {
      this.$emit('change', newV)
    },
    ids (newV) {
      this.clear()
      this.start()
    }
  },
  mounted () {
    this.start()
  },
  beforeDestroy () {
    this.clear()
  },
  methods: {
    /**
     * @date 2020/11/05 13:45
     * @description 获取实时数据
     */
    fetchData () {
      this.realTimeData.time = new Date()
      const ids = this.ids + ''
      const params = {
        businessIds: ids,
        timezone: this.timezone
      }
      // 数据源类型
      params.sourceType = this.ids === 1 || this.ids === 2 ? 'erp' : this.sourceType

      Promise.all([fetchShopTodayInfo(params), fetchRealTimeChartData(params)])
        .then(([data, data1]) => {
          // 如果切换了业务线之类的，强行中断刷新数据，防止数据闪烁
          // if (this.abort) {
          //   this.abort = false
          //   this.$emit('complete')
          //   return
          // }

          this.total = data.shopdata.todaySaleAmount // 实时销售金额
          this.yesterdayTotal = data.shopdata.yesterdaySaleAmount // 昨天的销售金额
          this.beforeYesterdayTotal = data.shopdata.beforeYesterdaySaleAmount
          this.realTimeData.salesNum = data.saledata.skuCount // 实时售出数
          this.realTimeData.orderNum = data.saledata.saleCount // 实时售出订单数

          this.realTimeData.today = data1[0]
          this.realTimeData.yesterday = data1[1]
          this.$emit('complete')
        })
    },
    start () {
      if (this.timer) {
        this.clear()
      }
      this.fetchData()
      this.timer = setInterval(() => {
        this.fetchData()
      }, 30000)
    },
    clear () {
      // this.abort = true
      clearInterval(this.timer)
      this.timer = null
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.anticon {
  margin-right: 5px;
}
.total-price {
  position: relative;
  display: block;
  padding-right: 40px;

  &:after {
    content: '';
    position: absolute;
    right: 0;
    top: 10px;
    height: 40px;
    width: 1px;
    background-color: $border-color-base;
  }
}
.title {
  font-size: $font-size-title;
  text-align: left;

  span {
    font-weight: 400;
    margin-left: 10px;
    color: #aaa;
    font-size: 14px;
  }
}
.realtime-section {
  &__info {
    display: flex;

    .info-bottom {
      width: 100%;
      display: flex;
      color: #aaa;

      em {
        color: $text-color-primary;
      }

      >div {
        display: flex;
        align-items: center;
        margin-right: 20px;
      }
    }
    .info {
      // width: 140px;
      padding-left: 30px;

      @media screen and (max-width: 768px) {
        padding-left: 0;
        display: flex;
        width: 100%;
        margin-top: 10px;

        >div {
          margin-right: $main-space;
        }
      }

      em {
        font-size: $font-size-large;
        font-weight: bold;
        color: #000;
        margin-left: 5px;
      }
    }
  }

  &__chart {
    flex: 1;
    display: flex;
    height: 100px;

    @media screen and (max-width: 768px) {
      margin-top: 20px;
    }

    .chart {
      flex: 1;
      height: 100%;

      .chart-wrapper {
        height: 100%;
      }
    }
  }
}

// 来源选择
.source-select {
  margin-left: $main-space;

  .el-radio {
    margin-right: 15px;

    >>>.el-radio__label {
      padding-left: 5px;
    }
  }
}
</style>
