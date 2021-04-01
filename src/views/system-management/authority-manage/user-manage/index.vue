<template>
  <div class="page-container has-tree" :class="treeExtend ? 'open-tree' : 'close-tree'">
    <tree-bar :tree-data="treeData" @extend-click="treeExtend = !treeExtend" @handleNodeClick="handleNodeClick" />

    <div class="tree-form-container">
      <!-- 按钮功能、搜索 -->
      <button-search
        :update-disabled="updateDisabled"
        :delete-disabled="deleteDisabled"
        @openDialog="openDialog"
        @deletePersonnel="deletePersonnel"
        @synchroClick="synchroClick"
        @startSearch="startSearch"
      />
      <!-- 表格 -->
      <list-table
        :id="id"
        :list="list"
        :list-loading="listLoading"
        :config="UserTableConfig"
        @edit-click="(row) => openDialog('edit', row)"
        @delete-click="deleteClick"
        @other-click="openPasswordDialog"
        @submit-data="editSubmit"
        @selectionChange="selectionChange"
      />
      <!-- 分页 -->
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="__fetchData" />
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

      <!-- 重置密码 -->
      <reset-password ref="resetPasswordDialog" :dialog-visible="passwordDialogVisible" @close-dialog="passwordDialogVisible = false" />
    </div>

  </div>
</template>

<script>
import { getUserList, createUser } from '@/api/authority-management'
import TreeBar from '@/components/TreeBar'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import ResetPassword from '@/components/ResetPassword'
import ButtonSearch from './components/button-search/index.vue'
import {
  UserTableConfig,
  UserFilterConfig,
  OrganizationTree
} from '@/data/authority-management'

export default {
  components: {
    TreeBar,
    FilterBar,
    ListTable,
    Pagination,
    FormDialog,
    ResetPassword,
    ButtonSearch
  },
  data() {
    return {
      id: 'user-manage',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      UserFilterConfig,
      UserTableConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      passwordDialogVisible: false,
      treeExtend: true,
      treeData: {
        title: '',
        list: OrganizationTree
      },
      updateDisabled: true,
      deleteDisabled: true,
      personSearch: '',
      selectData: []
    }
  },

  created() {
    this.__fetchData()
  },
  methods: {
    __fetchData() {
      this.listLoading = true
      const query = Object.assign(this.listQuery, this.filter)
      getUserList(query).then(response => {
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
    // 初始化新建窗口配置
    initCreateConfig() {
      const createConfig = Object.assign({
        title: '新建',
        width: '500px',
        form: this.UserTableConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '500px',
        form: this.UserTableConfig.columns
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
      } else if (this.selectData.length == 1) {
        console.log(this.selectData[0])
        this.$refs.editDialog.updataForm(this.selectData[0])
      }
    },
    // 删除
    deleteClick(id) {
      this.$confirm('确定删除该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功')
        this.__fetchData()
      })
    },
    // submit data
    createSubmit(submitData) {
      console.log(submitData)

      const query = Object.assign(submitData, {

      })
      createUser(query).then(response => {
        console.log(response)
        this.createDialogVisible = false
        this.$message.success('新建成功')
        this.$refs.createDialog.resetForm()
        this.__fetchData()
      }).catch(err => {
        console.log(err)
        this.$refs.createDialog.resetForm()
      })
    },
    editSubmit(submitData) {
      console.log(submitData)
      this.editDialogVisible = false
      this.$message.success('编辑成功')
      this.__fetchData()
    },

    // 打开弹窗
    openPasswordDialog(row) {
      this.passwordDialogVisible = true
      if (row) {
        // 如果有数据，更新子组件的 formData
        this.$refs.resetPasswordDialog.updataForm(row)
      }
    },
    // 点击删除时触发
    deletePersonnel() {
      this.$message.success('删除成功')
      this.__fetchData()
    },
    // 点击同步时触发
    synchroClick() {
      this.__fetchData()
      this.$message.success('同步成功')
    },
    // 点击搜索时触发
    startSearch(_search) {
      if (_search) {
        this.__fetchData()
        this.$message.success('查询成功')
      } else {
        this.$message.info('请输入搜索条件')
      }
    },
    selectionChange(_data) {
      this.selectData = _data
      console.log(this.selectData)
      if (this.selectData.length > 0) {
        this.deleteDisabled = false
        if (this.selectData.length == 1) {
          this.updateDisabled = false
        } else {
          this.updateDisabled = true
        }
      } else {
        this.deleteDisabled = true
        this.updateDisabled = true
      }
    },
    // 点击树形菜单时触发
    handleNodeClick(_data) {
      console.log(_data)
      this.__fetchData()
      this.$message.success('点击' + _data.label + '成功')
    }
  }
}
</script>
