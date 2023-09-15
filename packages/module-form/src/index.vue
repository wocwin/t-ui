<template>
  <div class="t_module_form" :style="{marginBottom:footer!==null?'60px':''}">
    <div class="scroll_wrap">
      <!-- 头部 -->
      <el-page-header
        v-if="title||titleSlot"
        :title="title"
        @back="back"
        :class="{noContent:!isShow('extra')&&!subTitle,'isShowBack':isShowBack}"
      >
        <template #title v-if="titleSlot">
          <slot name="title"></slot>
        </template>
        <template #content>
          <div class="sub_title">{{subTitle}}</div>
          <div class="extra">
            <slot name="extra"></slot>
          </div>
        </template>
      </el-page-header>
      <!-- 表单页面 -->
      <module-form v-if="handleType==='edit'" v-bind="$attrs" v-on="$listeners" ref="tForm">
        <!-- 遍历子组件非作用域插槽，并对父组件暴露 -->
        <template v-for="(index, name) in $slots" v-slot:[name]>
          <slot :name="name" />
        </template>
        <!-- 遍历子组件作用域插槽，并对父组件暴露 -->
        <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
          <slot :name="name" v-bind="data"></slot>
        </template>
      </module-form>
      <!-- 详情页面 -->
      <module-detail v-else v-bind="$attrs">
        <!-- 遍历子组件非作用域插槽，并对父组件暴露 -->
        <template v-for="(index, name) in $slots" v-slot:[name]>
          <slot :name="name" />
        </template>
        <!-- 遍历子组件作用域插槽，并对父组件暴露 -->
        <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
          <slot :name="name" v-bind="data"></slot>
        </template>
      </module-detail>
      <!-- tabs -->
      <div class="tabs" v-if="tabs" :style="{'margin-top':isTabMargin?`${tabMarginNum}px`:0}">
        <el-tabs
          v-if="tabs&&tabs.length > 1"
          v-model="activeName"
          @tab-click="(tab, event) => $emit('tabsChange', tab, event)"
        >
          <el-tab-pane v-for="tab in tabs" :key="tab.key" :name="tab.key" :label="tab.title">
            <slot :name="tab.key"></slot>
          </el-tab-pane>
        </el-tabs>
        <slot v-else :name="tabs&&tabs[0].key"></slot>
      </div>
      <slot name="default"></slot>
    </div>
    <!-- 按钮 -->
    <footer class="handle_wrap" v-if="footer!==null">
      <slot name="footer" />
      <div v-if="!$slots.footer">
        <el-button @click="back">取消</el-button>
        <el-button
          type="primary"
          v-if="handleType==='edit'"
          @click="saveHandle"
          :loading="loading"
        >{{btnTxt}}</el-button>
      </div>
    </footer>
  </div>
</template>
<script>
import ModuleDetail from './moduleDetail'
import ModuleForm from './moduleForm'
export default {
  name: 'TModuleForm',
  components: {
    ModuleDetail,
    ModuleForm
  },
  props: {
    handleType: {
      type: String,
      default: 'edit' // edit表form表单操作，desc表详情页面
    },
    // 是否使用插槽显示title
    titleSlot: {
      type: Boolean,
      default: false
    },
    // 是否显示返回箭头
    isShowBack: {
      type: Boolean,
      default: false
    },
    // 返回上一层触发方法
    isGoBackEvent: {
      type: Boolean,
      default: false
    },
    // 操作按钮文字
    btnTxt: {
      type: String,
      default: '保存'
    },
    // tabs是否跟模块分离
    isTabMargin: {
      type: Boolean,
      default: false
    },
    // tabs跟模块分离距离（默认10px）
    tabMarginNum: {
      type: Number,
      default: 10
    },
    // 是否显示底部操作按钮 :footer="null"
    footer: Object,
    title: String,
    subTitle: String,
    tabs: Array,
    submit: Function
  },
  data() {
    return {
      activeName: this.tabs && this.tabs[0].key,
      loading: false
    }
  },
  methods: {
    // 获取默认选中tab
    setSelectedTab(key) {
      this.activeName = key
    },
    // 点击保存
    async saveHandle() {
      const self = this
      let form = {}
      let formError = {}
      let formOpts = {}
      let successLength = 0
      this.loading = true
      // 过滤非插槽表单
      Object.keys(self.$attrs.formOpts).forEach((key) => {
        if (self.$attrs.formOpts[key].opts) {
          formOpts[key] = self.$attrs.formOpts[key]
        }
      })
      await Object.keys(formOpts).forEach(async (formIndex) => {
        const { valid, formData } = await self.$refs.tForm.$refs[formIndex][0].validate()
        // const { valid, formData } = await self.$attrs.formOpts[formIndex].ref.validate()
        if (valid) {
          successLength = successLength + 1
          form[formIndex] = self.$attrs.formOpts[formIndex].opts.formData
        }
      })
      if (successLength === Object.keys(formOpts).length) { // 所有表单都校验成功
        const isSuccess = await this.submit(form)
        if (isSuccess) { // 成功
          this.back()
        }
      } else {
        // 校验失败抛出事件
        Object.keys(formOpts).forEach((key) => {
          if (Object.keys(form).length > 0) {
            Object.keys(form).map((val) => {
              if (key !== val) {
                formError[key] = formOpts[key]
              }
            })
          } else {
            formError[key] = formOpts[key]
          }
        })
        this.$emit('validateError', formError)
      }
      this.loading = false
    },
    // 点击头部返回或者取消
    back() {
      if (this.isShowBack) {
        return
      }
      this.$emit('back')
      if (!this.isGoBackEvent) {
        this.$router.go(-1)
      }
    },
    show(formType) {
      this.$nextTick(() => {
        this.updateFormFields()
        this.formType = formType
      })
    },
    // 清空表单
    resetFormFields() {
      const self = this
      let formOpts = {}
      // 过滤非插槽表单
      Object.keys(self.$attrs.formOpts).forEach((key) => {
        if (self.$attrs.formOpts[key].opts) {
          formOpts[key] = self.$attrs.formOpts[key]
        }
      })
      Object.keys(formOpts).forEach(formIndex => {
        self.$refs.tForm.$refs[formIndex][0].resetFields()
      })
    },
    // 清空校验规则
    clearValidate() {
      const self = this
      let formOpts = {}
      // 过滤非插槽表单
      Object.keys(self.$attrs.formOpts).forEach((key) => {
        if (self.$attrs.formOpts[key].opts) {
          formOpts[key] = self.$attrs.formOpts[key]
        }
      })
      Object.keys(formOpts).forEach(formIndex => {
        self.$refs.tForm.$refs[formIndex][0].clearValidate()
      })
    },
    updateFormFields() {
      const self = this
      let formOpts = {}
      // 过滤非插槽表单
      Object.keys(self.$attrs.formOpts).forEach((key) => {
        if (self.$attrs.formOpts[key].opts) {
          formOpts[key] = self.$attrs.formOpts[key]
        }
      })
      Object.keys(formOpts).forEach(formIndex => {
        self.$refs.tForm.$refs[formIndex][0].updateFields(false)
      })
    },
    isShow(name) {
      return Object.keys(this.$slots).includes(name)
    }
  }
}
</script>
<style lang="scss">
.t_module_form {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  height: 100%;
  text-align: left;
  background-color: #f0f2f5;
  overflow: auto;
  .scroll_wrap {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    // padding-bottom: 8px;
    .el-page-header {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
      font-variant: tabular-nums;
      line-height: 1.5;
      list-style: none;
      -webkit-font-feature-settings: "tnum";
      font-feature-settings: "tnum";
      position: relative;
      padding: 16px 24px;
      background-color: #fff;
      .el-page-header__left {
        color: #303133;
        align-items: center;
        .el-icon-back {
          font-weight: bold;
        }
        .el-page-header__title {
          font-size: 18px;
          font-weight: bold;
        }
      }
      .el-page-header__content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex: 60%;
        .sub_title {
          flex: 30%;
        }
        .extra {
          flex: 70%;
          display: flex;
          justify-content: flex-end;
        }
      }
    }
    .noContent {
      .el-page-header__left {
        &::after {
          content: none;
        }
      }
    }
    // 是否显示返回箭头
    .isShowBack {
      .el-page-header__left {
        .el-icon-back {
          display: none;
        }
      }
    }
    .t_form {
      .el-collapse-borderless {
        background-color: #f0f2f5;
        .noTitle {
          .el-collapse-header {
            display: none;
          }
        }
        .el-collapse-item {
          background-color: #fff;
          margin-top: 10px;
          border: none;
          &:first-child {
            margin-top: 0;
          }
          .el-collapse-header {
            border-bottom: 1px solid #d9d9d9;
          }
          .el-collapse-content-box {
            padding: 16px;
          }
        }
      }
    }
    .tabs {
      padding: 0;
      margin: 0;
      .el-tabs {
        .el-tabs__header {
          margin: 0;
          padding: 0 10px;
          background-color: #fff;
        }
        .el-tabs__nav-wrap {
          &::after {
            height: 1px;
          }
        }
      }
    }
  }
  .handle_wrap {
    // position: sticky;
    // z-index: 10;
    // right: 0;
    // bottom: -8px;
    // // margin: 0 -8px -8px;
    // padding: 12px 16px;
    // background-color: #fff;
    // border-top: 1px solid #ebeef5;
    // text-align: right;
    position: fixed;
    z-index: 4;
    right: 0;
    bottom: 0px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: #fff;
    border-top: 1px solid #ebeef5;
    text-align: right;
    width: 100%;
    .el-button:last-child {
      margin-right: 15px;
    }
  }
}
</style>
