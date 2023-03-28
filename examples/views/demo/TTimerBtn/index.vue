<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-timer-btn :second="second" @click="sendCode" />
    </t-layout-page-item>
  </t-layout-page>
</template>
<script>
export default {
  name: 't-timer-btn-demo',
  data() {
    return {
      second: 10
    }
  },
  methods: {
    sendCode() {
      console.log('点击获取验证码')
    }
  }
}
</script>
