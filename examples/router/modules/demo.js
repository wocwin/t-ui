/** 常用组件 路由 **/

import Layout from '@/layout'
/* 定义component */
const TTableHeight = () => import('@/views/demo/Test/TTableHeight')
const TAdaptivePage = () => import('@/views/demo/Test/TAdaptivePage')
const Lefttree = () => import('@/views/demo/Test/TAdaptivePage/lefttree.vue')

const demoRouter = {
  path: '/',
  component: Layout,
  redirect: '/t-adaptive-page',
  name: '测试页面',
  meta: {
    title: '测试页面',
    icon: 'job'
  },
  children: [
    {
      path: 't-adaptive-page',
      name: 'TAdaptivePage组件使用',
      component: TAdaptivePage,
      meta: { title: 'TAdaptivePage组件使用' }
    },
    {
      path: 'lefttree',
      name: '分栏布局',
      component: Lefttree,
      meta: { title: '分栏布局' }
    },
    {
      path: 't-table-height',
      name: 'TTable高度自适应',
      component: TTableHeight,
      meta: { title: 'TTable高度自适应' }
    }
  ]
}

export default demoRouter
