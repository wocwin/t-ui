<template>
  <div
    id="t_layout_page"
    class="t_layout_page"
    ref="TLayoutPageRef"
    @scroll="(e) => (scrollTop = e.target.scrollTop)"
  >
    <slot />
    <div class="back_to_top" v-if="showGoTopButton">
      <div v-if="isShowGoTopButton" @click="backToTop">
        <i :class="topIcon" class="top_icon" style="color: #5cb6ff"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TLayoutPage',
  props: {
    keepScrollDisabled: Boolean,
    // 是否显示返回顶部按钮
    showGoTopButton: {
      type: Boolean,
      default: true
    },
    // 滚动条位置
    scrollToTop: {
      type: Number,
      default: 150
    },
    // 返回顶部按钮图标
    topIcon: {
      type: String,
      default: 'el-icon-caret-top'
    }
  },
  data() {
    return {
      scrollTop: 0,
      isShowGoTopButton: false
    }
  },
  watch: {
    scrollTop() {
      if (this.scrollTop > this.scrollToTop) {
        this.isShowGoTopButton = true
      } else {
        this.isShowGoTopButton = false
      }
    }
  },
  methods: {
    backToTop() {
      this.scrollTop = 0
      this.$el.scrollTop = 0
    }
  },
  mounted() {
    const pageItems = this.$refs.TLayoutPageRef.querySelectorAll('.t_layout_page_item')
    if (pageItems.length === 2) {
      pageItems[0].style.marginBottom = '8px'
    }
    if (pageItems.length > 2) {
      pageItems.forEach((item) => {
        item.style.marginBottom = '8px'
      })
      pageItems[pageItems.length - 1].style.marginBottom = '0'
    }
  },
  activated() {
    if (!this.keepScrollDisabled) {
      this.$el.scrollTop = this.scrollTop
    }
  }
}
</script>
<style lang="scss" scoped>
.t_layout_page {
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .back_to_top {
    position: fixed;
    right: 10px;
    bottom: 100px;
    z-index: 100;
    box-shadow: 0 5px 6px 2px rgba(0, 0, 0, 0.5);
    background: #fff;
    border-radius: 5px;
    opacity: 0.6;

    &:hover {
      opacity: 1;
    }

    > div {
      cursor: pointer;
      height: 40px;
      width: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .top_icon {
      font-size: 20px;
    }
  }
}
</style>
