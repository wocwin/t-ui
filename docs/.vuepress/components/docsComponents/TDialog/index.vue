<template>
  <div class="t-dialog-demo" style="width:100%;min-height:100px;padding:15px;">
    <el-button type="danger" @click="openDialog">基本弹窗</el-button>
    <t-dialog
      title="请选择企业"
      width="40%"
      class="ent-choose"
      :visible="dialogSelectEnt"
      @update:visible="cancel"
    >
      <div class="select-ent-box flex-box flex-col">
        <div
          style="width:100%;"
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSelectEnt = false">取 消</el-button>
        <el-button type="primary" @click="dialogSelectEnt = false">确 定</el-button>
      </div>
    </t-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogSelectEnt: false,
      entSelectType: '',
      entList: [{ 'id': 107, 'entName': '上海某某电子商务有限公司', 'entCode': '60003627', 'entType': null, 'entIdPcloud': '717380413542105088' }]
    }
  },
  mounted() {
    this.entSelectType = this.entList[0].id
  },
  // 方法
  methods: {
    openDialog() {
      this.dialogSelectEnt = true
    },
    // 选择企业
    selectType(item) {
      this.entSelectType = item.id
      this.dialogSelectEnt = false
    },
    cancel() {
      this.dialogSelectEnt = false
    }
  }
}
</script>
