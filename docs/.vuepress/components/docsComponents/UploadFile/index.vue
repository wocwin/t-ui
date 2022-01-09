<template>
  <div class="upload-file-demo" style="min-height:100px;width:100%;padding:10px;">
    <upload-file
      ref="uploadFile"
      :savePath="uploadImgUrl"
      :showFileList="fileList"
      @changeFileList="pushUploadItem"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      fileList: [],
      uploadImgUrl: '#'
    }
  },
  methods: {
    pushUploadItem (fileList) {
      this.fileList = fileList
    }
  }
}
</script>
