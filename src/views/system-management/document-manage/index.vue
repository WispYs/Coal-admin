<template>
  <div class="page-container upload-page has-tree" :class="treeExtend ? 'open-tree' : 'close-tree'">
    <tree-bar
      :has-menu="hasMenu"
      :tree-data="treeData"
      @createFolder="createFolder"
      @editFolder="editFolder"
      @delFolder="delFolder"
      @extend-click="treeExtend = !treeExtend"
      @handleNodeClick="handleNodeClick"
      @handleSwitch="handleSwitch"
    />
    <div class="tree-form-container">
      <div class="upload-button">
        <!-- <el-button type="primary" size="medium" @click="openDailog"><i class="el-icon-plus el-icon--left" />新建文件</el-button> -->
        <el-button type="success" size="medium" plain @click="uploadDialogVisible = true"><i class="el-icon-upload el-icon--left" />发布</el-button>
        <el-button size="medium" plain @click="refresh"><i class="el-icon-refresh el-icon--left" />刷新</el-button>
      </div>
      <el-table ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%" height="calc(100% - 153px)" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="根目录">
          <template slot-scope="scope">
            <div class="upload-item">
              <img src="@/assets/images/file.png" alt="">
              <div class="upload-info">
                <h4>{{ scope.row.fileName }}</h4>
                <span>{{ scope.row.updateTime }}</span>
                <span>{{ scope.row.createdBy }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="previewClick(scope.row)">预览</el-button>
            <el-button type="text" size="small" @click="downloadClick(scope.row)">下载</el-button>
            <el-button type="text" size="small" @click="updateClick(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-show="total>0" class="page-bottom">
        <el-button class="page-bottom__delete" type="warning" size="small" plain :disabled="deleteDisabled" @click="deleteBatches"><i class="el-icon-delete el-icon--left" />批量删除</el-button>
        <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pagerows" @pagination="__fetchData" />
      </div>
      <upload-file
        :data="uploadData"
        :dialog-visible="uploadDialogVisible"
        :multiple="false"
        @close-dialog="uploadDialogVisible = false"
        @upload-submit="uploadSubmit"
      />
    </div>

    <!-- 操作弹窗 -->
    <!-- <form-dialog
      ref="operationDialog"
      :config="initOperationConfig()"
      :dialog-visible="operationDialogVisible"
      @close-dialog="operationDialogVisible = false"
      @submit="operationSubmit"
    /> -->

    <!-- 编辑弹窗 -->
    <form-dialog
      ref="editDialog"
      :config="initEditConfig()"
      :dialog-visible="editDialogVisible"
      @close-dialog="editDialogVisible = false"
      @submit="editSubmit"
    />

    <el-dialog
      :title="dialogTitle"
      :visible.sync="operationDialogVisible"
      width="400px"
    >
      <el-form class="dialog-container" label-width="110px" size="medium" :inline="true">
        <el-form-item label="文件夹名称">
          <el-input
            v-model="folderName"
            placeholder="请输入文件夹名称"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="operationDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="operationSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import TreeBar from '@/components/TreeBar'
import Pagination from '@/components/Pagination'
import UploadFile from '@/components/UploadFile'
import FormDialog from '@/components/FormDialog'
import { DocTable, TreeTable } from '@/data/document-management'
import {
  getUploadList,
  updateDocument,
  downloadDocument,
  deleteDocument,
  addFolder,
  updateFolder,
  deleteFolder
} from '@/api/document-management'
import {
  getTree,
  getFolderTree
} from '@/api/tree'

export default {
  components: {
    Pagination,
    UploadFile,
    TreeBar,
    FormDialog
  },
  data() {
    return {
      selectTree: 0,
      uploadData: null,
      folderName: '',
      hasMenu: true,
      tag: null,
      dialogTitle: '添加',
      operationDialogVisible: false,
      editDialogVisible: false,
      // addForm: {
      //   superiorFolder: '根目录',
      //   folderName: '',
      //   sort: '',
      //   note: ''
      // },
      dialogVisible: false,
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      DocTable,
      TreeTable,
      multipleSelection: [],
      uploadDialogVisible: false,
      treeExtend: true,
      deleteDisabled: true,
      treeData: {
        title: '文件夹',
        title2: '部门',
        list: []
      }
    }
  },
  mounted() {
    this.__fetchData()
    this._fetchTreeData()
  },
  methods: {
    createFolder(tag) {
      this.dialogTitle = '添加'
      this.tag = tag
      this.folderName = ''
      this.operationDialogVisible = true
    },
    editFolder(tag) {
      this.dialogTitle = '编辑'
      this.tag = tag
      this.folderName = tag.label
      this.operationDialogVisible = true
    },
    // 删除文件夹
    delFolder(tag) {
      this.$confirm('确定删除所选中文件夹?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await deleteFolder(tag.data.value)
        this._fetchTreeData()
        this.$message.success(res.msg)
      }).catch(() => {
      })
    },
    // 编辑提交
    async editSubmit(submitData) {
      const res = await updateDocument(submitData)
      if (res) {
        const vm = this.$refs.editDialog
        vm.submitLoading = false
        this.editDialogVisible = false
        this.__fetchData()
        this.$message.success(res.msg)
      }
    },
    // 右键菜单操作提交
    async operationSubmit() {
      const editData = {
        sysFileDictId: this.tag.data.value,
        dictName: this.folderName
      }
      const addData = {
        parentId: this.tag.data.value,
        dictName: this.folderName
      }
      const res = this.dialogTitle === '添加' ? await addFolder(addData) : await updateFolder(editData)
      if (res.result === 1) {
        this.$message.success(res.msg)
        this.operationDialogVisible = false
        this._fetchTreeData()
      } else {
        this.$message.error('操作失败')
      }
    },
    initEditConfig() {
      const editConfig = Object.assign({
        title: this.dialogTitle,
        width: '500px',
        form: this.DocTable.columns
      })
      return editConfig
    },
    // initOperationConfig() {
    //   const operationConfig = Object.assign({
    //     title: this.dialogTitle,
    //     width: '500px',
    //     form: this.TreeTable.columns
    //   })
    //   return operationConfig
    // },
    openDailog() {
      this.$message({
        message: '谢谢您，点击新建文件',
        type: 'success'
      })
      this.dialogVisible = true
    },
    // 获取部门树
    async _fetchDepartTreeData() {
      const res = await getTree()
      if (res.result === 1) {
        // res.data[0].deptName = '根目录'
        this.treeData.list = res.data
      }
    },
    async _fetchTreeData(fId = 0) {
      // this.treeData.list = [
      //   {
      //     label: '根目录',
      //     value: 0,
      //     children: [
      //       {
      //       label: '安检'
      //     },
      //     {
      //       label: '采煤'
      //     },
      //     {
      //       label: '掘进（中央区）'
      //     },
      //     {
      //       label: '掘进（南区）'
      //     },
      //     {
      //       label: '机电运输'
      //     },
      //     {
      //       label: '一通三防'
      //     },
      //     {
      //       label: '地面设施'
      //     },
      //     {
      //       label: '维护'
      //     },
      //     {
      //       label: '地质灾害防治'
      //     }
      //     ]
      //   }
      // ]

      const res = await getFolderTree(fId)
      const _list = [{
        label: '根目录',
        value: 0,
        children: []
      }]
      this.treeData.list = _list
      console.log(_list)
      if (res.result === 1) {
        _list[0].children = res.data
        this.treeData.list = _list
      }
    },
    // 获取表格数据
    __fetchData(fId = 0) {
      this.listLoading = true
      const data = {
        'entity': {
          'sysFileDictId': fId
        }
      }
      getUploadList(data).then(response => {
        const res = response.data
        this.listLoading = false
        this.list = res.rows
        this.listQuery.pagerows = Number(res.total)
        this.total = Number(res.records)
        this.listQuery.page = Number(res.page)
      })
    },
    // 切换tree
    handleSwitch(el) {
      const idx = Number(el.index)
      if (idx === 1) {
        this.hasMenu = false
        this._fetchDepartTreeData()
      } else if (idx === 0) {
        this.hasMenu = true
        this._fetchTreeData()
      }
    },
    // 改变所选项
    handleSelectionChange(val) {
      this.multipleSelection = val
      if (this.multipleSelection.length > 0) {
        this.deleteDisabled = false
      } else {
        this.deleteDisabled = true
      }
      console.log(this.multipleSelection)
    },
    // 上传文件控件成功回调
    uploadSubmit(fileList) {
      // console.log(fileList)
      this.uploadDialogVisible = false
      this.__fetchData(this.selectTree)
    },
    // 点击编辑时触发
    updateClick(row) {
      this.editDialogVisible = true
      if (row) {
        // 如果有数据，更新子组件的 formData
        this.$refs.editDialog.updataForm(row)
      }
      // this.$confirm('确定编辑该项目文件?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {

      //   // this.$message.success('编辑成功')
      //   this.__fetchData()
      // })
    },
    // 点击预览时触发
    previewClick() {
      this.$message({
        message: '谢谢您，点击预览',
        type: 'success'
      })
    },
    // 下载文件
    downloadClick(row) {
      const file = {
        fileName: row.fileName,
        uploadPath: row.uploadPath
      }
      downloadDocument(file)
    },
    // 批量删除
    deleteBatches() {
      const selectId = []
      this.multipleSelection.forEach(it => selectId.push(it.sysFileInfoId))
      if (selectId.length === 0) {
        this.$message.warning('请选择所删除的文件')
        return false
      }
      this.$confirm('确定删除所选中文件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const data = selectId
        const res = await deleteDocument(data)
        if (res.result) {
          // console.log(selectId)
          this.__fetchData()
          this.$message.success(res.msg)
        } else {
          this.$message.success('删除失败')
        }
      })
    },
    // 点击刷新时触发
    refresh() {
      // this.$message.success('谢谢您，点击刷新')
      this.__fetchData()
    },
    // 点击树结构时触发
    handleNodeClick(_data) {
      // console.log(_data)
      this.selectTree = _data.value
      this.uploadData = {
        sysFileDictId: this.selectTree
      }
      this.__fetchData(this.selectTree)
      // this.$message.success('点击' + _data.label + '成功')
    }
  }
}
</script>
<style lang="scss" scoped>
  .upload-page {
    .upload-button {
      padding: 10px 0;
      border-bottom: 1px solid #ededed;
    }

    .upload-item {
      img {
        display: inline-block;
        width: 32px;
        height: 32px;
        margin-right: 15px;
      }

      .upload-info {
        display: inline-block;

        h4 {
          font-weight: normal;
          line-height: 20px;
          font-size: 14px;
          margin: 0;
        }

        span {
          font-size: 13px;
          color: #999;
          margin-right: 20px;
        }
      }
    }
  }
</style>
