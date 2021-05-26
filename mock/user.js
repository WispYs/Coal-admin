
const users = {
  roles: ['admin'],
  avatar: '/assets/images/avatar.jpg',
  name: 'Admin'
}
const collectMenu = [
  {
    cfgNavigationId: '1',
    createTime: '2021-05-17 14:29:23',
    createdBy: 'admin',
    menuId: '1302',
    menuResource: '{"title":"大型设备管理"}',
    updateTime: '2021-05-17 14:29:23',
    updatedBy: 'admin',
    userId: '1'
  }
]
module.exports = [
  // 登录
  {
    url: '/example/user/login',
    type: 'post',
    response: config => {
      const token = 'admin'

      return {
        code: 200,
        data: token
      }
    }
  },

  // 获取个人信息
  {
    url: '/example/user/info\.*',
    type: 'get',
    response: config => {
      const info = users

      return {
        code: 200,
        data: info
      }
    }
  },

  // 退出登录
  {
    url: '/example/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },
  // 获取用户快捷导航
  {
    url: '/example/user/collect-menu',
    type: 'get',
    response: config => {
      const info = collectMenu

      return {
        code: 200,
        data: info
      }
    }
  }
]
