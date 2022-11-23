<template>
  <el-select
    ref="select"
    v-model="selectValue"
    :multiple="multiple"
    :filter-method="dataFilter"
    @remove-tag="removeTag"
    @clear="clearAll"
    popper-class="t-tree-select"
    :style="{width: width||'100%'}"
    v-bind="attrs"
    v-on="$listeners"
  >
    <el-option v-model="selectTree" class="option-style" disabled>
      <div class="check-box" v-if="multiple&&checkBoxBtn">
        <el-button type="text" @click="handlecheckAll">全选</el-button>
        <el-button type="text" @click="handleReset">清空</el-button>
        <el-button type="text" @click="handleReverseCheck">反选</el-button>
      </div>
      <el-tree
        :data="options"
        :props="treeProps"
        class="tree-style"
        ref="treeNode"
        :show-checkbox="multiple"
        :node-key="treeProps.value"
        :filter-node-method="filterNode"
        :default-checked-keys="defaultValue"
        :current-node-key="currentKey"
        @node-click="handleTreeClick"
        @check-change="handleNodeChange"
        v-bind="treeAttrs"
        v-on="$listeners"
      ></el-tree>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'TTreeSelect',
  props: {
    // 多选默认值数组
    defaultValue: {
      type: Array,
      default: () => []
    },
    // 单选默认展示数据必须是{id:***,label:***}格式
    defaultData: {
      type: Object
    },
    // 可用选项的数组
    options: {
      type: Array,
      default: () => []
    },
    // 配置选项——>属性值为后端返回的对应的字段名
    treeProps: {
      type: Object,
      default: () => ({
        value: 'value', // ID字段名
        label: 'label', // 显示名称
        children: 'children' // 子级字段名
      })
    },
    // 是否显示全选、反选、清空操作
    checkBoxBtn: {
      type: Boolean,
      default: true
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 选择框宽度
    width: {
      type: String
    }
  },
  data() {
    return {
      selectTree: this.multiple ? [] : '', // 绑定el-option的值
      selectValue: this.multiple ? [] : '', // 文本框中的标签
      currentKey: null, // 当前选中的节点
      filterText: null, // 筛选值
      VALUE_NAME: this.treeProps.value, // value转换后的字段
      VALUE_TEXT: this.treeProps.label // label转换后的字段
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
        'default-expand-all': true,
        ...this.$attrs
      }
    }
  },
  watch: {
    defaultValue: {
      handler() {
        this.$nextTick(() => {
          // 多选
          if (this.multiple) {
            let datalist = this.$refs.treeNode.getCheckedNodes()
            this.selectTree = datalist
            this.selectValue = datalist.map(v => v[this.VALUE_TEXT])
          }
        })
      },
      deep: true
    },
    // 对树节点进行筛选操作
    filterText(val) {
      this.$refs.treeNode.filter(val)
    }
  },
  mounted() {
    if (this.multiple) {
      let datalist = this.$refs.treeNode.getCheckedNodes()
      this.selectTree = datalist
      this.selectValue = datalist.map(v => v[this.VALUE_TEXT])
    }
    // 有defaultData值才回显默认值
    if (this.defaultData?.id) {
      this.setDefaultValue(this.defaultData)
    }
  },
  methods: {
    // 单选设置默认值
    setDefaultValue(obj) {
      if (obj.label !== '' && obj.id !== '') {
        this.selectTree = obj.id
        this.selectValue = obj.label
        this.$nextTick(() => {
          this.currentKey = this.selectTree
          this.setTreeChecked(this.selectTree)
        })
      }
    },
    // 全选
    handlecheckAll() {
      setTimeout(() => {
        this.$refs.treeNode.setCheckedNodes(this.options)
      }, 200)
    },
    // 清空
    handleReset() {
      setTimeout(() => {
        this.$refs.treeNode.setCheckedNodes([])
      }, 200)
    },
    /**
     * @description: 反选处理方法
     * @param {*} nodes 整个tree的数据
     * @param {*} refs  this.$refs.treeNode
     * @param {*} flag  选中状态
     * @param {*} seleteds 当前选中的节点
     * @return {*}
     */
    batchSelect(nodes, refs, flag, seleteds) {
      if (Array.isArray(nodes)) {
        nodes.forEach(element => {
          refs.setChecked(element, flag, true)
        })
      }
      if (Array.isArray(seleteds)) {
        seleteds.forEach(node => {
          refs.setChecked(node, !flag, true)
        })
      }
    },
    // 反选
    handleReverseCheck() {
      setTimeout(() => {
        let res = this.$refs.treeNode
        let nodes = res.getCheckedNodes(true, true)
        this.batchSelect(this.options, res, true, nodes)
      }, 200)
    },
    // 输入框关键字
    dataFilter(val) {
      setTimeout(() => {
        this.filterText = val
      }, 100)
    },
    /**
     * @description: tree搜索过滤
     * @param {*} value 搜索的关键字
     * @param {*} data  筛选到的节点
     * @return {*}
     */
    filterNode(value, data) {
      if (!value) return true
      return data[this.treeProps.label].toLowerCase().indexOf(value.toLowerCase()) !== -1
    },
    /**
     * @description: 勾选树形选项
     * @param {*} data 该节点所对应的对象
     * @param {*} self 节点本身是否被选中
     * @param {*} child 节点的子树中是否有被选中的节点
     * @return {*}
     */
    // 多选赋值组件
    handleNodeChange(data, self, child) {
      let datalist = this.$refs.treeNode.getCheckedNodes()
      this.$nextTick(() => {
        this.selectTree = datalist
        this.selectValue = datalist.map(v => {
          console.log(777, v[this.VALUE_TEXT])
          return v[this.VALUE_TEXT]
        })
        this.$emit('handleNodeClick', this.selectTree)
      })
    },
    // 单选tree点击赋值
    handleTreeClick(data, node) {
      if (this.multiple) {

      } else {
        this.filterText = ''
        this.selectTree = data[this.VALUE_NAME]
        this.selectValue = data[this.VALUE_TEXT]
        this.currentKey = this.selectTree
        this.highlightNode = data[this.VALUE_NAME]
        this.$emit('handleNodeClick', { id: this.selectTree, label: this.selectValue }, node)
        this.setTreeChecked(this.highlightNode)
        this.$refs.select.blur()
      }
    },
    setTreeChecked(highlightNode) {
      if (this.treeAttrs.hasOwnProperty('show-checkbox')) {
        // 通过 keys 设置目前勾选的节点，使用此方法必须设置 node-key 属性
        this.$refs.treeNode.setCheckedKeys([highlightNode])
      } else {
        // 通过 key 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性
        this.$refs.treeNode.setCurrentKey(highlightNode)
      }
    },
    // 移除单个标签
    removeTag(tagName) {
      // 判断回显的值是否可删除
      this.selectTree = this.selectTree.filter(v => v[this.VALUE_TEXT] !== tagName)
      const selectTreeValue = this.selectTree.map(v => v[this.VALUE_NAME])
      let setlist = this.$refs.treeNode.getCheckedNodes()
      setlist = setlist.filter(v => v[this.VALUE_NAME] === selectTreeValue.find(item => item === v[this.VALUE_NAME]))
      this.$nextTick(() => {
        this.$refs.treeNode.setCheckedNodes(setlist)
      })
      this.$emit('handleNodeClick', this.selectTree)
    },
    // 文本框清空
    clearAll() {
      this.selectTree = this.multiple ? [] : ''
      this.$refs.treeNode.setCheckedNodes([])
      this.$emit('handleNodeClick', this.selectTree)
    }
  }

}
</script>

<style scoped lang="scss">
.t-tree-select {
  .check-box {
    padding: 0 20px;
  }
  .option-style {
    height: 100%;
    max-height: 300px;
    margin: 0;
    overflow-y: auto;
    cursor: default !important;
  }
  .tree-style {
    ::v-deep .el-tree-node.is-current > .el-tree-node__content {
      color: #3370ff;
    }
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
</style>
