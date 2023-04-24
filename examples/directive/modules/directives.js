import Vue from 'vue'
// element select滚动加载
Vue.directive('loadmore', {
  bind(el, binding) {
    const DomClass = el.querySelector(binding.value.domName)
    const SELECTWRAP_DOM = DomClass.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
    SELECTWRAP_DOM.addEventListener('scroll', function () {
      const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight
      if (CONDITION) {
        binding.value.scollBottomFuc()
      }
    })
  }
})
