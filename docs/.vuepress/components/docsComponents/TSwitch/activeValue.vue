<template>
  <t-layout-page>
    <t-layout-page-item>
      <el-tooltip :content="'Switch value: ' + value" placement="top">
        <t-switch
          v-model="value"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-value="100"
          inactive-value="0"
        ></t-switch>
      </el-tooltip>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script>
export default {
  data() {
    return {
      value: '100'
    }
  }
}
</script>