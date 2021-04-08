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
      <el-button
        class="page-bottom__delete"
        type="warning"
        size="small"
        plain
        :disabled="deleteDisabled"
        @click="deleteBatches"
      >
        <i class="el-icon-delete el-icon--left" />批量删除
      </el-button>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pagerows" @pagination="pagination" />
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
      :roleUserInfo = "roleUserInfo"
      :selectRole = "selectRole"
      :dialog-visible="tableDialogVisible"
      @closeDialog="tableDialogVisible = false"
      @membersVisible="membersVisible"
      @removeMember="removeMember"
      @synchro="synchro"
      @search="search"
      @updataPage="updataPage"
    />
    <!-- 添加人员弹窗 -->
    <add-member-dialog
      :config="initAddMemberConfig()"
      :selectRole = "selectRole"
      :roleUserInfo = "roleUserInfo"
      :dialog-visible="addMembersVisible"
      @closeDialog="addMembersClose"
      @membersVisible="membersVisible"
      @keywordSearch="keywordSearch"
      @contentSearch="contentSearch"
      @treeClick="treeClick"
    />

    <role-permission-dialog
      :moduleInfo="moduleInfo"
      :selectRole="selectRole"
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
  updateRole,
  getRoleUserList,
  RoleTypeSelectBox,
  selectCombox,
  getMenuOrButtonList
} from '@/api/authority-management'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import MemberDialog from './conponments/MemberDialog/index.vue'
import AddMemberDialog from './conponments/AddMemberDialog/index.vue'
import RolePermissionDialog from './conponments/RolePermissionDialog/index.vue'
import {
  UserTableConfig,
  RoleTableConfig,
  RoleFilterConfig
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
      UserTableConfig,
      selectRole: {},
      createDialogVisible: false,
      editDialogVisible: false,
      tableDialogVisible: false,
      addMembersVisible: false,
      authorityVisible: false,
      deleteDisabled: true,
      multipleSelection:[],
      roleUserInfo: {
        roleUserList:[],
        total: 0,
        listQuery: {
          page: 1,
          pagerows: 10
        }
      },
      roleTypeList:[],
      moduleInfo:{
        title: '',
        checkbox: true,
        list:[]
      }
    }
  },

  created() {
    this.__fetchData()
    this.__getRoleType()
    this.__getSiteTree()
  },
  methods: {
    __getSiteTree(){
      selectCombox().then(res => {
        console.log(res);
        // this.treeData.list = res.data
        let tList = res.data
        for(let d in res.data){
          console.log(tList[d],res.data[d]);
          this.siteRecursion(tList[d],res.data[d])
        }
        console.log(tList);
        RoleTableConfig.columns.forEach(it => {
          console.log(it);
          if (it.field === 'sysManageId') {
            it.options = tList
          }
        })
      })
    },
    siteRecursion(list,data){
      console.log(list,data);
      list.label = data.site
      list.value = data.sysManageId
      if(data.children && data.children.length > 0){
        for(let d in data.children){
          this.siteRecursion(list.children[d],data.children[d])
        }
      }
    },
    __getRoleType(){
      RoleTypeSelectBox().then(res => {
        console.log(res)
        this.roleTypeList = res.data
        for(let d in res.data){
          this.roleRecursion(this.roleTypeList[d],res.data[d])
        }
        console.log(this.roleTypeList);

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
    roleRecursion(list,data){
      list.label = data.typeName
      list.value = data.sysRoleTypeId
      if(data.children && data.children.length > 0){
        for(let d in data.children){
          this.roleRecursion(list.children[d],data.children[d])
        }
      }
    },
    __fetchData(_id) {
      console.log(_id);
      this.listLoading = true
      let query = {
        page: this.listQuery.page,
        pagerows: this.listQuery.pagerows,
        entity: {
          "sysRoleTypeId": _id
        },
        sort:{
          asc:["orderNum"]
        }
      }
      console.log();
      getRoleList(query).then(res => {
        console.log(res)
        this.list = res.data.rows
        this.total = parseInt(res.data.records);
        this.listLoading = false;
      })
    },
    pagination(_data){
      console.log(_data);
      this.listQuery.page= _data.page
      this.listQuery.pagerows = _data.pagerows
      this.__fetchData();
    },
    // 查询数据
    queryData(filter) {
      console.log(filter);
      // this.filter = Object.assign(this.filter, filter)
      console.log(this.filter);
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
        width: '900px',
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
        this.$refs.editDialog.updataForm(row)
      }
    },
    // 删除
    deleteClick(id) {
      this.$confirm('确定删除该角色?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(id);
        deleteRole(id.sysRoleId).then(res => {
          this.__fetchData()
          this.$message.success('删除成功')
        })
      })
    },
    selectionChange(val){
      this.multipleSelection = val
      if (this.multipleSelection.length > 0) {
        this.deleteDisabled = false
      } else {
        this.deleteDisabled = true
      }
    },
    // submit data  创建角色
    createSubmit(submitData) {
      console.log(submitData);
      const query = Object.assign(submitData, {
        orderNum: Number(submitData.orderNum) || 0,
        memberNum: Number(submitData.memberNum) || 0
      })
      saveRole(submitData).then(res => {
        console.log(res)
        this.__fetchData()
        this.createDialogVisible = false
        this.$refs.createDialog.resetForm()
        this.$message.success('新建成功')
      })
    },
    editSubmit(submitData) {
      console.log(submitData)
      updateRole(submitData).then(res => {
        console.log(res);
        this.__fetchData()
        this.editDialogVisible = false
        this.$refs.editDialog.resetForm()
        this.$message.success('编辑成功')
      })
    },
    otherClick(row, index, item) {
      console.log(row,index,item);
      console.log(item)
      this.roleUserInfo.roleUserList = []
      this.roleUserInfo.total = 0
      this.roleUserInfo.listQuery.page = 1
      this.roleUserInfo.listQuery.pagerows = 10
      if (item == '管理成员') {
        this.selectRole = row;
        this.tableDialogVisible = true
        const flag = 1
        this.getRoleUserList(this.selectRole.sysRoleId,this.listQuery.page,this.listQuery.pagerows,'',flag)
      } else if (item == '编辑权限') {
        this.selectRole = row;
        this.getRoleMeauList(row.sysRoleId);
        this.authorityVisible = true
      }
    },
    // 获取模块授权信息
    getRoleMeauList(_id){
      let query ={
        parentId: 0,
        roleId: _id,
        type: 1
      }
      getMenuOrButtonList(query).then(res => {
        console.log(res);
        this.moduleInfo.list = res.data
        for(let m in this.moduleInfo.list){
          this.moduleInfoPotting(this.moduleInfo.list[m],this.moduleInfo.list[m].children)
        }
        console.log(this.moduleInfo);
      })
    },
    moduleInfoPotting(module,m_children){
      module.label = module.meta.title
    },
    treeClick(_data){
      console.log(_data);
      this.getRoleUserList(this.selectRole.sysRoleId,this.listQuery.page,this.listQuery.pagerows,'',2,_data.value)
    },
    // 获取角色下的所有用户列表
    getRoleUserList(_id,_page,_rows,_search,_falg,_p_id) {
      console.log(_id,_page,_rows,_search);
      const query = {
        page: _page,
        pagerows: _rows,
        entity: {
          "sysRoleId": _id,
          "userName": _search,
          "loginName": _search,
          "sysDeptId": _p_id
        },
        extra:{
          "flag": _falg
        }
      }
      getRoleUserList(query).then(res => {
        console.log(res);
        this.roleUserInfo.roleUserList = res.data.rows
        this.roleUserInfo.total = Number(res.data.records)
        this.roleUserInfo.page = _page
        this.roleUserInfo.pagerows = _rows
        console.log(this.roleUserInfo);
      })
    },
    updataPage(_data,_num){
      console.log(_data);
      this.getRoleUserList(this.selectRole.sysRoleId,_data.page,_data.limit,'',_num);
    },
    membersVisible() {
      const flag= 2
      this.getRoleUserList(this.selectRole.sysRoleId,this.listQuery.page,this.listQuery.pagerows,'',flag,1)
      this.tableDialogVisible = false
      this.addMembersVisible = true
    },
    addMembersClose() {
      this.getRoleUserList(this.selectRole.sysRoleId,this.listQuery.page,this.listQuery.pagerows,'',1)
      this.tableDialogVisible = true
      this.addMembersVisible = false
    },
    // 移除成员
    removeMember() {
      this.$message({
        message: '恭喜你，移除成功',
        type: 'success'
      })
    },
    // 批量删除
    deleteBatches(){

    },
    // 同步
    synchro(val,_num) {
      this.getRoleUserList(this.selectRole.sysRoleId,this.listQuery.page,this.listQuery.pagerows,'',_num)
      this.$message.success('恭喜你，' + val + '成功')
    },
    // 搜索
    search(val,_num) {
      this.getRoleUserList(this.selectRole.sysRoleId,'1','10',val,_num)
      this.$message.success("查询成功")
    },
    // 通过关键字搜索
    keywordSearch(_id) {
      this.getRoleUserList(this.selectRole.sysRoleId,this.listQuery.page,this.listQuery.pagerows,'',2,_id)
      this.$message({
        message: '恭喜你，搜索成功',
        type: 'success'
      })
    },
    contentSearch(val) {
      console.log(val)
      this.getRoleUserList("",this.listQuery.page,this.listQuery.pagerows,val)
    }
  }
}
</script>
