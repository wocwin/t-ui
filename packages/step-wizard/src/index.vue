<template>
  <div class="step-wizard">
    <el-steps :active="active" simple finish-status="success" v-bind="$attrs">
      <el-step
        v-bind="$attrs"
        v-for="(item,index) in stepData"
        :key="index"
        :title="`${index+1} ${item.title}`"
        :icon="item.icon?item.icon:''"
        :description="item.description?item.description:''"
      ></el-step>
    </el-steps>
    <div class="content-step-main step-content">
      <div
        class="step-first flex-box flex-col flex-ver-h"
        v-for="(val,key) in stepContent()"
        :key="key"
        v-show="active===key"
      >
        <template v-if="val.slotName">
          <slot :name="val.slotName"></slot>
        </template>
        <fix-btn>
          <el-button
            v-for="(val1,key1) in val.btnArr"
            :key="key1"
            :type="val1.type||'danger'"
            @click="val1.fn(val1)"
            :disabled="val.disable||false"
          >{{val1.btnTitle}}</el-button>
        </fix-btn>
      </div>
      <div
        class="step-last flex-box flex-col flex-ver"
        v-if="active===stepData.length && isShowLastSuccess"
      >
        <div class="icon-success">
          <i class="el-icon-success"></i>
        </div>
        <h2 class="success-margin" v-html="successTitle"></h2>
        <fix-btn>
          <el-button
            v-if="!stepData[stepData.length-1].lastBtnArr"
            type="danger"
            @click="complete"
          >{{lastBtnTitle}}</el-button>
          <el-button
            v-else
            v-for="(item,key) in stepData[stepData.length-1].lastBtnArr"
            :key="key"
            @click="item.fn(item)"
            v-bind="{
              type:'danger',
              ...item.bind
            }"
          >{{item.btnTitle}}</el-button>
        </fix-btn>
      </div>
    </div>
  </div>
</template>
<script>
import FixBtn from './fixBtn'
export default {
  name: 'TStepWizard',
  components: { FixBtn },
  props: {
    // 步骤数据
    stepData: {
      type: Array,
      default: () => {
        return []
      },
      required: true
    },
    successTitle: {
      // 最后一步骤成功提示语
      type: String,
      default: ''
    },
    lastBtnTitle: {
      // 最后一步骤成功按钮文字
      type: String,
      default: '完成'
    },
    active: {
      type: Number,
      default: 0,
      required: true
    },
    isShowLastSuccess: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    stepContent() {
      return this.isShowLastSuccess
        ? this.stepData && this.stepData.slice(0, this.stepData.length - 1)
        : this.stepData
    },
    // 第四步完成
    complete() {
      this.$emit('complete', this.active)
    }
  }
}
</script>
<style lang="scss">
.i_layout {
  .section {
    .layout-content {
      padding: 0;
    }
  }
}
.step-wizard {
  position: relative;
  .el-steps--simple {
    border-radius: 0px;
  }
  .content-step-main {
    .step-last {
      .icon-success {
        color: #67c23a;
        font-size: 95px;
        margin-top: 40px;
      }
      .success-margin {
        margin-bottom: 70px;
      }
    }
  }
}
</style>
