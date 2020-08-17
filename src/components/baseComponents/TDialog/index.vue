
<template>
  <div class="t-dialog">
    <el-dialog
      v-dialog-drag
      :title="title"
      :width="width"
      :visible="visible"
      :before-close="handleClose"
      v-bind="$attrs"
      v-on="$listeners"
      class="t-dialog-content"
    >
      <slot></slot>
      <div slot="footer" class="btn" v-if="isCancel||isConfirm" style="text-align: center;">
        <el-button type="danger" v-if="isCancel" @click="cancel">{{cancelText}}</el-button>
        <el-button
          type="primary"
          :loading="loading"
          v-if="isConfirm"
          @click="confirm"
        >{{confirmText}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'TDialog',
  props: {
    title: {
      type: String,
      default: '温馨提示'
    },
    visible: {
      type: Boolean,
      default: false,
      required: true
    },
    width: {
      type: String,
      default: '40%'
    },
    isCancel: {
      // 是否显示取消按钮
      type: Boolean,
      default: true
    },
    isConfirm: {
      // 是否显示确定按钮
      type: Boolean,
      default: false
    },
    loading: {
      // 确定按钮loading
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    callBackFunc: {
      type: Function,
      default: null
    },
    callBackFuncParam: {
      type: String,
      default: null
    }
  },
  methods: {
    cancel () {
      this.$emit('update:visible', false)
    },
    handleClose () {
      this.$emit('update:visible', false)
    },
    confirm () {
      this.$emit('confirm', this.callBackFunc, this.callBackFuncParam)
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
