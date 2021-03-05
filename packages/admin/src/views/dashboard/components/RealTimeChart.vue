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
      // 解析theme css变量
      // const color = getComputedStyle(document.documentElement).getPropertyValue('--color-primary') || '#409eff'
      let series = this.options.series || []
      series = series.map((v, i) => {
        return {
          name: 'line' + i,
          type: 'line',
          smooth: true,
          symbol: 'none',
          areaStyle: {
            color: i === 0 ? '#F2F5FD' : '#F8F7FD'
          },
          ...v
        }
      })
      this.chart.setOption({
        color: ['#40a9ff', '#EAE9EF'],
        legend: {
          show: true,
          // right: 'left',
          top: 0,
          icon: 'path://M 12.5 0 C 8.6733 0 5.5 3.1733 5.5 7 C 5.5 10.8267 8.6733 14 12.5 14 C 16.3267 14 19.5 10.8267 19.5 7 C 19.5 3.1733 16.3267 0 12.5 0 Z M 12.5 12.6 C 9.42 12.6 6.9 10.08 6.9 7 C 6.9 3.92 9.42 1.4 12.5 1.4 C 15.58 1.4 18.1 3.92 18.1 7 C 18.1 10.08 15.58 12.6 12.5 12.6 Z M 12.5 3.2667 C 14.5533 3.2667 16.2333 4.9467 16.2333 7 C 16.2333 9.0533 14.5533 10.7333 12.5 10.7333 C 10.4467 10.7333 8.7667 9.0533 8.7667 7 C 8.7667 4.9467 10.4467 3.2667 12.5 3.2667 Z',
          orient: 'horizontal' // 垂直排列 vertical
        },
        grid: {
          top: 20,
          bottom: 0,
          right: 0,
          left: -35,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          position: function (point, params, dom, rect, size) {
            return [point[0], '100%']
          },
          axisPointer: {
            animation: false
          },
          formatter (params) {
            const len = params.length
            const current = len > 1 ? params[0] : {}
            const last = len > 1 ? params[1] : params[0]

            const html = `
              <div class="echart-custom-tooltip">
                <h3>${last.axisValueLabel}</h3>
                <p>
                  ${series[0].name}: ¥${current.value || 0}<br/>
                  ${series[1].name}: ¥${last.value || 0}
                </p>
                <h3>累计到${last.axisValueLabel}</h3>
                <p>
                  ${series[0].name}: ¥${current.data.upToTotal}<br/>
                  ${series[1].name}: ¥${last.data.upToTotal}
                </p>
              </div>
            `
            return html
          },
          backgroundColor: '#fff', // tooltip没有rich字段
          borderColor: '#ccc',
          borderWidth: 1
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            splitLine: {
              show: false
            },
            data: (function () {
              const arr = []
              for (let i = 0; i < 24; i++) {
                arr.push(i + '点')
              }
              return arr
            })(),
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
            }
          }
        ],
        series
      })
    }
  }
}
</script>
