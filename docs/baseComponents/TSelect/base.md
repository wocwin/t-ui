# Select 下拉 组件

---

## 单选

<common-code-format>
  <docsComponents-TSelect-index slot="source"></docsComponents-TSelect-index>
   <<< @/docs/.vuepress/components/docsComponents/TSelect/index.vue
</common-code-format>

## 单选分页

<common-code-format>
  <docsComponents-TSelect-singlePagination slot="source"></docsComponents-TSelect-singlePagination>
  `注意：每次切换页面会清空之前页面选中的数据`

   <<< @/docs/.vuepress/components/docsComponents/TSelect/singlePagination.vue
</common-code-format>

## 自定义显示下拉项label

<common-code-format>
  <docsComponents-TSelect-customLabel slot="source"></docsComponents-TSelect-customLabel>
  设置customLabel字符串表达式：`${item.label}（${item.id}）`<br/>
  注意：表达式必须以`item`开头，且后面的属性必须存在`optionSource`中
  
   <<< @/docs/.vuepress/components/docsComponents/TSelect/customLabel.vue
</common-code-format>

## 多选

<common-code-format>
  <docsComponents-TSelect-multiple slot="source"></docsComponents-TSelect-multiple>
   <<< @/docs/.vuepress/components/docsComponents/TSelect/multiple.vue
</common-code-format>

## 多选分页

<common-code-format>
  <docsComponents-TSelect-multiplePagination slot="source"></docsComponents-TSelect-multiplePagination>
  `注意：每次切换页面会清空之前页面选中的数据`

   <<< @/docs/.vuepress/components/docsComponents/TSelect/multiplePagination.vue
</common-code-format>

## t-select——下拉 组件组件

**概述：**

`下拉选择组件————可实现单选多选（多选可使用全选功能）`

**代码示例：**

```html
<t-select
  v-model="selectVlaue"
  multiple
  :optionSource="listTypeInfo.stepList"
  valueKey="label"
  @change="selectChange"
/>
```

### 配置参数（Attributes）继承 el-select Attributes

| 参数             | 说明                                             | 类型                            | 默认值  |
| :--------------- | :----------------------------------------------- | :------------------------------ | :------ |
| v-model          | 绑定值                                           | boolean / string / number/Array | -       |
| multiple         | 是否多选 （显示全选）                            | Boolean                         | false   |
| optionSource     | 下拉数据源                                       | Array                           | -       |
| width            | select宽度（可以设置百分比或px）                 | String                          | 100%    |
| customLabel      | 是否自定义设置下拉label                          | String                          | -       |
| valueKey         | 传入的 option 数组中，要作为最终选择项的键值 key | String                          | 'key'   |
| labelKey         | 传入的 option 数组中，要作为显示项的键值名称     | String                          | 'label' |
| isShowPagination | 是否显示分页（分页不显示全选框）                 | Boolean                         | false   |
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
