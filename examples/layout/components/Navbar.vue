<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <screenfull id="screenfull" class="right-menu-item hover-effect" />
      </template>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          {{nickName||'wocwin'}}
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span @click="setting = true">布局设置</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <a href="https://wocwin.github.io/t-ui/" target="_blank">vue2基础组件文档</a>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <a href="https://wocwin.github.io/t-ui-plus/" target="_blank">vue3基础组件文档</a>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <t-dialog :visible.sync="dialogVisible" width="30%" title="修改密码" :before-close="handleClose">
        <ResetPwd ref="resetPwd" :user="user" @close="handleClose"></ResetPwd>
      </t-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from './Breadcrumb'
import Hamburger from './Hamburger'
import Screenfull from './Screenfull'
import ResetPwd from './ResetPwd'

export default {
  data() {
    return {
      dialogVisible: false,
      user: {}
    }
  },
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    ResetPwd
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device',
      'nickName'
    ]),

    setting: {
      get() {
        return this.$store.state.settings.showSettings
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'showSettings',
          value: val
        })
      }
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    handleClose() {
      this.dialogVisible = false
      this.$refs.resetPwd.initData()
    },
    async logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('FedLogOut').then(() => {
          window.location.href = '/'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    // display: -webkit-box;
    // display: -ms-flexbox;
    // display: flex;
    // -webkit-box-pack: center;
    // -ms-flex-pack: center;
    // justify-content: center;
    // -webkit-box-align: center;
    // -ms-flex-align: center;
    // align-items: center;
    // height: 100%;
    // font-size: 16px;
    // padding-left: 16px;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    font-size: 14px;
    // display: -webkit-box;
    // display: -ms-flexbox;
    // display: flex;
    // -webkit-box-align: center;
    // -ms-flex-align: center;
    // align-items: center;
    // padding-right: 20px;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        //margin-top: 5px;
        position: relative;
        font-size: 16px;

        //.user-avatar {
        //  cursor: pointer;
        //  width: 40px;
        //  height: 40px;
        //  border-radius: 10px;
        //}
        //
        //.el-icon-caret-bottom {
        //  cursor: pointer;
        //  position: absolute;
        //  right: -20px;
        //  top: 25px;
        //  font-size: 12px;
        //}
      }
    }
  }
}
</style>
<style lang="scss">
.v-modal {
  z-index: 4 !important;
}
</style>
