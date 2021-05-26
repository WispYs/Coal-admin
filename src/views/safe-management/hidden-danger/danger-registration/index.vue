<template>
  <div class="page-container">
    <filter-bar
      :config="dangeRegistrationFilterConfig"
      @search-click="queryData"
      @create-click="openDialog('create')"
      @import-click="importClick"
      @export-click="handelExport"
    />
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="dangeRegistConfig"
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
  </div>
</template>

<script>
import {
  getsysDictListById,
  getAqglHiddenRegister,
  getAqglHiddenRegisterById,
  updateAqglHiddenRegister,
  saveAqglHiddenRegister,
  deleteAqglHiddenRegister,
  batchDeleteHiddenRegister,
  getSelectRiskList
} from '@/api/hidden-danger'
import {
  getAqglHiddenTissueTree
} from '@/api/organization'
import { getOrganTree } from '@/api/authority-management'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import UploadFile from '@/components/UploadFile'
import { dangeRegistrationFilterConfig, dangeRegistConfig } from '@/data/hidden-danger'
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
      listLoading: true,
      dangeRegistConfig,
      dangeRegistrationFilterConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      multipleSelection: [], // 多选项
      deleteDisabled: true, // 批量删除置灰
      uploadRow: null,
      uploadDialogVisible: false,
      organizationList: [], // 组织机构
      organizationFlag: true ,// 终止获取复查单位递归
      examinePath: []
    }
  },
  created() {
    this.__fetchUnit()
    this.__fetchHiddenUnit()
    this.__fetchExaminePath()
    this.__fetchData()
    this.__fetchSelectList()
  },

  methods: {
    __fetchExaminePath(){
      getSelectRiskList().then(response =>{
        this.dangeRegistConfig.columns.forEach(it => {
            if (it.field === 'examinePathId') {
              this.examinePath= response.data
              it.options = response.data
            }
        })
      })
    },
    __fetchUnit() {
      getOrganTree().then(response => {
        this.organizationList = response.data
        // 更新新增、编辑config数据
        this.dangeRegistConfig.columns.forEach(it => {
          if (it.field === 'examineUnit') {
            it.options = response.data
          } else if (it.field === 'reviewUnitId') {
            it.options = response.data
          }
        })
      })
    },
    __fetchHiddenUnit() {
      const query = {
        aqglHiddenTissueId: ''
      }
      getAqglHiddenTissueTree(query).then(response => {
        this.dangeRegistConfig.columns.forEach(it => {
          if (it.field === 'hiddenDeptId') {
            it.options = response.data
          }
        })
      })
    },
    __fetchSelectList() {
      const query = [{
        parentId: 10088
      }, {
        parentId: 10092
      }, {
        parentId: 10097
      }, {
        parentId: 10106
      }, {
        // 隐患状态
        parentId: 10115
      }]
      for (const q in query) {
        getsysDictListById(query[q].parentId).then(response => {
          const selectList = []
          for (const m in response.data) {
            selectList.push({
              value: String(response.data[m].sysDictId),
              label: response.data[m].dictName
            })
          }
          this.dangeRegistConfig.columns.forEach(it => {
            if (query[q].parentId == 10088) {
              if (it.field === 'examineShiftId') {
                it.options = selectList
              }
            } else if (query[q].parentId == 10092) {
              if (it.field === 'examineTypeId') {
                it.options = selectList
              }
            } else if (query[q].parentId == 10097) {
              if (it.field === 'hiddenTypeId') {
                it.options = selectList
              }
            } else if (query[q].parentId == 10106) {
              if (it.field === 'hiddenGrade') {
                it.options = selectList
              }
            } else if (query[q].parentId == 10115) {
              if (it.field === 'hiddenStatus') {
                it.options = selectList
              }
            }
          })
        })
      }
    },
    __fetchData() {
      this.listLoading = false
      const query = {
        page: this.listQuery.page,
        pagerows: this.listQuery.pagerows,
        keyword: this.filter.name,
        keywordField: ['hiddenStatus', 'hiddenGrade']
      }
      getAqglHiddenRegister(query).then(response => {
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
        form: this.dangeRegistConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.dangeRegistConfig.columns
      })
      return editConfig
    },
    // 打开弹窗
    openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true
      // 如果有数据，更新子组件的 formData
      if (row) {
        getAqglHiddenRegisterById(row.aqglHiddenRegisterId).then(response => {
          response.data.hiddenGrade = String(response.data.hiddenGrade)
          this.$refs.editDialog.updataForm(response.data)
        })
      }
    },
    // 导入
    importClick() {
      this.$message.info('敬请期待')
    },
    // 删除
    deleteClick(row) {
      this.$confirm('确定删除该隐患登记吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAqglHiddenRegister(row.aqglHiddenRegisterId).then(response => {
          this.$message.success('删除成功')
          this.__fetchData()
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    getOrganization(o_data, s_data) {
      if (Number(o_data.value) == s_data.reviewUnitId) {
        s_data.reviewUnit = o_data.label
        this.organizationFlag = false
      }
      if (this.organizationFlag && o_data.children.length > 0) {
        o_data.children.forEach(it => {
          this.getOrganization(it, s_data)
        })
      }
    },
    // 新增
    createSubmit(submitData) {
      let examinePath= this.examinePath.filter(p => p.value === submitData.examinePathId)[0]
      submitData.examinePathId = examinePath.value
      submitData.examinePath = examinePath.label
      // 获取复查单位名称
      this.organizationList.forEach(it => {
        if (this.organizationFlag) {
          this.getOrganization(it, submitData)
        }
      })
      saveAqglHiddenRegister(submitData).then(response => {
        this.createDialogVisible = false
        this.$message.success('新建成功')
        this.$refs.createDialog.resetForm()
        this.__fetchData()
      }).catch(err => {
        this.$refs.createDialog.resetSubmitBtn()
      })
    },
    // 编辑
    editSubmit(submitData) {
      let examinePath= this.examinePath.filter(p => p.value === submitData.examinePathId)[0]
      submitData.examinePathId = examinePath.value
      submitData.examinePath = examinePath.label
      const query = Object.assign(submitData)
      updateAqglHiddenRegister(query).then(response => {
        this.editDialogVisible = false
        this.$message.success('编辑成功')
        this.$refs.editDialog.resetForm()
        this.__fetchData()
      }).catch(err => {
        this.$refs.editDialog.resetSubmitBtn()
      })
    },
    // 定义导出Excel表格事件
    handelExport() {
      // 第一个参数为 table 的 id
      // 第二个参数为导出文件的 name
      exportExcel(this.id, '组织机构管理')
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
      this.multipleSelection.forEach(it => selectId.push(it.aqglHiddenRegisterId))
      if (selectId.length === 0) {
        this.$message.warning('请选择所删除的隐患登记')
        return false
      }
      this.$confirm('确定删除所选中隐患登记?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        batchDeleteHiddenRegister(selectId).then(response => {
          this.__fetchData()
          this.$message.success('删除成功')
        })
      })
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
<style lang="scss" scoped>
</style>
