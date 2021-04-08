const Mock = require('mockjs')

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
  }
]

