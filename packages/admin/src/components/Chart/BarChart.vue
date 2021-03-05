<template>
  <div :class="className" :style="{ height ,width }" />
</template>

<script>
import resize from '@/mixins/chart-resize'

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
      handler () {
        this.setOptions()
      }
    },
    '$store.state.settings.theme' () {
      this.setOptions()
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
      const color = getComputedStyle(document.documentElement).getPropertyValue('--color-primary') || '#409eff'

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: 20,
          right: 20,
          bottom: 0,
          top: 10,
          containLabel: true,
          borderColor: '#ffffff'
        },
        xAxis: [{
          type: 'category',
          data: this.options.xAxisData || [],
          // 坐标轴刻度
          axisTick: {
            show: false
          },
          // 坐标轴线条样式
          axisLine: {
            lineStyle: {
              color: '#DBDBDB'
            }
          },
          // 坐标轴文本颜色
          axisLabel: {
            color: '#AEAEAE'
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: true
          },
          axisLine: {
            lineStyle: {
              color: 'transparent'
            }
          },
          axisLabel: {
            color: '#AEAEAE'
          },
          // 分隔线
          splitLine: {
            lineStyle: {
              color: '#DBDBDB',
              type: 'dashed'
            }
          }
        }],
        series: [{
          type: 'bar',
          barWidth: '60%',
          data: this.options.data || [],
          animationDuration: 3000
          // itemStyle: {
          //   color
          // }
        }]
      })
    }
  }
}
</script>
