<template>
  <div class="page-container has-tree" :class="treeExtend ? 'open-tree' : 'close-tree'">
    <tree-bar :tree-data="treeData" @handleNodeClick="handleNodeClick" />

    <div class="tree-form-container">
      <span class="tree-extend-btn" @click="treeExtend = !treeExtend">
        <i :class="treeExtend ? 'el-icon-d-arrow-left': 'el-icon-d-arrow-right'" />
      </span>
      <filter-bar
        :config="UserFilterConfig"
        @search-click="queryData"
        @create-click="openDialog('create')"
        @reset-click="queryData"
      />
      <!-- 表格 -->
      <list-table
        :id="id"
        :list="list"
        :list-loading="listLoading"
        :config="UserTableConfig"
        height="calc(100% - 157px)"
        @edit-click="(row) => openDialog('edit', row)"
        @delete-click="deleteClick"
        @other-click="resetPassword"
        @submit-data="editSubmit"
        @selection-change="selectionChange"
      />

      <div v-show="total>0" class="page-bottom">
        <el-button class="page-bottom__delete" type="warning" size="small" plain :disabled="deleteDisabled" @click="deleteBatches">
          <i class="el-icon-delete el-icon--left" />批量删除
        </el-button>
        <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pagerows" @pagination="__fetchData" />
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

      <!-- 重置密码 -->
      <reset-password ref="resetPasswordDialog" :dialog-visible="passwordDialogVisible" @close-dialog="passwordDialogVisible = false" />
    </div>

  </div>
</template>

<script>
import {
  getUserList,
  createUser,
  getUserInfo,
  editUser,
  delUser,
  batchDeleteUser,
  resetUserPassword,
  getOrganTree
} from '@/api/authority-management'
import {
  getsysDictListById
} from '@/api/hidden-danger'
import TreeBar from '@/components/TreeBar'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import ResetPassword from '@/components/ResetPassword'
import {
  UserTableConfig,
  UserFilterConfig
} from '@/data/authority-management'

export default {
  components: {
    TreeBar,
    FilterBar,
    ListTable,
    Pagination,
    FormDialog,
    ResetPassword
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
        list: []
      },
      multipleSelection: [], // 多选项
      deleteDisabled: true // 批量删除置灰
    }
  },

  created() {
    this.__updateOrganTree()
    this.__fetchSelectList()
    this.__fetchData()
  },
  methods: {
    __fetchSelectList() {
      const query = [{
        // 男女
        parentId: 111153
      }, {
        // 用户状态
        parentId: 111156
      }]
      for (const q in query) {
        getsysDictListById(query[q].parentId).then(response => {
          const selectList = []
          for (const m in response.data) {
            selectList.push({
              value: response.data[m].sysDictId,
              label: response.data[m].dictName
            })
          }
          this.UserTableConfig.columns.forEach(it => {
            if (query[q].parentId == 111153) {
              if (it.field === 'sex') {
                it.options = selectList
              }
            } else if (query[q].parentId == 111156) {
              if (it.field === 'status') {
                it.options = selectList
              }
            }
          })
        })
      }
    },
    // 接口获取组织机构树
    __updateOrganTree() {
      getOrganTree().then(response => {
        // 更新左侧树结构数据
        this.treeData.list = response.data
        // 更新新增、编辑config数据
        UserTableConfig.columns.forEach(it => {
          if (it.field === 'sysDeptId') {
            it.options = response.data
          }
        })
      })
    },
    __fetchData() {
      this.listLoading = true
      const filter = {
        ...this.filter,
        keywordField: ['workNumber', 'loginName', 'userName']
      }
      const query = Object.assign(this.listQuery, filter)
      getUserList(query).then(response => {
        if (response.data.rows.length > 0) {
          this.listLoading = false
          this.list = response.data.rows
          this.total = Number(response.data.records)
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
      }).catch(err => {
        this.listLoading = false
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
        width: '1000px',
        form: this.UserTableConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.UserTableConfig.columns
      })
      return editConfig
    },
    // 打开弹窗
    openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true

      // 接口获取组织机构树，更新config数据
      this.__updateOrganTree()

      // 如果有数据，更新子组件的 formData
      if (row) {
        getUserInfo(row.sysUserId).then(response => {
          const info = Object.assign(response.data, {
            sex: String(response.data.sex),
            status: String(response.data.status)
          })
          this.$refs.editDialog.updataForm(info)
        })
      }
    },
    // 删除
    deleteClick(row) {
      this.$confirm('确定删除该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delUser(row.sysUserId).then(response => {
          this.$message.success('删除成功')
          this.__fetchData()
        })
      })
    },
    // 新增
    createSubmit(submitData) {
      const query = Object.assign(submitData, {
        sysRoleId: Number(submitData.sysRoleId) || 0,
        sysDeptId: Number(submitData.sysDeptId) || 0
      })
      createUser(query).then(response => {
        this.createDialogVisible = false
        this.$message.success('新建成功')
        this.$refs.createDialog.resetForm()
        this.__fetchData()
      }).catch(err => {
        this.$refs.createDialog.resetSubmitBtn()
      })
    },
    editSubmit(submitData) {
      const query = Object.assign(submitData)
      editUser(query).then(response => {
        this.editDialogVisible = false
        this.$message.success('编辑成功')
        this.$refs.editDialog.resetForm()
        this.__fetchData()
      }).catch(err => {
        this.$refs.editDialog.resetSubmitBtn()
      })
    },
    // 改变所选项
    selectionChange(val) {
      this.multipleSelection = val
      if (this.multipleSelection.length > 0) {
        this.deleteDisabled = false
      } else {
        this.deleteDisabled = true
      }
      console.log(this.multipleSelection)
    },
    // 批量删除
    deleteBatches() {
      const selectId = []
      this.multipleSelection.forEach(it => selectId.push(it.sysUserId))
      if (selectId.length === 0) {
        this.$message.warning('请选择所删除的用户')
        return false
      }
      this.$confirm('确定删除所选中用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        batchDeleteUser(selectId).then(response => {
          this.__fetchData()
          this.$message.success('删除成功')
        })
      })
    },
    // 重置密码
    resetPassword(row) {
      this.$confirm('是否重置为默认密码?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        resetUserPassword(row.sysUserId).then(response => {
          this.$message.success('重置成功')
          this.__fetchData()
        })
      })
    },
    // 点击树形菜单时触发
    handleNodeClick(data) {
      const entity = {
        sysDeptId: data.value
      }
      this.filter = Object.assign(this.filter, {
        entity
      })
      this.__fetchData()
    }
  }
}
</script>
