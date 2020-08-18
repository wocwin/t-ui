# keep-alive不能缓存多层级路由(vue-router)菜单问题解决

### 需求
如图需要缓存“风控报告”及“风控规则查询”页面，并且每次删除后才能重新加载（如图二）
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200609155315559.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2N3aW44OTUx,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200609162028713.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2N3aW44OTUx,size_16,color_FFFFFF,t_70)

"风控管理"是一个blank.vue文件（所有嵌套路由其父都是一个仅放\<router-view />的空白文件——占位让其子视图渲染而已），代码如下
```
<template>
    <router-view />
</template>
<script>
export default {
  name: 'Blank'
}
</script>
```
### 解决
看了很多文档，都是把嵌套多级路由拍平（keep-alive满足二级/一级菜单缓存）

 1. ：需要把所有页签存在vuex中，可以参考[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)项目中store有个tagsView.js文件
 2. 在AppMin.vue文件中，如图加上这两句
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200609163605949.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2N3aW44OTUx,size_16,color_FFFFFF,t_70)
 3. 在全局路由守卫中加上这段代码：（仅仅只是满足三级菜单缓存）
 ```
 if (to.matched && to.matched.length > 2) {
    for (let i = 0; i < to.matched.length; i++) {
      const element = to.matched[i]
      if (element.components.default.name === 'Blank') {
        to.matched.splice(i, 1)
      }
    }
  }
 ```
******
### 相关文章
[axios二次封装，接口统一存放,满足RESTful风格](https://blog.csdn.net/cwin8951/article/details/104415090)
******
[基于elementUI中table组件二次封装（Vue项目）](https://blog.csdn.net/cwin8951/article/details/104479606)
******
