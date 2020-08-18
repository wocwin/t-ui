<template>
  <div class="query-data">
    <t-query-condition
      :query.sync="queryInfo.query"
      :query-list="queryInfo.queryList"
      :list-type-info="listTypeInfo"
      @handleEvent="handleEvent"
      @reset="reset"
    />
  </div>
</template>
<script>
import TQueryCondition from '../../../../../src/components/baseComponents/TQueryCondition'
export default {
  name: 'queryData',
  components: {
    TQueryCondition
  },
  data () {
    return {
      // 过滤相关配置
      queryInfo: {
        query: {
          createTime: '',
          startDate: '',
          endDate: '',
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
          { type: 'date', label: '创建时间', value: 'createTime', event: 'date' },
          { type: 't-date', label: '日期范围', startDate: 'startDate', endDate: 'endDate', event: 'date' }
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
    handleEvent (type, val, key) {
      switch (type) {
        // 对表格获取到的数据做处理
        case 'date':
          console.log(1111111, val, type, key)
          this.queryInfo.query[key] = val
          break
      }
    },
    reset () {
      console.log('重置')
      Object.assign(this.$data.queryInfo.query, this.$options.data().queryInfo.query)
    }
  }
}
</script>
