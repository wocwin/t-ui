<template>
  <div v-if="!item.isShow" class="menu-wrapper">
    <template
      v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)"
    >
      <app-link
        v-if="onlyOneChild.meta && onlyOneChild.meta.title"
        :to="resolvePath(onlyOneChild.path)"
      >
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{'submenu-title-noDropdown':!isNest}"
        >
          <item
            :icon="(onlyOneChild.meta.icon||(item.meta&&item.meta.icon))"
            :title="onlyOneChild.meta.title"
          />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item
          v-if="item.meta"
          :icon="(item.meta && item.meta.icon)"
          :title="item.meta.title"
        />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/utils.js'
import Item from './Item'
import AppLink from './Link'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data () {
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {}
  },
  methods: {
    hasOneShowingChild (children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.isShow) {
          return false
        } else {
          // Temp set(如果只有一个显示子元素，则使用)
          // console.log(99922, item)
          this.onlyOneChild = item
          return true
        }
      })
      // 当只有一个子路由器时如果在父路由上添加的meta存在时，显示父路由下的子路由器
      if (showingChildren.length === 1 && !parent.meta) {
        return true
      }

      // 如果没有要显示的子路由器，则显示父路由器
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath (routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
<style lang="scss">
.menu-wrapper {
  .i-icon {
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
    color: #333;
    vertical-align: middle;
  }
  .el-menu {
    border-right: solid 1px #e6e6e6;
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
    background-color: #ffffff;
    overflow-y: auto;
    overflow-x: hidden;
  }
  // 解决火狐侧边栏显示滚动条
  .el-submenu {
    .el-menu {
      overflow-y: hidden;
      overflow-x: hidden;
    }
  }
  .el-submenu .el-menu-item {
    min-width: 0 !important;
  }
  .el-submenu__title {
    text-align: left;
    color: #303133;
  }
  .el-menu-item {
    text-align: left;
    color: #303133;
  }
}
</style>
