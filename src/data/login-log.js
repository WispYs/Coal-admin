export const TableConfig = {
  /**
   * 这种表格配置表对整个项目而言耦合性较高，后续每次对表格有特殊要求都需要修改
   * 而且由于某些字段需要前端方法处理，所以这个配置也应由前端定义交给后端，然后再通过接口动态调用
   *
   * @param {array}   actions           操作按钮，例如：['preview', 'edit', 'delete', 'upload', 'other']
   * @param {string}  otherActionTitle  其他特定操作按钮文本
   * @param {number}  actionWidth       操作按钮表格长度，Number类型，默认为 160
   * @param {boolean} summary           是否需要合计数据
   * @param {array}   summaryField      合计字段
   * @param {boolean} inlineEdit        是否支持在表格行内直接编辑，默认不支持且编辑为弹窗形式
   * @param {array}   columns           每列参数
   * @param {boolean} sortable          是否需要排序
   * @param {string}  align             单元表格对齐方向，默认为'center'
   * @param {string}  unit              字段单位，例如：元、kw/h
   * @param {string}  layout            表单类型
   * @param {string}  dateFormat        日期格式
   * @param {array}   options           选择器配置项
   * @param {string}  showType          表格内数据显示方式，属于对展现形式有特殊要求的配置项，例如：colorLump-有背景色块;underline-下划线可点击
   * @param {string}  underlineText     表格内数据显示方式为underline时，下划线的文字
   */
  // actions: ['preview', 'edit', 'delete'],
  columns: [
    { label: '姓名', field: 'userName', width: 'auto', align: 'center', layout: 'Text', placeholder: '请填写姓名' },
    { label: '部门', field: 'deptName', width: 'auto', layout: 'Text', placeholder: '请填写部门' },
    { label: '登录名', field: 'loginName', width: 'auto', layout: 'Text', placeholder: '请选择登录名' },
    { label: '来源ip地址', field: 'requestIp', width: 'auto', layout: 'Text', placeholder: '请填写来源ip地址' },
    { label: '登录开始时间', field: 'startTime', width: 'auto', layout: 'DateTime', placeholder: '请填写登录开始时间' },
    { label: '登录结束时间', field: 'endTime', width: 'auto', layout: 'DateTime', placeholder: '请填写登录结束时间' },
    { label: '登录方式', field: 'loginType', width: 'auto', layout: 'Text', placeholder: '请填写登录方式' }

  ]
}

export const FilterConfig = {
  /**
   * @param {array} actions   操作按钮
   * @param {array} filters   筛选项
   * @param {array} options   选择器配置项
   */
  actions: [],
  filters: [
    { label: '部门', field: 'sysDeptId', width: '150', layout: 'TreeSelect',
      options: [
        {
          value: 1,
          label: '顾桥煤矿'
        }, {
          value: 2,
          label: '调度一所科直'
        }, {
          value: 3,
          label: '通风一队队直'
        }
      ], placeholder: '请选择部门' },
    { label: '姓名', field: 'user', width: '150', layout: 'Text', placeholder: '请输入姓名' },
    { label: '开始时间', field: 'startDate', width: '150', layout: 'date', placeholder: '请选择开始时间' },
    { label: '结束时间', field: 'endDate', width: '150', layout: 'date', placeholder: '请输入结束时间' }
  ]
}

export const ActionTableConfig = {
  /**
   * 这种表格配置表对整个项目而言耦合性较高，后续每次对表格有特殊要求都需要修改
   * 而且由于某些字段需要前端方法处理，所以这个配置也应由前端定义交给后端，然后再通过接口动态调用
   *
   * @param {array}   actions           操作按钮，例如：['preview', 'edit', 'delete', 'upload', 'other']
   * @param {string}  otherActionTitle  其他特定操作按钮文本
   * @param {number}  actionWidth       操作按钮表格长度，Number类型，默认为 160
   * @param {boolean} summary           是否需要合计数据
   * @param {array}   summaryField      合计字段
   * @param {boolean} inlineEdit        是否支持在表格行内直接编辑，默认不支持且编辑为弹窗形式
   * @param {array}   columns           每列参数
   * @param {boolean} sortable          是否需要排序
   * @param {string}  align             单元表格对齐方向，默认为'center'
   * @param {string}  unit              字段单位，例如：元、kw/h
   * @param {string}  layout            表单类型
   * @param {string}  dateFormat        日期格式
   * @param {array}   options           选择器配置项
   * @param {string}  showType          表格内数据显示方式，属于对展现形式有特殊要求的配置项，例如：colorLump-有背景色块;underline-下划线可点击
   * @param {string}  underlineText     表格内数据显示方式为underline时，下划线的文字
   */
  // actions: ['preview', 'edit', 'delete'],
  columns: [
    { label: '部门', field: 'department', width: 'auto', align: 'center', layout: 'Text', placeholder: '请填写部门' },
    { label: '操作用户', field: 'operationUser', width: 'auto', layout: 'Text', placeholder: '请填写操作用户' },
    { label: '操作模块', field: 'operationModule', width: 'auto', layout: 'Text', placeholder: '请选择操作模块' },
    { label: '操作内容', field: 'operationContent', width: 'auto', layout: 'Text', placeholder: '请填写操作内容' },
    { label: '操作时间', field: 'operationTime', width: 'auto', layout: 'DateTime', placeholder: '请填写操作时间' }
  ]
}

export const ActionFilterConfig = {
  /**
   * @param {array} actions   操作按钮
   * @param {array} filters   筛选项
   * @param {array} options   选择器配置项
   */
  actions: ['search'],
  filters: [
    { label: '部门', field: 'department', width: '130', layout: 'Select',
      options: [
        {
          value: 1,
          label: '顾桥煤矿'
        }, {
          value: 2,
          label: '调度一所科直'
        }, {
          value: 3,
          label: '通风一队队直'
        }
      ], placeholder: '请选择部门' },
    { label: '操作用户', field: 'user', width: '130', layout: 'Text', placeholder: '请输入操作用户' },
    { label: '开始时间', field: 'startDate', width: '130', layout: 'date', placeholder: '请选择开始时间' },
    { label: '结束时间', field: 'endDate', width: '130', layout: 'date', placeholder: '请选择结束时间' }
  ]
}

/* 问题反馈表头 */
export const FeedbackConfig = {
  // actions: ['preview', 'edit', 'delete'],
  checkbox: true,
  columns: [
    { label: '问题名称', field: 'questionName', width: 'auto', align: 'center', layout: 'Text', placeholder: '请填写问题名称' },
    { label: '所属专业', field: 'major', width: 'auto', layout: 'Text', placeholder: '请填写所属专业' },
    { label: '创建人', field: 'creater', width: 'auto', layout: 'Text', placeholder: '请选择创建人' },
    { label: '创建时间', field: 'createTime', width: 'auto', layout: 'Text', placeholder: '请填写创建时间' },
    { label: '是否处理', field: 'isHandled', width: 'auto', layout: 'Select', placeholder: '请填写是否处理' },
    { label: '总理人', field: 'premier', width: 'auto', layout: 'Text', placeholder: '请选择总理人' },
    { label: '明细', field: 'detailed', width: 'auto', layout: 'Develop', placeholder: '请填写明细' },
    { label: '问题反馈附件', field: 'feedbackAttachment', width: 'auto', layout: 'DateTime', placeholder: '请填写问题反馈附件' }
  ]
}

/* 问题反馈表头 */
export const CreateFeedbackConfig = {
  // actions: ['preview', 'edit', 'delete'],
  columns: [
    { label: '问题名称', field: 'questionName', width: '150', align: 'center', layout: 'Text', placeholder: '请填写问题名称' },
    { label: '问题明细', field: 'detailed', width: '360', layout: 'Textarea', placeholder: '请填写问题明细' },
    { label: '所属专业', field: 'major', width: '150', layout: 'Select',
      options: [
        {
          value: 0,
          label: '计算机应用'
        }, {
          value: 1,
          label: '机电一体化'
        }, {
          value: 2,
          label: '物联网'
        }
      ], placeholder: '请选择所属专业' },
    { label: '创建人', field: 'creater', width: '180', layout: 'Text', placeholder: '请选择创建人' },
    { label: '问题反馈附件', field: 'feedbackAttachment', width: '150', layout: 'Upload', placeholder: '请填写问题反馈附件' }
  ]
}
