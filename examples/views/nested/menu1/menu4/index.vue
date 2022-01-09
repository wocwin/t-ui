<template>
  <div class="register visitor-head-expand">
    <t-layout sectionTitle="步骤组件">
      <div class="content-main">
        <div class="register-main-container">
          <t-step-wizard
            :stepData="stepData"
            :lastBtnTitle="lastBtnTitle"
            :active="active"
            :successTitle="successTitle"
            @complete="complete"
          >
            <template #first>
              <div class="card-wrap first-content">
                <div class="list-group">
                  <div class="list-group-item">
                    <el-form
                      :model="roleInfoForm"
                      status-icon
                      :rules="rules"
                      ref="roleInfoForm"
                      label-width="100px"
                    >
                      <div class="flex-box flex-col flex-ver t-margin-top-10">
                        <el-form-item label="姓名" prop="name">
                          <el-input type="text" placeholder="姓名" v-model="roleInfoForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="电话" prop="mobile">
                          <el-input type="text" placeholder v-model="roleInfoForm.mobile"></el-input>
                        </el-form-item>
                        <el-form-item label="职位" prop="duty">
                          <el-input type="text" placeholder v-model="roleInfoForm.duty"></el-input>
                        </el-form-item>
                        <el-form-item label="公司名称" prop="companyName">
                          <el-input
                            type="text"
                            placeholder="公司名称"
                            v-model="roleInfoForm.companyName"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                          <el-input type="text" placeholder v-model="roleInfoForm.email"></el-input>
                        </el-form-item>
                        <el-form-item class="t-relative" label="手机验证码" prop="verifyCode">
                          <el-input
                            type="text"
                            placeholder="手机验证码"
                            v-model="roleInfoForm.verifyCode"
                          ></el-input>
                          <timer-btn class="timer" :second="60" @click="sendCode" />
                        </el-form-item>
                      </div>
                    </el-form>
                  </div>
                </div>
              </div>
            </template>
            <template #second>第二步骤</template>
            <template #third>第三步骤</template>
          </t-step-wizard>
        </div>
      </div>
    </t-layout>
  </div>
</template>
<script>
export default {
  name: 'Register',
  data () {
    return {
      active: 0,
      stepData: [
        {
          id: 1,
          title: '创建账户',
          slotName: 'first',
          btnArr: [
            {
              btnTitle: '下一步',
              params: 1,
              fn: this.next
            }
          ]
        },
        {
          id: 2,
          title: '填写基础信息',
          slotName: 'second',
          btnArr: [
            {
              btnTitle: '上一步',
              params: 2,
              fn: this.back
            },
            {
              btnTitle: '下一步',
              params: 2,
              fn: this.next
            }
          ]
        },
        {
          id: 3,
          title: '填写用户信息',
          slotName: 'third',
          btnArr: [
            {
              btnTitle: '上一步',
              params: 3,
              fn: this.back
            },
            {
              btnTitle: '下一步',
              params: 3,
              fn: this.next
            }
          ]
        },
        {
          id: 4,
          title: '注册成功'
        }
      ],
      lastBtnTitle: '提交资料',
      successTitle: '企业信息填写完成，等待提交认证资料，经*****平台审核通过后即可办理业务',
      roleInfoForm: {
        name: '',
        mobile: '',
        duty: '',
        companyName: '',
        email: '',
        verifyCode: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ],
        duty: [
          { required: true, message: '请输入职位', trigger: 'blur' }
        ],
        companyName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        verifyCode: [
          { required: true, message: '请输入手机验证码', trigger: 'blur' }
        ]
      }
    }
  },
  // 加载完数据展示
  created () {
  },
  // 加载完DOM展示
  mounted () {
  },
  // 方法
  methods: {
    sendCode () {

    },
    // 下一步
    next (val) {
      console.log(55, val)
      console.log(66, val.params)
      switch (val.params) {
        case 1:
          this.active += 1
          break
        case 2:
          this.active += 1
          break
        case 3:
          this.active += 2
          break
      }
    },
    // 上一步
    back (val) {
      console.log(55, val)
      console.log(66, val.params)
      switch (val.params) {
        case 2:
          this.active -= 1
          break
        case 3:
          this.active -= 1
          break
      }
    },
    // 完成
    complete () {
      this.active = 0
    }
  }
}
</script>
<style lang='scss' scoped>
.register {
  background: #eee;
  height: 100%;
  .register-main-container {
    ::v-deep .content-step-main {
      min-height: 750px;
      &.step-content {
        width: 100%;
      }
      .fix-btn {
        border: none;
      }
      .timer {
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }
    .first-content {
      margin-bottom: 60px;
    }
  }
}
</style>
