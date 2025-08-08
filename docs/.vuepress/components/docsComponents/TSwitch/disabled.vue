<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-switch v-model="value" disabled />
    </t-layout-page-item>
    <t-layout-page-item>
      <t-switch v-model="value1" disabled />
    </t-layout-page-item>
  </t-layout-page>
</template>
<script>
export default {
  data() {
    return {
      value: true,
      value1: false
    }
  }
}
</script>