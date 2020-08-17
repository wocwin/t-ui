<template>
  <div class="app-wrapper">
    <el-container>
      <el-header class="el_header" style="padding: 0;">
        <navbar />
      </el-header>
      <el-container style="height:calc(100vh - 60px);width:100%;">
        <sidebar class="sidebar-container" style="top:60px;padding-bottom:120px;" />
        <div class="main-container" style="width:100%;overflow:hidden;">
          <app-main />
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/variables.scss';
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
  .app-main-content {
    margin-left: 10px;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>
