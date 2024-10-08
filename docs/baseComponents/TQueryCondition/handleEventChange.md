# 调用handleEvent动态修改查询条件值<el-tag>v1.4.13</el-tag>

---

<common-code-format>
  <docsComponents-TQueryCondition-handleEventChange slot="source"></docsComponents-TQueryCondition-handleEventChange>

最终方法调用`this.$refs.queryCondition.change('W1', 'workshopNum')`。<br/>

解析：<br/>

`queryCondition`条件查询的`ref`；`change('W1', 'workshopNum')`方法，<br/>

参数：`W1`为修改后的值，`workshopNum`为对应查询条件项的`字段名`。

<<< @/docs/.vuepress/components/docsComponents/TQueryCondition/handleEventChange.vue
</common-code-format>
