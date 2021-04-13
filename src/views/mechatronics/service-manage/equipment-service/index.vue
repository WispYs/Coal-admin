<template>
  <div class="page-container has-tree" :class="treeExtend ? 'open-tree' : 'close-tree'">
    <tree-bar :tree-data="treeData" @handleNodeClick="handleNodeClick" />

    <div class="tree-form-container">
      <span class="tree-extend-btn" @click="treeExtend = !treeExtend">
        <i :class="treeExtend ? 'el-icon-d-arrow-left': 'el-icon-d-arrow-right'" />
      </span>
      <filter-bar
        :config="EquipmentServiceFilterConfig"
        @search-click="queryData"
        @create-click="openDialog('create')"
        @check-spare="checkSpareVisible = true"
        @reset-click="queryData"
      />
      <!-- 表格 -->
      <list-table
        :id="id"
        :list="list"
        :list-loading="listLoading"
        :config="EquipmentServiceTableConfig"
        height="calc(100% - 157px)"
        @edit-click="(row) => openDialog('edit', row)"
        @delete-click="deleteClick"
        @other-click="serviceProgressVisible = true"
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
      <!-- 检修进展 -->
      <service-progress
        ref="serviceProgress"
        :dialog-visible="serviceProgressVisible"
        @close-dialog="serviceProgressVisible = false"
      />
      <!-- 查看备品备件 -->
      <check-spare
        ref="checkSpare"
        :dialog-visible="checkSpareVisible"
        @close-dialog="checkSpareVisible = false"
      />
      <!-- 上传附件 -->
      <upload-file
        :dialog-visible="uploadDialogVisible"
        :multiple="false"
        @close-dialog="uploadDialogVisible = false"
        @upload-submit="uploadSubmit"
      />

    </div>

  </div>
</template>

<script>
import { getEquipmentServiceList, createUser, getUserInfo, editUser, delUser, getEquipmentArea } from '@/api/mechatronics'
import TreeBar from '@/components/TreeBar'
import FilterBar from './components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import UploadFile from '@/components/UploadFile'
import ServiceProgress from './components/ServiceProgress'
import CheckSpare from './components/CheckSpare'
import { EquipmentServiceTableConfig, EquipmentServiceFilterConfig } from '@/data/mechatronics'

export default {
  components: {
    TreeBar,
    FilterBar,
    ListTable,
    Pagination,
    FormDialog,
    UploadFile,
    ServiceProgress,
    CheckSpare
  },
  data() {
    return {
      id: 'service-progress',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      EquipmentServiceFilterConfig,
      EquipmentServiceTableConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      serviceProgressVisible: false, // 进展弹窗
      checkSpareVisible: false, // 查看备品备件
      treeExtend: true,
      treeData: {
        title: '',
        list: [
          {
            value: 0,
            label: '全部',
            children: [{ value: 1, label: '已处理' }, { value: 2, label: '未处理' }]
          }
        ]
      },
      uploadRow: null, // 上传文件信息
      uploadDialogVisible: false,
      multipleSelection: [], // 多选项
      deleteDisabled: true // 批量删除置灰
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
      getEquipmentServiceList(query).then(response => {
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
        form: this.EquipmentServiceTableConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '800px',
        form: this.EquipmentServiceTableConfig.columns
      })
      return editConfig
    },

    // 打开弹窗
    openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true

      // 如果有数据，更新子组件的 formData
      if (row) {
        this.$refs[`${name}Dialog`].updataForm(row)
        // getUserInfo(row.sysUserId).then(response => {
        //   const info = Object.assign(response.data, {
        //     sysDeptId: Number(response.data.sysDeptId) || 0,
        //     sysRoleId: Number(response.data.sysRoleId) || 0
        //   })
        //   this.$refs.editDialog.updataForm(info)
        // })
      }
    },
    // 删除
    deleteClick(row) {
      this.$confirm('确定删除该项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(row.sysUserId)
        delUser(row.sysUserId).then(response => {
          console.log(response)
          this.$message.success('删除成功')
          this.__fetchData()
        })
      })
    },
    // 新增
    createSubmit(submitData) {
      console.log(submitData)

      const query = Object.assign(submitData, {
        sysRoleId: Number(submitData.sysRoleId) || 0,
        sysDeptId: Number(submitData.sysDeptId) || 0
      })
      createUser(query).then(response => {
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
      editUser(query).then(response => {
        console.log(response)
        this.editDialogVisible = false
        this.$message.success('编辑成功')
        this.$refs.editDialog.resetForm()
        this.__fetchData()
      })
    },

    // 打开上传文件组件
    openUploadDialog(row) {
      this.uploadDialogVisible = true
      this.uploadRow = row
    },
    // 上传文件控件成功回调
    uploadSubmit(fileList) {
      console.log(fileList)
      this.uploadDialogVisible = false
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
        this.$message.warning('请选择所删除的项')
        return false
      }
      this.$confirm('确定删除所选中项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(selectId)
        this.__fetchData()
        this.$message.success('删除成功')
      })
    },

    // 点击树形菜单时触发
    handleNodeClick(data) {
      console.log(data)
      const entity = {
        sysDeptId: data.value
      }
      console.log(entity)
      this.filter = Object.assign(this.filter, { entity })
      this.__fetchData()
    }
  }
}
</script>
