module.exports = {
  title: 'Tui基础组件文档库',
  description: '基于Element-ui和ant-design-vue二次封装基础组件示例',
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
      { text: '基础组件', link: '/baseComponents/' },
      // { text: 'Tui主题', link: '/theme/base' },
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
                // 'ElementUi/TTheme/base', // 主题设置
                'ElementUi/TInput/base', // input组件
                'ElementUi/TButton/base', // button组件
                'ElementUi/TTimerBtn/base', // 获取验证码倒计时组件
                'ElementUi/TSearch/base', // 下拉搜索查询组件
                'ElementUi/TLayout/base', // 布局组件
                'ElementUi/TLayoutPage/base', // 局部布局组件
                'ElementUi/TStepWizard/base', // 步驟组件
                'ElementUi/TDatePicker/base', // 日期组件
                'ElementUi/TDialog/base', // 弹窗组件
                'ElementUi/TDetail/base', // 详情组件
                'ElementUi/TTreeSelect/base', // 下拉选择树形及结构组件
                'ElementUi/TSelect/base', // 下拉选择组件
                'ElementUi/TPaginationSelect/base', // 下拉选择分页组件
                // 'ElementUi/TSelectTable/base', // 下拉选择表格组件
                // 'ElementUi/TUploadExcel/base' // 批量上传excel组件
              ]
            },
            {
              title: '下拉选择表格组件',
              collapsable: false,
              children: [
                'ElementUi/TSelectTable/radio',
                'ElementUi/TSelectTable/isKeyup',
                'ElementUi/TSelectTable/radioDefaultSelectVal',
                'ElementUi/TSelectTable/radioPagination',
                'ElementUi/TSelectTable/isShowFirstColumn',
                'ElementUi/TSelectTable/isShowQuery',
                'ElementUi/TSelectTable/radiovirtual', // 单选--虚拟列表
                'ElementUi/TSelectTable/multiplevirtual', // 多选-虚拟列表
                'ElementUi/TSelectTable/multiple',
                'ElementUi/TSelectTable/multipleDefaultSelectVal',
                'ElementUi/TSelectTable/showPagination',
                'ElementUi/TSelectTable/formDemo',
                'ElementUi/TSelectTable/help', // 使用帮助(Attributes)
              ]
            },
            {
              title: '查询条件组件',
              collapsable: false,
              children: [
                'ElementUi/TQueryCondition/base', // 基本
                'ElementUi/TQueryCondition/slot', // 插槽使用
                'ElementUi/TQueryCondition/labelRender', // tsx自定义label使用
                'ElementUi/TQueryCondition/defaultVal', // 默认值
                'ElementUi/TQueryCondition/linkage', // 联动使用
                'ElementUi/TQueryCondition/TSelectUse', // 结合TSelect使用
                'ElementUi/TQueryCondition/TDatePickerUse', // 结合TDatePicker使用
                'ElementUi/TQueryCondition/help', // 使用帮助(Attributes)
              ]
            },
            {
              title: '表单组件',
              collapsable: false,
              children: [
                'ElementUi/TForm/base', // 基本模式
                'ElementUi/TForm/labelPosition', // 对齐方式
                'ElementUi/TForm/widthSize', // 每行展示多少项
                'ElementUi/TForm/rules', // 表单验证
                'ElementUi/TForm/eventHandle', // 事件使用
                'ElementUi/TForm/labelRender', // 自定义label
                'ElementUi/TForm/slotName', // 自定义输入框插槽
                'ElementUi/TForm/textShow', // 文本展示
                'ElementUi/TForm/comUse', // 自己组件使用
                'ElementUi/TForm/assignment', // 赋值回显
                'ElementUi/TForm/submit', // 切换页面获取表单数据
                'ElementUi/TForm/dynamic', // 动态增减表单项
                'ElementUi/TForm/help' // 使用帮助(Attributes)
              ]
            },
            {
              title: '模块表单组件',
              collapsable: false,
              children: [
                'ElementUi/TModuleForm/base', // 基本模式
                'ElementUi/TModuleForm/slotName', // 模块插槽使用
                'ElementUi/TModuleForm/disabled', // 某个模块是否禁用展开
                'ElementUi/TModuleForm/labelPosition', // 模块表单对齐方式
                'ElementUi/TModuleForm/rules', // 模块表单表单验证
                'ElementUi/TModuleForm/validateError', //  模块表单校验错误提示
                'ElementUi/TModuleForm/footer', // 模块表单自定义底部按钮
                'ElementUi/TModuleForm/tabs', //  模块表单显示tabs(注意只显示在最后一个模块)
                'ElementUi/TModuleForm/isGoBackEvent', //  模块表单自定义返回事件（默认返回上一页）
                'ElementUi/TModuleForm/isShowBack', //  模块表单没有返回icon
                'ElementUi/TModuleForm/extra', //  模块表单title右侧插槽使用
                'ElementUi/TModuleForm/titleBtn', // 某个模块Title右侧插槽使用

                'ElementUi/TModuleForm/detail', // 模块详情基本模式
                'ElementUi/TModuleForm/detailspan', // 模块详情每行展示项
                'ElementUi/TModuleForm/tooltip', // 模块详情提示项
                'ElementUi/TModuleForm/detailslot', // 模块详情插槽使用
                'ElementUi/TModuleForm/detailslotName', // 模块详情某个值value插槽使用
                'ElementUi/TModuleForm/detaildisabled', // 某个模块是否禁用展开
                'ElementUi/TModuleForm/detailTitleBtn', // 某个模块Title右侧插槽使用
                'ElementUi/TModuleForm/help' // 使用帮助(Attributes)
              ]
            },
            {
              title: 'TTable组件',
              collapsable: false,
              children: [
                'ElementUi/TTable/TAdaptivePage', // 一屏显示
                'ElementUi/TTable/base', // 基本
                'ElementUi/TTable/pagination', // 分页
                'ElementUi/TTable/virtual', // 虚拟列表
                'ElementUi/TTable/notSort', // 指定列不需要排序
                'ElementUi/TTable/customSort', // 自定义排序
                'ElementUi/TTable/mergedCell', // 合并单元格
                'ElementUi/TTable/headerGroup', // 表头合并
                'ElementUi/TTable/slotNameMerge', // 表头合并插槽显示
                // 'ElementUi/TTable/headerGroupEditTable', // 表头合并单元格编辑功能
                'ElementUi/TTable/renderCol', // render列渲染
                'ElementUi/TTable/slotName', // 插槽列渲染
                'ElementUi/TTable/filters', // 字典过滤
                'ElementUi/TTable/objRenderPorp', // 对象模式渲染
                'ElementUi/TTable/renderHeader', // 自定义列标题 label
                'ElementUi/TTable/radio', // 单选
                'ElementUi/TTable/treeTable',
                'ElementUi/TTable/rules', // 单元格编辑--校验
                'ElementUi/TTable/singleEditKeyup', // 单元格编辑键盘事件
                'ElementUi/TTable/singleEditTable', // 开启单个单元格编辑
                'ElementUi/TTable/eventHandle', // 单元格编辑使用第三方组件事件
                'ElementUi/TTable/cellEditSave', // 单元格编辑保存单行操作
                'ElementUi/TTable/editTable', // 开启整行编辑模式
                'ElementUi/TTable/rowSort', // 行拖拽排序
                'ElementUi/TTable/checkbox', // 基本复选
                'ElementUi/TTable/columnSet', // 显示隐藏列
                'ElementUi/TTable/operation', // 操作栏
                'ElementUi/TTable/customRender', // customRender操作自定义渲染
                'ElementUi/TTable/tree', // TreeTable组件
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
            // {
            //   title: 'TTreeTable组件',
            //   collapsable: false,
            //   children: [
            //     'ElementUi/TTable/tree' // TreeTable组件
            //   ]
            // },
            // {
            //   title: '图片/文件上传组件',
            //   collapsable: false,
            //   children: [
            //     'ElementUi/TUploadFile/base',
            //     'ElementUi/UploadFile/base'
            //   ]
            // }
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
      ],
      // '/theme/': [
      //   {
      //     title: 'Tui主题',
      //     collapsable: false,
      //     children: [
      //       'base'
      //     ]
      //   }
      // ],
    }
  },
  chainWebpack(config) {
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
