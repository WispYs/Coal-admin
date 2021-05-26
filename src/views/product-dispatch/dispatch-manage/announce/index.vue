<template>
  <div class="page-container has-tree" :class="treeExtend ? 'open-tree' : 'close-tree'">
    <tree-bar
      ref="treeBar"
      :tree-data="treeData"
      :default-props="treeProp"
      @handleNodeClick="handleNodeClick"
    />

    <div class="tree-form-container">
      <span class="tree-extend-btn" @click="treeExtend = !treeExtend">
        <i :class="treeExtend ? 'el-icon-d-arrow-left': 'el-icon-d-arrow-right'" />
      </span>
      <filter-bar
        :config="DispatchAnnounceFilterConfig"
        @search-click="queryData"
        @create-click="openDialog('create')"
        @reset-click="queryData"
      />
      <!-- 表格 -->
      <list-table
        :id="id"
        :list="list"
        :list-loading="listLoading"
        :config="DispatchAnnounceTableConfig"
        height="calc(100% - 157px)"
        @edit-click="(row) => openDialog('edit', row)"
        @other-click="otherClick"
        @text-click="textClick"
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
      <!-- 附件查看 -->
      <preview-files
        ref="previewFiles"
        :dialog-visible="previewFilesVisible"
        @close-dialog="previewFilesVisible = false"
        @upload-click="(row) => openUploadDialog('previewFiles', row)"
        @update-file="updatePreviewFile"
      />
      <!-- 富文本内容弹窗 -->
      <text-dialog
        ref="textDialog"
        :dialog-visible="textDialogVisible"
        :html-value="htmlValue"
        @close-dialog="textDialogVisible = false"
      />
    </div>

  </div>
</template>

<script>
import { getDispatchAnnounceList, createDispatchAnnounce, getDispatchAnnounceInfo, editDispatchAnnounce, delDispatchAnnounce, batchDeleteDispatchAnnounce } from '@/api/product-dispatch'
import TreeBar from '@/components/TreeBar'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import UploadFile from '@/components/UploadFile'
import PreviewFiles from '@/components/PreviewFiles'
import TextDialog from '@/components/TextDialog'
import { DispatchAnnounceTableConfig, DispatchAnnounceFilterConfig } from '@/data/product-dispatch'
export default {
  components: {
    TreeBar,
    FilterBar,
    ListTable,
    Pagination,
    FormDialog,
    UploadFile,
    PreviewFiles,
    TextDialog
  },
  data() {
    return {
      id: 'dispatch-announce',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      currentNum: 0, // 当前页数据数量，用于判断删除后是否跳转到上一页
      filter: {}, // 筛选项
      listLoading: true,
      DispatchAnnounceFilterConfig,
      DispatchAnnounceTableConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      treeExtend: true,
      treeData: {
        title: '公告分类',
        tId: 'id',
        list: []
      },
      treeProp: {
        children: 'children',
        label: 'label'
      },
      uploadRow: null, // 上传文件信息
      uploadDialogVisible: false,
      previewFilesVisible: false, // 附件查看
      multipleSelection: [], // 多选项
      deleteDisabled: true, // 批量删除置灰
      textDialogVisible: false,
      htmlValue: '' // textDialog弹窗html内容
    }
  },

  created() {
    this.__fetchData()
  },
  mounted() {
    this.__updateAnnounceTree()
  },
  methods: {
    // 获取公告分类
    __updateAnnounceTree() {
      // 数据字典 - 公告分类
      const parentId = 111309
      this.$store.dispatch('mecha/getDataDictionary', parentId).then((data) => {
        data.forEach(it => {
          it.id = it.dictValue
          it.value = it.dictValue
          it.label = it.dictName
        })
        this.treeData.list = [{
          id: '',
          label: '全部',
          children: data
        }]
        // 设置树结构默认选中项
        this.$refs.treeBar.setCurrentKey('')

        DispatchAnnounceTableConfig.columns.forEach(it => {
          if (it.field === 'type') {
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
        keywordField: ['title', 'type']
      }
      console.log(this.filter)
      const query = Object.assign(this.listQuery, filter)
      getDispatchAnnounceList(query).then(response => {
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
        form: this.DispatchAnnounceTableConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.DispatchAnnounceTableConfig.columns
      })
      return editConfig
    },

    // 打开弹窗
    openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true

      // 如果有数据，更新子组件的 formData
      if (row) {
        getDispatchAnnounceInfo(row.scddAnnouncementId).then(response => {
          console.log(response)
          const info = Object.assign(response.data)
          this.$refs.editDialog.updataForm(info)
        })
      }
    },
    // 附件预览上传回调
    updatePreviewFile(submitData) {
      return new Promise((resolve, reject) => {
        // 编辑方法
        editDispatchAnnounce(submitData).then(response => {
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
    // 预览、下载按钮
    otherClick(row, index, item) {
      if (item === '预览') {
        this.htmlValue = row.content
        this.textDialogVisible = true
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
        delDispatchAnnounce(row.scddAnnouncementId).then(response => {
          this.$message.success('删除成功')
          this.changeCurrentPage(1)
          this.__fetchData()
        })
      })
    },
    // 新增
    createSubmit(submitData) {
      const query = Object.assign(submitData)
      createDispatchAnnounce(query).then(response => {
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
      editDispatchAnnounce(query).then(response => {
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
      this.multipleSelection.forEach(it => selectId.push(it.scddAnnouncementId))
      if (selectId.length === 0) {
        this.$message.warning('请选择所删除的项')
        return false
      }
      this.$confirm('确定删除所选中项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        batchDeleteDispatchAnnounce(selectId).then(response => {
          this.$message.success('删除成功')
          this.changeCurrentPage(selectId.length)
          this.__fetchData()
        })
      })
    },

    // 点击树形菜单时触发
    handleNodeClick(data) {
      console.log(data)
      const search = data.label === '全部' ? '' : data.label
      this.queryData({ keyword: search })
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
