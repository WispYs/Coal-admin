export var TableConfig = {
  /**
   * @param actions         {Array}   操作按钮，例如：['preview', 'edit', 'delete']
   * @param summary         {Boolean} 是否需要合计数据
   * @param summaryField    {Array}   合计字段
   * @param columns         {Array}   每列参数
   * @param sortable        {Boolean} 是否需要排序
   * @param align           {String}  单元表格对齐方向，默认为'center'
   * @param unit            {String}  字段单位，例如：元、kw/h
   * @param layout          {String}  表单类型
   * @param dateFormat      {String}  日期格式
   * @param filter          {Boolean} 字段值是否需要方法处理
   * @param filterName      {String}  过滤函数方法的名称,由前端定义
   * @param options         {Array}   选择器配置项
   */
  actions: [],
  summary: false,
  summaryField: [],
  columns: [
    { label: '设备名称', field: 'name', width: '150', layout: 'Text', placeholder: '请填写设备名称' },
    { label: '地区', field: 'region', width: '150', layout: 'Text', placeholder: '请填写设备所在地区' },
    { label: '维护时间', field: 'date', width: '150', sortable: true, layout: 'DataTime', placeholder: '请选择维护时间' },
    { label: '描述', field: 'describe', width: '', align: 'left', layout: 'Text', placeholder: '请填写备注' },
    { label: '开启状态', field: 'open', width: '150', filter: true, filterName: 'openStatusFilter', layout: 'Radio', placeholder: '请选择开启状态' }

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
    { label: '设备名称', field: 'name', width: '150', layout: 'Text', placeholder: '请输入设备名称' },
    { label: '维护时间', field: 'date', width: '150', layout: 'DateTime', placeholder: '请选择维护时间' },
    { label: '开启状态', field: 'open', width: '150', layout: 'Select',
      options: [
        {
          value: 0,
          label: '关闭'
        }, {
          value: 1,
          label: '开启'
        }
      ],
      placeholder: '请选择开启状态' }
  ]
}
