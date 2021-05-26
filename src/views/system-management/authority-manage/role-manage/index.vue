<template>
  <div class="page-container">
    <filter-bar :config="RoleFilterConfig" @search-click="queryData" @create-click="openDialog('create')" @reset-click="queryData" />
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="RoleTableConfig"
      height="calc(100% - 157px)"
      @edit-click="(row) => openDialog('edit', row)"
      @delete-click="deleteClick"
      @submit-data="editSubmit"
      @other-click="otherClick"
      @selection-change="selectionChange"
    />
    <div v-show="total>0" class="page-bottom">
      <el-button class="page-bottom__delete" type="warning" size="small" plain :disabled="deleteDisabled" @click="deleteBatches">
        <i class="el-icon-delete el-icon--left" />批量删除
      </el-button>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.pagerows"
        @pagination="pagination"
      />
    </div>
    <!-- 新建弹窗 -->
    <form-dialog
      ref="createDialog"
      :config="initCreateConfig()"
      :dialog-visible="createDialogVisible"
      @close-dialog="createDialogVisible = false"
      @submit="createSubmit"
    />

    <!-- 编辑弹窗 -->
    <form-dialog
      ref="editDialog"
      :config="initEditConfig()"
      :dialog-visible="editDialogVisible"
      @close-dialog="editDialogVisible = false"
      @submit="editSubmit"
    />

    <!-- 人员管理弹窗 -->
    <member-dialog
      :config="initTableConfig()"
      :role-user-info="roleUserInfo"
      :select-role="selectRole"
      :dialog-visible="tableDialogVisible"
      @closeDialog="MembersClose"
      @membersVisible="membersVisible"
      @synchro="synchro"
      @search="search"
      @updataPage="updataPage"
    />
    <!-- 添加人员弹窗 -->
    <add-member-dialog
      :config="initAddMemberConfig()"
      :select-role="selectRole"
      :role-user-info="roleUserInfo"
      :dialog-visible="addMembersVisible"
      @closeDialog="addMembersClose"
      @membersVisible="membersVisible"
      @keywordSearch="keywordSearch"
      @contentSearch="contentSearch"
      @treeClick="treeClick"
      @updataPage="updataPage"
    />

    <role-permission-dialog
      :module-info="moduleInfo"
      :select-role="selectRole"
      :config="initAuthorityConfig()"
      :dialog-visible="authorityVisible"
      @closeDialog="authorityVisible = false"
      @membersVisible="membersVisible"
    />
  </div>
</template>

<script>
import {
  getRoleList,
  saveRole,
  deleteRole,
  batchDeleteRole,
  updateRole,
  getRoleUserList,
  RoleTypeSelectBox,
  selectCombox,
  getMenuOrButtonList,
  getRoleById,
  getOrganTree
} from '@/api/authority-management'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import MemberDialog from './conponments/MemberDialog/index.vue'
import AddMemberDialog from './conponments/AddMemberDialog/index.vue'
import RolePermissionDialog from './conponments/RolePermissionDialog/index.vue'
import {
  RoleTableConfig,
  RoleFilterConfig,
  memberConfig
} from '@/data/authority-management'

export default {
  components: {
    FilterBar,
    ListTable,
    Pagination,
    FormDialog,
    MemberDialog,
    AddMemberDialog,
    RolePermissionDialog
  },
  data() {
    return {
      id: 'application-manage',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      RoleFilterConfig,
      RoleTableConfig,
      selectRole: {},
      createDialogVisible: false,
      editDialogVisible: false,
      tableDialogVisible: false,
      addMembersVisible: false,
      authorityVisible: false,
      deleteDisabled: true,
      multipleSelection: [],
      roleUserInfo: {
        roleUserList: [],
        total: 0,
        deptTree: [],
        memberConfig
      },
      roleTypeList: [],
      moduleInfo: {
        title: '',
        checkbox: true,
        list: [],
        menuId: [],
        loading: true,
        tId: 'sysMenuId'
      }
    }
  },
  created() {
    this.__fetchData()
    this.__getRoleType()
    this.__getSiteTree()
  },
  methods: {
    __getSiteTree() {
      selectCombox().then(res => {
        const tList = []
        for (const d in res.data) {
          tList.push({
            value: res.data[d].sysManageId,
            label: res.data[d].site
          })
        }
        RoleTableConfig.columns.forEach(it => {
          if (it.field === 'sysManageId') {
            it.options = tList
          }
        })
      })
    },
    __getRoleType() {
      RoleTypeSelectBox().then(res => {
        this.roleTypeList = []
        for (const d in res.data) {
          this.roleTypeList.push({
            value: res.data[d].sysRoleTypeId,
            label: res.data[d].typeName,
            sysManageId: res.data[d].sysManageId,
            site: res.data[d].site
          })
        }
        RoleFilterConfig.filters.forEach(it => {
          if (it.field === 'sysRoleTypeId') {
            it.options = this.roleTypeList
          }
        })
        RoleTableConfig.columns.forEach(it => {
          if (it.field === 'sysRoleTypeId') {
            it.options = this.roleTypeList
          }
        })
      })
    },
    __fetchData(_id) {
      this.listLoading = true
      const query = {
        page: this.listQuery.page,
        pagerows: this.listQuery.pagerows,
        entity: {
          'sysRoleTypeId': _id
        },
        sort: {
          asc: ['orderNum']
        }
      }
      getRoleList(query).then(response => {
        if (response.data.rows.length > 0) {
          this.list = response.data.rows
          this.total = parseInt(response.data.records)
          this.listLoading = false
        } else {
          if (this.listQuery.page > 0) {
            this.listQuery.page = this.listQuery.page - 1
            this.__fetchData()
          } else {
            this.listLoading = false
            this.list = []
            this.total = 0
          }
        }
      })
    },
    pagination(_data) {
      this.__fetchData()
    },
    // 查询数据
    queryData(filter) {
      this.__fetchData(filter.sysRoleTypeId)
    },
    // 初始化表格窗口配置
    initTableConfig() {
      const createConfig = Object.assign({
        title: '【通用菜单】成员管理',
        width: '900px',
        type: 'member',
        form: this.RoleTableConfig.columns
      })
      return createConfig
    },
    // 初始化表格窗口配置
    initAddMemberConfig() {
      const createConfig = Object.assign({
        title: '选择用户',
        width: '1000px',
        type: 'addMember',
        form: this.RoleTableConfig.columns
      })
      return createConfig
    },
    initAuthorityConfig() {
      const createConfig = Object.assign({
        title: '设置角色权限',
        width: '900px',
        type: 'authority',
        form: this.RoleTableConfig.columns
      })
      return createConfig
    },
    // 初始化新建窗口配置
    initCreateConfig() {
      const createConfig = Object.assign({
        title: '新建',
        width: '500px',
        form: this.RoleTableConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '500px',
        form: this.RoleTableConfig.columns
      })
      return editConfig
    },
    // 打开弹窗
    openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true
      if (row) {
        // 如果有数据，更新子组件的 formData
        getRoleById(row.sysRoleId).then(response => {
          this.$refs.editDialog.updataForm(response.data)
        })
      }
    },
    // 删除
    deleteClick(id) {
      this.$confirm('确定删除该角色?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole(id.sysRoleId).then(res => {
          this.__fetchData()
          this.$message.success('删除成功')
        })
      })
    },
    selectionChange(val) {
      this.multipleSelection = val
      if (this.multipleSelection.length > 0) {
        this.deleteDisabled = false
      } else {
        this.deleteDisabled = true
      }
    },
    // submit data  创建角色
    createSubmit(submitData) {
      const siteList = this.roleTypeList.filter(p => p.sysRoleTypeId === submitData.value)[0]
      submitData.sysManageId = siteList.sysManageId
      submitData.site = siteList.site
      const query = Object.assign(submitData, {
        orderNum: Number(submitData.orderNum) || 0,
        memberNum: Number(submitData.memberNum) || 0
      })
      saveRole(submitData).then(res => {
        this.__fetchData()
        this.createDialogVisible = false
        this.$refs.createDialog.resetForm()
        this.$message.success('新建成功')
      }).catch(err => {
        this.$refs.createDialog.resetSubmitBtn()
      })
    },
    editSubmit(submitData) {
      const siteList = this.roleTypeList.filter(p => p.sysRoleTypeId === submitData.value)[0]
      submitData.sysManageId = siteList.sysManageId
      submitData.site = siteList.site
      const query = Object.assign(submitData, {
        orderNum: Number(submitData.orderNum) || 0,
        memberNum: Number(submitData.memberNum) || 0
      })
      updateRole(submitData).then(res => {
        this.__fetchData()
        this.editDialogVisible = false
        this.$refs.editDialog.resetForm()
        this.$message.success('编辑成功')
      }).catch(err => {
        this.$refs.createDialog.resetSubmitBtn()
      })
    },
    otherClick(row, index, item) {
      this.roleUserInfo.roleUserList = []
      this.roleUserInfo.total = 0
      if (item == '管理成员') {
        this.selectRole = row
        const flag = 1
        this.getRoleUserList(this.selectRole.sysRoleId, 1, 10, '', flag)
        this.getDeptTree()
        this.tableDialogVisible = true
      } else if (item == '编辑权限') {
        this.selectRole = row
        this.moduleInfo.loading = true
        this.getRoleMeauList(row.sysRoleId)
        this.authorityVisible = true
      }
    },
    getDeptTree() {
      getOrganTree().then(response => {
        this.roleUserInfo.deptTree = response.data
        this.roleUserInfo.memberConfig.columns.forEach(it => {
          if (it.field == 'sysDeptId') {
            it.options = response.data
          }
        })
      })
    },
    // 获取模块授权信息
    getRoleMeauList(_id) {
      const query = {
        parentId: 0,
        roleId: _id
      }
      getMenuOrButtonList(query).then(res => {
        this.moduleInfo.list = res.data.menuTree
        this.moduleInfo.menuId = res.data.checked
        this.moduleInfo.loading = false
      })
    },
    treeClick(_data) {
      this.getRoleUserList(this.selectRole.sysRoleId, this.listQuery.page, this.listQuery.pagerows, '', 2, _data.value)
    },
    // 获取角色下的所有用户列表
    getRoleUserList(_id, _page, _rows, _search, _falg, _p_id) {
      const query = {
        page: _page,
        pagerows: _rows,
        entity: {
          'sysRoleId': _id,
          'sysDeptId': _p_id
        },
        keyword: _search,
        keywordField: ['userName', 'loginName'],
        extra: {
          'flag': _falg
        }
      }
      getRoleUserList(query).then(response => {
        if (response.data.rows.length > 0) {
          this.listLoading = false
          this.roleUserInfo.roleUserList = response.data.rows
          this.roleUserInfo.total = Number(response.data.records)
          this.roleUserInfo.page = _page
          this.roleUserInfo.pagerows = _rows
        } else {
          if (this.listQuery.page > 0) {
            this.listQuery.page = _page - 1
            this.getRoleUserList(_id, _page - 1, _rows, _search, _falg, _p_id)
          } else {
            this.roleUserInfo.roleUserList = []
            this.roleUserInfo.total = 0
            this.roleUserInfo.page = 1
            this.roleUserInfo.pagerows = 10
          }
        }
      }).catch(err => {
        this.listLoading = false
      })
    },
    updataPage(_data, _num) {
      this.getRoleUserList(this.selectRole.sysRoleId, _data.page, _data.limit, '', _num)
    },
    membersVisible() {
      const flag = 2
      this.getRoleUserList(this.selectRole.sysRoleId, this.listQuery.page, this.listQuery.pagerows, '', flag, 1)
      this.tableDialogVisible = false
      this.addMembersVisible = true
    },
    MembersClose() {
      this.tableDialogVisible = false
      this.__fetchData()
    },
    addMembersClose(data) {
      this.getRoleUserList(this.selectRole.sysRoleId, 1, 10, '', 1)
      this.tableDialogVisible = true
      this.addMembersVisible = false
    },
    // 批量删除
    deleteBatches() {
      const selectId = []
      this.multipleSelection.forEach(it => selectId.push(it.sysRoleId))
      if (selectId.length === 0) {
        this.$message.warning('请选择所删除的角色')
        return false
      }
      this.$confirm('确定删除所选中角色?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        batchDeleteRole(selectId).then(response => {
          this.__fetchData()
          this.$message.success('删除成功')
        })
      })
    },
    // 同步
    synchro(page, pagerows, _num) {
      this.getRoleUserList(this.selectRole.sysRoleId, page, pagerows, '', 1, _num)
    },
    // 搜索
    search(val, _num) {
      this.getRoleUserList(this.selectRole.sysRoleId, '1', '10', val, _num)
    },
    // 通过关键字搜索
    keywordSearch(_id) {
      this.getRoleUserList(this.selectRole.sysRoleId, this.listQuery.page, this.listQuery.pagerows, '', 2, _id)
    },
    contentSearch(val) {
      this.getRoleUserList('', this.listQuery.page, this.listQuery.pagerows, val)
    }
  }
}
</script>
