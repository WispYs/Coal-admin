<template>
  <div class="page-container has-tree" :class="treeExtend ? 'open-tree' : 'close-tree'">
    <tree-bar :tree-data="treeData" @extend-click="treeExtend = !treeExtend" />

    <div class="tree-form-container">
      <h2 style="margin-bottom: 16px;">顾桥煤矿—角色类型</h2>
      <div class="buttons">
        <div class="buttons_item">
          <el-button type="primary" size="medium" @click="openDialog('create')"><i class="el-icon-plus el-icon--left" />创建
          </el-button>
          <el-button type="primary" size="medium" plain :disabled="updateDisabled" @click="editClick('edit')"><i class="el-icon-edit el-icon--left" />编辑
          </el-button>
          <el-button type="danger" size="medium" plain :disabled="deleteDisabled" @click="deletePersonnel"><i class="el-icon-delete el-icon--left" />删除
          </el-button>
          <el-button size="medium" plain @click="synchroClick"><i class="el-icon-refresh el-icon--left" />同步</el-button>
        </div>
      </div>
      <list-table
        :id="id"
        :list="list"
        :list-loading="listLoading"
        :config="RoleTypeConfig"
        @selectionChange="selectionChange"
      />
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.pagerows"
        @pagination="pagination"
      />
      <!-- 新建弹窗 -->
      <form-dialog
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

    </div>

  </div>
</template>

<script>
import { getUserList,saveRoleType,deleteRoleType,updateRoleType,getRoleTypeList,getSiteList } from '@/api/authority-management'
import TreeBar from '@/components/TreeBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import { RoleTypeConfig, OrganizationTree } from '@/data/authority-management'

export default {
  components: { TreeBar, ListTable, Pagination, FormDialog },
  data() {
    return {
      id: 'user-manage',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      listLoading: true,
      RoleTypeConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      treeExtend: true,
      treeData: {
        title: '选择站点',
        search: true,
        list: OrganizationTree
      },
      selectData: [],
      updateDisabled: true,
      deleteDisabled: true
    }
  },

  created() {
    this.__fetchData()
  },
  methods: {
    __fetchData() {
      this.listLoading = true
      const sort = {
        "asc":["orderNum"]
      }
      const query = {
        page: this.listQuery.page,
        pagerows: this.listQuery.size,
        sort: sort
      }
      getRoleTypeList(query).then(res => {
        console.log(res);
        if(res.code == 200){
          this.list = res.data.rows
          this.total = parseInt(res.data.records);
          this.listLoading = false;
        }
      })
    },
    pagination(_data){
      console.log(_data);
      this.listQuery.page = _data.page
      this.listQuery.size =   _data.limit
      this.__fetchData()
    },
    // 初始化新建窗口配置
    initCreateConfig() {
      const createConfig = Object.assign({
        title: '新建',
        width: '800px',
        form: this.RoleTypeConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '800px',
        form: this.RoleTypeConfig.columns
      })
      return editConfig
    },
    // 打开弹窗
    openDialog(name, row) {
      //获取站点列表
      getSiteList(this.listQuery).then(res => {
        console.log(res);
        let siteList = [];
        if(res.code == 200){
          for(let _r in res.data.rows){
            siteList.push({
              value: res.data.rows[_r].sysManageId,
              label: res.data.rows[_r].site
            })
          }
          console.log(siteList);
        }
      })
      const visible = `${name}DialogVisible`
      this[visible] = true
      if (row) {
        // 如果有数据，更新子组件的 formData
        this.$refs.editDialog.updataForm(row)
      }
    },

    // submit data  创建角色类型
    createSubmit(submitData) {
      saveRoleType(submitData).then(res => {
        console.log(res);
        if(res.code == 200){
          this.__fetchData()
          this.createDialogVisible = false
          this.$message.success('新建成功')
        }
      })
    },
    // 修改角色类型
    editSubmit(submitData) {
      this.selectData.sysRoleTypeId  = this.selectData[0].sysRoleTypeId
      updateRoleType(submitData).then(res => {
        if(res.code == 200){
          this.__fetchData()
          this.editDialogVisible = false
          this.$message.success('编辑成功')
        }
      })
    },

    // 勾选checkbox触发
    selectionChange(_data) {
      this.selectData = _data
      if (this.selectData.length > 0) {
        this.deleteDisabled = false
        if (this.selectData.length == 1) {
          this.updateDisabled = false
        } else {
          this.updateDisabled = true
        }
      } else {
        this.deleteDisabled = true
        this.updateDisabled= true
      }
    },
    // 点击创建触发
    createClick() {
      this.createDialogVisible = true
    },
    // 点击编辑触发
    editClick() {
      if (this.selectData.length == 1) {
        // 如果有数据，更新子组件的 formData
        console.log(this.selectData)
        this.$refs.editDialog.updataForm(this.selectData[0])
      }
      this.editDialogVisible = true
    },
    // 点击删除触发
    deletePersonnel() {
      const sysRoleTypeId  = this.selectData[0].sysRoleTypeId
      deleteRoleType(sysRoleTypeId).then(res => {
        console.log(res);
        if(res.code == 200){
          this.__fetchData()
          this.$message.success('删除成功');
        }
      })
    },
    // 点击同步触发
    synchroClick() {
      this.__fetchData()
      this.$message.success('同步成功');
    }
  }
}
</script>
<style lang="scss" scoped>
  .buttons {
    margin-bottom: 16px;

    .buttons_item {
      display: inline-block;
    }
  }
</style>
