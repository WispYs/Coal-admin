export var TableConfig = {
  /**
   * 这种表格配置表对整个项目而言耦合性较高，后续每次对表格有特殊要求都需要修改
   * 而且由于某些字段需要前端方法处理，所以这个配置也应由前端定义交给后端，然后再通过接口动态调用
   *
   * @param {array}   actions         操作按钮，例如：['preview', 'edit', 'delete']
   * @param {boolean} summary         是否需要合计数据
   * @param {array}   summaryField    合计字段
   * @param {boolean} inlineEdit      是否支持在表格行内直接编辑，默认不支持且编辑为弹窗形式
   * @param {array}   columns         每列参数
   * @param {boolean} sortable        是否需要排序
   * @param {string}  align           单元表格对齐方向，默认为'center'
   * @param {string}  unit            字段单位，例如：元、kw/h
   * @param {string}  layout          表单类型
   * @param {string}  dateFormat      日期格式
   * @param {boolean} filter          字段值是否需要方法处理
   * @param {string}  filterName      过滤函数方法的名称,由前端定义
   * @param {array}   options         选择器配置项
   * @param {string}  showType        表格内数据显示方式，属于对展现形式有特殊要求的配置项，例如：colorLump 色块显示
   */
  actions: ['edit'],
  summary: false,
  summaryField: [],
  columns: [
    { label: '设备名称', field: 'name', width: '150', layout: 'Text', placeholder: '请填写设备名称' },
    { label: '地区', field: 'region', width: '150', layout: 'Text', placeholder: '请填写设备所在地区' },
    { label: '维护时间', field: 'date', width: '150', sortable: true, layout: 'DateTime', placeholder: '请选择维护时间' },
    { label: '设备风险', field: 'risk', width: '150', showType: 'colorLump', filter: true, filterName: 'riskFilter', layout: 'Select',
      options: [
        {
          value: 1,
          label: '没有风险'
        }, {
          value: 2,
          label: '轻度风险'
        }, {
          value: 3,
          label: '较大风险'
        }, {
          value: 4,
          label: '重大风险'
        }
      ], placeholder: '请选择风险等级' },
    { label: '开启状态', field: 'open', width: '150', layout: 'Radio', options: ['开启', '关闭'], placeholder: '请选择开启状态' },
    { label: '描述', field: 'describe', width: '', align: 'left', layout: 'Text', placeholder: '请填写备注' }
  ]
}

export var FilterConfig = {
  /**
   * @param {array} actions   操作按钮
   * @param {array} filters   筛选项
   * @param {array} options   选择器配置项
   */
  actions: ['search', 'reset', 'export'],
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
