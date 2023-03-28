<template>
  <!--  请勿删除，用于处理路由菜单层级嵌套未调整组件导致的布局组件叠加问题-->
  <section>
        <router-view />
  </section>
</template>
<script>
export default {
  name: "ViewBox",
  data () {
    return {
      cachedViewsList: []
    }
  },
  computed: {
    cachedViews () {
      // console.log(this.$store.state.tagsView.cachedViews.filter(item => {
      //   return this.cachedViewsList.some(ele => ele == item)
      // }),'899')
      return this.$store.state.tagsView.cachedViews && this.$store.state.tagsView.cachedViews.filter(item => {
        return this.cachedViewsList.some(ele => ele == item)
      })
    },
    key () {
      return this.$route.path
    }
  },
  methods: {}
}
</script>
<style scoped lang="scss">
</style>
