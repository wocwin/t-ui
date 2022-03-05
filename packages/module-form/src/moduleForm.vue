<template>
  <div class="t_form">
    <el-collapse v-model="defaultActiveKey">
      <el-collapse-item
        v-for="(formOpt, formIndex) in formOpts"
        :class="{noTitle:!formOpt.title,disabledStyle:formOpt.disabled}"
        :key="formIndex"
        :title="formOpt.title"
        :name="formOpt.name"
        :disabled="formOpt.disabled"
      >
        <template v-if="formOpt.slotName">
          <slot :name="formOpt.slotName"></slot>
        </template>
        <t-simple-form
          :ref="formIndex"
          :formOpts="formOpt.opts"
          :ref-obj.sync="formOpt.ref"
          :widthSize="formOpt.widthSize||3"
          v-bind="$attrs"
          @handleEvent="(val,type)=>$emit('handleEvent',val,type)"
        >
          <template v-for="(index, name) in $slots" :slot="name">
            <slot :name="name" />
          </template>
        </t-simple-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  name: 'ModuleForm',
  components: {
  },
  props: {
    // 表单配置项
    formOpts: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    // 默认全部展开
    defaultActiveKey: {
      get () {
        // console.log(333, Object.keys(this.formOpts))
        return Object.keys(this.formOpts)
      },
      set (val) {
        return val
      }
    }
  }
}
</script>
<style lang="scss">
.t_form {
  .el-collapse {
    border: none;
    background-color: #f6f6f6;
    .el-collapse-item {
      background-color: #fff;
      margin-top: 10px;
      border: none;
      .el-collapse-item__header {
        border-bottom: 1px solid #ebeef5;
        position: relative;
        padding-left: 35px;
        .el-collapse-item__arrow {
          color: inherit;
          font-style: normal;
          line-height: 0;
          text-align: center;
          text-transform: none;
          vertical-align: -0.125em;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          position: absolute;
          top: 50%;
          left: 16px;
          display: inline-block;
          font-size: 12px;
        }
      }
      // &:first-child {
      //   margin-top: 0;
      // }
      .el-collapse-item__wrap {
        padding: 16px;
        border: none;
      }
    }
    // 隐藏手风琴title
    .noTitle {
      > div {
        &:first-child {
          display: none;
        }
      }
    }
    // 禁用时取消收缩功能及隐藏icon
    .disabledStyle {
      .el-collapse-item__header {
        color: #303133;
        cursor: default;
        padding-left: 20px;
        .el-collapse-item__arrow {
          display: none;
        }
      }
    }
  }
}
</style>
