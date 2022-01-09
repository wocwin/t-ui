
import GlobalConstant from './constants.js' // 静态字典

/**
 * 如果时间是复数，则显示复数标签
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
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
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
 * 数字金额格式过滤 10000 => "￥10,000.00"
 * @param {number} num 被转换数字
 * @param {number} n 保留小数位
 */
export function currencyFilter (num, n) {
  // const reg = /((^[1-9]\d*)|^0)(\.\d+)?$/
  // console.log(111, reg.test(num))
  // if (!reg.test(num)) {
  //   return ''
  // } else {
  n = n > 0 && n <= 20 ? n : 2
  if (num || num === 0) {
    num = parseFloat((num + '').replace(/^\d\.-/g, '')).toFixed(n) + ''
    let l = ''
    let r = ''
    let y = false
    if (num.indexOf('-') !== -1) {
      l = num.split('-')[1].split('.')[0].split('').reverse()
      r = num.split('-')[1].split('.')[1]
      if (num.split('-')[0] === '') {
        y = true
      }
    } else {
      l = num.split('.')[0].split('').reverse()
      r = num.split('.')[1]
    }
    let t = ''
    for (let i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
    }
    return num ? (y ? ('￥ -' + t.split('').reverse().join('') + '.' + r) : ('￥ ' + t.split('').reverse().join('') + '.' + r)) : ''
  } else {
    return ''
  }
  // }
}

/**
 * 数字金额格式过滤(转汉字大写) 12000.34 => "壹万贰千叁角肆分"
 * @param {number} num 被转换数字
 */
export function digitUppercase (num) {
  const reg = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/
  if (!reg.test(num)) {
    return '请输入正确的金额格式'
  } else {
    const fraction = ['角', '分']
    const digit = [
      '零', '壹', '贰', '叁', '肆',
      '伍', '陆', '柒', '捌', '玖'
    ]
    const unit = [
      ['元', '万', '亿', '兆'],
      ['', '拾', '佰', '仟']
    ]
    const head = num < 0 ? '欠' : ''
    num = Math.abs(num)
    let s = ''
    fraction.forEach((item, index) => {
      s += (digit[Math.floor(num * 10 * Math.pow(10, index)) % 10] + item).replace(/零./, '')
    })
    // for (let i = 0; i < fraction.length; i++) {
    //   s += (digit[Math.floor(num * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
    // }
    s = s || '整'
    num = Math.floor(num)
    for (let i = 0; i < unit[0].length && num > 0; i++) {
      let p = ''
      for (let j = 0; j < unit[1].length && num > 0; j++) {
        p = digit[num % 10] + unit[1][j] + p
        num = Math.floor(num / 10)
      }
      s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
    }
    return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整')
  }
}

/**
 * 百分号格式过滤 0.5 => "0.5%"
 * @param {number} num
 */
export function percentFilter (num) {
  const percentStr = num ? num.toString() + '%' : '0'
  return percentStr
}

/**
 * 大写首字符
 * @param {String} string
 */
export function uppercaseFirst (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * 日期格式过滤器 13位时间戳转日期+时间格式 YYYY-MM-DD HH:mm:ss
 * @param {String} time
 */
export function timeFormatFilter (time) {
  let date = new Date(time)
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let h = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  h = h < 10 ? ('0' + h) : h
  minute = minute < 10 ? ('0' + minute) : minute
  second = second < 10 ? ('0' + second) : second
  date = year + '-' + month + '-' + day + ' ' + h + ':' + minute + ':' + second
  return date
}

/**
 * 日期格式过滤器 13位时间戳转日期格式 YYYY-MM-DD
 * @param {String} time
 */
export function dateFormatFilter (time) {
  let date = new Date(time)
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  date = year + '-' + month + '-' + day
  return date
}

/**
 * 日期格式过滤器 YYYYMMDD 戳转日期格式 YYYY-MM-DD
 * @param {String} dateStr
 */
export function dateStrFormat (dateStr) {
  if (dateStr !== undefined && dateStr !== null && dateStr !== '') {
    return dateStr.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3')
  } else {
    return ''
  }
}

/**
 * 列表常量value key过滤器(字典)
 * @param {String} status
 * @param {String} constantName
 */
export function constantKey2Value (status, constantName) {
  const statusMap = GlobalConstant[constantName]
  return statusMap[status] || ''
}

/**
 * 显示上传文件名过滤器
 * @param {String} cellValue
 */
export function formatFileName (cellValue) {
  if (cellValue && cellValue.length > 9) {
    const index = cellValue.lastIndexOf('/')
    const formatName = cellValue.substring(index + 1, cellValue.length)
    return formatName
  } else {
    return cellValue
  }
}
