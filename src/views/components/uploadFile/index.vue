<template>
  <div class="upload-file-demo">
    <t-layout sectionTitle="图片上传demo">
      <div class="content-main t-margin20">
        <div v-for="checkedItem in checkedList" :key="checkedItem.type">
          <t-upload-file
            :attachmentType="checkedItem.type"
            @uploadSuccess="pushUploadItem"
            @deleteSuccess="pushUploadItem"
          />
        </div>
      </div>
    </t-layout>
  </div>
</template>

<script>
export default {
  name: 'uploadFileDemo',
  data () {
    return {
      fmFileList: [],
      uploadObj: {},
      checkedList: [
        {
          check: true,
          type: '001'
        },
        {
          check: true,
          type: '002'
        },
        {
          check: true,
          type: '003'
        }
      ]
    }
  },
  methods: {
    pushUploadItem (val, attachmentType) {
      console.log(val, attachmentType)
      const attachmentNo = val.res
      this.uploadObj[attachmentType] = attachmentNo
      if (!this.uploadObj[attachmentType] || this.uploadObj[attachmentType].length === 0) {
        delete this.uploadObj[attachmentType]
      }
      const tempFileList = []
      for (const key of Object.keys(this.uploadObj)) {
        const uploadListItem = {
          attachmentNo: this.uploadObj[key],
          attachmentType: key
        }
        tempFileList.push(uploadListItem)
      }
      this.fmFileList = tempFileList
    }
  }
}
</script>
