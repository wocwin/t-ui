module.exports = {
    title: 'wocwin前端文档库',
    description: '技术分享及基础组件使用',
    base: '/t-ui/',
    // port: 6666,
    // dest: './dist',   // 设置输出目录
    head: [
        ['link', { rel: 'shortcut icon', type: 'image/x-icon', href: `./favicon.ico` }]
    ],
    markdown: {
        lineNumbers: true // 代码块显示行号
    },
    themeConfig: {
        // 你的GitHub仓库，请正确填写
        repo: 'https://github.com/wocwin/t-ui',
        // 自定义仓库链接文字。
        repoLabel: 'GitHub',
        nav: [
            { text: '主页', link: '/' },
            { text: '实际项目问题', link: '/projectProblem/permission' },
            { text: '基础组件', link: '/baseComponents/TForm/base' },
            { text: '更新日志', link: '/changeLog/log' }
        ],
        sidebar: {
            '/projectProblem/': [
                {
                    title: 'Vue项目',
                    collapsable: false,
                    children: [
                        'permission',
                        'keepAlive',
                        'axios'
                    ]
                }
            ],
            '/baseComponents/': [
                {
                    title: '常用组件',
                    collapsable: false,
                    children: [
                        'TQueryCondition/base', // 查询条件组件
                        'TInput/base', // input组件
                        'TSearch/base', // 下拉搜索查询组件
                        'TLayout/base', // 布局组件
                        'TStepWizard/base', // 步驟组件
                        'TDatePicker/base', // 日期组件
                        'TDialog/base', // 弹窗组件
                        'TUploadExcel/base' // 批量上传excel组件
                    ]
                },
                {
                    title: 'TForm表单组件',
                    collapsable: false,
                    children: [
                        'TForm/base', // 基本
                        'TForm/help' // 使用帮助(Attributes)
                    ]
                },
                {
                    title: 'TTable组件',
                    collapsable: false,
                    children: [
                        'TTable/base', // 基本
                        'TTable/pagination', // 分页
                        'TTable/checkbox', // 基本复选
                        'TTable/operation', // 操作栏
                        'TTable/filters', // 状态filters方法使用
                        'TTable/help' // 使用帮助(Attributes)
                    ]
                },
                {
                    title: 'TTreeTable组件',
                    collapsable: false,
                    children: [
                        'TTable/tree' // TreeTable组件
                    ]
                },
                {
                    title: '图片上传组件',
                    collapsable: false,
                    children: [
                        'TUploadFile/base'
                    ]
                }
            ]
        }
    },
    plugins: [
        // ['@vuepress/plugins-back-to-top', false],
        ['vuepress-plugin-gotop-plus', {
            // mobileShow: false,
            threshold: 150
        }]
    ]
}
