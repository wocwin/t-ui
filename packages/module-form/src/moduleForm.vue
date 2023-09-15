<template>
  <div class="t_form">
    <el-collapse v-model="defaultActiveKey">
      <el-collapse-item
        v-for="(formOpt, formIndex) in formOpts"
        :class="[formOpt.className,{ noTitle: !formOpt.title,disabledStyle:formOpt.disabled }]"
        :key="formIndex"
        :name="formOpt.name"
        :disabled="formOpt.disabled"
      >
        <template #title>
          {{formOpt.title}}
          <div class="t_btn" v-if="formOpt.btn">
            <slot :name="formOpt.btn"></slot>
          </div>
        </template>
        <template v-if="formOpt.slotName">
          <slot :name="formOpt.slotName"></slot>
        </template>
        <t-form
          :ref="formIndex"
          :formOpts="formOpt.opts"
          :ref-obj.sync="formOpt.ref"
          :widthSize="formOpt.widthSize||3"
          v-bind="$attrs"
          @handleEvent="(val,type)=>$emit('handleEvent',val,type)"
        >
          <!-- 遍历子组件非作用域插槽，并对父组件暴露 -->
          <template v-for="(index, name) in $slots" v-slot:[name]>
            <slot :name="name" />
          </template>
          <!-- 遍历子组件作用域插槽，并对父组件暴露 -->
          <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
            <slot :name="name" v-bind="data"></slot>
          </template>
        </t-form>
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
      get() {
        // console.log(333, Object.keys(this.formOpts))
        return Object.keys(this.formOpts)
      },
      set(val) {
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
    background-color: #f0f2f5;
    .el-collapse-item {
      background-color: #fff;
      margin-top: 10px;
      border: none;
      .el-collapse-item__header {
        border-bottom: 1px solid #ebeef5;
        position: relative;
        padding-left: 35px;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .t_btn {
          margin-right: 15px;
        }
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
        .el-collapse-item__content {
          padding-bottom: 0;
        }
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
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .el-collapse-item__arrow {
          display: none;
        }
        .t_btn {
          margin-right: 15px;
        }
      }
    }
  }
}
</style>
