<template>
  <t-layout-page class="t-form">
    <a-collapse :bordered="false" :defaultActiveKey="defaultActiveKey">
      <a-collapse-panel
        v-for="(formOpt, formIndex) in formOpts"
        :class="{noTitle:!formOpt.title}"
        :key="formIndex"
        :header="formOpt.title"
      >
        <template v-if="formOpt.slotName">
          <slot :name="formOpt.slotName"></slot>
        </template>
        <t-ant-config-form
          v-else
          :ref="formIndex"
          class="config_form"
          :opts="formOpt.opts"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        />
      </a-collapse-panel>
    </a-collapse>
  </t-layout-page>
</template>
<script>
import TAntConfigform from '../../config-form'
export default {
  name: 'DhForm',
  components: {
    't-ant-config-form': TAntConfigform
  },
  props: {
    labelCol: {
      type: Object,
      default: () => ({ span: 6 })
    },
    wrapperCol: {
      type: Object,
      default: () => ({ span: 18 })
    },
    formOpts: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    defaultActiveKey () {
      return Object.keys(this.formOpts)
    }
  }
}
</script>
<style lang="scss">
.t-form {
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
  .ant-form-item {
    margin-bottom: 20px !important;
    &.ant-form-item-with-help {
      margin-bottom: 1px !important;
    }
    .ant-form-item-label {
      line-height: 26px !important;
    }
  }
}
</style>
