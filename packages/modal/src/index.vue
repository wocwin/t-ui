<template>
  <a-modal v-modal-drag v-bind="attrs" v-on="$listeners">
    <template v-for="(index, name) in $slots" :slot="name">
      <slot :name="name" />
    </template>
  </a-modal>
</template>
<script>
export default {
  name: 'TAntModal',
  model: {
    prop: 'visible',
    event: 'change'
  },
  computed: {
    attrs () {
      return {
        cancelText: '取消',
        okText: '确定',
        maskClosable: false,
        ...this.$attrs
      }
    }
  }
}
</script>
<style lang="scss">
.header-center {
  .ant-modal-header {
    .ant-modal-title {
      text-align: center;
    }
  }
}
.footer-center {
  .ant-modal-footer {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
}
</style>
