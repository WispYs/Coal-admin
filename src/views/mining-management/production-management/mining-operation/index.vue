<template>
  <div class="page-container">
    <filter-bar
      :config="miningOperationFilterConfig"
      @search-click="queryData"
      @create-click="openDialog('create')"
      @reset-click="queryData"
    />
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="miningOperationConfig"
      height="calc(100% - 137px)"
      @text-click="fileDialogVisible = true"
      @edit-click="(row) => openDialog('edit', row)"
      @delete-click="deleteClick"
      @selection-change="selectionChange"
      @submit-data="editSubmit"
      @other-click="otherClick"
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

    <operation-file
      ref="fileDialog"
      :dialog-visible="fileDialogVisible"
      @upload-click="(row) => openUploadDialog('fileDialog', row)"
      @close-dialog="fileDialogVisible = false"
    />
  </div>
</template>

<script>

import {
  getExcavateJobList,
  saveExcavateJob,
  getExcavateJobById,
  updateExcavateJob,
  deleteExcavateJob,
  batchDeleteExcavateJob
} from '@/api/mining-management'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import {
  miningOperationConfig,
  miningOperationFilterConfig
} from '@/data/mining-management'
import OperationFile from './OperationFile'
import UploadFile from '@/components/UploadFile'

export default {
  components: { FilterBar, ListTable, Pagination, FormDialog, OperationFile, UploadFile },
  data() {
    return {
      id: 'mining-operation',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      miningOperationFilterConfig,
      miningOperationConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      fileDialogVisible: false,
      uploadRow: null,
      uploadDialogVisible: false,
      deleteDisabled: true,
      multipleSelection: []
    }
  },
  created() {
    this.__fetchData()
  },
  methods: {
    __fetchData() {
      this.listLoading = true
      const query = {
        page: this.listQuery.page,
        pagerows: this.listQuery.pagerows,
        keyword: this.filter.name,
        keywordField: ['ruleCode', 'ruleName']
      }
      getExcavateJobList(query).then(response => {
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
        form: this.miningOperationConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.miningOperationConfig.columns
      })
      return editConfig
    },
    // 打开弹窗
    openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true
      if (row) {
        getExcavateJobById(row.cjglExcavateJobId).then(response => {
          this.$refs.editDialog.updataForm(response.data)
        })
      }
    },
    // 删除
    deleteClick(row) {
      this.$confirm('确定删除该采掘作业规程?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteExcavateJob(row.cjglExcavateJobId).then(resposne => {
          this.__fetchData()
          this.$message.success('删除成功')
        })
      })
    },
    // 批量删除
    deleteBatches() {
      const selectId = []
      this.multipleSelection.forEach(it => selectId.push(it.cjglExcavateJobId))
      if (selectId.length === 0) {
        this.$message.warning('请选择所删除的采掘作业规程')
        return false
      }
      this.$confirm('确定删除所选中采掘作业规程?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        batchDeleteExcavateJob(selectId).then(response => {
          this.__fetchData()
          this.$message.success('删除成功')
        })
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
    // 创建
    createSubmit(submitData) {
      console.log(submitData)
      saveExcavateJob(submitData).then(response => {
        this.createDialogVisible = false
        this.__fetchData()
        this.$refs.createDialog.resetForm()
        this.$message.success('新建成功')
      }).catch(err => {
        this.$refs.createDialog.resetSubmitBtn()
      })
    },
    // 修改
    editSubmit(submitData) {
      updateExcavateJob(submitData).then(response => {
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
    otherClick(_data, _index, _name) {
      console.log(_data, _index, _name)
      // if (_name == '作业规程文件') {
      //   this.fileDialogVisible = true
      // }
      this.fileDialogVisible = true
    },
    // 上传文件控件成功回调
    uploadSubmit(fileList) {
      console.log(fileList)
      this.$refs[this.dialogRef].updateFile(fileList)
      this.uploadDialogVisible = false
    }
  }
}
</script>
