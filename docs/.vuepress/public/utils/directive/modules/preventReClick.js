/**
 * 防止多次点击，重复请求
 * 使用方法: v-prevent-re-click="number"
 * number:毫秒数表允许多少毫秒后才能再次点击，默认3秒
 */
const preventReClick = {
  inserted (el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 3000)
      }
    })
  }
}
export default preventReClick
