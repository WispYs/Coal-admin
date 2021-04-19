<template>
  <div class="page-container">
    <filter-bar
      :config="DisKnowLedgeFilterConfig"
      @search-click="queryData"
      @create-click="openDialog('create')"
      @reset-click="queryData"
    />
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="DisKnowLedgeTableConfig"
      height="calc(100% - 157px)"
      @text-click="opentextDialog"
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
import { getDisKnowLedgeList, createDisKnowLedge, editDisKnowLedge, getDisKnowLedgeInfo, delDisKnowLedge } from '@/api/mechatronics'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import { DisKnowLedgeTableConfig, DisKnowLedgeFilterConfig } from '@/data/mechatronics'
import TextDialog from './components/TextDialog'
import UploadFile from '@/components/UploadFile'

export default {
  components: { FilterBar, ListTable, Pagination, FormDialog, UploadFile, TextDialog },
  data() {
    return {
      id: 'dissipation-knowledge',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      DisKnowLedgeFilterConfig,
      DisKnowLedgeTableConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      multipleSelection: [], // 多选项
      deleteDisabled: true, // 批量删除置灰
      textDialogVisible: false,
      htmlValue: '', // textDialog弹窗html内容
      uploadRow: null,
      uploadDialogVisible: false
    }
  },
  created() {
    this.__fetchData()
  },
  methods: {
    __fetchData() {
      this.listLoading = true
      const filter = {
        ...this.filter,
        keywordField: ['workNumber', 'loginName', 'userName']
      }
      const query = Object.assign(this.listQuery, filter)
      getDisKnowLedgeList(query).then(response => {
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
        width: '800px',
        form: this.DisKnowLedgeTableConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '800px',
        form: this.DisKnowLedgeTableConfig.columns
      })
      return editConfig
    },
    // 打开弹窗
    openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true
      if (row) {
        getDisKnowLedgeInfo(row.id).then(response => {
          const info = Object.assign(response.data)
          this.$refs.editDialog.updataForm(info)
        })
      }
    },
    // 打开能耗公式、等级评定弹窗
    opentextDialog(value) {
      this.htmlValue = value
      this.textDialogVisible = true
    },

    // 删除
    deleteClick(row) {
      this.$confirm('确定删除该项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(row.id)
        delDisKnowLedge(row.id).then(response => {
          console.log(response)
          this.$message.success('删除成功')
          this.__fetchData()
        })
      })
    },
    // submit data
    createSubmit(submitData) {
      console.log(submitData)
      const query = Object.assign(submitData)
      createDisKnowLedge(query).then(response => {
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
    editSubmit(submitData) {
      const query = Object.assign(submitData)
      editDisKnowLedge(query).then(response => {
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
        this.__fetchData()
        this.$message.success('删除成功')
      })
    },

    openUploadDialog(row) {
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
