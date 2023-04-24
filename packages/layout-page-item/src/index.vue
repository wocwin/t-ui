<template>
  <section id="t_layout_page_item" class="t_layout_page_item">
    <slot />
  </section>
</template>
<script>
export default {
  name: 'TLayoutPageItem'
}
</script>
<style lang="scss" scoped>
.t_layout_page_item {
  margin: 8px;
  padding: 16px;
  background: #fff;
  border-radius: 4px;
}
</style>
