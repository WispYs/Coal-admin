<template>
  <div class="page-container">
    <filter-bar :config="waterAnalysisBookFilterConfig" @search-click="queryData" @create-click="openDialog('create')" @import-click="importClick" />
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="waterAnalysisBookConfig"
      height="calc(100% - 157px)"
      @edit-click="(row) => openDialog('edit', row)"
      @delete-click="deleteClick"
      @submit-data="editSubmit"
      @selection-change="selectionChange"
      @other-click="otherClick"
    />
    <div v-show="total > 0" class="page-bottom">
      <el-button class="page-bottom__delete" type="warning" size="small" plain :disabled="deleteDisabled" @click="deleteBatches">
        <i class="el-icon-delete el-icon--left" />批量删除
      </el-button>
      <pagination
        v-show="total > 0"
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
      @upload-click="(row) => openUploadDialog('createDialog', row)"
    />
    <!-- 编辑弹窗 -->
    <form-dialog
      ref="editDialog"
      :config="initEditConfig()"
      :dialog-visible="editDialogVisible"
      @close-dialog="editDialogVisible = false"
      @submit="editSubmit"
      @upload-click="(row) => openUploadDialog('editDialog', row)"
    />
    <!-- 展开详情 -->
    <detail-dialog
      ref="detailDialog"
      :config="initDetailConfig()"
      :dialog-visible="detailDialogVisible"
      @close-dialog="detailClose"
      @open-dialog="openDialog"
    />
    <!-- 新建弹窗 -->
    <form-dialog
      ref="createDetailDialog"
      :config="initCreateDetailConfig()"
      :dialog-visible="createDetailDialogVisible"
      @close-dialog="createDetailClose"
      @submit="createDetailSubmit"
    />
    <!-- 详情编辑弹窗 -->
    <form-dialog
      ref="editDetailDialog"
      :config="initEditDetailConfig()"
      :dialog-visible="editDetailDialogVisible"
      @close-dialog="editDetailClose"
      @submit="editDetailSubmit"
    />
    <!-- 上传附件 -->
    <upload-file
      :data="uploadData"
      :dialog-visible="uploadDialogVisible"
      @close-dialog="uploadDialogVisible = false"
      @upload-submit="uploadSubmit"
    />
  </div>
</template>

<script>
import {
  getWaterInfoList,
  saveWaterInfo,
  getWaterInfoById,
  updateWaterInfo,
  deleteWaterInfo,
  batchDeleteWaterInfo,
  getZwitterionById,
  editZwitterionDetail,
  saveZwitterionDetail
} from '@/api/geodesy-prevention'
import {
  waterAnalysisBookConfig,
  waterAnalysisBookFilterConfig,
  waterAnalysisBookDetailConfig,
  waterAnalysisBookDetailFilterConfig
} from '@/data/geodesy-prevention'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import UploadFile from '@/components/UploadFile'
import DetailDialog from './DetailDialog/index.vue'
export default {
  components: {
    FilterBar,
    ListTable,
    Pagination,
    FormDialog,
    UploadFile,
    DetailDialog
  },
  data() {
    return {
      id: 'organization',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      waterAnalysisBookFilterConfig,
      waterAnalysisBookConfig,
      waterAnalysisBookDetailConfig,
      waterAnalysisBookDetailFilterConfig,
      deleteDisabled: true,
      createDialogVisible: false,
      editDialogVisible: false,
      multipleSelection: [],
      uploadDialogVisible: false,
      uploadData: null,
      eventId: [],
      uploadImgs: [],
      detailDialogVisible: false,
      createDetailDialogVisible: false,
      editDetailDialogVisible: false,
      filterConfig: {},
      bookParameter: {}
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
        keywordField: ['hscNoName']
      }
      getWaterInfoList(query).then(response => {
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
        form: this.waterAnalysisBookConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.waterAnalysisBookConfig.columns
      })
      return editConfig
    },
    // 初始化详情窗口配置
    initDetailConfig() {
      const createConfig = Object.assign({
        title: '样本数据',
        width: '1000px',
        filter: this.filterConfig,
        form: this.waterAnalysisBookDetailConfig
      })
      return createConfig
    },
    // 初始化新建明细窗口配置
    initCreateDetailConfig() {
      const createConfig = Object.assign({
        title: '新建',
        width: '1000px',
        form: this.waterAnalysisBookDetailConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditDetailConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.waterAnalysisBookDetailConfig.columns
      })
      return editConfig
    },
    // 打开弹窗
    openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true
      let getListFn = null // 获取详情的接口方法
      let id = ''
      if (name == 'createDetail') {
        const info ={
          hNoName: this.bookParameter.hscNoName,
          qycw:this.bookParameter.qycw,
          dcfzsUnit: 'mg/L'
        }
        this.$refs.createDetailDialog.updataForm(info)
      }
      if (row) {
        if (name.indexOf('edit') > -1) {
          // 如果打开操作查看的新增编辑弹窗
          if (name.indexOf('Detail') > -1) {
            getZwitterionById(row.dcfzsZwitterionId).then(response => {
              const info = Object.assign(response.data)
              info.hNoName= this.bookParameter.hscNoName
              info.qycw = this.bookParameter.qycw
              info.dcfzsUnit = 'mg/L'
              this.$refs[`${name}Dialog`].updataForm(info)
            })
          } else {
            getWaterInfoById(row.dcfzsWaterInfoId).then(response => {
              const info = Object.assign(response.data)
              this.$refs[`${name}Dialog`].updataForm(info)
            })
          }
        }
      }
    },
    // 删除
    deleteClick(row) {
      this.$confirm('确定删除该分析台账?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteWaterInfo(row.dcfzsWaterInfoId).then(response => {
          this.$message.success('删除成功')
          this.__fetchData()
        })
      })
    },
    // 批量删除
    deleteBatches() {
      const selectId = []
      this.multipleSelection.forEach(it => selectId.push(it.dcfzsWaterInfoId))
      if (selectId.length === 0) {
        this.$message.warning('请选择所删除的分析台账')
        return false
      }
      this.$confirm('确定删除所选中分析台账?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        batchDeleteWaterInfo(selectId).then(response => {
          this.__fetchData()
          this.$message.success('删除成功')
        })
      })
    },
    // submit data
    createSubmit(submitData) {
      saveWaterInfo(submitData).then(response => {
        this.__fetchData()
        this.$refs.createDialog.resetForm()
        this.createDialogVisible = false
        this.$message.success('新建成功')
      }).catch(err => {
        this.$refs.createDialog.resetSubmitBtn()
      })
    },
    editSubmit(submitData) {
      updateWaterInfo(submitData).then(response => {
        this.__fetchData()
        this.$refs.editDialog.resetForm()
        this.editDialogVisible = false
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
    importClick() {
      this.$message.info('敬请期待')
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
    otherClick(data) {
      this.bookParameter.dcfzsWaterInfoId = data.dcfzsWaterInfoId
      this.bookParameter.hscNoName = data.hscNoName
      this.bookParameter.qycw = data.qycw
      this.bookParameter.filter = this.waterAnalysisBookDetailFilterConfig
      if (data.isEnter == 1) {
        this.filterConfig = {}
        this.$refs.detailDialog.queryData(this.bookParameter)
      } else {
        this.filterConfig = this.waterAnalysisBookDetailFilterConfig
        this.$refs.detailDialog.clearDate(this.bookParameter)
      }
      this.detailDialogVisible = true
    },
    createDetailSubmit(submitData) {
      const query = Object.assign(submitData, {
        dcfzsWaterInfoId: this.bookParameter.dcfzsWaterInfoId
      })
      saveZwitterionDetail(query).then(response => {
        this.createDetailDialogVisible = false
        this.$refs.createDetailDialog.resetForm()
        this.$refs.detailDialog.queryData(this.bookParameter)
        this.$message.success('新建成功')
      }).catch(err => {
        this.$refs.createDetailDialog.resetSubmitBtn()
      })
    },
    editDetailSubmit(submitData) {
      editZwitterionDetail(submitData).then(response => {
        this.editDetailDialogVisible = false
        this.$message.success('编辑成功')
        this.$refs.editDetailDialog.resetForm()
        this.$refs.detailDialog.queryData(this.bookParameter)
      }).catch(err => {
        this.$refs.editDetailDialog.resetSubmitBtn()
      })
    },
    detailClose() {
      this.detailDialogVisible = false
      this.__fetchData()
    },
    createDetailClose(){
      this.createDetailDialogVisible = false
      this.filterConfig = this.waterAnalysisBookDetailFilterConfig
    },
    editDetailClose() {
      this.editDetailDialogVisible = false
      this.$refs.detailDialog.queryData(this.bookParameter)
    }
  }
}
</script>
