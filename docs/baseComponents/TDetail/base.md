# 详情组件

---
## 基础用法
<common-code-format>
  <docsComponents-TDetail-base slot="source"></docsComponents-TDetail-base>

<<< @/docs/.vuepress/components/docsComponents/TDetail/base.vue
</common-code-format>

## 加边框
<common-code-format>
  <docsComponents-TDetail-border slot="source"></docsComponents-TDetail-border>
  
<<< @/docs/.vuepress/components/docsComponents/TDetail/border.vue
</common-code-format>

## 每行展示多少项
<common-code-format>
  <docsComponents-TDetail-descColumn slot="source"></docsComponents-TDetail-descColumn>
  
<<< @/docs/.vuepress/components/docsComponents/TDetail/descColumn.vue
</common-code-format>

## 垂直布局
<common-code-format>
  <docsComponents-TDetail-vertical slot="source"></docsComponents-TDetail-vertical>
  
<<< @/docs/.vuepress/components/docsComponents/TDetail/vertical.vue
</common-code-format>

## 插槽显示
<common-code-format>
  <docsComponents-TDetail-slotName slot="source"></docsComponents-TDetail-slotName>
  
<<< @/docs/.vuepress/components/docsComponents/TDetail/slotName.vue
</common-code-format>

## 字典回显
<common-code-format>
  <docsComponents-TDetail-index slot="source"></docsComponents-TDetail-index>
在组件中需配置：

`descColumn`：布局一行显示几列（默认：一行显示 4 列）

`descData` 显示数据源<br/>

若需要配置`filters`（下拉选择转中文）<br/>
`descData`每项中配置`filters`有三个参数

还需要配置`listTypeInfo`下拉数据源；类型 Object<br/>

`dataList`后台返回的详情接口数据

<<< @/docs/.vuepress/components/docsComponents/TDetail/index.vue
</common-code-format>

## 自定义label
<common-code-format>
  <docsComponents-TDetail-labelRender slot="source"></docsComponents-TDetail-labelRender>

<<< @/docs/.vuepress/components/docsComponents/TDetail/labelRender.vue
</common-code-format>

## TDetail Attributes

---

### 代码示例

> `详情组件————可实现表单回显`

```html
<t-detail :descData="descData" />
```
### 配置参数（Attributes）继承 el-descriptions el-descriptions-item Attributes

| 参数          | 说明                                               | 类型            | 默认值      |
| :------------ | :------------------------------------------------- | :-------------- | :---------- |
| descData      | 详情页面数据源                                     | Array           | -           |
| ----label     | 详情字段说明标题                                   | String          | -           |
| ----value     | 详情字段返回值                                     | String          | -           |
| ----unit      | 详情字段返回值单位                                 | String          | -           |
| ----fieldName | value 返回值的字段                                 | String          | -           |
| ----slotName  | 插槽（自定义 value）                               | slot            | -           |
| ----bind      | 继承el-descriptions-item属性                       | Object          | -           |
| ----span      | 占用的列宽，默认占用 1 列，最多 4 列               | Number          | 1           |
| ----tooltip   | value 值的提示语                                   | String/function | -           |
| ----filters   | 字典类型（即后台返回的是数字类型）过滤转成中文     | Object          | -           |
| -------list   | 字典 list 定义的数据名即 listTypeInfo 里面对应的值 | String          | -           |
| -------key    | 下拉数据源的 key 字段                              | String          | 'dictValue' |
| -------label  | 下拉数据源的 label 字段                            | String          | 'dictLabel' |
| descColumn    | 布局一行显示几列（默认：一行显示 4 列）            | Number          | 4           |
| dataList      | 开启 filters 时详情接口返回的数据                  | Object          | {}          |
| listTypeInfo  | 开启 filters 时下拉数据源                          | Object          | {}          |
