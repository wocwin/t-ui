// 弹框隐藏头部
const dialogShow = {
  bind (el) {
    const dialogHeaderEl = el.querySelector('.el-dialog__header')
    dialogHeaderEl.style.display = 'none'
  }
}
export default dialogShow
