# 图片文件上传组件

---

<common-code-format>
  <docsComponents-TUploadFile-index slot="source"></docsComponents-TUploadFile-index>
   <<< @/docs/.vuepress/components/docsComponents/TUploadFile/index.vue
</common-code-format>

## 1. 简介

#### TUploadFile 组件（基于 elementUI 图片控件二次封装实现图片文件上传、下载、回显、编辑功能）

## 2. 配置参数(Attributes)

| 参数          | 说明                                                                 | 类型          | 是否必须 |
| ------------- | -------------------------------------------------------------------- | ------------- | -------- |
| uploadSuccess | 上传成功的回调，结合 setKey 使用用于更新业务中的绑定值               | function      | 是       |
| deleteSuccess | 上传失败的回调，结合 setKey 使用用于更新业务中的绑定值               | function      | 是       |
| setKey        | 用于更新业务中的绑定值                                               | String        | 是       |
| group         | 上传分组：1-临时文件 2-web 静态资源 3-运营文件 4-交易文件 5-客户文件 | String        | 否       |
| action        | 原插件上传保存图片的地址弃用，改用 http-request 自行封装             | String        | 否       |
| multiple      | 是否可上传多个文件                                                   | Boolean       | 否       |
| limit         | 限制上传文件个数                                                     | Number        | 否       |
| limitSize     | 限制上传文件大小默认 10MB                                            | String        | 否       |
| saveFileType  | 保存文件类型                                                         | String        | 是       |
| fileType      | 限制上传文件类型，用逗号分开 如.jpg,.jpeg                            | String        | 否       |
| disabled      | 不可编辑开关                                                         | Boolean       | 否       |
| fileNameLimit | 文件名字长度限制 默认 50                                             | Number        | 否       |
| editBackFile  | 是否编辑带出图片                                                     | Boolean       | 否       |
| fileIdList    | 回显图片的 id list 逗号分隔                                          | Array, String | 否       |
| isShowTips    | 是否显示底部提示信息                                                 | Boolean       | 否       |
| extendTips    | 额外的提示 如果要换行用$符号分割 如'aaaaaa$bbbbb'                    | String        | 否       |

## 3. 结构

##### 2.1 用法示例

```html
<upload-file
  @uploadSuccess="setFileId"
  @deleteSuccess="updateFileId"
  fileType=".jpg,.jpeg,.png,.pdf"
  setKey="authLetterFileIds"
  saveFileType="11"
></upload-file>

<upload-file
  @uploadSuccess="setFileId"
  @deleteSuccess="updateFileId"
  extendTips="1、基本账户：开户许可证+企业客户授权书。$2、一般账户：xxxx。"
  fileType=".jpg,.jpeg,.png,.pdf"
  setKey="bankAcctFileId"
  saveFileType="7"
></upload-file>
```

##### 2.3 用法示例 2 回显模块

```html
<upload-file
  disabled
  showOnly="true"
  :fileIdList="authLetterFileIds"
  :isShowTips="false"
  v-if="authLetterFileIds.length>0"
></upload-file>
```

```
回显图片最好使用 v-if 可以避免某些情况下回显的id未加载，等加载完控件没有触发刷新导致没有回显的问题
```

##### 2.3 业务代码中方法示例：

```js
@uploadSuccess=
@deleteSuccess=
setKey=
//这三个字段结合使用保持上传、删除实时更新业务代码中的绑定属性(TODO:用一个属性功能代替三个)

methods: {
  ...
  // 图片模块 上传后记录ids
  setFileId (data, key) {
    this[key] = data.res
    this.ruleForm[key] = this[key].join(',')
  },
  // 删除后更新ids
  updateFileId (data, key) {
    this[key] = data.res
    this.ruleForm[key] = this[key].join(',')
  }

```
