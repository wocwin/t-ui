<template>
  <el-select
    popper-class="t_pagination_select"
    v-model="childSelectedValue"
    :style="{width: width||'100%'}"
    v-bind="attrs"
    v-on="$listeners"
  >
    <el-option
      v-for="item in optionSource"
      :key="item[valueKey]"
      :label="item[labelKey]"
      :value="item[valueKey]"
    ></el-option>
    <el-pagination
      :layout="paginationOption.layout || 'total,prev, pager, next'"
      :page-size="paginationOption.pageSize"
      :current-page="paginationOption.currentPage"
      :pager-count="paginationOption.pagerCount"
      :total="paginationOption.total"
      v-bind="{
            small: true,
            'hide-on-single-page':true,
            background: true,
            ...$attrs,
            ...paginationOption.bind,
          }"
      v-on="$listeners"
    />
  </el-select>
</template>

<script>

export default {
  name: 'TPaginationSelect',
  props: {
    value: {
      type: [String, Number, Array]
    },
    // 选择框宽度
    width: {
      type: String
    },
    // 传入的option数组中，要作为最终选择项的键值名称
    valueKey: {
      type: String,
      default: 'key'
    },
    // 传入的option数组中，要作为显示项的键值名称
    labelKey: {
      type: String,
      default: 'label'
    },
    // 下拉框组件数据源
    optionSource: {
      type: Array
    },
    // 分页配置项
    paginationOption: {
      type: Object,
      default: () => {
        return {
          pageSize: 6, // 每页显示条数
          currentPage: 1, // 当前页
          pagerCount: 5, // 按钮数，超过时会折叠
          total: 0 // 总条数
        }
      }
    }
  },
  computed: {
    childSelectedValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    attrs() {
      return {
        clearable: true,
        filterable: true,
        ...this.$attrs
      }
    }
  }
}
</script>
 <style lang="scss">
.t_pagination_select {
  .el-pagination {
    display: flex;
    background-color: #fff;
    align-items: center;
    .el-pagination__total,
    .el-pager,
    button {
      display: flex;
      align-items: center;
    }
  }
}
</style>
