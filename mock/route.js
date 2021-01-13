const asyncRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: '/dashboard/index',
    meta: { title: '首页', affix: true }
  },
  {
    path: '/manager',
    component: 'Layout',
    redirect: '/manager/manager1/manager1-1',
    name: 'Manager',
    meta: { title: '地测防治水' },
    children: [
      {
        path: '/manager/manager1',
        name: 'Manager1',
        component: '/manager/manager1/index',
        meta: { title: '地质管理' },
        children: [
          {
            path: '/manager/manager1/manager1-1',
            name: 'Manager1-1',
            component: '/manager/manager1/manager1-1/index',
            meta: { title: '区域数据' }
          },
          {
            path: '/manager/manager1/manager1-2',
            name: 'Manager1-2',
            component: '/manager/manager1/manager1-2/index',
            redirect: '/manager/manager1/manager1-2/manager1-2-1',
            meta: { title: '行业标准管理' },
            children: [
              {
                path: '/manager/manager1/manager1-2/manager1-2-1',
                name: 'Manager1-2-1',
                component: '/manager/manager1/manager1-2/manager1-2-1/index',
                meta: { title: '国家地质文件标准规范' }
              },
              {
                path: '/manager/manager1/manager1-2/manager1-2-2',
                name: 'Manager1-2-2',
                component: '/manager/manager1/manager1-2/manager1-2-2/index',
                meta: { title: '公司地质文件标准规范' }
              },
              {
                path: '/manager/manager1/manager1-2/manager1-2-3',
                name: 'Manager1-2-3',
                component: '/manager/manager1/manager1-2/manager1-2-3/index',
                meta: { title: '矿井地质文件标准规范' }
              }
            ]
          },
          {
            path: '/manager/manager1/manager1-3',
            name: 'Manager1-3',
            component: '/manager/manager1/manager1-3/index',
            meta: { title: '地质技术资料' }
          },
          {
            path: '/manager/manager1/manager1-4',
            name: 'Manager1-4',
            component: '/manager/manager1/manager1-3/index',
            meta: { title: '地质图件' }
          }
        ]
      },
      {
        path: '/manager/manager2',
        name: 'Manager2',
        component: '/manager/manager2/index',
        meta: { title: '测量管理' },
        children: [
          {
            path: '/manager/manager2/manager2-1',
            name: 'Manager2-1',
            component: '/manager/manager2/manager2-1/index',
            meta: { title: '测量图件' }
          }
        ]
      },
      {
        path: '/manager/manager3',
        name: 'Manager3',
        component: '/manager/manager3/index',
        meta: { title: '水文管理' },
        children: [
          {
            path: '/manager/manager3/manager3-1',
            name: 'Manager3-1',
            component: '/manager/manager3/manager3-1/index',
            meta: { title: '水文台账' }
          }
        ]
      }
    ]
  },
  {
    path: '/permission',
    component: 'Layout',
    redirect: '/permission/adminPage',
    name: 'Permission',
    meta: { title: '权限', roles: ['admin', 'editor'] },
    children: [
      {
        path: '/permission/adminPage',
        name: 'AdminPage',
        component: '/permission/admin-page/index',
        meta: { title: '管理员', roles: ['admin'] }
      },
      {
        path: '/permission/editorPage',
        name: 'EditorPage',
        component: '/permission/editor-page/index',
        meta: { title: '操作员', roles: ['admin', 'editor'] }
      }
    ]
  },
  {
    path: '/example',
    component: 'Layout',
    redirect: '/example/examp1/examp1-1',
    name: 'Example',
    meta: { title: '一级路由', roles: ['admin', 'editor'] },
    children: [
      {
        path: '/example/examp1',
        name: 'Examp1',
        component: '/example/examp1/index',
        redirect: '/example/examp1/examp1-1',
        meta: { title: '二级路由1', roles: ['admin', 'editor'] },
        children: [
          {
            path: '/example/examp1/examp1-1',
            name: 'Examp1-1',
            component: '/example/examp1/examp1-1/index',
            meta: { title: '三级路由1-1', roles: ['admin', 'editor'] }
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
