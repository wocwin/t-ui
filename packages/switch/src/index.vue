
<template>
  <el-switch
    v-bind="{width:40,...$attrs}"
    v-on="$listeners"
    class="t-switch"
    :class="{ 't-switch-inline-prompt': inlinePrompt}"
  />
</template>
<script>
export default {
  name: 'TSwitch',
  props: {
    inlinePrompt: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss">
.t-switch {
  &.t-switch-inline-prompt {
    .el-switch__label {
      position: absolute;
      display: none;
      color: #fff;
      &.is-active {
        display: block;
      }
    }
    .el-switch__label--left {
      z-index: 9;
      left: 20px;
    }
    .el-switch__label--right {
      z-index: 9;
      left: 4px;
    }
  }
}
</style>
