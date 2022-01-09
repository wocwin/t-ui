<template>
  <a-drawer
    class="t_ant_layout_form"
    :class="{ visible }"
    :visible="visible"
    destroyOnClose
    :keyboard="false"
    :maskClosable="false"
    :closable="false"
    width="100%"
    :get-container="getContainer"
    :wrap-style="{ position: 'absolute' }"
  >
    <t-layout-page>
      <div class="scroll_wrap">
        <a-page-header :title="title" :sub-title="subTitle" @back="back">
          <slot slot="extra" name="extra"></slot>
        </a-page-header>
        <!-- 表单页面 -->
        <dh-form v-if="handleType==='edit'" v-bind="$attrs" ref="dhForm">
          <template v-for="(index, name) in $slots" :slot="name">
            <slot :name="name" />
          </template>
        </dh-form>
        <!-- 详情页面 -->
        <dh-detail v-else v-bind="$attrs">
          <template v-for="(index, name) in $slots" :slot="name">
            <slot :name="name" />
          </template>
        </dh-detail>
        <t-layout-page-item class="tabs" v-if="tabs">
          <a-tabs
            v-if="tabs.length > 1"
            :default-active-key="tabs[0].key"
            @change="(activeKey) => $emit('tabsChange', activeKey)"
            :animated="false"
          >
            <a-tab-pane v-for="tab in tabs" :key="tab.key" :tab="tab.title">
              <slot :name="tab.key"></slot>
            </a-tab-pane>
          </a-tabs>
          <slot v-else :name="tabs[0].key"></slot>
        </t-layout-page-item>
        <slot name="default"></slot>
      </div>
      <footer class="handle_wrap" v-if="footer!==null">
        <slot name="footer" />
        <div v-if="!$slots.footer">
          <a-button @click="back">取消</a-button>
          <a-button
            type="primary"
            v-if="handleType==='edit'"
            @click="saveHandle"
            :loading="loading"
          >保存</a-button>
        </div>
      </footer>
    </t-layout-page>
  </a-drawer>
</template>
<script>
import DhDetail from './dhDetail'
import DhForm from './dhForm'
export default {
  name: 'TAntLayoutForm',
  components: {
    DhDetail,
    DhForm
  },
  props: {
    visible: Boolean,
    handleType: {
      type: String,
      default: 'edit' // edit表form表单操作，desc表详情页面
    },
    // 是否显示底部操作按钮 :footer="null"
    footer: Object,
    title: String,
    subTitle: String,
    tabs: Array,
    getContainer: Function,
    submit: Function
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async saveHandle () {
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
        const { valid, formData } = await self.$refs.dhForm.$refs[formIndex][0].validate()
        if (valid) {
          successLength = successLength + 1
          form[formIndex] = formData
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
    back () {
      this.$emit('update:visible', false)
    },
    show (formType) {
      this.$nextTick(() => {
        this.updateFormFields()
        this.formType = formType
      })
    },
    // 清空表单
    resetFormFields () {
      const self = this
      let formOpts = {}
      // 过滤非插槽表单
      Object.keys(self.$attrs.formOpts).forEach((key) => {
        if (self.$attrs.formOpts[key].opts) {
          formOpts[key] = self.$attrs.formOpts[key]
        }
      })
      Object.keys(formOpts).forEach(formIndex => {
        self.$refs.dhForm.$refs[formIndex][0].resetFields()
      })
    },
    // 赋值defaultVal
    updateFormFields () {
      const self = this
      let formOpts = {}
      // 过滤非插槽表单
      Object.keys(self.$attrs.formOpts).forEach((key) => {
        if (self.$attrs.formOpts[key].opts) {
          formOpts[key] = self.$attrs.formOpts[key]
        }
      })
      Object.keys(formOpts).forEach(formIndex => {
        self.$refs.dhForm.$refs[formIndex][0].updateFields(false)
      })
    }
  }
}
</script>
<style lang="scss">
.t_ant_layout_form {
  position: absolute !important;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  height: 100%;
  text-align: left;
  &:not(.visible) {
    pointer-events: none;
  }
  .ant-drawer-body {
    padding: 0;
    height: 100%;
    background-color: #f6f6f6;
  }
  .scroll_wrap {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding-bottom: 8px;
    .ant-page-header {
      padding: 0 8px;
    }
    .dh-form {
      .ant-collapse-borderless {
        background-color: #f6f6f6;
        .noTitle {
          .ant-collapse-header {
            display: none;
          }
        }
        .ant-collapse-item {
          background-color: #fff;
          margin-top: 10px;
          border: none;
          &:first-child {
            margin-top: 0;
          }
          .ant-collapse-header {
            border-bottom: 1px solid #d9d9d9;
          }
          .ant-collapse-content-box {
            padding: 16px;
          }
        }
      }
    }
    .tabs {
      .ant-tabs-bar {
        margin: 0;
      }
    }
  }
  .handle_wrap {
    position: sticky;
    z-index: 10;
    right: 0;
    bottom: -8px;
    margin: 0 -8px -8px;
    padding: 12px 16px;
    background-color: #fff;
    border-top: 1px solid #d9d9d9;
    text-align: right;
    .ant-btn {
      margin-left: 8px;
    }
  }
}
</style>
