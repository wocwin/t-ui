import TCalendar from './src'

/* istanbul ignore next */
TCalendar.install = function (Vue) {
  Vue.component(TCalendar.name, TCalendar)
}

export default TCalendar
