<template>
  <div class="pdf" :style="{height:height}">
    <iframe :src="src" style="width:100%;height:100%;padding: 10px;" frameborder="0"></iframe>
  </div>
</template>
<script>
export default {
  name: 'TAntProtocol',
  props: {
    // 协议高度
    height: {
      type: String,
      default: '700px'
    },
    // 协议地址
    src: {
      type: String
    }
  }
}
</script>
