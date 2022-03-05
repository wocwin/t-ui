# 复选框功能

---

<common-code-format>
  <docsComponents-TTable-checkbox slot="source"></docsComponents-TTable-checkbox>
  在JS中需配置
  
  `firstColumn`: { type: 'selection' }<br/>
  `clearSelection方法`: 清空选中的数据
  
  <<< @/docs/.vuepress/components/docsComponents/TTable/checkbox.vue
</common-code-format>

# 翻页选中功能

---

<common-code-format>
  <docsComponents-TTable-pageCheck slot="source"></docsComponents-TTable-pageCheck>
  注意：（参考配置参数）`firstColumn`: { type: 'selection', isPaging: true }
  
  `type: 'selection'` 表复选框
  
  `isPaging: true` 表可以跨页勾选
  
  <<< @/docs/.vuepress/components/docsComponents/TTable/pageCheck.vue
</common-code-format>
