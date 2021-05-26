<template>
  <div class="page-container">
    <filter-bar
      :config="MechLargeEquipTypeFilterConfig"
      @search-click="queryData"
      @create-click="openDialog('create')"
      @reset-click="queryData"
    />
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="MechLargeEquipTypeTableConfig"
      height="calc(100% - 157px)"
      @edit-click="(row) => openDialog('edit', row)"
      @other-click="(row) => openDetailDialog(row.id)"
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
</template>

<script>
import {
  getLargeEquipmentType,
  createLargeEquipmentType,
  getLargeEquipmentTypeInfo,
  editLargeEquipmentType,
  delLargeEquipmentType
} from '@/api/mechatronics'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import { MechLargeEquipTypeTableConfig, MechLargeEquipTypeFilterConfig } from '@/data/mechatronics'

export default {
  components: {
    FilterBar,
    ListTable,
    Pagination,
    FormDialog
  },
  data() {
    return {
      id: 'organization-manage',
      list: [],
      total: 0,
      currentNum: 0, // 当前页数据数量，用于判断删除后是否跳转到上一页
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      MechLargeEquipTypeTableConfig,
      MechLargeEquipTypeFilterConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      deviceTypeId: '', //  特有属性所属的场所id
      multipleSelection: [], // 多选项
      deleteDisabled: true // 批量删除置灰
    }
  },
  created() {
    this.__fetchData()
  },

  methods: {
    // 初始化所属场所下拉框数据
    __initEquipPlace() {
      this.$store.dispatch('mecha/getEquipPlaceList').then((data) => {
        const placeData = []
        data.forEach(it => {
          placeData.push({
            label: it.typeName,
            value: it.id + ''
          })
        })
        MechLargeEquipTypeTableConfig.columns.forEach(it => {
          if (it.field === 'parentId') {
            it.options = placeData
          }
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    // 获取组织机构列表
    __fetchData() {
      this.listLoading = true
      const filter = {
        ...this.filter,
        keywordField: ['typeName']
      }
      const query = Object.assign(this.listQuery, filter)
      getLargeEquipmentType(query).then(response => {
        this.listLoading = false
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
        form: this.MechLargeEquipTypeTableConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.MechLargeEquipTypeTableConfig.columns
      })
      return editConfig
    },
    // 打开弹窗
    openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true

      // 初始化所属场所下拉框数据
      this.__initEquipPlace()

      // 如果有数据，更新子组件的 formData
      if (row) {
        getLargeEquipmentTypeInfo(row.id).then(response => {
          const info = Object.assign(response.data)
          this.$refs[`${name}Dialog`].updataForm(info)
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
      this.$confirm('确定删除该类型吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delLargeEquipmentType(row.id).then(response => {
          console.log(response)
          this.$message.success('删除成功')
          this.changeCurrentPage(1)
          this.__fetchData()
        })
      })
    },
    // 新增
    createSubmit(submitData) {
      const query = Object.assign(submitData)
      createLargeEquipmentType(query).then(response => {
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
      editLargeEquipmentType(query).then(response => {
        console.log(response)
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
        this.$message.warning('请选择所删除的类型')
        return false
      }
      this.$confirm('确定删除所选中文件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(selectId)
        this.$message.success('删除成功')
        this.changeCurrentPage(selectId.length)
        this.__fetchData()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
