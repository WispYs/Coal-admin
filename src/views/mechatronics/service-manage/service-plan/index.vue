<template>
  <div class="page-container has-tree" :class="treeExtend ? 'open-tree' : 'close-tree'">
    <tree-bar
      ref="treeBar"
      :tree-data="treeData"
      :default-props="treeProp"
      @handleNodeClick="handleNodeClick"
    />

    <div class="tree-form-container">
      <span class="tree-extend-btn" @click="treeExtend = !treeExtend">
        <i :class="treeExtend ? 'el-icon-d-arrow-left': 'el-icon-d-arrow-right'" />
      </span>
      <filter-bar
        :config="ServicePlanFilterConfig"
        @search-click="queryData"
        @create-click="openDialog('create')"
        @reset-click="queryData"
      />
      <!-- 表格 -->
      <list-table
        :id="id"
        :list="list"
        :list-loading="listLoading"
        :config="ServicePlanTableConfig"
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

    </div>

  </div>
</template>

<script>
import { getServicePlanList, createServicePlan, getServicePlanInfo, editServicePlan, delServicePlan } from '@/api/mechatronics'
import TreeBar from '@/components/TreeBar'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import { ServicePlanTableConfig, ServicePlanFilterConfig } from '@/data/mechatronics'
import { parseTime } from '@/utils'
export default {
  components: {
    TreeBar,
    FilterBar,
    ListTable,
    Pagination,
    FormDialog
  },
  data() {
    return {
      id: 'service-plan',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      currentNum: 0, // 当前页数据数量，用于判断删除后是否跳转到上一页
      filter: {}, // 筛选项
      listLoading: true,
      ServicePlanFilterConfig,
      ServicePlanTableConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      treeExtend: true,
      treeData: {
        title: '所属场所',
        tId: 'id',
        list: []
      },
      treeProp: {
        children: 'children',
        label: 'typeName'
      },
      deviceTypeId: 0, //  所属场所id
      multipleSelection: [], // 多选项
      deleteDisabled: true // 批量删除置灰
    }
  },

  created() {
    this.__fetchData()
    // 接口获取所属场所
    this.__updateEquipAreaTree()
    // 获取检修周期列表
    this.__updateServiceCycle()
  },
  methods: {
    // 接口获取所属场所
    __updateEquipAreaTree() {
      this.$store.dispatch('mecha/getEquipPlaceList').then((data) => {
        // 更新左侧树结构数据
        this.treeData.list = [{
          id: 0,
          typeName: '全部',
          children: data
        }]
        // 设置树结构默认选中项
        this.$refs.treeBar.setCurrentKey(0)

        // 更新新增、编辑config数据
        const placeData = []
        data.forEach(it => {
          placeData.push({
            label: it.typeName,
            value: it.id + ''
          })
        })
        ServicePlanTableConfig.columns.forEach(it => {
          if (it.field === 'deviceTypeId') {
            it.options = placeData
          }
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    // 获取检修周期列表
    __updateServiceCycle() {
      // 数据字典 - 检修周期
      const parentId = 111339
      this.$store.dispatch('mecha/getDataDictionary', parentId).then((data) => {
        data.forEach(it => {
          it.value = it.dictValue
          it.label = it.dictName
        })
        ServicePlanTableConfig.columns.forEach(it => {
          if (it.field === 'cycle') {
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
        keywordField: ['belongPlace', 'deviceName'],
        deviceTypeId: this.deviceTypeId
      }
      const query = Object.assign(this.listQuery, filter)
      getServicePlanList(query).then(response => {
        this.listLoading = false
        response.data.rows.forEach(it => {
          it.createTime = parseTime(it.createTime)
          it.oveTime = parseTime(it.oveTime)
        })
        this.list = response.data.rows
        this.total = Number(response.data.records)
        this.currentNum = response.data.rows.length
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
        form: this.ServicePlanTableConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.ServicePlanTableConfig.columns
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
        getServicePlanInfo(row.id).then(response => {
          const info = Object.assign(response.data, {
            createTime: parseTime(response.data.createTime),
            oveTime: parseTime(response.data.oveTime),
            deviceTypeId: response.data.deviceTypeId + '',
            cycle: response.data.cycle + '',
            dutyBy: response.data.dutyBy + '',
            ccBy: response.data.ccBy + ''
          })
          this.$refs.editDialog.updataForm(info)
        })
      }
    },
    // 删除当前页最后一条数据后跳转到前一页
    /**
     * @params{number} num 删除数量
     */
    changeCurrentPage(num) {
      this.currentNum = this.currentNum - num
      if (this.currentNum <= 0) {
        if (this.listQuery.page > 1) {
          this.$set(this.listQuery, 'page', this.listQuery.page - 1)
        }
      }
    },
    // 删除
    deleteClick(row) {
      this.$confirm('确定删除该项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delServicePlan(row.id).then(response => {
          this.$message.success('删除成功')
          this.changeCurrentPage(1)
          this.__fetchData()
        })
      })
    },
    // 新增
    createSubmit(submitData) {
      const query = Object.assign(submitData)
      createServicePlan(query).then(response => {
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
      editServicePlan(query).then(response => {
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
        this.$message.success('删除成功')
        this.changeCurrentPage(selectId.length)
        this.__fetchData()
      })
    },

    // 点击树形菜单时触发
    handleNodeClick(data) {
      this.deviceTypeId = data.id
      this.queryData()
    }
  }
}
</script>
