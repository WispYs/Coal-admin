/**
   * TableConfig
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
/**
   * FilterConfig
   * @param {array} actions   操作按钮
   * @param {array} filters   筛选项
   * @param {array} options   选择器配置项
   */

/** ---- 机电管理 ---- **/
// 大型设备管理
export const MechLargeEquipTableConfig = {
  actions: ['edit', 'delete', 'other'],
  otherActionTitle: ['展开详情'],
  checkbox: true,
  columns: [
    { label: '设备编号', field: 'eid', width: '120', layout: 'Text', require: true, placeholder: '请填写设备编号' },
    { label: '设备名称', field: 'name', width: '120', layout: 'Text', require: true, placeholder: '请填写设备名称' },
    { label: '所属场所', field: 'area', layout: 'TreeSelect', require: true, hidden: true,
      options: [
        {
          value: 1,
          label: '顾桥矿',
          children: [
            { value: 2, label: '机关', children: [
              { value: 3, label: '矿领导' },
              { value: 17, label: '人力资源部' }
            ] }
          ]
        }
      ], placeholder: '请选择所属场所' },
    { label: '所属部件', field: 'part', width: '90', layout: 'Select', require: true,
      options: [
        {
          value: 1,
          label: '提升机'
        }, {
          value: 2,
          label: '空气压缩机'
        }, {
          value: 3,
          label: '通风机'
        }
      ], placeholder: '请选择所属部件' },
    { label: '规格型号', field: 'model', width: '120', layout: 'Text', placeholder: '请填写规格型号' },
    { label: '生产厂家', field: 'factory', width: '90', layout: 'Text', placeholder: '请填写生产厂家' },
    { label: '资产编号', field: 'uid', width: '120', layout: 'Text', placeholder: '请填写资产编号' },
    { label: '出厂日期', field: 'createData', width: '120', sortable: true, layout: 'DateTime', require: true, placeholder: '请选择日期' },
    { label: '到货日期', field: 'deliveryData', width: '120', sortable: true, layout: 'DateTime', require: true, placeholder: '请选择日期' },
    { label: '使用日期', field: 'useDate', width: '120', sortable: true, layout: 'DateTime', placeholder: '请选择日期' },
    { label: '原值', field: 'originalValue', width: '120', layout: 'Text', hidden: true, placeholder: '请填写原值' },
    { label: '净值', field: 'netValue', width: '120', layout: 'Text', hidden: true, placeholder: '请填写净值' },
    { label: '运行时长', field: 'runtime', width: '120', layout: 'Text', hidden: true, placeholder: '请填写运行时长' },
    { label: '附件', field: 'file', width: '120', layout: 'Upload', showType: 'underline', placeholder: '请上传附件' },
    { label: '二维码', field: 'QRcode', width: '120', layout: 'Upload', showType: 'underline', disabled: true }
  ]
}
export const MechLargeEquipFilterConfig = {
  actions: ['search', 'reset', 'create'],
  filters: [
    { label: '关键字', field: 'keyword', width: '220', layout: 'Text', placeholder: '设备编号，设备名称' }
  ]
}
export const MechLargeEquipDetailTableConfig = {
  actions: ['edit', 'delete'],
  checkbox: true,
  columns: [
    { label: '属性名称', field: 'name', layout: 'Text', require: true, placeholder: '请填写属性名称' },
    { label: '属性内容', field: 'info', layout: 'Text', require: true, placeholder: '请填写属性内容' },
    { label: '排序', field: 'sort', layout: 'Text', require: true, placeholder: '请填写排序' }
  ]
}
export const MechLargeEquipDetailFilterConfig = {
  actions: ['search', 'reset', 'create'],
  filters: [
    { label: '关键字', field: 'keyword', width: '220', layout: 'Text', placeholder: '属性名称，属性内容' }
  ]
}
// 大型设备类型
export const MechLargeEquipTypeTableConfig = {
  actions: ['edit', 'delete', 'other'],
  otherActionTitle: ['展开详情'],
  checkbox: true,
  rowKey: 'id',
  columns: [
    { label: '类型名称', field: 'name', layout: 'Text', require: true, placeholder: '请填写类型名称' },
    { label: '排序', field: 'sort', layout: 'Text', placeholder: '请填写排序' },
    { label: '备注', field: 'remark', layout: 'Text', require: true, placeholder: '请填写备注' },
    { label: '录入时间', field: 'createDate', layout: 'DateTime', disabled: true, placeholder: '请填写录入时间' },
    { label: '所属场所', field: 'area', layout: 'TreeSelect', hidden: true,
      options: [
        {
          value: 1,
          label: '顾桥矿',
          children: [
            { value: 2, label: '机关', children: [
              { value: 3, label: '矿领导' },
              { value: 17, label: '人力资源部' }
            ] }
          ]
        }
      ], placeholder: '请选择所属场所' }
  ]
}
export const MechLargeEquipTypeFilterConfig = {
  actions: ['search', 'reset', 'create'],
  filters: [
    { label: '关键字', field: 'keyword', width: '220', layout: 'Text', placeholder: '类型名称' }
  ]
}
// 维修知识库
export const KnowLedgeTableConfig = {
  actions: ['edit', 'delete'],
  checkbox: true,
  columns: [
    { label: '所属场所', field: 'area', layout: 'Select', require: true,
      options: [{ value: 1, label: '中央区' }], placeholder: '请选择所属场所' },
    { label: '检查项目', field: 'project', layout: 'Text', require: true, placeholder: '请填写检查项目' },
    { label: '检修位置', field: 'addr', layout: 'Text', require: true, placeholder: '请填写检修位置' },
    { label: '检修周期', field: 'period', layout: 'Text', require: true, placeholder: '请填写检修周期' },
    { label: '责任人', field: 'person', layout: 'Text', require: true, placeholder: '请填写责任人' },
    { label: '检查检修标准', field: 'standard', width: '120px', layout: 'Textarea', placeholder: '请填写检查检修标准' },
    { label: '备注', field: 'remark', width: '', layout: 'Textarea', placeholder: '请填写备注' }
  ]
}
export const KnowLedgeFilterConfig = {
  actions: ['search', 'reset', 'create', 'delete'],
  filters: [
    { label: '关键字', field: 'keyword', width: '220', layout: 'Text', placeholder: '所属场所，检修位置' }
  ]
}
// 设备能耗分析知识库
export const DisKnowLedgeTableConfig = {
  actions: ['edit', 'delete'],
  checkbox: true,
  columns: [
    { label: '所属场所', field: 'area', layout: 'Select', require: true,
      options: [{ value: 1, label: '中央区' }], placeholder: '请选择所属场所' },
    { label: '参考国家标准', field: 'standard', width: '120px', layout: 'Text', require: true, placeholder: '请填写参考国家标准' },
    { label: '报警阈值', field: 'alarm', layout: 'Text', require: true, placeholder: '请填写报警阈值' },
    { label: '能耗单位', field: 'unit', layout: 'Text', require: true, placeholder: '请填写能耗单位' },
    { label: '说明', field: 'explain', width: '120px', layout: 'Textarea', placeholder: '请填写说明' },
    { label: '能耗公式', field: 'formula', layout: 'TextEditor', placeholder: '请填写能耗公式' },
    { label: '辅助决策', field: 'decision', layout: 'Textarea', placeholder: '请填写辅助决策' },
    { label: '等级评定', field: 'evaluate', layout: 'TextEditor', placeholder: '请填写等级评定' }
  ]
}
export const DisKnowLedgeFilterConfig = {
  actions: ['search', 'reset', 'create', 'delete'],
  filters: [
    { label: '关键字', field: 'keyword', width: '220', layout: 'Text', placeholder: '参考国家标准，辅助决策' }
  ]
}
