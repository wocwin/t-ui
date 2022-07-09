<template>
  <div class="tree-table-container">
    <el-table :data="data" border style="width: 100%" :row-class-name="showTr">
      <el-table-column label width="80" v-if="showCheckBox">
        <template slot-scope="scope">
          <el-checkbox
            v-model="scope.row.checked"
            :indeterminate="scope.row._indeterminate"
            @change="toggleChecked(scope.row)"
          ></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        v-for="(column, index) in columns"
        :key="column.dataIndex"
        :label="column.text"
        :type="column.type"
      >
        <template slot-scope="scope">
          <span
            v-show="spaceIconShow(index)"
            v-for="(space, levelIndex) in scope.row._level"
            :key="levelIndex"
            class="ms-tree-space"
          ></span>
          <button
            style="border: 0; background: transparent; outline: none"
            class="button is-outlined is-primary is-small"
            v-if="toggleIconShow(index, scope.row)"
            @click="toggle(scope.$index)"
          >
            <i v-if="!scope.row._expanded" class="el-icon el-icon-caret-right" aria-hidden="true"></i>
            <i
              v-if="scope.row._expanded"
              class="el-icon el-icon-caret-right el-table__expand-icon--expanded"
              aria-hidden="true"
            ></i>
          </button>
          <span v-else-if="index === 0" class="ms-tree-space"></span>
          <span v-if="!column.filters && scope.row">
            {{
            scope.row[column.dataIndex]
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column v-if="operator" label="操作" min-width="120">
        <template slot-scope="scope">
          <el-button
            v-for="(item, index) in operator"
            :key="index"
            @click="item.fun(scope.row)"
            :type="item.type"
            size="small"
            v-show="
              !item.show || item.show.val.includes(scope.row[item.show.key])
            "
          >{{ item.text }}</el-button>
        </template>
      </el-table-column>
      <slot></slot>
    </el-table>
  </div>
</template>
<script>
import Utils from './utils/index.js'
export default {
  name: 'TTreeTable',
  props: {
    // 父组件传过来的数据是否标准格式；默认否，对其进行树形格式化,并添加标识类的属性
    treeStructure: {
      type: Boolean,
      default: false
    },
    // 这是相应的表头字段
    columns: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 这是操作列
    operator: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 这是数据源
    dataSource: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 如在操作中涉及相关按钮编辑，删除等，需要向服务端发送请求，则可以把url传过来
    requestUrl: {
      type: String,
      default: ''
    },
    // 是否显示勾选框 showCheckBox：
    showCheckBox: {
      type: Boolean,
      default: true
    },
    // 是否默认展开所有树
    defaultExpandAll: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 格式化数据源
    data () {
      if (this.treeStructure) {
        const data = Utils.MSDataTransfer.treeToArray(
          this.dataSource,
          null,
          null,
          this.defaultExpandAll
        )
        // console.log(data)
        return data
      }
      return this.dataSource
    }
  },
  methods: {
    goEdit (row) {
      // console.log(row)
      this.$emit('showPopEdit', row)
    },
    // 显示行
    showTr ({ row, rowIndex }) {
      let show = row._parent ? row._parent._expanded && row._parent._show : true
      row._show = show
      return show ? '' : 'hide-row'
    },
    // 展开下级
    toggle (trIndex) {
      let record = this.data[trIndex]
      record._expanded = !record._expanded
    },
    // 显示层级关系的空格和图标
    spaceIconShow (index) {
      if (this.treeStructure && index === 0) {
        return true
      }
      return false
    },
    // 点击展开和关闭的时候，图标的切换
    toggleIconShow (index, record) {
      if (
        this.treeStructure &&
        index === 0 &&
        record.children &&
        record.children.length > 0
      ) {
        return true
      }
      return false
    },
    toggleChecked (row) {
      // console.log(row)
      if (row.children.length > 0) {
        this.selectionChildren(row, row.checked)
        if (row._level !== 0) {
          this.selectionParent(this.dataSource, row.id, row.checked, row)
        }
      } else {
        this.selectionParent(this.dataSource, row.id, row.checked, row)
      }
    },
    // 子找父递归
    selectionParent (data, id, checked, row) {
      let result = []
      function handle (_data, _id) {
        let _arr =
          Object.prototype.toString.call(_data) === '[object Array]'
            ? _data
            : _data.children
        for (let i = 0; i < _arr.length; i++) {
          if (_arr[i].id === _id) {
            result.push(_arr[i])
            handle(data, _data.id)
            break
          } else {
            if (_arr[i].children) {
              handle(_arr[i], _id)
            }
          }
        }
      }
      handle(data, id)
      result = result.splice(1, result.length)
      if (checked) {
        result &&
          result.map((item) => {
            item.checked = true
          })
      } else {
        result &&
          result.map((item) => {
            let isSelect = item.children.some((rs) => {
              return rs.checked === true
            })
            let isSelect1 = item.children.some((rs) => {
              return rs.type === '1'
            })
            let isSelect2 = item.children.every((rs) => {
              return rs.type === '2'
            })
            if (!isSelect && isSelect1 && !isSelect2) item.checked = false
          })
      }
    },
    // 父节点子节点联动（父找子）
    selectionChildren (obj, boolen) {
      obj.checked = boolen
      let children = obj.children
      if (children && children.length === 0) {
        this.$forceUpdate()
        // console.log(this.dataSource)
        return
      }
      if (children && children.length > 0) {
        for (let i = 0; i < children.length; i++) {
          children[i].checked = boolen
          this.selectionChildren(obj.children[i], boolen)
        }
      }
    },
    findSonListCheck (dataList, arr) {
      arr = arr || []
      dataList.map((val) => {
        if (val.checked) {
          arr.push(val.id)
        }
        let sonList = val.children
        if (sonList.length > 0) {
          this.findSonListCheck(sonList, arr)
        }
      })
      return arr
    },
    findSonListNotCheck (dataList, arr) {
      arr = arr || []
      dataList.map((val) => {
        if (!val.checked) {
          arr.push(val.id)
        }
        let sonList = val.children
        if (sonList.length > 0) {
          this.findSonListNotCheck(sonList, arr)
        }
      })
      return arr
    },
    // 返回没勾选的idList
    updateRoleOrRes () {
      // console.log(this.dataSource)
      const resArrData = this.findSonListNotCheck(this.dataSource)
      return resArrData
    },
    // 返回勾选的idList
    updateRoleOrResChecked () {
      // console.log(this.dataSource)
      const resArrData = this.findSonListCheck(this.dataSource)
      return resArrData
    }
  }
}
</script>

<style lang="scss">
.tree-table-container {
  .el-table {
    margin-bottom: 100px;
  }
  .hide-row {
    display: none;
  }
  .el-table_1_column_2 .cell {
    text-align: left;
  }
  .el-table__row td:nth-child(1) {
    text-align: center;
  }
  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-family: 'Glyphicons Halflings';
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: 18px;
    height: 14px;
  }
  .ms-tree-space::before {
    content: '';
  }
  table td {
    line-height: 26px;
  }
  .el-table__expand-icon--expanded {
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
  }
}
</style>
