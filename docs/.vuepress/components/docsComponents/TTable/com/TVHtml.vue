<template>
  <div class="t_v_html" v-html="html"></div>
</template>
<script>
export default {
  name: 'TVHtml',
  props: {
    html: String,
  }
}
</script>
