<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  created () {
    document.title = '基础组件'
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
  font-family: SourceHanSansCN-Normal, PingFangSC-Regular, Microsoft YaHei,
    SimSun, Arial, Helvetica, Verdana, sans-serif !important;
  font-size: 12px;
  background-color: #ededed;
  /* margin-top: 60px; */
}
html {
  margin: 0;
  padding: 0;
}
body {
  margin: 0;
  padding: 0;
  background: #fff;
}
/* 滚动条的宽度*/
/* ::-webkit-scrollbar {
  width: 17px;
  height: 17px;
} */
/* 滚动条的滑块*/
/* ::-webkit-scrollbar-thumb {
  background-color: #b3b3b3;
  border-radius: 3px;
} */
</style>
