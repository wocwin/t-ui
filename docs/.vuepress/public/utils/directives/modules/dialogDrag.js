// v-dialogDrag: 弹窗拖拽
const dialogDrag = {
  bind (el) {
    const dialogHeaderEl = el.querySelector('.el-dialog__header')
    const dragDom = el.querySelector('.el-dialog')
    dialogHeaderEl.style.cursor = 'move'
    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)
    let disX, disY, styL, styT
    // 移动
    const mouseMoveHandler = (e) => {
      // 通过事件委托，计算移动的距离
      const l = e.clientX - disX
      const t = e.clientY - disY
      // 移动当前元素
      dragDom.style.left = `${l + styL}px`
      dragDom.style.top = `${t + styT}px`
    }
    // 手指抬起
    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler)
      document.removeEventListener('mouseup', mouseUpHandler)
    }
    // 手指按下
    const mouseDownHandler = (e) => {
      disX = e.clientX - dialogHeaderEl.offsetLeft
      disY = e.clientY - dialogHeaderEl.offsetTop
      // 获取到的值带px 正则匹配替换
      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (sty.left.includes('%')) {
        styL =
          +document.body.clientWidth * (+sty.left.replace(/%/g, '') / 100)
        styT =
          +document.body.clientHeight * (+sty.top.replace(/%/g, '') / 100)
      } else {
        styL = +sty.left.replace(/\px/g, '')
        styT = +sty.top.replace(/\px/g, '')
      }
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    }
    dialogHeaderEl.addEventListener('mousedown', mouseDownHandler);
  }
}
export default dialogDrag
