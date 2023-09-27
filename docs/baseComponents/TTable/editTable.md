# 表格整行编辑功能

---

<common-code-format>
  <docsComponents-TTable-editTable slot="source"></docsComponents-TTable-editTable>
在组件中需配置
需要编辑先设置属性：`isEditCell:true`<br/>
需要显示添加按钮设置属性：`isEdit:true`<br/>
需要显示保存按钮设置属性：`isShowFooterBtn:true`<br/>
column 每项中新增需要的`configEdit`属性其值如下:<br/>
`label`: `placeholder 显示`<br/>
`editComponent` :`组件名称可直接指定全局注册的组件，也可引入'element/abtd'如：'a-button/el-button'`<br/>
`bind`: `第三方 UI 的 Attributes，如 el-input 中的 clearable 清空功能`<br/>
`event`: `触发 handleEvent 事件的标志`<br/>
`type`: `下拉或者复选框显示（select-arr/select-obj/checkbox）`<br/>
`list`: `下拉选择数据源名称`<br/>
`arrLabel`: `type:select-arr 时对应显示的中文字段`<br/>
`arrKey`: `type:select-arr 时对应显示的数字字段`

<<< @/docs/.vuepress/components/docsComponents/TTable/editTable.vue
</common-code-format>
