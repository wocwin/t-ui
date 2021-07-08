# Excel 导入组件

## 目前因依赖 core.js 与 babel-polyfill 冲突此组件暂时无法使用，后续更新！

### 可在项目运行中(npm run serve)查看案例 demo

---

<common-code-format>
  <docsComponents-TUploadExcel-index slot="source"></docsComponents-TUploadExcel-index>
  在组件中需配置
  
  属性`visible`是否显示弹窗
  
  `title`弹窗标题（默认：温馨提示）
  
  `@update:visible` 右上删除或取消事件
  
  新增`v-dialogDrag`指令可按头部拖拽弹窗
  
  `ElementUI`中`el-dialog`的属性皆可用(如：`close-on-click-modal`属性——点击空白区域是否关闭弹窗)

<<< @/docs/.vuepress/components/docsComponents/TUploadExcel/index.vue
</common-code-format>
