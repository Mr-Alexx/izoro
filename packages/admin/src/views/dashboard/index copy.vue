<template>
  <el-container>
    <el-header class="header" style="height: 45px;">
      <el-tabs v-model="businessId" @tab-click="changeTab">
        <el-tab-pane v-for="tab in tabs" :key="tab.id" :name="tab.id + ''" :label="tab.name" />
      </el-tabs>
      <!-- 时区选择 -->
      <el-select v-model="timezone" class="timezone" size="mini" @change="changeTab">
        <el-option v-for="item in timeZoneList" :key="item.code" :value="item.code" :label="item.name">
          <span style="float: left">{{ item.name }}</span>
          <span v-if="item.code !== 'cn'" style="float: right; margin-left: 10px; color: #8492a6; font-size: 13px">{{ item.zone }}</span>
        </el-option>
      </el-select>
    </el-header>

    <el-main class="box content-wrapper">
      <!-- 时区选择 -->
      <el-select v-model="timezone" class="timezone" size="mini" @change="changeTab">
        <el-option v-for="item in timeZoneList" :key="item.code" :value="item.code" :label="item.name">
          <span style="float: left">{{ item.name }}</span>
          <span v-if="item.code !== 'cn'" style="float: right; margin-left: 10px; color: #8492a6; font-size: 13px">{{ item.zone }}</span>
        </el-option>
      </el-select>
      <!-- 实时数据 -->
      <RealTimePaidInfo
        ref="realTimePaidInfo"
        v-loading="pageLoading"
        :ids="businessId"
        :timezone="timezone"
        :source-type="sourceType"
        @complete="pageLoading = false"
        @change="changeTime"
        @changeSource="changeSource"
      />
      <!-- 筛选条件 -->
      <Sticky class-name="filter-section" :z-index="10" :sticky-top="45">
        <!-- 店铺筛选 -->
        <el-popover
          v-model="showPopover"
          trigger="click"
          transition="el-zoom-in-top"
          popper-class="check-popover"
          placement="bottom"
        >
          <el-button slot="reference" class="filter-section__shop action-button bi-ellipsis" plain size="small">
            <font>{{ checkedStr }}</font>
            <i class="el-icon-menu"></i>
          </el-button>
          <div class="wrapper">
            <el-input v-model="searchVal" placeholder="搜索店铺" @input="searchShop" />
            <div class="check-list">
              <el-checkbox-group v-model="checkedList" @change="onChange">
                <div v-for="item in checkboxList" :key="item.id" class="check-item">
                  <el-checkbox :label="item.id">
                    {{ item.name }}
                  </el-checkbox>

                  <el-button size="mini" @click="analysisShop(item.id)">分析</el-button>
                </div>
              </el-checkbox-group>
            </div>

            <div class="footer">
              <div class="check-item">
                <el-checkbox v-model="checkAll" :indeterminate="indeterminate" @change="onCheckAllChange">全选</el-checkbox>

                {{ checkedList.length }}个店铺
              </div>
              <el-button type="primary" size="small" @click="analysisShop('')">聚合分析</el-button>
            </div>
          </div>
        </el-popover>

        <!-- 分类筛选 -->
        <el-select v-model="selectCids" class="filter-section__category" style="width: 140px" size="small">
          <el-option value="" label="所有大类" />
          <el-option v-for="(item, i) in firstLevelList" :key="i" :value="item.id" :label="item.name" />
        </el-select>

        <!-- 时间段、维度选择 -->
        <div>
          对比:
          <AppDatePicker
            v-model="compareDates"
            :options="{
              type: 'date',
              range: true,
              placeholder: '开始日期 ~ 结束日期',
              showCompare: true,
              clearable: false,
              editable: false
            }"
            class="filter-section__date"
          />
        </div>
        <div>
          当前:
          <AppDatePicker
            ref="currentDate"
            v-model="dates"
            :options="{
              type: 'date',
              range: true,
              placeholder: '开始日期 ~ 结束日期',
              clearable: false,
              editable: false
            }"
            class="filter-section__date"
          >
            <template #footer>
              <div class="quick-date-dimension">
                <div>
                  <span>粒度:</span>
                  <!-- 此处有坑，必须添加 :popper-append-to-body="false" -->
                  <!-- 否则，在DatePicker内v-model和change事件都不生效 -->
                  <el-select
                    v-model="dimension"
                    trigger="click"
                    :popper-append-to-body="false"
                    size="mini"
                    @change="changeDimension"
                  >
                    <el-option v-for="(item, i) in granularityOptions" :key="i" :value="item.value" :label="item.label" />
                  </el-select>
                </div>

                <div class="fr">
                  站点时间: {{ currentTime | time('{yyyy}-{m}-{d} {h}:{i}') }}
                </div>
              </div>
            </template>
          </AppDatePicker>
          <DatePicker
            v-if="false"
            v-model="dates"
            range
            :open.sync="openDatePicker"
            :clearable="false"
            :editable="false"
            style="width: 220px;"
            class="filter-section__date"
          >
            <div slot="footer" class="quick-date-footer">
              <div class="quick-date-list">
                <AppTag v-for="(item, i) in ranges" :key="i" @click.native.stop="quickDateClick(item)">{{ item.label }}</AppTag>
              </div>
              <div class="quick-date-dimension">
                <div>
                  <span>粒度:</span>
                  <!-- 此处有坑，必须添加 :popper-append-to-body="false" -->
                  <!-- 否则，在DatePicker内v-model和change事件都不生效 -->
                  <el-select
                    v-model="dimension"
                    trigger="click"
                    :popper-append-to-body="false"
                    size="mini"
                    @change="changeDimension"
                  >
                    <el-option v-for="(item, i) in granularityOptions" :key="i" :value="item.value" :label="item.label" />
                  </el-select>
                </div>

                <div class="fr">
                  站点时间: {{ currentTime | time('{yyyy}-{m}-{d} {h}:{i}') }}
                </div>
              </div>
            </div>
          </DatePicker>
        </div>

        <!-- <el-button class="filter-section__action" plain size="small" @click="handleRefresh">
          <i class="el-icon-refresh-right" style="font-size: 18px"></i>
        </el-button> -->
        <!-- @click="handleRefresh" -->
        <el-button
          size="small"
          type="primary"
          :disabled="refresh"
          class="filter-section__action"
          @click="updateData"
        >
          <i class="el-icon-refresh" :style="refresh ? 'animation: rotating 2s linear infinite' : '' "></i>
        </el-button>
      </Sticky>

      <el-row :gutter="20" class="card-row">
        <!-- 已支付金额 -->
        <el-col :xs="12" :sm="8" :md="5" class="box--top">
          <ChartCard
            v-loading="loading.cardInfo"
            title="已支付金额"
            answer="用户提交订单时的金额，订单销售额 = 商品销售金额 + 运费 +其他费用 - 折扣等优惠。统计已支付金额。"
            :data="summations.paymentInfo"
            :active="activeType === 'paymentInfo'"
            :decimals="2"
            :prefix="symbol"
            :options="paymentInfoOptions"
            @change="changeCard('paymentInfo')"
          />
        </el-col>
        <!-- 已售出 -->
        <el-col :xs="12" :sm="8" :md="5" class="box--top">
          <ChartCard
            v-loading="loading.cardInfo"
            title="已售出"
            answer="商品售出数量，统计已支付订单。"
            :data="summations.soldInfo"
            :active="activeType === 'soldInfo'"
            :options="soldInfoOptions"
            @change="changeCard('soldInfo')"
          />
        </el-col>
        <!-- 已支付订单数 -->
        <el-col :xs="12" :sm="8" :md="5" class="box--top">
          <ChartCard
            v-loading="loading.cardInfo"
            title="已支付订单数"
            :data="summations.paymentOrderInfo"
            :active="activeType === 'paymentOrderInfo'"
            :options="paymentOrderInfoOptions"
            @change="changeCard('paymentOrderInfo')"
          />
        </el-col>
        <!-- 客单价 -->
        <el-col :xs="12" :sm="8" :md="5" class="box--top">
          <ChartCard
            v-loading="loading.cardInfo"
            title="客单价"
            :prefix="symbol"
            :data="summations.unitPriceInfo"
            :decimals="2"
            answer="每个顾客平均购买商品的金额，客单价 = 订单销售额 / 买家数。统计已支付订单"
            :active="activeType === 'unitPriceInfo'"
            :options="unitPriceInfoOptions"
            @change="changeCard('unitPriceInfo')"
          />
        </el-col>
        <!-- 连单率 -->
        <el-col :xs="12" :sm="8" :md="4" class="box--top">
          <ChartCard
            v-loading="loading.cardInfo"
            title="连单率"
            suffix="%"
            :data="summations.saleContinuousOrder"
            :decimals="1"
            answer="连单率 = 当日单比销售两件以上(含两件)的单数/当日销售的单数"
            :active="activeType === 'saleContinuousOrder'"
            :options="continuousOptions"
            @change="changeCard('saleContinuousOrder')"
          />
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :sm="24" :md="14" class="box--top">
          <BiCard v-loading="loading.cardChart" style="height: 440px">
            <template #title>
              {{ currentCard.title }}
            </template>
            <!-- 动态表格 - 点击上面的4个卡片菜单按钮可以切换成对应的数据 -->
            <div v-loading="currentCard.loading">
              <LineChart style="height: 381px" :options="dynamicChartOptions" />
            </div>
          </BiCard>
        </el-col>

        <!-- 店铺销售数据列表 -->
        <el-col :sm="24" :md="10" class="box--top">
          <ShopSalesTable v-loading="loading.salesTable" :data="data" />
        </el-col>
      </el-row>

      <!-- 类目分析 -->
      <CategoryAnalysis v-loading="loading.categoryInfo" :data="categoryInfo" />

      <!-- SKU/SPU分析 -->
      <div class="box--top">
        <ProductAnalysis ref="productAnalysis" :params="filterOptions" />
      </div>
    </el-main>
  </el-container>
</template>
<script>
import RealTimePaidInfo from './components/RealTimePaidInfo'
import moment from 'moment'
import LineChart from './components/LineChart'
import ChartCard from './components/ChartCard'
import ProductAnalysis from './components/ProductAnalysis'
import CategoryAnalysis from './components/CategoryAnalysis'
import ShopSalesTable from './components/ShopSalesTable'
import BiCard from '@/components/BiCard'
// import Test from './components/Test'
import { mapGetters } from 'vuex'
import {
  fetchTimeZoneList,
  fetchShopList,
  fetchCategoryList,
  fetchBusinessList,
  fetchRealTimeSalesInfo,
  fetchRealTimeSalesChartInfo,
  fetchShopsSalesInfo,
  fetchBigAndSmallCategoryInfo
} from '@/api/dashboard'
import dimensionFormat from './components/mixins/dimensionFormat'
import { debounce } from '@/utils'
import { toThousandFilter } from '@/filters'
import Sticky from '@/components/Sticky'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import 'vue2-datepicker/locale/zh-cn'

const numFormat = (value) => {
  if (isNaN(value)) { return 0 }
  if (value < 100) { return Number(Number(value).toFixed(2)) }
  return Number(Number(value).toFixed(0))
  // return Number(Number(value).toFixed(2))
}

const granularityOptions = [
  { value: 'hour', label: '按小时查看' },
  { value: 'day', label: '按天查看' },
  { value: 'week', label: '按周查看' },
  { value: 'month', label: '按月查看' },
  { value: 'quarter', label: '按季度查看' }
]

// 快速选择日期列表
const ranges = [
  { label: '今天', dates: [moment(), moment()] },
  { label: '昨天', dates: [moment().subtract(1, 'days'), moment().subtract(1, 'days')] },
  { label: '前天', dates: [moment().subtract(2, 'days'), moment().subtract(2, 'days')] },
  { label: '近7天', dates: [moment().subtract(6, 'd'), moment()] },
  { label: '近14天', dates: [moment().subtract(13, 'days'), moment()] },
  { label: '近30天', dates: [moment().subtract(29, 'days'), moment()] },
  { label: '近60天', dates: [moment().subtract(59, 'days'), moment()] },
  { label: '近90天', dates: [moment().subtract(89, 'days'), moment()] },
  { label: '本周', dates: [moment().startOf('week'), moment().endOf('week')] },
  { label: '本月', dates: [moment().startOf('month'), moment().endOf('month')] },
  { label: '本季度', dates: [moment().startOf('quarter'), moment().endOf('quarter')] },
  { label: '本年', dates: [moment().startOf('year'), moment().endOf('year')] }
]

export default {
  name: 'Dashboard',
  components: {
    RealTimePaidInfo,
    LineChart,
    ChartCard,
    ProductAnalysis,
    CategoryAnalysis,
    ShopSalesTable,
    BiCard,
    Sticky,
    DatePicker
  },
  filters: {
    getZoneText (value) {
      value = parseInt(value)
      const prefix = value < 0 ? '快' : '慢'
      return `${prefix}${Math.abs(value)}小时`
    }
  },
  mixins: [dimensionFormat],
  data () {
    return {
      timeZoneList: [],
      timezone: 'cn',
      sourceType: 'erp',
      businessId: '',
      tabs: [
        { id: '', name: '所有业务线' }
      ],
      openDatePicker: false,
      ranges,
      firstLevelList: [], // 一级分类列表
      pageLoading: true,
      loading: {
        cardInfo: true,
        cardChart: true,
        salesTable: true,
        categoryInfo: true
      },
      showPopover: false,
      checkAll: false,
      indeterminate: false,
      checkedList: [],
      searchVal: '',
      checkboxList: [],
      shopList: [],
      selectCids: '',
      dates: [],
      summations: { // 小卡片统计信息
        paymentInfo: {}, // 已支付金额信息
        soldInfo: {}, // 已售出数量信息
        paymentOrderInfo: {}, // 已支付订单数量信息
        unitPriceInfo: {}, // 客单价信息
        saleContinuousOrder: {} // 连单率信息
      },
      cardChartsData: { // 小卡片对应的图表数据
        paymentInfo: [], // 已支付金额信息
        soldInfo: [], // 已售出数量信息
        paymentOrderInfo: [], // 已支付订单数量信息
        unitPriceInfo: [],
        saleContinuousOrder: [] // 连单率信息
      },
      dynamicData: [],
      data: [],
      activeType: 'paymentInfo',
      currentCard: {
        title: '已支付金额',
        loading: false
      },
      currentTime: '',
      granularityOptions: [granularityOptions[0]],
      categoryInfo: {}, // 大小类数据
      shopIds: '',
      compareDates: []
    }
  },
  computed: {
    ...mapGetters([
      'symbol',
      'device'
    ]),
    refresh () {
      return Object.values(this.loading).every(v => v === true)
    },
    datesStr () { // 日期段显示字符串
      // 起止日期一样只显示一个
      if (this.dates.length === 0) { return '' }
      if (this.dates[0] === this.dates[1]) { return this.dates[0] }

      return this.dates.join(' / ')
    },
    checkedStr () {
      const list = this.checkedList
      return list.length === 0 || list.length === this.shopList.length
        ? '所有店铺' : list.length === 1
          ? this.shopList.filter(v => v.id === list[0])[0].name : `${list.length}个店铺`
    },
    filterOptions () { // 筛选条件
      const obj = {
        timezone: this.timezone,
        startDate: moment(this.dates[0]).format('Y-M-D'), // 开始日期
        endDate: moment(this.dates[1]).format('Y-M-D') // 结束日期
      }
      const bid = Number(this.businessId)
      if (bid) {
        obj.businessIds = bid + '' // 业务线id，多个用英文逗号隔开
      }
      if (this.shopIds) {
        obj.shopIds = this.shopIds // 店铺id，多个用英文逗号隔开
      }
      if (this.selectCids) {
        obj.cids = this.selectCids
      }
      if (bid === 1 || bid === 2) { // amazon和ebay业务线可以切换数据源类型（erp/平台）
        obj.sourceType = this.sourceType
      } else {
        obj.sourceType = 'erp'
      }
      if (this.compareDates) { // 结束时间段
        obj.compareStartDate = this.compareDates[0]
        obj.compareEndDate = this.compareDates[1]
      }
      return obj
    },
    paymentInfoOptions () { // 已支付金额折线图配置
      const data = this.cardChartsData.paymentInfo || []
      return {
        xAxis: {
          data: data.map(v => v.name),
          axisLine: { lineStyle: { color: '#69c0ff' }}
        },
        series: [
          {
            color: '#40a9ff',
            areaStyle: { color: '#bae7ff' },
            data
          }
        ]
      }
    },
    soldInfoOptions () { // 已售出金额折线图配置
      const data = this.cardChartsData.soldInfo || []
      return {
        xAxis: {
          data: data.map(v => v.name),
          axisLine: { lineStyle: { color: '#95de64' }}
        },
        series: [
          {
            color: '#52c41a',
            areaStyle: { color: '#b7eb8f' },
            data
          }
        ]
      }
    },
    paymentOrderInfoOptions () { // 已支付订单折线图配置
      const data = this.cardChartsData.paymentOrderInfo || []
      return {
        xAxis: {
          data: data.map(v => v.name),
          axisLine: { lineStyle: { color: '#5cdbd3' }}
        },
        series: [
          {
            color: '#36cfc9',
            areaStyle: { color: '#87e8de' },
            data
          }
        ]
      }
    },
    unitPriceInfoOptions () { // 客单价折线图配置
      const data = this.cardChartsData.unitPriceInfo || []
      return {
        xAxis: {
          data: data.map(v => v.name),
          axisLine: { unitPriceInfo: { color: '#ffd666' }}
        },
        series: [
          {
            color: '#ffc53d',
            areaStyle: { color: '#ffe58f' },
            data
          }
        ]
      }
    },
    continuousOptions () { // 客单价折线图配置
      const data = this.cardChartsData.saleContinuousOrder || []
      return {
        xAxis: {
          data: data.map(v => v.name),
          axisLine: { saleContinuousOrder: { color: '#ffd666' }}
        },
        series: [
          {
            color: '#ffc53d',
            areaStyle: { color: '#ffe58f' },
            data
          }
        ]
      }
    },
    dynamicChartOptions () { // 动态图表配置
      const vm = this
      const title = this.currentCard.title
      const isMoney = title.match(/金额|价/ig)
      const showLabel = this.device === 'mobile' ? false : (vm.dynamicData.length <= 50)

      return {
        title,
        grid: {
          top: 30,
          bottom: 50,
          left: 0,
          right: 0,
          containLabel: true
        },
        tooltip: {
          formatter (params) {
            const rate = params[0].data.rate

            return `
              <div class="echart-custom-tooltip">
                <h3>
                  ${title}
                  <em class="rate" style="color: ${rate > 0 ? 'green' : 'red'}">${rate === 0 ? '' : (rate > 0 ? '↑' : '↓') + rate + '%'}</em>
                </h3>
                <p>
                  <i class="dot" style="background: ${params[0].color}"></i>
                  ${params[0].data.name} &nbsp; ${isMoney ? '¥' : ''}${toThousandFilter(params[0].value)}
                </p>
                <p>
                  <i class="dot" style="background: ${params[0].color}"></i>
                  ${params[1].data.name} &nbsp; ${isMoney ? '¥' : ''}${toThousandFilter(params[1].value)}
                </p>
              </div>
            `
          },
          backgroundColor: '#fff', // tooltip没有rich字段
          borderColor: '#ccc',
          borderWidth: 1
        },
        yAxis: {
          show: true,
          position: 'right',
          axisLine: {
            show: false
          },
          splitLine: {
            show: true
          }
        },
        xAxis: {
          boundaryGap: true,
          axisTick: {
            show: true,
            inside: true,
            lineStyle: {
              color: '#EFEFEF'
            }
          },
          data: vm.dynamicData.map(v => v.xAxis)
        },
        series: [
          {
            name: 'line1',
            type: 'line',
            areaStyle: null,
            // symbol: 'pin',
            smooth: false,
            animationDuration: 1500,
            label: {
              normal: {
                show: showLabel,
                position: 'top',
                color: '#555',
                formatter (params) {
                  return toThousandFilter(numFormat(params.value))
                }
              }
            },
            data: vm.dynamicData.map(v => ({ name: v.name, value: v.value, rate: v.rate }))
          },
          {
            color: '#91d5ff',
            name: 'line2',
            type: 'line',
            // symbol: 'pin',
            smooth: false,
            areaStyle: null,
            animationDuration: 1500,
            lineStyle: {
              type: 'dashed'
            },
            data: vm.dynamicData.map(v => ({ name: v.compareName, value: v.compareValue }))
          }
        ]
      }
    }
  },
  watch: {
    // filterOptions: {
    //   deep: true,
    //   handler (newV) {
    //     this.updateData()
    //   }
    // }
  },
  mounted () {
    fetchTimeZoneList().then(data => (this.timeZoneList = data))
    // this.dates = [moment().toDate(), moment().toDate()]
    // 设置当前时间和对比时间
    this.dates = [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
    this.compareDates = [moment().subtract(1, 'days').format('YYYY-MM-DD'), moment().subtract(1, 'days').format('YYYY-MM-DD')]
    // 初始化顶部tab（平台列表）
    this.initTabs()
    // 初始化筛选条件
    this.initFilter()
    this.updateData()
  },
  methods: {
    moment,
    /**
     * @date 2020/11/12 14:36
     * @description 初始化顶部的tab，业务线列表
     */
    async initTabs () {
      try {
        let data = await fetchBusinessList() || []
        // 前端隐藏MoneyBall、ShimmerQueen、公共 业务线
        // 将Shopee放第三位
        data = data.filter(v => ![4, 5, 6].includes(v.id))
        const shopeeIndex = data.findIndex(v => v.id === 8)
        if (shopeeIndex) {
          const shopee = data.splice(shopeeIndex, 1)[0]
          data.splice(2, 0, shopee)
        }
        this.tabs = this.tabs.concat(data)
      } catch (err) {
        console.error(err)
      }
    },
    changeTab () {
      this.pageLoading = true
      this.$refs.realTimePaidInfo.start() // 更新实时已支付金额信息
      this.initFilter()
      this.updateData()
    },
    changeSource (type) {
      console.log(type)
      this.pageLoading = true
      this.sourceType = type
      this.$refs.realTimePaidInfo.start() // 更新实时已支付金额信息
    },
    initFilter () {
      // 初始化店铺id
      // 初始化分类筛选列表
      fetchCategoryList().then(data => (this.firstLevelList = data))
      fetchShopList(this.businessId).then(data => {
        // 初始化店铺筛选列表
        this.shopList = data
        this.checkboxList = data
      })
      // 初始化店铺选择
      this.checkedList = []
      this.shopIds = ''
    },
    onChange (checkedList) {
      const checkedCount = checkedList.length
      this.indeterminate = checkedCount > 0 && checkedCount < this.shopList.length
      this.checkAll = checkedCount === this.shopList.length
    },
    onCheckAllChange (val) {
      this.checkedList = val ? this.shopList.map(v => v.id) : []
      this.indeterminate = false
    },
    /**
     * @date 2020/11/28 11:33
     * @description 处理日期快捷键点击
     * @param { Object } item
     */
    quickDateClick (item) {
      this.dates = item.dates.map(v => v.toDate())
      this.openDatePicker = false
    },
    /**
     * @date 2020/11/23 17:46
     * @description 分析店铺
     */
    analysisShop (itemId) {
      if (!itemId) {
        if (this.checkedList.length === 0 || this.checkedList.length === this.shopList.length) {
          this.shopIds = ''
        } else {
          this.shopIds = this.checkedList.join(',')
        }
      } else {
        this.checkedList = [itemId]
        this.shopIds = itemId + ''
      }
      this.showPopover = false
      this.updateData()
    },
    /**
     * @date 2020/11/23 17:05
     * @description 搜索店铺
     */
    searchShop: debounce(function () {
      let val = this.searchVal || ''
      if (val.trim() === '') {
        this.checkboxList = this.shopList
        return
      }
      val = val.toLowerCase()
      this.checkboxList = this.shopList.filter(v => v.name.toLowerCase().match(val))
    }, 300, true),
    /**
     * @date 2020/11/24 15:04
     * @description 重置筛选条件
     */
    handleRefresh: debounce(function () {
      this.updateData()
    }, 500),
    /**
     * @date 2020/11/20 16:01
     * @description 更新筛选条件下覆盖的所有内容
     */
    updateData () {
      Object.keys(this.loading).forEach(key => {
        this.loading[key] = true
      })
      this.changeDimensionList()
      this.fetchShopsSalesInfo()
      this.fetchBigAndSmallCategoryInfo()
      this.updateCardData()
      this.$refs.productAnalysis.fetchList()
    },
    /**
     * @date 2020/11/18 15:20
     * @description 更新小卡片数据
     */
    updateCardData () {
      // 卡片数据
      fetchRealTimeSalesInfo(this.filterOptions).then(data => {
        // 已支付金额
        this.summations.paymentInfo = {
          ...data.paymentInfo,
          total: data.paymentInfo.paymentAmount
        }
        // 已售出数量
        this.summations.soldInfo = {
          ...data.paymentOrderSkuInfo,
          total: data.paymentOrderSkuInfo.count
        }
        // 已支付订单数量
        this.summations.paymentOrderInfo = {
          ...data.paymentOrderInfo,
          total: data.paymentOrderInfo.count
        }
        // 客单价
        this.summations.unitPriceInfo = {
          ...data.paymentUnitPriceInfo,
          total: data.paymentUnitPriceInfo.unitPrice
        }
        // 连单率
        this.summations.saleContinuousOrder = {
          ...data.saleContinuousOrder,
          total: parseFloat(data.saleContinuousOrder.value)
        }

        this.loading.cardInfo = false
      })

      // 卡片图表数据
      fetchRealTimeSalesChartInfo(this.filterOptions)
        .then(data => {
          // console.log('图表数据', data)
          Object.keys(this.cardChartsData).forEach(key => {
            this.cardChartsData[key] = this.formatDate(data[key].values, this.dimension)
          })
          // console.log('小卡片图表数据: ', this.cardChartsData)
          // 更新图表数据
          this.updateDynamicChartData(this.activeType, this.cardChartsData[this.activeType])
          this.loading.cardChart = false
        })
    },
    /**
     * @date 2020/11/19 16:49
     * @description 获取店铺销售列表数据
     */
    async fetchShopsSalesInfo () {
      try {
        this.data = await fetchShopsSalesInfo(this.filterOptions)
      } catch (err) {
        console.error(err)
      } finally {
        this.loading.salesTable = false
      }
    },
    /**
     * @date 2020/11/20 11:32
     * @description 获取大小类销售数据
     */
    async fetchBigAndSmallCategoryInfo () {
      try {
        this.categoryInfo = await fetchBigAndSmallCategoryInfo(this.filterOptions) || {}
      } catch (err) {
        console.error(err)
      } finally {
        this.loading.categoryInfo = false
      }
    },
    handleChange (value) {
      console.log(value)
    },
    changeTime (value) {
      this.currentTime = value
    },
    /**
     * @date 2020/11/09 14:02
     * @description 切换小卡片
     * @param { Number } type
     */
    changeCard (type) {
      if (this.activeType === type) { return }
      this.activeType = type
      let title = ''
      switch (type) {
        case 'paymentInfo':
          title = '已支付金额'
          break
        case 'soldInfo':
          title = '已售出'
          break
        case 'paymentOrderInfo':
          title = '已支付订单数'
          break
        case 'unitPriceInfo':
          title = '客单价'
          break
        case 'saleContinuousOrder':
          title = '连单率'
          break
      }
      this.currentCard.title = title
      this.updateDynamicChartData(type, this.cardChartsData[type])
    },
    /**
     * @date 2020/11/09 14:09
     * @description 更新动态图表数据
     * @param { String } type
     * @param { Array } data
     */
    async updateDynamicChartData (type, data) {
      // 有缓存取缓存
      // console.log(type, data)
      this.dynamicData = data
    },
    /**
     * @date 2020/11/18 16:36
     * @description 更改日期段
     * @param { Array } dates
     * 步骤：
     * ① 先更改可选粒度列表，拿到默认粒度
     * ② 更新数据
     */
    changeDateRanges (dates) {
      // console.log('dates', dates)
      // this.changeDimensionList()
      // this.fetchShopsSalesInfo()
      // this.fetchBigAndSmallCategoryInfo()
      // this.updateCardData()
    },
    /**
     * @date 2020/11/19 14:49
     * @description 根据所选时间段，动态更改可选粒度列表
     */
    changeDimensionList () {
      // 可选粒度
      // ① 一天只能是按小时
      // ② 大于一天且小于7天只能按天
      // ③ 大于7天且小于30天的可以按天和按周
      // ④ 大于30天且小于90天的可以按天/周/月
      // ⑤ 大于90天的可以按天/周/月/季
      // 获取两个时间点的间隔天数
      const dates = this.dates
      const days = moment(dates[1]).diff(moment(dates[0]), 'days') + 1
      let index = 0
      if (days <= 1) {
        index = 0
      } else if (days <= 7) {
        index = 1
      } else if (days <= 30) {
        index = 2
      } else if (days <= 90) {
        index = 3
      } else {
        index = 4
      }
      this.granularityOptions = granularityOptions.filter((v, i) => {
        if (index === 0) {
          return i === 0
        } else {
          return i !== 0 && i <= index
        }
      })
      this.dimension = index === 0 ? 'hour' : 'day'
    },
    /**
     * @date 2020/11/18 17:40
     * @description 更改维度
     * @param { String } dimension
     */
    changeDimension (dimension) {
      this.openDatePicker = false
      this.$refs.currentDate.openDatePicker = false
      this.updateCardData()
    }
  }
}
</script>
<style lang="scss">
.card-row {
  .el-col {
    @media only screen and (min-width: 992px) {
      width: 20%;
    }
  }
}
.header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  background-color: $bg-main !important;
  height: 45px;
  line-height: 45px;
  padding: 0 $main-space !important;

  /deep/ .ant-tabs-nav .ant-tabs-tab {
    padding-left: 0;
    padding-right: 0;
  }
}

.filter-section {
  display: flex;
  flex-wrap: wrap;

  &__shop, &__category, &__date, &__action {
    margin-top: $main-space !important;
    margin-right: 10px !important;
  }

  &.is-sticky {
    margin-top: 0;
    padding-left: 10px;
    background-color: rgba(241, 242, 245, .7);// rgba(255, 255, 255, .9);
    box-shadow: $shadow-base;
    z-index: 10;

    .filter-section__shop,
    .filter-section__category,
    .filter-section__date,
    .filter-section__action {
      margin-top: 5px !important;
      margin-right: 10px !important;
    }
  }

  @media screen and (max-width: 768px) {
    .filter-section {
      &__shop, &__category, &__date, &__action {
        margin-top: 5px !important;
        margin-right: 10px !important;
      }
    }
  }

  .el-button {
    height: 34px;
    line-height: 34px;
    padding-top: 0;
    padding-bottom: 0;
    padding: 0 10px;
    // 取消el-button自带transiton all带来的margin动画问题
    transition-property: border, color, background-color;
  }
  .el-button, .el-select {
    font-size: 14px;
  }
  .el-input__inner {
    line-height: 34px !important;
    height: 34px !important;
    font-weight: 500;
  }
}

// 日期选择快捷键
.quick-date-footer {
  text-align: left;
  max-width: 248px + 248px - 16px;
  box-sizing: border-box;

  .quick-date-list {
    .yt-tag {
      width: 70px;
    }
  }
  .quick-date-dimension {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5px;

    .el-select {
      width: 115px;
    }
    .el-input__inner {
      border-radius: 0;
      font-size: 12px;
      padding-left: 10px;
    }
  }
}

</style>

<style lang="scss">
.action-button {
  display: inline-flex;
  width: 140px;
  // padding-left: 10px;
  align-items: center;

  span {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    font {
      max-width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

.wrapper {
  width: 300px;
  height: 350px;
  border: 1px solid #e8e8e8;
  box-shadow: 0 2px 8px rgba(0,0,0,.15);
  display: flex;
  flex-direction: column;

  .footer {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    align-items: center;
  }
}
.check-list {
  flex: 1;
  // height: 200px;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 0 10px;

  .check-item {
    display: flex;
    padding: 7px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f7f7f7;
  }
}
.mx-calendar {
  @media screen and (max-width: 768px) {
    width: 100%;
  }
}
.mx-input {
  border-color: #DCDFE6;
  outline: none;
}
</style>

<style lang="scss" scoped>
/deep/ .header{
  position: relative;
  @media screen and (max-width: 768px) {
    padding: 0 !important;
  }
}
.timezone {
  position: absolute;
  right: 20px;
  top: 0;
  z-index: 20;

  @media screen and (max-width: 768px) {
    position: inherit;
    margin-bottom: $main-space;
  }

  >>> .el-input {
    width: auto;
  }
  >>> .el-input__inner {
    width: 160px;
    // background: none;
    // padding: 0;
    // width: auto;
    // border: none;
    font-size: 12px;
  }
}

>>>.el-table__row {
  .el-image-viewer__wrapper {
    top: 45px;
  }
  .el-image-viewer__close {
    top: 80px;
    color: #fff;
  }
  .el-image-viewer__canvas {
    padding-top: 54px;
  }
}
</style>
