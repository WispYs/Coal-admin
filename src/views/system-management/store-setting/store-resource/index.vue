<template>
  <div class="page-container">
    <filter-bar
      :config="AppFilterConfig"
      @search-click="queryData"
      @create-click="openDialog('create')"
      @reset-click="queryData"
    />
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="AppTableConfig"
      height="calc(100% - 157px)"
      @edit-click="(row) => openDialog('edit', row)"
      @delete-click="deleteClick"
      @submit-data="editSubmit"
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
      <pagination
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.pagerows"
        @pagination="__fetchData"
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
</template>

<script>
import { getApplicationList, createApplication, editApplication, getApplicationInfo, delApplication, getOrganTree, batchDeleteManage } from '@/api/authority-management'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import { AppTableConfig, AppFilterConfig } from '@/data/authority-management'

export default {
  components: { FilterBar, ListTable, Pagination, FormDialog },
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
      AppFilterConfig,
      AppTableConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      multipleSelection: [], // 多选项
      deleteDisabled: true // 批量删除置灰

    }
  },

  created() {
    this.__fetchData()
  },
  methods: {
    __fetchData() {
      this.listLoading = true
      const entity = {
        ...this.filter
      }
      const sort = {
        sort: {
          asc: ['orderNum']
        }
      }
      const query = Object.assign(this.listQuery, sort, { entity })
      getApplicationList(query).then(response => {
        this.listLoading = false
        this.list = response.data.rows
        this.total = Number(response.data.records)
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
        form: this.AppTableConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.AppTableConfig.columns
      })
      return editConfig
    },
    // 打开弹窗
    openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true
      getOrganTree().then(response => {
        // 更新新增、编辑config数据
        AppTableConfig.columns.forEach(it => {
          if (it.field === 'sysDeptId') {
            it.options = response.data
          }
        })
      })
      // 如果有数据，更新子组件的 formData
      if (row) {
        getApplicationInfo(row.sysManageId).then(response => {
          const info = Object.assign(response.data, {
            sysDeptId: Number(response.data.sysDeptId) || 0
          })
          this.$refs.editDialog.updataForm(info)
        })
      }
    },
    // 删除
    deleteClick(row) {
      this.$confirm('确定删除该站点?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delApplication(row.sysManageId).then(response => {
          this.$message.success('删除成功')
          this.__fetchData()
        })
      })
    },
    // 新建
    createSubmit(submitData) {
      const query = Object.assign(submitData, {
        orderNum: Number(submitData.orderNum) || 0,
        sysDeptId: Number(submitData.sysDeptId) || 0
      })
      createApplication(query).then(response => {
        this.createDialogVisible = false
        this.$message.success('新建成功')
        this.$refs.createDialog.resetForm()
        this.__fetchData()
      }).catch(err => {
        this.$refs.createDialog.resetSubmitBtn()
      })
    },
    // 编辑
    editSubmit(submitData) {
      const query = Object.assign(submitData, {
        orderNum: Number(submitData.orderNum) || 0
      })
      editApplication(query).then(response => {
        this.editDialogVisible = false
        this.$message.success('编辑成功')
        this.$refs.editDialog.resetForm()
        this.__fetchData()
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
    },

    // 批量删除
    deleteBatches() {
      const selectId = []
      this.multipleSelection.forEach(it => selectId.push(it.sysManageId))
      if (selectId.length === 0) {
        this.$message.warning('确定删除该站点')
        return false
      }
      this.$confirm('确定删除该站点?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        batchDeleteManage(selectId).then(response => {
          this.__fetchData()
          this.$message.success('删除成功')
        })
      })
    }

  }
}
</script>
