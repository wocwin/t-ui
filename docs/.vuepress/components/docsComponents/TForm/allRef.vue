<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-form
        :ref-obj.sync="formOpts.ref"
        :formOpts="formOpts"
        :widthSize="2"
        ref="formAllRefs"
        :all-ref.sync="allRefs"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script>
import cascaderData from './cascaderData.json'
export default {
  name: 'dhFormDemo',
  data() {
    return {
      hobbyList: [],
      sexList: [],
      statusList: [],
      // form表单
      formOpts: {
        ref: null,
        formData: {
          sex: null, // *性别: 0:男 1:女
          hobby: null, // *爱好: 0:男 1:女
          createDate: null, // 年份
          valDate1: null, // 月份范围
          valDate2: null, // 日期范围
          valDate3: null, // 时间范围
          desc: null, // 描述
          deptCode: null,
          deptCode1: null,
          deptCode2: null,
          status1: null,
          status: null // *状态: 0：停用，1：启用(默认为1)',
        },
        fieldList: [
          {
            label: '性别', value: 'sex', placeholder: 'TSelect单选', ref: 'sexRef', comp: 't-select', isSelfCom: true, bind: { optionSource: [] }, eventHandle: {
              change: (val, scope) => this.changeSex(val, scope),
            }
          },
          { label: '状态(继承list)', value: 'status1', placeholder: 'TSelect继承list方式', ref: 'status1Ref', type: 'select-arr', comp: 't-select', list: 'statusList', arrLabel: 'label', arrKey: 'key', bind: {} },
          { label: '状态', value: 'status', placeholder: 'TSelect单选', comp: 't-select', ref: 'statusRef', isSelfCom: true, bind: { optionSource: [] } },
          { label: '爱好', value: 'hobby', placeholder: 'TSelect多选', comp: 't-select', ref: 'hobbyRef', isSelfCom: true, bind: { multiple: true, optionSource: [] } },
          { label: '部门', value: 'deptCode', placeholder: 'TCascader使用', comp: 't-cascader', ref: 'TCascaderRef', isSelfCom: true, bind: { props: { emitPath: false, children: 'children', label: 'deptName', value: 'deptNum', checkStrictly: true, }, options: [] } },
          { label: '部门1', value: 'deptCode1', placeholder: 'el-cascader使用', comp: 'el-cascader', ref: 'ElCascaderRef', isSelfCom: true, bind: { props: { emitPath: false, children: 'children', label: 'deptName', value: 'deptNum', checkStrictly: true, }, options: [] } },
          {
            label: '下拉选择表格', value: 'deptCode2', placeholder: 't-select-table使用', comp: 't-select-table', ref: 'selectTableRef-deptCode2', isSelfCom: true, bind: {
              isKeyup: true,
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
              radioChange: (val) => this.radioChange(val)
            }
          },
          { label: '年份', value: 'createDate', placeholder: 'TDatePicker选择年份', type: 'year', ref: 'createDateRef', bind: { type: 'year' }, comp: 't-date-picker' },
          { label: '月份范围', value: 'valDate1', comp: 't-date-picker', ref: 'valDate1Ref', bind: { type: 'monthrange', isPickerOptions: true } },
          { label: '日期范围', value: 'valDate2', comp: 't-date-picker', ref: 'valDate2Ref', bind: { type: 'daterange', isPickerOptions: true } },
          { label: '时间范围', value: 'valDate3', comp: 't-date-picker', ref: 'valDate3Ref', bind: { type: 'datetimerange', isPickerOptions: true } },
          { label: '描述', value: 'desc', type: 'textarea', ref: 'descRef', comp: 'el-input', widthSize: 1 }
        ],
        operatorList: [
          { label: '提交', type: 'danger', fun: this.submitForm },
          { label: '重置', type: 'primary', fun: this.resetForm },
          {
            label: "重置下拉表格",
            bind: { type: "primary" },
            fun: () => this.resetValue("selectTableRef-deptCode2")
          },
          { label: "重置性别", bind: { type: "primary" }, fun: () => this.resetValue("sexRef") },
          { label: "重置状态1", bind: { type: "primary" }, fun: () => this.resetValue("status1Ref") },
          { label: "重置状态", bind: { type: "primary" }, fun: () => this.resetValue("statusRef") },
          { label: "重置爱好", bind: { type: "primary" }, fun: () => this.resetValue("hobbyRef") },
          { label: "重置TCascader", bind: { type: "primary" }, fun: () => this.resetValue("TCascaderRef", 'deptCode') },
          { label: "重置elCascader", bind: { type: "primary" }, fun: () => this.resetValue("ElCascaderRef", 'deptCode1') },
          { label: "重置年份", bind: { type: "primary" }, fun: () => this.resetValue("createDateRef") },
          { label: "重置月份范围", bind: { type: "primary" }, fun: () => this.resetValue("valDate1Ref") },
          { label: "重置日期范围", bind: { type: "primary" }, fun: () => this.resetValue("valDate2Ref") },
          { label: "重置时间范围", bind: { type: "primary" }, fun: () => this.resetValue("valDate3Ref") },
          { label: "重置描述", bind: { type: "primary" }, fun: () => this.resetValue("descRef") },
        ],
        listTypeInfo: {
          statusList: [],
        }
      },
      allRefs: {}
    }
  },
  async created() {
    await this.getSelectList()
  },
  mounted() {
    console.log('所有refs', this.allRefs)
  },
  methods: {
    getSelectList() {
      this.hobbyList = [
        { label: '吉他', key: '0' },
        { label: '看书', key: '1' },
        { label: '美剧', key: '2' },
        { label: '旅游', key: '3' },
        { label: '音乐', key: '4' }
      ]
      this.sexList = [
        { label: '女', key: 1 },
        { label: '男', key: 0 }
      ]
      this.formOpts.listTypeInfo.statusList = [
        { label: '启用', key: 1 },
        { label: '停用', key: 0 }
      ]
      this.statusList = [
        { label: '启用', key: 1 },
        { label: '停用', key: 0 }
      ]
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
      const res = cascaderData
      this.formOpts.fieldList.map(val => {
        switch (val.value) {
          case 'sex':
            val.bind.optionSource = this.sexList
            break
          case 'status':
            val.bind.optionSource = this.statusList
            break
          case 'hobby':
            val.bind.optionSource = this.hobbyList
            break
          case 'deptCode':
          case 'deptCode1':
            val.bind.options = res.data
            break
          case 'deptCode2':
            val.bind.table.data = tableData
            // console.log('11--', val)
            break
        }
      })
    },
    changeSex(val, scope) {
      console.log('选择性别change事件', val, scope)
    },
    // 下拉选择表格组件赋值
    radioChange(val) {
      console.log('下拉选择表格组件赋值', val)
      this.formOpts.formData.deptCode2 = val.name
    },
    // 提交form表单
    submitForm() {
      this.formOpts.ref.validate((valid) => {
        console.log(88, valid)
        console.log(77, this.formOpts.formData)
        if (!valid) return
        console.log('最终数据', this.formOpts.formData)
      })
    },
    // 重置单个表单项的Ref
    resetValue(type, val) {
      if (type.includes('Cascader')) {
        this.formOpts.formData[val] = []
      } else if (type == 'descRef') {
        this.formOpts.formData.desc = ''
      } else {
        this.allRefs[type][0].clear()
      }
    },
    // 重置form表单
    resetForm() {
      this.$refs.formAllRefs.resetFieldsSelf()
    }
  }
}
</script>
