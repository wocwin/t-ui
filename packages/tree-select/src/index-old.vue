<template>
  <el-select
    class="t_tree_select"
    v-model="textStr"
    ref="select"
    :style="{width: width||'100%'}"
    v-bind="attrs"
    v-on="$listeners"
    :filter-method="filterMethod"
    @clear="clearSelect"
  >
    <el-option v-model="value" class="t_tree_select_option" disabled>
      <el-tree
        :data="treeList"
        :props="treeProps"
        :filter-node-method="filterNode"
        :current-node-key="currentKey"
        :node-key="nodeKey"
        ref="selectTree"
        @node-click="handleTreeClick"
        v-bind="treeAttrs"
        v-on="$listeners"
      >
        <span slot-scope="{ data }" :title="data[treeProps.label]">{{ data[treeProps.label] }}</span>
      </el-tree>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'TTreeSelect',
  props: {
    // 树形原始数据
    treeList: {
      type: Array,
      default: () => []
    },
    // 树形配置
    treeProps: {
      type: Object,
      default: () => {
        return {
          value: 'value', // ID字段名
          label: 'label', // 显示名称
          children: 'children' // 子级字段名
        }
      }
    },
    // 树形唯一键值
    nodeKey: {
      type: String,
      default: 'id'
    },
    // 选择框宽度
    width: {
      type: String
    },
    // 默认展示数据必须是{id:***,label:***}格式
    defaultData: {
      type: Object
    }
  },
  computed: {
    attrs() {
      return {
        'popper-append-to-body': false,
        clearable: true,
        filterable: true,
        ...this.$attrs
      }
    },
    // tree属性
    treeAttrs() {
      return {
        'highlight-current': true,
        'default-expand-all': true,
        ...this.$attrs
      }
    }
  },
  data() {
    return {
      textStr: null, // select值
      value: null, // option值
      filterText: null, // 筛选值
      currentKey: null, // 当前选中的节点
      highlightNode: -1
    }
  },
  mounted() {
    // 有defaultData值才回显默认值
    if (this.defaultData?.id) {
      this.setDefaultValue(this.defaultData)
    }
  },
  watch: {
    // 对树节点进行筛选操作
    filterText(val) {
      this.$refs.selectTree.filter(val)
    }
  },
  methods: {
    // 设置默认值
    setDefaultValue(obj) {
      if (obj.label !== '' && obj.id !== '') {
        this.value = obj.id
        this.textStr = obj.label
        this.$nextTick(() => {
          this.highlightNode = this.value
          this.currentKey = this.value
          this.setTreeChecked(this.highlightNode)
        })
      }
    },
    setTreeChecked(highlightNode) {
      if (this.treeAttrs.hasOwnProperty('show-checkbox')) {
        // 通过 keys 设置目前勾选的节点，使用此方法必须设置 node-key 属性
        this.$refs.selectTree.setCheckedKeys([highlightNode])
      } else {
        // 通过 key 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性
        this.$refs.selectTree.setCurrentKey(highlightNode)
      }
    },
    // tree过滤
    filterNode(value, data) {
      if (!value) return true
      return data[this.treeProps.label].indexOf(value) !== -1
    },
    // 过滤赋值（select）
    filterMethod(query) {
      setTimeout(() => {
        this.filterText = query
      }, 100)
    },
    // tree点击赋值
    handleTreeClick(data, node) {
      // console.log('tree点击赋值', data, node)
      this.filterText = ''
      this.value = data[this.nodeKey]
      this.textStr = data[this.treeProps.label]
      this.$forceUpdate()
      this.currentKey = this.value
      this.highlightNode = data[this.nodeKey]
      this.$emit('handleNodeClick', { id: this.value, label: this.textStr }, node)
      this.setTreeChecked(this.highlightNode)
      this.$refs.select.blur()
    },
    // 清空数据
    clearFun() {
      this.value = ''
      this.textStr = ''
      this.currentKey = undefined
      this.highlightNode = undefined
      this.setTreeChecked(this.highlightNode)
    },
    clearSelect() {
      this.value = ''
      this.textStr = ''
      this.$refs.selectTree.setCurrentKey()
      this.$emit('handleNodeClick', '')
    }
  }
}
</script>

<style scoped lang="scss">
.t_tree_select {
  ::v-deep {
    .t_tree_select_option {
      height: 100%;
      max-height: 200px;
      overflow-y: auto;
      padding: 0;
      background-color: #ffffff;
    }
    .el-tree-node.is-current > .el-tree-node__content {
      color: #3370ff;
    }
    .el-select-dropdown__item.selected {
      font-weight: 500;
    }
    .el-input__inner {
      height: 36px;
      line-height: 36px;
    }
    .el-input__icon {
      line-height: 36px;
    }
    .el-tree-node__content {
      height: 32px;
    }
  }
}
</style>
