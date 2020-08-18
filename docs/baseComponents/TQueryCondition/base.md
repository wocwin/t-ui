# 查询条件组件
---

<common-code-format description="">
  <docsComponents-TQueryCondition-index></docsComponents-TQueryCondition-index>
  <highlight-code slot="codeText">
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
        export default {
             data () {
              return {
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
              reset () {
                console.log('重置')
                Object.assign(this.$data.queryInfo.query, this.$options.data().queryInfo.query)
              }
            }
        }
    </script>
  </highlight-code>
</common-code-format>

# TQueryCondition 参数配置

### 1. 简介：可以让多种查询条件在输入值后置顶并且按钮显示在右侧，可以收起或展开所有查询条件
 查询条件组件
**代码示例：**
```
     <t-query-condition
      :query.sync="queryInfo.query"
      :query-list="queryInfo.queryList"
      :list-type-info="listTypeInfo"
      @handleEvent="handleEvent"
      @reset="reset"
    />
    //注意参数接收必须要‘.sync’修饰符
```
### 2. events

|     事件名     | 说明   |   返回值   |
| :---------: | :--- | :-----: |
| reset   | 重置按钮 | 无 |
| handleEvent| 单个查询条件触发事件 | 查询条件输入的值/queryList中event值 |
### 3. 配置参数

| 参数          | 说明                             | 类型         | 是否必须 |
| ------------- | ------------------------------- | -------------| ------- |
| className      | 自定义类名                       | String      | 否     |
| listTypeInfo  | 下拉选择数据源（type:'select'有效） | Object     | 否      |
| queryList     | 查询条件list                      | Array       | 是      |
| ---type       | 查询条件类型                    | String       | 是      |
| ---label     | 查询条件title                    | String       | 是      |
| ---value     | 查询条件传给后台的参数              | String     | 是      |
| ---startDate  | 仅仅针对（type:'t-date'有效）与 endDate同时使用 | String     |  否      |
| ---endDate  | 仅仅针对（type:'t-date'有效）选择开始——结束日期  | String     |  否      |
| ---plusTime  | 仅仅针对（type:'t-date'有效）是否带后缀时分秒| Boolean     |  否      |
| ---list     | 下拉选择数据源（仅仅对type:'select'有效）| String  | 否     |
| ---event     | 每个步骤的按钮                    | Array        | 是      |
| ---valueFormat| type为date 日期返回值格式         | String        | 是      |
| query        | 参数       | Object      | 是    |
