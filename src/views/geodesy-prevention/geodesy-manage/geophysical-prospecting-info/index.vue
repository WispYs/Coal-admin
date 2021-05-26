<template>
  <div class="page-container">
    <filter-bar :config="geophysicalProspectingInfoFilterConfig" @search-click="queryData" @create-click="openDialog('create')"
      @reset-click="queryData" />
    <list-table :id="id" :list="list" :list-loading="listLoading" :config="geophysicalProspectingInfoConfig" height="calc(100% - 157px)"
      @edit-click="(row) => openDialog('edit', row)" @other-click="(row) => openDetailDialog(row.dcfzsDetectId)"
      @delete-click="deleteClick" @submit-data="editSubmit" @selection-change="selectionChange" />
    <div v-show="total>0" class="page-bottom">
      <el-button class="page-bottom__delete" type="warning" size="small" plain :disabled="deleteDisabled" @click="deleteBatches">
        <i class="el-icon-delete el-icon--left" />批量删除
      </el-button>
      <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pagerows"
        @pagination="pagination" />
    </div>
    <!-- 展开详情 -->
    <detail-dialog ref="detailDialog" :config="initDetailConfig()" :dialog-visible="detailDialogVisible" @close-dialog="detailClose"
      @open-dialog="openDialog" />
    <!-- 新建弹窗 -->
    <form-dialog ref="createDialog" :config="initCreateConfig()" :dialog-visible="createDialogVisible" @close-dialog="createDialogVisible = false"
      @submit="createSubmit" />
    <!-- 新建弹窗 -->
    <form-dialog ref="createDetailDialog" :config="initCreateDetailConfig()" :dialog-visible="createDetailDialogVisible"
      @close-dialog="createDetailDialogVisible = false" @submit="createDetailSubmit" />
    <!-- 编辑弹窗 -->
    <form-dialog ref="editDialog" :config="initEditConfig()" :dialog-visible="editDialogVisible" @close-dialog="editDialogVisible = false"
      @submit="editSubmit" />
    <!-- 详情编辑弹窗 -->
    <form-dialog ref="editDetailDialog" :config="initEditDetailConfig()" :dialog-visible="editDetailDialogVisible"
      @close-dialog="editDetailDialogVisible = false" @submit="editDetailSubmit" />
  </div>
  </div>
</template>

<script>
  import {
    getDcfzsDetectInfo,
    getDetectInfoById,
    updateDcfzsDetectInfo,
    saveDcfzsDetectInfo,
    deleteDcfzsDetectInfo,
    getDetectInfoDetailById,
    editDetectInfoDetail,
    saveDetectInfoDetail,
    batchDeleteDetectInfo
  } from '@/api/geodesy-prevention'
  import {
    selectWorkFacetList
  } from '@/api/mining-management'
  import {
    getsysDictListById
  } from '@/api/hidden-danger'
  import FilterBar from '@/components/FilterBar'
  import ListTable from '@/components/ListTable'
  import Pagination from '@/components/Pagination'
  import FormDialog from '@/components/FormDialog'
  import DetailDialog from './components/DetailDialog/index.vue'
  import {
    geophysicalProspectingInfoFilterConfig,
    geophysicalProspectingInfoConfig,
    geophysicalProspectingInfoDetailedConfig,
    geophysicalProspectingInfoDetailedFilterConfig
  } from '@/data/geodesy-prevention'
  export default {
    components: {
      FilterBar,
      ListTable,
      Pagination,
      FormDialog,
      DetailDialog
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
        geophysicalProspectingInfoFilterConfig,
        geophysicalProspectingInfoConfig,
        geophysicalProspectingInfoDetailedFilterConfig,
        geophysicalProspectingInfoDetailedConfig,
        createDialogVisible: false,
        editDialogVisible: false,
        detailDialogVisible: false,
        editDetailDialogVisible: false,
        createDetailDialogVisible: false,
        deleteDisabled: true,
        riskFilterList: [],
        checkData: [],
        detectInfoId: '',
        WorkFaceList: [],
        placeType:[],
        geophysicalProspectingState:[]
      }
    },
    created() {
      this.__fetchData()
      this.__fetchWorkFace()
      this.__fetchSelectList()
    },
    methods: {
      __fetchSelectList() {
        const query = [{
          parentId: 111315
        }, {
          parentId: 111368
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
            if (query[q].parentId == 111315) {
              this.placeType = selectList
              this.geophysicalProspectingInfoConfig.columns.forEach(it => {
                if (it.field === 'locationTypeId') {
                  it.options = selectList
                }
              })
            }else if (query[q].parentId == 111368){
              this.geophysicalProspectingState = selectList
              this.geophysicalProspectingInfoDetailedConfig.columns.forEach(it =>{
                if (it.field === 'detectStatusId') {
                  it.options = selectList
                }
              })
            }
          })
        }
      },
      __fetchWorkFace() {
        selectWorkFacetList().then(response => {
          this.geophysicalProspectingInfoConfig.columns.forEach(it => {
            if (it.field == 'detectPositionNameId') {
              this.WorkFaceList = response.data
              it.options = response.data
            }
          })
        })
      },
      __fetchData(_filter) {
        this.listLoading = true
        const query = {
          page: this.listQuery.page,
          pagerows: this.listQuery.pagerows,
          keyword: _filter,
          keywordField: ['detectPositionName']
        }
        getDcfzsDetectInfo(query).then(response => {
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
        this.__fetchData(filter.name)
      },
      pagination(data) {
        this.listQuery.page = data.page
        this.listQuery.pagerows = data.limit
        this.__fetchData()
      },
      // 初始化新建窗口配置
      initCreateConfig() {
        const createConfig = Object.assign({
          title: '新建',
          width: '1000px',
          form: this.geophysicalProspectingInfoConfig.columns
        })
        return createConfig
      },
      // 初始化新建明细窗口配置
      initCreateDetailConfig() {
        const createConfig = Object.assign({
          title: '新建',
          width: '1000px',
          form: this.geophysicalProspectingInfoDetailedConfig.columns
        })
        return createConfig
      },
      // 初始化编辑窗口配置
      initEditConfig() {
        const editConfig = Object.assign({
          title: '编辑',
          width: '1000px',
          form: this.geophysicalProspectingInfoConfig.columns
        })
        return editConfig
      },
      // 初始化详情窗口配置
      initDetailConfig() {
        const createConfig = Object.assign({
          title: '物探明细',
          width: '1000px',
          filter: this.geophysicalProspectingInfoDetailedFilterConfig,
          form: this.geophysicalProspectingInfoDetailedConfig
        })
        return createConfig
      },
      // 初始化编辑窗口配置
      initEditDetailConfig() {
        const editConfig = Object.assign({
          title: '编辑',
          width: '1000px',
          form: this.geophysicalProspectingInfoDetailedConfig.columns
        })
        return editConfig
      },
      // 打开弹窗
      openDialog(name, row) {
        const visible = `${name}DialogVisible`
        this[visible] = true
        let getListFn = null // 获取详情的接口方法
        let id = ''
        if (name.indexOf('edit') > -1) {
          // 如果打开操作查看的新增编辑弹窗
          if (name.indexOf('Detail') > -1) {
            getListFn = getDetectInfoDetailById
            id = row.dcfzsDetailId
          } else {
            getListFn = getDetectInfoById
            id = row.dcfzsDetectId
          }
        }
        if (row) {
          getListFn(id).then(response => {
            const info = Object.assign(response.data)
            this.$refs[`${name}Dialog`].updataForm(info)
          })
        }
      },
      // 打开特有属性操作查看弹窗
      openDetailDialog(id) {
        this.detectInfoId = id
        this.detailDialogVisible = true
        this.$refs.detailDialog.queryData({
          id
        })
      },
      // 删除
      deleteClick(row) {
        this.$confirm('确定删除该条数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteDcfzsDetectInfo(row.dcfzsDetectId).then(response => {
            this.$message.success('删除成功')
            this.__fetchData()
          })
        })
      },
      // 批量删除
      deleteBatches() {
        const selectId = []
        this.checkData.forEach(it => selectId.push(it.dcfzsDetectId))
        if (selectId.length === 0) {
          this.$message.warning('请选择所删除的数据')
          return false
        }
        this.$confirm('确定删除所选中数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          batchDeleteDetectInfo(selectId).then(response => {
            this.__fetchData()
            this.$message.success('删除成功')
          })
        })
      },
      // submit data
      createSubmit(submitData) {
        const WorkFaceList = this.WorkFaceList.filter(p => p.value === submitData.detectPositionNameId)[0]
        const placeType = this.placeType.filter(p => p.value === submitData.locationTypeId)[0]
        submitData.detectPositionName = WorkFaceList.label
        submitData.locationType = placeType.label
        saveDcfzsDetectInfo(submitData).then(response => {
          this.__fetchData()
          this.$refs.createDialog.resetForm()
          this.createDialogVisible = false
          this.$message.success('新建成功')
        }).catch(err => {
          this.$refs.createDialog.resetSubmitBtn()
        })
      },
      createDetailSubmit(submitData) {
        const geophysicalProspectingState = this.geophysicalProspectingState.filter(p => p.value === submitData.detectStatusId)[0]
        submitData.detectStatus = geophysicalProspectingState.label
        const query = Object.assign(submitData, {
          dcfzsDetectInfoId: this.detectInfoId
        })
        saveDetectInfoDetail(submitData).then(response => {
          this.createDetailDialogVisible = false
          this.$refs.createDetailDialog.resetForm()
          this.$refs.detailDialog.__fetchData()
          this.$message.success('新建成功')
        }).catch(err => {
          this.$refs.createDetailDialog.resetSubmitBtn()
        })
      },
      editSubmit(submitData) {
        const WorkFaceList = this.WorkFaceList.filter(p => p.value === submitData.detectPositionNameId)[0]
        const placeType = this.placeType.filter(p => p.value === submitData.locationTypeId)[0]
        submitData.detectPositionName = WorkFaceList.label
        submitData.locationType = placeType.label
        updateDcfzsDetectInfo(submitData).then(response => {
          this.__fetchData()
          this.$refs.editDialog.resetForm()
          this.editDialogVisible = false
          this.$message.success('编辑成功')
        }).catch(err => {
          this.$refs.editDialog.resetSubmitBtn()
        })
      },
      // 明细详情编辑
      editDetailSubmit(submitData) {
        const geophysicalProspectingState = this.geophysicalProspectingState.filter(p => p.value === submitData.detectStatusId)[0]
        submitData.detectStatus = geophysicalProspectingState.label
        editDetectInfoDetail(submitData).then(response => {
          this.editDetailDialogVisible = false
          this.$message.success('编辑成功')
          this.$refs.editDetailDialog.resetForm()
          this.$refs.detailDialog.__fetchData()
        }).catch(err => {
          this.$refs.editDetailDialog.resetSubmitBtn()
        })
      },
      selectionChange(data) {
        this.checkData = data
        if (this.checkData.length > 0) {
          this.deleteDisabled = false
        } else {
          this.deleteDisabled = true
        }
      },
      detailClose() {
        this.detailDialogVisible = false
        this.__fetchData()
      }
    }
  }
</script>
