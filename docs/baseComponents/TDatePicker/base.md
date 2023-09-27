# 日期组件

---

<common-code-format>
  <docsComponents-TDatePicker-index slot="source"></docsComponents-TDatePicker-index>
  <<< @/docs/.vuepress/components/docsComponents/TDatePicker/index.vue
</common-code-format>

# TDatePicker 参数配置

## 1、简介：基于 ElementUI DatePicker DateTimePicker 组件的二次封装，取决于 type 值

**代码示例：**

```html
<t-date-picker v-model="date" />
```

## 2、t-date-picker（Attributes）继承 DatePicker DateTimePicker 的 Attributes

| 参数            | 说明                                               | 类型                  | 默认值 |
| :-------------- | :------------------------------------------------- | :-------------------- | :----- |
| v-model         | 绑定值                                             | [String, Date, Array] | -      |
| plusTime        | 日期范围是否显示 00:00:00 23:59:59 时分秒          | Boolean               | false  |
| type            | 时间类型（继承 element DatePicker DateTimePicker） | String                | -      |
| pickerOptions   | 当前时间日期选择器特有的选项                       | object                | -      |
| isPickerOptions | 是否开启自带快捷方式                               | Boolean               | false  |

## 3、type 类型如下：

> week 周；month 月；year 年；dates 多个日期；months 多个月；years 多个年；daterange 日期范围；monthrange 月份范围;datetime 日期和时间点;datetimerange 日期和时间点范围

## 4、pickerOptions（Attributes）

| 参数           | 说明                                              | 类型           | 默认值 |
| :------------- | :------------------------------------------------ | :------------- | :----- |
| shortcuts      | 设置快捷选项，需要传入 { text, onClick } 对象用法 | Object[]       | -      |
| disabledDate   | 设置禁用状态 ，要求返回 Boolean                   | Function       | -      |
| cellClassName  | 设置日期的 className                              | String         | -      |
| pickerOptions  | 当前时间日期选择器特有的选项（快捷方式）          | Function(Date) | -      |
| firstDayOfWeek | 周起始日                                          | Number         | 7      |

## 5、events

| 事件名 | 说明                   | 返回值                                               |
| :----- | :--------------------- | :--------------------------------------------------- |
| change | 用户确认选定的值时触发 | 组件绑定值。格式与绑定值一致，可受 value-format 控制 |
