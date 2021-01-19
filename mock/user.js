
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    avatar: '/assets/images/avatar.jpg',
    name: 'Admin'
  },
  'editor-token': {
    roles: ['editor'],
    avatar: '/assets/images/avatar.jpg',
    name: 'Editor'
  }
}

module.exports = [
  // 登录
  {
    url: '/example/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 20001,
          message: '用户名或密码错误'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // 获取个人信息
  {
    url: '/example/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      if (!info) {
        return {
          code: 20002,
          message: '获取个人信息失败'
        }
      }

      return {
        code: 20000,
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
        code: 20000,
        data: 'success'
      }
    }
  }
]
