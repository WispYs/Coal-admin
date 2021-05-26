<template>
  <div class="page-container has-tree" :class="treeExtend ? 'open-tree' : 'close-tree'">
    <tree-bar :tree-data="treeData" @extend-click="treeExtend = !treeExtend" @handleNodeClick="handleNodeClick" />
    <div class="tree-form-container">
      <span class="tree-extend-btn" @click="treeExtend = !treeExtend">
        <i :class="treeExtend ? 'el-icon-d-arrow-left': 'el-icon-d-arrow-right'" />
      </span>
      <filter-bar
        :config="tunnelManageFilterConfig"
        @search-click="queryData"
        @create-click="openDialog('create')"
        @reset-click="queryData"
      />
      <list-table
        :id="id"
        :list="list"
        :list-loading="listLoading"
        :config="tunnelManageConfig"
        height="calc(100% - 157px)"
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
          v-show="total >0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.pagerows"
          @pagination="pagination"
        />
      </div>

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
    <!-- 巷修情况 -->
    <detail-dialog
      ref="detailDialog"
      :parent-id="parentId"
      :config="initDetailConfig()"
      :dialog-visible="detailDialogVisible"
      @close-dialog="detailDialogVisible = false"
      @open-dialog="openDialog"
    />
    <!-- 新建弹窗 -->
    <form-dialog
      ref="createDetailDialog"
      :config="initCreateDetailConfig()"
      :dialog-visible="createDetailDialogVisible"
      @upload-click="(row) => openUploadDialog('createDetailDialog', row)"
      @close-dialog="createDetailDialogVisible = false"
      @submit="createDetailSubmit"
    />
    <!-- 详情编辑弹窗 -->
    <form-dialog
      ref="editDetailDialog"
      :config="initEditDetailConfig()"
      :dialog-visible="editDetailDialogVisible"
      @upload-click="(row) => openUploadDialog('editDetailDialog', row)"
      @close-dialog="editDetailDialogVisible = false"
      @submit="editDetailSubmit"
    />
    <face-advance ref="faceAdvance" :dialog-visible="faceAdvanceVisible" :form-data="faceAdvance" @close-dialog="closeFaceAdvance" />
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
  searchTunnelList,
  saveTunnel,
  getTunnelById,
  updateTunnel,
  deleteTunnel,
  batchDeleteTunnel,
  getTunnelDetailById,
  saveTunnelDetail,
  editTunnelDetail,
  getProcessTunnel,
  selectComboxDugrepairTeam
} from '@/api/mining-management'
import {
  getsysDictListById
} from '@/api/hidden-danger'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import TreeBar from '@/components/TreeBar'
import UploadFile from '@/components/UploadFile'
import FaceAdvance from './components/face-advance/index.vue'
import DetailDialog from './components/DetailDialog/index.vue'
import {
  tunnelManageConfig,
  tunnelManageFilterConfig,
  laneRepairconfig,
  laneRepairFilterconfig
} from '@/data/mining-management'

export default {
  components: {
    FilterBar,
    ListTable,
    Pagination,
    FormDialog,
    TreeBar,
    DetailDialog,
    FaceAdvance,
    UploadFile
  },
  data() {
    return {
      id: 'liability-system',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      tunnelManageFilterConfig,
      tunnelManageConfig,
      laneRepairconfig,
      laneRepairFilterconfig,
      createDialogVisible: false,
      editDialogVisible: false,
      treeExtend: true,
      treeData: {
        title: '所属队组',
        list: []
      },
      riskFilterList: [],
      deleteDisabled: true,
      checkData: [],
      createDetailDialogVisible: false,
      editDetailDialogVisible: false,
      detailDialogVisible: false,
      uploadRow: null,
      uploadDialogVisible: false,
      parentId: {
        parentId: ''
      },
      parentName: '',
      faceAdvanceVisible: false,
      faceAdvance: {
        face: '',
        totalLength: 0,
        advance: 0,
        pushing: 0,
        color: '',
        lifeCycle: []
      },
      pairGroupId: ''
    }
  },
  created() {
    this.__fetchSelectList()
    this.__fetchData()
    this.__getRiskSystemTree()
  },
  methods: {
    __fetchSelectList() {
      const query = [{
        // 巷道类型
        parentId: 111267
      }, {
        // 断面形状
        parentId: 111271
      }, {
        // 采掘阶段
        parentId: 111278
      }, {
        // 巷道状态
        parentId: 111282
      }, {
        // 支护方式
        parentId: 111287
      }, {
        // 掘进方式
        parentId: 111300
      }, {
        // 岩性类型
        parentId: 111304
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
          this.tunnelManageConfig.columns.forEach(it => {
            if (query[q].parentId == 111267) {
              if (it.field === 'tunnelTypeId') {
                it.options = selectList
              }
            } else if (query[q].parentId == 111271) {
              if (it.field === 'fractureSurfaceId') {
                it.options = selectList
              }
            } else if (query[q].parentId == 111278) {
              if (it.field === 'digStageId') {
                it.options = selectList
              }
            } else if (query[q].parentId == 111282) {
              if (it.field === 'tunnelStatusId') {
                it.options = selectList
              }
            } else if (query[q].parentId == 111287) {
              if (it.field === 'shoringWayId') {
                it.options = selectList
              }
            } else if (query[q].parentId == 111300) {
              if (it.field === 'digWayId') {
                it.options = selectList
              }
            } else if (query[q].parentId == 111304) {
              if (it.field === 'lithologyTypeId') {
                it.options = selectList
              }
            }
          })
        })
      }
    },
    __getRiskSystemTree() {
      selectComboxDugrepairTeam().then(response => {
        this.treeData.list = response.data
        this.tunnelManageConfig.columns.forEach(it => {
          if (it.field === 'teamId') {
            it.options = response.data
            console.log(response.data)
          }
        })
      })
    },
    __fetchData(_filter, id) {
      this.listLoading = true
      const query = {
        page: this.listQuery.page,
        pagerows: this.listQuery.pagerows,
        entity: {
          teamId: this.pairGroupId
        },
        keyword: _filter,
        keywordField: ['tunnelName', 'tunnelStatus'],
        sort: {
          asc: ['orderNum']
        }
      }
      searchTunnelList(query).then(response => {
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
    // 根据组织机构查询组织机构下面的风险责任体系
    handleNodeClick(_data) {
      this.pairGroupId = _data.value
      this.__fetchData()
      // this.$message.success('查询成功')
    },
    pagination(row) {
      this.listQuery.page = row.page
      this.listQuery.pagerows = row.limit
      this.__fetchData()
    },
    // 初始化新建窗口配置
    initCreateConfig() {
      const createConfig = Object.assign({
        title: '新建',
        width: '1000px',
        form: this.tunnelManageConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.tunnelManageConfig.columns
      })
      return editConfig
    },
    // 初始化详情窗口配置
    initDetailConfig() {
      const createConfig = Object.assign({
        title: '巷修情况',
        width: '1000px',
        filter: this.laneRepairFilterconfig,
        form: this.laneRepairconfig
      })
      return createConfig
    },
    // 初始化新建明细窗口配置
    initCreateDetailConfig() {
      const createConfig = Object.assign({
        title: '新建',
        width: '1000px',
        form: this.laneRepairconfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditDetailConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.laneRepairconfig.columns
      })
      return editConfig
    },
    // 打开弹窗
    openDialog(name, row, data) {
      const visible = `${name}DialogVisible`
      this[visible] = true
      if (name == 'createDetail') {
        const info = {}
        this.laneRepairconfig.columns.forEach(it => {
          if (it.field == 'tunnelName') {
            info[it.field] = this.parentName
          } else {
            info[it.field] = ''
          }
        })
        this.$refs.createDetailDialog.updataForm(info)
      }
      let getListFn = null
      let id = ''
      if (name.indexOf('edit') > -1) {
        // 如果打开操作查看的新增编辑弹窗
        if (name.indexOf('Detail') > -1) {
          getListFn = getTunnelDetailById
          id = row.cjglTunnelDetailId
        } else {
          getListFn = getTunnelById
          id = row.cjglTunnelId
        }
      }
      if (row) {
        getListFn(id).then(response => {
          const info = Object.assign(response.data)
          this.$refs[`${name}Dialog`].updataForm(info)
        })
      }
    },
    // 删除
    deleteClick(data) {
      this.$confirm('确定删除该条巷道管理信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTunnel(data.cjglTunnelId).then(response => {
          this.__fetchData()
          this.$message.success('删除成功')
        })
      })
    },
    // 批量删除
    deleteBatches() {
      const selectId = []
      this.checkData.forEach(it => selectId.push(it.cjglTunnelId))
      if (selectId.length === 0) {
        this.$message.warning('请选择所删除的巷道管理信息')
        return false
      }
      this.$confirm('确定删除所选中巷道管理信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        batchDeleteTunnel(selectId).then(response => {
          this.__fetchData()
          this.$message.success('删除成功')
        })
      })
    },
    // submit data
    createSubmit(submitData) {
      saveTunnel(submitData).then(response => {
        this.$refs.createDialog.resetForm()
        this.__fetchData()
        this.createDialogVisible = false
        this.$message.success('新建成功')
      }).catch(err => {
        this.$refs.createDialog.resetSubmitBtn()
      })
    },
    editSubmit(submitData) {
      updateTunnel(submitData).then(response => {
        this.$refs.editDialog.resetForm()
        this.__fetchData()
        this.editDialogVisible = false
        this.$message.success('编辑成功')
      }).catch(err => {
        this.$refs.editDialog.resetSubmitBtn()
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
    otherClick(data, row, operation) {
      if (operation == '巷修情况') {
        this.laneRepair(data)
      } else {
        this.roadwayProgress(data)
      }
    },
    laneRepair(data) {
      this.detailDialogVisible = true
      this.parentId.parentId = data.cjglTunnelId
      this.parentName = data.tunnelName
      this.$refs.detailDialog.__fetchData(data.cjglTunnelId)
    },
    roadwayProgress(data) {
      let query = {}
      getProcessTunnel(data.cjglTunnelId).then(response => {
        query = Object.assign(response.data, {
          tunnelName: data.tunnelName,
          designerLength: data.designerLength
        }),
        this.$refs.faceAdvance.updataForm(query)
        this.faceAdvanceVisible = true
      })
    },
    createDetailSubmit(submitData) {
      const query = Object.assign(submitData, {
        cjglTunnelId: this.parentId.parentId
      })
      saveTunnelDetail(query).then(response => {
        this.createDetailDialogVisible = false
        this.$refs.createDetailDialog.resetForm()
        this.$refs.detailDialog.__fetchData()
        this.$message.success('新建成功')
      }).catch(err => {
        this.$refs.createDetailDialog.resetSubmitBtn()
      })
    },
    // 明细详情编辑
    editDetailSubmit(submitData) {
      const query = Object.assign(submitData, {
        cjglTunnelId: this.parentId.parentId
      })
      editTunnelDetail(query).then(response => {
        this.editDetailDialogVisible = false
        this.$message.success('编辑成功')
        this.$refs.editDetailDialog.resetForm()
        this.$refs.detailDialog.__fetchData()
      }).catch(err => {
        this.$refs.editDetailDialog.resetSubmitBtn()
      })
    },
    closeFaceAdvance() {
      this.faceAdvanceVisible = false
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
