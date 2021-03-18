import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * @param {boolean} hidden        true表示隐藏路由，不显示在headbar菜单中
 * @param {boolean} affix         meta参数，true表示永久固定在路由导航tagView中不可删除
 * @param {array}   roles         meta参数，['admin', 'editor']表示该路由仅对admin和editor开放，现权限按角色分配，后可根据项目需求修改
 * @param {boolean} hiddenChild   meta参数，true表示隐藏该路由下所有子路由，仅一级路由显示在headbar菜单中
 */

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    hidden: true,
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', affix: true }
      },
      {
        path: '/ureport',
        name: 'Ureport',
        component: () => import('@/views/ureport/designer/index'),
        meta: { title: 'ureport', affix: true }
      }
    ]
  },

  // 重定向路由
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
