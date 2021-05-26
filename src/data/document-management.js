// 文档管理table数据
const DocTable = {
  columns: [
    { label: '文件名称', field: 'fileName', width: '200', layout: 'Text', placeholder: '请填写文件名称' },
    { label: '备注', field: 'remark', width: '200', layout: 'Textarea', placeholder: '请填写文件描述' }
  ]
}

// 文档管理头部配置
const DocFilterConfig = {
  actions: ['search', 'reset', 'create', 'delete'],
  filters: [
    { label: '搜索', field: 'keyword', width: '220', layout: 'Text', placeholder: '请输入文件名称' }
  ]
}

const TreeTable = {
  columns: [
    { label: '部门名称', field: 'label', width: '200', layout: 'Text', placeholder: '请填写部门名称' }
  ]
}

export {
  DocTable,
  TreeTable,
  DocFilterConfig
}
