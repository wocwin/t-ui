# T-ui

## [Vue3 基础组件传送门](https://github.com/wocwin/t-ui-plus)

> 基于 Element-plus 二次封装基础组件地址

## [Vue2 基于ant-design-vue封装基础组件码云地址](https://gitee.com/wocwin/t-antd-ui)
## [Vue2 基于ant-design-vue封装基础组件GitHub地址](https://github.com/wocwin/t-antd-ui)

> 基于 ant-design-vue 二次封装基础组件地址

## 介绍

> 基于 Element-ui 二次封装组件

这是我在学习 Vue 中基于[Element-ui](https://element.faas.ele.me/#/zh-CN) 二次封装基础组件文档，希望对你有用。可查看 [详细组件案例文档](https://wocwin.github.io/t-ui/) 预览

<p align="center">
  <a href="https://github.com/vuejs/vue" target="_blank">
    <img src="https://img.shields.io/badge/vue-2.6.14-brightgreen.svg" alt="vue">
  </a>
  <a href="https://gitee.com/wocwin/t-ui/stargazers">
    <img src="https://gitee.com/wocwin/t-ui/badge/star.svg?theme=dark" alt="t-ui">
  </a>
  <a href="https://github.com/wocwin/t-ui/stargazers" target="_blank">
    <img src="https://img.shields.io/github/stars/wocwin/t-ui.svg" alt="t-ui">
  </a>
   <a href="https://www.npmjs.com/package/@wocwin/t-ui" target="_blank">
      <img alt="npm" src="https://img.shields.io/npm/v/@wocwin/t-ui.svg" />
    </a>
</p>

## 拆分基于ant-design-vue封装的组件（1.1.2版本）

>### [Vue2 基于ant-design-vue封装基础组件地址](https://github.com/wocwin/t-antd-ui)
## 动态效果图

<img src="./public/Tui__demo.gif">

## npm 方式安装使用
> ### 前提条件：使用项目必须全局注册 Element-ui组件库

```js
// 先安装
npm i @wocwin/t-ui
// 1、 在main.js中按下引入(全局使用)
import Tui from '@wocwin/t-ui'
Vue.use(Tui)

// 2、按需引入，在单个vue文件如下引入，在注册；或者在main.js中如下引入在注册，皆可！
import { TTable, TLayoutPage, TLayoutPageItem, TForm, TQueryCondition } from '@wocwin/t-ui'

```

## 直接在项目中全局使用

```js
// 1、把packages文件夹复制，放在自己项目中
// 2、假设 packages 与 src是同级，那么src下 main.js 如下操作即可全局使用t-ui
import Tui from '../packages'
Vue.use(Tui)
```

## 安装依赖

```shell
npm install

```

## 本地运行 src 中组件示例

```shell
npm run serve
```

## 本地运行 vuepress 中组件文档

```shell
npm run docs:dev

```
## Thanks to all the contributors

<a href="https://github.com/wocwin/t-ui/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=wocwin/t-ui" alt="contributors" />
</a>

## 微信交流群

>目前微信群已超过 200 人，需要加微信好友(请备注 T-ui)，拉大家进群

|                微信二维码                 |
| :---------------------------------------: |
| <img src="./public/wocwin.jpg" width=170> |

## Git 提交规范

- `ci`: ci 配置文件和脚本的变动;
- `chore`: 构建系统或辅助工具的变动;
- `fix`: 代码 BUG 修复;
- `feat`: 新功能;
- `perf`: 性能优化和提升;
- `refactor`: 仅仅是代码变动，既不是修复 BUG 也不是引入新功能;
- `style`: 代码格式调整，可能是空格、分号、缩进等等;
- `docs`: 文档变动;
- `test`: 补充缺失的测试用例或者修正现有的测试用例;
- `revert`: 回滚操作;
