
<template>
  <div class="menu">
    <t-layout sectionTitle="menu 1-3">
      <div class="content-main">
        <timer-btn :second="3" @click="sendCode" />
        <t-remark
          :remarkVisible="remarkVisible"
          @update:visible="cancelVisible"
          @remarkConfirm="remarkConfirm"
          @phoneConfirm="phoneConfirm"
          @remarkOpen="remarkOpen"
          legalPhone="13075624042"
          ref="resetPhone"
          :isPhone="true"
        />
        <div class="tool-bar">
          <div v-for="checkedItem in checkedList" :key="checkedItem.type">
            <t-upload-file
              :attachmentType="checkedItem.type"
              @uploadSuccess="pushUploadItem"
              @deleteSuccess="pushUploadItem"
            ></t-upload-file>
          </div>
        </div>
      </div>
    </t-layout>
  </div>
</template>
<script>
export default {
  name: 'text333',
  data () {
    return {
      remarkVisible: false,
      fmFileList: [],
      uploadObj: {},
      checkedList: [
        {
          check: true,
          type: '001' // 资料类型：001-企业征信报告，002-个人征信报告，003-担保人，004-其他
        },
        {
          check: true,
          type: '002' // 资料类型：001-企业征信报告，002-个人征信报告，003-担保人，004-其他
        },
        {
          check: true,
          type: '003' // 资料类型：001-企业征信报告，002-个人征信报告，003-担保人，004-其他
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
    },
    sendCode () {
      console.log('点击按钮')
      this.remarkVisible = true
      console.log(this.remarkVisible)
    },
    cancelVisible (val) {
      this.remarkVisible = false
    },
    // 接收备注
    remarkConfirm (val) {
      console.log(val)
      this.remarkVisible = false
    },
    // 备注确定打开手机验证
    remarkOpen () {
      this.remarkVisible = false
    },
    // 接收备注/手机验证参数
    phoneConfirm (val, item) {
      console.log('phone', val, item)
      // this.remarkVisible = false
      // 确认短信验证
      // this.$refs.resetPhone.verifyCode(item)
    }
  }
}
</script>
