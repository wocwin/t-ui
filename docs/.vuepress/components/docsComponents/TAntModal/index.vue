<template>
  <div class="dh-modal-demo" style="min-height:100px;width:100%;padding:10px;">
    <a-button type="danger" @click="openDialog">常规弹窗</a-button>
    <t-ant-modal class="ent-choose" title="请选择企业" v-model="visible" @cancel="cancel" @ok="ok">
      <div class="select-ent-box flex-box flex-col">
        <div
          v-for="item in entList"
          :key="item.id"
          class="radio-line-item t-overflow-hidden"
          :class="entSelectType===item.id?'radioSelected':''"
          @click="selectType(item)"
        >
          <i v-if="entSelectType===item.id" class="el-icon-check icon-check"></i>
          {{item.entName}}
          <span style="color:#999;">(企业编码:{{item.entCode}})</span>
        </div>
      </div>
    </t-ant-modal>
  </div>
</template>

<script>
export default {
  name: 'dh-modal-demo',
  data () {
    return {
      visible: false,
      // footer: null, // 隐藏底部
      // dialogStyle: { top: '100px' }, // 弹窗内容距离顶部的距离
      // closable: false, // 是否显示右上角关闭icon
      // wrapClassName: 'header-center', // header 标题居中显示
      // wrapClassName: 'footer-center', // footer 按钮居中显示
      width: '40%',
      title: '请选择企业',
      entSelectType: '',
      entList: [
        { 'id': 107, 'entName': '上海某某电子商务有限公司', 'entCode': '60003627', 'entType': null, 'entIdPcloud': '717380413542105088' },
        { 'id': 108, 'entName': '上海某某电子商务22', 'entCode': '60003627', 'entType': null, 'entIdPcloud': '717380413542105088' }
      ]
    }
  },
  mounted () {
    this.entSelectType = this.entList[0].id
  },
  methods: {
    openDialog () {
      this.visible = true
    },
    // 选择企业
    selectType (item) {
      this.entSelectType = item.id
      this.visible = false
    },
    cancel () {
      this.visible = false
    },
    ok () {
      this.visible = false
    }
  }
}
</script>
