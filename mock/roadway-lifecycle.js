const Mock = require('mockjs')

const data = Mock.mock({
  'items|5': [{
    'name|+1': ['北二13-1盘区中部变电所', '南一16-2盘区中部变电所', '东二6-1盘区中部变电所', '东二6-6盘区中部变电所', '西三12-1盘区中部变电所'],
    'date|+1': ['2020.08.01', '2020.07.11', '2020.06.14', '2020.06.23', '2020.04.22'],
    eventName: '过薄煤层',
    describe: '过薄煤层',
    files: '无附件',
    push: 1.6,
    pTotal: 125,
    lifecycle: [
      {
        dateTime: '2020-8-1',
        event: '过薄煤层',
        describe: '过薄煤层',
        complete: true
      }
    ]
  }]
})

module.exports = [
  // table 数据
  {
    url: '/roadway-lifecycle/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]

