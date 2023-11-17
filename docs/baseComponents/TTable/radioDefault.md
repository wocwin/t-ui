# 单选项--默认选中项及开启点击整行选中

---

<common-code-format description="在组件中需配置：firstColumn: { type: 'index', label: '序列' }">
  <docsComponents-TTable-radioDefault slot="source"></docsComponents-TTable-radioDefault>
在组件中需配置

`firstColumn`: { type: 'radio' }<br/>
`rowClickRadio`: 表点击整行选中单选<br/>
`defaultRadioCol`: 表默认选中项<br/>
`@radioChange="radioChange"`事件传出选中是数据

<<< @/docs/.vuepress/components/docsComponents/TTable/radioDefault.vue

</common-code-format>
