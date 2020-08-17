<template>
  <div class="excel-upload">
    <t-layout sectionTitle="Excel上传组件">
      <step-wizard
        firstTitle="上传文件"
        secondTitle="核对信息"
        thirdTitle="完成"
        :successTitle="successTitle"
        @submitBtn="submitBtn"
        @next="next"
        @stepBack="stepBack"
        @goback="goback"
        :active="active"
      >
        <!-- 1.上传文件 -->
        <div slot="first" class="content-main">
          <upload-excel
            :on-success="handleSuccess"
            :before-upload="beforeUpload"
            :selectedFileText="fileName"
          />
          <div class="hint t-margin-top-10">
            <i class="i-icon icon iconfont icon-prompt t-padding5 text-primary" />&nbsp;
            <b>提示：</b>
            <span class="text-muted">
              1、如果您还没有导入模板，请点击
              <a @click="downloadTemplate">发票导入模板下载.xlsx</a>
            </span>
            <br />
            <span
              class="text-muted"
              style="margin-left: 76px;"
            >2、相同的发票不能重复上传，若已上传的数据不正确，请先删除，再重新上传。(发票号码和发票代码相同的为同一张发票)</span>
          </div>
        </div>
        <!-- 2.核对信息 -->
        <div slot="second" class="content-main">
          <div class="alert-content">
            <div class="alert alert-info text-center">
              <i class="i-icon icon iconfont icon-prompt t-padding5 text-primary" />&nbsp;
              <span>您本次共导入<span class="text-danger">{{importRecNum}}</span>条记录</span>
            </div>
          </div>
          <el-table
            :data="tableData"
            border
            highlight-current-row
            style="width: 100%;margin-top:20px;"
          >
            <el-table-column
              v-for="item of tableHeader"
              :key="item"
              :prop="item"
              :label="item"
              show-overflow-tooltip
              min-width="220"
              align="center"
            />
          </el-table>
          <!-- </div> -->
        </div>
      </step-wizard>
    </t-layout>
  </div>
</template>
<script>
export default {
  name: 'excelUpload',
  data () {
    return {
      successTitle: '发票导入完成...',
      fileName: '',
      active: 0, // 初始为从0开始
      importRecNum: 0, // 导入多少条数据
      tableData: [],
      tableHeader: [],
      invoiceList: {
        data: [],
        column: []
      }
    }
  },
  created () {
  },
  methods: {
    beforeUpload (file) {
      // console.log(33, file)
      this.fileName = file.name
      const isLt1M = file.size / 1024 / 1024 < 1
      if (isLt1M) {
        return true
      }
      this.$message({
        message: '请不要上传大于1m的文件.',
        type: 'warning'
      })
      return false
    },
    handleSuccess ({ results, header }) {
      this.importRecNum = results.length
      this.tableData = results
      this.tableHeader = header
    },
    // 第二步确认提交
    submitBtn (val) {
      this.active += 2
      this.fileName = ''
    },
    // 第一步--下一步
    next () {
      if (this.fileName) {
        this.active += 1
      } else {
        this.$message({
          message: '请先上传文件.',
          type: 'warning'
        })
        return false
      }
    },
    // 第二步---上一步
    stepBack () {
      this.active -= 1
    },
    // 第三步完成
    goback () {
      this.active = 0
      // TODO: 重新初始化处理
    },
    // 下载模板
    downloadTemplate () {
      console.log('下载模板')
    }
  }
}
</script>
