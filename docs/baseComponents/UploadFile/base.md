# 文件文件上传组件

---

<common-code-format>
  <docsComponents-UploadFile-index slot="source"></docsComponents-UploadFile-index>
   <<< @/docs/.vuepress/components/docsComponents/UploadFile/index.vue
</common-code-format>

## UploadFile 文件上传组件

**代码示例：**

```
方式一：按钮形式
 <UploadFile
      ref="uploadFile"
      @isFinished="isFinished"
      :savePath="uploadImgUrl" // 上传服务器地址
      :showFileList="fileList" // 回显文件列表
      @changeFileList="uploadedSuccess" // 获取最终已上传文件
      />

  方式二：拖拽形式
  <UploadFile
      ref="uploadFile"
      isDrag // 是否显示拖拽样式
      drag // 是否启用拖拽上传
      @isFinished="isFinished"
      :savePath="uploadImgUrl" // 上传服务器地址
      :showFileList="fileList" // 回显文件列表
      @changeFileList="uploadedSuccess" // 获取最终已上传文件
      />
```

### Attribute

| 参数          | 说明                             | 类型    | 默认值                                                              |
| ------------- | -------------------------------- | ------- | ------------------------------------------------------------------- |
| multiple      | 是否支持多选文件                 | boolean | true                                                                |
| showFileList  | 回显文件的 list                  | Array   | []                                                                  |
| drag          | 是否启用拖拽上传                 | boolean | false                                                               |
| isDrag        | 是按钮形式还是拖拽形式(默认按钮) | boolean | false                                                               |
| btnDisabled   | 按钮形式上传禁用                 | boolean | false                                                               |
| fileNameLimit | 文件名字长度限制                 | Number  | 50                                                                  |
| limitSize     | 限制上传文件大小（MB）           | string  | 50                                                                  |
| fileType      | 限制上传的文件类型               | string  | .jpg,.jpeg,.bmp,.png,.gif,.pdf,.doc,.docx,.xls,.xlsx,.txt,.rar,.zip |
| savePath      | 服务器上传地址                   | string  | string                                                              |

### events

| 事件名         | 说明                                   | 返回值                                         |
| -------------- | -------------------------------------- | ---------------------------------------------- |
| changeFileList | 上传文件/删除已上传文件                | fileList（最终已上传的文件数组）               |
| isFinished     | 外部引入组件确认文件是否已全部上传成功 | (false,confirm)/(true,cancel)/(false,noUpload) |

### Methods

| 方法名         | 说明                                              | 参数                     |
| -------------- | ------------------------------------------------- | ------------------------ |
| finishedUpload | 判断文件是否已成功上传                            | type(boolean:true/false) |
| clearFiles     | 清空已上传的文件列表                              | —                        |
| abort          | 取消上传请求                                      | —                        |
| submit         | 手动上传文件列表（需要配合 auto-upload 属性使用） | —                        |

### 关于 element-ui el-upload 提供的属性如何添加

按照 el-upload 写法直接使用即可，无需其他配置（如：限制总上传数需新增 limit 属性）
