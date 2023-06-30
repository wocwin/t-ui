<template>
  <!--  请勿删除，用于处理路由菜单层级嵌套未调整组件导致的布局组件叠加问题-->
  <section>
    <router-view />
  </section>
</template>
<script>
export default {
  name: 'ViewBox'
}
</script>
