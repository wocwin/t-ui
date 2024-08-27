# 安装&使用

::: tip 提示

@wocwin/t-ui 是基于 vue2 + Element-ui  二次封装的基础组件

:::

## Install

```js
npm install @wocwin/t-ui -S
&
yarn add @wocwin/t-ui -S
```

## Usage

```js
// main.js
import Tui from "@wocwin/t-ui"

Vue.use(Tui)
```
## 全部组件如下
| 组件名称        | 说明                                                                                                                                                      |
| :-------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TLayoutPage     | 布局页面                                                                                                                                                  |
| TLayoutPageItem | 布局页面子项                                                                                                                                              |
| TAdaptivePage   | [一屏组件](https://wocwin.github.io/t-ui/baseComponents/TAdaptivePage/base.html?_blank)（继承TTable 及 TQueryCondition 组件的所有属性、事件、插槽、方法） |
| TQueryCondition | [条件查询组件](https://wocwin.github.io/t-ui/baseComponents/TQueryCondition/base.html?_blank)                                                             |
| TTable          | [表格组件](https://wocwin.github.io/t-ui/baseComponents/TTable/base.html?_blank)                                                                          |
| TForm           | [表单组件](https://wocwin.github.io/t-ui/baseComponents/TForm/base.html?_blank)                                                                           |
| TSelectTable    | [下拉选择表格组件](https://wocwin.github.io/t-ui/baseComponents/TSelectTable/radio.html?_blank)                                                           |
| TSelect         | [下拉选择组件](https://wocwin.github.io/t-ui/baseComponents/TSelect/base.html?_blank)                                                                     |
| TDetail         | [详情组件](https://wocwin.github.io/t-ui/baseComponents/TDetail/base.html?_blank)                                                                         |
| TButton         | [防抖按钮组件](https://wocwin.github.io/t-ui/baseComponents/TButton/base.html?_blank)                                                                     |
| TStepWizard     | [步骤条组件](https://wocwin.github.io/t-ui/baseComponents/TStepWizard/base.html?_blank)                                                                   |
| TTimerBtn       | 定时按钮组件                                                                                                                                              |
| TModuleForm     | [模块表单/详情组件](https://wocwin.github.io/t-ui/baseComponents/TModuleForm/base.html?_blank)                                                            |
| TDatePicker     | [日期选择器组件](https://wocwin.github.io/t-ui/baseComponents/TDatePicker/base.html?_blank)                                                               |
| TInput          | [input组件](https://wocwin.github.io/t-ui/baseComponents/TInput/base.html?_blank)                                                                         |
| TDialog         | [弹窗组件](https://wocwin.github.io/t-ui/baseComponents/TDialog/base.html?_blank)                                                                         |
| TTreeSelect     | [下拉树形结构组件](https://wocwin.github.io/t-ui/baseComponents/TTreeSelect/base.html?_blank)                                                             |

## Git 提交规范
```json
ci: ci 配置文件和脚本的变动;
chore: 构建系统或辅助工具的变动;
fix: 代码 BUG 修复;
feat: 新功能;
perf: 性能优化和提升;
refactor: 仅仅是代码变动，既不是修复 BUG 也不是引入新功能;
style: 代码格式调整，可能是空格、分号、缩进等等;
docs: 文档变动;
test: 补充缺失的测试用例或者修正现有的测试用例;
revert: 回滚操作;
```


## [Vue2 基于ant-design-vue封装基础组件地址](https://github.com/wocwin/t-antd-ui)

> 基于 ant-design-vue 二次封装基础组件地址
>
> 
## [Vue3 基础组件地址](https://github.com/wocwin/t-ui-plus)

> 基于 Element-plus 二次封装基础组件地址
