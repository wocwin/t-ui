# Switch 开关 组件

---

## 基本用法

<common-code-format>
  <docsComponents-TSwitch-index slot="source"></docsComponents-TSwitch-index>
  绑定v-model到一个Boolean类型的变量。<br/>
  可以使用`active-color`属性与`inactive-color`属性来设置开关的背景色。

   <<< @/docs/.vuepress/components/docsComponents/TSwitch/index.vue

</common-code-format>

## 文字描述

<common-code-format>
  <docsComponents-TSwitch-textDesc slot="source"></docsComponents-TSwitch-textDesc>
  使用`active-text`属性与`inactive-text`属性来设置开关的文字描述。

   <<< @/docs/.vuepress/components/docsComponents/TSwitch/textDesc.vue
</common-code-format>

## 内部文字描述

<common-code-format>
  <docsComponents-TSwitch-inlinePrompt slot="source"></docsComponents-TSwitch-inlinePrompt>
  设置`inlinePrompt`使`active-text`属性与`inactive-text`属性来设置开关的文字描述并其文字在开关内部。

   <<< @/docs/.vuepress/components/docsComponents/TSwitch/inlinePrompt.vue
</common-code-format>

## 扩展的 value 类型

<common-code-format>
  <docsComponents-TSwitch-activeValue slot="source"></docsComponents-TSwitch-activeValue>
  设置`active-value`和`inactive-value`属性，接受`Boolean`, `String`或`Number`类型的值。
  
   <<< @/docs/.vuepress/components/docsComponents/TSwitch/activeValue.vue
</common-code-format>

## 禁用状态

<common-code-format>
  <docsComponents-TSwitch-disabled slot="source"></docsComponents-TSwitch-disabled>
   <<< @/docs/.vuepress/components/docsComponents/TSwitch/disabled.vue
</common-code-format>



## t-switch 开关组件

```html
<t-switch
  v-model="selectVlaue"
/>
```

### 配置参数继承 el-switch Attributes/event

| 参数         | 说明                 | 类型    | 默认值 |
| :----------- | :------------------- | :------ | :----- |
| inlinePrompt | 文字描述组件内部显示 | Boolean | false  |

