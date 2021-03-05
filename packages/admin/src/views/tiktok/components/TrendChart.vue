<template>
  <el-card class="base-box--top has-tools">
    <template slot="header">
      <span>{{ title }}</span>

      <el-radio-group v-model="type" size="small">
        <el-radio-button :label="1">增量</el-radio-button>
        <el-radio-button :label="2">总量</el-radio-button>
      </el-radio-group>
    </template>
    <div>
      <LineChart :options="options" style="height: 300px" />
    </div>
  </el-card>
</template>

<script>
import LineChart from '@/components/Chart/LineChart'
export default {
  components: { LineChart },
  props: {
    title: {
      type: String,
      default: '粉丝趋势'
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      type: 1
    }
  },
  computed: {
    options () {
      const data = this.data.map(v => {
        return {
          name: v.name,
          value: v[this.type === 1 ? 'incremental' : 'total']
        }
      })
      const len = data.length
      return {
        tooltip: {
          formatter: '{b0}: {c0}'
        },
        grid: {
          top: 20,
          bottom: 20,
          left: 0,
          // right: 50,
          containLabel: true
        },
        xAxis: {
          data: data.map(v => v.name),
          axisLine: { lineStyle: { color: '#69c0ff' }},
          axisLabel: {
            // 实现左右对齐 https://segmentfault.com/q/1010000019739603
            formatter (value, index) {
              return index === len - 1 ? (value + '                  ') : value
            }
          }
        },
        yAxis: {
          show: true,
          position: 'left',
          axisLine: {
            show: false
          },
          splitLine: {
            show: true
          }
        },
        series: [
          {
            name: name,
            color: '#40a9ff',
            areaStyle: { color: '#bae7ff' },
            data
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
