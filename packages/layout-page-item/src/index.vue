<template>
  <section
    id="t_layout_page_item"
    class="t_layout_page_item"
    :class="{ 'page_item_no_margin': isNoMargin}"
  >
    <slot />
  </section>
</template>
<script>
export default {
  name: 'TLayoutPageItem',
  props: {
    isNoMargin: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
.t_layout_page_item {
  padding: 16px;
  background: #fff;
  border-radius: 4px;
  &.page_item_no_margin {
    margin: 0;
    padding: 0;
  }
}
</style>
