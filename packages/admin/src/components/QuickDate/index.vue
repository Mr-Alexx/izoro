<template>
  <el-radio-group v-model="dates" size="small" @change="$emit('change', dates)">
    <el-radio-button v-for="(item, i) in list" :key="i" :label="item.dates">{{ item.label }}</el-radio-button>
  </el-radio-group>
</template>

<script>
import moment from 'moment'
const quickDates = [
  { label: '近3天', dates: [moment().subtract(2, 'd').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')] },
  { label: '近7天', dates: [moment().subtract(6, 'd').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')] },
  { label: '近30天', dates: [moment().subtract(29, 'days').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')] },
  { label: '近90天', dates: [moment().subtract(89, 'days').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')] }
]
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [Array, String, Date],
      default: ''
    }
  },
  data () {
    return {
      list: quickDates,
      dates: this.value
    }
  },
  watch: {
    value (newV) {
      this.dates = newV
    }
  },
  created () {
    this.dates = quickDates[0].dates
    this.$emit('change', this.dates)
  }
}
</script>

<style lang="scss" scoped>

</style>
