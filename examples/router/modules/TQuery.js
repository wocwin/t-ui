/** TQueryCondition组件 路由 **/

import Layout from '@/layout'
/* 定义component */
const Base = () => import('@/views/demo/TQueryCondition')
const slot = () => import('@/views/demo/TQueryCondition/slot')
const labelRender = () => import('@/views/demo/TQueryCondition/labelRender')
const defaultVal = () => import('@/views/demo/TQueryCondition/defaultVal')
const linkage = () => import('@/views/demo/TQueryCondition/linkage')
const TSelectUse = () => import('@/views/demo/TQueryCondition/TSelectUse')
const TDatePickerUse = () => import('@/views/demo/TQueryCondition/TDatePickerUse')

const TQueryConditionRouter = {
  path: '/t-query-condition',
  component: Layout,
  redirect: '/t-query-condition/base',
  name: '条件查询组件',
  meta: {
    title: '条件查询组件',
    icon: 'swagger'
  },
  children: [
    {
      path: 'base',
      name: '基本使用',
      component: Base,
      meta: { title: '基本使用' }
    },
    {
      path: 'slot',
      name: '插槽使用',
      component: slot,
      meta: { title: '插槽使用' }
    },
    {
      path: 'labelRender',
      name: 'label tsx渲染',
      component: labelRender,
      meta: { title: 'label tsx渲染' }
    },
    {
      path: 'defaultVal',
      name: '默认值显示',
      component: defaultVal,
      meta: { title: '默认值显示' }
    },
    {
      path: 'linkage',
      name: '联动使用',
      component: linkage,
      meta: { title: '联动使用' }
    },
    {
      path: 'TSelectUse',
      name: 'TSelect使用',
      component: TSelectUse,
      meta: { title: 'TSelect使用' }
    },
    {
      path: 'TDatePickerUse',
      name: 'TDatePicker使用',
      component: TDatePickerUse,
      meta: { title: 'TDatePicker使用' }
    }
  ]
}

export default TQueryConditionRouter
