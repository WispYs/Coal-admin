const Mock = require('mockjs')

const applicationData = Mock.mock({
  items: [{
    name: '顾桥煤矿',
    url: 'http://127.0.0.1:8080',
    department: 1,
    sort: 1,
    remark: ''
  }, {
    name: '办公室',
    url: 'http://127.0.0.1:8080',
    department: 6,
    sort: 1,
    remark: ''
  }]
})

const userData = Mock.mock({
  'items|5': [{
    loginName: '@last',
    userName: '@cname',
    'jobNum|+1': ['80020684', '80020465', '80020465', '80012412', '80024555'],
    'mobile|1': ['13132465121', '18612451130', '18241032215', '13994410032', '13566421102'],
    department: '@integer(1, 17)',
    password: '',
    'position|1': ['技术员', '班长', '科长', '副科长', '副班长'],
    enterTime: '2021-03-12',
    email: 'jsd0321.163.com',
    'gender|1': [1, 2],
    phone: '无',
    'workType|+1': ['G203工程师', 'Z0324副科长', 'G031科长', 'T0321班长', 'Z0630副班长'],
    'role|1': ['影响单位审核', '科技创新'],
    'status|+1': [1, 2],
    card: 'K20331332466',
    remark: ''
  }]
})

const organData = Mock.mock({
  'items|2': [{
    'name|+1': ['顾桥煤矿', '部门'],
    'num|+1': ['001', '001012001'],
    'abbreviation|+1': ['顾桥煤矿', '部门'],
    'type|+1': [1, 2],
    'sort|+1': [1, 18142],
    'createDate|+1': ['2020.07.21', '2020.12.19'],
    remark: '',
    'hasChildren|+1': [true, false]
  }]
})

const roleData = Mock.mock({
  'items|5': [{
    'name|+1': ['通用菜单', '安全专业管理', '系统浏览用户', '矿井管理员', '一张图用户'],
    'type|+1': [1, 2, 1, 1, 1],
    site: '顾桥站点',
    personNum: '@integer(1, 100)',
    'sort|+1': [2, 3, 4, 5, 6],
    'remark|+1': ['包含矿井全部菜单访问权限，默认用户取得。', '', '浏览全部功能菜单', '', '']
  }]
})

const menuData = Mock.mock({
  'items|5': [{
    'name|+1': ['门户页面子系统权限', '全息一张图', '申请人申请', '申请单位审批', '分管领导审批'],
    'id|+1': ['024', '019', '033004002', '033004004', '033004005'],
    'type|+1': [1, 2, 1, 1, 1],
    'clientType|+1': [1, 1, 1, 1, 1],
    'display|+1': [2, 1, 1, 1, 1],
    status: true,
    url: '',
    'openType|+1': ['', '内部嵌入', '', '', ''],
    'data|+1': ['', '自定义', '', '', ''],
    'dataRange|+1': ['', '', '', '', ''],
    'dataResource|+1': ['', '自定义', '', '', ''],
    'sort|+1': [2, 3, 4, 5, 6],
    'remark|+1': ['包含矿井全部菜单访问权限，默认用户取得。', '', '浏览全部功能菜单', '', '']
  }]
})

module.exports = [
  // table 数据
  {
    url: '/system/application/list',
    type: 'get',
    response: config => {
      const items = applicationData.items
      return {
        code: 200,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },

  {
    url: '/system/user/list',
    type: 'get',
    response: config => {
      const items = userData.items
      return {
        code: 200,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },

  {
    url: '/system/organization/list',
    type: 'get',
    response: config => {
      const items = organData.items
      return {
        code: 200,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },

  {
    url: '/system/role/list',
    type: 'get',
    response: config => {
      const items = roleData.items
      return {
        code: 200,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },

  {
    url: '/system/menu/list',
    type: 'get',
    response: config => {
      const items = menuData.items
      return {
        code: 200,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]

