<template>
  <div class="t-dialog-demo" style="width:100%;min-height:100px;padding:15px;">
    <el-button type="danger" @click="openDialog">短信验证弹窗</el-button>
    <t-phone
      :phoneVisible="phoneVisible"
      :legalPhone="legalPhone"
      @update:visible="phoneHide"
      :personTxt="personTxt"
      @phoneConfirm="phoneConfirm"
    />
  </div>
</template>
<script>
export default {
  data () {
    return {
      phoneVisible: false,
      personTxt: '法人',
      legalPhone: '13888888888' // 法人手机号码
    }
  },
  methods: {
    openDialog () {
      this.phoneVisible = true
    },
    // 点击确定
    phoneConfirm (smsCode) {
      console.log('点击确定按钮', smsCode)
      this.phoneVisible = false
    },
    phoneHide () {
      this.phoneVisible = false
    }
  }
}
</script>
