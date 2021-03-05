// import parseTime, formatTime and set to filter
export { parseTime, formatTime } from '@/utils'

/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo (time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter (num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter (num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * 10000 => "1万"
 * 12300 => "1.23万"
 * @param {number} num
 */
export function toTenThousand (num) {
  if (isNaN(+num)) { return '-' }

  return num < 10000 ? num : (Number((num / 10000).toFixed(2)) + '万')
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * @date 2020/04/22 09:40
 * @author 潜
 * @description 对于钱的处理
 * @param { String|Number } value
 * @param { Number } decimal 最多保留的小数位数
 * @tips toFixed是数值型拥有的方法，所以要对value进行数值化
 * @return { Number }
 */
export function money (value, decimal = 2) {
  if (isNaN(value)) { return 0 }

  value = Number(value)
  return Number(value.toFixed(decimal))
}

/**
 * @date 2020/09/04 10:24
 * @auther 潜
 * @description 数值过滤器
 * @param { Any } value
 * @return { Number }
 */
export function num (value) {
  if (isNaN(value)) { return 0 }

  return Number(value)
}

/**
 * @date 2020/09/04 11:20
 * @auther 潜
 * @description 增长率
 * @param { Any } value1
 * @param { Any } value2
 * @return { Number }
 */
export function rate (value1, value2) {
  if (isNaN(value1) || isNaN(value2) || value2 <= 0) {
    return 0
  }

  return Math.abs(((value1 - value2) / value2 * 100).toFixed(2))
}

/**
 * @date 2020/06/08 16:53
 * @description 时间戳格式化为时间
 * @param { String } time
 * @param { String } cFormat 格式化设置
 * @return { String | null }
 */
export const time = (time, cFormat) => {
  /* eslint-disable-next-line */
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}
