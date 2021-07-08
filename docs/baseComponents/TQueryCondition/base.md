# 查询条件组件

---

<common-code-format>
  <docsComponents-TQueryCondition-index slot="source"></docsComponents-TQueryCondition-index>
  <<< @/docs/.vuepress/components/docsComponents/TQueryCondition/index.vue
</common-code-format>

# TQueryCondition 参数配置

### 1. 简介：可以让多种查询条件在输入值后置顶并且按钮显示在右侧，可以收起或展开所有查询条件

查询条件组件
**代码示例：**

```
     <t-query-condition
      :query.sync="queryInfo.query"
      :query-list="queryInfo.queryList"
      :list-type-info="listTypeInfo"
      @handleEvent="handleEvent"
      @reset="reset"
    />
    //注意参数接收必须要‘.sync’修饰符
```

### 2. events

|   事件名    | 说明                 |                 返回值                 |
| :---------: | :------------------- | :------------------------------------: |
|    reset    | 重置按钮             |                   无                   |
| handleEvent | 单个查询条件触发事件 | 查询条件输入的值/queryList 中 event 值 |

### 3. 配置参数

| 参数           | 说明                                             | 类型    | 是否必须 |
| -------------- | ------------------------------------------------ | ------- | -------- |
| className      | 自定义类名                                       | String  | 否       |
| listTypeInfo   | 下拉选择数据源（type:'select'有效）              | Object  | 否       |
| queryList      | 查询条件 list                                    | Array   | 是       |
| ---type        | 查询条件类型                                     | String  | 是       |
| ---label       | 查询条件 title                                   | String  | 是       |
| ---value       | 查询条件传给后台的参数                           | String  | 是       |
| ---startDate   | 仅仅针对（type:'t-date'有效）与 endDate 同时使用 | String  | 否       |
| ---endDate     | 仅仅针对（type:'t-date'有效）选择开始——结束日期  | String  | 否       |
| ---plusTime    | 仅仅针对（type:'t-date'有效）是否带后缀时分秒    | Boolean | 否       |
| ---list        | 下拉选择数据源（仅仅对 type:'select'有效）       | String  | 否       |
| ---event       | 每个步骤的按钮                                   | Array   | 是       |
| ---valueFormat | type 为 date 日期返回值格式                      | String  | 是       |
| query          | 参数                                             | Object  | 是       |
