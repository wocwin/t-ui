// 只能输入正整数及小数
const enterNumber = {
  inserted (el, vDir, vNode) {
    // vDir.value 有指令的参数
    let content
    // 按键按下=>
    el.addEventListener('keypress', function (e) {
      e = e || window.event
      let code = typeof e.charCode === 'number' ? e.charCode : e.keyCode
      if (e.key === '-') {
        e.preventDefault()
      }
      let re = /\d/
      if (code === 46) {
        if (e.target.value.includes('.')) {
          e.preventDefault()
        }
      } else if (!re.test(String.fromCharCode(code)) && code > 9 && !e.ctrlKey) {
        if (e.preventDefault) {
          e.preventDefault()
        } else {
          e.returnValue = false
        }
      }
    })
    // 失去焦点=>保留指定位小数
    el.addEventListener('focusout', event => { // 此处会在 el-input 的 @change 后执行
      let e = event || window.event
      if (e.target.value.includes('-')) {
        content = parseFloat(e.target.value.split('-')[1])
      } else {
        content = parseFloat(e.target.value)
      }
      if (!content) {
        content = ''
      }
      // let argPrecision = 0// 默认保留至整数
      // if (vDir.value.precision) {
      //   argPrecision = parseFloat(vDir.value.precision)
      // } else {
      //   argPrecision = 2
      // }
      e.target.value = content && content.toFixed(2)
      // -- callback写法1
      vNode.data.model.callback = () => {
        e.target.value = content && content.toFixed(2)
      }
    })
  }
}
export default enterNumber
