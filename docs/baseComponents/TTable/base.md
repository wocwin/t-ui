# 基本使用
---

<common-code-format>
  <docsComponents-TTable-base></docsComponents-TTable-base>
  <highlight-code slot="codeText">
    <template>
        <div class="t-table" style="width:100%;">
            <t-table :table="table" />
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
                            { prop: 'name', label: '姓名', minWidth: '100', sort: true, noShowColumn: true },
                            { prop: 'date', label: '日期', minWidth: '180', sort: true },
                            { prop: 'address', label: '地址', minWidth: '220', sort: true, noShowTip: true },
                            { prop: 'date', label: '日期', minWidth: '180', sort: true },
                            { prop: 'address', label: '地址', minWidth: '220' }
                        ]
                    }
                }
            }
        }
    </script>
  </highlight-code>
</common-code-format>

# 双击单元格复制
---

<common-code-format description="在组件中需配置：新增isCopy或isCopy='true'属性">
  <docsComponents-TTable-copy></docsComponents-TTable-copy>
  <highlight-code slot="codeText">
    <template>
        <div class="t-table" style="width:100%;">
            <t-table :table="table" isCopy/>
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
                        ]
                    }
                }
            }
        }
    </script>
  </highlight-code>
</common-code-format>

# 文字变色
---

<common-code-format description="在组件中需配置：changeColor对象">
  <docsComponents-TTable-textColor></docsComponents-TTable-textColor>
  <highlight-code slot="codeText">
    <template>
        <div class="t-table" style="width:100%;">
            <t-table :table="table" />
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
                        // 状态值为3时，文字变色
                        changeColor: { key: 'status', val: '3', txtStyle: '#ef473a' }
                    }
                }
            }
        }
    </script>
  </highlight-code>
</common-code-format>

# 第一列显示序列号
---

<common-code-format description="在组件中需配置：firstColumn: { type: 'index', label: '序列' }">
  <docsComponents-TTable-sequence></docsComponents-TTable-sequence>
  <highlight-code slot="codeText">
    <template>
        <div class="t-table" style="width:100%;">
            <t-table :table="table" isShowPagination/>
        </div>
    </template>
    <script>
        export default {
            data () {
                return {
                    table: {
                        total: 0,
                        currentPage: 1,
                        pageSize: 10,
                        // 是否显示复选框或序列号
                        // firstColumn: { type: 'selection' },
                        firstColumn: { type: 'index', label: '序列' },
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
                        ]
                    }
                }
            }
        }
    </script>
  </highlight-code>
</common-code-format>
