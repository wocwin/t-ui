import TTheme from './src'

/* istanbul ignore next */
TTheme.install = function (Vue) {
  Vue.component(TTheme.name, TTheme)
}

export default TTheme
