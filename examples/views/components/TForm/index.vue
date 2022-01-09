<template>
  <div class="form-data">
    <t-layout sectionTitle="表单组件">
      <div class="content-main t-margin20">
        <t-form
          :ref-obj.sync="formInfo.ref"
          :form-data="formInfo.formData"
          :field-list="formInfo.fieldList"
          :rules="formInfo.rules"
          :operator-list="formInfo.operatorList"
          :list-type-info="listTypeInfo"
          @handleEvent="handleEvent"
        >
          <!-- 自定义插槽-选择头像 -->
          <template #form-avatar>
            <div
              class="slot-avatar"
              v-for="checkedItem in uploadFile.checkedList"
              :key="checkedItem.type"
            >
              <t-upload-file
                :attachmentType="checkedItem.type"
                @uploadSuccess="pushUploadItem"
                @deleteSuccess="pushUploadItem"
              />
            </div>
          </template>
        </t-form>
      </div>
    </t-layout>
  </div>
</template>
<script>
export default {
  name: 'formData',
  data () {
    const isEmail = (rule, value, callback) => {
      const reg = /^([a-z0-9A-Z]+[-|._]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-zA-Z]{2,}$/
      if (!reg.test(value)) {
        callback(new Error('请输入正确格式的邮箱'))
      } else {
        callback()
      }
    }
    return {
      // uploadFile上传图片
      uploadFile: {
        fmFileList: [],
        uploadObj: {},
        checkedList: [
          {
            check: true,
            type: '001'
          }
        ]
      },
      // form表单
      formInfo: {
        ref: null,
        formData: {
          id: '', // *唯一ID
          account: '', // *用户账号
          password: '', // *用户密码
          name: '', // *用户昵称
          type: '', // *用户类型: 0: 手机注册 1: 论坛注册 2: 管理平台添加
          sex: '', // *性别: 0:男 1:女
          hobby: [], // *爱好: 0:男 1:女
          phone: '', // 手机号码
          createDate: '', // 创建时间
          startDate: '', // 开始日期
          endDate: '', // 结束日期
          wechat: '', // 微信
          qq: '', // qq
          accountType: '',
          email: '', // 邮箱
          desc: '', // 描述
          status: '' // *状态: 0：停用，1：启用(默认为1)',
        },
        fieldList: [
          { label: '账号', value: 'account', type: 'input', event: 'account' },
          { label: '密码', value: 'password', type: 'password' },
          { label: '昵称', value: 'name', type: 'input' },
          { label: '性别', value: 'sex', type: 'select', list: 'sexList', arrLabel: 'key', arrKey: 'value' },
          { label: '平台用户', value: 'accountType', type: 'select-obj', list: 'accountTypeList' },
          { label: '状态', value: 'status', type: 'select', list: 'statusList', arrLabel: 'key', arrKey: 'value' },
          { label: '爱好', value: 'hobby', type: 'checkbox', list: 'hobbyList', event: 'checkbox' },
          { label: '头像', value: 'avatar', type: 'slot', className: 't-form-block' },
          { label: '手机号码', value: 'phone', type: 'input' },
          { label: '创建时间', value: 'createDate', type: 'date', dateType: 'year', format: 'yyyy' },
          { label: '时间范围', startDate: 'startDate', endDate: 'endDate', type: 't-date', event: 'date' },
          { label: '微信', value: 'wechat', type: 'input' },
          { label: 'QQ', value: 'qq', type: 'input' },
          { label: '邮箱', value: 'email', type: 'input', rules: [{ required: true, message: '邮箱不能为空！' }, { validator: isEmail }] },
          { label: '描述', value: 'desc', type: 'textarea', className: 't-form-block' }
        ],
        rules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入昵称', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号码', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          hobby: [
            { type: 'array', required: true, message: '请至少选择一个爱好', trigger: 'change' }
          ]
        },
        operatorList: [
          { label: '提交', type: 'danger', fun: this.submitForm },
          { label: '重置', type: 'primary', fun: this.resetForm }
        ]
      },
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
          0: '手机用户', 1: '论坛用户', 2: '平台用户'
        },
        statusList: [
          { key: '启用', value: 1 },
          { key: '停用', value: 0 }
        ]
      }
    }
  },
  // 方法
  methods: {
    // 上传头像
    pushUploadItem (val, attachmentType) {
      console.log(val, attachmentType)
      const attachmentNo = val.res
      this.uploadFile.uploadObj[attachmentType] = attachmentNo
      if (!this.uploadFile.uploadObj[attachmentType] || this.uploadFile.uploadObj[attachmentType].length === 0) {
        delete this.uploadFile.uploadObj[attachmentType]
      }
      const tempFileList = []
      for (const key of Object.keys(this.uploadFile.uploadObj)) {
        const uploadListItem = {
          attachmentNo: this.uploadFile.uploadObj[key],
          attachmentType: key
        }
        tempFileList.push(uploadListItem)
      }
      this.uploadFile.fmFileList = tempFileList
    },
    // 触发事件
    handleEvent (type, val, key) {
      switch (type) {
        // 日期显示
        case 'date':
          console.log(1111111, val, type, key)
          this.formInfo.formData[key] = val
          break
        case 'checkbox':
          console.log(2222, val, type, key)
          break
      }
    },
    // 提交form表单
    submitForm () {
      this.formInfo.ref.validate((valid) => {
        console.log(88, valid)
        console.log(77, this.formInfo.formData)
        if (!valid) return
        console.log(999, this.formInfo.formData)
      })
    },
    // 重置form表单
    resetForm () {
      Object.assign(this.$data.formInfo.formData, this.$options.data().formInfo.formData)
    }
  }
}
</script>
