<template>
  <div class="t-table" style="width:100%;">
    <t-table isCopy title="自定义排序" :table="table" :columns="table.columns" :isShowPagination="false"></t-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      table: {
        data: [
          {
            id: '1',
            date: '2019-09-25',
            name: '张三',
            status: '2',
            address: '广东省广州市天河区'
          },
          {
            id: '2',
            date: '2019-09-26',
            name: '张三1',
            status: '1',
            address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2'
          },
          {
            id: '3',
            date: '2019-09-27',
            name: '张三2',
            status: '3',
            address: '广东省广州市天河区3'
          }
        ],
        columns: [
          {
            prop: 'name', label: '姓名', minWidth: '100',
            renderHeader: (row) => {
              return (
                <div class="label-title" style="display: flex;justify-content: center;">
                  <span>{row.label}</span>
                  <div class="fixed">
                    <div>
                      <i
                        class="el-icon-delete"
                        style={{ color: row.fixed ? "#1890ff" : "" }}
                        onClick={(event) => {
                          this.handleClick(row);
                          event.stopPropagation();
                        }} />
                    </div>
                  </div>
                  <div style="display: flex;flex-direction: column;">
                    <i class="el-icon-arrow-up" onClick={() => this.changeTablesort(row.prop, 'ascending')}></i>
                    <i class="el-icon-arrow-down" onClick={() => this.changeTablesort(row.prop, 'descending')}></i>
                  </div >
                </div >
              )
            }
          },
          { prop: 'date', label: '日期', minWidth: '180' },
          { prop: 'address', label: '地址', minWidth: '220' },
          { prop: 'date', label: '日期', minWidth: '180' },
          { prop: 'address', label: '地址', minWidth: '220' }
        ],
      },

    }
  },
  methods: {
    changeTablesort(prop, type) {
      let freeGood = []
      // 参与排序的数组
      let elseFree = []
      // fieldName 为对应列的prop
      let fieldName = prop
      let sortingType = type
      // 降序
      if (sortingType === 'descending') {
        this.table.data.forEach((item) => {
          // 在整个tableData中找到不参与排序的所有数据
          // eslint-disable-next-line no-eval
          // if (eval(this.notSortJudge)) {
          //   // 不参与排序的所有数据加到数组中
          //   freeGood.push(item)
          // } else {
          // 参与排序的数据
          elseFree.push(item)
          // }
        })
        this.table.data = elseFree.sort((a, b) => {
          if (typeof a[fieldName] === 'string') {
            return b[fieldName].localeCompare(a[fieldName])
          } else if (typeof a[fieldName] === 'number') {
            return b[fieldName] - a[fieldName]
          }
        })
        this.table.data = [...this.table.data, ...freeGood]
      } else {
        this.table.data.forEach((item) => {
          // eslint-disable-next-line no-eval
          // if (eval(this.notSortJudge)) {
          //   freeGood.push(item)
          // } else {
          elseFree.push(item)
          // }
        })
        this.table.data = elseFree.sort((a, b) => {
          if (typeof a[fieldName] === 'string') {
            return a[fieldName].localeCompare(b[fieldName])
          } else if (typeof a[fieldName] === 'number') {
            return a[fieldName] - b[fieldName]
          }
        })
        this.table.data = [...this.table.data, ...freeGood]
      }
    }
  },
}
</script>
