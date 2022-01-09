<template>
  <section class="dh_layout_page_item">
    <slot />
  </section>
</template>
<script>
export default {
  name: 'TLayoutPageItem'
}
</script>
<style lang="scss" scoped>
.dh_layout_page_item {
  margin: 8px;
  padding: 16px;
  background: #fff;
  border-radius: 4px;
}
</style>
