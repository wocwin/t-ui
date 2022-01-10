<template>
  <div class="t-phone">
    <el-dialog
      v-dialogDrag
      :width="phoneWidth"
      :title="phoneTitle"
      :visible="phoneVisible"
      :before-close="handleClose"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form :model="phoneForm" ref="phoneForm" :rules="phoneFormRules" label-width="100px">
        <div class="el-row form-horizontal">
          <el-form-item
            v-if="!isApplicationShow"
            label="手机号"
            class="el-col-lg-12 el-col-md-14 el-col-sm-18 el-col-xs-20"
          >{{phoneForm.phone}}</el-form-item>
          <div
            v-if="isApplicationShow"
            class="t-margin-left-15 t-margin-bottom-15"
            style="white-space:nowrap;"
          >短信验证码将发送到贵司{{personTxt}}手机号：{{phoneForm.phone}}</div>
        </div>
        <div class="el-row form-horizontal">
          <el-form-item
            label="短信验证码"
            prop="code"
            class="el-col-lg-16 el-col-md-18 el-col-sm-22 el-col-xs-24 sms-code"
          >
            <el-input v-number type="text" v-model="phoneForm.code" maxlength="6" clearable></el-input>
            <t-timer-btn class="timer" :second="second" @click="sendCode" />
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="cancel">取消</el-button>
        <el-button type="primary" @click="phoneConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TTimerBtn from '../../timer-btn'
export default {
  name: 'TPhone',
  components: { TTimerBtn },
  data () {
    return {
      remark: '',
      second: 60,
      phoneDialog: this.phoneVisible,
      phoneForm: {
        phone: this.legalPhone,
        code: ''
      },
      phoneFormRules: {
        code: [
          { required: true, message: '请输入短信验证码', trigger: 'blur' }
        ]
      }
    }
  },
  props: {
    isApplicationShow: { // 用款申请手机验证展示语
      type: Boolean,
      default: true
    },
    phoneVisible: { // 手机号验证弹框
      type: Boolean,
      default: false
    },
    personTxt: {
      type: String
    },
    // 获取法人号码
    legalPhone: {
      type: [String, Number]
    },
    phoneTitle: {
      type: String,
      default: '手机验证'
    },
    phoneWidth: {
      type: String,
      default: '50%'
    }
  },
  watch: {
    phoneVisible (val) {
      this.phoneDialog = val
    }
  },
  methods: {
    cancel () {
      this.$emit('update:visible', false)
    },
    handleClose () {
      this.$emit('update:visible', false)
    },
    // 手机验证确定
    phoneConfirm () {
      this.$refs.phoneForm.validate(valid => {
        if (valid) {
          this.phoneDialog = false
          this.$emit('phoneConfirm', this.phoneForm.code)
        } else {
          return false
        }
      })
    },
    // 表单重置
    reset () {
      this.$refs.phoneForm.resetFields()
    },
    // 发送验证码
    async sendCode () {
      await this.$ajaxRequest('get', 'sendPhoneVerify', { phone: this.phoneForm.phone })
    }
  }
}
</script>
<style lang="scss">
.sms-code {
  .el-input__inner {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .timer {
    .sendSmsBtn {
      border-top-left-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
      margin-bottom: 1px;
    }
  }
  .el-form-item__content {
    display: flex;
    align-items: center;
  }
}
</style>
