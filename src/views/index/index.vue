<template>
  <div class="index-main">
    <t-layout sectionTitle="首页" class="main-content">
      <div class="main-content-info content-main">
        <el-row :gutter="32">
          <el-col :xs="24" :sm="24" :lg="24">
            <div class="card-panel flex-box flex-col">
              <div class="card-panel-icon-wrapper">
                <img src="@/assets/img/logo.jpg" class="response-img" />
              </div>
              <div class="card-panel-description flex-box flex-col">
                <div class="card-panel-title">基础组件</div>
                <div class="card-panel-text">
                  基础组件基础组件基础组件基础组件基础组件基础组件基础组件基础组件基础组件基础组件基础组件
                </div>
                <div class="card-panel-btn">
                  <el-button size="medium" type="danger" @click="toPaymentApply"
                    >前往基础组件</el-button
                  >
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <template #fixBtn></template>
    </t-layout>
  </div>
</template>

<script>
export default {
  name: 'index',
  methods: {
    toPaymentApply () {
      this.$router.push('/base-components/t-common-components/t-date-picker')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.index-main {
  .main-content {
    .main-content-info {
      overflow: hidden;
      padding: 15px;
      .card-panel {
        text-align: center;
        vertical-align: center;
        margin: 50px 100px;
        font-size: 12px;
        position: relative;
        overflow: hidden;
        background: #eee;
        border-radius: 8px;
        box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
        border-color: rgba(0, 0, 0, 0.1);
        .card-panel-icon-wrapper {
          margin: 30px;
          img {
            width: 100px;
            height: 100px;
          }
        }
        .card-panel-description {
          float: right;
          font-weight: bold;
          margin: 26px;
          .card-panel-title {
            line-height: 20px;
            color: #000;
            font-weight: bolder;
            font-size: 20px;
            margin-bottom: 20px;
          }
          .card-panel-text {
            line-height: 20px;
            color: rgba(0, 0, 0, 0.45);
            font-size: 14px;
            margin-bottom: 12px;
          }
          .card-panel-btn {
            cursor: pointer;
            margin-top: 30px;
          }
        }
      }
    }
  }
}
</style>
