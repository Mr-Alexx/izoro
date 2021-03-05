<template>
  <div :class="className" :style="{ height, width }" />
</template>

<script>
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      chart: null
    }
  },
  watch: {
    options: {
      deep: true,
      handler (val) {
        this.setOptions(val)
      }
    },
    '$store.state.settings.theme' (newV) {
      this.setOptions(this.data)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart () {
      this.chart = this.$echarts.init(this.$el)
      this.setOptions()
    },
    setOptions () {
      if (!this.chart) { return }
      // 解析theme css变量
      // const color = getComputedStyle(document.documentElement).getPropertyValue('--color-primary') || '#409eff'
      let series = this.options.series || []
      series = series.map((v, i) => {
        return {
          color: '#40a9ff',
          smooth: true,
          name: this.title,
          type: 'line',
          symbol: 'emptyCircle',
          symbolSize: 2,
          // showSymbol: false, // 只在显示tooltips时显示
          areaStyle: {
            color: '#8EB6EB'
          },
          data: [],
          ...v
        }
      })

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false
          },
          formatter: '{b0}: <br/>¥{c0}',
          // formatter (params) {
          //   return `
          //     <div>
          //       <p>${params[0].axisValueLabel}: </p>
          //       <p>¥${params[0].value}</p>
          //     </div>
          //   `
          // },
          // backgroundColor: '#fff', // tooltip没有rich字段
          // borderColor: '#ccc',
          // borderWidth: 1,
          ...this.options.tooltip
        },
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 1,
          ...this.options.grid
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            splitLine: {
              show: false
            },
            data: [],
            ...this.options.xAxis
          }
        ],
        yAxis: [
          {
            show: false,
            type: 'value',
            // 分隔线
            splitLine: {
              show: false
            },
            ...this.options.yAxis
          }
        ],
        series
      })
    }
  }
}
</script>
