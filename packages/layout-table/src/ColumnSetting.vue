<template>
  <a-dropdown :trigger="['click']" placement="bottomRight">
    <a-button icon="setting">列设置</a-button>
    <template #overlay>
      <draggable class="dh_layout_table_column_setting_dropdown" v-model="columnSet">
        <a-checkbox
          v-for="(col, index) in columnSet"
          :key="col.dataIndex"
          @click.native.stop
          :checked="!col.hidden"
          :disabled="col.checkBoxDisabled"
          @change="e => checkChanged(e.target.checked, index)"
        >{{ col.title }}</a-checkbox>
      </draggable>
    </template>
  </a-dropdown>
</template>
<script>
import draggable from 'vuedraggable'

export default {
  name: 'ColumnSetting',
  components: {
    draggable
  },
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      columnSet: null
    }
  },
  mounted () {
    this.columnSet = this.getColumnSetCache()
    this.$emit('columnSetting', this.columnSet)
  },
  watch: {
    columnSet: function (n) {
      this.$emit('columnSetting', n)
      localStorage.setItem(`t-ui:TAntLayoutTable.columnSet-${this.name || this.title}`, JSON.stringify(n))
    }
  },
  methods: {
    getColumnSetCache () {
      const value = localStorage.getItem(`t-ui:TAntLayoutTable.columnSet-${this.name || this.title}`)
      return value ? JSON.parse(value) : this.initColumnSet()
    },
    initColumnSet () {
      const columnSet = this.columns.map((col, index) => ({
        title: col.title,
        dataIndex: col.dataIndex,
        hidden: false,
        checkBoxDisabled: false
      }))
      return columnSet
    },
    checkChanged (checked, index) {
      this.$set(this.columnSet, index, { ...this.columnSet[index], hidden: !checked })
      let obj = {}
      this.columnSet.map(val => {
        val.hidden in obj || (obj[val.hidden] = [])
        obj[val.hidden].push(val.hidden)
      })
      if (obj.false && obj.false.length < 2) {
        this.columnSet.map((val, key) => {
          if (!val.hidden) {
            this.$set(this.columnSet, key, { ...this.columnSet[key], checkBoxDisabled: true })
          }
        })
      } else {
        this.columnSet.map((val, key) => {
          if (!val.hidden) {
            this.$set(this.columnSet, key, { ...this.columnSet[key], checkBoxDisabled: false })
          }
        })
      }
    }
  }
}
</script>
<style lang="scss">
.dh_layout_table_column_setting_dropdown {
  display: flex;
  flex-direction: column;
  padding: 8px 0;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 0 10px 0 #ccc;
  .ant-checkbox-wrapper {
    margin-left: 8px;
    padding: 4px 0;
  }
}
</style>
