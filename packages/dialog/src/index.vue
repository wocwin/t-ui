
<template>
  <div class="t-dialog">
    <el-dialog v-dialog-drag v-bind="attrs" v-on="$listeners" class="t-dialog-content">
      <template v-for="(index, name) in $slots" :slot="name">
        <slot :name="name" />
      </template>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'TDialog',
  computed: {
    attrs() {
      return {
        'close-on-click-modal': false,
        'close-on-press-escape': false,
        ...this.$attrs
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
