
<template>
  <div class="t-dialog">
    <el-dialog
      v-dialog-drag="{isShowDialogDrag}"
      v-bind="attrs"
      v-on="$listeners"
      class="t-dialog-content"
    >
      <template v-for="(index, name) in $slots" :slot="name">
        <slot :name="name" />
      </template>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'TDialog',
  props: {
    // 是否开启拖拽功能(flase开启，true是关闭)
    isShowDialogDrag: {
      type: Boolean,
      default: false
    },
    // 是否开启ESC关闭弹窗
    isESC: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    attrs() {
      return {
        'close-on-click-modal': false,
        'close-on-press-escape': false,
        ...this.$attrs
      }
    }
  },
  directives: {
    dialogDrag: {
      bind(el, binding, vnode) {
        if (binding.value.isShowDialogDrag) return
        const dialogHeaderEl = el.querySelector('.el-dialog__header')
        const dragDom = el.querySelector('.el-dialog')
        dialogHeaderEl.style.cssText += ';cursor:move;'
        dragDom.style.cssText += ';top:0px;'

        // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
        const getStyle = (function () {
          if (window.document.currentStyle) {
            return (dom, attr) => dom.currentStyle[attr]
          } else {
            return (dom, attr) => getComputedStyle(dom, false)[attr]
          }
        })()

        dialogHeaderEl.onmousedown = (e) => {
          // 鼠标按下，计算当前元素距离可视区的距离
          const disX = e.clientX - dialogHeaderEl.offsetLeft
          const disY = e.clientY - dialogHeaderEl.offsetTop

          const dragDomWidth = dragDom.offsetWidth
          const dragDomHeight = dragDom.offsetHeight

          const screenWidth = document.body.clientWidth
          const screenHeight = document.body.clientHeight

          const minDragDomLeft = dragDom.offsetLeft
          const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth

          const minDragDomTop = dragDom.offsetTop
          const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomHeight

          // 获取到的值带px 正则匹配替换
          let styL = getStyle(dragDom, 'left')
          let styT = getStyle(dragDom, 'top')

          if (styL.includes('%')) {
            // eslint-disable-next-line no-useless-escape
            styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100)
            // eslint-disable-next-line no-useless-escape
            styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100)
          } else {
            styL = +styL.replace(/\px/g, '')
            styT = +styT.replace(/\px/g, '')
          }

          document.onmousemove = function (e) {
            // 通过事件委托，计算移动的距离
            let left = e.clientX - disX
            let top = e.clientY - disY
            // 边界处理
            if (-(left) > minDragDomLeft) {
              left = -minDragDomLeft
            } else if (left > maxDragDomLeft) {
              left = maxDragDomLeft
            }

            if (-(top) > minDragDomTop) {
              top = -minDragDomTop
            } else if (top > maxDragDomTop) {
              top = maxDragDomTop
            }

            // 移动当前元素
            dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`

            // emit onDrag event
            vnode.child.$emit('dragDialog')
          }

          document.onmouseup = function (e) {
            document.onmousemove = null
            document.onmouseup = null
          }
        }
      }
    }
  },
  mounted() {
    this.keydownEvent()
  },
  methods: {
    keydownEvent() {
      if (!this.isESC) return
      document.addEventListener('keydown', this.ESCEvent)
    },
    ESCEvent(e) {
      if (this.$attrs.visible && e.keyCode == 27) {
        console.log('e.keyCode', e.keyCode)
        this.$emit('update:visible')
      }
    }
  }
}
</script>
<style lang="scss">
.t-dialog {
  .t-dialog-content {
    .el-dialog__header {
      border-bottom: 1px solid rgba(240, 242, 245, 1);
    }
    .el-dialog__body {
      overflow-x: auto;
      &::-webkit-scrollbar {
        margin-top: 110px;
        width: 8px;
        height: 1px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #b3b3b3;
      }
      &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        background: #ededed;
      }
    }
  }
}
</style>
