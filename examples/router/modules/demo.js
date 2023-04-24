/** 常用组件 路由 **/

import Layout from '@/layout'
/* 定义component */
const TTableHeight = () => import('@/views/demo/Test/TTableHeight')
const TTableMix = () => import('@/views/demo/Test/TTableMix')

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
      path: 'mix-table',
      name: 'MixTable',
      component: TTableMix,
      meta: { title: 'MixTable' }
    }
  ]
}

export default demoRouter
