/** 常用组件 路由 **/

import Layout from '@/layout'
/* 定义component */
const TTableHeight = () => import('@/views/demo/Test/TTableHeight')
const TAdaptivePage = () => import('@/views/demo/Test/TAdaptivePage')

const demoRouter = {
  path: '/',
  component: Layout,
  redirect: '/t-table-height',
  name: '测试页面',
  meta: {
    title: '测试页面',
    icon: 'job'
  },
  children: [
    {
      path: 't-table-height',
      name: 'TTable高度自适应',
      component: TTableHeight,
      meta: { title: 'TTable高度自适应' }
    },
    {
      path: 't-adaptive-page',
      name: 'TAdaptivePage组件使用',
      component: TAdaptivePage,
      meta: { title: 'TAdaptivePage组件使用' }
    }
  ]
}

export default demoRouter
