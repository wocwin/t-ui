/**
 * 缓存二级页面新增/编辑返回列表页面刷新mixin
 * @param {object} configs 传递参数配置{ flag :新增/编辑返回列表标志；pagePath：哪个页面新增编辑；list:调哪个接口 type string/array}
 * @returns {function} mixin
 */
export default (configs) => {
  return {
    watch: {
      $route() {
        if (this.$route.query.hasOwnProperty(configs.flag) && this.$route.path.includes(configs.pagePath)) {
          if (typeof configs.list === 'string') {
            this[configs.list]()
          } else {
            (configs.list).map(config => {
              this[config]()
            })
          }
        }
      }
    }
  }
}
