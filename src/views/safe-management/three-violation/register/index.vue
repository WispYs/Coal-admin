<template>
  <div class="page-container">
    <filter-bar :config="threeViolationFilterConfig" @search-click="queryData" @create-click="openDialog('create')"
      @import-click="importClick" />
    <list-table :id="id" :list="list" :list-loading="listLoading" :config="threeViolationConfig" height="calc(100% - 157px)"
      @edit-click="(row) => openDialog('edit', row)" @delete-click="deleteClick" @submit-data="editSubmit" @other-click="otherClick"
      @selection-change="selectionChange" />
    <div v-show="total > 0" class="page-bottom">
      <el-button class="page-bottom__delete" type="warning" size="small" plain :disabled="deleteDisabled" @click="deleteBatches">
        <i class="el-icon-delete el-icon--left" />批量删除
      </el-button>
      <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pagerows"
        @pagination="pagination" />
    </div>
    <!-- 新建弹窗 -->
    <form-dialog ref="createDialog" :config="initCreateConfig()" :dialog-visible="createDialogVisible" @upload-click="(row) => openUploadDialog('createDialog', row)"
      @close-dialog="createDialogVisible = false" @submit="createSubmit" />
    <!-- 编辑弹窗 -->
    <form-dialog ref="editDialog" :config="initEditConfig()" :dialog-visible="editDialogVisible" @upload-click="(row) => openUploadDialog('editDialog', row)"
      @close-dialog="editDialogVisible = false" @submit="editSubmit" />
    <detailed-information ref="threeViolationsDetailed" :dialog-visible="detailedInformationDisabled" @close-dialog="detailedInformationDisabled = false" />
    <!-- 上传附件 -->
    <upload-file ref="uploadFile" :dialog-visible="uploadDialogVisible" @close-dialog="uploadDialogVisible = false"
      @upload-submit="uploadSubmit" @down-file="downFile" />
  </div>
</template>

<script>
  import {
    getsysDictListById,
    getAqglThreeRegisterList,
    getAqglThreeRegisterById,
    saveAqglThreeRegister,
    updateAqglThreeRegister,
    deleteaqglThreeRegister,
    batchDeleteThreeRegister,
    downloadThreeRegisterTemplate,
    getSelectRiskList
  } from '@/api/hidden-danger'
  import {
    threeViolationFilterConfig,
    threeViolationConfig
  } from '@/data/hidden-danger'
  import FilterBar from '@/components/FilterBar'
  import ListTable from '@/components/ListTable'
  import Pagination from '@/components/Pagination'
  import FormDialog from '@/components/FormDialog'
  import UploadFile from '@/components/UploadFile'
  import DetailedInformation from './components/detailed-information'
  export default {
    components: {
      FilterBar,
      ListTable,
      Pagination,
      FormDialog,
      UploadFile,
      DetailedInformation
    },
    data() {
      return {
        id: 'organization',
        list: [],
        total: 0,
        listQuery: {
          page: 1,
          pagerows: 10
        },
        filter: {}, // 筛选项
        listLoading: true,
        threeViolationFilterConfig,
        threeViolationConfig,
        deleteDisabled: true,
        createDialogVisible: false,
        editDialogVisible: false,
        detailedInformationDisabled: false,
        uploadRow: null,
        uploadDialogVisible: false,
        multipleSelection: [],
        examinePath:[]
      }
    },
    created() {
      this.__fetchExaminePath()
      this.__fetchData()
      this.__fetchSelectList()
    },
    methods: {
      __fetchExaminePath(){
        getSelectRiskList().then(response =>{
          this.threeViolationConfig.columns.forEach(it => {
              if (it.field === 'examinePathId') {
                this.examinePath= response.data
                it.options = response.data
              }
          })
        })
      },
      __fetchSelectList() {
        const query = [{
          parentId: 10088
        }, {
          parentId: 24
        }]
        for (const q in query) {
          getsysDictListById(query[q].parentId).then(response => {
            const selectList = []
            for (const m in response.data) {
              selectList.push({
                value: response.data[m].sysDictId,
                label: response.data[m].dictName
              })
            }
            this.threeViolationConfig.columns.forEach(it => {
              if (query[q].parentId == 10088) {
                if (it.field === 'examineShiftId') {
                  it.options = selectList
                }
              } else if (query[q].parentId == 24) {
                if (it.field === 'grade') {
                  it.options = selectList
                }
              }
            })
          })
        }
        this.threeViolationConfig.columns.forEach(it => {
          if (it.field === 'flag') {
            it.options = []
            it.options.push({
              label: '是',
              value: '1'
            }, {
              label: '否',
              value: '0'
            })
          }
        })
      },
      __fetchData() {
        this.listLoading = true
        const query = {
          page: this.listQuery.page,
          pagerows: this.listQuery.pagerows,
          keyword: this.filter.name,
          keywordField: ['disciplinary', 'examineDept', 'unit']
        }
        getAqglThreeRegisterList(query).then(response => {
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
      otherClick(row, index, item) {
        this.detailedInformationDisabled = true
        this.$refs.threeViolationsDetailed.__fetchData(row.aqglThreeRegisterId)
      },
      // 查询数据
      queryData(filter) {
        this.filter = Object.assign(this.filter, filter)
        this.__fetchData()
      },
      importClick() {
        const info = {
          name: '三违登记模板.xlsx',
          url: 'blob:http://192.168.1.23:18090/c98f2008-88be-410a-99f1-0afa4e9feae7'
        }
        this.$refs.uploadFile.updateTemplate(info)
        this.uploadDialogVisible = true
      },
      pagination(data) {
        this.__fetchData()
      },
      // 初始化新建窗口配置
      initCreateConfig() {
        const createConfig = Object.assign({
          title: '新建',
          width: '1000px',
          form: this.threeViolationConfig.columns
        })
        return createConfig
      },
      // 初始化编辑窗口配置
      initEditConfig() {
        const editConfig = Object.assign({
          title: '编辑',
          width: '1000px',
          form: this.threeViolationConfig.columns
        })
        return editConfig
      },
      // 打开弹窗
      openDialog(name, row) {
        const visible = `${name}DialogVisible`
        this[visible] = true
        if (row) {
          getAqglThreeRegisterById(row.aqglThreeRegisterId).then(response => {
            const info = Object.assign(response.data, {
              grade: String(response.data.grade)
            })
            this.$refs.editDialog.updataForm(info)
          })
        }
      },
      // 删除
      deleteClick(row) {
        this.$confirm('确定删除该三证一照数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteaqglThreeRegister(row.aqglThreeRegisterId).then(response => {
            this.$message.success('删除成功')
            this.__fetchData()
          })
        })
      },
      // 批量删除
      deleteBatches() {
        const selectId = []
        this.multipleSelection.forEach(it => selectId.push(it.aqglThreeRegisterId))
        if (selectId.length === 0) {
          this.$message.warning('请选择所删除的三证一照数据')
          return false
        }
        this.$confirm('确定删除所选中三证一照数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          batchDeleteThreeRegister(selectId).then(response => {
            this.__fetchData()
            this.$message.success('删除成功')
          })
        })
      },
      // submit data
      createSubmit(submitData) {
        let examinePath= this.examinePath.filter(p => p.value === submitData.examinePathId)[0]
        submitData.examinePathId = examinePath.value
        submitData.examinePath = examinePath.label
        const query = Object.assign(submitData, {
          flag: Number(submitData.flag) || 0
        })
        saveAqglThreeRegister(query).then(response => {
          this.__fetchData()
          this.$refs.createDialog.resetForm()
          this.createDialogVisible = false
          this.$message.success('新建成功')
        }).catch(err => {
          this.$refs.createDialog.resetSubmitBtn()
        })
      },
      editSubmit(submitData) {
        let examinePath= this.examinePath.filter(p => p.value === submitData.examinePathId)[0]
        submitData.examinePathId = examinePath.value
        submitData.examinePath = examinePath.label
        const query = Object.assign(submitData, {
          flag: Number(submitData.flag) || 0
        })
        updateAqglThreeRegister(submitData).then(response => {
          this.__fetchData()
          this.$refs.editDialog.resetForm()
          this.editDialogVisible = false
          this.$message.success('编辑成功')
        }).catch(err => {
          this.$refs.editDialog.resetSubmitBtn()
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
      // 打开上传文件组件
      openUploadDialog(ref, row) {
        // 记录当前打开弹窗ref
        this.dialogRef = ref
        this.uploadDialogVisible = true
        this.uploadRow = row
        const info = {
          name: '',
          url: ''
        }
        this.$refs.uploadFile.updateTemplate(info)
      },
      // 上传文件控件成功回调
      uploadSubmit(fileList) {
        this.$refs[this.dialogRef].updateFile(fileList)
        this.uploadDialogVisible = false
      },
      downFile() {
        const file = {
          fileName: '三违登记模板.xlsx',
          filePath: 'template/aqgl/三违登记模板.xlsx'
        }
        downloadThreeRegisterTemplate(file)
      }
    }
  }
</script>
