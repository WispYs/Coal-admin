<template>
  <div class="page-container">
    <filter-bar
      :config="dangeRegistrationFilterConfig"
      @search-click="queryData"
      @create-click="openDialog('create')"
      @reset-click="queryData"
      @export-click="handelExport"
    />
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="dangeRegistConfig"
      height="calc(100% - 157px)"
      @load-tree-data="asyncData"
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
</template>

<script>
import { getOrganList, createOrgan, getOrganInfo, editOrgan, getOrganTree, getOrganChildTree, delOrgan } from '@/api/authority-management'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import { dangeRegistrationFilterConfig  , dangeRegistConfig} from '@/data/hidden-danger'
import exportExcel from '@/utils/export-excel'

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
      deleteDisabled: true // 批量删除置灰
    }
  },
  created() {
    this.__fetchData()
  },

  methods: {
    // 接口获取组织机构树，更新config数据
    __updateOrganTree() {
      getOrganTree().then(response => {
        dangeRegistConfig.columns.forEach(it => {
          if (it.field === 'parentId') {
            it.options = response.data
          }
        })
        console.log(dangeRegistConfig)
      })
    },
    // 获取组织机构列表
    __fetchData() {
      this.listLoading = false
      // 初次加载只获取根节点数据
      const entity = {
        'parentId': 0
      }
      const filter = {
        ...this.filter,
        ...{ entity },
        keywordField: ['deptName', 'shortName']
      }
      const query = Object.assign(this.listQuery, filter)
      getOrganList(query).then(response => {
        this.listLoading = false
        response.data.rows.forEach(it => {
          it.sysDeptId = Number(it.sysDeptId)
          if (it.parentCheck === 1) {
            it.hasChildren = true
          }
        })
        this.list = response.data.rows
        console.log(this.list)
        this.total = Number(response.data.records)
      })
    },

    // 异步获取树子节点数据
    asyncData(tree, treeNode, resolve) {
      getOrganChildTree(tree.sysDeptId).then(response => {
        console.log(response.data)
        const childrenTree = []
        response.data.forEach(it => {
          const item = {
            deptName: it.deptName,
            sysDeptId: Number(it.sysDeptId),
            shortName: it.shortName,
            deptType: it.deptType,
            sort: it.sort,
            createTime: it.createTime,
            remark: it.remark,
            hasChildren: it.parentCheck === 1
          }
          childrenTree.push(item)
        })
        resolve(childrenTree)
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
        width: '800px',
        form: this.dangeRegistConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '800px',
        form: this.dangeRegistConfig.columns
      })
      return editConfig
    },
    // 打开弹窗
    openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true

      // 接口获取组织机构树，更新config数据
      this.__updateOrganTree()

      // 如果有数据，更新子组件的 formData
      if (row) {
        getOrganInfo(row.sysDeptId).then(response => {
          const info = Object.assign(response.data, {
            parentId: Number(response.data.parentId) || 0,
            deptType: Number(response.data.deptType) || 0
          })
          this.$refs.editDialog.updataForm(info)
        })
      }
    },
    // 删除
    deleteClick(row) {
      this.$confirm('确定删除该组织吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delOrgan(row.sysDeptId).then(response => {
          console.log(response)
          this.$message.success('删除成功')
          this.__fetchData()
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    // 新增
    createSubmit(submitData) {
      console.log(submitData)
      const query = Object.assign(submitData, {
        parentId: Number(submitData.parentId) || 0
      })
      createOrgan(query).then(response => {
        console.log(response)
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
      editOrgan(query).then(response => {
        console.log(response)
        this.editDialogVisible = false
        this.$message.success('编辑成功')
        this.$refs.editDialog.resetForm()
        this.__fetchData()
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
<style lang="scss" scoped>
</style>
