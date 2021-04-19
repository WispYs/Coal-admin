<template>
  <div class="page-container upload-page has-tree" :class="treeExtend ? 'open-tree' : 'close-tree'">
    <tree-bar
      :has-menu="hasMenu"
      :tree-data="treeData"
      :menu-config="menuConfig"
      @extend-click="treeExtend = !treeExtend"
      @handleNodeClick="handleNodeClick"
      @handleSwitch="handleSwitch"
    />
    <div class="tree-form-container">
      <span class="tree-extend-btn" @click="treeExtend = !treeExtend">
        <i :class="treeExtend ? 'el-icon-d-arrow-left': 'el-icon-d-arrow-right'" />
      </span>
      <div class="upload-button">
        <!-- <el-button type="primary" size="medium" @click="openDailog"><i class="el-icon-plus el-icon--left" />新建文件</el-button> -->
        <el-button type="primary" size="medium" @click="uploadDialogVisible = true"><i class="el-icon-upload el-icon--left" />上传</el-button>
        <el-button size="medium" plain @click="refresh"><i class="el-icon-refresh el-icon--left" />刷新</el-button>
      </div>
      <el-table ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%" height="calc(100% - 153px)" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="根目录">
          <template slot-scope="scope">
            <div class="upload-item">
              <img :src="getFileType(scope.row)" alt="">
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
  deleteFolder,
  previewDocument,
  getUploadListByDept
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
      // tree右键菜单配置
      menuConfig: [
        {
          menuName: '新建',
          fn: this.createFolder,
          flag: true
        },
        {
          menuName: '编辑',
          fn: this.editFolder,
          flag: true
        },
        {
          menuName: '删除',
          fn: this.delFolder,
          flag: true
        }
      ],
      selectTree: 0,
      uploadData: null,
      folderName: '',
      hasMenu: true,
      tag: null,
      dialogTitle: '添加',
      operationDialogVisible: false,
      editDialogVisible: false,
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
    getFileType(row) {
      // const type = row.suffix
      // const img = ['png', 'jpg', 'jpeg'].includes(type)
      // const doc = ['doc', 'docx'].includes(type)
      // const xls = ['xls', 'xlsx'].includes(type)
      // if (img) {
      //   return require(`@/assets/images/img.png`)
      // }
      // if (doc) {
      //   return require(`@/assets/images/doc.png`)
      // }
      // if (xls) {
      //   return require(`@/assets/images/xls.png`)
      // }

      return require(`@/assets/images/file.png`)
    },
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
    // 右键菜单操作提交
    async operationSubmit() {
      const editData = {
        sysFileDictId: this.tag.data.value,
        dictName: this.folderName
      }
      const addData = {
        parentId: this.tag.data.value,
        dictName: this.folderName,
        menuId: this.$route.name
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
    // 删除文件夹
    delFolder(tag) {
      this.$confirm('确定删除所选中文件夹?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteFolder(tag.data.value).then(res => {
          this._fetchTreeData()
          this.$message.success(res.msg)
        })
      })
    },
    // 编辑提交
    editSubmit(submitData) {
      updateDocument(submitData).then(res => {
        const vm = this.$refs.editDialog
        vm.submitLoading = false
        this.editDialogVisible = false
        this.__fetchData(submitData.sysFileDictId)
        this.$message.success(res.msg)
      })
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
    _fetchDepartTreeData(pId = 0) {
      getTree(pId).then(res => { this.treeData.list = res.data })
    },
    _fetchTreeData(fId = 0) {
      // this.treeData.list = [
      //   {
      //     label: '根目录',
      //     value: 0,
      //     children: [
      //       {
      //          label: '安检'
      //        }
      //     ]
      //   }
      // ]

      const _list = [{
        label: '根目录',
        value: 0,
        children: []
      }]
      this.treeData.list = _list
      getFolderTree(fId, this.$route.name).then(res => {
        _list[0].children = res.data
        this.treeData.list = _list
      })
    },
    // 获取表格数据
    async __fetchData(tId = 0) {
      this.listLoading = true
      const folderData = {
        'entity': {
          'sysFileDictId': tId,
          'menuId': this.$route.name
        }
      }
      const deptData = {
        'entity': {
          'sysDeptId': tId,
          'menuId': this.$route.name
        }
      }
      const d = this.hasMenu ? await getUploadList(Object.assign(folderData, this.listQuery)) : await getUploadListByDept(Object.assign(deptData, this.listQuery))
      if (d.result === 1) {
        const res = d.data
        this.listLoading = false
        this.list = res.rows
        this.total = Number(res.total)
      }
    },
    // 切换tree
    handleSwitch(el) {
      const idx = Number(el.index)
      if (idx === 1) {
        this.hasMenu = false
        this._fetchDepartTreeData()
        this.__fetchData(1)
      } else if (idx === 0) {
        this.hasMenu = true
        this._fetchTreeData()
        this.__fetchData()
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
    previewClick(row) {
      previewDocument(row.sysFileInfoId).then(res => {
        console.log(res)
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
      }).then(() => {
        const data = selectId
        deleteDocument(data).then(res => {
          this.__fetchData()
          this.$message.success(res.msg)
        })
      })
    },
    // 点击刷新时触发
    refresh() {
      this.__fetchData(this.selectTree)
    },
    // 点击树结构时触发
    handleNodeClick(_data) {
      this.selectTree = _data.value
      this.uploadData = this.hasMenu ? {
        sysFileDictId: this.selectTree,
        menuId: this.$route.name
      } : {
        sysDeptId: this.selectTree,
        menuId: this.$route.name
      }
      this.__fetchData(this.selectTree)
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
      display: flex;
      align-content: center;
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
