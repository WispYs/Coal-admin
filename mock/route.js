const asyncRoutes = [
  {
    path: '/permission',
    component: 'Layout',
    redirect: '/permission/adminPage',
    alwaysShow: true, // 一直显示根路由
    name: 'Permission',
    meta: {
      title: '权限',
      icon: 'lock',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'adminPage',
        name: 'AdminPage',
        component: '/permission/admin-page/index',
        meta: { title: '管理员权限', roles: ['admin'] }
      },
      {
        path: 'editorPage',
        name: 'EditorPage',
        component: '/permission/editor-page/index',
        meta: { title: '操作员权限', roles: ['editor'] }
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
