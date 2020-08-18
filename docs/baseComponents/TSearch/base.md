# search组件
---

<common-code-format>
  <docsComponents-TSearch-index></docsComponents-TSearch-index>
  <highlight-code slot="codeText">
    <template>
        <div class="t-search-demo" style="min-height:100px;width:100%;padding:10px;">
          <t-search
            tips="请输入用户名"
            :searchValue="searchValue"
            :selectValue="selectValue"
            @click="search"
            @change="typeChange"
            :searchCondition="searchCondition"
          ></t-search>
      </div>
    </template>
    <script>
        export default {
             data () {
              return {
                searchValue: '', // 查询条件
                selectValue: '0', // 初始化查询条件
                searchCondition: [
                  {
                    label: '新增待审批',
                    value: '0'
                  },
                  {
                    label: '新增已通过',
                    value: '1'
                  },
                  {
                    label: '新增已驳回',
                    value: '2'
                  }
                ]
              }
            },
            // 方法
            methods: {
                search (val) {
                  console.log('点击查询按钮', val)
                },
                typeChange (val) {
                  this.searchValue = ''
                  this.selectValue = val
                }
            }
        }
    </script>
  </highlight-code>
</common-code-format>

##t-search——业务搜索组件

**概述：**

`下拉选择查询条件与查询输入框及btn查询按钮联合组件`

**代码示例：**
~~~
      <t-search :searchValue="searchNameVal" :selectValue="select" :searchCondition="searchCondition" @click="search"/>
~~~
###props

| 属性         | 说明              | 类型            | 传值      |
| ---------- | :-------------- | :------------ | :------ |
| searchValue     | 查询输入值   | String | 必传      |
| selectValue     | 下拉选项值   | String | 必传      |
| searchCondition | 下拉选项     | Array  | 非必传      |

###events

|   事件名    | 说明         |   返回值   |
| :------: | :--------- | :-----: |
|  change  | 切换下拉选项触发，清空输入框 | 无 |
|  click  | 点击查询按钮时触发 | 输入值和下拉选项名 |
**注意**
+ click事件的传值是有先后顺序的（先是input的输入值后是下拉的选项值）


###slot
 slot 的name值是operate
