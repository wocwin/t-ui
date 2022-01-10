<template>
  <div class="t-icon">
    <i class="i-icon icon iconfont" :class="iconClass" :style="fontStyle"></i>
  </div>
</template>
<script>
export default {
  name: 'TIcon',
  data () {
    return {
    }
  },
  props: {
    iconClass: {
      type: [String, Array, Object]
    },
    size: {
      type: Number,
      default: 16
    },
    color: {
      type: String,
      default: ''
    }
  },
  computed: {
    fontStyle () {
      return `font-size:${this.size}px;color:${this.color};`
    }
  }
}
</script>
<style lang='scss' scoped>
.t-icon {
  cursor: pointer;
}
</style>
