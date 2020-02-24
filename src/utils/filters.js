
import GlobalConstant from './constants.js' // 静态字典

/**
 * 数字金额格式过滤 10000 => "￥10,000.00"
 * @param {number} num 被转换数字
 * @param {number} n 保留小数位
 */
export function currencyFilter (num, n) {
  const reg = /((^[1-9]\d*)|^0)(\.\d+)?$/
  if (!reg.test(num)) {
    return ''
  } else {
    n = n > 0 && n <= 20 ? n : 2
    if (num || num === 0) {
      num = parseFloat((num + '').replace(/^\d\.-/g, '')).toFixed(n) + ''
      const l = num.split('.')[0].split('').reverse()
      const r = num.split('.')[1]
      let t = ''
      for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
      }
      return num ? ('￥ ' + t.split('').reverse().join('') + '.' + r) : ''
    } else {
      return ''
    }
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
 * 列表常量value key过滤器
 * @param {String} status
 * @param {String} constantName
 */
export function constantKey2Value (status, constantName) {
  const statusMap = GlobalConstant[constantName]
  return statusMap[status] || ''
}
