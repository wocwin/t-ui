<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-upload-file
        @changeFileList="changeFileList"
        :showFileList="showFileList"
        ref="upload-file"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script>
export default {
  data() {
    return {
      showFileList: []
    }
  },
  methods: {
    changeFileList(list) {
      console.log('图片上传', list)
    }
  }
}
</script>
