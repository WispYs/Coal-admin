// 日常管理表格配置
const DailyManagementTableConfig = {
  actions: ['edit', 'delete'],
  checkbox: true,
  columns: [
    { label: '类别', field: 'type', width: '200', layout: 'Select', placeholder: '请填写类别', require: true, options: [] },
    { label: '文件名称', field: 'fileName', width: '200', layout: 'Text', placeholder: '请填写文件名称' },
    { label: '排序', field: 'orderNumber', width: '200', layout: 'Text', placeholder: '请填写排序' },
    { label: '描述', field: 'attachmentDescribe', width: '200', layout: 'Text', placeholder: '请填写描述' },
    { label: '附件', field: 'eventId', width: '200', layout: 'Upload', showType: 'underline', placeholder: '请填写附件', hidden: true }
  ]
}

// 日常管理头部配置
const DailyManagementFilterConfig = {
  actions: ['search', 'reset', 'create', 'delete', 'refresh'],
  filters: [
    { label: '搜索', field: 'keyword', width: '220', layout: 'Text', placeholder: '附件名称' }
  ]
}

export {
  DailyManagementTableConfig,
  DailyManagementFilterConfig
}
