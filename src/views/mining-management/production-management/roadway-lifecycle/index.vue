<template>
  <div class="page-container">
    <filter-bar
      :config="roadwayLifecyleFilterConfig"
      @search-click="queryData"
      @create-click="openDialog('create')"
      @reset-click="queryData"
    />
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="roadwayLifecyleConfig"
      height="calc(100% - 137px)"
      @edit-click="(row) => openDialog('edit', row)"
      @other-click="openProgressDialog"
      @delete-click="deleteClick"
      @submit-data="editSubmit"
      @selection-change="selectionChange"
    />
    <div v-show="total > 0" class="page-bottom">
      <el-button class="page-bottom__delete" type="warning" size="small" plain :disabled="deleteDisabled" @click="deleteBatches">
        <i class="el-icon-delete el-icon--left" />批量删除
      </el-button>
      <pagination
        v-show="total>0"
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
      @upload-click="(row) => openUploadDialog('createDialog', row)"
      @close-dialog="createDialogVisible = false"
      @submit="createSubmit"
    />
    <!-- 编辑弹窗 -->
    <form-dialog
      ref="editDialog"
      :config="initEditConfig()"
      :dialog-visible="editDialogVisible"
      @upload-click="(row) => openUploadDialog('editDialog', row)"
      @close-dialog="editDialogVisible = false"
      @submit="editSubmit"
    />

    <!-- 上传附件 -->
    <upload-file
      :dialog-visible="uploadDialogVisible"
      @close-dialog="uploadDialogVisible = false"
      @upload-submit="uploadSubmit"
    />

    <roadway-progress
      ref="progressDialog"
      :dialog-visible="progressDialogVisible"
      @close-dialog="progressDialogVisible = false"
    />
  </div>
</template>

<script>
import {
  getTunnelLifeCycleList,
  getTunnelLifeCycleById,
  updateTunnelLifeCycle,
  saveTunnelLifeCycle,
  deleteTunnelLifeCycle,
  batchDeleteTunnelLifeCycle,
  selectTunnelList,
  getProcessTunnelLifeCycle,
  getTunnelById
} from '@/api/mining-management'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import UploadFile from '@/components/UploadFile'
import { roadwayLifecyleConfig, roadwayLifecyleFilterConfig } from '@/data/mining-management'
import RoadwayProgress from './components/roadway-progress/index.vue'

export default {
  components: { FilterBar, ListTable, Pagination, FormDialog, UploadFile, RoadwayProgress },
  data() {
    return {
      id: 'roadway-lifecycle',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      roadwayLifecyleFilterConfig,
      roadwayLifecyleConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      uploadDialogVisible: false,
      uploadRow: null,
      progressDialogVisible: false,
      deleteDisabled: true,
      multipleSelection: []
    }
  },
  created() {
    this.__fetchData()
    this.__fetchTunnelList()
  },
  methods: {
    __fetchTunnelList() {
      selectTunnelList().then(response => {
        this.roadwayLifecyleConfig.columns.forEach(it => {
          if (it.field == 'tunnelNameId') {
            it.options = response.data
            console.log(it)
          }
        })
      })
    },
    __fetchData() {
      this.listLoading = true
      const query = {
        page: this.listQuery.page,
        pagerows: this.listQuery.pagerows,
        keyword: this.filter.name,
        keywordField: ['tunnelName', 'eventName'],
        sort: { asc: ['orderNum'] }
      }
      getTunnelLifeCycleList(query).then(response => {
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
        form: this.roadwayLifecyleConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.roadwayLifecyleConfig.columns
      })
      return editConfig
    },
    // 打开弹窗
    openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true
      if (row) {
        // 如果有数据，更新子组件的 formData
        getTunnelLifeCycleById(row.cjglTunnelLifeCycleId).then(response => {
          this.$refs.editDialog.updataForm(response.data)
        })
      }
    },
    // 打开其他按钮弹窗
    openProgressDialog(row) {
      this.progressDialogVisible = true
      let query = {}
      getTunnelById(row.tunnelNameId).then(res => {
        getProcessTunnelLifeCycle(row.tunnelNameId).then(response => {
          query = Object.assign(response.data, {
            tunnelName: res.data.tunnelName,
            designerLength: res.data.designerLength
          })
          this.$refs.progressDialog.updataForm(query)
        })
      })
    },
    // 删除
    deleteClick(row) {
      this.$confirm('确定删除该巷道生命周期?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTunnelLifeCycle(row.cjglTunnelLifeCycleId).then(response => {
          this.__fetchData()
          this.$message.success('删除成功')
        })
      })
    },
    // submit data
    createSubmit(submitData) {
      saveTunnelLifeCycle(submitData).then(response => {
        this.createDialogVisible = false
        this.__fetchData()
        this.$refs.createDialog.resetForm()
        this.$message.success('新建成功')
      }).catch(err => {
        this.$refs.createDialog.resetSubmitBtn()
      })
    },
    editSubmit(submitData) {
      updateTunnelLifeCycle(submitData).then(response => {
        this.editDialogVisible = false
        this.__fetchData()
        this.$refs.editDialog.resetForm()
        this.$message.success('编辑成功')
      }).catch(err => {
        this.$refs.editDialog.resetSubmitBtn()
      })
    },
    // 打开上传文件组件
    openUploadDialog(ref, row) {
      // 记录当前打开弹窗ref
      this.dialogRef = ref
      this.uploadDialogVisible = true
      this.uploadRow = row
    },
    // 上传文件控件成功回调
    uploadSubmit(fileList) {
      this.$refs[this.dialogRef].updateFile(fileList)
      this.uploadDialogVisible = false
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
      this.multipleSelection.forEach(it => selectId.push(it.cjglTunnelLifeCycleId))
      if (selectId.length === 0) {
        this.$message.warning('请选择所删除的巷道生命周期')
        return false
      }
      this.$confirm('确定删除所选中巷道生命周期?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        batchDeleteTunnelLifeCycle(selectId).then(response => {
          this.__fetchData()
          this.$message.success('删除成功')
        })
      })
    }
  }
}
</script>
