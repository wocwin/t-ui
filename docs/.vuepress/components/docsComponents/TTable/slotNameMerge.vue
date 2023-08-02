<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table :table="table" :isShowPagination="false" :columns="table.columns">
        <template #slotNameHeader="{param}">{{param.row.date1}}</template>
        <template #slotNameHeader1="{param}">{{param.row.name}}</template>
        <template #slotNameHeader12="{param}">{{param.row.date1}}</template>
      </t-table>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script>
export default {
  data() {
    return {
      table: {
        columns: [
          {
            prop: 'name', label: '姓名', minWidth: '100',
            children: [
              {
                prop: 'name', label: '姓名', minWidth: '100',
                children: [
                  {
                    prop: 'type', label: '类型', minWidth: '100',
                    children: [
                      { prop: 'date1', label: '日期2552', minWidth: '180', },
                    ]
                  },
                ]
              },
              {
                prop: 'type', label: '表头合并1', minWidth: '100',
                children: [
                  {
                    prop: 'type', label: '类型', minWidth: '100',
                    children: [
                      { prop: 'date1', label: '日期2552', minWidth: '180' },
                    ]
                  },
                ]
              },
              { prop: '', label: '姓名插槽显示', minWidth: '100', slotNameMerge: 'slotNameHeader1', },
              {
                prop: 'date', label: '表头合并2', minWidth: '180',
                children: [
                  { prop: 'type', label: '类型', minWidth: '100', },
                  {
                    prop: 'date', label: '日期', minWidth: '180',
                    children: [
                      { prop: 'date1', label: '日期22', minWidth: '180', },
                    ]
                  }
                ]
              },
            ]
          },
          {
            prop: 'name', label: '姓名', minWidth: '100',
            children: [
              {
                prop: 'type', label: '类型', minWidth: '100', children: [
                  { prop: 'date1', label: '日期插槽显示', minWidth: '180', slotNameMerge: 'slotNameHeader12', },
                ]
              },
            ]
          },
          {
            prop: 'type', label: '表头合并1', minWidth: '100',
            children: [
              {
                prop: 'type', label: '类型', minWidth: '100', children: [
                  { prop: 'date1', label: '日期2552', minWidth: '180', },
                ]
              },
            ]
          },
          { prop: 'name', label: '姓名', minWidth: '100', },
          {
            prop: 'date', label: '表头合并2', minWidth: '180',
            children: [
              { prop: 'type', label: '类型', minWidth: '100', },
              {
                prop: 'date', label: '日期', minWidth: '180',
                children: [
                  { prop: 'date1', label: '日期22', minWidth: '180', },
                ]
              }
            ]
          },
          { prop: 'address', label: '地址', minWidth: '220', },
          { prop: 'date1', label: '不合并显示插槽', minWidth: '180', slotName: 'slotNameHeader', },
          { prop: 'address1', label: '地址', minWidth: '220', }
        ],
        data: [
          {
            id: '1',
            type: '入库',
            date: '2019-09-25',
            date1: '2019-09-25',
            name: '张三',
            status: '2',
            address: '广东省广州市天河区',
            address1: '广东省广州市天河区',
          },
          {
            id: '2',
            type: '入库',
            date: '2019-09-26',
            date1: '2019-09-26',
            name: '张三1',
            status: '1',
            address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
            address1: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2'
          },
          {
            id: '3',
            type: '入库',
            date: '2019-09-27',
            date1: '2019-09-27',
            name: '张三2',
            status: '3',
            address: '广东省广州市天河区3',
            address1: '广东省广州市天河区3',
          },
          {
            id: '4',
            type: '出库',
            date: '2019-09-27',
            date1: '2019-09-27',
            name: '张三3',
            status: '3',
            address: '广东省广州市天河区3',
            address1: '广东省广州市天河区3',
          },
          {
            id: '5',
            type: '出库',
            date: '2019-09-27',
            date1: '2019-09-27',
            name: '张三4',
            status: '3',
            address: '广东省广州市天河区3',
            address1: '广东省广州市天河区3'
          }
        ],
      },
    }
  }
}
</script>
