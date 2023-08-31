<template>
  <t-layout-page>
    <t-layout-page-item>
      <el-button type="danger" @click="add">新增</el-button>
      <el-button type="danger" @click="edit">编辑</el-button>
    </t-layout-page-item>
    <t-dialog
      :title="title"
      width="40%"
      :visible="isShowEditDialog"
      @update:visible="isShowEditDialog = false"
    >
      <t-form
        :ref-obj.sync="formOpts.ref"
        :formOpts="formOpts"
        :listTypeInfo="formOpts.listTypeInfo"
        :widthSize="1"
      />
      <template #footer>
        <el-button @click="isShowEditDialog = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </template>
    </t-dialog>
  </t-layout-page>
</template>
<script>
export default {
  data() {
    return {
      title: '',
      isShowEditDialog: false,
      formOpts: {
        ref: null,
        formData: {
          deviceInstanceCode: null,
          createDeptCode: null,
          outsourcing: 0, // 是否委外维修(0否，1委外)
          faultDescription: null,
        },
        fieldList: [
          { label: '设备编号', value: 'deviceInstanceCode', type: 'input', comp: 'el-input' },
          {
            label: '下拉选择表格', value: 'createDeptCode', placeholder: 't-select-table使用', comp: 't-select-table', isSelfCom: true, bind: {
              multiple: true,
              maxHeight: 400,
              keywords: { label: 'name', value: 'id' },
              table: { data: [] },
              columns: [
                { label: '物料编号', width: '100px', prop: 'code', align: 'left' },
                { label: '物料名称', width: '149px', prop: 'name' },
                { label: '规格', width: '149px', prop: 'spec' },
                { label: '单位', width: '110px', prop: 'unitName' },
                { label: '物料编号1', width: '149px', prop: 'code' },
                { label: '物料名称1', width: '149px', prop: 'name' },
              ],
            },
            eventHandle: {
              selectionChange: (val, ids) => this.selectionChangeHandler(val, ids)
            }
          },
          { label: '是否委外维修', value: 'outsourcing', type: 'radio', comp: 'el-radio-group', list: 'radioList' },
          { label: '故障说明', value: 'faultDescription', type: 'textarea', comp: 'el-input' },
        ],
        listTypeInfo: {
          radioList: [
            { label: '是', value: 1 },
            { label: '否', value: 0 }
          ]
        },
      },
    }
  },
  mounted() {
    const tableData = [
      { id: 1, code: 1, name: '物料名称1', spec: '物料规格1', unitName: '吨' },
      { id: 2, code: 2, name: '物料名称2', spec: '物料规格2', unitName: '吨' },
      { id: 3, code: 3, name: '物料名称3', spec: '物料规格3', unitName: '吨' },
      { id: 4, code: 4, name: '物料名称4', spec: '物料规格4', unitName: '吨' },
      { id: 5, code: 5, name: '物料名称5', spec: '物料规格5', unitName: '吨' },
      { id: 6, code: 6, name: '物料名称6', spec: '物料规格6', unitName: '吨' },
      { id: 7, code: 7, name: '物料名称7', spec: '物料规格7', unitName: '吨' },
      { id: 8, code: 8, name: '物料名称8', spec: '物料规格8', unitName: '吨' },
      { id: 9, code: 9, name: '物料名称9', spec: '物料规格9', unitName: '吨' }
    ]
    this.formOpts.fieldList.map(val => {
      if (val.value === 'createDeptCode') {
        val.bind.table.data = tableData
      }
    })
  },
  methods: {
    // 下拉选择表格组件赋值
    selectionChangeHandler(val, ids) {
      console.log('复选框', val)
      console.log('复选框--id', ids)
      this.formOpts.formData.createDeptCode = ids
      localStorage.setItem('selectTableData', JSON.stringify(this.formOpts.formData.createDeptCode))
    },
    add() {
      console.log('点击新增')
      this.isShowEditDialog = true
      this.title = '新增'
    },
    edit() {
      this.isShowEditDialog = true
      this.title = '编辑'
      this.formOpts.formData.createDeptCode = JSON.parse(localStorage.getItem('selectTableData'))
      console.log('点击编辑', this.formOpts.formData)
    },
    submitForm() {
      this.formOpts.ref.validate((valid) => {
        console.log(88, valid)
        if (!this.formOpts.formData.createDeptCode) {
          this.$message.warning('请先选择下拉表格数据！')
          return
        }
        if (!valid) return
        console.log('最终数据', this.formOpts.formData)
        localStorage.setItem('selectTableData', JSON.stringify(this.formOpts.formData.createDeptCode))
        this.isShowEditDialog = false
      })
    }
  }
}
</script>