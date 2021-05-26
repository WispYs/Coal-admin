<template>
  <div class="page-container">
    <filter-bar
      :config="NewsTemplateFilterConfig"
      @search-click="queryData"
      @create-click="openDialog('create')"
    />
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="NewsTemplateConfig"
      @edit-click="(row) => openDialog('edit', row)"
      @text-click="opentextDialog"
      @delete-click="deleteClick"
    />
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pagerows"
      @pagination="__fetchData"
    />
    <form-dialog
      ref="createDialog"
      :config="initCreateConfig()"
      :dialog-visible="createDialogVisible"
      @close-dialog="createDialogVisible = false"
      @upload-click="(row) => openUploadDialog('createDialog', row)"
      @submit="createSubmit"
    />
    <!-- 编辑弹窗 -->
    <form-dialog
      ref="editDialog"
      :config="initEditConfig()"
      :dialog-visible="editDialogVisible"
      @close-dialog="editDialogVisible = false"
      @upload-click="(row) => openUploadDialog('editDialog', row)"
      @submit="editSubmit"
    />
    <!-- 上传附件 -->
    <upload-file
      :dialog-visible="uploadDialogVisible"
      @close-dialog="uploadDialogVisible = false"
      @upload-submit="uploadSubmit"
    />
    <!-- 富文本内容弹窗 -->
    <text-dialog
      ref="textDialog"
      :dialog-visible="textDialogVisible"
      :html-value="htmlValue"
      @close-dialog="textDialogVisible = false"
    />
  </div>
</template>

<script>
import { getMsgTemplateList, getMsgTemplate, updateMsgTemplate, saveMsgTemplate, delMsgTemplate } from '@/api/authority-management'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FilterBar from '@/components/FilterBar'
import FormDialog from '@/components/FormDialog'
import UploadFile from '@/components/UploadFile'
import TextDialog from '@/components/TextDialog'
import { NewsTemplateConfig, NewsTemplateFilterConfig } from '@/data/authority-management'

export default {
  components: { ListTable, Pagination, FilterBar, FormDialog, UploadFile, TextDialog },
  data() {
    return {
      id: '',
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      NewsTemplateConfig,
      NewsTemplateFilterConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      uploadDialogVisible: false,
      textDialogVisible: false,
      htmlValue: '', // textDialog弹窗html内容
      list: []
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
        keyword: this.filter.keyword,
        keywordField: ['templateName'],
        sort: {
          asc: ['sort']
        }
      }
      getMsgTemplateList(query).then(response => {
        if (response.data.rows.length > 0) {
          this.listLoading = false
          this.list = response.data.rows
          this.total = Number(response.data.total)
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
        form: this.NewsTemplateConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.NewsTemplateConfig.columns
      })
      return editConfig
    },
    // 打开弹窗
    openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true
      if (row) {
        getMsgTemplate(row.sysMsgTemplateId).then(response => {
          const info = Object.assign(response.data)
          this.$refs.editDialog.updataForm(info)
        })
      }
    },
    // 删除
    deleteClick(row) {
      this.$confirm('确定删除该模板?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delMsgTemplate(row.sysMsgTemplateId).then(response => {
          this.$message.success('删除成功')
          this.__fetchData()
        })
      })
    },
    // submit data
    createSubmit(submitData) {
      const query = Object.assign(submitData)
      saveMsgTemplate(query).then(response => {
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
      updateMsgTemplate(query).then(response => {
        this.editDialogVisible = false
        this.$message.success('编辑成功')
        this.$refs.editDialog.resetForm()
        this.__fetchData()
      })
    },
    // 打开模板内容弹窗
    opentextDialog(value) {
      console.log(value)
      this.htmlValue = value
      this.textDialogVisible = true
    },
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
<style lang="scss" scoped>
</style>
