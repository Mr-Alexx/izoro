<template>
  <el-row :gutter="20">
    <!-- 类目分析 -->
    <el-col :sm="24" :md="14" class="category-wrapper box--top">
      <BiCard title="类目分析（小类：销量前10）">
        <BarChart style="height: 360px" :options="smallCateOptions" />
      </BiCard>
    </el-col>

    <el-col :sm="24" :md="10" class="box--top">
      <BiCard title="类目分析（大类）">
        <BarChart style="height: 360px" :options="bigCateOptions" />
      </BiCard>
    </el-col>
  </el-row>
</template>

<script>
import { toThousandFilter } from '@/filters'
import BarChart from './BarChart'
import BiCard from '@/components/BiCard'

const options = {
  grid: {
    left: 0,
    right: 100,
    top: 0,
    bottom: 0,
    containLabel: true
  },
  xAxis: {
    type: 'value',
    axisLine: {
      show: false
    },
    axisLabel: {
      show: false
    },
    axisTick: { // 刻度
      show: false
    },
    boundaryGap: true
  },
  yAxis: {
    type: 'category',
    axisLine: {
      show: false
    },
    splitLine: {
      show: false
    },
    axisLabel: {
      show: true,
      color: '#000'
    }
  }
}

export default {
  name: 'CategoryAnalysis',
  components: { BarChart, BiCard },
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    bigCateOptions () {
      const data = this.data.maxlevel || []
      return {
        ...options,
        yAxis: {
          ...options.yAxis,
          data: data.map(v => v.name)
        },
        series: [{
          label: {
            show: true,
            position: 'right',
            formatter (params) {
              return [
                `{a|¥${toThousandFilter(params.value)}}`,
                `{b|（${params.data.rate}%）}`
              ].join('')
            },
            rich: {
              a: {
                color: '#000'
              },
              b: {
                color: '#9B9B9B'
              }
            }
          },
          data
        }]
      }
    },
    smallCateOptions () {
      const data = this.data.minlevel || []
      return {
        ...options,
        yAxis: {
          ...options.yAxis,
          data: data.map(v => v.name)
        },
        series: [{
          label: {
            show: true,
            position: 'right',
            formatter (params) {
              return [
                `{a|¥${toThousandFilter(params.value)}}`,
                `{b|（${params.data.rate}%）}`
              ].join('')
            },
            rich: {
              a: {
                color: '#000'
              },
              b: {
                color: '#9B9B9B'
              }
            }
          },
          data
        }]
      }
    }
  },
  methods: {
    getOption (data) {
      const symbol = this.$store.state.symbol
      return {
        grid: {
          left: 0,
          top: 0,
          bottom: 0
        },
        xAxis: {
          type: 'value',
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisTick: { // 刻度
            show: false
          },
          boundaryGap: true
        },
        yAxis: {
          type: 'category',
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: true,
            color: '#000'
          },
          data: data.map(v => v.name)
        },
        series: [{
          label: {
            show: true,
            position: 'right',
            formatter (params) {
              // return `${vm.symbol}${numFormat(params.value)}（${numFormat(params.value / total * 100)}%）`
              return [
                `{a|${symbol}${toThousandFilter(params.value)}}`,
                `{b|（${params.rate}%）}`
              ].join('')
            },
            rich: {
              a: {
                color: '#000'
              },
              b: {
                color: '#9B9B9B'
              }
            }
          },
          data
        }]
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
