<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949" />
    </t-layout-page-item>
  </t-layout-page>
</template>
<script>
export default {
  data() {
    return {
      value: true
    }
  }
}
</script>