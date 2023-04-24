<template>
  <div id="t_layout_page" class="t_layout_page" @scroll="e => scrollTop = e.target.scrollTop">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'TLayoutPage',
  props: {
    keepScrollDisabled: Boolean
  },
  data() {
    return {
      scrollTop: 0
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
  // padding: 8px;
  width: 100%;
  height: 100%;
  // overflow: hidden;
  overflow-y: auto;
}
</style>
