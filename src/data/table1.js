export var TableConfig = {
  /**
   * @param actions         {Array}   操作按钮
   * @param summary         {Boolean} 是否需要合计数据
   * @param summaryField    {Array}   合计字段
   * @param columns         {Array}   每列参数
   * @param sortable        {Boolean} 是否需要排序
   * @param layout          {String}  表单类型
   * @param filter          {Boolean} 字段值是否需要方法处理
   * @param options         {Array}   选择器配置项
   */
  actions: [],
  summary: true,
  summaryField: ['money'],
  columns: [
    { label: '标题', field: 'title', width: '', align: 'left', layout: 'Text', placeholder: '请填写标题' },
    { label: '负责人', field: 'person', width: '110', layout: 'Text', placeholder: '请填写负责人' },
    { label: '项目时间', field: 'time', width: '350', sortable: true, layout: 'DateTime', placeholder: '请选择项目时间' },
    { label: '完成率', field: 'completed', width: '110', layout: 'Progress', placeholder: '请填写项目完成率' },
    { label: '金额（元）', field: 'money', width: '150', layout: 'Text', placeholder: '请填写项目金额' },
    { label: '状态', field: 'status', width: '110', filter: true, layout: 'Select',
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
  /**
   * @param actions         {Array}   操作按钮
   * @param filters         {Array}   筛选项
   * @param options         {Array}   选择器配置项
   */
  actions: ['search', 'reset'],
  filters: [
    { label: '关键字', field: 'keywords', width: '150', layout: 'Text', placeholder: '请输入关键字' },
    { label: '项目时间', field: 'time', width: '150', layout: 'DateTime', placeholder: '请选择开始时间' },
    { label: '项目状态', field: 'status', width: '150', layout: 'Select',
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
