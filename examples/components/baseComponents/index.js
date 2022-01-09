import TAntConfigform from './TAntConfigform'
import TAntLayoutConditional from './TAntLayoutConditional'
import TLayoutPage from './TLayoutPage'
import TLayoutPageItem from './TLayoutPageItem'
import TAntLayoutTable from './TAntLayoutTable'
import TAntRangePicker from './TAntRangePicker'
import TBreadcrumb from './TBreadcrumb'
import TCalendar from './TCalendar'
import TDatePicker from './TDatePicker'
import TDialog from './TDialog'
import TEditTable from './TEditTable'
import TForm from './TForm'
import TIcon from './TIcon'
import TInput from './TInput'
import TInputSearch from './TInputSearch'
import TLayout from './TLayout'
import TPhone from './TPhone'
import TProtocol from './TProtocol'
import TQueryCondition from './TQueryCondition'
import TRemark from './TRemark'
import TSearch from './TSearch'
import TSimpleForm from './TSimpleForm'
import TStepWizard from './TStepWizard'
import TSticky from './TSticky'
import TTable from './TTable'
import TTimerBtn from './TTimerBtn'
import TTreeTable from './TTreeTable'
// import TUploadExcel from './TUploadExcel'
import TUploadFile from './TUploadFile'
import UploadFile from './UploadFile'
import TAntLayoutForm from './TAntLayoutForm'
import TAntModal from './TAntModal/index.vue'
import TAntProtocol from './TAntModal/protocol.vue'
import { version } from '../../../package.json'

// 存储组件列表
const components = {
  TAntConfigform,
  TAntLayoutConditional,
  TLayoutPage,
  TLayoutPageItem,
  TAntLayoutTable,
  TAntRangePicker,
  TBreadcrumb,
  TCalendar,
  TDialog,
  TDatePicker,
  TForm,
  TIcon,
  TInput,
  TInputSearch,
  TLayout,
  TPhone,
  TProtocol,
  TQueryCondition,
  TRemark,
  TSearch,
  TSimpleForm,
  TStepWizard,
  TSticky,
  TTable,
  TTimerBtn,
  TTreeTable,
  // TUploadExcel,
  TUploadFile,
  UploadFile,
  TAntLayoutForm,
  TAntModal,
  TAntProtocol,
  TEditTable
}

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
  // 判断是否安装
  if (install.installed) return
  // 遍历注册全局组件
  Object.values(components).map(component => Vue.component(component.name, component))
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export {
  TAntConfigform,
  TAntLayoutConditional,
  TLayoutPage,
  TLayoutPageItem,
  TAntLayoutTable,
  TAntRangePicker,
  TBreadcrumb,
  TCalendar,
  TDialog,
  TDatePicker,
  TForm,
  TIcon,
  TInput,
  TInputSearch,
  TLayout,
  TPhone,
  TProtocol,
  TQueryCondition,
  TRemark,
  TSearch,
  TSimpleForm,
  TStepWizard,
  TSticky,
  TTable,
  TTimerBtn,
  TTreeTable,
  // TUploadExcel,
  TUploadFile,
  UploadFile,
  TAntLayoutForm,
  TAntModal,
  TAntProtocol,
  TEditTable
}
export default {
  version,
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install
}
