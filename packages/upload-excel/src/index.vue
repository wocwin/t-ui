<template>
  <div class="upload-excel">
    <input
      ref="excel-upload-input"
      class="excel-upload-input"
      type="file"
      accept=".xlsx, .xls"
      @change="handleClick"
    />
    <div
      class="drop"
      @drop="handleDrop"
      @dragover="handleDragover"
      @dragenter="handleDragover"
      @click="handleUpload"
    >
      <span v-if="!filesName">
        <i class="i-icon icon iconfont icon-hand-pointer"></i>
        {{templateText}}
      </span>
      <span v-if="filesName">
        <span class="text-primary">已选:</span>
        {{filesName}}
      </span>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx'
export default {
  name: 'TUploadExcel',
  props: {
    beforeUpload: Function, // eslint-disable-line
    onSuccess: Function, // eslint-disable-line
    templateText: { // 框中文字显示
      type: String,
      default: '点击选择上传模板'
    },
    selectedFileText: { // 选中文件名
      type: String
    }
  },
  data () {
    return {
      loading: false,
      filesName: this.selectedFileText,
      excelData: {
        header: null,
        results: null
      }
    }
  },
  methods: {
    generateData ({ header, results }) {
      this.excelData.header = header
      this.excelData.results = results
      this.onSuccess && this.onSuccess(this.excelData)
    },
    handleDrop (e) {
      e.stopPropagation()
      e.preventDefault()
      if (this.loading) return
      const files = e.dataTransfer.files
      if (files.length !== 1) {
        this.$message.error('只支持上传一个文件!')
        return
      }
      const rawFile = files[0] // only use files[0]

      if (!this.isExcel(rawFile)) {
        this.$message.error('只支持上传 .xlsx， .xls， .csv后缀文件')
        return false
      }
      this.upload(rawFile)
      e.stopPropagation()
      e.preventDefault()
    },
    handleDragover (e) {
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },
    handleUpload () {
      this.$refs['excel-upload-input'].click()
    },
    handleClick (e) {
      const files = e.target.files
      const rawFile = files[0]
      this.filesName = rawFile.name
      if (!rawFile) return
      this.upload(rawFile)
    },
    upload (rawFile) {
      this.$refs['excel-upload-input'].value = null // fix can't select the same excel

      if (!this.beforeUpload) {
        this.readerData(rawFile)
        return
      }
      const before = this.beforeUpload(rawFile)
      if (before) {
        this.readerData(rawFile)
      }
    },
    readerData (rawFile) {
      this.loading = true
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = e => {
          const data = e.target.result
          const workbook = XLSX.read(data, { type: 'array' })
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          const header = this.getHeaderRow(worksheet)
          const results = XLSX.utils.sheet_to_json(worksheet)
          this.generateData({ header, results })
          this.loading = false
          resolve()
        }
        reader.readAsArrayBuffer(rawFile)
      })
    },
    getHeaderRow (sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let C
      const R = range.s.r
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
        /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    },
    isExcel (file) {
      return /\.(xlsx|xls|csv)$/.test(file.name)
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-excel {
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .drop {
    border: 2px dashed #bbb;
    // width: 600px;
    height: 160px;
    line-height: 160px;
    margin: 0 auto;
    font-size: 30px;
    border-radius: 5px;
    text-align: center;
    color: #666;
    position: relative;
    cursor: pointer;
    i {
      font-size: 30px;
    }
    &:hover {
      border: 2px dashed #409eff;
    }
  }
}
</style>
