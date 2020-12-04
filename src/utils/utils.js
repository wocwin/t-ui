/**
 * Created by Win on 20/02/21.
 */
// 时间戳转化为年 月 日
export function getLocalTime(nS) {
  // 将时间戳（十三位时间搓，也就是带毫秒的时间搓）转换成时间格式
  // d.cTime = 1539083829787
  let date = new Date(nS)
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  // eslint-disable-next-line no-unused-vars
  let h = date.getHours()
  // eslint-disable-next-line no-unused-vars
  let minute = date.getMinutes()
  // eslint-disable-next-line no-unused-vars
  let second = date.getSeconds()
  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  h = h < 10 ? '0' + h : h
  minute = minute < 10 ? '0' + minute : minute
  second = second < 10 ? '0' + second : second
  date = year + '-' + month + '-' + day + ' ' + h + ':' + minute + ':' + second
  return date
}
// 获取当前时间，格式YYYY-MM-DD
export function getNowFormatDate() {
  var date = new Date()
  var seperator1 = '-'
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate
  return currentdate
}
/**
 * @desc 获取url参数
 * @param {String} name  想要获取的参数名字
 */
export function GetUrlVal(name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  const url = window.location.search.replace(/%26/g, '&')
  const url1 = url.replace(/%3D/g, '=')
  const r = url1.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

/**
 * 防抖
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * 检查元素是否有类
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}
/**
 * 向元素添加类
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * 从元素中删除类
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}
/**
 * 算法密码加密
 * @param {string} string
 * @return {string}
 */
export function Encryptor(string) {
  function md5RotateLeft(lValue, iShiftBits) {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits))
  }

  function md5AddUnsigned(lX, lY) {
    var lX4, lY4, lX8, lY8, lResult
    lX8 = lX & 2147483648
    lY8 = lY & 2147483648
    lX4 = lX & 1073741824
    lY4 = lY & 1073741824
    lResult = (lX & 1073741823) + (lY & 1073741823)
    if (lX4 & lY4) {
      return lResult ^ 2147483648 ^ lX8 ^ lY8
    }
    if (lX4 | lY4) {
      if (lResult & 1073741824) {
        return lResult ^ 3221225472 ^ lX8 ^ lY8
      } else {
        return lResult ^ 1073741824 ^ lX8 ^ lY8
      }
    } else {
      return lResult ^ lX8 ^ lY8
    }
  }

  function md5F(x, y, z) {
    return (x & y) | (~x & z)
  }

  function md5G(x, y, z) {
    return (x & z) | (y & ~z)
  }

  function md5H(x, y, z) {
    return x ^ y ^ z
  }

  function md5I(x, y, z) {
    return y ^ (x | ~z)
  }

  function md5FF(a, b, c, d, x, s, ac) {
    a = md5AddUnsigned(a, md5AddUnsigned(md5AddUnsigned(md5F(b, c, d), x), ac))
    return md5AddUnsigned(md5RotateLeft(a, s), b)
  }

  function md5GG(a, b, c, d, x, s, ac) {
    a = md5AddUnsigned(a, md5AddUnsigned(md5AddUnsigned(md5G(b, c, d), x), ac))
    return md5AddUnsigned(md5RotateLeft(a, s), b)
  }

  function md5HH(a, b, c, d, x, s, ac) {
    a = md5AddUnsigned(a, md5AddUnsigned(md5AddUnsigned(md5H(b, c, d), x), ac))
    return md5AddUnsigned(md5RotateLeft(a, s), b)
  }

  function md5II(a, b, c, d, x, s, ac) {
    a = md5AddUnsigned(a, md5AddUnsigned(md5AddUnsigned(md5I(b, c, d), x), ac))
    return md5AddUnsigned(md5RotateLeft(a, s), b)
  }

  function md5ConvertToWordArray(string) {
    var lWordCount
    var lMessageLength = string.length
    var lNumberOfWordsTemp1 = lMessageLength + 8
    var lNumberOfWordsTemp2 =
      (lNumberOfWordsTemp1 - (lNumberOfWordsTemp1 % 64)) / 64
    var lNumberOfWords = (lNumberOfWordsTemp2 + 1) * 16
    var lWordArray = Array(lNumberOfWords - 1)
    var lBytePosition = 0
    var lByteCount = 0
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - (lByteCount % 4)) / 4
      lBytePosition = (lByteCount % 4) * 8
      lWordArray[lWordCount] =
        lWordArray[lWordCount] |
        (string.charCodeAt(lByteCount) << lBytePosition)
      lByteCount++
    }
    lWordCount = (lByteCount - (lByteCount % 4)) / 4
    lBytePosition = (lByteCount % 4) * 8
    lWordArray[lWordCount] = lWordArray[lWordCount] | (128 << lBytePosition)
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29
    return lWordArray
  }

  function md5WordToHex(lValue) {
    var WordToHexValue = ''
    var WordToHexValueTemp = ''
    var lByte
    var lCount
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = (lValue >>> (lCount * 8)) & 255
      WordToHexValueTemp = '0' + lByte.toString(16)
      WordToHexValue =
        WordToHexValue +
        WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2)
    }
    return WordToHexValue
  }

  function md5Utf8Encode(string) {
    string = string.replace(/\r\n/g, '\n')
    var utfText = ''
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n)
      if (c < 128) {
        utfText += String.fromCharCode(c)
      } else {
        if (c > 127 && c < 2048) {
          utfText += String.fromCharCode((c >> 6) | 192)
          utfText += String.fromCharCode((c & 63) | 128)
        } else {
          utfText += String.fromCharCode((c >> 12) | 224)
          utfText += String.fromCharCode(((c >> 6) & 63) | 128)
          utfText += String.fromCharCode((c & 63) | 128)
        }
      }
    }
    return utfText
  }

  // eslint-disable-next-line no-array-constructor
  var x = Array()
  var k, AA, BB, CC, DD, a, b, c, d
  var S11 = 7
  var S12 = 12
  var S13 = 17
  var S14 = 22
  var S21 = 5
  var S22 = 9
  var S23 = 14
  var S24 = 20
  var S31 = 4
  var S32 = 11
  var S33 = 16
  var S34 = 23
  var S41 = 6
  var S42 = 10
  var S43 = 15
  var S44 = 21
  string = md5Utf8Encode(string)
  x = md5ConvertToWordArray(string)
  a = 1732584193
  b = 4023233417
  c = 2562383102
  d = 271733878
  for (k = 0; k < x.length; k += 16) {
    AA = a
    BB = b
    CC = c
    DD = d
    a = md5FF(a, b, c, d, x[k + 0], S11, 3614090360)
    d = md5FF(d, a, b, c, x[k + 1], S12, 3905402710)
    c = md5FF(c, d, a, b, x[k + 2], S13, 606105819)
    b = md5FF(b, c, d, a, x[k + 3], S14, 3250441966)
    a = md5FF(a, b, c, d, x[k + 4], S11, 4118548399)
    d = md5FF(d, a, b, c, x[k + 5], S12, 1200080426)
    c = md5FF(c, d, a, b, x[k + 6], S13, 2821735955)
    b = md5FF(b, c, d, a, x[k + 7], S14, 4249261313)
    a = md5FF(a, b, c, d, x[k + 8], S11, 1770035416)
    d = md5FF(d, a, b, c, x[k + 9], S12, 2336552879)
    c = md5FF(c, d, a, b, x[k + 10], S13, 4294925233)
    b = md5FF(b, c, d, a, x[k + 11], S14, 2304563134)
    a = md5FF(a, b, c, d, x[k + 12], S11, 1804603682)
    d = md5FF(d, a, b, c, x[k + 13], S12, 4254626195)
    c = md5FF(c, d, a, b, x[k + 14], S13, 2792965006)
    b = md5FF(b, c, d, a, x[k + 15], S14, 1236535329)
    a = md5GG(a, b, c, d, x[k + 1], S21, 4129170786)
    d = md5GG(d, a, b, c, x[k + 6], S22, 3225465664)
    c = md5GG(c, d, a, b, x[k + 11], S23, 643717713)
    b = md5GG(b, c, d, a, x[k + 0], S24, 3921069994)
    a = md5GG(a, b, c, d, x[k + 5], S21, 3593408605)
    d = md5GG(d, a, b, c, x[k + 10], S22, 38016083)
    c = md5GG(c, d, a, b, x[k + 15], S23, 3634488961)
    b = md5GG(b, c, d, a, x[k + 4], S24, 3889429448)
    a = md5GG(a, b, c, d, x[k + 9], S21, 568446438)
    d = md5GG(d, a, b, c, x[k + 14], S22, 3275163606)
    c = md5GG(c, d, a, b, x[k + 3], S23, 4107603335)
    b = md5GG(b, c, d, a, x[k + 8], S24, 1163531501)
    a = md5GG(a, b, c, d, x[k + 13], S21, 2850285829)
    d = md5GG(d, a, b, c, x[k + 2], S22, 4243563512)
    c = md5GG(c, d, a, b, x[k + 7], S23, 1735328473)
    b = md5GG(b, c, d, a, x[k + 12], S24, 2368359562)
    a = md5HH(a, b, c, d, x[k + 5], S31, 4294588738)
    d = md5HH(d, a, b, c, x[k + 8], S32, 2272392833)
    c = md5HH(c, d, a, b, x[k + 11], S33, 1839030562)
    b = md5HH(b, c, d, a, x[k + 14], S34, 4259657740)
    a = md5HH(a, b, c, d, x[k + 1], S31, 2763975236)
    d = md5HH(d, a, b, c, x[k + 4], S32, 1272893353)
    c = md5HH(c, d, a, b, x[k + 7], S33, 4139469664)
    b = md5HH(b, c, d, a, x[k + 10], S34, 3200236656)
    a = md5HH(a, b, c, d, x[k + 13], S31, 681279174)
    d = md5HH(d, a, b, c, x[k + 0], S32, 3936430074)
    c = md5HH(c, d, a, b, x[k + 3], S33, 3572445317)
    b = md5HH(b, c, d, a, x[k + 6], S34, 76029189)
    a = md5HH(a, b, c, d, x[k + 9], S31, 3654602809)
    d = md5HH(d, a, b, c, x[k + 12], S32, 3873151461)
    c = md5HH(c, d, a, b, x[k + 15], S33, 530742520)
    b = md5HH(b, c, d, a, x[k + 2], S34, 3299628645)
    a = md5II(a, b, c, d, x[k + 0], S41, 4096336452)
    d = md5II(d, a, b, c, x[k + 7], S42, 1126891415)
    c = md5II(c, d, a, b, x[k + 14], S43, 2878612391)
    b = md5II(b, c, d, a, x[k + 5], S44, 4237533241)
    a = md5II(a, b, c, d, x[k + 12], S41, 1700485571)
    d = md5II(d, a, b, c, x[k + 3], S42, 2399980690)
    c = md5II(c, d, a, b, x[k + 10], S43, 4293915773)
    b = md5II(b, c, d, a, x[k + 1], S44, 2240044497)
    a = md5II(a, b, c, d, x[k + 8], S41, 1873313359)
    d = md5II(d, a, b, c, x[k + 15], S42, 4264355552)
    c = md5II(c, d, a, b, x[k + 6], S43, 2734768916)
    b = md5II(b, c, d, a, x[k + 13], S44, 1309151649)
    a = md5II(a, b, c, d, x[k + 4], S41, 4149444226)
    d = md5II(d, a, b, c, x[k + 11], S42, 3174756917)
    c = md5II(c, d, a, b, x[k + 2], S43, 718787259)
    b = md5II(b, c, d, a, x[k + 9], S44, 3951481745)
    a = md5AddUnsigned(a, AA)
    b = md5AddUnsigned(b, BB)
    c = md5AddUnsigned(c, CC)
    d = md5AddUnsigned(d, DD)
  }
  return (
    md5WordToHex(a) +
    md5WordToHex(b) +
    md5WordToHex(c) +
    md5WordToHex(d)
  ).toLocaleUpperCase()
}

/**
 * 浮点数加法运算 arg1+arg2
 * @param {number} arg1
 * @param {number} arg2
 * @return {number}
 */
export function FloatAdd(arg1, arg2) {
  var r1, r2, m
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  return FloatDiv(FloatMul(arg1, m) + FloatMul(arg2, m), m)
}

/**
 * 浮点数减法运算 arg1-arg2
 * @param {number} arg1
 * @param {number} arg2
 * @return {number}
 */
export function FloatSub(arg1, arg2) {
  var r1, r2, m, n
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  // 动态控制精度长度
  n = r1 >= r2 ? r1 : r2
  return FloatDiv(FloatMul(arg1, m) - FloatMul(arg2, m), m).toFixed(n)
}

/**
 * 浮点数乘法运算 arg1*arg2
 * @param {number} arg1
 * @param {number} arg2
 * @return {number}
 */
export function FloatMul(arg1, arg2) {
  var m = 0
  var s1 = arg1.toString()
  var s2 = arg2.toString()
  try {
    m += s1.split('.')[1].length
  } catch (e) {}
  try {
    m += s2.split('.')[1].length
  } catch (e) {}
  return (
    (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) /
    Math.pow(10, m)
  )
}

/**
 * 浮点数除法运算 arg1/arg2
 * @param {number} arg1
 * @param {number} arg2
 * @return {number}
 */
export function FloatDiv(arg1, arg2) {
  var t1 = 0
  var t2 = 0
  var r1
  var r2
  try {
    t1 = arg1.toString().split('.')[1].length
  } catch (e) {}
  try {
    t2 = arg2.toString().split('.')[1].length
  } catch (e) {}
  r1 = Number(arg1.toString().replace('.', ''))
  r2 = Number(arg2.toString().replace('.', ''))
  return (r1 / r2) * Math.pow(10, t2 - t1)
}

/**
 * 精确浮点数位数（默认两位）
 * @param {number} val:待处理的数字
 * @param {number} pos：精确位数，default 2
 */
export function ToFixed(val, pos) {
  var p = pos || 2
  var mul = FloatMul(Number(val), Math.pow(10, p))
  return FloatDiv(Math.round(mul), Math.pow(10, p))
}

/**
 * 求数组对象中数字的和
 * @param {array} arry:为数组，数组中装的是对象
 * @param {string} attr：为对象的属性
 */
export function getSumArryObj(arry, attr) {
  var sum = 0
  for (var i in arry) {
    sum += arry[i][attr]
  }
  return ToFixed(sum, 2)
}
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/* 小写字母 */
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母 */
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母 */
export function validateAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}
/* 判断网络响应状态是否成功 */
export function isStatusSucces(status) {
  if (typeof status !== 'number') {
    return false
  }
  return status >= 200 && status < 300
}
export const chunk = (array, size) => {
  if (!array.length || size < 1) return []
  let result = []
  array.forEach((item, index) => {
    const rowSize = Math.floor(index / size)
    if (!(result[rowSize] instanceof Array)) {
      result[rowSize] = []
    }
    result[rowSize].push(item)
  })
  return result
}
export const fromEntries = arr => {
  if (Object.prototype.toString.call(arr) === '[object Map]') {
    let result = {}
    for (const key of arr.keys()) {
      result[key] = arr.get(key)
    }
    return result
  }
  if (Array.isArray(arr)) {
    let result = {}
    arr.map(([key, value]) => {
      result[key] = value
    })
    return result
  }
}
