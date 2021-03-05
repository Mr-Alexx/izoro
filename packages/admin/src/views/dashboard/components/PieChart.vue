<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { money } from '@/filters'
import { mapGetters } from 'vuex'

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
      default: '300px'
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      chart: null
    }
  },
  computed: {
    ...mapGetters([
      'symbol'
    ])
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
      this.chart = echarts.init(this.$el, 'macarons')
      const vm = this

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          top: 0,
          data: this.data.map(v => v.name)
        },
        series: [
          {
            name: '站点分析',
            type: 'pie',
            // roseType: 'radius',
            // radius: [15, 95],
            center: ['50%', '55%'],
            data: this.data,
            animationEasing: 'cubicInOut',
            animationDuration: 1500,
            label: {
              formatter (params) {
                return [`${params.data.name}`, `${vm.symbol}${money(params.data.value)} (${params.percent}%)`].join('\n')
              }
            }
          }
        ]
      })
    }
  }
}
</script>
