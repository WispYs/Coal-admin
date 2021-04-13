export const flowTableConfig = {
  actions: ['edit', 'delete'],
  checkbox: true,
  columns: [
    {
      label: '流程名称', field: 'definitionId', layout: 'Select', width: 'auto', placeholder: '请选择流程名称',
      options: [
        { value: 1, label: '影响单位审核' },
        { value: 2, label: '科技创新' }
      ]
    },
    {
      label: '业务表', field: 'tableName', layout: 'Select', width: 'auto', placeholder: '请选择业务表',
      options: [
        { value: 1, label: '影响单位审核' },
        { value: 2, label: '科技创新' }
      ]
    }
  ]
}

export const FlowFilterConfig = {
  /**
   * @param {array} actions   操作按钮
   * @param {array} filters   筛选项
   * @param {array} options   选择器配置项
   */
  actions: ['search', 'reset', 'create', 'delete'],
  filters: []
}
