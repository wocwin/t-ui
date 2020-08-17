<template>
  <el-main class="main-content">
    <tags-view ref="tagsView"></tags-view>
    <div class="content" ref="viewContent">
      <el-scrollbar style="height:100%">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="visitedViews">
            <router-view :key="key"></router-view>
          </keep-alive>
        </transition>
      </el-scrollbar>
    </div>
  </el-main>
</template>

<script>
import TagsView from './TagsView'
export default {
  name: 'AppMain',
  components: {
    TagsView
  },
  computed: {
    key () {
      return this.$route.fullPath
    },
    visitedViews () {
      return [...this.$store.getters.cachedViews]
    }
  }
}
</script>

<style lang="scss" scoped>
.main-content {
  padding: 0;
  text-align: left;
  .content {
    margin: 10px 10px 0 10px;
    height: calc(100% - 60px);
    background: #fff;
  }
}
</style>
