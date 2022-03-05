<template>
  <div class="t-form-demo">
    <t-layout sectionTitle="t-simple-form组件运用">
      <div class="content-main" style="padding:15px;">
        <t-simple-form
          :ref-obj.sync="formOpts.ref"
          :formOpts="formOpts"
          :widthSize="3"
          @handleEvent="handleEvent"
        >
          <template #wechat>
            <div style="display:flex;">
              <!-- <label>微信</label> -->
              <el-input v-model="formOpts.formData.wechat" placeholder="自定义输入框插槽"></el-input>
            </div>
          </template>
          <!-- 平台用户下拉子组件自定义插槽 -->
          <template #accountType>
            <el-option
              v-for="(item,key) in formOpts.listTypeInfo.accountTypeList"
              :key="key"
              :label="item"
              :value="key"
            ></el-option>
          </template>
        </t-simple-form>
      </div>
    </t-layout>
  </div>
</template>
<script>
export default {
  name: 'TFormDemo',
  data () {
    return {
      // form表单
      formOpts: {
        // labelPosition: 'top',
        ref: null,
        formData: {
          id: `${Math.floor(Math.random() * 10 + 1)}`, // *唯一ID
          account: '', // *用户账号
          password: '', // *用户密码
          name: '', // *用户昵称
          sex: '', // *性别: 0:男 1:女
          hobby: [], // *爱好: 0:男 1:女
          phone: '', // 手机号码
          createDate: '', // 创建时间
          valDate: '', // el日期选择范围
          wechat: '', // 微信
          qq: '', // qq
          accountType: '', // *用户类型: 0: 手机注册 1: 论坛注册 2: 管理平台添加
          email: '', // 邮箱
          desc: '', // 描述
          number: '', // 计算器
          status: '' // *状态: 0：停用，1：启用(默认为1)',
        },
        fieldList: [
          { label: '账号', value: 'account', type: 'input', comp: 'el-input', event: 'account', widthSize: 1, width: '25%' },
          { label: '密码', value: 'password', type: 'password', comp: 'el-input' },
          { label: '昵称', value: 'name', type: 'input', comp: 'el-input' },
          { label: '性别', value: 'sex', type: 'select-arr', comp: 'el-select', list: 'sexList', bind: { disabled: false }, arrLabel: 'key', arrKey: 'value' },
          { label: '平台用户', value: 'accountType', type: 'select-obj', comp: 'el-select', list: 'accountTypeList', childSlotName: 'accountType' },
          { label: '状态', value: 'status', type: 'select-arr', list: 'statusList', comp: 'el-select', arrLabel: 'key', arrKey: 'value' },
          { label: '爱好', value: 'hobby', type: 'checkbox', comp: 'el-checkbox-group', list: 'hobbyList', event: 'checkbox' },
          { label: '手机号码', value: 'phone', type: 'input', comp: 'el-input', bind: { maxlength: 11 } },
          { label: '创建时间', value: 'createDate', type: 'year', bind: { valueFormat: 'yyyy' }, comp: 'el-date-picker' },
          {
            labelRender: () => {
              return (
                <div class="label_render">
                  <div>ele日期</div>
                  <el-tooltip >
                    <template slot="content">
                      <span>自定义label。</span>
                    </template>
                    <i class="el-icon-warning-outline" style="cursor: pointer;margin-right:2px;" />
                  </el-tooltip>
                </div>
              )
            },
            rules: { required: true, message: '请选择element日期', trigger: 'change' },
            value: 'valDate',
            type: 'daterange',
            comp: 'el-date-picker',
            bind: { rangeSeparator: '-', startPlaceholder: '开始日期', endPlaceholder: '结束日期', valueFormat: 'yyyy-MM-dd' }
          },
          { label: '微信', value: 'wechat', slotName: 'wechat', rules: { required: true, message: '请输入微信', trigger: 'blur' } },
          { label: 'QQ', value: 'qq', type: 'input', comp: 'el-input' },
          { label: '邮箱', value: 'email', type: 'input', comp: 'el-input' },
          { label: '计数器', value: 'number', type: 'inputNumber', bind: { controls: false, min: 2, max: 99 }, comp: 'el-input-number' },
          { label: '描述', value: 'desc', type: 'textarea', comp: 'el-input', className: 't-form-block' }
        ],
        rules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          name: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
          phone: [
            { required: true, message: '请输入手机号码', trigger: 'blur' }
          ],
          sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
          hobby: [
            { type: 'array', required: true, message: '请至少选择一个爱好', trigger: 'change' }
          ]
        },
        operatorList: [
          { label: '提交', type: 'danger', fun: this.submitForm },
          { label: '重置', type: 'primary', fun: this.resetForm },
          { label: '清除校验', type: 'danger', fun: this.clearValidate }
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
    // 触发事件
    handleEvent (type, val) {
      console.log('handleEvent事件', type, val)
      switch (type) {
        case 'account':
          console.log('account', val, type)
          break
        case 'checkbox':
          console.log('checkbox', val, type)
          break
      }
    },
    // 提交form表单
    submitForm () {
      this.formOpts.ref.validate((valid) => {
        console.log(88, valid)
        console.log(77, this.formOpts.formData)
        if (!valid) return
        console.log('最终数据', this.formOpts.formData)
      })
    },
    // 重置form表单
    resetForm () {
      Object.assign(
        this.$data.formOpts.formData,
        this.$options.data().formOpts.formData
      )
      // 清空校验
      this.formOpts.ref.clearValidate()
    },
    // 清除校验
    clearValidate () {
      this.formOpts.ref.clearValidate()
    }
  }
}
</script>
