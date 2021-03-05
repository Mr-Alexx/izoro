import moment from 'moment'

const testData = [
  { name: '2020-08-30', value: 20.32, compareName: '', compareValue: 18.9 },
  { name: '2020-08-31', value: 20.32, compareName: '', compareValue: 18.9 }
]
for (let i = 1; i <= 30; i++) {
  testData.push({
    name: '2020-09-' + (i + '').padStart(2, '0'),
    value: Number((Math.random() * 100).toFixed(2)),
    compareName: '',
    compareValue: Number((Math.random() * 100).toFixed(2))
  })
}
for (let i = 1; i <= 31; i++) {
  testData.push({
    name: '2020-10-' + (i + '').padStart(2, '0'),
    value: Number((Math.random() * 100).toFixed(2)),
    compareName: '',
    compareValue: Number((Math.random() * 100).toFixed(2))
  })
}
testData.push({
  name: '2020-11-01',
  value: 18.93,
  compareName: '',
  compareValue: 13.09
})

// 日期段按周计算 参考：https://segmentfault.com/q/1010000021083713
function initItem (arr, index) {
  arr[index] = { name: `第${index + 1}周`, days: [] }
  return arr
}
function calWeek (startTime, endTime) {
  moment.locale('fr', {
    week: {
      dow: 1 // Monday is the first day of the week.
    }
  })

  const startDay = moment(startTime)
  const endDay = moment(endTime)

  let index = 0
  const temp = []
  initItem(temp, index)

  while (!startDay.isAfter(endDay)) {
    if (startDay.days() === 1 && temp[index].days.length) {
      index++
      initItem(temp, index)
    }

    temp[index].days.push(startDay.format('YYYY-MM-DD'))

    startDay.add(1, 'd')
  }

  return temp
}

// 统计数据一样，切割月/季/年方法不同
export default {
  data () {
    return {
      dimension: 'hour'
    }
  },
  // mounted () {
  //   this.formatDate(testData, this.dimension)
  // },
  methods: {
    /**
     * @date 2020/11/18 11:00
     * @description 将日期列表数据按维度划分返回
     * @param { Array } dateList 日期数据数组
     * @param { String } dimension 维度，取值：['hour', 'day', 'week', 'month', 'quarter', 'year']
     * @return { Array } [{ xAxis: x轴坐标标签, name: 当前日期段, value: 当前日期段对应数据, compareName: 对比日期段, compareValue: 对比日期段对应数据 }]
     */
    formatDate (dateList, dimension) {
      // console.log(dateList)
      dimension = dimension || 'day'
      let list = []
      switch (dimension) {
        case 'hour':
          list = dateList.map(v => ({ ...v, xAxis: v.name.substr(11) }))
          break
        case 'day':
          list = dateList.map(v => ({ ...v, xAxis: v.name }))
          break
        case 'week':
          list = this.formatByWeek(dateList)
          break
        case 'month':
          list = this.formatByMonth(dateList)
          break
        case 'quarter':
          list = this.formatByQuarter(dateList)
          break
        case 'year':
          list = this.formatByYear(dateList)
          break
      }
      // console.log(list)
      return list
    },
    /**
     * @date 2020/11/18 11:33
     * @description 日期段按周划分统计数据
     * @param { Array } dateList
     * @return { Array } [{ xAxis: x轴坐标标签, name: 当前日期段, value: 当前日期段对应数据, compareName: 对比日期段, compareValue: 对比日期段对应数据 }]
     */
    formatByWeek (dateList) {
      if (!Array.isArray(dateList) || dateList.length === 0) { return [] }
      console.log('===== 按周计算 =====')
      // console.log(calWeek('2019-11-18', '2020-01-01')) // 跨年的周计算
      // console.log(calWeek(dateList[0].name, dateList[dateList.length - 1].name))
      const list = []

      // 按周计算
      const weeks = calWeek(dateList[0].name, dateList[dateList.length - 1].name)
      let temp = []
      weeks.forEach(week => {
        // 按周划分的区段数据
        temp = dateList.filter(v => week.days.includes(v.name))
        list.push(this.formatData(temp))
      })
      temp = null
      return list
    },
    /**
     * @date 2020/11/18 11:31
     * @description 日期段按月划分统计数据
     * @param { Array } dateList
     * @return { Array } [{ xAxis: x轴坐标标签, name: 当前日期段, value: 当前日期段对应数据, compareName: 对比日期段, compareValue: 对比日期段对应数据 }]
     */
    formatByMonth (dateList) {
      if (!Array.isArray(dateList) || dateList.length === 0) { return [] }
      console.log('===== 按月计算 =====')
      const list = []

      // 保存所有月份，统计月份个数
      const keys = {}
      let key = ''
      dateList.forEach(item => {
        key = item.name.substr(0, 7)
        if (!keys[key]) {
          keys[key] = true
        }
      })

      let temp = []
      Object.keys(keys).forEach((key, i) => {
        // 按月划分的区段数组
        temp = dateList.filter(v => v.name.indexOf(key) !== -1)
        list.push(this.formatData(temp))
      })
      temp = null
      return list
    },
    /**
     * @date 2020/11/18 14:14
     * @description 日期段按季度划分统计数据
     * @param { Array } dateList
     * @return { Array } [{ xAxis: x轴坐标标签, name: 当前日期段, value: 当前日期段对应数据, compareName: 对比日期段, compareValue: 对比日期段对应数据 }]
     */
    formatByQuarter (dateList) {
      if (!Array.isArray(dateList) || dateList.length === 0) { return [] }
      console.log('===== 按季度计算 =====')
      const list = []

      // 找出区段的所有年份
      const years = {}
      let year = ''
      dateList.forEach(item => {
        year = item.name.substr(0, 4)
        if (!years[year]) {
          years[year] = true
        }
      })
      // 给年份添加季度
      let quarterList
      Object.keys(years).forEach(item => {
        quarterList = [
          { name: `${item} 第1季度`, months: [`${item}-01`, `${item}-02`, `${item}-03`] },
          { name: `${item} 第2季度`, months: [`${item}-04`, `${item}-05`, `${item}-06`] },
          { name: `${item} 第3季度`, months: [`${item}-07`, `${item}-08`, `${item}-09`] },
          { name: `${item} 第4季度`, months: [`${item}-10`, `${item}-11`, `${item}-12`] }
        ]
      })

      let temp = []
      quarterList.forEach((quarter, i) => {
        // 按月划分的区段数组
        temp = dateList.filter(v => quarter.months.includes(v.name.substr(0, 7)))
        // 过滤掉不再dateList的季度数据
        if (temp.length === 0) { return }
        list.push(this.formatData(temp))
      })
      temp = null
      return list
    },
    /**
     * @date 2020/11/18 11:34
     * @description 日期段按年划分统计数据
     * @param { Array } dateList
     * @return { Array } [{ xAxis: x轴坐标标签, name: 当前日期段, value: 当前日期段对应数据, compareName: 对比日期段, compareValue: 对比日期段对应数据 }]
     */
    formatByYear (dateList) {
      if (!Array.isArray(dateList) || dateList.length === 0) { return [] }
      const list = []

      // 保存所有月份，统计月份个数
      // // 找出区段的所有年份
      const years = {}
      let year = ''
      dateList.forEach(item => {
        year = item.name.substr(0, 4)
        if (!years[year]) {
          years[year] = true
        }
      })

      let temp = []
      Object.keys(years).forEach((year, i) => {
        // 按月划分的区段数组
        temp = dateList.filter(v => v.name.indexOf(year) !== -1)
        list.push(this.formatData(temp))
      })
      temp = null
      return list
    },
    /**
     * @date 2020/11/18 14:46
     * @description 格式化数据
     * @param { Array } list 区段数组
     * @return { Array }
     */
    formatData (list) {
      // 当前日期段数据
      const value = Number(list.map(v => Number(v.value || 0)).reduce((a, b) => a + b).toFixed(2))
      // 对比日期段数据
      const compareValue = Number(list.map(v => Number(v.compareValue || 0)).reduce((a, b) => a + b).toFixed(2))
      const xAxis = list.length === 1 ? list[0].name : `${list[0].name} ~ ${list[list.length - 1].name}`
      return {
        xAxis,
        name: xAxis, // 当前日期段
        compareName: `${list[0].compareName} ~ ${list[list.length - 1].compareName}`, // 对比日期段
        value,
        compareValue,
        rate: compareValue === 0 ? '--' : Number(((value - compareValue) / compareValue * 100).toFixed(2)) // 对比率
      }
    }
  }
}
