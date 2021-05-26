import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // 是否显示螺旋加载（就是右上角那个加载的圈圈图表）

const whiteList = ['/login'] // 路由白名单

router.beforeEach(async(to, from, next) => {
  console.log(to)
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  const hasToken = getToken()

  // 初始化主题色
  store.dispatch('themeColor/initThemeColor')

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      // 初始化侧边栏
      store.dispatch('sidebar/initSidebarRoutes', to.path)

      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          const { roles } = await store.dispatch('user/getInfo')
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          // 在动态路由最后添加 * 重定向到404路由页面
          accessRoutes.push({
            path: '*',
            redirect: '/404',
            hidden: true
          })
          router.addRoutes(accessRoutes)
          // 存储用户收藏菜单
          await store.dispatch('user/getCollectMenu')

          // 如果参数 to 不能找到对应的路由的话，就再执行一次beforeEach直到能找到对应的路由为止。
          // 使用 replace: true 替换掉当前的 history 记录
          next({ ...to, replace: true })
        } catch (error) {
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 如果没有 token 信息，可通过路由白名单控制跳转
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
