/** 常用组件 路由 **/

import Layout from '@/layout'
import Blank from '@/components/Blank'
/* 定义component */
const TInput = () => import('@/views/demo/TInput')
const TButton = () => import('@/views/demo/TButton')
const TTimerBtn = () => import('@/views/demo/TTimerBtn')
const TDatePicker = () => import('@/views/demo/TDatePicker')
const TDialog = () => import('@/views/demo/TDialog')
const TDetail = () => import('@/views/demo/TDetail')
const TSelect = () => import('@/views/demo/TSelect')
const TSelectTable = () => import('@/views/demo/TSelectTable')
const TStepWizard = () => import('@/views/demo/TStepWizard')
const IsShowFirstColumn = () => import('@/views/demo/TSelectTable/isShowFirstColumn.vue')
const Multiple = () => import('@/views/demo/TSelectTable/multiple.vue')
const MultiplePagination = () => import('@/views/demo/TSelectTable/showPagination.vue')
const RadioPagination = () => import('@/views/demo/TSelectTable/radioPagination.vue')

const commonRouter = {
  path: '/common',
  component: Layout,
  redirect: '/common/t-input',
  name: '常用组件',
  meta: {
    title: '常用组件',
    icon: 'job'
  },
  children: [
    {
      path: 't-input',
      name: 'Input 组件',
      component: TInput,
      meta: { title: 'Input 组件' }
    },
    {
      path: 't-button',
      name: 'button组件',
      component: TButton,
      meta: { title: 'button组件' }
    },
    {
      path: 't-timer-btn',
      name: '倒计时组件',
      component: TTimerBtn,
      meta: { title: '倒计时组件' }
    },
    {
      path: 't-date-picker',
      name: '日期组件',
      component: TDatePicker,
      meta: { title: '日期组件' }
    },
    {
      path: 't-step-wizard',
      name: '步骤组件',
      component: TStepWizard,
      meta: { title: '步骤组件' }
    },
    {
      path: 't-dialog',
      name: '弹窗组件',
      component: TDialog,
      meta: { title: '弹窗组件' }
    },
    {
      path: 't-detail',
      name: '详情组件',
      component: TDetail,
      meta: { title: '详情组件' }
    },
    {
      path: 't-select',
      name: 'Select下拉组件',
      component: TSelect,
      meta: { title: 'Select下拉组件' }
    },
    {
      path: 't-select-table',
      name: 'Select下拉表格组件',
      component: Blank,
      meta: { title: 'Select下拉表格组件' },
      children: [
        {
          path: 'index',
          name: '单选',
          component: TSelectTable,
          meta: { title: '单选' }
        },
        {
          path: 'is-show-col',
          name: '不显示首列',
          component: IsShowFirstColumn,
          meta: { title: '不显示首列' }
        },
        {
          path: 'multiple',
          name: '多选',
          component: Multiple,
          meta: { title: '多选' }
        },
        {
          path: 'radio-pagination',
          name: '单选分页',
          component: RadioPagination,
          meta: { title: '单选分页' }
        },
        {
          path: 'multiple-pagination',
          name: '多选分页',
          component: MultiplePagination,
          meta: { title: '多选分页' }
        }
      ]
    }
  ]
}

export default commonRouter
