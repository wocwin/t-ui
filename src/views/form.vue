<template>
  <div class="form-data">
    <t-form
      :ref-obj.sync="formInfo.ref"
      :form-data="formInfo.formData"
      :field-list="formInfo.fieldList"
      :rules="formInfo.rules"
      :operator-list="formInfo.operatorList"
      :label-width="formInfo.labelWidth"
      :list-type-info="listTypeInfo"
      @handleClick="handleClick"
      @handleEvent="handleEvent"
    >
      <!-- 自定义插槽-选择头像 -->
      <template #form-avatar>
        <div class="slot-avatar">
          <img v-imgAlart :src="formInfo.formData.avatar" style="height: 30px;" />
          <el-button
            type="primary"
            icon="el-icon-picture"
            size="mini"
            @click="handleClick('selectFile')"
          >{{ formInfo.formData.avatar ? '更换头像' : '选择头像' }}</el-button>
        </div>
      </template>
    </t-form>
  </div>
</template>
<script>
export default {
  name: 'formData',
  data () {
    return {
      formInfo: {
        ref: null,
        formData: {
          id: '', // *唯一ID
          account: '', // *用户账号
          password: '', // *用户密码
          name: '', // *用户昵称
          type: 2, // *用户类型: 0: 手机注册 1: 论坛注册 2: 管理平台添加
          sex: '', // *性别: 0:男 1:女
          hobby: [], // *爱好: 0:男 1:女
          avatar: '', // 头像
          phone: '', // 手机号码
          wechat: '', // 微信
          qq: '', // qq
          email: '', // 邮箱
          desc: '', // 描述
          status: 1 // *状态: 0：停用，1：启用(默认为1)',
        },
        fieldList: [
          { label: '账号', value: 'account', type: 'input' },
          { label: '密码', value: 'password', type: 'password' },
          { label: '昵称', value: 'name', type: 'input' },
          { label: '性别', value: 'sex', type: 'select', list: 'sexList' },
          { label: '爱好', value: 'hobby', type: 'checkbox', list: 'hobbyList' },
          { label: '头像', value: 'avatar', type: 'slot', className: 'el-form-block' },
          { label: '手机号码', value: 'phone', type: 'input' },
          { label: '微信', value: 'wechat', type: 'input' },
          { label: 'QQ', value: 'qq', type: 'input' },
          { label: '邮箱', value: 'email', type: 'input' },
          { label: '描述', value: 'desc', type: 'textarea', className: 'el-form-block' },
          { label: '状态', value: 'status', type: 'select', list: 'statusList' }
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
        ],
        labelWidth: '120px'
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
        accountTypeList: [
          { key: '手机用户', value: 0 },
          { key: '论坛用户', value: 1 },
          { key: '平台用户', value: 2 }
        ],
        statusList: [
          { key: '启用', value: 1 },
          { key: '停用', value: 0 }
        ]
      }
    }
  },
  // 方法
  methods: {
    // 按钮点击
    handleClick (event, data) {
    },
    // 触发事件
    handleEvent (event, data) {
    },
    // 提交form表单
    submitForm () {
      this.formInfo.ref.validate((valid) => {
        console.log(88, valid)
        if (!valid) return
        console.log(77, this.formInfo.formData)
      })
    },
    // 重置form表单
    resetForm () {
      Object.assign(this.$data.formInfo.formData, this.$options.data().formInfo.formData)
    }
  }
}
</script>
<style lang="scss">
.form-data {
  margin: 0 auto;
  padding: 40px;
  width: 900px;
  .slot-avatar {
    height: 40px;
    display: flex;
    align-items: center;
    img {
      padding-right: 10px;
    }
  }
}
</style>
