
<template>
  <div class="t_upload_file" :class="{ 'hide_file': limitNum }">
    <el-upload
      ref="upload"
      :action="savePath"
      :multiple="multiple"
      :list-type="listType"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      :on-remove="onRemove"
      :on-error="handleError"
      :on-progress="handleProgress"
      :on-preview="handlePreview"
      :accept="fileType"
      :disabled="disabled"
      :file-list="tempArr"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <div v-if="listType === 'picture-card'">
        <i slot="default" class="el-icon-plus"></i>
        <div class="el-upload-list__item" style="position:relative" slot="file" slot-scope="{file}">
          <img
            :src="downloadFixedIcon(file.name)"
            class="el-upload-list__item-thumbnail pointer"
            alt
          />
          <span class="el-upload-list__item-actions">
            <span class="el-upload-list__item-preview">
              <i class="el-icon-zoom-in"></i>
            </span>
            <span class="el-upload-list__item-delete" @click="downloadFileHandle(file.id)">
              <i class="el-icon-download"></i>
            </span>
            <span class="el-upload-list__item-delete" @click="onRemove(file)" v-if="!disabled">
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div>
      </div>
      <div v-if="isDrag && listType !== 'picture-card'">
        <i slot="default" class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>上传文件</em>
        </div>
      </div>
      <el-button
        v-if="!isDrag && listType !== 'picture-card'"
        size="small"
        :disabled="btnDisabled"
        icon="el-icon-upload"
      >
        {{
        buttonName }}
      </el-button>
      <div class="el-upload__tip upload-file-tips" slot="tip" v-if="isShowTip">
        仅允许上传类型为{{ fileType }},文件名不超过
        {{ fileNameLimit }}位，一次上传文件数量不超过
        {{ this.onceLimit }}个，并且不大于{{ limitSize }}MB的文件。
      </div>
    </el-upload>
    <el-dialog
      class="dialog_preview"
      title="预览图片"
      width="40%"
      :visible="dialogVisible"
      @update:visible="dialogVisible = false"
    >
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>
<script>
/**
*  图片上传控件
*  UploadFile
*
*/
export default {
  name: 'TUploadFile',
  data() {
    return {
      dialogImageUrl: '', // 上传图片后预览预判地址
      dialogVisible: false, // 放大图片弹框
      // 临时文件地址
      tempArr: this.showFileList,
      isUpload: false
    }
  },
  props: {
    buttonName: {
      type: String,
      default: '上传文件'
    },
    // 是否开启提示
    isShowTip: {
      type: Boolean,
      default: false
    },
    // 按钮是否禁用
    btnDisabled: {
      type: Boolean,
      default: false
    },
    // 是否支持多选
    multiple: {
      type: Boolean,
      default: true
    },
    // 是按钮形式还是拖拽形式
    isDrag: {
      type: Boolean,
      default: false
    },
    // 限制上传文件大小默认50MB
    limitSize: {
      type: String,
      default: '50'
    },
    // 单次上传个数限制
    onceLimit: {
      type: Number,
      default: 10
    },
    // 最多上传个数限制
    totalLimit: {
      type: Number,
      default: 999
    },
    // 限制上传的文件类型
    fileType: {
      type: String,
      default: '.jpg,.jpeg,.bmp,.png,.gif,.pdf,.doc,.docx,.xls,.xlsx,.txt,.rar,.zip'
    },
    // 服务器上传地址
    savePath: {
      type: String,
      default: `https://jsonplaceholder.typicode.com/posts/`
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否支持弹窗预览
    isPreview: {
      type: Boolean,
      default: true
    },
    // 是否支持弹窗预览下载
    isDownload: {
      type: Boolean,
      default: false
    },
    // 文件名字长度限制
    fileNameLimit: {
      type: Number,
      default: 50
    },
    // 文件列表的类型 text/picture/picture-card
    listType: {
      type: String,
      default: 'picture-card'
    },
    // 回显文件的list
    showFileList: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 删除接口api
    apiRemove: {
      type: String
    }
  },
  computed: {
    limitNum() {
      return this.tempArr.length >= this.totalLimit
    }
  },
  watch: {
    showFileList: {
      handler(val) {
        this.tempArr = val
      }
    }
  },
  methods: {
    //  文件上传前的拦截
    beforeUpload(file) {
      // console.log('上传之前', this.tempArr)
      const overSize = file.size / (1024 * 1024) > this.limitSize
      const overFileNameLength = file.name.length > this.fileNameLimit
      let type = file.name.slice(file.name.lastIndexOf('.') + 1).toLocaleLowerCase()
      let isNotMatchType = this.fileType.indexOf('.' + type) === -1
      if (overSize) {
        this.$messageUpload.error(`上传文件不得大于${this.limitSize}MB`)
        return false
      }
      if (overFileNameLength) {
        this.$messageUpload.error(`上传文件名称不得大于${this.fileNameLimit}位字符`)
        return false
      }
      if (isNotMatchType) {
        this.$messageUpload.error('上传文件类型不符合要求')
        return false
      }
      if (this.tempArr.length >= this.totalLimit) {
        this.$messageUpload.error(`最多上传${this.totalLimit}个文件`)
        return false
      }
      // 上传中删除终止上传
      if (this.isUpload) {
        return false
      }
      // 大小和类型验证都通过后，给自定义的列表中添加需要的数据
      this.objAddItem(this.tempArr, file)
    },
    // 添加数据
    objAddItem(tempArr = [], file) {
      const tempObj = {
        uid: file.uid, // uid用于辨别文件
        name: file.name, // 列表显示的文件名
        fileSuffixName: file?.name?.split('.')[1], // 文件尾缀名
        sort: tempArr.length, // 排序号
        progress: 0, // 进度条
        code: 200 // 上传状态
      }
      tempArr.push(tempObj)
      this.$emit('changeFileList', tempArr)
    },
    // 文件上传成功时
    handleSuccess(response, file) {
      // console.log('上传成功', response, this.tempArr)
      if (response.code === 200) {
        this.tempArr.forEach((element, index) => {
          if (element.uid === file.uid) {
            element.progress = 100
            element.url = response.url || response.data?.url
            element.relativeUrl = response.data?.fileName
            this.$messageUpload.success('文件上传成功')
            this.$set(this.tempArr, index, element)
            this.$emit('changeFileList', this.tempArr)
          }
        })
      } else {
        this.tempArr.forEach((element) => {
          if (element.uid === file.uid) {
            // this.tempArr.splice(index, 1) // 上传失败删除该记录
            this.$messageUpload.error(response.msg)
            this.$emit('changeFileList', this.tempArr)
          }
        })
      }
    },
    /**
   * 文件上传时的钩子
   */
    handleProgress(event, file) {
      // console.log('上传中', this.tempArr)
      // console.log(2222222222)
      // 编辑回显后在新增及弱网络初始化未上传文件进度展示0%
      this.tempArr.map(item => {
        if (!item.response && !item.url) {
          this.$set(item, 'status', 'uploading')
          this.$set(item, 'percentage', item.progress)
        }
      })
      this.tempArr.forEach((element, index) => {
        if (element.uid === file.uid) {
          // 更新这个uid下的进度
          const progress = Math.floor(event.percent)
          // 防止上传完接口还没有返回成功值，所以此处给定progress的最大值为99，成功的钩子中再置为100
          element.progress = progress === 100 ? 99 : progress
          this.$set(this.tempArr, index, element)
          this.$emit('changeFileList', this.tempArr)
        }
      })
    },
    // 文件打开下载
    handlePreview(file) {
      if (this.isPreview) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      }
      if (this.isDownload) {
        let fileName = file.name.split('.')
        const imgFileType = ['jpg', 'jpeg', 'gif', 'png', 'bmp']
        if (imgFileType.includes(fileName[fileName.length - 1])) {
          window.open(file.url || file.response.url || file.response.data[0].url)
        } else {
          window.location.href = file.url || file.response.url || file.response.data[0].url
        }
      }
    },
    // 文件上传失败删除该项
    handleError(err, file, fileList) {
      console.log('失败', err, file, fileList)
      console.log('失败--', this.tempArr)
      // this.tempArr.forEach((element) => {
      //   if (element.uid === file.uid) {
      //     // 上传失败删除该记录
      //     // this.tempArr.splice(index, 1)
      //     this.$messageUpload.error('文件上传失败')
      //     this.$emit('changeFileList', this.tempArr)
      //   }
      // })
    },
    onRemove(file) {
      if (this.apiRemove) {
        this.$nextTick(() => {
          let data = {}
          // console.log('77--', file)
          if (!file.fileId) {
            data.fileUrl = file.fileUrl
          } else {
            data.fileId = file.fileId
            data.fileUrl = file.fileUrl
          }
          // console.log('dats', data)
          // const res = await this.$api[this.apiRemove](data)
          // return
          this.$api[this.apiRemove](data).then((res) => {
            if (res.success) {
              // console.log('99--,file', file)
              let deleteId = file && file.uid
              this.tempArr.forEach((item, index) => {
                if (item.uid === deleteId) {
                  this.tempArr.splice(index, 1)
                }
              })
              // this.$emit('changeFileList', this.tempArr)
              this.$messageUpload.success('删除成功')
            }
          })
        })
      } else {
        // console.log(33344, file, fileList)
        if (file && file.status === 'uploading') {
          // this.$refs.upload.abort()
          this.isUpload = true
        }
        let deleteId = file && file.uid
        this.tempArr.forEach((item, index) => {
          if (item.uid === deleteId) {
            this.tempArr.splice(index, 1)
          }
        })
        this.$emit('changeFileList', this.tempArr)
      }
    },
    // 判断是否已上传完
    finishedUpload(type) {
      // console.log(7777, this.tempArr)
      const isFinished = this.tempArr.every(item => {
        return (item.status === 'success' || item.status === 'fail')
      })
      if (!isFinished) {
        this.$confirm('您的文件还没有上传完，是否确定取消上传？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.abort()
          type ? this.$emit('isFinished', false, 'confirm') : this.$emit('isFinished', false, 'noUpload')
        }).catch(() => {
          this.$emit('isFinished', true, 'cancel')
        })
      } else {
        // 当点击外部弹框提交的时候 && 没有正在上传文件的时候 返回true  同理点击取消为false
        type ? this.$emit('isFinished', true, 'noUpload') : this.$emit('isFinished', false, 'noUpload')
      }
    },
    // 取消上传
    abort() {
      this.$refs.upload.abort()
    },
    // 手动上传到服务器
    submit() {
      this.$refs.upload.submit()
    },
    // 清空文件列表方法
    clearFiles() {
      this.$refs.upload.clearFiles()
    }
  }
}
</script>
<style lang="scss">
.t_upload_file {
  display: flex;
  // padding: 5px;
  justify-content: center;
  flex-direction: column;

  .el-upload-dragger {
    position: relative;
    overflow: initial;

    .el-upload__text {
      width: 50%;
      margin-top: 22px;
      white-space: nowrap;
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
    }
  }

  .upload-file-tips {
    text-align: left;
    line-height: 2;
  }

  .el-upload-list {
    text-align: left;
    padding-left: 30px;
    max-height: 300px;
    overflow-y: auto;

    .el-upload-list__item {
      transition-property: none;
      transition-duration: 0s;
      transition-timing-function: linear;

      .el-progress {
        top: 12px;
        height: 3px;
      }
    }
  }

  .el-upload-list {
    padding: 0;
    text-align: left;
    display: flex;
    flex-wrap: wrap;
  }

  .el-upload--picture-card {
    line-height: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .el-upload-list--picture-card {
    border: none;

    .is-ready {
      border: none;
    }
  }

  div:first-child {
    display: flex;
    flex-wrap: wrap;
  }

  .dialog_preview {
    .el-dialog__header {
      width: 100%;
    }
  }

  #upload_list {
    .el-upload-list__item {
      .content_wrap {
        font-size: 14px;
        line-height: 18px;
        padding: 0 4px;
        display: flex;

        > i.el-icon-document,
        span {
          color: #333;
          vertical-align: middle;
          line-height: 18px;
        }

        > i.el-icon-circle-check {
          color: #67c23a;
          float: right;
          vertical-align: middle;
          line-height: 18px;
        }

        > i.el-icon-circle-close {
          color: #f56c6c;
          float: right;
          vertical-align: middle;
          line-height: 18px;
        }

        > span {
          cursor: pointer;
          display: inline-block;
          margin-left: 4px;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        > .file_name:hover {
          color: #409eff;
          text-decoration: underline;
        }
      }

      > .content_wrap:hover {
        background: rgba(0, 0, 0, 0.035);
      }
    }
  }

  &.hide_file {
    .el-upload--picture-card {
      display: none;
    }
  }
}
</style>
