<template>
  <div id="tags-view-container" class="tags-view-container">
    <div class="tags" ref="tags">
      <div class="tags-view-wrapper" :style="{left:fixedLeft(),paddingRight:tagsPadding}">
        <el-tabs
          :value="current"
          type="card"
          :closable="lastTagShow"
          @tab-click="handleClick"
          @edit="handleTabsEdit"
        >
          <el-tab-pane
            v-for="tag in visitedViews"
            ref="tag"
            :class="isActive(tag)?'active':''"
            :key="tag.fullPath"
            :label="tag.name || '未命名'"
            :name="tag.path"
          />
        </el-tabs>
      </div>
      <div class="right-tag flex-box" ref="rightTag">
        <el-popover
          ref="popoverClose"
          popper-class="popoverClose"
          class="button popoverClose"
          placement="bottom-start"
          trigger="hover"
        >
          <div class="ulClose">
            <div class="close-tag refresh" @click="closeTag(1)">刷新</div>
            <div class="close-tag" v-if="visitedViews.length>1">
              <div @click="closeTag(2)">关闭当前</div>
              <div @click="closeTag(3)">全部关闭</div>
              <div @click="closeTag(4)">关闭其他</div>
            </div>
          </div>
          <el-button class="el-popoverbtn" slot="reference">页签操作</el-button>
        </el-popover>
        <el-tooltip content="全屏预览" effect="dark" placement="bottom">
          <screenfull id="screenfull" class="screenfull" />
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import Screenfull from './Screenfull.vue'
import variables from '@/assets/css/variables.scss'
export default {
  name: 'TagsView',
  components: {
    Screenfull
  },
  data () {
    return {
      lastTagShow: true, // 是否 是最后一个tag
      current: '/index',
      top: 0,
      left: 0,
      tagsPadding: 0,
      selectedTag: {}
    }
  },
  computed: {
    visitedViews () {
      return this.$store.state.tagsView.visitedViews
    },
    variables () {
      return variables
    }
  },
  watch: {
    $route () {
      this.addTags()
      this.moveToCurrentTag()
    }
  },
  mounted () {
    this.addTags()
    // 设置tagsView页签活动区域
    this.tagsPadding = this.tagsPaddingRight()
  },
  inject: ['reload'],
  methods: {
    // 自动获取tagsView右边固定宽度
    tagsPaddingRight () {
      return this.$refs.rightTag.getBoundingClientRect().width + 'px'
    },
    // 获取页签距离左边
    fixedLeft () {
      return `${parseInt(this.variables.sideBarWidth) + 10}px`
    },
    closeTag (key) {
      switch (key) {
        case 1:
          this.refreshSelectedTag()
          break
        case 2:
          this.closeSelectedTag(this.$route)
          break
        case 3:
          this.closeAllTags()
          break
        case 4:
          this.closeOthersTags()
          break
        default:
          break
      }
    },
    isActive (route) {
      this.lastTagShow = !(this.visitedViews.length === 1)
      return route.path === this.$route.path
    },
    addTags () {
      const { path } = this.$route
      if (path) {
        this.current = path
        this.lastTagShow = true
        this.$store.dispatch('tagsView/addView', this.$route)
      }
      return false
    },
    moveToCurrentTag () {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.name === this.$route.path) {
            // when query is different then update
            if (tag.paneName !== this.$route.fullPath) {
              this.$store.dispatch('tagsView/updateVisitedView', this.$route)
            }
            break
          }
        }
      })
    },
    closeSelectedTag (view) {
      this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view)
        }
      })
    },
    // 刷新
    refreshSelectedTag () {
      this.reload()
    },
    closeOthersTags () {
      this.$router.push(this.$route)
      this.$store.dispatch('tagsView/delOthersViews', this.$route).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeAllTags () {
      if (this.$route.name === '首页') {
        this.closeOthersTags()
      } else {
        this.$store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
          // this.toLastView(visitedViews, this.$route)
          this.$router.push('/')
          // console.log(777, visitedViews)
        })
      }
    },
    toLastView (visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      // console.log(333, latestView)
      // 赋值解构——指定path,不然默认以name（路由）
      const { params, query, path } = latestView
      if (latestView) {
        this.$router.push({ path, params, query })
      } else {
        // 如果没有标签视图,默认重定向到首页.
        if (view.name === '首页') {
          this.$router.replace({ path: '/redirect' + view.fullPath })
        } else {
          this.$router.push('/')
        }
      }
    },
    /**
    * @description 接收点击 tab 标签的事件
    */
    handleClick (tab, event) {
      // 找到点击的页面在 tag 列表里是哪个
      // const page = this.visitedViews.find(page => page.fullPath === tab.name)
      const page = this.visitedViews.find(page => {
        if (page.fullPath.includes('?')) {
          return page.fullPath.split('?')[0] === tab.name
        } else {
          return page.fullPath === tab.name
        }
      })
      // console.log(444, page)
      this.selectedTag = page
      // const { name, params, query, path } = page /workspaces/todo-tasks
      const { params, query, path } = page
      // if (page) {
      //   this.$router.push({ path, params, query })
      // }
      if (page.path === '/workspaces/todo-tasks') {
        this.$router.push({ path, params })
      } else {
        this.$router.push({ path, params, query })
      }
    },
    /**
     * @description 点击 tab 上的删除按钮触发
     */
    handleTabsEdit (view) {
      const page = this.visitedViews.find(page => {
        if (page.fullPath.includes('?')) {
          return page.fullPath.split('?')[0] === view
        } else {
          return page.fullPath === view
        }
      })
      // console.log(111, page)
      this.$store.dispatch('tagsView/delView', page).then(({ visitedViews }) => {
        if (this.isActive(page)) {
          // console.log('点击删除', visitedViews)
          this.toLastView(visitedViews, page)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 40px;
  width: 100%;
  background: #fff;
  .tags {
    height: 40px;
    border: 1px solid #ccc;
    border-top: none;
    border-left: none;
    line-height: 40px;
    background: #fff;
    display: flex;
    .tags-view-wrapper {
      padding-left: 10px;
      height: 40px;
      position: fixed;
      top: 60px;
      left: 74px;
      right: 0;
      z-index: 930;
      margin: 0;
      .tags-view-item {
        display: inline-block;
        position: relative;
        cursor: pointer;
        height: 40px;
        line-height: 40px;
        color: #606266;
        font-size: 14px;
        background: #ffffff;
        padding: 0 5px;
        margin-left: 8px;
        box-sizing: border-box;
        &:first-of-type {
          margin-left: 0px;
        }
        &:last-of-type {
          margin-right: 15px;
        }
        &.active {
          border-bottom: 2px solid #66b1ff;
        }
      }
    }
    .right-tag {
      position: fixed;
      top: 60px;
      right: 0px;
      z-index: 931;
      .popoverClose {
        border-left: 1px solid #ccc;
      }
      .home_button {
        display: block;
        height: 40px;
        width: 80px;
        min-width: 80px;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
      }
      .screenfull {
        height: 40px;
        width: 40px;
        min-width: 40px;
        text-align: center;
        border-left: 1px solid #ccc;
      }
      .el-popoverbtn {
        min-width: 70px;
        border: none;
        padding: 0 3px;
        padding-left: 6px;
      }
      .el-popoverbtn:hover {
        color: #66b1ff;
        background: #fff;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-container {
  .tags {
    .tags-view-wrapper {
      .el-tabs--card {
        .tags-view-item {
          .el-icon-close {
            width: 16px;
            height: 16px;
            vertical-align: 2px;
            border-radius: 50%;
            text-align: center;
            transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            transform-origin: 100% 50%;
            &:before {
              // transform: scale(0.6);
              display: inline-block;
              vertical-align: -4px;
            }
            &:hover {
              // background-color: #b4bccc;
              color: #fff;
            }
          }
        }
        .el-scrollbar__wrap {
          overflow-x: auto;
          overflow-y: hidden;
        }
        & > .el-tabs__header {
          .el-tabs__nav-next,
          .el-tabs__nav-prev {
            line-height: 40px;
            font-size: 20px;
            // border-right: 1px solid #e4e7ed;
          }
          .el-tabs__nav:nth-child(1) {
            // border-left: 1px solid #ccc;
          }
          .el-tabs__nav {
            border-top: none;
            border-left: none;
            border-radius: 0;
          }
          .el-tabs__nav:nth-last-child(1) {
            // border-right: none;
          }
        }
        .el-tabs__nav-wrap {
          margin: 0;
          .el-tabs__nav-scroll {
            .el-tabs__item {
              &.is-active {
                // color: #409eff;
                color: #303133;
                background-color: #f5f7fa;
                border-bottom: 2px solid #409eff;
              }
            }
          }
        }
        .el-tabs__content {
          height: 0;
        }
      }
    }
  }
}
div.popoverClose {
  min-width: 70px;
  padding: 0;
  top: 92px;
  .ulClose {
    width: 70px;
    font-size: 14px;
    padding: 0;
    margin: 5px 0;
    .close-tag {
      width: 70px !important;
      padding-left: 0 !important;
      text-align: center !important;
      font-size: 12px !important;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 26px;
      cursor: pointer;
      div {
        &:hover {
          color: #66b1ff;
        }
      }
    }
    .refresh:hover {
      color: #66b1ff;
    }
  }
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .el-scrollbar__bar {
    bottom: 0px;
  }
}
</style>
