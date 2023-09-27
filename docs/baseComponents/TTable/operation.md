# 显示 table 外操作按钮

---

<common-code-format>
  <docsComponents-TTable-operationOutside slot="source"></docsComponents-TTable-operationOutside>
  在组件中需配置: `toolbar数组`
  
  `toolbar`数组超过3个按钮，第4个按钮会以下拉的方式展示(`icon`的配置需以`ElementUI`内置`icon`为准)
    
  新增`highlight-current-row`可以高亮选中行的颜色
  
  按钮的颜色是以`ElementUI`内置`button`的`type`为准

<<< @/docs/.vuepress/components/docsComponents/TTable/operationOutside.vue

</common-code-format>

# 显示 table 内操作按钮

---

<common-code-format title="显示table内操作按钮" description="">
  <docsComponents-TTable-operationInside slot="source"></docsComponents-TTable-operationInside>
  在组件中需配置：`operator数组`

`operator 数组`是显示按钮数且点击后将当前行数据传出

`operatorConfig` 对象是操作列样式（可以设置宽度/列标题及是否固定在最左/右侧）

按钮的颜色是以 `ElementUI` 内置 `button` 的 `type` 为准

隐藏按钮——`noshow`:多种状态控制按钮的显示与隐藏

例如：`noshow:[{key:'fields',val:'isHasVal'},{key:'status',val:[0,1,99]},{key:'channelCode',val:['bank']}]`

> 注释： `noshow` 中的 `key` 值(fields/status/channelCode)是表格后台返回的字段
>
> 当 `val` 等于字符串'isHasVal'时,字段'fields'返回为空时，此行操作按钮隐藏
>
> `以上综合：`当'status'为 0/1/99 并且'channelCode'为'bank'及'fields'为空时

`show: { key: 'status', val: [3,4] }`表 status 值为 3 或者 4 时，显示此操作健 根据后台字段返回是数字还是字符串来显示

<<< @/docs/.vuepress/components/docsComponents/TTable/operationInside.vue

</common-code-format>
