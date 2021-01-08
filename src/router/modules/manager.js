import Layout from '@/layout'

const managerRouter = {
  path: '/manager',
  component: Layout,
  redirect: '/manager/product',
  name: 'Manager',
  meta: { title: '项目管理', icon: 'el-icon-s-help' },
  children: [
    {
      path: 'product',
      name: 'Product',
      component: () => import('@/views/manager/product/index'),
      meta: { title: '项目生产', icon: 'table' }
    },
    {
      path: 'operation',
      name: 'Operation',
      component: () => import('@/views/manager/operation/index'),
      meta: { title: '运维管理', icon: 'tree' }
    }
  ]
}

export default managerRouter
