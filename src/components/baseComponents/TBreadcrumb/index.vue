<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span
          v-if="item.redirect==='noRedirect'||index==levelList.length-1"
          class="no-redirect"
        >{{ item.name }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.name }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'
import { mapGetters } from 'vuex'

export default {
  name: 'TBreadcrumb',
  computed: {
    ...mapGetters([
      'permissionRoutes'
    ])
  },
  data () {
    return {
      levelList: null
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    findPathByLeafId (leafId, nodes, path) {
      if (path === undefined) {
        path = {}
      }
      if (nodes === undefined) {
        nodes = []
      }
      for (var i = 0; i < nodes.length; i++) {
        var tmpPath = path
        //   tmpPath.push(nodes[i].id);
        if (leafId === nodes[i].path) {
          tmpPath = nodes[i]
          return tmpPath
        }
        if (nodes[i].children) {
          var findResult = this.findPathByLeafId(leafId, nodes[i].children, tmpPath)
          if (findResult) {
            return findResult
          }
        }
      }
    },
    getBreadcrumb () {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(item => item && item.name)
      const first = matched ? matched[0] : {}

      if (!this.isDashboard(first)) {
        matched = [{ path: '/home', name: '首页', meta: { title: '首页' } }].concat(matched)
      }
      const parent = matched.find(item => item.meta && item.meta.parent)
      if (parent && parent.meta.parent) {
        if (parent.meta.parent.indexOf('/') !== -1) {
          parent.meta.parent.split('/').forEach(item => {
            const obj = this.findPathByLeafId(item, this.permissionRoutes)
            obj && matched.splice(matched.length - 1, 0, obj)
          })
        } else {
          const obj = this.findPathByLeafId(parent.meta.parent, this.permissionRoutes)
          obj && matched.splice(matched.length - 1, 0, obj)
        }
      }
      this.levelList = matched.filter(item => item && item.name && item.meta.breadcrumb !== false)
    },
    isDashboard (route) {
      const name = route && route.name
      if (!name) {
        return false
        // return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
      }
      return name === '首页'
    },
    pathCompile (path) {
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink (item) {
      const { redirect, path } = item
      if (this.$route.path !== redirect) {
        if (redirect) {
          this.$router.push(redirect)
          return
        }
        this.$router.push(this.pathCompile(path))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 16px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
