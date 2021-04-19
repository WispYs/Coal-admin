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
   * @param {boolean} noSerialNum       是否隐藏表格序号，默认false，值为true时为隐藏序号
   * @param {array}   columns           每列参数
   * @param {boolean} sortable          是否需要排序
   * @param {string}  align             单元表格对齐方向，默认为'center'
   * @param {string}  unit              字段单位，例如：元、kw/h
   * @param {string}  layout            表单类型
   * @param {string}  dateFormat        日期格式
   * @param {array}   options           选择器配置项
   * @param {string}  showType          表格内数据显示方式，属于对展现形式有特殊要求的配置项，例如：colorLump-有背景色块;underline-下划线可点击
   * @param {string}  underlineText     表格内数据显示方式为underline时，下划线的文字
   * @param {boolean} multiple          下拉选择是否多选,默认false，值为true时多选
   */
  columns: [
    { label: '样品受理编号', field: 'acceptanceNo', width: '150', align: 'left', layout: 'Text', placeholder: '请填写样品受理编号' },
    { label: '检验报告编号', field: 'inspectionReportNo', width: '100', layout: 'Text', placeholder: '请填写检验报告编号' },
    { label: '样品名称', field: 'sampleName', width: '100', layout: 'Text', placeholder: '请填写样品名称' },
    { label: '采样地点', field: 'samplingLocation', width: '100', layout: 'Text', placeholder: '请填写检验地点' },
    { label: '采样时间', field: 'samplingTime', width: '180', sortable: true, layout: 'DateTime', placeholder: '请选择项目时间' },
    { label: '化验时间', field: 'testTime', width: '180', sortable: true, layout: 'DateTime', placeholder: '请选择项目时间' },
    { label: '检测依据', field: 'inspectionBasis', width: '100', layout: 'Text', placeholder: '请填写样品名称' },
    { label: '执行标准', field: 'executiveStandard', width: '100', layout: 'Text', placeholder: '请填写检验地点' },
    { label: '检验项目', field: 'inspectionItems', width: '100', layout: 'Text', placeholder: '请填写样品名称' },
    { label: '检验结果', field: 'testResults', width: '100', layout: 'Text', placeholder: '请填写检验地点' },
    { label: '检验机构', field: 'InspectionOrganization', width: '100', layout: 'Text', placeholder: '请填写样品名称' },
    { label: '备注', field: 'remarks', width: '100', layout: 'Text', placeholder: '请填写检验地点' }
  ]
}

