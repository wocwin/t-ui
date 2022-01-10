/**
 * 使用方法:
 * v-validate="{type:'tel',errorMsg:'',emplyMsg:''}"
 * type：表类型 （必传）
       tel 验证手机号
       email 验证邮箱
       password 验证密码至少2中字符
       idCard 验证身份证
 * errorMsg：输入错误提示(不传,默认提示)
 * emplyMsg：为空提示(不传,默认提示)
 */
const validate = {
  inserted (el, vDir) {
    // vDir.value 有指令的参数
    // input输入值
    let content
    // 正则
    let reg
    // 非空提示展示
    let emplyTip = document.createElement('span')
    // 正则错误提示
    let errorTip = document.createElement('span')
    emplyTip.className = 'el-form-item__error'
    errorTip.className = 'el-form-item__error'
    // 监听失去焦点
    el.addEventListener('focusout', event => {
      let e = event || window.event
      content = e.target.value
      // 错误提示函数
      function tipMsg (reg, errorMsg, emplyMsg) {
        if (content) {
          if (!reg.test(content)) {
            el.classList.add('is-error')
            errorTip.innerText = errorMsg
            el.appendChild(errorTip)
            emplyTip.style.display = 'none'
            errorTip.style.display = 'block'
            // Message.error(errorMsg)
            e.target.value = ''
          } else {
            el.classList.remove('is-error')
            emplyTip.style.display = 'none'
            errorTip.style.display = 'none'
          }
        } else {
          // if (!vDir.value.required) return
          emplyTip.innerText = emplyMsg
          el.appendChild(emplyTip)
          el.classList.add('is-error')
          errorTip.style.display = 'none'
          emplyTip.style.display = 'block'
          // Message.error(emplyMsg)
        }
      }
      switch (vDir.value && vDir.value.type) {
        case 'tel': // 验证手机号
          reg = /^1[3456789]\d{9}$/
          tipMsg(reg, vDir.value.errorMsg || '请输入正确格式的手机号', vDir.value.emplyMsg || '请输入手机号')
          break
        case 'email': // 验证邮箱
          reg = /^([a-z0-9A-Z]+[-|._]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-zA-Z]{2,}$/
          tipMsg(reg, vDir.value.errorMsg || '请输入正确格式的邮箱', vDir.value.emplyMsg || '请输入邮箱')
          break
        case 'password': // 验证密码
          reg = /^((?![a-z]+$)(?![A-Z]+$)(?!\d+$)(?!\W_+$)\S{6,20})$/
          tipMsg(reg, vDir.value.errorMsg || '密码6-20位，至少两种字符', vDir.value.emplyMsg || '请输入密码')
          break
        case 'idCard': // 身份证
          reg = /^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12])|91)\d{4}(((((19|20)((\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(\d{2}(0[13578]|1[02])31)|(\d{2}02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[48])0229)))|20000229)\d{3}(\d|X|x))|(((\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(\d{2}(0[13578]|1[02])31)|(\d{2}02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[48])0229))\d{3}))$/
          tipMsg(reg, vDir.value.errorMsg || '请输入正确格式的证件号', vDir.value.emplyMsg || '请输入证件号')
          break
        default:
          break
      }
    })
  }
}
export default validate
