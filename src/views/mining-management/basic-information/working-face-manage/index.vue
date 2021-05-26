<template>
  <div class="page-container">
    <filter-bar :config="workingFaceManageFilterConfig" @search-click="queryData" @create-click="openDialog('create')" />
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="workingFaceManageConfig"
      height="calc(100% - 137px)"
      @edit-click="(row) => openDialog('edit', row)"
      @delete-click="deleteClick"
      @submit-data="editSubmit"
      @selection-change="selectionChange"
      @other-click="otherClick"
    />
    <div v-show="total > 0" class="page-bottom">
      <el-button class="page-bottom__delete" type="warning" size="small" plain :disabled="deleteDisabled" @click="deleteBatches">
        <i class="el-icon-delete el-icon--left" />批量删除
      </el-button>
      <pagination
        v-show="total > 0"
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
      @close-dialog="createDialogVisible = false"
      @submit="createSubmit"
    />
    <!-- 编辑弹窗 -->
    <form-dialog
      ref="editDialog"
      :config="initEditConfig()"
      :dialog-visible="editDialogVisible"
      @close-dialog="editDialogVisible = false"
      @submit="editSubmit"
    />
    <face-advance ref="faceAdvance" :dialog-visible="faceAdvanceVisible" :form-data="faceAdvance" @close-dialog="closeFaceAdvance" />
  </div>
</template>

<script>
import {
  selectCoalcodeInfoList,
  updateDugrepairTeam,
  getWorkFacetList,
  getWorkFacetById,
  selectMineareaInfoList,
  selectWorkFacetList,
  saveWorkFacet,
  updateWorkFacet,
  deleteWorkFacet,
  batchDeleteWorkFacet,
  getProcessWorkFacet,
  selectMineTeamList
} from '@/api/mining-management'
import {
  getsysDictListById
} from '@/api/hidden-danger'
import {
  workingFaceManageConfig,
  workingFaceManageFilterConfig
} from '@/data/mining-management'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import FaceAdvance from './components/face-advance/index.vue'
export default {
  components: {
    FilterBar,
    ListTable,
    Pagination,
    FormDialog,
    FaceAdvance
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
      workingFaceManageConfig,
      workingFaceManageFilterConfig,
      deleteDisabled: true,
      createDialogVisible: false,
      editDialogVisible: false,
      multipleSelection: [],
      faceAdvanceVisible: false,
      mineTeamList: [],
      faceAdvance: {
        face: '',
        coalMining: 0,
        resourceStorage: 0,
        yieldSchedule: 0,
        advance: 0,
        totalLength: 0,
        pushing: 0,
        color: '',
        lifeCycle: []
      }
    }
  },
  created() {
    this.__fetchLevelList()
    this.__fetchCoalSeam()
    this.__fetchMinearea()
    this.__fetchWorkFacet()
    this.__fetchMineTeam()
    this.__fetchData()
  },
  methods: {
    __fetchMineTeam() {
      selectMineTeamList().then(response => {
        this.mineTeamList = response.data
        this.workingFaceManageConfig.columns.forEach(it => {
          if (it.field == 'unitId') {
            it.options = response.data
          }
        })
      })
    },
    __fetchWorkFacet() {
      selectWorkFacetList().then(response => {
        this.workingFaceManageConfig.columns.forEach(it => {
          if (it.field == 'gzmContinueId') {
            it.options = response.data
          }
        })
      })
    },
    __fetchMinearea() {
      selectMineareaInfoList().then(response => {
        this.workingFaceManageConfig.columns.forEach(it => {
          if (it.field == 'mineAreaId') {
            it.options = response.data
          }
        })
      })
    },
    __fetchLevelList() {
      const query = [{
        // 工作面状态
        parentId: 111242
      }, {
        // 采煤工艺
        parentId: 111248
      }, {
        // 类别
        parentId: 111252
      }]
      for (const q in query) {
        getsysDictListById(query[q].parentId).then(response => {
          const selectList = []
          for (const m in response.data) {
            selectList.push({
              label: response.data[m].dictName,
              value: response.data[m].sysDictId
            })
          }
          this.workingFaceManageConfig.columns.forEach(it => {
            if (query[q].parentId == 111242) {
              if (it.field === 'workStatusId') {
                it.options = selectList
              }
            } else if (query[q].parentId == 111248) {
              if (it.field === 'coalMiningCraftId') {
                it.options = selectList
              }
            } else if (query[q].parentId == 111252) {
              if (it.field === 'typeId') {
                it.options = selectList
              }
            }
          })
        })
      }
    },
    __fetchCoalSeam() {
      selectCoalcodeInfoList().then(response => {
        this.workingFaceManageConfig.columns.forEach(it => {
          if (it.field == 'coalFieldId') {
            it.options = response.data
          }
        })
      })
    },
    __fetchData() {
      this.listLoading = true
      const query = {
        page: this.listQuery.page,
        pagerows: this.listQuery.pagerows,
        keyword: this.filter.name,
        keywordField: ['gzmName', 'workStatus'],
        sort: {
          asc: ['orderNum']
        }
      }
      getWorkFacetList(query).then(response => {
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
        form: this.workingFaceManageConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.workingFaceManageConfig.columns
      })
      return editConfig
    },
    // 打开弹窗
    openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true
      if (row) {
        getWorkFacetById(row.cjglWorkFacetId).then(response => {
          const info = Object.assign(response.data)
          this.$refs.editDialog.updataForm(info)
        })
      }
    },
    // 删除
    deleteClick(row) {
      this.$confirm('确定删除该工作面管理信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteWorkFacet(row.cjglWorkFacetId).then(response => {
          this.$message.success('删除成功')
          this.__fetchData()
        })
      })
    },
    // 批量删除
    deleteBatches() {
      const selectId = []
      this.multipleSelection.forEach(it => selectId.push(it.cjglWorkFacetId))
      if (selectId.length === 0) {
        this.$message.warning('请选择所删除的工作面管理信息')
        return false
      }
      this.$confirm('确定删除所选中工作面管理信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        batchDeleteWorkFacet(selectId).then(response => {
          this.__fetchData()
          this.$message.success('删除成功')
        })
      })
    },
    // submit data
    createSubmit(submitData) {
      const mineTeamList = this.mineTeamList.filter(p => p.value === String(submitData.unitId))[0]
      submitData.unit = mineTeamList.label
      saveWorkFacet(submitData).then(response => {
        this.__fetchData()
        this.__fetchWorkFacet()
        this.$refs.createDialog.resetForm()
        this.createDialogVisible = false
        this.$message.success('新建成功')
      }).catch(err => {
        this.$refs.createDialog.resetSubmitBtn()
      })
    },
    editSubmit(submitData) {
      const mineTeamList = this.mineTeamList.filter(p => p.value === String(submitData.unitId))[0]
      submitData.unit = mineTeamList.label
      updateWorkFacet(submitData).then(response => {
        this.__fetchData()
        this.__fetchWorkFacet()
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
    otherClick(_data) {
      let query = {}
      getProcessWorkFacet(_data.cjglWorkFacetId).then(response => {
        this.faceAdvanceVisible = true
        query = Object.assign(response.data, {
          gzmName: _data.gzmName,
          gzmLength: _data.gzmLength,
          resourceReserve: _data.resourceReserve
        })
        this.$refs.faceAdvance.updataForm(query)
      })
    },
    closeFaceAdvance() {
      this.faceAdvanceVisible = false
    }
  }
}
</script>
