// 只能输入数字
const number = {
  bind (el) {
    const ele = el.tagName === 'INPUT' ? el : el.querySelector('input')
    ele.handler = function () {
      ele.value = ele.value.replace(/[^\d]/g, '')
    }
    ele.addEventListener('input', ele.handler)
  },
  unbind (el) {
    const ele = el.tagName === 'INPUT' ? el : el.querySelector('input')
    ele.removeEventListener('input', ele.handler)
  }
}
export default number
