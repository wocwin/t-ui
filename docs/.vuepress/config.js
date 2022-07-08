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
    // lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
    // 你的GitHub仓库，请正确填写
    repo: 'https://github.com/wocwin/t-ui',
    // 自定义仓库链接文字。
    repoLabel: 'GitHub',
    nav: [
      { text: '主页', link: '/' },
      { text: '实际项目问题', link: '/projectProblem/permission' },
      { text: '基础组件', link: '/baseComponents/ElementUi/TInput/base' },
      // { text: '更新日志', link: '/changeLog/log' },
      { text: "Gitee码云", link: "https://gitee.com/wocwin/t-ui" }
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
          title: '基于element封装',
          collapsable: true,
          children: [
            {
              title: '常用组件',
              collapsable: false,
              children: [
                'ElementUi/TQueryCondition/base', // 查询条件组件
                'ElementUi/TInput/base', // input组件
                'ElementUi/TSearch/base', // 下拉搜索查询组件
                'ElementUi/TLayout/base', // 布局组件
                'ElementUi/TLayoutPage/base', // 局部布局组件
                'ElementUi/TStepWizard/base', // 步驟组件
                'ElementUi/TDatePicker/base', // 日期组件
                'ElementUi/TDialog/base', // 弹窗组件
                'ElementUi/TDetail/base', // 详情组件
                'ElementUi/TSelect/base', // 下拉选择组件
                'ElementUi/TPaginationSelect/base', // 下拉选择分页组件
                'ElementUi/TSelectTable/base', // 下拉选择表格组件
                // 'ElementUi/TUploadExcel/base' // 批量上传excel组件
              ]
            },
            {
              title: '表单组件',
              collapsable: false,
              children: [
                // 'ElementUi/TForm/base', // 基本
                // 'ElementUi/TForm/help', // 使用帮助(Attributes)
                'ElementUi/TSimpleForm/base', // 基本
                'ElementUi/TSimpleForm/help', // 使用帮助(Attributes)
                'ElementUi/TModuleForm/base', // 基本
                'ElementUi/TModuleForm/detail', // detail
                'ElementUi/TModuleForm/help' // 使用帮助(Attributes)
              ]
            },
            {
              title: 'TTable组件',
              collapsable: false,
              children: [
                'ElementUi/TTable/base', // 基本
                'ElementUi/TTable/pagination', // 分页
                'ElementUi/TTable/mergedCell', // 合并单元格
                'ElementUi/TTable/headerGroup', // 表头合并
                'ElementUi/TTable/renderCol', // render列渲染
                'ElementUi/TTable/objRenderPorp', // 对象模式渲染
                'ElementUi/TTable/renderHeader', // 自定义列标题 label
                'ElementUi/TTable/radio', // 单选
                'ElementUi/TTable/singleEditTable', // 开启单个单元格编辑
                'ElementUi/TTable/cellEditSave', // 单元格编辑保存单行操作
                'ElementUi/TTable/editTable', // 开启整行编辑模式
                'ElementUi/TTable/checkbox', // 基本复选
                'ElementUi/TTable/columnSet', // 显示隐藏列
                'ElementUi/TTable/operation', // 操作栏
                'ElementUi/TTable/filters', // 状态filters方法使用
                'ElementUi/TTable/customRender', // customRender操作自定义渲染
                'ElementUi/TTable/help' // 使用帮助(Attributes)
              ]
            },
            // {
            //   title: '表格编辑组件',
            //   collapsable: false,
            //   children: [
            //     'ElementUi/TEditTable/base', // 编辑table组件
            //   ]
            // },
            {
              title: 'TTreeTable组件',
              collapsable: false,
              children: [
                'ElementUi/TTable/tree' // TreeTable组件
              ]
            },
            {
              title: '图片/文件上传组件',
              collapsable: false,
              children: [
                'ElementUi/TUploadFile/base',
                'ElementUi/UploadFile/base'
              ]
            }
          ]
        },
        {
          title: '基于AntDesign封装',
          collapsable: true,
          children: [
            {
              title: '常用组件',
              collapsable: false,
              children: [
                'AntDesign/TAntLayoutConditional/base', // 筛选器布局组件
                'AntDesign/TAntLayoutTable/base', // 默认table布局组件
                'AntDesign/TAntLayoutForm/base', // 配置化表单组件
                'AntDesign/TAntModal/base' // 弹窗组件
              ]
            }
          ]
        },
      ]
    }
  },
  chainWebpack (config) {
    config.resolve.alias.set('core-js/library/fn', 'core-js/features');
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            'cache-loader',
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                configFile: false,
                presets: [
                  '@babel/preset-env', // 可以识别es6语法
                  '@vue/babel-preset-jsx' // 解析jsx语法
                ]
              }
            },
            {
              loader: 'ts-loader',
              options: {
                appendTsxSuffixTo: [/\.vue$/, /\.md$/]
              }
            }
          ]
        }
      ]
    }
  },
  plugins: [
    [
      'vuepress-plugin-typescript',
      {
        tsLoaderOptions: {
          // ts-loader 的所有配置项
        },
      },
    ],
    // ['@vuepress/plugins-back-to-top', false],
    ['vuepress-plugin-gotop-plus', {
      // mobileShow: false,
      threshold: 150
    }],
    '@vuepress-reco/extract-code'
  ]
}
