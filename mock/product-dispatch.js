const Mock = require('mockjs')

const announceData = Mock.mock({
  'items|5': [{
    title: '标题',
    'type|1': [1, 2, 3, 4],
    organization: '部门',
    'time|+1': ['2021-01-27 ', '2021-01-20 ', '2020-12-03 ', '2020-12-01 ', '2020-11-27 '],
    file: '',
    info: '<p>213131</p>'
  }]
})
const zdhldxprwjlData = Mock.mock({
  'items|5': [{
    name: '任务',
    info: '',
    leader: '',
    duty: '',
    'dutyBy|1': [1, 2, 3, 4],
    time: '2021-04-21',
    condition: '',
    complete: '45%',
    record: '',
    postpone: '',
    postponeNum: '',
    time2: '',
    postponeApply: '',
    postponeApprove: '',
    accept: '',
    acceptApprove: ''

  }]
})

module.exports = [
  // 公文公告
  {
    url: '/dispatch-announce/list',
    type: 'get',
    response: config => {
      const items = announceData.items
      return {
        code: 200,
        data: {
          records: items.length,
          rows: items
        }
      }
    }
  },
  // 调度下派任务
  {
    url: '/dispatch-zdhldxprwjl/list',
    type: 'get',
    response: config => {
      const items = zdhldxprwjlData.items
      return {
        code: 200,
        data: {
          records: items.length,
          rows: items
        }
      }
    }
  }
]

