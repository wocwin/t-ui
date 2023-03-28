<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-form
        :ref-obj.sync="formOpts.ref"
        :formOpts="formOpts"
        :widthSize="1"
        isDynamic
        @handleEvent="handleEvent"
        @del="del"
      />
    </t-layout-page-item>
    <t-dialog title="请输入新增项" width="40%" :visible="dialogSelectEnt" @update:visible="cancel">
      <t-form
        :ref-obj.sync="formAdd.ref"
        :formOpts="formAdd"
        :widthSize="1"
        @handleEvent="handleEvent"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSelectEnt = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </t-dialog>
  </t-layout-page>
</template>

<script>
export default {
  name: 'dhFormDemo',
  data() {
    return {
      dialogSelectEnt: false,
      // 动态添加项form表单
      formAdd: {
        ref: null,
        formData: {
          label: null,
          value: null,
          comp: null,
          type: null,
          rules: null,
          bind: null,
          list: null,
          arrLabel: null,
          arrKey: null,
        },
        fieldList: [
          { label: '显示名称', value: 'label', type: 'input', comp: 'el-input' },
          { label: '定义字段', value: 'value', type: 'input', comp: 'el-input' },
          {
            label: '组件名称', value: 'comp', type: 'input', comp: 'el-input', eventHandle: {
              blur: (val, scope) => this.compBlur(val, scope)
            }
          },
          { label: '组件类型', value: 'type', type: 'input', comp: 'el-input' },
          { label: '校验规则', value: 'rules', type: 'input', comp: 'el-input' },
          { label: '自定义属性', value: 'bind', type: 'input', comp: 'el-input' },
        ],
        rules: {
          label: [{ required: true, message: '请输入显示名称', trigger: 'blur' },],
          value: [{ required: true, message: '请输入定义字段', trigger: 'blur' }],
          comp: [{ required: true, message: '请输入组件名称', trigger: 'blur' }],
          type: [{ required: true, message: '请输入组件类型', trigger: 'blur' }],
        },
      },
      // form表单
      formOpts: {
        ref: null,
        formData: {
          account: null, // *用户账号
        },
        fieldList: [
          { label: '账号', value: 'account', type: 'input', comp: 'el-input', event: 'account' },
          // { label: '密码', value: 'password', type: 'password', comp: 'el-input' },
          // { label: '昵称', value: 'name', type: 'input', comp: 'el-input', isTrim: true },
          // { label: '性别', value: 'sex', type: 'select-arr', comp: 'el-select', list: 'sexList', bind: { disabled: false }, arrLabel: 'key', arrKey: 'value' },
          // { label: '平台用户', value: 'accountType', type: 'select-obj', comp: 'el-select', list: 'accountTypeList', childSlotName: 'accountType' },
          // { label: '状态', value: 'status', type: 'select-arr', list: 'statusList', comp: 'el-select', arrLabel: 'key', arrKey: 'value' },
          // { label: '爱好', value: 'hobby', type: 'checkbox', comp: 'el-checkbox-group', list: 'hobbyList', event: 'checkbox' },
          // { label: '手机号码', value: 'phone', type: 'input', comp: 'el-input', bind: { maxlength: 11 } },
          // { label: 'QQ', value: 'qq', type: 'input', comp: 'el-input' },
          // { label: '邮箱', value: 'email', type: 'input', comp: 'el-input' },
          // { label: '计数器', value: 'number', type: 'inputNumber', bind: { controls: false, min: 2, max: 99 }, comp: 'el-input-number' },
          // { label: '描述', value: 'desc', type: 'textarea', comp: 'el-input', widthSize: 1 }
        ],
        operatorList: [
          { label: '提交', type: 'danger', fun: this.submitForm },
          { label: '新增项', type: 'primary', fun: this.add },
          { label: '重置', type: 'primary', fun: this.resetForm },
        ],
        // 相关列表
        listTypeInfo: {
          hobbyList: [
            { label: '吉他', value: '0' },
            { label: '看书', value: '1' },
            { label: '美剧', value: '2' },
            { label: '旅游', value: '3' },
            { label: '音乐', value: '4' }
          ],
          sexList: [
            { key: '女', value: 1 },
            { key: '男', value: 0 }
          ],
          accountTypeList: {
            0: '手机用户',
            1: '论坛用户',
            2: '平台用户'
          },
          statusList: [
            { key: '启用', value: 1 },
            { key: '停用', value: 0 }
          ]
        }
      }
    }
  },
  // 方法
  methods: {
    add() {
      this.dialogSelectEnt = true
    },
    // 删除项
    del(idex) {
      console.log('删除项--idex', idex)
      this.formOpts.fieldList.splice(idex, 1)
    },
    submit() {
      this.formAdd.ref.validate((valid) => {
        if (!valid) return
        console.log('最终数据', this.formAdd.formData)
        let formData = JSON.parse(JSON.stringify(this.formAdd.formData))
        formData.bind = eval('(' + formData.bind + ')')
        formData.rules = eval('(' + formData.rules + ')')
        this.$set(this.formOpts.formData, formData.value, null)
        this.formOpts.fieldList.push(formData)
        console.log('最终数据---22', formData, this.formOpts.fieldList)
        this.cancel()
      })
    },
    cancel() {
      this.dialogSelectEnt = false
      this.formAdd.ref.resetFields()
    },
    compBlur({ type }, { formData }) {
      console.log(`compBlur事件监听${type}：`, type, formData.comp)
      if (formData.comp === 'el-select') {
        let list = [
          { label: '下拉list', value: 'list', type: 'input', comp: 'el-input' },
          { label: 'arrLabel', value: 'arrLabel', type: 'input', comp: 'el-input' },
          { label: 'arrKey', value: 'arrKey', type: 'input', comp: 'el-input' },
        ]
        this.formAdd.fieldList.splice(6, 0, ...list)
        console.log('this.formAdd', this.formAdd)
      } else {
        this.formAdd.fieldList.splice(6, 3)
      }
    },
    // 触发事件
    handleEvent(type, val) {
      switch (type) {
        // case 'comp':
        //   console.log(`handleEvent事件监听${type}：`, val, type)
        //   if (val === 'el-select') {

        //   }
        //   break
      }
    },
    // 提交form表单
    submitForm() {
      this.formOpts.ref.validate((valid) => {
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
