<template>
  <div class="dh-modal-protocol" style="min-height:100px;width:100%;padding:10px;">
    <a-button type="danger" @click="openDialog">协议弹窗</a-button>
    <t-ant-modal
      class="ent-choose"
      title="打开*******************协议"
      v-model="visible"
      width="60%"
      @cancel="cancel"
      :footer="null"
    >
      <t-ant-protocol :src="src" />
    </t-ant-modal>
  </div>
</template>

<script>
export default {
  name: 'dh-modal-protocol',
  data () {
    return {
      visible: false,
      // dialogStyle: { top: '100px' }, // 弹窗内容距离顶部的距离
      // closable: false, // 是否显示右上角关闭icon
      // wrapClassName: 'header-center', // header 标题居中显示
      // wrapClassName: 'footer-center', // footer 按钮居中显示
      width: '60%',
      title: '打开*******************协议',
      src: '/'
    }
  },
  methods: {
    openDialog () {
      this.visible = true
    },
    cancel () {
      this.visible = false
    }
  }
}
</script>
