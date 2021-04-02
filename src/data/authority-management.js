
// 手机号码验证
import { validatePhone } from '@/utils/validate'

// 应用系统管理
export const AppTableConfig = {
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
   * @param {string}  showType          表格内数据显示方式，属于对展现形式有特殊要求的配置项，例如：colorLump 色块显示
   * @param {string}  rowKey            行数据的key，渲染树形表格必填，一般选唯一字段 id
  */
  actions: ['edit', 'delete'],
  checkbox: true,
  columns: [
    { label: '站点名称', field: 'site', width: '160', layout: 'Text', require: true, placeholder: '请填写站点名称' },
    { label: '站点地址', field: 'url', width: '160', layout: 'Text', placeholder: '请填写站点地址' },
    { label: '所属部门', field: 'sysDeptId', width: '120', layout: 'TreeSelect', require: true,
      options: [
        {
          value: 1,
          label: '顾桥矿',
          children: [
            { value: 2, label: '机关', children: [
              { value: 3, label: '矿领导' },
              { value: 4, label: '办公室', children: [
                { value: 5, label: '部门' },
                { value: 6, label: '办公室科室（中央区）' }
              ] },
              { value: 7, label: '人力资源部' }
            ] }
          ]
        }
      ], placeholder: '请选择所属部门' },
    { label: '排序', field: 'orderNum', width: '80', layout: 'Text', placeholder: '请选择排序' },
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
    { label: '登录名', field: 'loginName', width: '90', layout: 'Text', require: true,
      rule: [
        { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }
      ], placeholder: '请填写登录名', message: '唯一的登录名' },
    { label: '姓名', field: 'userName', width: '90', layout: 'Text', require: true, placeholder: '请填写姓名' },
    { label: '工号', field: 'workNumber', width: '100', layout: 'Text', require: true, hidden: true, placeholder: '请填写工号' },
    { label: '密码', field: 'password', width: '100', layout: 'Text', require: true,
      rule: [
        { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
      ], hidden: true, placeholder: '请填写密码', message: '6到18个字符' },
    { label: '手机', field: 'phone', width: '110', layout: 'Text', require: true,
      rule: [
        { validator: validatePhone, trigger: 'blur' }
      ], placeholder: '请填写手机号码' },
    // { label: '电话', field: 'telephone', width: '100', layout: 'Text', hidden: true, placeholder: '请填写电话' },
    { label: '邮箱', field: 'email', width: '100', layout: 'Text', hidden: true, placeholder: '请填写邮箱' },
    // { label: '入职时间', field: 'enterTime', width: '100', layout: 'DateTime', hidden: true, placeholder: '请选择入职时间' },
    // { label: '性别', field: 'gender', width: '70', layout: 'Radio', hidden: true,
    //   options: [
    //     { value: 1, label: '男' },
    //     { value: 2, label: '女' }
    //   ], placeholder: '请选择状态' },
    { label: '部门', field: 'sysDeptId', layout: 'TreeSelect', require: true,
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
      ], placeholder: '请选择部门' },
    // { label: '职务', field: 'position', width: '90', layout: 'Text', placeholder: '请填写职务' },
    // { label: '岗位工种', field: 'workType', layout: 'Text', placeholder: '请填写职务' },
    // { label: '排序', field: 'sort', width: '60', layout: 'Text', hidden: true, placeholder: '请填写排序' },
    { label: '角色', field: 'sysRoleId', layout: 'Select',
      options: [
        { value: 1, label: '影响单位审核' },
        { value: 2, label: '科技创新' }
      ], placeholder: '请选择角色' }
    // { label: '状态', field: 'status', width: '70', layout: 'Radio',
    //   options: [
    //     { value: 1, label: '正常' },
    //     { value: 2, label: '锁定' }
    //   ], placeholder: '请选择状态' },
    // { label: '人员定位卡号', field: 'card', width: '100', layout: 'Text', hidden: true, placeholder: '请填写人员定位卡号' },
    // { label: '备注信息', field: 'remark', width: '100', layout: 'Textarea', hidden: true, placeholder: '请填写备注信息' }

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
    { label: '部门名称', field: 'deptName', width: '160', layout: 'Text', requeire: true, placeholder: '请填写部门名称' },
    { label: '人员编号', field: 'identifier', width: '90', layout: 'Text', requeire: true, placeholder: '请填写人员编号' },
    { label: '人员姓名', field: 'personalName', width: '100', layout: 'Text', requeire: true, placeholder: '请填写人员姓名' },
    { label: '身份证号', field: 'IDNumber', width: '160', layout: 'Text', requeire: true, placeholder: '请填写身份证号' },
    { label: '人员性别', field: 'personalSex', width: '90', layout: 'Radio', requeire: true,
      options: [
        { value: 1, label: '男' },
        { value: 2, label: '女' }
      ], placeholder: '请选择人员性别' },
    { label: '人员生日', field: 'personalBirthdy', width: '100', layout: 'DateTime', requeire: true, placeholder: '请填写人员生日' },
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

export const RoleTypeConfig = {
  // actions: ['other'],
  otherActionTitle: [],
  checkbox: true,
  columns: [
    { label: '名称', field: 'typeName', width: 'auto', layout: 'Text', requeire: true, placeholder: '请填写名称' },
    { label: '站点名称', field: 'site', width: 'auto', layout: 'Select', requeire: true,
      options: [
        { value: 1, label: '顾桥煤矿' },
        { value: 2, label: '合肥煤矿' },
        { value: 3, label: '上海煤矿' }
      ], placeholder: '请选择站点名称' },
    { label: '排序', field: 'orderNum', width: 'auto', layout: 'Text', requeire: true, placeholder: '请填写排序' }
  ]
}

export const OrganizationTree = [
  {
    label: '顾桥煤矿',
    children: [
      {
        label: '机关',
        children: [
          {
            label: '矿领导'
          },
          {
            label: '办公室',
            children: [
              {
                label: '部门'
              },
              {
                label: '办公室科直（中央区）'
              },
              {
                label: '办公室职员（中央区）'
              },
              {
                label: '办公室小车班'
              }
            ]
          }
        ]
      }

    ]
  }
]

// 组织机构管理
export const OrganTableConfig = {
  // actions: ['addIco', 'editIco', 'deleteIco', 'moveUpIco', 'moveDownIco'],
  actions: ['edit', 'delete'],
  rowKey: 'sysDeptId',
  checkbox: true,
  columns: [
    { label: '名称', field: 'deptName', layout: 'Text', require: true, placeholder: '请填写名称' },
    { label: '编号', field: 'sysDeptId', width: '80', layout: 'Text', require: true, placeholder: '请填写编号' },
    { label: '简称', field: 'shortName', layout: 'Text', placeholder: '请填写简称' },
    { label: '类型', field: 'deptType', layout: 'Select', require: true,
      options: [
        { value: 1, label: '井工矿' },
        { value: 2, label: '矿机构' },
        { value: 3, label: '职务' }
      ], placeholder: '请选择类型' },
    { label: '上级节点', field: 'parentId', layout: 'TreeSelect', hidden: true,
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
    { label: '排序', field: 'sort', width: '80', layout: 'Text', requeire: true, placeholder: '请填写排序' },
    { label: '创建日期', field: 'createTime', width: '180', layout: 'DateTime', placeholder: '请选择创建日期' },
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
    { label: '角色名称', field: 'roleName', layout: 'Text', placeholder: '请填写角色名称' },
    // { label: '角色类型', field: 'type', layout: 'Select', options: [
    //   { value: 1, label: '基础通用' },
    //   { value: 2, label: '安全管理专业' },
    //   { value: 3, label: '调度专业' }
    // ], placeholder: '请选择角色类型' },
    // { label: '所属站点', field: 'site', layout: 'Text', placeholder: '请填写所属站点' },
    // { label: '成员数量', field: 'personNum', layout: 'Text', placeholder: '请填写成员数量' },
    // { label: '排序', field: 'sort', layout: 'Text', placeholder: '请填写排序' },
    { label: '备注', field: 'remark', layout: 'Textarea', placeholder: '请填写备注' }

  ]
}

export const RoleFilterConfig = {
  actions: ['search', 'reset', 'create', 'delete'],
  filters: [
    { label: '角色类型', field: 'name', width: '220', layout: 'Select', options: [
      { value: 1, label: '基础通用' },
      { value: 2, label: '安全管理专业' },
      { value: 3, label: '调度专业' }
    ], placeholder: '请选择角色类型' }
  ]
}

// 菜单资源管理
export const menuResourceConfig = {
  actions: ['addIco', 'editIco', 'deleteIco', 'moveUpIco', 'moveDownIco'],
  otherActionTitle: [],
  rowKey: 'id',
  checkbox: true,
  orderNumber: false,
  columns: [
    { label: '名称', field: 'name', width: '170', layout: 'Text', require: true, placeholder: '请填写名称' },
    { label: '编号', field: 'identifier', width: 'auto', layout: 'Text', placeholder: '请选择编号' },
    { label: '类型', field: 'type', width: 'auto', layout: 'Text', placeholder: '请填写类型' },
    { label: '客户端类型', field: 'clientType', width: 'auto', layout: 'Select', require: true, options: [
      { value: 1, label: 'PC端' },
      { value: 2, label: '移动端' }
    ], placeholder: '请选择客户端类型' },
    { label: '显示', field: 'show', width: 'auto', layout: 'Radio', options: [
      { value: 1, label: '可见' },
      { value: 2, label: '隐藏' }
    ], placeholder: '请选择显示' },
    { label: '状态', field: 'state', width: 'auto', layout: 'Radio', options: [
      { value: 1, label: '正常' },
      { value: 2, label: '禁用' }
    ], placeholder: '请选择状态' },
    { label: '地址', field: 'adress', width: 'auto', layout: 'Text', placeholder: '请填写地址' },
    { label: '打开方式', field: 'openType', width: 'auto', layout: 'Select', options: [
      { value: 1, label: '内部嵌入' },
      { value: 2, label: '浏览器弹出' }
    ], placeholder: '请选择打开方式' },
    { label: '数据范围', field: 'dataRange', width: '140', layout: 'Select', options: [
      { value: 1, label: '未知' },
      { value: 2, label: '个人' },
      { value: 3, label: '部门' },
      { value: 4, label: '部门及子部门' },
      { value: 5, label: '公共' },
      { value: 6, label: '自定义' }
    ], placeholder: '请选择数据范围' },
    { label: '数据源', field: 'source', width: '140', layout: 'Select', options: [
      { value: 1, label: '无' },
      { value: 2, label: '默认数据源' },
      { value: 3, label: '技术资源数据源' },
      { value: 4, label: '采掘平面图数据源' },
      { value: 5, label: '企业证照数据源' },
      { value: 6, label: '特殊部门数据源' }
    ], placeholder: '请选择数据源' },
    { label: '排序', field: 'sort', layout: 'Text', width: 'auto', require: true, placeholder: '请填写排序' },
    { label: '备注', field: 'remark', layout: 'Textarea', width: 'auto', placeholder: '请填写备注' }
  ]
}

// 数据字典管理
export const dataDictionaryConfig = {
  actions: ['addIco', 'editIco', 'deleteIco'],
  otherActionTitle: [],
  rowKey: 'id',
  checkbox: true,
  orderNumber: false,
  columns: [
    { label: '名称', field: 'name', width: '170', layout: 'Text', placeholder: '请填写名称' },
    { label: '编号', field: 'identifier', width: 'auto', layout: 'Text', placeholder: '请填写编号' },
    { label: '值', field: 'value', width: 'auto', layout: 'Text', placeholder: '请填写值' },
    { label: '排序', field: 'sort', width: 'auto', layout: 'Text', placeholder: '请填写排序' },
    { label: '类型', field: 'type', width: 'auto', layout: 'Radio', options: [
      { value: 1, label: '类别' },
      { value: 2, label: '项' }
    ], placeholder: '请选择类型' },
    { label: '备注', field: 'remark', width: 'auto', layout: 'Textarea', placeholder: '请填写备注' }
  ]
}

export const memberConfig = {
  actions: [],
  otherActionTitle: [],
  rowKey: 'num',
  checkbox: true,
  columns: [
    { label: '姓名', field: 'name', layout: 'Text', placeholder: '请填写姓名' },
    { label: '登录名', field: 'loginName', layout: 'Select', placeholder: '请选择登录名' },
    { label: '所在部门', field: 'department', layout: 'Text', placeholder: '请填写所在部门' },
    { label: '添加日期', field: 'addDate', layout: 'Text', placeholder: '请填写添加日期' }
  ]
}

export const AddMemberConfig = {
  actions: [],
  otherActionTitle: [],
  rowKey: 'num',
  checkbox: true,
  columns: [
    { label: '登录名', field: 'loginName', layout: 'Select', placeholder: '请选择登录名' },
    { label: '姓名', field: 'name', layout: 'Text', placeholder: '请填写姓名' },
    { label: '部门', field: 'department', layout: 'Text', placeholder: '请填写所在部门' }
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
    { label: '消息类型', field: 'newsType', layout: 'Text', width: 'auto', placeholder: '请填写消息类型' },
    { label: '消息级别', field: 'newsLevel', layout: 'Text', width: 'auto', placeholder: '请填写消息级别' },
    { label: '发生次数', field: 'count', layout: 'Text', width: 'auto', placeholder: '请填写发生次数' },
    { label: '创建时间', field: 'createDate', layout: 'Text', width: 'auto', placeholder: '请填写创建时间' },
    { label: '最近更新', field: 'lastUpdated', layout: 'Text', width: 'auto', placeholder: '请选择最近更新' },
    { label: '状态', field: 'state', layout: 'Text', width: 'auto', placeholder: '请填写状态' },
    { label: '读取人', field: 'reader', layout: 'Text', width: 'auto', placeholder: '请填写读取人' },
    { label: '读取时间', field: 'readTime', layout: 'Text', width: 'auto', placeholder: '请填写读取时间' }
  ]
}

export const NewsTypeConfig = {
  actions: ['addIco', 'editIco', 'deleteIco'],
  otherActionTitle: [],
  rowKey: 'ID',
  checkbox: true,
  columns: [
    { label: 'ID', field: 'ID', layout: 'Text', width: '160', placeholder: '请填写标题' },
    { label: '名称', field: 'name', layout: 'Text', width: '200', require: true, placeholder: '请填写内容' },
    { label: '编号', field: 'identifier', layout: 'Text', width: 'auto', placeholder: '请填写消息类型' },
    { label: '消息级别', field: 'newsLevel', layout: 'Select', width: 'auto', options: [
      { value: 1, label: '通知' },
      { value: 2, label: '协同' },
      { value: 3, label: '报警' }
    ], placeholder: '请选择消息级别' },
    { label: '提醒类型', field: 'newsType', layout: 'Select', width: 'auto', options: [
      { value: 1, label: '无' },
      { value: 2, label: '提示' },
      { value: 3, label: '窗口' }
    ], placeholder: '请选择提醒类型' },
    { label: '目标类型', field: 'targetType', layout: 'Select', width: 'auto', options: [
      { value: 1, label: '自定义' },
      { value: 2, label: '用户' },
      { value: 3, label: '部门' },
      { value: 4, label: '角色' }
    ], placeholder: '请选择提醒类型' },
    { label: '提醒目标', field: 'remindTarget', layout: 'Text', width: 'auto', placeholder: '请选择最近更新' },
    { label: '备注', field: 'remark', layout: 'Text', width: 'auto', placeholder: '请填写状态' }
  ]
}

export const AppPowerConfig = {
  actions: ['addIco', 'editIco', 'deleteIco'],
  otherActionTitle: [],
  rowKey: 'ID',
  checkbox: true,
  columns: [
    { label: 'App模块名称', field: 'moduleName', layout: 'Text', width: 'auto', placeholder: '请填写App模块名称' },
    { label: 'App模块URL', field: 'moduleUrl', layout: 'Text', width: 'auto', placeholder: '请填写App模块URL' },
    { label: '备注', field: 'remark', layout: 'Textarea', width: 'auto', placeholder: '请填写备注' }
  ]
}
