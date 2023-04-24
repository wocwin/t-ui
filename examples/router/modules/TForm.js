/** TForm组件 路由 **/

import Layout from '@/layout'
/* 定义component */
const Base = () => import('@/views/demo/TForm')
const labelPosition = () => import('@/views/demo/TForm/labelPosition')
const widthSize = () => import('@/views/demo/TForm/widthSize')
const rules = () => import('@/views/demo/TForm/rules')
const eventHandle = () => import('@/views/demo/TForm/eventHandle')
const labelRender = () => import('@/views/demo/TForm/labelRender')
const slotName = () => import('@/views/demo/TForm/slotName')
const textShow = () => import('@/views/demo/TForm/textShow')
const comUse = () => import('@/views/demo/TForm/comUse')
const assignment = () => import('@/views/demo/TForm/assignment')
const submit = () => import('@/views/demo/TForm/submit')

const TFormRouter = {
  path: '/t-form',
  component: Layout,
  redirect: '/t-form/base',
  name: 'TForm组件',
  meta: {
    title: 'TForm组件',
    icon: 'row'
  },
  children: [
    {
      path: 'base',
      name: '基本使用',
      component: Base,
      meta: { title: '基本使用' }
    },
    {
      path: 'labelPosition',
      name: '对齐方式',
      component: labelPosition,
      meta: { title: '对齐方式' }
    },
    {
      path: 'widthSize',
      name: '每行展示多少项',
      component: widthSize,
      meta: { title: '每行展示多少项' }
    },
    {
      path: 'rules',
      name: '校验规则',
      component: rules,
      meta: { title: '校验规则' }
    },
    {
      path: 'eventHandle',
      name: '事件使用',
      component: eventHandle,
      meta: { title: '事件使用' }
    },
    {
      path: 'labelRender',
      name: 'label jsx渲染',
      component: labelRender,
      meta: { title: 'label jsx渲染' }
    },
    {
      path: 'slotName',
      name: '插槽使用',
      component: slotName,
      meta: { title: '插槽使用' }
    },
    {
      path: 'textShow',
      name: '文本展示',
      component: textShow,
      meta: { title: '文本展示' }
    },
    {
      path: 'comUse',
      name: '自己封装组件使用',
      component: comUse,
      meta: { title: '自己封装组件使用' }
    },
    {
      path: 'assignment',
      name: '回显数据',
      component: assignment,
      meta: { title: '回显数据' }
    },
    {
      path: 'submit',
      name: '动态显示隐藏项',
      component: submit,
      meta: { title: '动态显示隐藏项' }
    }
  ]
}

export default TFormRouter
