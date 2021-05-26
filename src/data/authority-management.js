
// 手机号码验证
import { validatePhone } from '@/utils/validate'

export const OTableConfig = {
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
   * @param {string}  layout            表单类型；layout为 SelectUser 时，点击该表单字段调用 '选择人员' 公共组件
   * @param {boolean} require           是否为必填字段，默认false为非必填
   * @param {boolean} rule              自定义验证方法
   * @param {string}  dateFormat        日期格式，例如：yyyy-MM-dd、yyyy-MM-dd HH:mm:ss
   * @param {array}   options           选择器配置项
   * @param {boolean} hidden            是否在表格中隐藏，默认false，值为true时只在新建、编辑中显示该字段
   * @param {boolean} immutable         不可在新增、编辑中修改的字段，默认false，值为true时表示该字段后台自动生成不可编辑，也不再修改表单中显示
   * @param {boolean} disabled          是否禁用表单字段，默认false，值为true时禁用该字段
   * @param {string}  showType          表格内数据显示方式，属于对展现形式有特殊要求的配置项，例如：colorLump 色块显示
   * @param {string}  rowKey            行数据的key，渲染树形表格必填，一般选唯一字段 id
   * @param {boolean} lazy              是否异步加载树形表格子节点数据，默认false，值为true时为异步
   * @param {boolean} multiple          下拉选择是否多选,默认false，值为true时多选
   * @param {string}  subField          针对动态获取的多级联动下拉菜单，无法通过value值渲染label名称时，采取的备用名称字段
   * @param {boolean} fullLine          该表单字段长度是否为整行，默认false，值为true时表示整行显示
   * @param {string}  associate         针对关联字段显示隐藏(改变某字段值为绑定值才会出现的字段)，fields表示相关联字段，value表示绑定值(例如：'1,2,3')，视项目需求待添加到公共组件
   */
  actions: ['edit', 'delete'],
  rowKey: 'aqglRiskTissueId',
  summary: false,
  summaryField: [],
  checkbox: true,
  lazy: true,
  columns: [
    { label: '名称', field: 'aqglRiskTissueName', width: '200', layout: 'Text', placeholder: '请填写名称' },
    { label: '编号', field: 'aqglRiskTissueId', width: '150', layout: 'Text', placeholder: '请填写编号' },
    { label: '创建日期', field: 'createTime', width: '200', sortable: true, layout: 'DateTime', placeholder: '请选择日期' },
    { label: '排序', field: 'orderNum', width: '150', layout: 'Text', placeholder: '请选择排序' },
    { label: '上级节点', field: 'parentId', layout: 'TreeSelect', hidden: true,
      options: [], placeholder: '请选择上级节点' },
    { label: '备注', field: 'remark', width: '', layout: 'Textarea', placeholder: '请填写备注' }
  ]
}

// 应用系统管理
export const AppTableConfig = {
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
   * @param {string}  layout            表单类型；layout为 SelectUser 时，点击该表单字段调用 '选择人员' 公共组件
   * @param {boolean} require           是否为必填字段，默认false为非必填
   * @param {boolean} rule              自定义验证方法
   * @param {string}  dateFormat        日期格式，例如：yyyy-MM-dd、yyyy-MM-dd HH:mm:ss
   * @param {array}   options           选择器配置项
   * @param {boolean} hidden            是否在表格中隐藏，默认false，值为true时只在新建、编辑中显示该字段
   * @param {boolean} immutable         不可在新增、编辑中修改的字段，默认false，值为true时表示该字段后台自动生成不可编辑，也不再修改表单中显示
   * @param {boolean} disabled          是否禁用表单字段，默认false，值为true时禁用该字段
   * @param {string}  showType          表格内数据显示方式，属于对展现形式有特殊要求的配置项，例如：colorLump-有背景色块;underline-下划线可点击
   * @param {string}  underlineText     表格内数据显示方式为underline时，下划线的文字
   * @param {string}  rowKey            行数据的key，渲染树形表格必填，一般选唯一字段 id
   * @param {boolean} lazy              是否异步加载树形表格子节点数据，默认false，值为true时为异步
  */
  actions: ['edit', 'delete'],
  checkbox: true,
  columns: [
    { label: '站点名称', field: 'site', width: '160', layout: 'Text', require: true, placeholder: '请填写站点名称' },
    { label: '站点地址', field: 'url', width: '160', layout: 'Text', placeholder: '请填写站点地址' },
    { label: '所属部门', field: 'sysDeptId', width: '120', layout: 'TreeSelect',
      options: [], placeholder: '请选择所属部门' },
    { label: '排序', field: 'orderNum', width: '80', layout: 'Text', require: true, placeholder: '请选择排序' },
    { label: '备注', field: 'remark', width: '', layout: 'Textarea', placeholder: '请填写备注' }
  ]
}

export const AppFilterConfig = {
  /**
   * @param {array} actions   操作按钮
   * @param {array} filters   筛选项
   * @param {array} options   选择器配置项
   */
  actions: ['search', 'reset', 'create', 'delete'],
  filters: [
    { label: '站点名称', field: 'site', width: '220', layout: 'Text', placeholder: '请输入站点名称' }
  ]
}

// 用户管理
export const UserTableConfig = {
  actions: ['edit', 'delete', 'other'],
  otherActionTitle: ['重置密码'],
  checkbox: true,
  columns: [
    { label: '姓名', field: 'userName', layout: 'Text', require: true, placeholder: '请填写姓名' },
    { label: '工号', field: 'workNumber', layout: 'Text', require: true, placeholder: '请填写工号' },
    { label: '登录名', field: 'loginName', layout: 'Text', require: true,
      rule: [
        { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }
      ], placeholder: '请填写登录名' },
    { label: '密码', field: 'password', layout: 'Text', require: true,
      rule: [
        { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
      ], hidden: true, placeholder: '请填写密码' },
    { label: '部门', field: 'sysDeptId', layout: 'TreeSelect', require: true,
      options: [], placeholder: '请选择部门' },
    { label: '职务', field: 'duty', layout: 'Text', placeholder: '请填写职务' },
    { label: '入职时间', field: 'entryTime', layout: 'DateTime', hidden: true, placeholder: '请填写入职时间' },
    { label: '岗位工种', field: 'skill', layout: 'Text', hidden: true, placeholder: '请填写岗位工种' },
    { label: '邮箱', field: 'email', layout: 'Text', hidden: true, placeholder: '请填写邮箱' },
    { label: '性别', field: 'sex', layout: 'Radio',
      options: [
        { value: 1, label: '男' },
        { value: 2, label: '女' }
      ], placeholder: '请选择性别' },
    { label: '手机', field: 'phone', layout: 'Text',
      rule: [
        { validator: validatePhone, trigger: 'blur' }
      ], placeholder: '请填写手机' },
    { label: '排序', field: 'orderNum', width: '110', layout: 'Text', placeholder: '请填写排序' },
    { label: '状态', field: 'status', width: '90', layout: 'Radio',
      options: [
        { value: 1, label: '锁定' },
        { value: 2, label: '正常' }
      ], placeholder: '请选择状态' },
    { label: '人员定位卡号', field: 'cardNo', width: '110', layout: 'Text', placeholder: '请填写人员定位卡号' },
    { label: '备注信息', field: 'remark', width: '110', layout: 'Textarea', placeholder: '请填写备注信息' }
  ]
}

export const UserFilterConfig = {
  actions: ['search', 'reset', 'create', 'delete'],
  filters: [
    { label: '关键字', field: 'keyword', width: '220', layout: 'Text', placeholder: '工号、姓名、登录名' }
  ]
}

// 人员管理
export const personnelConfig = {
  // actions: ['other'],
  otherActionTitle: [],
  checkbox: true,
  columns: [
    { label: '部门名称', field: 'deptName', width: '160', layout: 'Text', require: true, placeholder: '请填写部门名称' },
    { label: '人员编号', field: 'identifier', width: '90', layout: 'Text', require: true, placeholder: '请填写人员编号' },
    { label: '人员姓名', field: 'personalName', width: '100', layout: 'Text', require: true, placeholder: '请填写人员姓名' },
    { label: '身份证号', field: 'IDNumber', width: '160', layout: 'Text', require: true, placeholder: '请填写身份证号' },
    { label: '人员性别', field: 'personalSex', width: '90', layout: 'Radio', require: true,
      options: [
        { value: 1, label: '男' },
        { value: 2, label: '女' }
      ], placeholder: '请选择人员性别' },
    { label: '人员生日', field: 'personalBirthdy', width: '100', layout: 'DateTime', require: true, placeholder: '请填写人员生日' },
    { label: '定位卡号', field: 'locationCardNumber', width: '150', layout: 'Text', placeholder: '请填写定位卡号' },
    { label: '人员学历', field: 'personnelEducation', width: '100', layout: 'Select',
      options: [
        { value: 1, label: '博士' },
        { value: 2, label: '硕士' },
        { value: 3, label: '研究生' },
        { value: 4, label: '本科' },
        { value: 5, label: '专科' }
      ], placeholder: '请选择人员学历' },
    { label: '联系电话', field: 'phone', width: '110', layout: 'Text', placeholder: '请选择联系电话' },
    { label: '电子邮箱', field: 'email', width: '150', layout: 'Text', placeholder: '请填写电子邮箱' },
    { label: '人员职务', field: 'post', width: '100', layout: 'Text', placeholder: '请填写人员职务' },
    { label: '人员岗位', field: 'station', width: '100', layout: 'Text', placeholder: '请选择人员岗位' },
    { label: '入职日期', field: 'entryDate', width: '110', layout: 'DateTime', placeholder: '请填写入职日期' },
    { label: '用工性质', field: 'nature', width: '100', layout: 'Select',
      options: [
        { value: 1, label: '全合' },
        { value: 2, label: '协议用工' },
        { value: 3, label: '临时' }
      ], placeholder: '请选择用工性质' },
    { label: '人员级别', field: 'level', width: '100', layout: 'Select',
      options: [
        { value: 1, label: '组长' },
        { value: 2, label: '科直' },
        { value: 3, label: '队直' }
      ], placeholder: '请选择人员级别' },
    { label: '排序', field: 'sort', width: '110', layout: 'Text', placeholder: '请填写排序' },
    { label: '家庭住址', field: 'address', width: '200', layout: 'Text', placeholder: '请填写家庭住址' },
    { label: '备注', field: 'remarks', width: '100', layout: 'Textarea', placeholder: '请选择备注' }
  ]
}

export const RoleTypeFilterConfig = {
  actions: ['search', 'create'],
  filters: [
    { label: '关键字', field: 'keyword', width: '220', layout: 'Text', placeholder: '名称、站点名称' }
  ]
}

export const RoleTypeConfig = {
  actions: ['edit', 'delete'],
  otherActionTitle: [],
  checkbox: true,
  columns: [
    { label: '名称', field: 'typeName', width: 'auto', layout: 'Text', require: true, placeholder: '请填写名称' },
    { label: '站点名称', field: 'sysManageId', width: 'auto', layout: 'Select',
      options: [], require: true, placeholder: '请选择站点名称' },
    { label: '排序', field: 'orderNum', width: 'auto', layout: 'Text', require: true, placeholder: '请填写排序' }
  ]
}

// 组织机构管理
export const OrganTableConfig = {
  // actions: ['addIco', 'editIco', 'deleteIco', 'moveUpIco', 'moveDownIco'],
  actions: ['edit', 'delete'],
  rowKey: 'sysDeptId',
  // checkbox: true,
  noSerialNum: true,
  lazy: true,
  columns: [
    { label: '名称', field: 'deptName', width: '200', layout: 'Text', require: true, placeholder: '请填写名称' },
    { label: '编号', field: 'sysDeptId', width: '80', layout: 'Text', immutable: true, placeholder: '请填写编号' },
    { label: '简称', field: 'shortName', layout: 'Text', placeholder: '请填写简称' },
    { label: '类型', field: 'deptType', layout: 'Select', require: true,
      options: [], placeholder: '请选择类型' },
    { label: '上级节点', field: 'parentId', layout: 'TreeSelect', hidden: true,
      options: [], placeholder: '请选择上级节点' },
    { label: '排序', field: 'sort', width: '80', layout: 'Text', require: true, placeholder: '请填写排序' },
    { label: '创建日期', field: 'createTime', width: '180', layout: 'DateTime', immutable: true, placeholder: '请选择创建日期' },
    { label: '备注', field: 'remark', layout: 'Textarea', placeholder: '请填写备注' }

  ]
}

export const OrganFilterConfig = {
  actions: ['search', 'reset', 'create', 'export', 'delete'],
  filters: [
    { label: '关键字', field: 'keyword', width: '220', layout: 'Text', placeholder: '名称、简称' }
  ]
}

// 角色管理
export const RoleTableConfig = {
  actions: ['edit', 'delete', 'other', 'managingMember', 'power'],
  otherActionTitle: ['管理成员', '编辑权限'],
  rowKey: 'num',
  checkbox: true,
  columns: [
    { label: '角色名称', field: 'roleName', layout: 'Text', require: true, placeholder: '请填写角色名称' },
    { label: '角色类型', field: 'sysRoleTypeId', layout: 'Select', options: [], require: true, placeholder: '请选择角色类型' },
    { label: '所属站点', field: 'sysManageId', layout: 'Select', options: [], immutable: true, placeholder: '请选择所属站点' },
    { label: '成员数量', field: 'memberNum', layout: 'Text', immutable: true, placeholder: '请填写成员数量' },
    { label: '排序', field: 'orderNum', layout: 'Text', require: true, placeholder: '请填写排序' },
    { label: '备注', field: 'remark', layout: 'Textarea', placeholder: '请填写备注' }
  ]
}

export const RoleFilterConfig = {
  actions: ['search', 'reset', 'create', 'delete'],
  filters: [
    { label: '角色类型', field: 'sysRoleTypeId', width: '220', layout: 'Select', options: [
      { value: 1, label: '基础通用' },
      { value: 2, label: '安全管理专业' },
      { value: 3, label: '调度专业' }
    ], placeholder: '请选择角色类型' }
  ]
}

// 菜单资源管理
export const menuResourceConfig = {
  actions: ['edit', 'delete','other'],
  otherActionTitle: ['按钮管理'],
  rowKey: 'id',
  // checkbox: true,
  noSerialNum: true,
  // lazy: true,
  columns: [
    { label: '菜单名称', field: 'menuName', width: '170', layout: 'Text', require: true, placeholder: '请填写名称' },
    { label: '前端路由', field: 'component', width: '170', layout: 'Text', require: true, placeholder: '请填写名称' },
    { label: '外部链接URL', field: 'externalUrl', width: '370', layout: 'Text', placeholder: '请填写名称' },
    { label: '菜单图标', field: 'icon', width: '170', layout: 'Text', placeholder: '请填写名称' },
    { label: '上级节点', field: 'parentId', layout: 'TreeSelect', require: true, hidden: true,
      options: [], placeholder: '请选择上级节点' },
    { label: '前端路由标识路径', field: 'path', width: '170', layout: 'Text', require: true, placeholder: '请填写名称' },
    { label: '菜单权限标识', field: 'permission', width: '170', layout: 'Text', placeholder: '请填写名称' },
    { label: '路由重定向路径', field: 'redirect', width: '170', layout: 'Text', placeholder: '请填写名称' },
    { label: '排序', field: 'sort', layout: 'Text', width: 'auto', require: true, placeholder: '请填写排序' }
  ]
}

export const menuResourButtonFilterConfig = {
  actions: ['create'],
  filters: [
    // { label: '关键字', field: 'keyword', width: '220', layout: 'Text', placeholder: '按钮名称' }
  ]
}

// 菜单资源管理
export const menuResourButtonConfig = {
  actions: ['edit', 'delete'],
  // otherActionTitle: [],
  rowKey: 'id',
  noSerialNum: true,
  columns: [
    { label: '按钮名称', field: 'menuName', width: 'auto', layout: 'Text', placeholder: '请填写按钮名称'},
    { label: '按钮权限标识', field: 'permission', width: 'auto', layout: 'Text', placeholder: '请填写按钮权限标识' },
  ]
}

// 菜单filter
export const MenuFilterConfig = {
  actions: ['search','create'],
  filters: [
    { label: '关键字', field: 'keyword', width: '220', layout: 'Text', placeholder: '菜单名称' }
  ]
}

// 数据字典管理
export const dataDictionaryConfig = {
  actions: ['edit', 'delete'],
  otherActionTitle: [],
  rowKey: 'sysDictId',
  // checkbox: true,
  noSerialNum: true,
  lazy: true,
  columns: [
    { label: '名称', field: 'dictName', width: '170', layout: 'Text', require: true, placeholder: '请填写名称' },
    { label: '编号', field: 'sysDictId', width: 'auto', layout: 'Text', placeholder: '请填写编号' },
    { label: '值', field: 'dictValue', width: 'auto', layout: 'Text', placeholder: '请填写值' },
    { label: '上级节点', field: 'parentId', layout: 'TreeSelect', hidden: true,
      options: [], placeholder: '请选择上级节点' },
    { label: '排序', field: 'sortNo', width: 'auto', layout: 'Text', require: true, placeholder: '请填写排序' },
    { label: '类型', field: 'dictType', width: 'auto', layout: 'Radio', options: [
      { value: 1, label: '类别' },
      { value: 2, label: '项' }
    ], placeholder: '请选择类型' },
    { label: '备注', field: 'remark', width: 'auto', layout: 'Textarea', placeholder: '请填写备注' }
  ]
}

// 菜单filter
export const dataDictionaryFilterConfig = {
  actions: ['search', 'create'],
  filters: [
    { label: '关键字', field: 'keyword', width: '220', layout: 'Text', placeholder: '名称、值' }
  ]
}

// 管理成员filter
export const memberFilterConfig = {
  actions: ['search'],
  filters: [
    { label: '关键字', field: 'keyword', width: '220', layout: 'Text', placeholder: '姓名 登录名' }
  ]
}

export const memberConfig = {
  actions: [],
  otherActionTitle: [],
  rowKey: 'num',
  checkbox: true,
  noSerialNum: true,
  columns: [
    { label: '姓名', field: 'userName', layout: 'Text', placeholder: '请填写姓名' },
    { label: '登录名', field: 'loginName', layout: 'Text', placeholder: '请选择登录名' },
    { label: '所在部门', field: 'sysDeptId', layout: 'Select', options: [], placeholder: '请填写所在部门' },
    // { label: '添加日期', field: 'createTime', layout: 'Text', placeholder: '请填写添加日期' }
  ]
}

// // 管理成员filter
// export const addMemberFilterConfig = {
//   actions: ['search'],
//   filters: [
//     { label: '关键字', field: 'keyword', width: '220', layout: 'Text', placeholder: '姓名 登录名' }
//   ]
// }

// export const AddMemberConfig = {
//   actions: [],
//   otherActionTitle: [],
//   rowKey: 'num',
//   checkbox: true,
//   columns: [
//     { label: '登录名', field: 'loginName', layout: 'Select', placeholder: '请选择登录名' },
//     { label: '姓名', field: 'userName', layout: 'Text', placeholder: '请填写姓名' },
//     { label: '部门', field: 'sysDeptId', layout: 'Text', options: [], placeholder: '请填写所在部门' }
//   ]
// }

// 消息模板过滤
export const NewsTemplateFilterConfig = {
  actions: ['search', 'create'],
  filters: [
    { label: '关键字', field: 'keyword', width: '220', layout: 'Text', placeholder: '模板名称' }
  ]
}

// 消息模板
export const NewsTemplateConfig = {
  actions: ['edit', 'delete'],
  otherActionTitle: [],
  rowKey: 'ID',
  // checkbox: true,
  columns: [
    { label: '模板名称', field: 'templateName', layout: 'Text', width: '200', require: true, placeholder: '请填写模板内容' },
    { label: '模板内容', field: 'templateContent', layout: 'TextEditor', showType: 'underline', underlineText: '模板内容', placeholder: '请填写模板内容' },
    { label: '排序', field: 'sort', width: 'auto', layout: 'Number', placeholder: '请填写排序' },
    { label: '备注', field: 'remark', layout: 'Textarea', width: '270', placeholder: '请填写状态' }
  ]
}

export const NewsConfig = {
  actions: [],
  otherActionTitle: [],
  rowKey: 'num',
  checkbox: false,
  columns: [
    { label: '标题', field: 'title', layout: 'Text', width: 'auto', placeholder: '请填写标题' },
    { label: '内容', field: 'content', layout: 'Text', width: '200', placeholder: '请填写内容' },
    { label: '消息类型', field: 'notifyWay', layout: 'Text', width: 'auto', placeholder: '请填写消息类型' },
    { label: '消息级别', field: 'dictName', layout: 'Text', width: 'auto', placeholder: '请填写消息级别' },
    { label: '发生次数', field: 'times', layout: 'Text', width: 'auto', placeholder: '请填写发生次数' },
    { label: '创建时间', field: 'createTime', layout: 'Text', width: 'auto', placeholder: '请填写创建时间' },
    { label: '最近更新', field: 'updateTime', layout: 'Text', width: 'auto', placeholder: '请选择最近更新' },
    { label: '状态', field: 'status', layout: 'Text', width: 'auto', placeholder: '请填写状态' },
    { label: '读取人', field: 'targetValue', layout: 'Text', width: 'auto', placeholder: '请填写读取人' },
    { label: '读取时间', field: 'readTime', layout: 'Text', width: 'auto', placeholder: '请填写读取时间' }
  ]
}

export const NewsTypeConfig = {
  actions: ['editIco', 'deleteIco'],
  rowKey: 'sysMsgTypeId',
  noSerialNum: true,
  lazy: true,
  columns: [
    { label: 'id', field: 'sysMsgTypeId', layout: 'Text', width: '200', immutable: true, hidden:true, placeholder: '请填写内容' },
    { label: '名称', field: 'typeName', layout: 'Text', width: '200', require: true, placeholder: '请填写内容' },
    { label: '上级节点', field: 'parentId', layout: 'TreeSelect', width: 'auto',
      options: [], placeholder: '请选择最近更新' },
    { label: '消息级别', field: 'sysDictId', layout: 'Select', width: 'auto', options: [], placeholder: '请选择消息级别' },
    { label: '提醒方式', field: 'notifyWay', layout: 'Select', width: 'auto', options: [], placeholder: '请选择提醒类型' },
    { label: '目标类型', field: 'targetId', layout: 'Select', width: 'auto', options: [], placeholder: '请选择提醒类型' },
    { label: '提醒目标', field: 'typeId', layout: 'Select', width: 'auto',
      options: [], placeholder: '请选择最近更新' },
    { label: '发送方式', field: 'sendType', layout: 'Select', width: 'auto', options: [], placeholder: '请选择发送方式' },
    { label: '消息模板', field: 'sysMsgTemplateId', layout: 'Select', width: '160px', options: [], placeholder: '请选择消息模板' },
    { label: '排序', field: 'sort', width: 'auto', layout: 'Number', placeholder: '请填写排序' },
    { label: '备注', field: 'remark', layout: 'Textarea', width: '270', placeholder: '请填写状态' }
  ]
}

// 消息列表过滤
export const MsgFilterConfig = {
  actions: ['search'],
  filters: [
    { label: '关键字', field: 'keyword', width: '220', layout: 'Text', placeholder: '标题，消息类型' }
  ]
}

// 消息列表过滤
export const AppPowerFilterConfig = {
  actions: ['search','create'],
  filters: [
    { label: '关键字', field: 'keyword', width: '220', layout: 'Text', placeholder: '名称 简称' }
  ]
}

export const AppPowerConfig = {
  actions: ['edit', 'delete'],
  otherActionTitle: [],
  rowKey: 'ID',
  checkbox: true,
  columns: [
    { label: 'App模块名称', field: 'moduleName', layout: 'Text', width: 'auto', placeholder: '请填写App模块名称' },
    { label: 'App模块URL', field: 'moduleUrl', layout: 'Text', width: 'auto', placeholder: '请填写App模块URL' },
    { label: '备注', field: 'remark', layout: 'Textarea', width: 'auto', placeholder: '请填写备注' }
  ]
}


// 预警告信息模板
export const warnMouldManageconfig = {
  actions: ['edit', 'delete'],
  otherActionTitle: [],
  // rowKey: 'ID',
  // checkbox: true,
  columns: [
    { label: '模板编号', field: 'formworkCode', layout: 'Text', width: '200', placeholder: '请填写模板编号' },
    { label: '模板名称', field: 'formworkName', layout: 'Text', width: '200', require: true, placeholder: '请填写模板名称' },
    { label: '模板内容', field: 'content', layout: 'TextEditor', showType: 'underline', underlineText: '模板内容', placeholder: '请填写模板内容' }
  ]
}

// 预警告规则集定义 过滤
export const warnRuleManageFilterConfig = {
  actions: ['search','create'],
  filters: [
    { label: '关键字', field: 'keyword', width: '220', layout: 'Text', placeholder: '规则名称' }
  ]
}

// 预警告规则集定义
export const warnRuleManageconfig = {
  actions: ['edit', 'delete'],
  otherActionTitle: [],
  columns: [
    { label: '规则名称', field: 'definitionName', layout: 'Text', width: '160', placeholder: '请填写规则名称' },
    { label: '规则编码', field: 'definitionCode', layout: 'Text', width: '160', placeholder: '请填写规则编码' },
    { label: '是否启用', field: 'definitionStatus', layout: 'Switch',width: '80', placeholder: '请填写是否启用' },
    { label: '优先级', field: 'grade', layout: 'Text', width: '70', placeholder: '请填写优先级' },
    { label: '提醒目标', field: 'definitionTarget', layout: 'Text', width: '120', placeholder: '请填写提醒目标' },
    { label: '开启时间', field: 'beginTime', layout: 'Text', width: '150', placeholder: '请填写开启时间' },
    { label: '关闭时间', field: 'endTime', layout: 'Text', width: '150', placeholder: '请填写关闭时间' },
    { label: '指标', field: 'quota', layout: 'Text', width: '150', placeholder: '请填写指标' },
    { label: '判定条件', field: 'jcs', layout: 'Text', width: '200', placeholder: '请填写判定条件' },
    { label: '判定条件el解析', field: 'jcsel', layout: 'Text', width: '160', placeholder: '请填写判定条件el解析' },
    { label: '处理描述', field: 'pdn', layout: 'Text', width: '200', placeholder: '请填写处理描述' },
    { label: '预警告模板', field: 'gzyqFormworkId', layout: 'Select', options:[], width: '100', placeholder: '请填写预警告模板' }
  ]
}


// 预警告指标管理
export const warnTargetManageconfig = {
  actions: ['edit', 'delete'],
  otherActionTitle: [],
  columns: [
    { label: '字段名称', field: 'filedName', layout: 'Text', width: 'auto', require: true, placeholder: '请填写字段名称' },
    { label: '字段中文名称', field: 'zwName', layout: 'Text', width: 'auto', placeholder: '请填写字段中文名称' },
    { label: '值类型', field: 'valueType', layout: 'Select',  options: [], width: 'auto', placeholder: '请选择值类型' },
    { label: '状态', field: 'gzyqStatus', layout: 'Radio', options: [], width: 'auto', placeholder: '请选择状态' }
  ]
}

// 预警告指标管理 搜索
export const warnTargetManageFilterConfig = {
  actions: ['search','create'],
  filters: [
    { label: '关键字', field: 'keyword', width: '220', layout: 'Text', placeholder: '字段名称' }
  ]
}
