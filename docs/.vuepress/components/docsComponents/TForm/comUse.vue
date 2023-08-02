<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-form :ref-obj.sync="formOpts.ref" :formOpts="formOpts" :widthSize="1" />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script>
export default {
  name: 'dhFormDemo',
  data() {
    return {
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
          status: null // *状态: 0：停用，1：启用(默认为1)',
        },
        fieldList: [
          { label: '性别', value: 'sex', placeholder: 'TSelect单选', type: 'select-arr', comp: 't-select', list: 'sexList', arrLabel: 'label', arrKey: 'key', bind: {} },
          { label: '状态', value: 'status', placeholder: 'TSelect单选', type: 'select-arr', comp: 't-select', list: 'statusList', arrLabel: 'label', arrKey: 'key', bind: {} },
          { label: '爱好', value: 'hobby', placeholder: 'TSelect多选', type: 'select-arr', comp: 't-select', list: 'hobbyList', arrLabel: 'label', arrKey: 'key', bind: { multiple: true } },
          { label: '年份', value: 'createDate', placeholder: 'TDatePicker选择年份', type: 'year', bind: { type: 'year' }, comp: 't-date-picker' },
          { label: '月份范围', value: 'valDate1', comp: 't-date-picker', bind: { type: 'monthrange', isPickerOptions: true } },
          { label: '日期范围', value: 'valDate2', comp: 't-date-picker', bind: { type: 'daterange', isPickerOptions: true } },
          { label: '时间范围', value: 'valDate3', comp: 't-date-picker', bind: { type: 'datetimerange', isPickerOptions: true } },
          { label: '描述', value: 'desc', type: 'textarea', comp: 'el-input', widthSize: 1 }
        ],
        operatorList: [
          { label: '提交', type: 'danger', fun: this.submitForm },
          { label: '重置', type: 'primary', fun: this.resetForm },
        ],
        listTypeInfo: {
          hobbyList: [],
          sexList: [],
          statusList: [],
        }
      },
    }
  },
  created() {
    this.getSelectList()
  },
  // 方法
  methods: {
    getSelectList() {
      this.formOpts.listTypeInfo.hobbyList = [
        { label: '吉他', key: '0' },
        { label: '看书', key: '1' },
        { label: '美剧', key: '2' },
        { label: '旅游', key: '3' },
        { label: '音乐', key: '4' }
      ]
      this.formOpts.listTypeInfo.sexList = [
        { label: '女', key: 1 },
        { label: '男', key: 0 }
      ]
      this.formOpts.listTypeInfo.statusList = [
        { label: '启用', key: 1 },
        { label: '停用', key: 0 }
      ]
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
    // 重置form表单
    resetForm() {
      Object.assign(
        this.$data.formOpts.formData,
        this.$options.data().formOpts.formData
      )
    }
  }
}
</script>
