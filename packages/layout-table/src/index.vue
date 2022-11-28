<template>
  <div class="t_ant_layout_table">
    <div class="header_wrap" ref="header">
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
    <div v-if="!$slots.table" class="noScroll">
      <a-table ref="tableBody" v-bind="antTableOpt">
        <template
          v-for="(index, name) in tableSlot"
          #[name]="text, record, index, { dataIndex, key, width }"
        >
          <slot
            :name="name"
            :text="text"
            :record="record"
            :index="index"
            :column="{ dataIndex, key, width }"
          />
        </template>
      </a-table>
      <div ref="sticky_scroll_x" class="layout_table_sticky_scroll_x">
        <span class="scroll_cont" :style="{ width: `${headWidth}px` }"></span>
      </div>
    </div>
    <a-pagination
      v-if="pagination !== null"
      class="pagination"
      size="small"
      :pageSizeOptions="['10', '15', '20', '30', '50']"
      :show-total="(total) => `共 ${total} 条`"
      show-size-changer
      show-quick-jumper
      :defaultCurrent="1"
      :pageSize.sync="pagination.pageSize"
      :current="pagination.current"
      v-bind="pagination.paginationOpt"
      @showSizeChange="paginationChange"
      @change="paginationChange"
      :total="pagination.total"
    ></a-pagination>
  </div>
</template>
<script>
import ColumnSetting from './ColumnSetting.vue'
import VueDraggableResizable from 'vue-draggable-resizable'
const SLOT_WHITE_LIST = ['title', 'btn', 'table']
let onScroll = false
let timer = 0

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
      default: () => []
    },
    dataSource: {
      type: Array,
      default: () => []
    },
    pagination: {
      type: [Object, null],
      default: null
    },
    tableOpt: {
      type: Object,
      default: () => ({})
    },
    // 是否开启列设置
    columnSetting: Boolean
  },
  data() {
    return {
      headWidth: 0,
      scrollLeft: 0,
      columnSet: [],
      config: {
        columns: [],
        pageSize: 10
      }
    }
  },
  computed: {
    columnByDataIndex() {
      return this.columns.reduce((acc, cur) => {
        acc[cur.dataIndex] = cur
        return acc
      }, {})
    },
    renderColumns() {
      return this.columnSet.length > 0 ? this.columnSet.reduce((acc, cur) => {
        if (!cur.hidden) {
          acc.push(this.columnByDataIndex[cur.dataIndex])
        }
        return acc
      }, []) : this.columns
    },
    antTableOpt() {
      const { renderColumns: columns, dataSource, tableOpt, components } = this
      return {
        rowKey: 'id',
        size: 'middle',
        ...tableOpt,
        columns,
        dataSource,
        pagination: false,
        components
      }
    },
    tableSlot() {
      // 支持antd table作用域插槽
      return Object.keys(this.$scopedSlots)
        .filter((name) => {
          return !SLOT_WHITE_LIST.includes(name)
        })
        .reduce((acc, name) => {
          acc[name] = this.$scopedSlots[name]
          return acc
        }, {})
    },
    components() {
      if (this.tableOpt.bordered) {
        const syncScroll = this.debounce(this.syncScroll, 500)
        return {
          header: {
            cell: (h, props, children) => {
              const { key, ...restProps } = props
              const col = this.columns.find((col) => {
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
                    syncScroll()
                    col.width = Math.max(x, 90)
                  }
                }
              }
              const drag = h(VueDraggableResizable, { ...dragProps })
              return h('th', { ...restProps, class: 'resize-table-th' }, [
                ...children,
                drag
              ])
            }
          }
        }
      } else {
        return {}
      }
    }
  },
  watch: {
    columns: function () {
      // 更新列头高度
      this.$nextTick(() => {
        this.headWidth =
          this.$refs.tableBody?.$el.getElementsByClassName(
            'ant-table-thead'
          )[0].scrollWidth
      })
    }
  },
  mounted() {
    this.syncScroll()
    // 处理sticky冻结列表头设置zIndex后在滚动前不显示的问题
    const scrollTarget = this.$refs.tableBody?.$el.getElementsByClassName('ant-table-body')[0]

    if (scrollTarget) {
      scrollTarget.style.transform = `translateX(-1px)`
      scrollTarget.style.transform = `translateX(0px)`
    }
  },
  async activated() {
    // 该组件缓存激活时可能出现冻结列行高不一致问题，强制刷新
    await this.$nextTick()
    if (!this.$refs.tableBody) return
    this.$refs.tableBody.$forceUpdate()
    this.$refs.tableBody.$el.getElementsByClassName(
      'ant-table-body'
    )[0].scrollLeft = this.scrollLeft
    this.$refs['sticky_scroll_x'].scrollLeft = this.scrollLeft
  },
  methods: {
    debounce(func, wait) {
      let timeout = 0
      return (...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          func(...args)
        }, wait)
        // 手动取消
        return () => {
          clearTimeout(timeout)
        }
      }
    },
    onTableBodyWheel(e) {
      if (
        e.target === null ||
        onScroll === 'sticky_scroll_x' ||
        Math.abs(e.deltaX) === 0
      ) {
        return
      }
      e.preventDefault()
      const scrollTarget =
        this.$refs.tableBody.$el.getElementsByClassName('ant-table-body')[0]
      const maxOffsetLeft =
        scrollTarget.children[0].offsetWidth - scrollTarget.offsetWidth
      const table =
        this.$refs.tableBody.$el.getElementsByClassName('ant-table')[0]
      clearTimeout(timer)
      const nowLeft = Math.min(
        0,
        Math.max(-maxOffsetLeft, this.scrollLeft - e.deltaX)
      )
      if (nowLeft === -maxOffsetLeft) {
        table.classList.add('ant-table-scroll-position-right')
      } else if (nowLeft === 0) {
        table.classList.add('ant-table-scroll-position-left')
      } else {
        table.classList.remove('ant-table-scroll-position-left')
        table.classList.remove('ant-table-scroll-position-right')
      }
      scrollTarget.style.transform = `translateX(${nowLeft}px)`
      this.scrollLeft = nowLeft
      onScroll = 'tableBody'
      this.$refs['sticky_scroll_x'].scrollLeft = -nowLeft
      timer = setTimeout(() => {
        onScroll = false
      }, 500)
      return false
    },
    onScrollBarScroll(e) {
      if (e.target === null || onScroll === 'tableBody') return
      const scrollTarget =
        this.$refs.tableBody.$el.getElementsByClassName('ant-table-body')[0]
      clearTimeout(timer)
      this.scrollLeft = -e.target.scrollLeft
      onScroll = 'sticky_scroll_x'
      scrollTarget.style.transform = `translateX(${this.scrollLeft}px)`
      timer = setTimeout(() => {
        onScroll = false
      }, 500)
    },
    async syncScroll() {
      // 同步表头与表格的横向滚动
      if (this.$slots.table) return
      await this.$nextTick()
      this.headWidth =
        this.$refs.tableBody.$el.getElementsByClassName(
          'ant-table-thead'
        )[0].scrollWidth
      const headerHeight = this.$refs.header.offsetHeight
      let arrThead = [...this.$refs.tableBody.$el.getElementsByClassName('ant-table-thead')]
      if (arrThead.length > 0) {
        arrThead.forEach((dom) => {
          dom.style.top = `${headerHeight}px`
        })
      }
      // 底部粘性横行滚动条同步
      this.$refs.tableBody.$el.removeEventListener(
        'wheel',
        this.onTableBodyWheel
      )
      this.$refs.tableBody.$el.addEventListener('wheel', this.onTableBodyWheel)
      this.$refs['sticky_scroll_x'].removeEventListener(
        'scroll',
        this.onScrollBarScroll
      )
      this.$refs['sticky_scroll_x'].addEventListener(
        'scroll',
        this.onScrollBarScroll
      )
    },

    paginationChange(current, pageSize) {
      // this.config.pageSize = pageSize
      this.$emit('paginationChange', current, pageSize)
    },
    isShow(name) {
      return Object.keys(this.$slots).includes(name)
    }
  }
}
</script>
<style lang="scss">
.t_ant_layout_table {
  .header_wrap {
    position: sticky;
    z-index: 100;
    top: 0;
    display: flex;
    align-items: center;
    margin: -6px;
    margin-bottom: 0;
    padding: 6px;
    background-color: #fff;
    h3 {
      margin: 0 0 0 6px;
      flex-grow: 1;
      font-size: 16px;
      line-height: 28px;
      text-align: left;
    }
  }
  .header_right_wrap {
    display: flex;
    padding: 10px 0;
    align-items: center;
    justify-content: flex-end;
    .ant-btn {
      margin-right: 5px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .ant-btn-link {
    height: 16px;
  }
  .pagination {
    position: relative;
    padding: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .noScroll {
    contain: paint;
    .ant-table-thead {
      position: sticky;
      z-index: 100;
    }
    .ant-table-body {
      scrollbar-width: none;
      &::-webkit-scrollbar {
        opacity: 0;
        height: 0;
      }
    }
  }
  .ant-table-scroll {
    overflow: visible !important;
    .ant-table-body {
      overflow: visible !important;
    }
  }
  .ant-table-fixed-left,
  .ant-table-fixed-right {
    overflow: visible;
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
  .layout_table_sticky_scroll_x {
    position: sticky;
    bottom: 0;
    z-index: 99;
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
