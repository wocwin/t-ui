<template>
  <el-button v-bind="$attrs" @click="handleClick">
    <slot />
  </el-button>
</template>
<script>
export default {
  name: 'TButton',
  props: {
    time: {
      type: Number,
      default: 1000
    }
  },
  data () {
    return {
      record: 0
    }
  },
  methods: {
    handleClick () {
      let newTime = new Date()
      if (newTime.getTime() - this.record > this.time) {
        this.$emit('click')
      }
      this.record = (new Date()).getTime()
    }
  }
}
</script>
