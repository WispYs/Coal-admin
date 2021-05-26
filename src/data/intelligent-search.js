// 智能检索

// 智能检索table数据
const IntelligentSearchTableConfig = {
  actions: ['preview'],
  columns: [
    { label: '类别', field: 'type', layout: 'Select', options: [
      {
        label: '全部',
        value: 1
      },
      {
        label: '文件',
        value: 2
      },
      {
        label: '菜单',
        value: 3
      }
    ], placeholder: '请填写文件名称' },
    { label: '名称', field: 'fileName', layout: 'Textarea', placeholder: '请填写文件描述' },
    { label: '位置', field: 'menuPath', layout: 'Textarea', placeholder: '请填写文件描述' },
    { label: '修改时间', field: 'updateTime', layout: 'Textarea', placeholder: '请填写文件描述' },
    { label: '文件大小', field: 'showSize', layout: 'Textarea', placeholder: '请填写文件描述' }
  ]
}

const IntelligentSearchMenuTableConfig = {
  actions: ['preview'],
  columns: [
    { label: '类别', field: 'type', layout: 'Select', options: [
      {
        label: '全部',
        value: 1
      },
      {
        label: '文件',
        value: 2
      },
      {
        label: '菜单',
        value: 3
      }
    ], placeholder: '请填写文件名称' },
    { label: '名称', field: 'menuName', layout: 'Textarea', placeholder: '请填写文件描述' },
    { label: '位置', field: 'path', layout: 'Textarea', placeholder: '请填写文件描述' },
    { label: '修改时间', field: 'updateTime', layout: 'Textarea', placeholder: '请填写文件描述' }
  ]
}

// 智能检索头部配置
const IntelligentSearchFilterConfig = {
  actions: ['search', 'reset', 'create', 'delete'],
  filters: [
    { label: '搜索', field: 'keyword', width: '220', layout: 'Text', placeholder: '请输入文件名称' }
  ]
}

export {
  IntelligentSearchTableConfig,
  IntelligentSearchFilterConfig,
  IntelligentSearchMenuTableConfig
}
