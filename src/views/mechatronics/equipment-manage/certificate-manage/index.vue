<template>
  <div class="page-container">
    <filter-bar
      :config="CertificateFilterConfig"
      @search-click="queryData"
      @create-click="openDialog('create')"
      @reset-click="queryData"
    />
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="CertificateTableConfig"
      height="calc(100% - 157px)"
      @edit-click="(row) => openDialog('edit', row)"
      @delete-click="deleteClick"
      @text-click="textClick"
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
    <!-- 附件查看 -->
    <preview-files
      ref="previewFiles"
      :dialog-visible="previewFilesVisible"
      @close-dialog="previewFilesVisible = false"
      @upload-click="(row) => openUploadDialog('previewFiles', row)"
      @update-file="updatePreviewFile"
    />
    <!-- 上传附件 -->
    <upload-file
      :dialog-visible="uploadDialogVisible"
      @close-dialog="uploadDialogVisible = false"
      @upload-submit="uploadSubmit"
    />

  </div>
</template>

<script>
import { getCertificateList, createCertificate, editCertificate, getCertificateInfo, delCertificate, getOrganTree } from '@/api/mechatronics'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import UploadFile from '@/components/UploadFile'
import PreviewFiles from '@/components/PreviewFiles'
import { CertificateTableConfig, CertificateFilterConfig } from '@/data/mechatronics'

export default {
  components: { FilterBar, ListTable, Pagination, FormDialog, UploadFile, PreviewFiles },
  data() {
    return {
      id: 'certificate-manage',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      currentNum: 0, // 当前页数据数量，用于判断删除后是否跳转到上一页
      filter: {}, // 筛选项
      listLoading: true,
      CertificateFilterConfig,
      CertificateTableConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      uploadRow: null,
      uploadDialogVisible: false,
      previewFilesVisible: false, // 附件查看
      multipleSelection: [], // 多选项
      deleteDisabled: true // 批量删除置灰

    }
  },

  created() {
    this.__fetchData()
    this.__initCertType()
  },
  methods: {
    // 初始化证书类型下拉框数据
    __initCertType() {
      // 数据字典 - 证书类型
      const parentId = 111324
      this.$store.dispatch('mecha/getDataDictionary', parentId).then((data) => {
        data.forEach(it => {
          it.value = it.dictValue
          it.label = it.dictName
        })
        CertificateTableConfig.columns.forEach(it => {
          if (it.field === 'certType') {
            it.options = data
          }
        })
        CertificateFilterConfig.filters.forEach(it => {
          if (it.field === 'certType') {
            it.options = data
          }
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    __fetchData() {
      this.listLoading = true
      const filter = {
        ...this.filter,
        keywordField: ['certNo']
      }
      const query = Object.assign(this.listQuery, filter)
      getCertificateList(query).then(response => {
        this.listLoading = false
        this.list = response.data.rows
        this.total = Number(response.data.records)
        this.currentNum = response.data.rows.length
      })
    },
    // 查询数据
    queryData(filter) {
      this.filter = Object.assign(this.filter, filter)
      this.$set(this.listQuery, 'page', 1)
      this.__fetchData()
    },
    // 初始化新建窗口配置
    initCreateConfig() {
      const createConfig = Object.assign({
        title: '新建',
        width: '1000px',
        form: this.CertificateTableConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.CertificateTableConfig.columns
      })
      return editConfig
    },
    // 打开弹窗
    openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true

      // 初始化证书类型下拉框数据，更新config数据
      this.__initCertType()
      // 如果有数据，更新子组件的 formData
      if (row) {
        getCertificateInfo(row.id).then(response => {
          const info = Object.assign(response.data, {
            deviceTypeId: response.data.deviceTypeId + '',
            cycle: response.data.cycle + '',
            dutyBy: response.data.dutyBy + ''
          })
          this.$refs.editDialog.updataForm(info)
        })
      }
    },
    // 附件预览上传回调
    updatePreviewFile(submitData) {
      return new Promise((resolve, reject) => {
        // 编辑方法
        editCertificate(submitData).then(response => {
          this.$message.success('编辑成功')
          this.__fetchData()
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 附件查看
    textClick(value, row, layout) {
      if (layout === 'Upload') {
        this.$refs.previewFiles.updataForm(value, row)
        this.previewFilesVisible = true
      }
    },
    // 删除当前页最后一条数据后跳转到前一页
    /**
     * @params{number} num 删除数量
     */
    changeCurrentPage(num) {
      this.currentNum = this.currentNum - num
      if (this.currentNum <= 0) {
        if (this.listQuery.page > 1) {
          this.$set(this.listQuery, 'page', this.listQuery.page - 1)
        }
      }
    },
    // 删除
    deleteClick(row) {
      this.$confirm('确定删除该项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(row.id)
        delCertificate(row.id).then(response => {
          console.log(response)
          this.$message.success('删除成功')
          this.changeCurrentPage(1)
          this.__fetchData()
        })
      })
    },
    // 新建
    createSubmit(submitData) {
      const query = Object.assign(submitData)
      createCertificate(query).then(response => {
        this.createDialogVisible = false
        this.$message.success('新建成功')
        this.$refs.createDialog.resetForm()
        this.__fetchData()
      }).catch(err => {
        console.log(err)
        this.$refs.createDialog.resetSubmitBtn()
      })
    },
    // 编辑
    editSubmit(submitData) {
      const query = Object.assign(submitData)
      editCertificate(query).then(response => {
        this.editDialogVisible = false
        this.$message.success('编辑成功')
        this.$refs.editDialog.resetForm()
        this.__fetchData()
      }).catch(err => {
        console.log(err)
        this.$refs.createDialog.resetSubmitBtn()
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
      this.multipleSelection.forEach(it => selectId.push(it.id))
      console.log(selectId)
      if (selectId.length === 0) {
        this.$message.warning('请选择所删除的文件')
        return false
      }
      this.$confirm('确定删除所选中文件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(selectId)
        this.$message.success('删除成功')
        this.changeCurrentPage(selectId.length)
        this.__fetchData()
      })
    },
    // 打开上传文件空间
    openUploadDialog(ref, row) {
      // 记录当前打开弹窗ref
      this.dialogRef = ref
      this.uploadDialogVisible = true
      this.uploadRow = row
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
