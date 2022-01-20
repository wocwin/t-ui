<template>
  <div class="t_ant_layout_table">
    <div class="header_wrap">
      <h3>
        {{title}}
        <slot name="title" />
      </h3>
      <div class="header_right_wrap">
        <slot name="btn" />
        <column-setting
          v-if="columnSetting"
          v-bind="$attrs"
          :columns="columns"
          @columnSetting="v => columnSet = v"
        />
      </div>
    </div>
    <slot name="table" />
    <div v-if="!$slots.table" :class="{noScroll:isCustomScroll}">
      <a-table ref="tableBody" v-bind="antTableOpt">
        <template v-for="(index, name) in tableSlot" :slot="name" slot-scope="text">
          <slot :name="name" :text="text" />
        </template>
      </a-table>
      <div v-if="isCustomScroll" ref="sticky_scroll_x" class="t_ant_layout_table_sticky_scroll_x">
        <span class="scroll_cont" :style="{width: `${headWidth}px`}"></span>
      </div>
    </div>
    <a-pagination
      v-if="pagination !== null"
      class="pagination"
      :defaultCurrent="1"
      :pageSize="pagination.pageSize"
      :current="pagination.current"
      v-bind="pagination.paginationOpt"
      @showSizeChange="(current, pageSize) => $emit('showSizeChange', current, pageSize)"
      @change="(current, pageSize) => $emit('paginationChange', current, pageSize)"
      :total="pagination.total && pagination.total >= pagination.pageSize ? pagination.total : pagination.pageSize"
    ></a-pagination>
  </div>
</template>
<script>
import ColumnSetting from './ColumnSetting.vue'
import VueDraggableResizable from 'vue-draggable-resizable'

const SLOT_WHITE_LIST = ['title', 'btn', 'table']
export default {
  name: 'TAntLayoutTable',
  components: {
    ColumnSetting
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    columns: {
      type: Array,
      default: () => ([])
    },
    dataSource: {
      type: Array,
      default: () => ([])
    },
    pagination: {
      type: [Object, null],
      default: null
    },
    // 是否开启自定义滚动条
    isCustomScroll: {
      type: Boolean,
      default: false
    },
    // 第三组件的属性相当于v-bind="$attrs"
    tableOpt: {
      type: Object,
      default: () => ({})
    },
    // 是否开启列设置
    columnSetting: Boolean
  },
  data () {
    return {
      headWidth: 0,
      scrollLeft: 0,
      columnSet: []
    }
  },
  computed: {
    columnByDataIndex () {
      return this.columns.reduce((acc, cur) => {
        acc[cur.dataIndex] = cur
        return acc
      }, {})
    },
    renderColumns () {
      return this.columnSet.length > 0 ? this.columnSet.reduce((acc, cur) => {
        if (!cur.hidden) {
          acc.push(this.columnByDataIndex[cur.dataIndex])
        }
        return acc
      }, []) : this.columns
    },
    antTableOpt () {
      const { renderColumns: columns, dataSource, tableOpt, components } = this
      return { rowKey: 'id', size: 'middle', ...tableOpt, columns, dataSource, pagination: false, components }
    },
    tableSlot () { // 支持antd table作用域插槽
      return Object.keys(this.$scopedSlots).filter(name => {
        return !SLOT_WHITE_LIST.includes(name)
      }).reduce((acc, name) => {
        acc[name] = this.$scopedSlots[name]
        return acc
      }, {})
    },
    components () {
      if (this.tableOpt.bordered) {
        return {
          header: {
            cell: (h, props, children) => {
              const { key, ...restProps } = props
              const col = this.columns.find(col => {
                const k = col.dataIndex || col.key
                return k === key
              })

              if (!col || !col.width) {
                return h('th', { ...restProps }, [...children])
              }

              const dragProps = {
                key: col.dataIndex || col.key,
                class: 'table-draggable-handle',
                attrs: {
                  w: 10,
                  x: col.width,
                  z: 1,
                  axis: 'x',
                  draggable: true,
                  transform: 'none',
                  resizable: false
                },
                on: {
                  dragging: (x, y) => {
                    col.width = Math.max(x, 90)
                  }
                }
              }
              const drag = h(VueDraggableResizable, { ...dragProps })
              return h('th', { ...restProps, class: 'resize-table-th' }, [...children, drag])
            }
          }
        }
      } else {
        return {}
      }
    }
  },
  watch: {
    'columns': function () {
      // 更新列头高度
      if (this.isCustomScroll) {
        this.$nextTick(() => {
          this.headWidth = this.$refs.tableBody.$el.getElementsByClassName('ant-table-thead')[0].scrollWidth
        })
      }
    }
  },
  mounted () {
    this.isCustomScroll && this.syncScroll()
  },
  activated () {
    // 该组件缓存激活时可能出现冻结列行高不一致问题，强制刷新
    this.$refs.tableBody && this.$refs.tableBody.$forceUpdate()
    if (this.isCustomScroll) {
      this.$refs.tableBody.$el.getElementsByClassName('ant-table-body')[0].scrollLeft = this.scrollLeft
      this.$refs['sticky_scroll_x'].scrollLeft = this.scrollLeft
    }
  },
  methods: {
    syncScroll () { // 同步表头与表格的横向滚动
      let onScroll = false
      let timer = 0
      this.$nextTick(() => {
        this.headWidth = this.$refs.tableBody.$el.getElementsByClassName('ant-table-thead')[0].scrollWidth
        // 同步body与head的横向滚动
        this.$refs.tableBody.$el.getElementsByClassName('ant-table-body')[0].addEventListener('scroll', (e) => {
          if (e.target !== null && (!onScroll || onScroll === 'tableBody')) {
            clearTimeout(timer)
            this.scrollLeft = e.target.scrollLeft
            onScroll = 'tableBody'
            this.$refs['sticky_scroll_x'].scrollLeft = this.scrollLeft
            timer = setTimeout(() => {
              onScroll = false
            }, 500)
          }
        })
        // 底部粘性横行滚动条同步
        this.$refs['sticky_scroll_x'].addEventListener('scroll', (e) => {
          if (e.target !== null && (!onScroll || onScroll === 'sticky_scroll_x')) {
            clearTimeout(timer)
            this.scrollLeft = e.target.scrollLeft
            onScroll = 'sticky_scroll_x'
            this.$refs.tableBody.$el.getElementsByClassName('ant-table-body')[0].scrollLeft = this.scrollLeft
            timer = setTimeout(() => {
              onScroll = false
            }, 500)
          }
        })
      })
    }
  }
}
</script>
<style lang="scss">
.t_ant_layout_table {
  .header_wrap {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    h3 {
      flex-grow: 1;
      margin: 0;
      font-size: 16px;
      line-height: 28px;
      text-align: left;
    }
  }
  .ant-btn-link {
    height: 16px;
  }
  .pagination {
    position: relative;
    margin-top: 16px;
    padding: 0;
    text-align: right;
  }
  .noScroll {
    .ant-table-body {
      &::-webkit-scrollbar {
        opacity: 0;
        height: 0;
      }
    }
  }
  // 实现可伸缩列样式
  .resize-table-th {
    position: relative;
    .table-draggable-handle {
      position: absolute;
      z-index: 100 !important;
      height: 100% !important;
      bottom: 0;
      left: auto !important;
      right: -5px;
      cursor: col-resize;
      touch-action: none;
      transform: none !important;
    }
  }
  .t_ant_layout_table_sticky_scroll_x {
    position: sticky;
    bottom: -10px;
    margin-top: -20px;
    z-index: 100;
    width: 100%;
    height: 20px;
    overflow-x: auto;
    .scroll_cont {
      display: block;
      height: 1px;
    }
  }
}
</style>
