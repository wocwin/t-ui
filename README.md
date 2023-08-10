# T-ui

## [Vue3 基础组件传送门](https://github.com/wocwin/t-ui-plus)

> 基于 Element-plus 二次封装基础组件地址

## 介绍

> 以 T 字开头是基于 Element-ui 二次封装组件
>
> 以 TAnt 开头是基于 ant-design-vue 二次封装组件

这是我在学习 Vue 中基于[Element-ui](https://element.faas.ele.me/#/zh-CN) 和[ant-design-vue](https://www.antdv.com/docs/vue/introduce-cn/)二次封装基础组件文档，希望对你有用。可查看 [详细组件案例文档](https://wocwin.github.io/t-ui/) 预览

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

## 动态效果图

<img src="./public/Tui__demo.gif">

## npm 方式安装使用

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

|                微信二维码                 |
| :---------------------------------------: |
| <img src="./public/weixin.jpg" width=170> |
