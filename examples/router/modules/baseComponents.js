/** 基础组件 路由 **/

import Layout from '@/layout'
import Blank from '@/components/Blank'
/* 定义component */
/**
 * 常用组件
 */
// 日期组件
const TDatePicker = () => import('@/views/components/tCommonComponents/TDatePicker')
// 弹窗组件
const TDialog = () => import('@/views/components/tCommonComponents/TDialog')
// input组件
const TInput = () => import('@/views/components/tCommonComponents/TInput')
// 布局组件
const TLayout = () => import('@/views/components/tCommonComponents/TLayout')
// 搜索组件
const TSearch = () => import('@/views/components/tCommonComponents/TSearch')
// 下拉选择
const TSelect = () => import('@/views/components/tCommonComponents/TSelect')
// 步骤组件
const TStepWizard = () => import('@/views/components/tCommonComponents/TStepWizard')
// TTable组件
const TTable = () => import('@/views/components/TTable')
// 条件查询置顶组件
const TQueryCondition = () => import('@/views/components/TQueryCondition')
// 编辑表格
const TEditTable = () => import('@/views/components/TEditTable')

// 图片上传组件
const TUploadFile = () => import('@/views/components/uploadFile')
// TreeTable组件
const TreeTable = () => import('@/views/components/treeTable')
// 表单组件
const TForm = () => import('@/views/components/TForm')
// t-simple-form表单组件
const TSimpleForm = () => import('@/views/components/TForm/t-simple-form')
// 模块表单
const TModuleForm = () => import('@/views/components/TForm/t-module-form')
// 模块详情
const TModuleDetail = () => import('@/views/components/TForm/t-module-detail')

const TUploadExcel = () => import('@/views/components/TUploadExcel')

const baseComponentsRouter = {
  path: '/base-components',
  isStatic: true,
  component: Layout,
  name: '基础组件',
  meta: {
    title: '基础组件'
  },
  children: [
    {
      path: 't-common-components',
      name: '常用组件',
      component: Blank,
      meta: { title: '常用组件' },
      children: [
        {
          path: 't-date-picker',
          name: '日期组件',
          component: TDatePicker,
          meta: { title: '日期组件' }
        },
        {
          path: 't-dialog',
          name: '弹窗组件',
          component: TDialog,
          meta: { title: '弹窗组件' }
        },
        {
          path: 't-input',
          name: 'input组件',
          component: TInput,
          meta: { title: 'input组件' }
        },
        {
          path: 't-layout',
          name: '布局组件',
          component: TLayout,
          meta: { title: '布局组件' }
        },
        {
          path: 't-search',
          name: '搜索组件',
          component: TSearch,
          meta: { title: '搜索组件' }
        },
        {
          path: 't-select',
          name: '下拉选择组件',
          component: TSelect,
          meta: { title: '下拉选择组件' }
        },
        {
          path: 't-step-wizard',
          name: '步骤组件',
          component: TStepWizard,
          meta: { title: '步骤组件' }
        }
      ]
    },
    {
      path: 't-query-condition',
      name: '查询条件置顶组件',
      component: TQueryCondition,
      meta: { title: '查询条件置顶组件' }
    },
    {
      path: 't-edit-table',
      name: '表格编辑组件',
      component: TEditTable,
      meta: { title: '表格编辑组件' }
    },
    {
      path: 't-table',
      name: 'TTable组件',
      component: TTable,
      meta: { title: 'TTable组件' }
    },
    {
      path: 't-upload-file',
      name: '图片上传组件',
      component: Blank,
      meta: { title: '图片上传组件' },
      children: [
        {
          path: 'upload-demo',
          name: '图片上传demo',
          component: TUploadFile,
          meta: { title: '图片上传demo' }
        }
      ]
    },
    {
      path: 't-tree-table',
      name: 'TreeTable组件',
      component: Blank,
      meta: { title: 'TreeTable组件' },
      children: [
        {
          path: 'tree-table-demo',
          name: 'TreeTableDemo',
          component: TreeTable,
          meta: { title: 'TreeTableDemo' }
        }
      ]
    },
    {
      path: 't-upload-excel',
      name: '上传excel组件',
      component: Blank,
      meta: { title: '上传excel组件' },
      children: [
        {
          path: 't-upload-excel-demo',
          name: '上传excel组件',
          component: TUploadExcel,
          meta: { title: '上传excel组件' }
        }
      ]
    },
    {
      path: 't-form',
      name: '表单组件',
      component: Blank,
      meta: { title: '表单组件' },
      children: [
        {
          path: 't-form-demo',
          name: '表单组件demo',
          component: TForm,
          meta: { title: '表单组件demo' }
        },
        {
          path: 't-simple-form-demo',
          name: '精简版表单',
          component: TSimpleForm,
          meta: { title: '精简版表单' }
        },
        {
          path: 't-module-form-demo',
          name: '模块表单',
          component: TModuleForm,
          meta: { title: '模块表单' }
        },
        {
          path: 't-module-detail-demo',
          name: '模块详情',
          component: TModuleDetail,
          meta: { title: '模块详情' }
        }
      ]
    }
  ]
}

export default baseComponentsRouter
