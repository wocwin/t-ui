# 弹窗组件

---

<common-code-format>
  <docsComponents-TDialog-index slot="source"></docsComponents-TDialog-index>
在组件中需配置：

属性`visible`是否显示弹窗

`title`：弹窗标题（默认：温馨提示）

`@update:visible` 右上删除或取消事件

`isShowDialogDrag`属性可以取消头部拖拽功能

`ElementUI`中`el-dialog`的属性皆可用(如：`close-on-click-modal`属性——点击空白区域是否关闭弹窗)

<<< @/docs/.vuepress/components/docsComponents/TDialog/index.vue
</common-code-format>

# 短信验证

---

<common-code-format>
  <docsComponents-TDialog-sms slot="source"></docsComponents-TDialog-sms>
  在组件中需配置：

属性`phoneVisible`是否显示弹窗

`legalPhone`：展示的手机号码

`personTxt` 展示谁的手机号码

`@update:visible` 右上删除或取消事件

新增`v-dialogDrag`指令可按头部拖拽弹窗；

`ElementUI`中`el-dialog`的属性皆可用(如：`close-on-click-modal`属性——点击空白区域是否关闭弹窗)

<<< @/docs/.vuepress/components/docsComponents/TDialog/sms.vue
</common-code-format>

# pdf 文件预览

---

<common-code-format>
  <docsComponents-TDialog-protocol slot="source"></docsComponents-TDialog-protocol>
  在组件中需配置：

属性`protocolVisible`是否显示弹窗

`protocolTitle` pdf 文件名

`@update:visible` 右上删除或取消事件

新增`v-dialogDrag`指令可按头部拖拽弹窗；

`ElementUI`中`el-dialog`的属性皆可用(如：`close-on-click-modal`属性——点击空白区域是否关闭弹窗)

<<< @/docs/.vuepress/components/docsComponents/TDialog/protocol.vue
</common-code-format>
