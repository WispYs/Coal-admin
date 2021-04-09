export const TableConfig = {
  /**
   * 这种表格配置表对整个项目而言耦合性较高，后续每次对表格有特殊要求都需要修改
   * 而且由于某些字段需要前端方法处理，所以这个配置也应由前端定义交给后端，然后再通过接口动态调用
   *
   * @param {array}   actions           操作按钮，例如：['preview', 'edit', 'delete', 'upload', 'other']
   * @param {string}  otherActionTitle  其他特定操作按钮文本
   * @param {boolean} summary           是否需要合计数据
   * @param {array}   summaryField      合计字段
   * @param {boolean} inlineEdit        是否支持在表格行内直接编辑，默认不支持且编辑为弹窗形式
   * @param {array}   columns           每列参数
   * @param {boolean} sortable          是否需要排序
   * @param {string}  align             单元表格对齐方向，默认为'center'
   * @param {string}  unit              字段单位，例如：元、kw/h
   * @param {string}  layout            表单类型
   * @param {boolean} require           是否为必填字段，默认false为非必填
   * @param {boolean} rule              自定义验证方法
   * @param {string}  dateFormat        日期格式
   * @param {array}   options           选择器配置项
   * @param {boolean} hidden            是否在表格中隐藏，默认false，值为true时只在新建、编辑中显示该字段
   * @param {boolean} disabled          不可在新增、编辑中修改的字段，默认false，值为true时表示该字段后台自动生成不可编辑
   * @param {string}  showType          表格内数据显示方式，属于对展现形式有特殊要求的配置项，例如：colorLump 色块显示
   * @param {string}  rowKey            行数据的key，渲染树形表格必填，一般选唯一字段 id
   * @param {boolean} lazy              是否异步加载树形表格子节点数据，默认false，值为true时为异步
   */
  actions: [],
  summary: false,
  summaryField: [],
  columns: [
    { label: '队名', field: 'team', width: '150', layout: 'Text', placeholder: '请填写队伍名称' },
    { label: '施工地点', field: 'addr', width: '', layout: 'Text', placeholder: '请填写施工地点' },
    { label: '开工时间', field: 'startTime', width: '160', layout: 'DateTime', placeholder: '请选择开工时间' },
    { label: '竣工时间', field: 'endTime', width: '160', layout: 'DateTime', placeholder: '请选择竣工地点' },
    { label: '局扇型号', field: 'model', width: '150', layout: 'Text', placeholder: '请填写局扇型号' },
    { label: '运转(台数*KW)', field: 'run', width: '120', layout: 'Text', placeholder: '请填写运转台数和功率' },
    { label: '备用(台数*KW)', field: 'standby', width: '120', layout: 'Text', placeholder: '请填写备用台数和功率' },
    { label: '局扇运行状况', field: 'status', width: '120', layout: 'Select',
      options: [
        {
          value: '单级',
          label: '单级'
        }, {
          value: '双级',
          label: '双级'
        }
      ], placeholder: '请选择局扇运行状况' },
    { label: '风筒直径', field: 'diameter', width: '120', layout: 'Text', placeholder: '请填写风筒直径' },
    { label: '风量(m³/min)', field: 'blowingRate', width: '120', layout: 'Text', placeholder: '请填写风量' }
  ]
}
