<template>
  <div class="navbar">
    <div class="middle">
      <div class="name">
        <div class="logo t-font-size-20">基于Element-Ui再次封装基础组件</div>
      </div>
    </div>
    <div class="right-menu">
      <el-dropdown class="avatar-container flex-box flex-ver right-menu-item hover-effect">
        <div class="avatar-wrapper">
          <img src="@/assets/img/logo.jpg" class="user-avatar" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <el-dropdown-item>
            <span style="display:block;" @click="dialogFormVisible = true">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="link-guide right-menu-item">
        <div class="name">admin</div>
        <div class="line"></div>
        <div class="ent-name t-oneline-overflow-hidden">{{currentEnt.entName}}</div>
      </div>
      <t-dialog
        title="修改密码"
        :visible="dialogFormVisible"
        @update:visible="cancel"
        :isCancel="false"
      >
        <el-form
          :model="resetForm"
          status-icon
          :rules="resetFormRules"
          ref="resetForm"
          label-width="100px"
        >
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input type="password" clearable v-model="resetForm.oldPassword" show-password></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input type="password" clearable v-model="resetForm.newPassword" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="repeatNewPassword">
            <el-input type="password" clearable v-model="resetForm.repeatNewPassword" show-password></el-input>
          </el-form-item>
          <div class="btn" style="text-align: center;">
            <el-button @click="reset">重置</el-button>
            <el-button type="danger" @click="save">确定</el-button>
          </div>
        </el-form>
      </t-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入旧密码'))
      } else {
        callback()
      }
    }
    const validatePass1 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入新密码'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.resetForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      dialogFormVisible: false,
      // 重置密码
      resetForm: {
        oldPassword: '',
        newPassword: '',
        repeatNewPassword: ''
      },
      resetFormRules: {
        oldPassword: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        newPassword: [
          { required: true, validator: validatePass1, trigger: 'blur' }
        ],
        repeatNewPassword: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    currentEnt () {
      return { entName: '随便取一个名字' }
    }
  },
  methods: {
    logout () {
      console.log('点击退出')
    },
    reset () {
      this.resetForm = {
        oldPassword: '',
        newPassword: '',
        repeatNewPassword: ''
      }
    },
    cancel () {
      this.dialogFormVisible = false
    },
    // 保存密码
    save () {
      console.log('保存密码')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 60px;
  line-height: 60px;
  border-radius: 0px !important;
  background-color: #fdfdfd;
  border: 1px solid #ccc;
  box-shadow: 0 1px 2px 0 #ccc;
  border-top: none;
  display: flex;
  .middle {
    flex: 60%;
    text-align: left;
    .name {
      display: inline-flex;
      line-height: 60px;
      margin-left: 60px;
      .logo {
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          font-size: 23px;
          padding-left: 5px;
        }
      }
    }
  }
  .right-menu {
    flex: 25%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      text-align: center;
      padding: 0 5px;
      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;
        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
    .screenfull {
      width: 15%;
      margin-top: 3px;
    }
    .avatar-container {
      width: 16%;
      .avatar-wrapper {
        position: relative;
        line-height: 60px;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          vertical-align: middle;
        }
      }
    }
    .link-guide {
      // width: 35%;
      margin-right: 30px;
      div {
        height: 20px;
        line-height: 20px;
        color: #777;
      }
      .name {
        font-size: 14px;
        font-weight: 700;
      }
      .line {
        background: linear-gradient(to right, #ef473a 40%, #fff);
        height: 3px;
        margin-top: 2px;
      }
      .ent-name {
        padding-top: 3px;
        font-size: 12px;
        min-width: 95px;
        cursor: pointer;
      }
    }
  }
  .popover-pwd {
    .title {
      height: 40px;
      line-height: 35px;
      padding-left: 20px;
      font-size: 16px;
      font-weight: 700;
      border-bottom: 1px solid #ccc;
      margin-bottom: 20px;
    }
  }
}
</style>
<style lang="scss">
.navbar {
  .ent-choose {
    .select-ent-box {
      padding: 10px;
    }
    .el-dialog__header {
      padding: 10px;
    }
  }
}
</style>
