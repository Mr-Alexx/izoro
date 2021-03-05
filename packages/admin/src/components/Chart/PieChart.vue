<template>
  <div :class="className" :style="{ height, width }" />
</template>

<script>
/**
 * @date 2020/09/15 15:39
 * @description 通用饼图
 * @property { Object } options 必填配置项，配置如下
 * { seriesName: '饼图名称', data: [ { value: 111, name: 'xx' } ] }
 */
import resize from '@/mixins/chart-resize'
// 饼图
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
    options: { // 配置选项，必填
      type: Object,
      required: true,
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
      const data = this.options.data || []
      const legends = data.map(v => v.name)

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 20,
          bottom: 50,
          itemWidth: 6,
          itemHeight: 6,
          borderRadius: 3,
          ...this.options.legend,
          data: legends
        },
        series: [
          {
            name: this.options.seriesName || '收入费项',
            type: 'pie',
            left: 20,
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
              ...this.options.label
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '14',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            ...this.options.series,
            data
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
