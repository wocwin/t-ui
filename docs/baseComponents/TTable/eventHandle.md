# 单个单元格编辑 ElementUi 组件的事件使用

---

<common-code-format>
  <docsComponents-TTable-eventHandle slot="source"></docsComponents-TTable-eventHandle>
在组件中需配置
column 某项需要编辑先设置属性：`canEdit:true`<br/>
column 中`configEdit`属性操作可编辑的是输入框/下拉选择/日期选择等:<br/>
`label`: `placeholder 显示`<br/>
`editSlotName`: `自定义编辑组件作用域插槽方式`<br/>
`editComponent` :组件名称可直接指定全局注册的组件（默认是'el-input'），`也可引入'element/abtd'如：'a-input/el-input'`<br/>
`bind`: `第三方 UI 的 Attributes，如 el-input 中的 clearable 清空功能`<br/>
`event`: `触发 handleEvent 事件的标志`<br/>
`eventHandle`: `第三方 UI 的 事件(第一个参数是本身自带；第二个参数是`scope`---(`$index`:当前所在行；`row`:当前行数据；`column`：当前列数据))`<br/>
`type`: `下拉或者复选框显示（select-arr/select-obj）`<br/>
`list`: `下拉选择数据源名称`<br/>
`arrLabel`: `type:select-arr 时对应显示的中文字段`<br/>
`arrKey`: `type:select-arr 时对应显示的数字字段`

<<< @/docs/.vuepress/components/docsComponents/TTable/eventHandle.vue
</common-code-format>
