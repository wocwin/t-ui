/**
 * 使用方法: v-only-number="{max:1000000,min:0,precision:2}"
  max:最大值
  min:最小值
  precision:保留几位小数点(默认是0位)
 */
const onlyNumber = {
  inserted (el, vDir, vNode) {
    // vDir.value 有指令的参数
    let content
    // 按键按下=>只允许输入 数字/小数点
    el.addEventListener('keypress', event => {
      let e = event || window.event
      let inputKey = String.fromCharCode(typeof e.charCode === 'number' ? e.charCode : e.keyCode)
      let re = /\d|\./
      content = e.target.value
      // 定义方法,阻止输入
      function preventInput () {
        if (e.preventDefault) {
          e.preventDefault()
        } else {
          e.returnValue = false
        }
      }
      if (!re.test(inputKey) && !e.ctrlKey) {
        preventInput()
      } else if (content.indexOf('.') > 0 && inputKey === '.') {
        // 已有小数点,再次输入小数点
        preventInput()
      }
    })
    // 按键弹起=>并限制最大最小
    el.addEventListener('keyup', event => {
      let e = event || window.event
      content = parseFloat(e.target.value)
      if (!content) {
        content = ''
      }
      let argMax = ''
      let argMin = ''
      if (vDir.value) {
        argMax = parseFloat(vDir.value.max)
        argMin = parseFloat(vDir.value.min)
      }
      if (argMax && content > argMax) {
        e.target.value = argMax
        content = argMax
      }
      if (argMin && content < argMin) {
        e.target.value = argMin
        content = argMin
      }
    })
    // 失去焦点=>保留指定位小数
    el.addEventListener('focusout', event => { // 此处会在 el-input 的 @change 后执行
      let e = event || window.event
      content = parseFloat(e.target.value)
      if (!content) {
        content = ''
      }
      let argPrecision = 0// 默认保留至整数
      if (vDir.value.precision) {
        argPrecision = parseFloat(vDir.value.precision)
      }
      e.target.value = content && content.toFixed(argPrecision)
      // -- callback写法1
      vNode.data.model.callback = () => {
        e.target.value = content && content.toFixed(argPrecision)
      }
      // console.log(77, argPrecision)
      // vNode.data.model.callback();
      // -- callback 写法2
      // vNode.data.model.callback(
      //     e.target.value = content.toFixed(argPrecision)
      // )
    })
  }
}
export default onlyNumber
