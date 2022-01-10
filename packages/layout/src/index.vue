<template>
  <div class="t_layout">
    <div ref="section" class="section">
      <header class="sectionTitle" v-if="isShowTitle">
        {{sectionTitle}}
        <div @click="$emit('click')">
          <el-button plain size="small" v-if="returnBtn">返回</el-button>
          <slot name="head-right"></slot>
        </div>
      </header>
      <div class="layout-content" ref="layoutContent">
        <slot></slot>
        <div class="flex-box flex-ver fix-btn">
          <slot name="fixBtn"></slot>
        </div>
        <div class="footer" v-if="isShowFooter">
          <div>**************有限公司版权所有 粤ICP备**********号-2</div>
          <div
            class="t-margin-top-5"
          >©2017-2023 JIANDANH INFORMATION TECH (GUANGZHOU) CO., LTD All Rights Reserved.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TLayout',
  props: {
    isShowTitle: {
      type: Boolean,
      default: true
    },
    sectionTitle: {
      type: String
    },
    returnBtn: {
      type: Boolean,
      default: false
    },
    isShowFooter: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    sectionTitleHeight () {
      return this.isShowTitle ? 50 : 0
    }
  },
  watch: {
  },
  mounted () {
    const fixBtnHeight = this.isShow('fixBtn') ? 40 : 0
    this.$refs.section.style.height = window.innerHeight - 113 + 'px'
    this.$refs.layoutContent.style.height = window.innerHeight - 166 + 'px'
    this.$refs.layoutContent.children[0].style.minHeight = window.innerHeight - 185 - fixBtnHeight - this.sectionTitleHeight + 'px'
    const that = this
    window.onresize = function temp () {
      that.$refs.section.style.height = window.innerHeight - 113 + 'px'
      that.$refs.layoutContent.style.height = window.innerHeight - 166 + 'px'
      that.$refs.layoutContent.children[0].style.minHeight = window.innerHeight - 185 - fixBtnHeight - that.sectionTitleHeight + 'px'
    }
    that.$on('hook:beforeDestroy', () => {
      window.onresize = null
    })
  },
  methods: {
    isShow (name) {
      return Object.keys(this.$slots).includes(name)
    }
  }
}
</script>

<style lang="scss" scoped>
.t_layout {
  display: flex;
  .section {
    width: 100%;
    // border: 1px solid #ccc;
    overflow-y: auto;
    overflow-x: hidden;
    background: #fff;
    .sectionTitle {
      height: 50px;
      border-bottom: 1px solid #eee;
      color: #666;
      line-height: 50px;
      padding: 0 20px;
      font-size: 18px;
      display: flex;
      justify-content: space-between;
    }
    .layout-content {
      font-size: 14px;
      text-align: left;
      position: relative;
      .fix-btn {
        width: 100%;
        padding: 10px 0;
        text-align: center;
        background: #fff;
      }
      .footer {
        font-size: 12px;
        color: #999;
        width: 100%;
        height: 50px;
        display: flex;
        background: #fff;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        user-select: none;
      }
    }
  }
}
</style>
