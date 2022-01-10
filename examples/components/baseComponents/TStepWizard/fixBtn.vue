<template>
  <div class="fix-btn flex-box flex-ver bottom-tool-bar bar-fixed-bottom">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'FixBtn'
}
</script>
<style lang="scss" scoped>
.fix-btn {
  min-width: 990px;
  max-width: 1840px;
  width: 100%;
}
.bottom-tool-bar {
  height: 60px;
  text-align: center;
  margin: 10px 0;
  background: #fff;
}
.bar-fixed-bottom {
  position: absolute;
  margin: 0 !important;
  z-index: 99;
  bottom: 0;
  left: 0;
}
</style>
