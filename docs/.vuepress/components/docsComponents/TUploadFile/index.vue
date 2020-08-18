<template>
  <div class="upload-file-demo" style="min-height:100px;width:100%;padding:10px;">
    <div v-for="checkedItem in checkedList" :key="checkedItem.type">
      <t-upload-file
        :attachmentType="checkedItem.type"
        @uploadSuccess="pushUploadItem"
        @deleteSuccess="pushUploadItem"
      />
    </div>
  </div>
</template>

<script>
import TUploadFile from '../../../../../src/components/baseComponents/TUploadFile'
export default {
  components: {
    TUploadFile
  },
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
      let attachmentNo = val.res
      this.uploadObj[attachmentType] = attachmentNo
      if (!this.uploadObj[attachmentType] || this.uploadObj[attachmentType].length === 0) {
        delete this.uploadObj[attachmentType]
      }
      let tempFileList = []
      for (let key of Object.keys(this.uploadObj)) {
        let uploadListItem = {
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
