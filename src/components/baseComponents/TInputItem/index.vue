<template>
  <div class="t-input">
    <el-input
      type="text"
      :placeholder="placeholder"
      clearable
      @blur="verificateVal"
      v-model="currentVal"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template v-if="appendTitle" slot="append">{{appendTitle}}</template>
    </el-input>
  </div>
</template>
<script>
/**
*  通用表单输入框，此控件可以结合原生el-form-item提示必输和输出规则说明，
*  validateType 校验类型
*  showErrorTip 是否需要显示规则提示
*  appendTitle 显示单位
*  bindModel 绑定表单xxform中的数据模型
*
*/
export default {
  name: 'TInputItem',
  data () {
    return {
      oldCurrentVal: '',
      currentVal: this.searchValue,
      rules: {
        currency: /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/, // 金额
        mobileNo: /^1[3456789]\d{9}$/, // 最新手机号
        phone: /^1[3456789]\d{9}$/, // 手机号
        company: /^[\u4E00-\u9FA5a-zA-Z][\u4E00-\u9FA5a-zA-Z0-9\s-,-.]*$/,
        uname: /^[\u4E00-\u9FA5a-zA-Z][\u4E00-\u9FA5a-zA-Z0-9_]*$/,
        zh: /^[\u4e00-\u9fa5]+$/, // 纯中文
        card: /^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12])|91)\d{4}(((((19|20)((\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(\d{2}(0[13578]|1[02])31)|(\d{2}02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[48])0229)))|20000229)\d{3}(\d|X|x))|(((\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(\d{2}(0[13578]|1[02])31)|(\d{2}02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[48])0229))\d{3}))$/, // 身份证号
        int: /^[0-9]*$/,
        email: /^([a-z0-9A-Z]+[-|._]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-zA-Z]{2,}$/,
        socialCreditCode: /^[0-9A-Z]{18}$/, // 社会统一信用代码
        businessLicence: /^(\d{13}|\d{15})$/, // 营业执照号码
        organizationCode: /^([0-9A-Z]{8}-([0-9]|X))$/, // 组织机构代码证号码
        realName: /^([\u4E00-\u9FA5|a-zA-Z| ])+$/, // 中文或字母
        loginName: /^([\u4E00-\u9FA5|a-zA-Z|\d])+$/, // 中文或字母或数字
        password: /^((?![a-z]+$)(?![A-Z]+$)(?!\d+$)(?!\W_+$)\S{6,20})$/, // 密码6-20位，至少两种字符
        acctNo: /^\d{4,32}$/, // 银行账号，最多32位
        entName: /^([\u4E00-\u9FA5a-zａ-ｚA-ZＡ-Ｚ0-9０-９()（）]{1,100})$/, // 企业名称或者推荐企业名称，中文字母数字括号,1-100位
        phoneOrTel: /^((((0\d{2,3}-?)?\d{7,8})|\d{10})|(1(3\d|5\d|8\d|4[57]|7\d|9\d)\d{8}))$/
      },
      rulesTips: {
        currency: '请输入最多两位数的小数或整数', // 金额
        mobileNo: '请输入11位数字', // 最新手机号
        phone: '请输入11位数字号码', // 手机号
        company: '请输入中英文数字和-的组合',
        uname: '',
        zh: '请输入纯中文', // 纯中文
        card: '请输入正确格式的证件号', // 身份证号
        int: '',
        email: '',
        socialCreditCode: '', // 社会统一信用代码
        businessLicence: '', // 营业执照号码
        organizationCode: '', // 组织机构代码证号码
        realName: '请输入中文或字母', // 中文或字母
        loginName: '请输入中文或字母或数字', // 中文或字母
        password: '密码6-20位，至少两种字符', // 密码6-20位，至少两种字符
        acctNo: '银行账号，4-32位数字', // 银行账号，最多32位
        entName: '企业名称或者推荐企业名称，中文字母数字括号,1-100位', // 企业名称或者推荐企业名称，中文字母数字括号,1-100位
        phoneOrTel: '' // 手机或固定电话
      }
    }
  },
  props: {
    searchValue: {
      type: String
    },
    placeholder: {
      type: String,
      default: '请输入金额'
    },
    validateType: {
      type: String,
      default: 'currency'
    },
    appendTitle: {
      type: String
    },
    showErrorTip: {
      type: Boolean,
      default: true
    },
    clearInput: {
      type: Boolean,
      default: false
    },
    bindModel: {
      type: String
    }
  },
  methods: {
    // 校验规则
    verificateVal () {
      let isMatchReg = true
      if (this.validateType && this.rules[this.validateType]) {
        isMatchReg = this.rules[this.validateType].test(this.currentVal)
      }
      this.alertErrorTipsAndCorrectVal(isMatchReg)
    },
    // 提示并处理输入值
    alertErrorTipsAndCorrectVal (isMatch) {
      let ErrorTips = null
      if (isMatch) {
        this.oldCurrentVal = this.currentVal // 保存输入的值
        switch (this.validateType) {
          case 'currency':
            this.currentVal = this.toThousandsNoZero(this.currentVal)
            break
          case 'days':
            break
        }
      } else {
        // 是否需要提示输入规则，规则说明是空取默认，否则直接显示自定义的规则说明
        ErrorTips = !this.showErrorTip ? null : (this.rulesTips[this.validateType] === '') ? '输入格式有误' : this.rulesTips[this.validateType]
        this.$message({
          message: this.showErrorTip ? ErrorTips : '输入格式有误',
          type: 'error'
        })
        // 清空输入框
        if (this.clearInput) {
          this.currentVal = ''
          this.oldCurrentVal = this.currentVal
        }
      }
      // 触发父组件事件
      const returnObj = { value: this.oldCurrentVal, value2: this.currentVal, errorTips: ErrorTips, bindModel: this.bindModel }
      console.log(returnObj)
      this.$emit('updateModel', returnObj)
    },
    // 格式化金额
    toThousandsNoZero (num) {
      return num ? ((isNaN(parseFloat(num.toString().replace(/,/g, ''))) ? 1 : parseFloat(num.toString().replace(/,/g, '')))).toFixed(2).toString().replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
        return $1 + ','
      }) : ''
    }
  }
}
</script>
