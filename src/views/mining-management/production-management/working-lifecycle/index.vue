<template>
  <div class="page-container">
    <filter-bar
      :config="workingLifectcleFilterConfig"
      @search-click="queryData"
      @create-click="openDialog('create')"
      @reset-click="queryData"
    />
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="workingLifectcleConfig"
      height="calc(100% - 137px)"
      @edit-click="(row) => openDialog('edit', row)"
      @other-click="openProgressDialog"
      @selection-change="selectionChange"
      @delete-click="deleteClick"
      @submit-data="editSubmit"
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

    <working-progress ref="progressDialog" :dialog-visible="progressDialogVisible" @close-dialog="progressDialogVisible = false" />
  </div>
</template>

<script>
import {
  getGzmLifeCycleList,
  getGzmLifeCycleById,
  updateGzmLifeCycle,
  saveGzmLifeCycle,
  selectWorkFacetList,
  deleteGzmLifeCycle,
  batchDeleteGzmLifeCycle,
  getProcessGzmLifeCycle,
  getWorkFacetById
} from '@/api/mining-management'
  // import { getList } from '@/api/working-lifecycle'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import UploadFile from '@/components/UploadFile'
import {
  workingLifectcleConfig,
  workingLifectcleFilterConfig
} from '@/data/mining-management'
import WorkingProgress from './components/working-progress/WorkingProgress.vue'

export default {
  components: {
    FilterBar,
    ListTable,
    Pagination,
    FormDialog,
    UploadFile,
    WorkingProgress
  },
  data() {
    return {
      id: 'working-lifecycle',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      workingLifectcleFilterConfig,
      workingLifectcleConfig,
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
    this.__fetchWorkFace()
  },
  methods: {
    __fetchWorkFace() {
      selectWorkFacetList().then(response => {
        this.workingLifectcleConfig.columns.forEach(it => {
          if (it.field == 'gzmNameId') {
            it.options = response.data
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
        keywordField: ['gzmName', 'remark'],
        sort: { asc: ['orderNum'] }
      }
      getGzmLifeCycleList(query).then(response => {
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
        form: this.workingLifectcleConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.workingLifectcleConfig.columns
      })
      return editConfig
    },
    // 打开弹窗
    openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true
      if (row) {
        getGzmLifeCycleById(row.cjglGzmLifeCycleId).then(response => {
          this.$refs.editDialog.updataForm(response.data)
        })
      }
    },
    // 打开其他按钮弹窗
    openProgressDialog(row) {
      console.log(row)
      this.progressDialogVisible = true
      if (row) {
        let query = {}
        let WorkFace = {}
        getWorkFacetById(row.gzmNameId).then(res => {
          console.log(res.data)
          WorkFace = res.data
          getProcessGzmLifeCycle(row.gzmNameId).then(response => {
            query = Object.assign(response.data, {
              gzmName: res.data.gzmName,
              gzmLength: res.data.gzmLength,
              resourceReserve: res.data.resourceReserve
            })
            console.log(query)
            this.$refs.progressDialog.updataForm(query)
          })
        })
      }
    },
    // 删除
    deleteClick(row) {
      this.$confirm('确定删除该工作面生命周期?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteGzmLifeCycle(row.cjglGzmLifeCycleId).then(resposne => {
          this.__fetchData()
          this.$message.success('删除成功')
        })
      })
    },
    // submit data
    createSubmit(submitData) {
      saveGzmLifeCycle(submitData).then(response => {
        this.createDialogVisible = false
        this.__fetchData()
        this.$refs.createDialog.resetForm()
        this.$message.success('新建成功')
      }).catch(err => {
        this.$refs.createDialog.resetSubmitBtn()
      })
    },
    editSubmit(submitData) {
      updateGzmLifeCycle(submitData).then(response => {
        this.editDialogVisible = false
        this.__fetchData()
        this.$refs.editDialog.resetForm()
        this.$message.success('编辑成功')
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
    },
    // 批量删除
    deleteBatches() {
      const selectId = []
      this.multipleSelection.forEach(it => selectId.push(it.cjglGzmLifeCycleId))
      if (selectId.length === 0) {
        this.$message.warning('请选择所删除的工作面生命周期')
        return false
      }
      this.$confirm('确定删除所选中工作面生命周期?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        batchDeleteGzmLifeCycle(selectId).then(response => {
          this.__fetchData()
          this.$message.success('删除成功')
        })
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
    }
  }
}
</script>
