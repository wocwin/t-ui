module.exports = {
  title: 'Tui基础组件文档库',
  description: '基于Element-ui二次封装基础组件示例',
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
        // {
        //   title: '基于element封装',
        //   collapsable: true,
        //   children: [
        {
          title: '常用组件',
          collapsable: false,
          children: [
            // 'TTheme/base', // 主题设置
            'TInput/base', // input组件
            'TButton/base', // button组件
            'TTimerBtn/base', // 获取验证码倒计时组件
            'TSearch/base', // 下拉搜索查询组件
            'TLayout/base', // 布局组件
            'TLayoutPage/base', // 局部布局组件
            'TStepWizard/base', // 步驟组件
            'TDatePicker/base', // 日期组件
            'TDialog/base', // 弹窗组件
            'TDetail/base', // 详情组件
            'TTreeSelect/base', // 下拉选择树形及结构组件
            'TSelect/base', // 下拉选择组件
            'TPaginationSelect/base', // 下拉选择分页组件
            // 'TSelectTable/base', // 下拉选择表格组件
            // 'TUploadExcel/base' // 批量上传excel组件
          ]
        },
        {
          title: '下拉选择表格组件',
          collapsable: false,
          children: [
            'TSelectTable/radio',
            'TSelectTable/isKeyup',
            'TSelectTable/radioDefaultSelectVal',
            'TSelectTable/radioPagination',
            'TSelectTable/isShowFirstColumn',
            'TSelectTable/multipleDynamicDefaultSelectVal',
            'TSelectTable/radioDynamicDefaultSelectVal',
            'TSelectTable/isShowQuery',
            'TSelectTable/isShowQuerySpan',
            'TSelectTable/radiovirtual', // 单选--虚拟列表
            'TSelectTable/multiplevirtual', // 多选-虚拟列表
            'TSelectTable/multiple',
            'TSelectTable/multipleDefaultSelectVal',
            'TSelectTable/showPagination',
            'TSelectTable/formDemo',
            'TSelectTable/help', // 使用帮助(Attributes)
          ]
        },
        {
          title: '查询条件组件',
          collapsable: false,
          children: [
            'TQueryCondition/base', // 基本
            'TQueryCondition/slot', // 插槽使用
            'TQueryCondition/labelRender', // tsx自定义label使用
            'TQueryCondition/defaultVal', // 默认值
            'TQueryCondition/linkage', // 联动使用
            'TQueryCondition/TSelectUse', // 结合TSelect使用
            'TQueryCondition/TDatePickerUse', // 结合TDatePicker使用
            'TQueryCondition/widthSize', // 一行展示多少项
            'TQueryCondition/maxVisibleSpans', // 收起时默认显示几行
            'TQueryCondition/help', // 使用帮助(Attributes)
          ]
        },
        {
          title: '表单组件',
          collapsable: false,
          children: [
            'TForm/base', // 基本模式
            'TForm/labelPosition', // 对齐方式
            'TForm/widthSize', // 每行展示多少项
            'TForm/rules', // 表单验证
            'TForm/bindFun', // bind接收Function
            'TForm/eventHandle', // 事件使用
            'TForm/labelRender', // 自定义label
            'TForm/slotName', // 自定义输入框插槽
            'TForm/textShow', // 文本展示
            'TForm/comUse', // 自己组件使用
            'TForm/assignment', // 赋值回显
            'TForm/submit', // 切换页面获取表单数据
            'TForm/dynamic', // 动态增减表单项
            'TForm/help' // 使用帮助(Attributes)
          ]
        },
        {
          title: '模块表单组件',
          collapsable: false,
          children: [
            'TModuleForm/base', // 基本模式
            'TModuleForm/slotName', // 模块插槽使用
            'TModuleForm/disabled', // 某个模块是否禁用展开
            'TModuleForm/labelPosition', // 模块表单对齐方式
            'TModuleForm/rules', // 模块表单表单验证
            'TModuleForm/validateError', //  模块表单校验错误提示
            'TModuleForm/footer', // 模块表单自定义底部按钮
            'TModuleForm/tabs', //  模块表单显示tabs(注意只显示在最后一个模块)
            'TModuleForm/isGoBackEvent', //  模块表单自定义返回事件（默认返回上一页）
            'TModuleForm/isShowBack', //  模块表单没有返回icon
            'TModuleForm/extra', //  模块表单title右侧插槽使用
            'TModuleForm/titleBtn', // 某个模块Title右侧插槽使用

            'TModuleForm/detail', // 模块详情基本模式
            'TModuleForm/detailspan', // 模块详情每行展示项
            'TModuleForm/tooltip', // 模块详情提示项
            'TModuleForm/detailslot', // 模块详情插槽使用
            'TModuleForm/detailslotName', // 模块详情某个值value插槽使用
            'TModuleForm/detaildisabled', // 某个模块是否禁用展开
            'TModuleForm/detailTitleBtn', // 某个模块Title右侧插槽使用
            'TModuleForm/help' // 使用帮助(Attributes)
          ]
        },
        {
          title: 'TTable组件',
          collapsable: false,
          children: [
            'TTable/base', // 基本
            'TTable/sequence', // 序列
            'TTable/radio', // 单选
            'TTable/radioDefault', // 单选--默认选中
            'TTable/checkbox', // 基本复选
            'TTable/pageCheck', // 基本复选--翻页选中
            'TTable/firstRadioOrIndex', // 显示单选框和序列号
            'TTable/firstSelectionOrIndex', //显示多选框和序列号
            'TTable/expand', // 展开行
            'TTable/pagination', // 分页
            'TTable/virtual', // 虚拟列表
            'TTable/notSort', // 指定列不需要排序
            'TTable/customSort', // 自定义排序
            'TTable/mergedCell', // 合并单元格
            'TTable/headerGroup', // 表头合并
            'TTable/slotNameMerge', // 表头合并插槽显示
            // 'TTable/headerGroupEditTable', // 表头合并单元格编辑功能
            'TTable/renderCol', // render列渲染
            'TTable/renderFor', // 某列 render for循环渲染
            'TTable/slotName', // 插槽列渲染
            'TTable/filters', // 字典过滤
            'TTable/objRenderPorp', // 对象模式渲染
            'TTable/renderHeader', // 自定义列标题 label
            'TTable/treeTable',
            'TTable/rules', // 单元格编辑--校验
            'TTable/editSingle', // 单元格编辑
            'TTable/singleEditKeyup', // 单元格编辑键盘事件
            'TTable/singleEditSlot', // 单元格编辑-插槽-键盘事件
            'TTable/singleEditTable', // 开启单个单元格编辑
            'TTable/eventHandle', // 单元格编辑使用第三方组件事件
            'TTable/cellEditSave', // 单元格编辑保存单行操作
            'TTable/editTable', // 开启整行编辑模式
            'TTable/rowSort', // 行拖拽排序
            'TTable/columnSet', // 显示隐藏列
            'TTable/operation', // 操作栏
            'TTable/operatorBtn', // 操作栏
            'TTable/operatorRender', // 操作栏
            'TTable/operatorSlotName', // 操作栏
            'TTable/customRender', // customRender操作自定义渲染
            'TTable/tree', // TreeTable组件
            'TTable/help' // 使用帮助(Attributes)
          ]
        },
        {
          title: 'TAdaptivePage组件',
          collapsable: false,
          children: [
            'TAdaptivePage/base',
            'TAdaptivePage/selection',
            'TAdaptivePage/lefttree',
            'TAdaptivePage/virtual',
          ]
        }
        // {
        //   title: 'TTreeTable组件',
        //   collapsable: false,
        //   children: [
        //     'TTable/tree' // TreeTable组件
        //   ]
        // },
        // {
        //   title: '图片/文件上传组件',
        //   collapsable: false,
        //   children: [
        //     'TUploadFile/base',
        //   ]
        // }
        // ]
        // }
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
