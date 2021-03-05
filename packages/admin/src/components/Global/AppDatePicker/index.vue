<template>
  <DatePicker
    v-model="dates"
    :open.sync="openDatePicker"
    class="app-datepicker"
    :class="[
      `app-datepicker--${options.size || 'small'}`,
    ]"
    :popup-class="{ 'app-datepicker--range': options.range }"
    v-bind="Object.assign({
      valueType: 'YYYY-MM-DD',
      clearable: true,
      editable: true,
      placeholder: options.range ? '开始时间 - 结束时间' : '请选择时间'
    }, options)"
    @change="handleChange"
  >
    <i slot="icon-calendar" class="el-icon-date"></i>
    <div slot="footer" class="app-datepicker__footer">
      <div class="quick-date-list">
        <AppTag v-for="(item, i) in (options.range ? ranges : quickDateList)" :key="i" @click.native.stop="quickDateClick(item)">{{ item.label }}</AppTag>
      </div>
      <slot name="footer"></slot>
    </div>
  </DatePicker>
</template>

<script>
// https://www.npmjs.com/package/vue2-datepicker
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import 'vue2-datepicker/locale/zh-cn'
import moment from 'moment'
// 快速选择日期列表
const ranges = [
  { label: '今天', dates: [moment(), moment()] },
  { label: '昨天', dates: [moment().subtract(1, 'days'), moment().subtract(1, 'days')] },
  { label: '前天', dates: [moment().subtract(2, 'days'), moment().subtract(2, 'days')] },
  { label: '近3天', dates: [moment().subtract(2, 'd'), moment()] },
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
// 对比快速选择日期列表
const compareRanges = [
  { label: '昨天', dates: [moment().subtract(1, 'days'), moment().subtract(1, 'days')] },
  { label: '前天', dates: [moment().subtract(2, 'days'), moment().subtract(2, 'days')] },
  { label: '大前天', dates: [moment().subtract(3, 'days'), moment().subtract(3, 'days')] },
  { label: '上3天', dates: [moment().subtract(5, 'd'), moment().subtract(3, 'd')] },
  { label: '上7天', dates: [moment().subtract(13, 'd'), moment().subtract(7, 'd')] },
  { label: '上14天', dates: [moment().subtract(27, 'days'), moment().subtract(14, 'days')] },
  { label: '上30天', dates: [moment().subtract(59, 'days'), moment().subtract(30, 'days')] },
  { label: '上60天', dates: [moment().subtract(119, 'days'), moment().subtract(60, 'days')] },
  { label: '上90天', dates: [moment().subtract(179, 'days'), moment().subtract(90, 'days')] },
  { label: '上周', dates: [moment().week(moment().week() - 1).startOf('week'), moment().week(moment().week() - 1).endOf('week')] },
  { label: '上月', dates: [moment().month(moment().month() - 1).startOf('month'), moment().month(moment().month() - 1).endOf('month')] },
  { label: '上季度', dates: [moment().quarter(moment().quarter() - 1).startOf('quarter'), moment().quarter(moment().quarter() - 1).endOf('quarter')] },
  { label: '去年', dates: [moment().year(moment().year() - 1).startOf('year'), moment().year(moment().year() - 1).endOf('year')] }
]

const quickDateList = [
  { label: '今天', dates: moment() },
  { label: '昨天', dates: moment().subtract(1, 'days') },
  { label: '前天', dates: moment().subtract(2, 'days') }
]

export default {
  name: 'AppDatePicker',
  components: {
    DatePicker
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [Array, String, Date],
      default: ''
    },
    options: { // vue2-datepicker Props，参考文档https://www.npmjs.com/package/vue2-datepicker
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      openDatePicker: false,
      dates: this.value,
      quickDateList,
      momentFormat: {
        // [optional] Date to String
        stringify: (date) => {
          return date ? moment(date).format(this.options.format || 'YYYY-MM-DD') : ''
        },
        // [optional]  String to Date
        parse: (value) => {
          return value ? moment(value, this.options.format || 'YYYY-MM-DD').toDate() : null
        }
      }
    }
  },
  computed: {
    ranges () {
      return this.options.showCompare ? compareRanges : ranges
    }
  },
  watch: {
    value (newV) {
      this.dates = newV
    }
  },
  methods: {
    /**
     * @date 2021/01/26 11:35
     * @description 处理日期快捷键点击
     * @param { Object } item
     */
    quickDateClick (item) {
      this.dates = this.options.range ? item.dates.map(v => v.format(this.options.valueType || 'YYYY-MM-DD')) : item.dates.format(this.options.valueType || 'YYYY-MM-DD')
      this.openDatePicker = false
      this.handleChange(this.dates)
    },
    handleChange (value) {
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="scss">
.app-datepicker {
  width: 220px;

  .mx-input {
    border-color: #dcdfe6;
    box-shadow: none;

    &:hover {
      border-color: #c0c4cc
    }
    &:focus {
      border-color: $color-primary;
    }

    &::placeholder {
      color: #C1C5CD;
    }
  }

  .el-icon-date {
    color: #c0c4cc;
  }

  &--default {
    .mx-input {
      height: 40px;
    }
  }
  &--medium {
    .mx-input {
      height: 36px;
      font-size: 13px;
    }
    .el-icon-date {
      font-size: 15px;
    }
  }
  &--small {
    .mx-input {
      height: 32px;
      font-size: 13px;
    }
    .el-icon-date {
      font-size: 15px;
    }
  }
  &--mini {
    .mx-input {
      height: 28px;
      font-size: 12px;
    }
    .el-icon-date {
      font-size: 13px;
    }
  }

  // 时间段选择
  &--range {
    // 日期选择快捷键
    .app-datepicker__footer {
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
  }
}
.mx-datepicker-footer {
  padding-bottom: 16px;
}
.mx-calendar-content {
  .cell {
    &.active {
      background-color: $color-primary;
    }
  }
}
</style>
