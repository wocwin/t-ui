<template>
  <t-layout-page>
    <t-layout-page-item>
      <h4 style="margin-top: 0;">内置防抖功能</h4>
      <t-button size="small" type="primary" @click="exportExcel">导出</t-button>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script>
export default {
  name: 't-button-demo',
  data() {
    return {
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    // 导出
    async exportExcel() {
      console.log('导出')
    }
  }
}
</script>
