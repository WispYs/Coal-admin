const Mock = require('mockjs')

/** ---- 机电管理 ---- **/
// 大型设备列表
const largeEquipmentData = Mock.mock({
  'items|3': [{
    'eid|+1': ['GQ100001', 'GQ100002', 'GQ100003'],
    'name|+1': ['落地式多绳摩擦提升机', '落地式多绳摩擦提升机', '落地式多绳摩擦提升机'],
    'area|+1': [1, 2, 3],
    'part|+1': [1, 2, 3],
    'model|1': ['JKLD5*4'],
    factory: '中信重工',
    'uid|+1': ['001021221', '001021223', '001021226'],
    createData: '',
    deliveryData: '',
    useDate: '2021-01-31',
    originalValue: 120,
    netValue: 120,
    runtime: 60,
    file: '无附件',
    QRcode: '二维码'

  }]
})
// 所属场所
const equipmentAreaData = [
  {
    children: [{ label: '提升机', value: '2' }],
    label: '中央区主井提升机房',
    value: '1'
  }, {
    children: [{ label: '提升机', value: '4' }],
    label: '中央区副井提升机房',
    value: '3'
  }, {
    children: [{ label: '空气压缩机', value: '6' }],
    label: '中央区压风机房',
    value: '5'
  }, {
    children: [{ label: '减压装置', value: '8' }, { label: '组合开关', value: '9' }, { label: '电动机', value: '10' }],
    label: '中央区井下水泵房',
    value: '7'
  }
]
// 大型设备类型
const largeEquipmentTypeData = Mock.mock({
  'items|3': [{
    'id|+1': [1, 2, 3],
    'name|+1': ['中央区主井提升机房', '中央区副井提升机房', '中央区压风机房'],
    'sort|+1': [1, 2, 3],
    createData: '2021-01-31',
    'area|+1': [1, 2, 3],
    remark: '',
    children: [
      {
        id: 4,
        name: '提升机',
        sort: 10,
        createDate: '',
        area: 1,
        remark: ''
      }
    ]
  }]
})
// 维修知识库
const knowLedgeData = Mock.mock({
  'items|3': [{
    area: 1,
    'project|+1': ['检查风道', '防爆门', '轴承'],
    'addr|+1': ['风道', '反风设施', '电机'],
    'period|+1': ['月', '季度', '周'],
    person: '',
    standard: '',
    remark: ''
  }]
})
// 设备能耗分析知识库
const disKnowLedgeData = Mock.mock({
  'items|3': [{
    area: 1,
    standard: 'GB/T 2941231',
    'alarm|+1': [0.5, 0.13, 0.85],
    'unit|+1': ['Kwh/T.ah'],
    'explain|+1': ['每吨水百米扬程消耗的电能', '兆帕每小时风流量', '副井提升机'],
    formula: '',
    decision: '',
    evaluate: ''
  }]
})

module.exports = [
  // 大型设备列表
  {
    url: '/large-equipment-manage/list',
    type: 'get',
    response: config => {
      const items = largeEquipmentData.items
      return {
        code: 200,
        data: {
          records: items.length,
          rows: items
        }
      }
    }
  },
  // 设备所属场所
  {
    url: '/equipment-area/list',
    type: 'get',
    response: config => {
      const items = equipmentAreaData
      return {
        code: 200,
        data: items
      }
    }
  },
  // 大型设备类型列表
  {
    url: '/large-equipment-type/list',
    type: 'get',
    response: config => {
      const items = largeEquipmentTypeData.items
      return {
        code: 200,
        data: {
          records: items.length,
          rows: items
        }
      }
    }
  },
  // 维修知识库
  {
    url: '/know-ledge/list',
    type: 'get',
    response: config => {
      const items = knowLedgeData.items
      return {
        code: 200,
        data: {
          records: items.length,
          rows: items
        }
      }
    }
  },
  // 设备能耗分析知识库
  {
    url: '/dissipation-know-ledge/list',
    type: 'get',
    response: config => {
      const items = disKnowLedgeData.items
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

