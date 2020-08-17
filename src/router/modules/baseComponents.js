/** 基础组件 路由 **/

import Layout from '@/layout'
// import Blank from '@/components/Blank'
/* 定义component */
// 日期组件
const TDatePicker = () => import('@/views/components/TDatePicker')
// 弹窗组件
const TDialog = () => import('@/views/components/TDialog')
// 表单组件
const TForm = () => import('@/views/components/TForm')
// input组件
const TInput = () => import('@/views/components/TInput')
// 布局组件
const TLayout = () => import('@/views/components/TLayout')
// 查询条件置顶组件
const TQueryCondition = () => import('@/views/components/TQueryCondition')
// 搜索组件
const TSearch = () => import('@/views/components/TSearch')
// 步骤组件
const TStepWizard = () => import('@/views/components/TStepWizard')

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
      path: 't-form',
      name: '表单组件',
      component: TForm,
      meta: { title: '表单组件' }
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
      path: 't-query-condition',
      name: '查询条件置顶组件',
      component: TQueryCondition,
      meta: { title: '查询条件置顶组件' }
    },
    {
      path: 't-search',
      name: '搜索组件',
      component: TSearch,
      meta: { title: '搜索组件' }
    },
    {
      path: 't-step-wizard',
      name: '步骤组件',
      component: TStepWizard,
      meta: { title: '步骤组件' }
    }
  ]
}

export default baseComponentsRouter
