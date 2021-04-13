export const MechanismTableConfig = {
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
  actions: ['edit', 'delete'],
  summary: false,
  summaryField: [],
  columns: [
    { label: '单位', field: 'unit', width: 'auto', layout: 'Text', require: true, placeholder: '请选择单位' },
    { label: '编号', field: 'num', width: 'auto', layout: 'Text', require: true, placeholder: '请填写编号' },
    { label: '组织机构类型', field: 'organizationType', width: 'auto', layout: 'Select', require: true,
      options: [
        { value: 1, label: '井工矿' },
        { value: 2, label: '矿机构' },
        { value: 3, label: '职务' }
      ], placeholder: '请选择组织机构类型' },
    { label: '排序', field: 'sort', width: 'auto', layout: 'Text', require: true, placeholder: '请填写排序' },
    { label: '上级节点', field: 'parentId', layout: 'TreeSelect', require: true, hidden: true,
      options: [
        {
          value: 1,
          label: '顾桥矿',
          children: [
            { value: 2, label: '机关', children: [
              { value: 3, label: '矿领导' },
              { value: 4, label: '办公室', children: [
                { value: 5, label: '部门', children: [
                  { value: 6, label: '安全部门' },
                  { value: 7, label: '监管部门' },
                  { value: 8, label: '采掘部门' },
                  { value: 9, label: '生产部门' },
                  { value: 10, label: '调度部门' },
                  { value: 11, label: '防控部门' },
                  { value: 12, label: '应急部门' }
                ] },
                { value: 13, label: '办公室科室（中央区）' },
                { value: 14, label: '办公室科室（南区）' },
                { value: 15, label: '办公室科室（西区）' },
                { value: 16, label: '办公室科室（东区）' }
              ] },
              { value: 17, label: '人力资源部' }
            ] }
          ]
        }
      ], placeholder: '请选择上级节点' },
  ]
}


export const MechanismFilterConfig = {
  /**
   * @param {array} actions   操作按钮
   * @param {array} filters   筛选项
   * @param {array} options   选择器配置项
   */
  actions: ['search','create'],
  filters: [
    { label: '单位', field: 'name', width: '220', layout: 'Text', placeholder: '请输入单位' }
  ]
}
