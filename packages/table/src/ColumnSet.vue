<template>
  <el-dropdown trigger="click" placement="bottom">
    <el-button v-bind="columnBind">{{columnBind.btnTxt||'列设置'}}</el-button>
    <el-dropdown-menu slot="dropdown" class="column_set_dropdown">
      <div class="title" v-if="columnBind.isShowTitle">{{columnBind.title||'列设置'}}</div>
      <el-dropdown-item :divided="columnBind.isShowTitle">
        <draggable class="t_table_column_setting_dropdown" v-model="columnSet">
          <el-checkbox
            v-for="(col, index) in columnSet"
            :key="col.prop"
            @click.native.stop
            :checked="!col.hidden"
            @change="checked => checkChanged(checked, index)"
          >{{ col.label }}</el-checkbox>
        </draggable>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
import draggable from 'vuedraggable'
import md5 from 'blueimp-md5'
export default {
  name: 'ColumnSet',
  components: {
    draggable
  },
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    columnSetBind: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      columnSet: null
    }
  },
  mounted() {
    this.columnSet = this.getColumnSetCache()
    this.$emit('columnSetting', this.columnSet)
  },
  computed: {
    columnBind() {
      const columnSetBind = { btnTxt: '列设置', title: '列设置', ...this.columnSetBind }
      return { size: 'small', icon: 'el-icon-s-operation', isShowTitle: true, ...this.$attrs, ...columnSetBind }
    },
    localStorageKey() {
      // 配置数据缓存唯一标记
      return `t-ui:TTable.columnSet-${md5(
        this.columns.map(({ prop }) => prop).join()
      )}`
    }
  },
  watch: {
    columnSet(n) {
      this.$emit('columnSetting', n)
      localStorage.setItem(this.localStorageKey, JSON.stringify(n))
    }
  },
  methods: {
    getColumnSetCache() {
      let value = localStorage.getItem(this.localStorageKey)
      let columnOption = this.initColumnSet()
      let valueArr = JSON.parse(value) || []
      columnOption.map(item => {
        let findEle = valueArr.find(ele => ele.label === item.label && ele.prop === item.prop)
        item.hidden = findEle ? findEle.hidden : false
      })
      this.initColumnSet().map(val => {
        columnOption.map(item => {
          if (Object.hasOwn(val, 'isShowHidden')) {
            if (val.label === item.label && val.prop === item.prop && val.isShowHidden) {
              item.hidden = val.isShowHidden
            }
            if (val.label === item.label && val.prop === item.prop && !val.isShowHidden) {
              item.hidden = val.isShowHidden
            }
          }
        })
      })
      if (columnOption.length !== valueArr.length) {
        value = JSON.stringify(columnOption)
      }
      // console.log('最终--', value ? JSON.parse(value) : this.initColumnSet())
      return value ? JSON.parse(value) : this.initColumnSet()
    },
    initColumnSet() {
      const columnSet = this.columns.map((col, index) => (col.isShowHidden ? {
        label: col.label,
        prop: col.prop,
        hidden: false,
        isShowHidden: col.isShowHidden
      } : {
        label: col.label,
        prop: col.prop,
        hidden: false
      }))
      // console.log('initColumnSet---', columnSet)
      return columnSet
    },
    checkChanged(checked, index) {
      this.$set(this.columnSet, index, { ...this.columnSet[index], hidden: !checked })
      let obj = {}
      this.columnSet.map(val => {
        val.hidden in obj || (obj[val.hidden] = [])
        obj[val.hidden].push(val.hidden)
      })
      if (obj.false && obj.false.length < 2) {
        this.columnSet.map((val, key) => {
          if (!val.hidden) {
            this.$set(this.columnSet, key, { ...this.columnSet[key] })
          }
        })
      } else {
        this.columnSet.map((val, key) => {
          if (!val.hidden) {
            this.$set(this.columnSet, key, { ...this.columnSet[key] })
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.column_set_dropdown {
  padding: 0px;
  font-size: 14px;
  .title {
    font-weight: bold;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 10px 0 10px;
  }
  ::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #262626;
    cursor: move;
  }
  .t_table_column_setting_dropdown {
    display: flex;
    flex-direction: column;
    max-height: 300px;
    overflow-y: auto;
  }
}
</style>
