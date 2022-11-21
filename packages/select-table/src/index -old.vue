<template>
  <el-select @change="change" class="t-select" popper-class="t-select-table" ref="tSelect" v-bind="attrs"
    v-on="$listeners" :value-key="returnObj? configure.keywords.value :''">
    <!-- 表头 -->
    <div class="t-table-header" :class="{ 'fixed_head': fixedHead }">
      <table cellspacing="0" cellpadding="0" border="0" class="t-table-wrapper" style="width: 100%;">
        <thead>
          <tr :class="{ hasBorder: thBorder }">
            <th v-for="item in configure.columns" :key="String(item.title)"
              :style="{ width: item.width || '110px', minWidth: item.width || '110px' }" class="t-th">
              <div class="t-header-txt">{{ item.title }}</div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <!-- 选项 -->
    <!-- <div style="height: 44px;width: 100%;"></div> -->
    <div class="t-select-option">
      <el-option class="select_option" v-for="(item, i) in list" :key="i" :label="item[configure.keywords.label]"
        :value="configure.keywords.value == 'item' ? item : item[configure.keywords.value]">
        <tr :class="[{ hasBorder: tdBorder }, 't-tr']">
          <td class="t-ceil"
            :style="{ maxWidth: child.width, width: child.width || '110px', minWidth: child.width || '110px' }"
            v-for="(child, j) in configure.columns" :key="j">
            {{ item[child.prop] }}
          </td>
        </tr>
      </el-option>
    </div>
    <!-- 无匹配数据 -->
    <template #empty>
      <div :style="{ width: minWidth + 'px' }" class="empty-box">
        无匹配数据
      </div>
    </template>
    <!-- 分页 -->
    <div class="t-bottom-page" v-if="isShowPagination">
      <el-pagination v-bind="pageAttrs" v-on="$listeners" :current-page="configure.tablePagination.currentPage"
        :page-size="configure.tablePagination.pageSize" :total="configure.tablePagination.total">
      </el-pagination>
    </div>
  </el-select>
</template>

<script>
export default {
  name: 'TSelectTable',
  props: {
    // 配置
    configure: {
      type: Object,
      default: () => ({})
    },
    // 下拉菜单数组
    list: {
      type: Array,
      default: () => ([])
    },
    returnObj: {
      type: Boolean,
      default: false
    },
    // 开启分页
    isShowPagination: {
      type: Boolean,
      default: false
    },
    // 是否固定表头
    fixedHead: {
      type: Boolean,
      default: false
    },
    // 最大高度
    maxWidth: {
      type: String,
      default: ''
    },
    // 最大高度
    maxHeight: {
      type: String,
      default: '300px'
    },
    // 开启表头边框
    thBorder: {
      type: Boolean,
      default: true
    },
    // 开启表体边框
    tdBorder: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    this.setPadding()
    this.setMaxHeight()
  },
  data() {
    return {
    }
  },
  computed: {
    minWidth() {
      // 计算宽度
      let width = 0
      const temp = this.configure.columns
      temp.map((item) => {
        if (item.width) {
          width += Number(item.width.substring(0, item.width.length - 2))
        }
      })
      return width
    },
    // 属性
    attrs() {
      return {
        clearable: true,
        filterable: true,
        'popper-append-to-body': true,
        ...this.$attrs
      }
    },
    pageAttrs() {
      return {
        layout: 'total,  prev, pager, next, jumper',
        'page-sizes': [10, 20, 50, 100],
        'pager-count': 5,
        ...this.$attrs
      }
    }
  },
  methods: {
    change(val) {
      if (this.returnObj) {
        this.list.map(item => {
          if (item[this.configure.keywords.value] === val) {
            this.$emit('selectChange', item)
          }
        })
      } else {
        this.$emit('selectChange', val)
      }
    },
    // 有分页增加底部padding
    setPadding() {
      if (this.isShowPagination) {
        this.$refs.tSelect.$el.getElementsByClassName('el-select-dropdown__wrap')[0].style.paddingBottom = '50px'
      } else {
        this.$refs.tSelect.$el.getElementsByClassName('el-select-dropdown__wrap')[0].style.paddingBottom = '20px'
      }
    },
    // 计算最大高度
    setMaxHeight() {
      if (this.maxHeight) {
        this.$refs.tSelect.$el.getElementsByClassName('el-select-dropdown__wrap')[0].style.maxHeight = this.maxHeight
      }
      if (this.maxWidth) {
        this.$refs.tSelect.$el.getElementsByClassName('el-select-dropdown__wrap')[0].style.maxWidth = this.maxWidth
      }
    },
    // 使 input 获取焦点
    focus() {
      this.$refs.tSelect.focus()
    },
    // 使 input 失去焦点，并隐藏下拉框
    blur() {
      this.$refs.tSelect.blur()
    }
  }

}
</script>

<style lang="scss">
.t-select-table {

  // 表头
  &.el-popper {
    .t-table-header {
      // position: absolute;
      // top: 0;
      // left: 0;
      width: 100%;
      height: 44px;
      font-size: 13px;
      font-weight: 600;
      z-index: 999;
      color: #515a6e;
      background-color: #f8f8f9;

      .t-table-wrapper {
        height: 100%;

        .hasBorder {
          .t-th {
            border: 1px solid #dfe6ec;
            border-left: none;
            border-top: none;
          }

          .t-th:last-child {
            border-right: none;
          }
        }
      }
    }
  }

  // 隐藏滚动条
  // .el-scrollbar__wrap {
  //   overflow: scroll;
  // }

  // .el-scrollbar__thumb {
  //   display: none; //去掉右侧滚动条
  // }

  // 表体
  .el-select-dropdown__list {
    padding: 0;

    .select_option {
      padding: 0;
      border-bottom: 1px solid #dfe6ec;
      white-space: normal; // 换行
      word-wrap: break-word;
      text-overflow: initial;
      height: auto;
      line-height: 100%;
      vertical-align: middle;

      .el-select-dropdown__item {
        padding: 0;
      }

      .hasBorder .t-ceil {
        border-left: 1px solid #dfe6ec;
      }

      .t-ceil {
        height: 44px;
        // padding: 10px 12px;
        text-align: center;
        // line-height: 18px;

        &:first-child {
          border-left: 0;
        }
      }
    }
  }

  // 无匹配数据
  .empty-box {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #a7a7a7;
  }

  // 分页
  .el-scrollbar {
    .el-select-dropdown__wrap {
      max-height: 350px;
      // overflow-x: hidden;
      display: -webkit-box;
    }
  }

  .t-bottom-page {
    position: absolute;
    bottom: 0px;
    left: 0;
    width: 100%;
    background-color: #f8f8f9;
    z-index: 99;
  }
}
</style>
