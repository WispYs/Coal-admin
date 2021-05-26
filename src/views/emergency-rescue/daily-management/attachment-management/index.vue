<template>
  <div class="page-container has-tree" :class="treeExtend ? 'open-tree' : 'close-tree'">
    <tree-bar :tree-data="treeData" @handleNodeClick="handleNodeClick" />

    <div class="tree-form-container">
      <span class="tree-extend-btn" @click="treeExtend = !treeExtend">
        <i :class="treeExtend ? 'el-icon-d-arrow-left': 'el-icon-d-arrow-right'" />
      </span>

      <filter-bar
        :config="DailyManagementFilterConfig"
        @search-click="queryData"
        @create-click="openDialog('create')"
        @reset-click="queryData"
      />
      <!-- 表格 -->
      <list-table
        :id="id"
        :list="list"
        :list-loading="listLoading"
        :config="DailyManagementTableConfig"
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
        :upload-imgs="uploadImgs"
        @close-dialog="createDialogVisible = false"
        @upload-click="(row) => openUploadDialog('createDialog', row)"
        @submit="createSubmit"
      />
      <!-- 编辑弹窗 -->
      <form-dialog
        ref="editDialog"
        :config="initEditConfig()"
        :upload-imgs="uploadImgs"
        :dialog-visible="editDialogVisible"
        @upload-click="(row) => openUploadDialog('editDialog', row)"
        @close-dialog="editDialogVisible = false"
        @submit="editSubmit"
      />

      <!-- 上传附件 -->
      <upload-file
        :data="uploadData"
        :dialog-visible="uploadDialogVisible"
        @close-dialog="uploadDialogVisible = false"
        @upload-submit="uploadSubmit"
      />

    </div>

  </div>
</template>

<script>
import TreeBar from '@/components/TreeBar'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import UploadFile from '@/components/UploadFile'
import {
  getObjectByPage,
  saveObject,
  updateObject,
  delObject,
  getObjectById,
  getDictData,
  getFileNameByEventId,
  deleteBatches
} from '@/api/emergency-rescue'
import {
  DailyManagementTableConfig,
  DailyManagementFilterConfig
} from '@/data/daily-management'

export default {
  components: {
    FilterBar,
    ListTable,
    Pagination,
    FormDialog,
    TreeBar,
    UploadFile
  },
  data() {
    return {
      id: 'attachment-management',
      bussiness: 'yjjyAttachmentManagement',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      DailyManagementFilterConfig,
      DailyManagementTableConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      passwordDialogVisible: false,
      treeExtend: true,
      treeData: {
        title: '',
        list: [
          { value: '0', label: '全部', children: [] }
        ]
      },
      multipleSelection: [], // 多选项
      deleteDisabled: true, // 批量删除置灰
      uploadDialogVisible: false,
      uploadData: null,
      uploadImgs: []
    }
  },

  created() {
    this.__fetchData()
    this.__initOptions()
  },
  methods: {
    // 所属单位
    __initOptions() {
      getDictData(111146).then(res => {
        this.accidentType = res.data
        for (const k in res.data) {
          this.accidentType[k]['value'] = res.data[k]['dictName']
          this.accidentType[k]['label'] = res.data[k]['dictName']
        }
        this.treeData.list[0]['children'] = res.data
        DailyManagementTableConfig.columns.forEach(it => {
          if (it.field === 'type') {
            it.options = res.data
          }
        })
      })
    },

    __fetchData() {
      this.listLoading = true
      const filter = {
        ...this.filter,
        keywordField: ['fileName', 'type']
      }
      const query = Object.assign(this.listQuery, filter)
      getObjectByPage(query, this.bussiness).then(response => {
        response.data.rows.forEach((r, idx) => {
          r.index = idx + 1
        })
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
        form: this.DailyManagementTableConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.DailyManagementTableConfig.columns
      })
      return editConfig
    },
    // 打开弹窗
    openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true
      this.uploadImgs = []

      this.uploadData = {
        menuId: this.$route.name
        // menuId: 90043
      }

      // 如果有数据，更新子组件的 formData
      if (row) {
        getObjectById(row[`${this.bussiness}Id`], this.bussiness).then(async response => {
          const res = response.data
          res.teamType = Number(res.teamType)
          this.$refs.editDialog.updataForm(response.data)
        })
      }
    },
    // 删除
    deleteClick(row) {
      this.$confirm('确定删除该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delObject(row[`${this.bussiness}Id`], this.bussiness).then(response => {
          console.log(response)
          this.$message.success('删除成功')
          this.__fetchData()
        })
      })
    },
    // 新增
    createSubmit(submitData) {
      saveObject(submitData, this.bussiness).then(response => {
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
      updateObject(query, this.bussiness).then(response => {
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
    // 打开上传文件组件
    openUploadDialog(ref, row) {
      // 记录当前打开弹窗ref
      this.dialogRef = ref
      this.uploadDialogVisible = true
      this.uploadRow = row
    },
    // 批量删除
    deleteBatches() {
      const arr = []
      this.multipleSelection.forEach(m => arr.push(m[`${this.bussiness}Id`]))
      if (arr.length === 0) {
        this.$message.warning('请选择所删除的文件')
        return false
      }
      this.$confirm('确定删除所选中文件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBatches(arr, this.bussiness).then(res => {
          this.$message.success('删除成功')
          this.__fetchData()
        })
      })
    },
    // 上传文件控件成功回调
    uploadSubmit(fileList) {
      console.log(fileList)
      this.$refs[this.dialogRef].updateFile(fileList)
      this.uploadDialogVisible = false
    },

    // 点击树形菜单时触发
    handleNodeClick(data) {
      const filter = {
        'entity': {
          type: data.dictName
        }
      }
      console.log(filter)
      this.filter = Object.assign(this.filter, filter)
      this.__fetchData()
    }
  }
}
</script>
