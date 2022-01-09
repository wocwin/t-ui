<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in constantRoutes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { constantRoutes } from '@/router'
import SidebarItem from './SidebarItem'
import variables from '@/assets/css/variables.scss'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permissionRoutes',
      'sidebar'
    ]),
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      // 如果设置路径，侧栏将突出显示您设置的路径
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables () {
      return variables
    },
    // isCollapse () {
    //   return !this.sidebar.opened
    // },
    constantRoutes () {
      return constantRoutes
    }
  },
  mounted () {
  },
  methods: {

  }
}
</script>
