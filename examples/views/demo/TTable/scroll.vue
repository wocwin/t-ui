<template>
  <t-layout-page>
    <t-layout-page-item>
      <div style="display: inline-block; width: 100%">
        <t-table class="table" :table="table" :columns="table.columns" :isShowPagination="false" />
        <vue-seamless-scroll
          :data="table.data"
          class="seamless-warp"
          style="width: 100%"
          :class-option="classOption"
        >
          <t-table
            class="table_scroll"
            :table="table"
            :columns="table.columns"
            :isShowPagination="false"
          />
        </vue-seamless-scroll>
      </div>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script>
import VueSeamlessScroll from 'vue-seamless-scroll' // 循环滚动
export default {
  name: 'ScrollTable',
  data() {
    return {
      table: {
        data: [
          {
            id: '1',
            date: '2019-09-25',
            name: '张三',
            status: '待处理',
            age: 18,
            address: '广东省广州市天河区'
          },
          {
            id: '2',
            date: '2019-09-26',
            name: '李四',
            age: 19,
            status: '已处理',
            address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2'
          },
          {
            id: '3',
            date: '2019-09-27',
            name: '王五',
            age: 20,
            status: '已完成',
            address: '广东省广州市天河区3'
          },
          {
            id: '3',
            date: '2019-09-27',
            name: '赵六',
            age: 20,
            status: '已完成',
            address: '广东省广州市天河区3'
          }
        ],
        columns: [
          { prop: 'name', label: '姓名' },
          { prop: 'date', label: '日期' },
          { prop: 'age', label: '年龄' },
          { prop: 'status', label: '状态' },
          { prop: 'address', label: '地址' }
        ],
        // 表格内操作列
        operator: [
          {
            text: '编辑',
            // type: 'primary',
            fun: this.edit
          }
        ]
      }
    }
  },
  components: {
    VueSeamlessScroll
  },
  computed: {
    classOption() {
      return {
        step: 0.8, // 数值越大速度滚动越快
        limitMoveNum: this.table.data.length, // 开始无缝滚动的数据量 this.table.data
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      }
    }
  },
  methods: {
    edit(row) {
      console.log('获取整行数据', row)
    }
  }
}
</script>
<style lang="scss" scoped>
.scroll_table {
  margin: 15px;
  display: flex;
  ::v-deep .table .el-table__body-wrapper {
    display: none;
  }
  // 重点注意这段样式
  .seamless-warp {
    height: 200px;
    overflow: hidden;
    ::v-deep .table_scroll .el-table__header-wrapper {
      display: none;
    }
  }
}
</style>
