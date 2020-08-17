import { expect } from 'chai';
<template>
  <div class="tool-bar">
    <div class="el-row form-horizontal">
      <slot></slot>
      <el-collapse-transition>
        <div v-show="isShowMore">
          <slot name="more"></slot>
        </div>
      </el-collapse-transition>
      <div class="el-col-24" v-if="isShowMoreText">
        <div class="el-col-24 control-label t-padding-right-15">
          <span class="show-more" @click="isShowMore=!isShowMore">
            {{ showText }}
            <i :class="iconClass"></i>
          </span>
        </div>
      </div>
    </div>
    <div class="el-row form-horizontal">
      <div class="el-col-24 flex-box flex-ver">
        <el-button type="danger" @click="searchClick">{{ searchText }}</el-button>
        <el-button type="primary" @click="resetClick">{{ resetText }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TSearchCondition',
  props: {
    searchText: {
      type: String,
      default: '查询'
    },
    resetText: {
      type: String,
      default: '重置'
    },
    exportText: {
      type: String,
      default: '导出Excel'
    },
    addText: {
      type: String,
      default: '新增'
    },
    isShowMoreText: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isShowMore: false,
      showText: '展开更多查询项',
      iconClass: 'el-icon-arrow-down'
    }
  },
  watch: {
    isShowMore (val) {
      this.showText = this.isShowMore ? '收起更多查询项' : '展开更多查询项'
      this.iconClass = this.isShowMore ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
    }
  },
  methods: {
    searchClick () {
      this.$emit('searchClick')
    },
    resetClick () {
      this.$emit('resetClick')
    },
    createClick () {
      this.$emit('createClick')
    },
    exportExcel () {
      this.$emit('exportExcel')
    }
  }
}
</script>
<style lang="scss" scoped>
.show-more {
  cursor: pointer;
  color: rgb(115, 179, 248);
}
.show-more:hover {
  color: rgb(22, 131, 248);
}
</style>
