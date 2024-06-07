<template>
  <t-layout-page>
    <t-layout-page-item>
      <el-button type="danger" @click="openDialog">PDF预览弹窗</el-button>
    </t-layout-page-item>
    <t-protocol
      :protocolVisible="protocolVisible"
      :protocolTitle="protocolTitle"
      :protocolSrc="protocolSrc"
      v-dialogDrag
      ref="pdf"
      @update:visible="protocolHide"
    />
  </t-layout-page>
</template>
<script>
export default {
  data() {
    return {
      protocolVisible: false,
      protocolTitle: '协议预览',
      protocolSrc: '' // 协议路径
    }
  },
  methods: {
    openDialog() {
      this.protocolVisible = true
    },
    protocolHide() {
      this.protocolVisible = false
    }
  }
}
</script>
