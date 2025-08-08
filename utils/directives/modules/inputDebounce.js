/***
     * 防抖 单位时间只触发最后一次
     *  @param {?Number|300} type - 当前元素类型
     *  @param {Function} fn - 执行事件
     *  @param {?String|"click"} event - 事件类型 例："keydown"
     *  @param {?Number|300} time - 间隔时间
     *  @param {Array} binding.value - [fn,time,event]
     *  例：<el-input v-debounce="[queryList,300,`keydown`]" />
     *  也可简写成：<el-input v-debounce="[queryList]" />
     *  queryList 函数中 可以拿到输入的值，进行接口请求
     *  例：async queryList(Val) { await xxx(val) }
     */
const inputDebounce = {
  inserted (el, binding) {
    let [fn, time = 300, event = 'keydown'] = binding.value
    const targetEl = el.getElementsByTagName('input')[0]
    let timer
    targetEl.addEventListener(event, () => {
      timer && clearTimeout(timer)
      timer = setTimeout(() => fn(targetEl.value), time)
    })
  }
}
export default inputDebounce
