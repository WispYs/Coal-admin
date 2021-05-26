<template>
  <div class="page-container has-tree" :class="treeExtend ? 'open-tree' : 'close-tree'">
    <tree-bar
      ref="treeBar"
      :tree-data="treeData"
      @handleNodeClick="handleNodeClick"
      @handleSwitch="handleSwitch"
    />

    <div class="tree-form-container">
      <span class="tree-extend-btn" @click="treeExtend = !treeExtend">
        <i :class="treeExtend ? 'el-icon-d-arrow-left': 'el-icon-d-arrow-right'" />
      </span>
      <filter-bar
        :config="UsingEquipFilterConfig"
        @search-click="queryData"
        @reset-click="queryData"
      />
      <!-- 表格 -->
      <list-table
        :id="id"
        :list="list"
        :list-loading="listLoading"
        :config="UsingEquipTableConfig"
        height="calc(100% - 157px)"
        @other-click="otherClick"
      />

      <div v-show="total>0" class="page-bottom">
        <pagination
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.pagerows"
          @pagination="__fetchData"
        />
      </div>

      <!-- 回收 -->
      <form-dialog
        ref="recycleDialog"
        :config="initRecycleConfig()"
        :dialog-visible="recycleDialogVisible"
        @close-dialog="recycleDialogVisible = false"
        @submit="recycleSubmit"
      />
      <!-- 移交 -->
      <form-dialog
        ref="turnDialog"
        :config="initTurnConfig()"
        :dialog-visible="turnDialogVisible"
        @upload-click="(row) => openUploadDialog('turnDialog', row)"
        @close-dialog="turnDialogVisible = false"
        @submit="turnSubmit"
      />
      <!-- 查交 -->
      <form-dialog
        ref="checkDialog"
        :config="initCheckConfig()"
        :dialog-visible="checkDialogVisible"
        @close-dialog="checkDialogVisible = false"
        @submit="checkSubmit"
      />
      <!-- 上传附件 -->
      <upload-file
        :dialog-visible="uploadDialogVisible"
        @close-dialog="uploadDialogVisible = false"
        @upload-submit="uploadSubmit"
      />
    </div>
  </div>
</template>

<script>
import { getUsingList, createRecycle, createTransfer, createCheck } from '@/api/mechatronics'
import { getOrganTree } from '@/api/authority-management'

import TreeBar from '@/components/TreeBar'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import UploadFile from '@/components/UploadFile'
import { UsingEquipTableConfig, UsingEquipFilterConfig, RecycleTableConfig, TurnTableConfig, CheckTableConfig } from '@/data/mechatronics'
import { parseTime } from '@/utils'

export default {
  components: {
    TreeBar,
    FilterBar,
    ListTable,
    Pagination,
    FormDialog,
    UploadFile
  },
  data() {
    return {
      id: 'using-equipment',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      UsingEquipFilterConfig,
      UsingEquipTableConfig,
      RecycleTableConfig,
      TurnTableConfig,
      CheckTableConfig,
      recycleDialogVisible: false, // 回收
      turnDialogVisible: false, // 移交
      checkDialogVisible: false, // 查交
      treeExtend: true,
      treeData: {
        title: '设备类型',
        title2: '组织结构',
        tId: 'id',
        list: []
      },
      treeSelectId: '', //  左侧树型结构id
      tabIndex: '0', //  左侧树型结构tab
      uploadRow: null,
      uploadDialogVisible: false
    }
  },

  created() {
    this.__fetchData()
    this.__updateCategoryTree()
  },
  methods: {
    // 获取设备类型树结构列表
    __updateCategoryTree() {
      this.$store.dispatch('mecha/getCategoryList').then((data) => {
        data.forEach(it => {
          it.label = it.typeName
        })
        this.treeData.list = [{
          id: '',
          label: '全部',
          children: data
        }]
        // 设置树结构默认选中项
        this.$refs.treeBar.setCurrentKey('')
      }).catch((err) => {
        console.log(err)
      })
    },
    // 获取组织结构树列表
    __updateOrganTree() {
      getOrganTree().then(response => {
        console.log(response.data)
        // 更新左侧树结构数据
        this.treeData.list = [{
          id: '',
          label: '全部',
          children: response.data
        }]
        // 设置树结构默认选中项
        this.$refs.treeBar.setCurrentKey('')
      })
    },
    // 获取归还单位列表
    __updateRecycleUnitTree() {
      // 数据字典 - 所属单位
      const parentId = 111133
      this.$store.dispatch('mecha/getDataDictionary', parentId).then((data) => {
        data.forEach(it => {
          it.value = it.dictValue
          it.label = it.dictName
        })
        RecycleTableConfig.columns.forEach(it => {
          if (it.field === 'returnUnit') {
            it.options = data
          }
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    // 获取转交单位列表
    __updateTurnUnitTree() {
      // 数据字典 - 所属单位
      const parentId = 111133
      this.$store.dispatch('mecha/getDataDictionary', parentId).then((data) => {
        data.forEach(it => {
          it.value = it.dictValue
          it.label = it.dictName
        })
        TurnTableConfig.columns.forEach(it => {
          if (it.field === 'transferUnit' || it.field === 'toTransferUnit') {
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
        keywordField: ['machineName', 'useAddr']
      }
      let query = {}
      if (this.tabIndex === '0') {
        query = Object.assign(this.listQuery, filter, {
          machineTypeId: this.treeSelectId
        })
        delete query.sysDeptId
      } else {
        query = Object.assign(this.listQuery, filter, {
          sysDeptId: this.treeSelectId
        })
        delete query.machineTypeId
      }
      getUsingList(query).then(response => {
        this.listLoading = false
        this.list = response.data.rows
        this.total = Number(response.data.records)
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
        form: this.UsingEquipTableConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.UsingEquipTableConfig.columns
      })
      return editConfig
    },
    // 初始化回收窗口配置
    initRecycleConfig() {
      const recycleConfig = Object.assign({
        title: '回收',
        width: '1000px',
        form: this.RecycleTableConfig.columns
      })
      return recycleConfig
    },
    // 初始化移交窗口配置
    initTurnConfig() {
      const turnConfig = Object.assign({
        title: '移交',
        width: '1000px',
        form: this.TurnTableConfig.columns
      })
      return turnConfig
    },
    // 初始化查交窗口配置
    initCheckConfig() {
      const checkConfig = Object.assign({
        title: '查交',
        width: '1000px',
        form: this.CheckTableConfig.columns
      })
      return checkConfig
    },

    // 回收，移交，查交按钮
    otherClick(row, index, item) {
      console.log(row)
      const info = {
        bnsId: row.id,
        machineName: row.machineName,
        modelStd: row.modelStd,
        assetsCode: row.assetsCode
      }
      if (item === '回收') {
        this.__updateRecycleUnitTree()
        this.$refs.recycleDialog.updataForm(info)
        this.recycleDialogVisible = true
      } else if (item === '移交') {
        this.__updateTurnUnitTree()
        this.$refs.turnDialog.updataForm(info)
        this.turnDialogVisible = true
      } else if (item === '查交') {
        this.$refs.checkDialog.updataForm(info)
        this.checkDialogVisible = true
      }
    },

    // 回收
    recycleSubmit(submitData) {
      const query = Object.assign(submitData)
      createRecycle(query).then(response => {
        console.log(response)
        this.recycleDialogVisible = false
        this.$message.success('回收成功')
        this.$refs.recycleDialog.resetForm()
        this.__fetchData()
      }).catch(err => {
        console.log(err)
        this.$refs.recycleDialog.resetSubmitBtn()
      })
    },
    // 移交
    turnSubmit(submitData) {
      const query = Object.assign(submitData)
      createTransfer(query).then(response => {
        console.log(response)
        this.turnDialogVisible = false
        this.$message.success('移交成功')
        this.$refs.turnDialog.resetForm()
        this.__fetchData()
      }).catch(err => {
        console.log(err)
        this.$refs.turnDialog.resetSubmitBtn()
      })
    },
    // 查交
    checkSubmit(submitData) {
      const query = Object.assign(submitData)
      createCheck(query).then(response => {
        console.log(response)
        this.checkDialogVisible = false
        this.$message.success('查交成功')
        this.$refs.checkDialog.resetForm()
        this.__fetchData()
      }).catch(err => {
        console.log(err)
        this.$refs.checkDialog.resetSubmitBtn()
      })
    },

    // 点击树形菜单时触发
    handleNodeClick(data) {
      this.treeSelectId = data.parentId || data.id
      this.queryData()
    },
    // 点击切换树型菜单
    handleSwitch(tab) {
      this.tabIndex = tab.index
      if (this.tabIndex === '0') {
        this.__updateCategoryTree()
      } else {
        this.__updateOrganTree()
      }
    },
    // 打开上传文件空间
    openUploadDialog(ref, row) {
      // 记录当前打开弹窗ref
      this.dialogRef = ref
      this.uploadDialogVisible = true
      this.uploadRow = row
    },
    // 上传文件控件成功回调
    uploadSubmit(fileList) {
      console.log(fileList)
      this.$refs[this.dialogRef].updateFile(fileList)
      this.uploadDialogVisible = false
    }
  }
}
</script>
