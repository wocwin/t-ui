# 下拉选择分页组件

---
:::warning 注意

该组件v1.3.1废弃，请使用 [TSelect](/baseComponents/TSelect/base) 组件。

:::
## 单选

<common-code-format>
  <docsComponents-TPaginationSelect-index slot="source"></docsComponents-TPaginationSelect-index>
  在组件中需配置：

`optionSource` 下拉框组件数据源<br/>
`valueKey` 传入的 option 数组中，要作为最终选择项的键值名称<br/>
`labelKey` 传入的 option 数组中，要作为显示项的键值名称<br/>
`paginationOption` object 默认值<br/>

   <<< @/docs/.vuepress/components/docsComponents/TPaginationSelect/index.vue
</common-code-format>

## 单选-默认值回显

<common-code-format>
  <docsComponents-TPaginationSelect-singleDefault slot="source"></docsComponents-TPaginationSelect-singleDefault>
  在组件中需配置：

`optionSource` 下拉框组件数据源<br/>
`valueKey` 传入的 option 数组中，要作为最终选择项的键值名称<br/>
`labelKey` 传入的 option 数组中，要作为显示项的键值名称<br/>
`paginationOption` object 默认值<br/>

   <<< @/docs/.vuepress/components/docsComponents/TPaginationSelect/singleDefault.vue
</common-code-format>

## 多选

<common-code-format>
  <docsComponents-TPaginationSelect-multiple slot="source"></docsComponents-TPaginationSelect-multiple>
  在组件中需配置：

`multiple`：是否开启多选<br/>

`optionSource` 下拉框组件数据源<br/>
`valueKey` 传入的 option 数组中，要作为最终选择项的键值名称<br/>
`labelKey` 传入的 option 数组中，要作为显示项的键值名称<br/>
`paginationOption` object 默认值<br/>

   <<< @/docs/.vuepress/components/docsComponents/TPaginationSelect/multiple.vue
</common-code-format>

## 多选-默认值回显

<common-code-format>
  <docsComponents-TPaginationSelect-multipleDefault slot="source"></docsComponents-TPaginationSelect-multipleDefault>
  在组件中需配置：

`multiple`：是否开启多选<br/>

`optionSource` 下拉框组件数据源<br/>
`valueKey` 传入的 option 数组中，要作为最终选择项的键值名称<br/>
`labelKey` 传入的 option 数组中，要作为显示项的键值名称<br/>
`paginationOption` object 默认值<br/>

   <<< @/docs/.vuepress/components/docsComponents/TPaginationSelect/multipleDefault.vue
</common-code-format>

## t-pagination-select——下拉分页组件

**概述：**

`下拉分页组件————可实现单选多选`

### 1、代码示例

```html
<t-pagination-select
    v-model="materialId"
    :optionSource="materialIdArr"
    labelKey="materialName"
    valueKey="id"
    :paginationOption="setSelectPage"
  />
```

### 2、配置参数（Attributes）继承 el-select Attributes

| 参数             | 说明                                             | 类型                            | 默认值  |
| :--------------- | :----------------------------------------------- | :------------------------------ | :------ |
| v-model          | 绑定值                                           | boolean / string / number/Array | -       |
| optionSource     | 下拉数据源                                       | Array                           | -       |
| width            | select宽度（可以设置百分比或px）                 | String                          | 100%    |
| valueKey         | 传入的 option 数组中，要作为最终选择项的键值 key | String                          | 'key'   |
| labelKey         | 传入的 option 数组中，要作为显示项的键值名称     | String                          | 'label' |
| paginationOption | 分页配置项                                       | Object                          | -       |

### 2-1、paginationOption配置参数（Attributes）继承 el-pagination Attributes

| 参数        | 说明                                                          | 类型   | 默认值                    |
| :---------- | :------------------------------------------------------------ | :----- | :------------------------ |
| currentPage | 当前页数                                                      | number | 1                         |
| pageSize    | 每页显示条目个数                                              | number | 6                         |
| pagerCount  | 设置最大页码按钮数。 页码按钮的数量，当总页数超过该值时会折叠 | number | 5                         |
| total       | 总条目数                                                      | number | 0                         |
| layout      | 组件布局，子组件名用逗号分隔                                  | string | 'total,prev, pager, next' |
| bind        | 继承el-pagination属性                                         | Object | -                         |

### 3、继承 el-select&&el-pagination events