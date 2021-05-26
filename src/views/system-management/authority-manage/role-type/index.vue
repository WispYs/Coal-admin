<template>
  <div class="page-container has-tree" :class="treeExtend ? 'open-tree' : 'close-tree'">
    <tree-bar
      :tree-data="treeData"
      @extend-click="treeExtend = !treeExtend"
      @handleNodeClick="handleNodeClick"
      @searchSite="searchSite"
    />

    <div class="tree-form-container">
      <span class="tree-extend-btn" @click="treeExtend = !treeExtend">
        <i :class="treeExtend ? 'el-icon-d-arrow-left': 'el-icon-d-arrow-right'" />
      </span>
      <filter-bar :config="RoleTypeFilterConfig" @search-click="queryData" @create-click="openDialog('create')" />
      <list-table
        :id="id"
        :list="list"
        :list-loading="listLoading"
        :config="RoleTypeConfig"
        height="calc(100% - 196px)"
        @edit-click="editClick"
        @delete-click="deleteClick"
        @selection-change="selectionChange"
      />
      <div class="page-bottom">
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
    </div>
  </div>
</template>

<script>
import {
  saveRoleType,
  deleteRoleType,
  updateRoleType,
  getRoleTypeList,
  selectCombox,
  getRoleTypeById,
  batchDeleteRoleType
} from '@/api/authority-management'
import TreeBar from '@/components/TreeBar'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import {
  RoleTypeConfig,
  RoleTypeFilterConfig
} from '@/data/authority-management'

export default {
  components: {
    TreeBar,
    FilterBar,
    ListTable,
    Pagination,
    FormDialog
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
      listLoading: true,
      RoleTypeConfig,
      RoleTypeFilterConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      treeExtend: true,
      treeData: {
        title: '选择站点',
        search: true,
        list: []
      },
      filter: {},
      selectData: [],
      updateDisabled: true,
      deleteDisabled: true, // 批量删除置灰
      ManageId: '' // 站点id
    }
  },

  created() {
    this.__fetchData()
    this._getSiteTree()
  },
  methods: {
    _getSiteTree() {
      selectCombox().then(res => {
        this.treeData.list = []
        for (const d in res.data) {
          this.treeData.list.push({
            value: res.data[d].sysManageId,
            label: res.data[d].site
          })
        }
        RoleTypeConfig.columns.forEach(it => {
          if (it.field === 'sysManageId') {
            it.options = this.treeData.list
          }
        })
      })
    },
    __fetchData() {
      this.listLoading = true
      const query = {
        page: this.listQuery.page,
        pagerows: this.listQuery.pagerows,
        entity: {
          'sysManageId': this.ManageId
        },
        keyword: this.filter.keyword,
        keywordField: ['typeName', 'sysManageId'],
        sort: {
          asc: ['orderNum']
        }
      }
      getRoleTypeList(query).then(response => {
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
    pagination(_data) {
      this.listQuery.page = _data.page
      this.listQuery.pagerows = _data.limit
      this.__fetchData()
    },
    // 初始化新建窗口配置
    initCreateConfig() {
      const createConfig = Object.assign({
        title: '新建',
        width: '1000px',
        form: this.RoleTypeConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.RoleTypeConfig.columns
      })
      return editConfig
    },
    // 打开弹窗
    openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true
      if (row) {
        // 如果有数据，更新子组件的 formData
        getRoleTypeById(row.sysRoleTypeId).then(response => {
          this.$refs.editDialog.updataForm(response.data)
        })
      }
    },
    queryData(fliter) {
      this.filter = Object.assign(this.filter, fliter)
      this.__fetchData()
    },
    // submit data  创建角色类型
    createSubmit(submitData) {
      const query = Object.assign(submitData, {
        orderNum: Number(submitData.orderNum) || 0
      })
      saveRoleType(query).then(res => {
        if (res.code == 200) {
          this.__fetchData()
          this.createDialogVisible = false
          this.$refs.createDialog.resetForm()
          this.$message.success('新建成功')
        }
      }).catch(err => {
        this.$refs.createDialog.resetSubmitBtn()
      })
    },
    // 修改角色类型
    editSubmit(submitData) {
      console.log(submitData)
      // this.selectData.sysRoleTypeId  = this.selectData[0].sysRoleTypeId
      updateRoleType(submitData).then(res => {
        if (res.code == 200) {
          this.__fetchData()
          this.editDialogVisible = false
          this.$refs.editDialog.resetForm()
          this.$message.success('编辑成功')
        }
      }).catch(err => {
        this.$refs.editDialog.resetSubmitBtn()
      })
    },
    searchSite(filter) {
      this.filter = Object.assign(this.filter, filter)
      this.__fetchData()
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
        this.updateDisabled = true
      }
    },
    // 点击创建触发
    createClick() {
      this.createDialogVisible = true
    },
    // 点击编辑触发
    editClick(row) {
      if (row) {
        // 如果有数据，更新子组件的 formData
        this.$refs.editDialog.updataForm(row)
        this.editDialogVisible = true
      }
    },
    // 点击删除触发
    deleteClick(_del) {
      this.$confirm('确定删除该角色吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRoleType(_del.sysRoleTypeId).then(res => {
          this.$message.success('删除成功')
          this.__fetchData()
        })
      }).catch((err) => {
        console.log(err)
        this.$message.info('已取消删除')
      })
    },
    // 根据站点查询站点下面的角色类型
    handleNodeClick(_data) {
      this.ManageId = _data.sysManageId
      this.__fetchData()
      this.$message.success('查询成功')
    },
    // 点击同步触发
    synchroClick() {
      this.filter = {}
      this.__fetchData()
      this.$message.success('同步成功')
    },
    deleteBatches() {
      const selectId = []
      this.selectData.forEach(it => selectId.push(it.sysRoleTypeId))
      if (selectId.length === 0) {
        this.$message.warning('请选择所删除的角色')
        return false
      }
      this.$confirm('确定删除所选中角色?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(selectId)
        batchDeleteRoleType(selectId).then(response => {
          this.__fetchData()
          this.$message.success('删除成功')
        })
      })
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
