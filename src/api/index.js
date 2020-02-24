import fetch from '@/utils/fetch'

export default (function request () {
  return function () {
    const args = Array.from(arguments)
    const config = args[0]
    const funcName = args[1]
    const data = args[2]
    if (typeof config[funcName] !== 'object') {
      throw new Error('调用api函数函数错误，请检查函数名称是否错误')
    }
    // 配置axios的config
    var newConfig = JSON.parse(JSON.stringify(config[funcName]))
    // post请求，参数传值到url上
    // if (newConfig.getUrl === 'get') {
    //   var urlArgs = ''
    //   for (let key in data) {
    //     urlArgs += key + '=' + data[key] + '&'
    //   }
    //   newConfig.url = newConfig.url + '?' + urlArgs.substring(0, urlArgs.length - 1)
    // }
    // const toRest = (url, params) => {
    //   let paramArr = url.match(/(?<=\{).*?(?=\})/gi)
    //   paramArr.forEach(el => {
    //     url = url.replace('{' + el + '}', params[el])
    //   })
    //   return url
    // }

    if (data) {
      if (config[funcName].method === 'get' || config[funcName].method === 'delete' || config[funcName].method === undefined) {
        newConfig.url = newConfig.url.replace(/\{([\d\w_]+)\}/g, (word, $1) => {
          var res = data[$1]
          // 删除data中的对应字段
          delete data[$1]
          return res
        })
        newConfig.params = data
      } else {
        newConfig.url = newConfig.url.replace(/\{([\d\w_]+)\}/g, (word, $1) => {
          var res = data[$1]
          // 删除data中的对应字段
          delete data[$1]
          return res
        })
        newConfig.data = data
      }
    }
    // 用axios的config发起请求
    return fetch(newConfig)
  }
})()
