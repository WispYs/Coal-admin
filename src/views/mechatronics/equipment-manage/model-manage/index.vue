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
        :config="EquipModelFilterConfig"
        @search-click="queryData"
        @create-click="openDialog('create')"
        @reset-click="queryData"
      />
      <!-- 表格 -->
      <list-table
        :id="id"
        :list="list"
        :list-loading="listLoading"
        :config="EquipModelTableConfig"
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
import { getModelList, createModel, getModelInfo, editModel, delModel, getCategoryList } from '@/api/mechatronics'
import TreeBar from '@/components/TreeBar'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import { EquipModelTableConfig, EquipModelFilterConfig } from '@/data/mechatronics'
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
      id: 'model-manage',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      currentNum: 0, // 当前页数据数量，用于判断删除后是否跳转到上一页
      filter: {}, // 筛选项
      listLoading: true,
      EquipModelFilterConfig,
      EquipModelTableConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      treeExtend: true,
      treeData: {
        title: '选择设备类型',
        tId: 'id',
        list: []
      },
      treeProp: {
        children: 'children',
        label: 'typeName'
      },
      machineTypeId: '', //  设备类型id
      multipleSelection: [], // 多选项
      deleteDisabled: true // 批量删除置灰
    }
  },

  created() {
    this.__fetchData()
    this.__updateCategoryTree()
  },
  methods: {
    // 接口获取设备类型列表
    __updateCategoryTree() {
      this.$store.dispatch('mecha/getCategoryList').then((data) => {
        this.treeData.list = [{
          id: '',
          typeName: '全部',
          children: data
        }]
        // 设置树结构默认选中项
        this.$refs.treeBar.setCurrentKey('')

        // 更新设备类型下拉框数据config
        const typeData = []
        data.forEach(it => {
          typeData.push({
            label: it.typeName,
            value: it.id + ''
          })
        })
        EquipModelTableConfig.columns.forEach(it => {
          if (it.field === 'machineTypeId') {
            it.options = typeData
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
        keywordField: ['typeName', 'typeCode'],
        machineTypeId: this.machineTypeId
      }
      const query = Object.assign(this.listQuery, filter)
      getModelList(query).then(response => {
        this.listLoading = false
        response.data.rows.forEach(it => {
          it.createTime = parseTime(it.createTime)
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
        form: this.EquipModelTableConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.EquipModelTableConfig.columns
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
        getModelInfo(row.id).then(response => {
          const info = Object.assign(response.data, {
            machineTypeId: response.data.machineTypeId + ''
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
        delModel(row.id).then(response => {
          this.$message.success('删除成功')
          this.changeCurrentPage(1)
          this.__fetchData()
        })
      })
    },
    // 新增
    createSubmit(submitData) {
      const query = Object.assign(submitData)
      createModel(query).then(response => {
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
      editModel(query).then(response => {
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
      this.machineTypeId = data.id
      this.queryData()
    }
  }
}
</script>
