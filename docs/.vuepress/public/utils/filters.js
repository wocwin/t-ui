
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

/**
 * 日期格式过滤器 13位时间戳转日期格式 YYYY-MM-DD
 * @param {String} time
 */
export function dateFormatFilter (time) {
    let date = new Date(time)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    month = month < 10 ? '0' + month : month
    day = day < 10 ? '0' + day : day
    date = year + '-' + month + '-' + day
    return date
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
        let fraction = ['角', '分']
        let digit = [
            '零', '壹', '贰', '叁', '肆',
            '伍', '陆', '柒', '捌', '玖'
        ]
        let unit = [
            ['元', '万', '亿', '兆'],
            ['', '拾', '佰', '仟']
        ]
        let head = num < 0 ? '欠' : ''
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
