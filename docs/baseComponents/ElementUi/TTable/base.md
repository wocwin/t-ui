# 基本使用

---

<common-code-format>
  <docsComponents-TTable-base slot="source"></docsComponents-TTable-base>
  <<< @/docs/.vuepress/components/docsComponents/TTable/base.vue
</common-code-format>

# 双击单元格复制

---

<common-code-format>
  <docsComponents-TTable-copy slot="source"></docsComponents-TTable-copy>
  在组件中需配置
  
  新增`isCopy`或`isCopy='true'`属性

<<< @/docs/.vuepress/components/docsComponents/TTable/copy.vue
</common-code-format>

# 文字变色

---

<common-code-format>
  <docsComponents-TTable-textColor slot="source"></docsComponents-TTable-textColor>
  在组件中需配置
  
  `changeColor`对象

<<< @/docs/.vuepress/components/docsComponents/TTable/textColor.vue
</common-code-format>

# 第一列显示序列号

---

<common-code-format description="在组件中需配置：firstColumn: { type: 'index', label: '序列' }">
  <docsComponents-TTable-sequence slot="source"></docsComponents-TTable-sequence>
在组件中需配置

`firstColumn`: { type: 'index', label: '序列' }

<<< @/docs/.vuepress/components/docsComponents/TTable/sequence.vue

</common-code-format>

# 第一列显示单选项

---

<common-code-format description="在组件中需配置：firstColumn: { type: 'index', label: '序列' }">
  <docsComponents-TTable-radio slot="source"></docsComponents-TTable-radio>
在组件中需配置

`firstColumn`: { type: 'radio' }<br/>
`@radioChange="radioChange"`事件传出选中是数据

<<< @/docs/.vuepress/components/docsComponents/TTable/radio.vue

</common-code-format>
