<template>
  <section
    id="t_layout_page_item"
    class="t_layout_page_item"
    :class="{ 't_layout_page_item_bottm_margin': isNoBottomMargin}"
  >
    <slot />
  </section>
</template>
<script>
export default {
  name: 'TLayoutPageItem',
  props: {
    isNoBottomMargin: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
.t_layout_page_item {
  margin: 8px;
  padding: 16px;
  background: #fff;
  border-radius: 4px;
  &.t_layout_page_item_bottm_margin {
    margin-bottom: 0;
  }
}
</style>
