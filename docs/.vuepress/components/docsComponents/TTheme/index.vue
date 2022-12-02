<template>
  <t-layout-page>
    <t-layout-page-item>
      <span>主题颜色设置：</span>
      <t-theme v-model="theme" @change="themeChange" />
    </t-layout-page-item>
  </t-layout-page>
</template>
<script>
import variables from '../../../public/css/element-variables.scss'
import Cookies from 'js-cookie'
export default {
  name: 't-theme-demo',
  data() {
    return {
      theme: Cookies.get('t-ui-theme') || variables.theme
    }
  },
  methods: {
    // 主题颜色
    themeChange(val) {
      console.log('当前主题颜色----', val)
      // this.theme = val
      Cookies.set('t-ui-theme', val)
    },
  }
}
</script>
