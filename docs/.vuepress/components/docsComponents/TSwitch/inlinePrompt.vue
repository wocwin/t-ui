<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-switch v-model="value" :width="120" inlinePrompt active-text="按月付费" inactive-text="按年付费" />
    </t-layout-page-item>
    <t-layout-page-item>
      <t-switch
        v-model="value1"
        inlinePrompt
        :width="120"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="按月付费"
        inactive-text="按年付费"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>
<script>
export default {
  data() {
    return {
      value: true,
      value1: true
    }
  }
}
</script>