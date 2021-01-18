export var TableConfig = {
  button: true,
  summary: true,
  summaryField: ['money'],
  columns: [
    { label: '标题', field: 'title', width: '', align: 'left', layout: 'Text', placeholder: '请填写标题' },
    { label: '负责人', field: 'person', width: '110', layout: 'Text', placeholder: '请填写负责人' },
    { label: '项目时间', field: 'time', width: '350', sortable: true, layout: 'DataTime', placeholder: '请选择项目时间' },
    { label: '完成率', field: 'completed', width: '110', layout: 'Progress', placeholder: '请填写项目完成率' },
    { label: '金额（元）', field: 'money', width: '150', layout: 'Text', placeholder: '请填写项目金额' },
    { label: '状态', field: 'status', width: '110', filter: 'statusFilter', layout: 'Select',
      options: [
        {
          value: 1,
          label: '已完成'
        }, {
          value: 2,
          label: '进行中'
        }, {
          value: 3,
          label: '未开始'
        }, {
          value: 4,
          label: '已搁置'
        }
      ], placeholder: '请选择项目状态' }
  ]
}

export var FilterConfig = {

}
