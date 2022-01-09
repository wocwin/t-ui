<template>
  <div class="t-remark">
    <el-dialog
      v-dialogDrag
      :title="remarkTitle"
      :visible="remarkDialog"
      :width="remarkWidth"
      :before-close="handleClose"
    >
      <el-input type="textarea" placeholder="请输入备注" v-model="remark" show-word-limit clearable></el-input>
      <el-dialog
        v-dialogDrag
        :width="phoneWidth"
        :title="phoneTitle"
        :visible="phoneDialog"
        :before-close="phoneHandleClose"
        append-to-body
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
            >短信验证码将发送到贵司法人手机号：{{phoneForm.phone}}</div>
          </div>
          <!-- <div class="el-row form-horizontal">
            <el-form-item label="图片验证码" prop="imgCode" class="el-col-12">
              <el-input type="text" v-model="phoneForm.imgCode" clearable></el-input>
            </el-form-item>
          </div>-->
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
          <el-button type="danger" @click="phoneCancel">取消</el-button>
          <el-button type="primary" @click="phoneConfirm">确定</el-button>
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="cancel">取消</el-button>
        <el-button type="primary" v-if="isPhone" @click="remarkOpen">确定</el-button>
        <el-button type="primary" v-if="!isPhone" @click="remarkConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TTimerBtn from '../../timer-btn'
export default {
  name: 'TRemark',
  components: { TTimerBtn },
  data () {
    return {
      phoneRemark: '',
      remark: '',
      second: 60,
      remarkDialog: this.remarkVisible,
      phoneDialog: false, // 手机验证
      phoneForm: {
        phone: this.legalPhone,
        // imgCode: '',
        code: ''
      },
      phoneFormRules: {
        // imgCode: [
        //   { required: true, message: '请输入图片验证码', trigger: 'blur' }
        // ],
        code: [{ required: true, message: '请输入短信验证码', trigger: 'blur' }]
      }
    }
  },
  computed: {
    // phone () {
    //   return this.$store.getters.phone
    // }
  },
  watch: {
    remarkVisible: {
      handler (val) {
        this.remarkDialog = val
      },
      immediate: true
    },
    isPhone: {
      handler (val) {
        console.log('phone', val)
        this.isPhone = val
      },
      immediate: true
    }
  },
  props: {
    isApplicationShow: {
      // 用款申请手机验证展示语
      type: Boolean,
      default: false
    },
    remarkVisible: {
      // 备注弹框
      type: Boolean,
      default: false
    },
    remarkTitle: {
      type: String,
      default: '备注'
    },
    remarkWidth: {
      type: String,
      default: '50%'
    },
    // 获取法人号码
    legalPhone: {
      type: String,
      default: '10000'
    },
    checkRemark: {
      // 备注是否必填
      type: Boolean,
      defalut: true
    },
    phoneTitle: {
      type: String,
      default: '手机验证'
    },
    phoneWidth: {
      type: String,
      default: '40%'
    },
    isPhone: {
      // 是否需要手机验证
      type: Boolean,
      default: false
    },
    callBackFunc: {
      type: Function,
      default: null
    },
    callBackFuncParam: {
      type: String,
      default: null
    }
  },
  methods: {
    cancel () {
      this.remark = ''
      this.$emit('update:visible', false)
    },
    handleClose () {
      this.remark = ''
      this.$emit('update:visible', false)
    },
    phoneHandleClose () {
      this.phoneDialog = false
      this.reset()
    },
    phoneCancel () {
      this.phoneDialog = false
      this.reset()
    },
    // 备注确定并传参
    remarkConfirm () {
      if (this.checkRemark && !this.remark) {
        this.$message({ message: '请填写备注' })
        return
      }
      // console.log('callback', this.callBackFunc)
      // console.log('callbackP', this.callBackFuncParam)
      this.$emit(
        'remarkConfirm',
        this.remark,
        this.callBackFunc,
        this.callBackFuncParam
      )
      // this.remark = ''
    },
    // 备注确定打开手机验证
    remarkOpen () {
      if (this.checkRemark && !this.remark) {
        this.$message({ message: '请填写备注' })
        return
      }
      this.phoneDialog = true
      this.$emit('remarkOpen', false)
      this.phoneRemark = this.remark
      this.remark = ''
    },
    // 手机验证确定
    phoneConfirm () {
      this.$refs.phoneForm.validate(valid => {
        if (valid) {
          // this.phoneForm.phone = '13075624042'
          this.phoneDialog = false
          this.$emit(
            'phoneConfirm',
            this.phoneRemark,
            this.callBackFunc,
            this.callBackFuncParam,
            this.phoneForm.code
          )
          this.reset()
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
    sendCode () {
      this.$emit('sendPhoneVerify', this.phoneForm.phone)
    }
  }
}
</script>
<style lang="scss">
.t-remark {
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
  .timer-btn {
    position: relative;
    .sendSmsBtn {
      height: 40px;
      line-height: 40px;
      border-radius: 4px;
      background: #ef473a;
      border: none;
      padding: 0 6px;
      color: #fff;
      display: inline-block;
      min-width: 92px;
      cursor: pointer;
    }
    .dissendSmsBtn {
      opacity: 0.5;
      cursor: auto;
    }
  }
}
</style>
