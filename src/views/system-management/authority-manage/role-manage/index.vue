<template>
  <div class="page-container">
    <filter-bar :config="RoleFilterConfig" @search-click="queryData" @create-click="openDialog('create')" @reset-click="queryData" />
    <list-table :id="id" :list="list" :list-loading="listLoading" :config="RoleTableConfig" @edit-click="(row) => openDialog('edit', row)"
      @delete-click="deleteClick" @submit-data="editSubmit" @other-click='otherClick' />
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="__fetchData" />
    <!-- 新建弹窗 -->
    <form-dialog :config="initCreateConfig()" :dialog-visible="createDialogVisible" @close-dialog="createDialogVisible = false"
      @submit="createSubmit" />

    <!-- 编辑弹窗 -->
    <form-dialog ref="editDialog" :config="initEditConfig()" :dialog-visible="editDialogVisible" @close-dialog="editDialogVisible = false"
      @submit="editSubmit" />

    <!-- 人员管理弹窗 -->
    <member-dialog :config="initTableConfig()" :dialog-visible="tableDialogVisible" @closeDialog="tableDialogVisible = false"
      @membersVisible="membersVisible" @removeMember="removeMember" @synchro="synchro" @search="search" />
    <!-- 添加人员弹窗 -->
    <add-member-dialog :config="initAddMemberConfig()" :dialog-visible="addMembersVisible" @closeDialog="addMembersClose"
      @membersVisible="membersVisible" @keywordSearch="keywordSearch" @contentSearch="contentSearch" />

    <role-permission-dialog :config="initAuthorityConfig()" :dialog-visible="authorityVisible" @closeDialog="authorityVisible = false"
      @membersVisible="membersVisible" />
  </div>
</template>

<script>
  import {
    getRoleList
  } from '@/api/authority-management'
  import FilterBar from '@/components/FilterBar'
  import ListTable from '@/components/ListTable'
  import Pagination from '@/components/Pagination'
  import FormDialog from '@/components/FormDialog'
  import MemberDialog from '@/components/MemberDialog'
  import AddMemberDialog from '@/components/AddMemberDialog'
  import RolePermissionDialog from '@/components/RolePermissionDialog/index.vue'
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
          size: 10
        },
        filter: {}, // 筛选项
        listLoading: true,
        RoleFilterConfig,
        RoleTableConfig,
        UserTableConfig,
        createDialogVisible: false,
        editDialogVisible: false,
        tableDialogVisible: false,
        addMembersVisible: false,
        authorityVisible: false,
      }
    },

    created() {
      this.__fetchData()
    },
    methods: {
      __fetchData() {
        this.listLoading = true
        const query = Object.assign(this.listQuery, this.filter)
        getRoleList(query).then(response => {
          this.listLoading = false
          this.list = response.data.items
          this.total = response.data.total
        })
      },
      // 查询数据
      queryData(filter) {
        this.filter = Object.assign(this.filter, filter)
        this.__fetchData()
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
        this.$confirm('确定删除该站点?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message.success('删除成功')
        })
      },
      // submit data
      createSubmit(submitData) {
        console.log(submitData)
        this.createDialogVisible = false
        this.$message.success('新建成功')
      },
      editSubmit(submitData) {
        console.log(submitData)
        this.editDialogVisible = false
        this.$message.success('编辑成功')
      },
      otherClick(row, index, item) {
        // console.log(row,index,item);
        console.log(item);
        if (item == '管理成员') {
          this.tableDialogVisible = true;
        } else if (item == '编辑权限') {
          this.authorityVisible = true;
        }
      },
      membersVisible() {
        this.tableDialogVisible = false;
        this.addMembersVisible = true;
      },
      addMembersClose() {
        this.tableDialogVisible = true;
        this.addMembersVisible = false;
      },
      // 移除成员
      removeMember() {
        this.$message({
          message: '恭喜你，移除成功',
          type: 'success'
        });
      },
      // 同步
      synchro(val) {
        this.$message({
          message: '恭喜你，同步成功',
          type: 'success'
        });
      },
      // 搜索
      search(val) {
        console.log(val);
        this.$message({
          message: '恭喜你，搜索成功',
          type: 'success'
        });
        this.__fetchData();
      },
      // 通过关键字搜索
      keywordSearch(val) {
        console.log(val);
        this.$message({
          message: '恭喜你，搜索成功',
          type: 'success'
        });
      },
      contentSearch(val) {
        console.log(val);
        this.$message({
          message: '恭喜你，搜索成功',
          type: 'success'
        });
      }
    }
  }
</script>
