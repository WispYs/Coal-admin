const DocTable = {
  columns: [
    { label: '文件名称', field: 'fileName', width: '200', layout: 'Text', placeholder: '请填写文件名称' },
    { label: '备注', field: 'remark', width: '200', layout: 'Textarea', placeholder: '请填写文件描述' }
  ]
}

const TreeTable = {
  columns: [
    { label: '部门名称', field: 'label', width: '200', layout: 'Text', placeholder: '请填写部门名称' }
  ]
}

export {
  DocTable,
  TreeTable
}
