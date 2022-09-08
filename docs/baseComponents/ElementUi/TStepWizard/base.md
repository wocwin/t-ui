# 步骤组件

---

<common-code-format>
  <docsComponents-TStepWizard-index slot="source"></docsComponents-TStepWizard-index>
   <<< @/docs/.vuepress/components/docsComponents/TStepWizard/index.vue
</common-code-format>

# TStepWizard 参数配置

### 1. 简介

步骤组件
**代码示例：**

```html
    <t-step-wizard
      :stepData="stepData"
      :active="active"
      :successTitle="successTitle"
      @complete="complete"  
      >
        <template #first>第一步骤</template>
      .....
  </t-step-wizard>
```

### 2. events

| 事件名   | 说明                 | 返回值     |
| :------- | :------------------- | :--------- |
| complete | 最后一步按钮点击事件 | 当前步骤值 |

### 3. 配置参数

| 参数              | 说明                                | 类型          | 默认值          |
| :---------------- | :---------------------------------- | :------------ | :-------------- |
| stepData          | 步骤数据源                          | Array         | -               |
| ---id             | 步骤 ID 唯一                        | Number        | -               |
| ---title          | 步骤头文字展示                      | String        | -               |
| ---slotName       | 每个步骤的具名 slot                 | String        | -               |
| ---icon           | 步骤头icon展示（element内置icon）   | String        | -               |
| ---description    | 步骤头描述                          | String        | -               |
| ---btnArr         | 每个步骤的按钮                      | Array         | -               |
| ----- btnTitle    | 按钮文字信息                        | String        | -               |
| ----- params      | 每个按钮传参信息（可以随意定义字段) | String/Number | -               |
| ----- fn          | 按钮事件                            | function      | -               |
| isShowLastSuccess | 是否显示默认 icon 最后一步          | Boolean       | el-icon-success |
| active            | 设置当前激活步骤                    | Number        | 0               |
| ---lastBtnArr     | 最后一步按钮需要多个                | Array         | -               |
| ----- btnTitle    | 按钮文字信息                        | String        | -               |
| ----- params      | 每个按钮传参信息（可以随意定义字段) | String/Number | -               |
| ----- fn          | 按钮事件                            | function      | -               |
| lastBtnTitle      | 最后一步骤成功按钮文字              | String        | 完成            |
| successTitle      | 最后一步骤成功提示语                | String        | -               |

### 4. 使用帮助

**js 代码**

```js
stepData: [
        {
          id: 1,
          title: '创建账户',
          slotName: 'first',
          btnArr: [
            {
              btnTitle: '下一步',
              params: 1,
              fn: this.next
            }
          ]
        },
        {
          id: 2,
          title: '填写基础信息',
          slotName: 'second',
          btnArr: [
            {
              btnTitle: '上一步',
              params: 2,
              fn: this.back
            },
            {
              btnTitle: '下一步',
              params: 2,
              fn: this.next
            }
          ]
        },
        {
          id: 3,
          title: '填写用户信息',
          slotName: 'third',
          btnArr: [
            {
              btnTitle: '上一步',
              params: 3,
              fn: this.back
            },
            {
              btnTitle: '下一步',
              params: 3,
              fn: this.next
            }
          ]
        },
        {
          id: 4,
          title: '注册成功'
        }
  ]
```

_注意:（以上表示）_
当前有 4 个步骤，其标题分别为：
1、创建账户
2、填写基础信息
3、填写用户信息
4、注册成功
解析第一步：（其它步骤都如此）
其内容放在 slot 为 first 中；有一个按钮为“下一步”，其事件是 next,默认参数是当前对象内容
具体 js 代码如下：

```js
 methods: {
    // 下一步
    next (val) { // val就是当前对象
      console.log(55, val)
      console.log(66, val.params)
      switch (val.params) {
        case 1:
          this.active += 1
          break
        case 2:
          this.active += 1
          break
        case 3:
          this.active += 2
          break
      }
    }
  }
```

### 5. 继承 elementUi el-steps/el-step 提供的属性
