/* eslint-disable vue/require-valid-default-prop */
<template>
  <div class="t-search">
    <div class="search-main">
      <div class="search-left">
        <el-input :placeholder="tips" clearable v-model="currentVal" class="input-with-select">
          <!-- filterable取消下拉选项搜索功能 -->
          <el-select
            v-if="searchCondition.length>0"
            v-model="currentType"
            @change="changeSelect"
            slot="prepend"
            placeholder="请选择"
            v-bind="$attrs"
            v-on="$listeners"
          >
            <el-option
              v-for="(item, index) in searchCondition"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="search()">查询</el-button>
        </el-input>
      </div>
      <div class="search-right">
        <slot name="operate"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TSearch',
  data () {
    return {
      currentType: this.selectValue,
      currentVal: this.searchValue
    }
  },
  props: {
    searchValue: { // 查询值
      type: String,
      default: ''
    },
    selectValue: { // 下拉选项值
      type: String,
      default: ''
    },
    // eslint-disable-next-line vue/no-dupe-keys
    searchCondition: { // 下拉选项
      type: Array,
      default: () => {
        return []
      }
    },
    tips: {
      type: String,
      default: '请输入查询内容'
    }
  },
  methods: {
    search () {
      this.$emit('click', this.currentVal)
    },
    changeSelect () {
      // 清空输入框
      this.currentVal = ''
      this.$emit('change', this.currentType)
    }
  }
}
</script>
<style lang="scss">
.t-search {
  padding: 20px 0;
  width: 435px;
  &:before {
    content: '' !important;
  }
  .search-main {
    display: flex;
    justify-content: space-between;
    .el-input-group__prepend {
      background-color: #fff;
      width: 130px;
      .el-input__inner {
        text-align: center;
        width: 130px !important;
      }
    }
    .search-left {
      .el-input__inner {
        width: 260px;
      }
    }
    button {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
  .search-right {
    margin-left: 20px;
    div {
      display: flex;
      align-items: center;
    }
  }
}
</style>
