// demo页面

import Layout from '@/layout'
import Blank from '@/components/Blank'
const nestedRouter = {
  path: '/nested',
  component: Layout,
  redirect: '/nested/menu1/menu1-1',
  name: 'Demo',
  meta: {
    title: 'demo多级菜单'
  },
  children: [
    {
      path: 'menu1',
      component: Blank,
      name: 'Menu1',
      meta: { title: 'menu1' },
      redirect: '/nested/menu1/menu1-1',
      children: [
        {
          path: 'menu1-1',
          component: () => import('@/views/nested/menu1/menu1-1'),
          name: '小组件运用',
          meta: { title: '小组件运用' }
        },
        {
          path: 'menu1-2',
          component: Blank,
          name: '贷后管理',
          redirect: '/nested/menu1/menu1-2/warnNotice',
          meta: { title: '贷后管理' },
          children: [
            {
              path: 'warnNotice',
              component: () => import('@/views/nested/menu1/menu1-2/warnNotice'),
              name: '预警通知',
              meta: { title: '预警通知' }
            },
            {
              path: 'warnNotice/warnNoticeDetail',
              component: () => import('@/views/nested/menu1/menu1-2/warnNotice/warnNoticeDetail.vue'),
              name: '预警通知/详情'
            },
            {
              path: 'menu1-2-2',
              component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
              name: 'Menu1-2-2',
              meta: { title: 'menu1-2-2' }
            }
          ]
        },
        {
          path: 'menu1-3',
          component: () => import('@/views/nested/menu1/menu1-3'),
          name: '嵌套',
          meta: { title: '嵌套' }
        },
        {
          path: 'menu4',
          component: () => import('@/views/nested/menu1/menu4'),
          name: '步骤组件',
          meta: { title: '步骤组件' }
        }
      ]
    },
    {
      path: 'menu2',
      name: 'Demo页面',
      component: () => import('@/views/nested/menu2/index'),
      meta: { title: 'Demo页面' }
    }
  ]
}

export default nestedRouter
