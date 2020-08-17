<template>
  <div class="t-dialog-demo" style="width:100%;min-height:100px;padding:15px;">
    <el-button type="danger" @click="openDialog">PDF预览弹窗</el-button>
    <t-protocol
      :protocolVisible="protocolVisible"
      :protocolTitle="protocolTitle"
      :protocolSrc="protocolSrc"
      v-dialogDrag
      ref="pdf"
      @update:visible="protocolHide"
    />
  </div>
</template>
<script>
// import TProtocol from '../../../../../packages/components/TProtocol'
export default {
  components: {
    // TProtocol
  },
  data () {
    return {
      protocolVisible: false,
      protocolTitle: '协议预览',
      protocolSrc: '' // 协议路径
    }
  },
  methods: {
    openDialog () {
      this.protocolVisible = true
    },
    protocolHide () {
      this.protocolVisible = false
    }
  }
}
</script>
