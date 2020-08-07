<template>
  <div id="app">
    <div id="nav">
      Nav路由
      <router-link to="/">table组件</router-link>|
      <router-link to="/query">查询条件组件</router-link>
    </div>
    <hr />
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style lang='scss'>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // margin-top: 10px;
}
* {
  margin: 0;
  padding: 0;
}
#nav {
  padding: 15px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
