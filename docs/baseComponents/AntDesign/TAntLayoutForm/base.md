# ant 配置化表单组件

---

<common-code-format>
  <docsComponents-TAntLayoutForm-index slot="source"></docsComponents-TAntLayoutForm-index>
  <<< @/docs/.vuepress/components/docsComponents/TAntLayoutForm/index.vue
</common-code-format>

### TAntLayoutForm 表单布局组件

> **代码示例：**

```html
<!-- 第一种 表单形式 -->
<t-ant-layout-form
  :visible.sync="visible"
  title="单子表表单"
  sub-title="弹窗无法支持的采用复杂表单"
  :formOpts="formOpts"
  :get-container="getContainer"
  :tabs="tabs"
>
  <template slot="user">自定义插槽</template>
  <template slot="tab1">tab切换</template>
  <template slot="tab2">tab2222切换</template>
</t-ant-layout-form>

<!-- 第二种详情展示 根据formType-->
<t-ant-layout-form
  :visible.sync="visible1"
  title="详情页面"
  sub-title="多块详情页面"
  formType="desc"
  :descData="descData"
  :tabs="tabs"
>
  <!-- value自定义插槽 -->
  <template #text>
    <div>value自定义插槽</div>
  </template>
  <template slot="tab1">tab切换</template>
  <template slot="tab2">tab2222切换</template>
</t-ant-layout-form>
```

### 配置参数（Attributes）

| 参数       | 说明                                                                             | 类型        |       默认值 |
| :--------- | :------------------------------------------------------------------------------- | :---------- | -----------: |
| title      | 头部返回按钮标题                                                                 | string      |           无 |
| subTitle   | 头部副标题                                                                       | string      |           无 |
| extra      | 操作区，位于 title 行的行尾                                                      | slot        |           无 |
| footer     | 底部操作区（默认展示“取消/保存”按钮；使用插槽则隐藏）footer="null"时隐藏底部操作 | String/slot |           无 |
| visible    | a-drawer 是否显示（配合.sync 修饰符可使取消按钮关闭 a-drawer）                   | string      |        false |
| tabs       | 页面展示是否需要页签（并且 tabs 的 key 是插槽）                                  | Array       |           无 |
| handleType | 显示方式（edit 表 form 表单操作，desc 表详情页面）                               | string      |         edit |
| labelCol   | 表单 label 所占位置                                                              | Object      |  { span: 6 } |
| wrapperCol | 表单内容所占位置                                                                 | Object      | { span: 18 } |
| formOpts   | 表单配置描述，支持多分组表单                                                     | Object      |           无 |
| submit     | 保存时调用函数，返回 promise 可自动显示 loading                                  | function    | 所有表单数据 |
| descColumn | 详情页面展示每行显示几列（handleType= desc 生效）                                | Number      |            4 |
| descData   | 详情页面配置描述，支持多分组表                                                   | Object      |           无 |

### formOpt 配置参数（formOpt Attributes）——类型 Object

| 参数              | 说明                                                                                  | 类型             | 默认值  |
| :---------------- | :------------------------------------------------------------------------------------ | :--------------- | :------ |
| title             | 表单标题(是否显示控制折叠面板功能)                                                    | string           | 无      |
| slotName          | 插槽(自定义表单数据)有插槽就无需配置 opts                                             | slot             | 无      |
| opts              | 表单字段                                                                              | Object           | 无      |
| ----- label       | 表单字段说明标题                                                                      | string           | 无      |
| ----- comp        | 组件名称，可直接指定全局注册的组件，也可引入'ant-design-vue'如：Button 或者'a-button' | string,component | 无      |
| ----- rules       | 表单单项校验规则                                                                      | Array            | 无      |
| ----- gutter      | 控件占用的列宽，默认占用 1 列，最多 4 列                                              | number           | 1       |
| ----- changeEvent | 默认事件为@input，可通过该属性指定其他事件                                            | string           | 'input' |
| ----- bind        | 渲染时组件会调用 v-bind 指定设置该配置更新元素的属性                                  | object           | 无      |
| ----- event       | 配置组件事件，与写组件时@change 等同理                                                | object           | 无      |
| ----- child       | 子组件列表，类似 select 组件存在 options 子组件的则需要用到                           | formOpt[]        | 无      |

### descData 配置参数（descData Attributes）——类型 Object

| 参数           | 说明                                      | 类型   | 默认值 |
| :------------- | :---------------------------------------- | :----- | :----- |
| title          | 详情标题(是否显示控制折叠面板功能)        | string | 无     |
| slotName       | 插槽(自定义详情数据)有插槽就无需配置 data | slot   | 无     |
| data           | 详情字段                                  | Array  | 无     |
| ----- label    | 详情字段说明标题                          | string | 无     |
| ----- value    | 详情字段返回值                            | string | 无     |
| ----- slotName | 插槽（自定义 value）                      | slot   | 无     |

### 事件（Event）

| 方法名         | 说明                | 参数 |
| :------------- | :------------------ | :--- |
| update:visible | 点击返回/取消时触发 | -    |

### 方法（Methods）

| 方法名          | 说明                                                 | 参数 |
| :-------------- | :--------------------------------------------------- | :--- |
| resetFormFields | 对该表单项进行重置，将其值重置为初始值并移除校验结果 | -    |
| saveHandle      | 异步 form 表单校验，生成 submit 属性                 | -    |
