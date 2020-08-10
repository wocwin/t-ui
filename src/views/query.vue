<template>
  <div class="query-data">
    <!-- 条件栏 -->
    <t-query-condition
      :query.sync="queryInfo.query"
      :query-list="queryInfo.queryList"
      :operator-list="queryInfo.operatorList"
      :list-type-info="listTypeInfo"
      @handleEvent="handleEvent"
      @reset="reset"
    />
  </div>
</template>
<script>
export default {
  name: 'queryData',
  data () {
    return {
      // 过滤相关配置
      queryInfo: {
        query: {
          createTime: '',
          account: '',
          createUser: '',
          status: '',
          name: '',
          name1: '',
          name2: '',
          name3: '',
          name4: '',
          name5: '',
          name6: '',
          name7: '',
          name8: '',
          name9: ''
        },
        queryList: [
          { type: 'input', label: '账户', value: 'account' },
          { type: 'input', label: '用户名', value: 'name' },
          { type: 'input', label: '用户名1', value: 'name1' },
          { type: 'input', label: '用户名2', value: 'name2' },
          { type: 'input', label: '用户名3', value: 'name3' },
          { type: 'input', label: '用户名4', value: 'name4' },
          { type: 'input', label: '用户名5', value: 'name5' },
          { type: 'input', label: '用户名6', value: 'name6' },
          { type: 'input', label: '用户名7', value: 'name7' },
          { type: 'input', label: '用户名8', value: 'name8' },
          { type: 'input', label: '用户名9', value: 'name9' },
          { type: 'select', label: '创建人', value: 'createUser', list: 'userList' },
          { type: 'select', label: '状态', value: 'status', list: 'statusList' },
          { type: 'date', label: '创建时间', value: 'createTime', event: 'date' }
        ]
      },
      // 相关列表
      listTypeInfo: {
        userList: [
          { key: '手机用户', value: 0 },
          { key: '论坛用户', value: 1 },
          { key: '平台用户', value: 2 }
        ],
        statusList: [
          { key: '未完成', value: 0 },
          { key: '审批中', value: 1 },
          { key: '已完成', value: 2 }
        ]
      }
    }
  },
  // 方法
  methods: {
    // 触发事件
    handleEvent (value, event) {
      switch (event) {
        // 对表格获取到的数据做处理
        case 'date':
          console.log(1111111, event, value)
          break
      }
    },
    // search () {
    //   console.log('查询', this.queryInfo.query)
    //   this.queryInfo.queryList.map(item => {
    //     // 默认查询所以不清除
    //     if (Object.values(this.queryInfo.query).every(res => res === '')) {
    //       this.$set(item, 'show', true)
    //     } else {
    //       if (!this.queryInfo.query[item.value]) {
    //         this.$set(item, 'show', false)
    //       }
    //     }
    //   })
    //   console.log('查询2', this.queryInfo.queryList)
    // },
    reset () {
      console.log('重置')
      Object.assign(this.$data.queryInfo.query, this.$options.data().queryInfo.query)
    }
    // unfold (val) {
    //   if (val.label === '收起') {
    //     this.queryInfo.queryList.map((item, index) => {
    //       if (index !== 0 && index !== 1) {
    //         this.$set(item, 'show', false)
    //       }
    //     })
    //     this.queryInfo.operatorList.map(item => {
    //       if (item.label === '收起') {
    //         this.$set(item, 'show', false)
    //       } else {
    //         this.$set(item, 'show', true)
    //       }
    //     })
    //   } else {
    //     this.queryInfo.queryList.map(item => {
    //       this.$set(item, 'show', true)
    //     })
    //     this.queryInfo.operatorList.map(item => {
    //       if (item.label === '展开') {
    //         this.$set(item, 'show', false)
    //       } else {
    //         this.$set(item, 'show', true)
    //       }
    //     })
    //   }
    // }
  }
}
</script>
<style lang='scss' scoped>
</style>
