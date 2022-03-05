<template>
  <el-select
    filterable
    clearable
    v-model="nowValue"
    :allow-create="allowCreate"
    @change="change"
    :multiple="multiple"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item[arrLabel]"
      :value="item[arrKey]"
    ></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'TSelect',
  props: {
    options: Array, // 下拉选择数据
    value: {
      type: [String, Array]
    },
    // 是否允许用户创建新条目，需配合 filterable 使用
    allowCreate: {
      type: Boolean,
      default: false
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 下拉显示的label
    arrLabel: {
      type: String,
      default: 'label'
    },
    // 下拉选择的key
    arrKey: {
      type: String,
      default: 'value'
    }
  },
  data () {
    return {
      nowValue: ''
    }
  },
  watch: {
    value (val, oldVal) {
      if (val !== oldVal) {
        this.nowValue = val
      }
    }
  },
  mounted () {
    this.nowValue = this.value
  },
  methods: {
    change (val) {
      if (this.allowCreate) {
        let arr = this.options.filter(v => v.value === val)
        if (arr.length === 0) {
          let arr1 = []
          val.forEach(item => {
            arr1 = arr1.concat(this.options.filter(m => m.value === item))
          })
          let item = {
            value: val,
            label: arr1,
            allowCreate: true
          }
          this.$emit('selChange', item)
        } else {
          this.$emit('selChange', arr[0])
        }
      } else {
        if (!this.multiple) {
          this.options.forEach((item) => {
            if (item.value === val) {
              this.$emit('selChange', item)
            }
          })
        } else {
          let arr1 = []
          val.forEach(item => {
            arr1 = arr1.concat(this.options.filter(m => m.value === item))
          })
          this.$emit('selChange', { arr: arr1, key: val })
        }
      }
    }
  }
}
</script>
