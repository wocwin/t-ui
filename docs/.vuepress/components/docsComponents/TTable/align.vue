<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table title="对齐方式" :table="table" :align="align" :columns="table.columns">
        <template #title>
          <el-radio-group v-model="align" size="small" style="margin-bottom: 15px">
            <el-radio-button label="left">左对齐</el-radio-button>
            <el-radio-button label="center">居中</el-radio-button>
            <el-radio-button label="right">右对齐</el-radio-button>
          </el-radio-group>
        </template>
        <template #toolbar>
          <el-button size="default" type="danger" @click="setDateLeft">点击{{ setDate }}左对齐</el-button>
          <el-button size="default" type="primary" @click="setNameRight">点击{{ setName }}右对齐</el-button>
        </template>
      </t-table>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script>
export default {
  data() {
    return {
      align: 'center',
      setDate: '设置日期',
      setName: '设置姓名',
      table: {
        data: [
          {
            id: "1",
            date: "2019-09-25",
            date1: "2019-09-26",
            name: "张三",
            status: "2",
            address: "广东省广州市天河区"
          },
          {
            id: "2",
            date: "2019-09-26",
            date1: "2019-09-27",
            name: "张三1",
            status: "1",
            address: "广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2"
          },
          {
            id: "3",
            date: "2019-09-26",
            date1: "2019-09-28",
            name: "张三1",
            status: "1",
            address: "广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2"
          },
          {
            id: "4",
            date: "2019-09-26",
            date1: "2019-09-29",
            name: "张三1",
            status: "1",
            address: "广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2"
          }
        ],
        columns: [
          { prop: "name", label: "姓名", minWidth: "100", align: "" },
          { prop: "date", label: "日期", minWidth: "180", align: "" },
          { prop: "status", label: "状态", minWidth: "80" },
          { prop: "address", label: "地址", minWidth: "220" }
        ]
      },

    }
  },
  methods: {
    setDateLeft() {
      this.table.columns.forEach(item => {
        if (item.prop === "date") {
          if (item.align == "left") {
            item.align = ""
            this.setDate = "设置日期"
          } else {
            this.setDate = "取消日期"
            item.align = "left"
          }
        }
      })
    },
    setNameRight() {
      this.table.columns.forEach(item => {
        if (item.prop === "name") {
          if (item.align == "right") {
            item.align = ""
            this.setName = "设置姓名"
          } else {
            this.setName = "取消姓名"
            item.align = "right"
          }
        }
      })
    }
  },
}
</script>
