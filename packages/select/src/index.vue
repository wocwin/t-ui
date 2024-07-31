<template>
  <el-select
    popper-class="t_select"
    v-model="childSelectedValue"
    :style="{width: width||'100%'}"
    v-bind="attrs"
    v-on="$listeners"
    :multiple="multiple"
  >
    <template v-for="(index, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
    <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
    <el-checkbox
      v-if="multiple&&!isShowPagination"
      v-model="selectChecked"
      @change="selectAll"
      class="all_checkbox"
    >{{selectAllText}}</el-checkbox>
    <el-option
      v-for="(item,index) in optionSource"
      :key="index+'i'"
      :label="customLabel?customLabelHandler(item):item[labelKey]"
      :value="item[valueKey]"
    />
    <div class="t_select__pagination" v-if="isShowPagination">
      <el-pagination
        :layout="paginationOption.layout || 'total,prev, pager, next'"
        :page-size="paginationOption.pageSize"
        :current-page="paginationOption.currentPage"
        :pager-count="paginationOption.pagerCount"
        :total="paginationOption.total"
        @current-change="currentChange"
        v-bind="{
            small: true,
            'hide-on-single-page':true,
            background: true,
            ...$attrs,
            ...paginationOption.bind,
          }"
        v-on="$listeners"
      />
    </div>
  </el-select>
</template>
<script>
export default {
  name: 'TSelect',
  props: {
    value: {
      type: [String, Number, Array, Boolean]
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 全选文字
    selectAllText: {
      type: String,
      default: '全选'
    },
    // 选择框宽度
    width: {
      type: String
    },
    // 是否自定义设置下拉label
    customLabel: {
      type: String
    },
    // 传入的option数组中，要作为最终选择项的键值key
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
    // 是否显示分页
    isShowPagination: {
      type: Boolean,
      default: false
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
    },
    selectChecked: {
      get() {
        return this.childSelectedValue?.length === this.optionSource?.length
      },
      set(val) {
        // console.log('set', val)
        this.$emit('input', val)
      }
    }
  },
  methods: {
    // 点击全选
    selectAll(val) {
      const options = JSON.parse(JSON.stringify(this.optionSource))
      if (val) {
        this.childSelectedValue = options.map(item => {
          return item[this.valueKey]
        })
        setTimeout(() => {
          this.$emit('change', this.childSelectedValue)
        }, 0)
      } else {
        this.childSelectedValue = null
      }
    },
    currentChange(val) {
      this.childSelectedValue = null
      this.$emit('current-change', val)
    },
    // 自定义label显示
    customLabelHandler(item) {
      // eslint-disable-next-line no-eval
      return eval(this.customLabel)
    }
  }
}
</script>
<style lang="scss">
.t_select {
  .all_checkbox {
    margin-left: 15px;
  }
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
