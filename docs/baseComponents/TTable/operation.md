# 操作按钮
---

<common-code-format title="显示table外操作按钮" description="在组件中需配置：toolbar数组，超过3个按钮，第4个按钮会以下拉的方式展示(icon的配置需以ElementUI内置icon为准)；前提条件是，必须使用插槽toolbar；新增highlight-current-row可以高亮选中行的颜色；按钮的颜色是以ElementUI内置button的type为准">
  <docsComponents-TTable-operationOutside></docsComponents-TTable-operationOutside>
  <highlight-code slot="codeText">
    <template>
        <div class="t-table" style="width:100%;">
           <t-table :table="table">
            <!-- 必须要有toolbar插槽 -->
            <template #toolbar></template>
           </t-table>
        </div>
    </template>
    <script>
        export default {
            data () {
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
                        column: [
                            { prop: 'name', label: '姓名', minWidth: '100', sort: true },
                            { prop: 'date', label: '日期', minWidth: '180', sort: true },
                            { prop: 'address', label: '地址', minWidth: '220', sort: true },
                            { prop: 'date', label: '日期', minWidth: '180', sort: true },
                            { prop: 'address', label: '地址', minWidth: '220' }
                        ],
                        // 表格外操作，选中表格某行，可以将其数据传出
                        toolbar: [
                            {
                                text: '返回上一个页面1',
                                icon: 'el-icon-circle-plus-outline',
                                type: 'danger',
                                fun: this.getBack
                            },
                            {
                                text: '返回上一个页面2',
                                icon: 'el-icon-circle-plus-outline',
                                type: 'danger',
                                fun: this.getBack
                            },
                            {
                                text: '返回上一个页面3',
                                icon: 'el-icon-circle-plus-outline',
                                type: 'danger',
                                fun: this.getBack
                            },
                            {
                                text: '返回上一个页面4',
                                icon: 'el-icon-circle-plus-outline',
                                type: 'danger',
                                fun: this.getBack
                            }
                        ]
                    }
                }
            }
        }
    </script>
  </highlight-code>
</common-code-format>

<common-code-format title="显示table内操作按钮" description="在组件中需配置：operator数组，是显示按钮数且点击后将当前行数据传出；operatorConfig对象是操作列样式（可以设置宽度/列标题及是否固定在最左/右侧）；按钮的颜色是以ElementUI内置button的type为准；noshow:[{key:'fields',val:'isHasVal'},{key:'status',val:[0,1,99]},{key:'channelCode',val:['bank']}]；注释： noshow中的key值(fields/status/channelCode)是表格后台返回的字段；当val等于字符串'isHasVal'时,字段'fields'返回为空时，此行操作按钮隐藏；以上综合：当'status'为0/1/99并且'channelCode'为'bank'及'fields'为空时,隐藏按钮——noshow:多种状态控制按钮的显示与隐藏；show: { key: 'status', val: [3,4] }表status值为3或者4时，显示此操作健 根据后台字段返回是数字还是字符串来显示。">
  <docsComponents-TTable-operationInside></docsComponents-TTable-operationInside>
  <highlight-code slot="codeText">
    <template>
        <div class="t-table" style="width:100%;">
           <t-table :table="table"/>
        </div>
    </template>
    <script>
        export default {
            data () {
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
                        column: [
                            { prop: 'name', label: '姓名', minWidth: '100', sort: true },
                            { prop: 'date', label: '日期', minWidth: '180', sort: true },
                            { prop: 'address', label: '地址', minWidth: '220', sort: true },
                            { prop: 'date', label: '日期', minWidth: '180', sort: true },
                            { prop: 'address', label: '地址', minWidth: '220' }
                        ],
                        // 表格内操作列
                            operator: [
                                {
                                    text: '新增',
                                    type: 'primary',
                                    fun: this.add,
                                    // status为1时，不显示此按钮
                                    noshow: [{ key: 'status', val: ['1'] }]
                                },
                                {
                                    text: '编辑',
                                    type: 'danger',
                                    // status值为2时，展示此按钮
                                    show: { key: 'status', val: ['2'] },
                                    fun: this.edit
                                },
                                {
                                    text: '删除',
                                    fun: this.del
                                }
                            ],
                            // 操作列样式
                            operatorConfig: {
                            fixed: 'right', // 固定列表右边（left则固定在左边）
                            width: 280,
                            label: '操作'
                            }
                        }
                    }
                },
                 methods: {
                    // 新增
                    add (val) {
                        console.log('新增', val)
                    },
                    // 编辑
                    edit (val) {
                        console.log('编辑', val)
                    },
                    // 删除
                    del (val) {
                        this.$confirm('是否永久删除该项, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            console.log('删除', val)
                        }).catch(() => {
                            this.$message.info('已取消删除')
                        })
                    }
                }
            }
    </script>
  </highlight-code>
</common-code-format>
