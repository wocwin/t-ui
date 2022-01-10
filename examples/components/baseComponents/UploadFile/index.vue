
<template>
  <div class="upload-file-container">
    <el-upload
      ref="upload"
      :action="savePath"
      :headers="headers"
      :multiple="multiple"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      :on-remove="onRemove"
      :on-error="handleError"
      :on-progress="handleProgress"
      :on-preview="handlePreview"
      :accept="fileType"
      :disabled="disabled"
      :file-list="tempArr"
      :on-change="fileListChange"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <!-- :show-file-list="false" -->
      <!-- :auto-upload="false" -->
      <!-- :http-request="uploadRequest" -->
      <div v-if="isDrag">
        <i slot="default" class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>上传文件</em>
        </div>
      </div>
      <el-button v-else size="small" type="primary" :disabled="btnDisabled">上传文件</el-button>
      <div class="el-upload__tip upload-file-tips" slot="tip">
        仅允许上传类型为{{ fileType }},文件名不超过
        {{ fileNameLimit }}位，一次上传文件数量不超过
        {{ this.onceLimit }}个，并且不大于{{ limitSize }}MB的文件。
      </div>
    </el-upload>
  </div>
</template>
<script>
/**
 *  文件上传控件
 *  UploadFile
 *
 */
// import { getToken } from '@/utils/auth'
export default {
  name: 'UploadFile',
  data () {
    return {
      headers: {
        // Authorization: 'Bearer ' + getToken(),
        // xxl_sso_sessionid: getToken()
      },
      // 临时文件地址
      tempArr: this.showFileList,
      isUpload: false
    }
  },
  props: {
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
    // 限制上传的文件类型
    fileType: {
      type: String,
      default:
        '.jpg,.jpeg,.bmp,.png,.gif,.pdf,.doc,.docx,.xls,.xlsx,.txt,.rar,.zip'
    },
    // 服务器上传地址
    savePath: {
      type: String,
      default: 'string'
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 文件名字长度限制
    fileNameLimit: {
      type: Number,
      default: 50
    },
    // 回显文件的list
    showFileList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  watch: {
    showFileList: {
      handler (val) {
        this.tempArr = val
      }
    }
  },
  methods: {
    //  文件上传前的拦截
    beforeUpload (file) {
      // console.log('上传之前', this.tempArr)
      const overSize = file.size / (1024 * 1024) > this.limitSize
      const overFileNameLength = file.name.length > this.fileNameLimit
      let type = file.name
        .slice(file.name.lastIndexOf('.') + 1)
        .toLocaleLowerCase()
      let isNotMatchType = this.fileType.indexOf('.' + type) === -1
      if (overSize) {
        this.$messageUpload.error(`上传文件不得大于${this.limitSize}MB`)
        return false
      }
      if (overFileNameLength) {
        this.$messageUpload.error(
          `上传文件名称不得大于${this.fileNameLimit}位字符`
        )
        return false
      }
      if (isNotMatchType) {
        this.$messageUpload.error('上传文件类型不符合要求')
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
    objAddItem (tempArr = [], file) {
      const tempObj = {
        uid: file.uid, // uid用于辨别文件
        name: file.name, // 列表显示的文件名
        progress: 0, // 进度条
        code: 200 // 上传状态
      }
      tempArr.push(tempObj)
      this.$emit('changeFileList', tempArr)
    },
    // 文件上传成功时
    handleSuccess (response, file, fileList) {
      // console.log('上传成功', this.tempArr)
      if (response.code === 200) {
        this.tempArr.forEach((element, index) => {
          if (element.uid === file.uid) {
            element.progress = 100
            element.url = response.url || response.data[0].url
            this.$messageUpload.success('文件上传成功')
            this.$set(this.tempArr, index, element)
            this.$emit('changeFileList', this.tempArr)
          }
        })
      } else {
        this.tempArr.forEach((element, index) => {
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
    handleProgress (event, file, fileList) {
      // console.log('上传中', this.tempArr)
      // console.log(2222222222)
      // 编辑回显后在新增及弱网络初始化未上传文件进度展示0%
      this.tempArr.map((item) => {
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
    handlePreview (file) {
      let fileName = file.name.split('.')
      const imgFileType = ['jpg', 'jpeg', 'gif', 'png', 'bmp']
      if (imgFileType.includes(fileName[fileName.length - 1])) {
        window.open(file.url || file.response.url || file.response.data[0].url)
      } else {
        window.location.href =
          file.url || file.response.url || file.response.data[0].url
      }
    },
    // 文件上传失败删除该项
    handleError (err, file, fileList) {
      console.log('失败', err, file, fileList)
      this.tempArr.forEach((element, index) => {
        if (element.uid === file.uid) {
          // 上传失败删除该记录
          // this.tempArr.splice(index, 1)
          this.$messageUpload.error('文件上传失败')
          this.$emit('changeFileList', this.tempArr)
        }
      })
    },
    onRemove (file, fileList) {
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
    },
    // 判断是否已上传完
    finishedUpload (type) {
      // console.log(7777, this.tempArr)
      const isFinished = this.tempArr.every((item) => {
        return item.status === 'success' || item.status === 'fail'
      })
      if (!isFinished) {
        this.$confirm('您的文件还没有上传完，是否确定取消上传？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.abort()
            type
              ? this.$emit('isFinished', false, 'confirm')
              : this.$emit('isFinished', false, 'noUpload')
          })
          .catch(() => {
            this.$emit('isFinished', true, 'cancel')
          })
      } else {
        // 当点击外部弹框提交的时候 && 没有正在上传文件的时候 返回true  同理点击取消为false
        type
          ? this.$emit('isFinished', true, 'noUpload')
          : this.$emit('isFinished', false, 'noUpload')
      }
    },
    // 取消上传
    abort () {
      this.$refs.upload.abort()
    },
    // 手动上传到服务器
    submit () {
      this.$refs.upload.submit()
    },
    // 清空文件列表方法
    clearFiles () {
      this.$refs.upload.clearFiles()
    },
    fileListChange (file, fileList) {
      // console.log(4444, file)
      // console.log(5555, fileList)
      // const fileNum = fileList.length
      // if (this.onceLimit < fileNum) {
      //   this.isOnceLimit = true
      //   // console.log(66666, this.isOnceLimit)
      //   // this.tempArr = []
      //   // this.$refs.upload.clearFiles()
      // }
    }
  }
}
</script>
<style lang="scss">
.upload-file-container {
  display: flex;
  width: 500px;
  padding: 5px;
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
}
</style>
