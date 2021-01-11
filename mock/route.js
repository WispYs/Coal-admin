const asyncRoutes = [
  {
    path: '/permission',
    component: 'Layout',
    redirect: '/permission/adminPage',
    alwaysShow: true, // 一直显示根路由
    name: 'Permission',
    meta: { title: '权限', icon: 'lock', roles: ['admin', 'editor'] },
    children: [
      {
        path: '/permission/adminPage',
        name: 'AdminPage',
        component: '/permission/admin-page/index',
        meta: { title: '管理员', icon: 'editor', roles: ['admin'] }
      },
      {
        path: '/permission/editorPage',
        name: 'EditorPage',
        component: '/permission/editor-page/index',
        meta: { title: '操作员', icon: 'editor', roles: ['admin', 'editor'] }
      }
    ]
  },
  {
    path: '/example',
    component: 'Layout',
    redirect: '/example/examp1/examp1-1',
    alwaysShow: true, // 一直显示根路由
    name: 'Example',
    meta: { title: '一级路由', roles: ['admin', 'editor'] },
    children: [
      {
        path: '/example/examp1',
        name: 'Examp1',
        component: '/example/examp1/index',
        redirect: '/example/examp1/examp1-1',
        meta: { title: '二级路由1', roles: ['admin'] },
        children: [
          {
            path: '/example/examp1/examp1-1',
            name: 'Examp1-1',
            component: '/example/examp1/examp1-1/index',
            meta: { title: '三级路由1-1', roles: ['admin'] }
          },
          {
            path: '/example/examp1/examp1-2',
            name: 'Examp1-2',
            component: '/example/examp1/examp1-2/index',
            redirect: '/example/examp1/examp1-2/examp1-2-1',
            meta: { title: '三级路由1-2', roles: ['admin'] },
            children: [
              {
                path: '/example/examp1/examp1-2/examp1-2-1',
                name: 'Examp1-2-1',
                component: '/example/examp1/examp1-2/examp1-2-1/index',
                meta: { title: '四级路由1-2-1', roles: ['admin'] }
              },
              {
                path: '/example/examp1/examp1-2/examp1-1-2',
                name: 'Examp1-1-2',
                component: '/example/examp1/examp1-2/examp1-2-2/index',
                meta: { title: '四级路由1-2-2', roles: ['admin'] }
              }
            ]
          }
        ]
      },
      {
        path: '/example/examp2',
        name: 'Examp2',
        component: '/example/examp2/index',
        redirect: '/example/examp2/examp2-1',
        meta: { title: '二级路由2', roles: ['admin'] },
        children: [
          {
            path: '/example/examp2/examp2-1',
            name: 'Examp2-1',
            component: '/example/examp2/examp2-1/index',
            meta: { title: '三级路由2-1', roles: ['admin'] }
          }
        ]
      },
      {
        path: '/example/examp3',
        name: 'Examp3',
        component: '/example/examp3/index',
        redirect: '/example/examp3/examp3-1',
        meta: { title: '二级路由3', roles: ['admin'] },
        children: [
          {
            path: '/example/examp3/examp3-1',
            name: 'Examp3-1',
            component: '/example/examp3/examp3-1/index',
            meta: { title: '三级路由3-1', roles: ['admin'] }
          },
          {
            path: '/example/examp3/examp3-2',
            name: 'Examp3-2',
            component: '/example/examp3/examp3-2/index',
            meta: { title: '三级路由3-2', roles: ['admin'] }
          }
        ]
      }
    ]
  },
  {
    path: '/404',
    component: '/404',
    hidden: true
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

module.exports = [
  {
    url: '/example/route',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: asyncRoutes
      }
    }
  }
]
