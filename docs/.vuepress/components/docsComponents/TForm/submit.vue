<template>
  <div class="dh-form-demo">
    <el-button type="danger" @click="dialogSelectEnt=true">打开弹窗</el-button>
    <t-dialog
      title="弹窗返回数据"
      width="40%"
      class="ent-choose"
      :visible="dialogSelectEnt"
      @update:visible="dialogSelectEnt = false"
    >
      <t-form :ref-obj.sync="formOpts.ref" ref="dialogForm" :formOpts="formOpts" :widthSize="1" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSelectEnt = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </t-dialog>
  </div>
</template>

<script>
const hobbyList = [
  { label: '吉他', value: '0' },
  { label: '看书', value: '1' },
  { label: '美剧', value: '2' },
  { label: '旅游', value: '3' },
  { label: '音乐', value: '4' }
]
const sexList = [
  { label: '女', value: 1 },
  { label: '男', value: 0 }
]
const statusList = [
  { label: '启用', value: 1 },
  { label: '停用', value: 0 }
]
export default {
  name: 'dhFormDemo',
  data() {
    return {
      dialogSelectEnt: false,
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
          { label: '性别', value: 'sex', placeholder: 'TSelect单选', type: 'select-arr', comp: 't-select', bind: { optionSource: sexList, valueKey: 'value' } },
          { label: '状态', value: 'status', placeholder: 'TSelect单选', type: 'select-arr', comp: 't-select', bind: { optionSource: statusList, valueKey: 'value' } },
          { label: '爱好', value: 'hobby', placeholder: 'TSelect多选', type: 'select-arr', comp: 't-select', list: 'hobbyList', bind: { multiple: true, valueKey: 'value', optionSource: hobbyList } },
          { label: '年份', value: 'createDate', placeholder: 'TDatePicker选择年份', bind: { type: 'year' }, comp: 't-date-picker' },
          { label: '月份范围', value: 'valDate1', comp: 't-date-picker', bind: { type: 'monthrange', isPickerOptions: true } },
          { label: '日期范围', value: 'valDate2', comp: 't-date-picker', bind: { type: 'daterange', isPickerOptions: true } },
          { label: '时间范围', value: 'valDate3', comp: 't-date-picker', bind: { type: 'datetimerange', isPickerOptions: true } },
          { label: '描述', value: 'desc', type: 'textarea', comp: 'el-input', widthSize: 1 }
        ]
      },
    }
  },
  // 方法
  methods: {
    // 提交form表单
    async submit() {
      const { valid, formData } = await this.$refs.dialogForm.validate()
      console.log('表单校验是否通过', valid)
      console.log('获取的表单数据:', formData)
    }
  }
}
</script>
