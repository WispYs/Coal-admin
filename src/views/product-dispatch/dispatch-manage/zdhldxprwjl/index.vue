<template>
  <div class="page-container">
    <filter-bar
      :config="DispatchZdhldxprwjlFilterConfig"
      @search-click="queryData"
      @create-click="openDialog('create')"
      @reset-click="queryData"
    />
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="DispatchZdhldxprwjlTableConfig"
      height="calc(100% - 157px)"
      @edit-click="(row) => openDialog('edit', row)"
      @other-click="otherClick"
      @delete-click="deleteClick"
      @submit-data="editSubmit"
      @selection-change="selectionChange"
    />
    <div v-show="total>0" class="page-bottom">
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
</template>

<script>
import { getDispatchZdhldxprwjlList, createKnowLedge, editKnowLedge, getKnowLedgeInfo, delKnowLedge, getOrganTree } from '@/api/product-dispatch'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import { DispatchZdhldxprwjlTableConfig, DispatchZdhldxprwjlFilterConfig } from '@/data/product-dispatch'

export default {
  components: { FilterBar, ListTable, Pagination, FormDialog },
  data() {
    return {
      id: 'know-ledge',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      DispatchZdhldxprwjlFilterConfig,
      DispatchZdhldxprwjlTableConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      multipleSelection: [], // 多选项
      deleteDisabled: true // 批量删除置灰

    }
  },

  created() {
    this.__fetchData()
    this.__initEquipPlace()
  },
  methods: {
    // 初始化所属场所下拉框数据
    __initEquipPlace() {
      // this.$store.dispatch('mecha/getEquipPlaceList').then((data) => {
      //   const placeData = []
      //   data.forEach(it => {
      //     placeData.push({
      //       label: it.typeName,
      //       value: it.id + ''
      //     })
      //   })
      //   DispatchZdhldxprwjlTableConfig.columns.forEach(it => {
      //     if (it.field === 'deviceTypeId') {
      //       it.options = placeData
      //     }
      //   })
      // }).catch((err) => {
      //   console.log(err)
      // })
    },
    __fetchData() {
      this.listLoading = true
      const filter = {
        ...this.filter,
        keywordField: ['belongPlace', 'pos']
      }
      const query = Object.assign(this.listQuery, filter)
      getDispatchZdhldxprwjlList(query).then(response => {
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
        width: '1000px',
        form: this.DispatchZdhldxprwjlTableConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.DispatchZdhldxprwjlTableConfig.columns
      })
      return editConfig
    },
    // 打开弹窗
    openDialog(name, row) {
      console.log(name, row)
      const visible = `${name}DialogVisible`
      this[visible] = true

      // 如果有数据，更新子组件的 formData
      if (row) {
        this.$refs.editDialog.updataForm(row)
        // getKnowLedgeInfo(row.id).then(response => {
        //   const info = Object.assign(response.data)
        //   this.$refs.editDialog.updataForm(info)
        // })
      }
    },
    // 作废
    otherClick(row) {
      this.$confirm('确定作废该任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(row.id)
        this.$message.success('作废成功')
        // delDisKnowLedge(row.id).then(response => {
        //   console.log(response)
        //   this.$message.success('作废成功')
        //   this.__fetchData()
        // })
      })
    },
    // 删除
    deleteClick(row) {
      this.$confirm('确定删除该项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(row.id)
        delKnowLedge(row.id).then(response => {
          console.log(response)
          this.$message.success('删除成功')
          this.__fetchData()
        })
      })
    },
    // 新建
    createSubmit(submitData) {
      const query = Object.assign(submitData)
      createKnowLedge(query).then(response => {
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
      editKnowLedge(query).then(response => {
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
        this.$message.warning('请选择所删除的文件')
        return false
      }
      this.$confirm('确定删除所选中文件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(selectId)
        this.__fetchData()
        this.$message.success('删除成功')
      })
    }

  }
}
</script>
