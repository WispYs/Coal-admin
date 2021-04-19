<template>
  <div class="page-container">
    <filter-bar
      :config="certificatePhotoFilterConfig"
      @search-click="queryData"
      @create-click="openDialog('create')"
    />
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="certificatePhotoConfig"
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
      @upload-click="openUploadDialog"
      @close-dialog="createDialogVisible = false"
      @submit="createSubmit"
    />
    <!-- 编辑弹窗 -->
    <form-dialog
      ref="editDialog"
      :config="initEditConfig()"
      :dialog-visible="editDialogVisible"
      @upload-click="openUploadDialog"
      @close-dialog="editDialogVisible = false"
      @submit="editSubmit"
    />
    <!-- 上传附件 -->
    <upload-file
      :dialog-visible="uploadDialogVisible"
      :multiple="false"
      @close-dialog="uploadDialogVisible = false"
      @upload-submit="uploadSubmit"
    />
  </div>
</template>

<script>
import {
    getAqglThreePhoto,
    getaqglThreePhotoById,
    updateAqglThreePhoto,
    saveAqglThreePhoto,
    deleteaqglThreePhoto,
    batchDeleteThreePhoto
  } from '@/api/hidden-danger'
import { getOrganTree } from '@/api/authority-management'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import UploadFile from '@/components/UploadFile'
import { certificatePhotoFilterConfig , certificatePhotoConfig} from '@/data/hidden-danger'
import exportExcel from '@/utils/export-excel'

export default {
  components: {
    FilterBar,
    ListTable,
    Pagination,
    FormDialog,
    UploadFile
  },
  data() {
    return {
      id: 'organization-manage',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: false,
      certificatePhotoConfig,
      certificatePhotoFilterConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      multipleSelection: [], // 多选项
      deleteDisabled: true ,// 批量删除置灰
      uploadRow: null,
      uploadDialogVisible: false
    }
  },
  created() {
    // this.__fetchUnit()
    this.__fetchData()
    // this.__fetchSelectList()
  },

  methods: {
    __fetchData() {
      this.listLoading = false
      const query={
        page: this.listQuery.page,
        pagerows: this.listQuery.pagerows,
        keyword: this.filter.name,
        keywordField:['licenseName','organization']
      }
      getAqglThreePhoto(query).then(response => {
        this.listLoading = false
        this.list = response.data.rows
        console.log(this.list)
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
        width: '800px',
        form: this.certificatePhotoConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '800px',
        form: this.certificatePhotoConfig.columns
      })
      return editConfig
    },
    // 打开弹窗
    openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true
      this.fetchUserList()
      // 如果有数据，更新子组件的 formData
      if (row) {
        getaqglThreePhotoById(row.aqglThreePhotoId).then(response => {
          this.$refs.editDialog.updataForm(response.data)
        })
      }
    },
    fetchUserList(){

    },
    // 删除
    deleteClick(row) {
      this.$confirm('确定删除该组织吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteaqglThreePhoto(row.aqglThreePhotoId).then(response => {
          this.$message.success('删除成功')
          this.__fetchData()
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    // 新增
    createSubmit(submitData) {
      const query = Object.assign(submitData, {
        warningDay1: Number(submitData.warningDay1) || 0,
        callDay: Number(submitData.callDay) || 0,
        repeatRemindCount: Number(submitData.repeatRemindCount) || 0
      })
      saveAqglThreePhoto(query).then(response => {
        console.log(response)
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
      updateAqglThreePhoto(query).then(response => {
        console.log(response)
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
      console.log(this.multipleSelection);
      const selectId = []
      this.multipleSelection.forEach(it => selectId.push(it.aqglThreePhotoId))
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
        const query={
          entityIds:selectId
        }
        batchDeleteThreePhoto(query.entityIds).then(response =>{
          this.__fetchData()
          this.$message.success('删除成功')
        })
      })
    },
    openUploadDialog(row) {
      this.$message.info("敬请期待")
      return
      this.uploadDialogVisible = true
      this.uploadRow = row
    },
    // 上传文件控件成功回调
    uploadSubmit(fileList) {
      console.log(fileList)
      this.uploadDialogVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
