<template>
  <div class="page-container">
    <!-- <organ-button-search
      :update-disabled="updateDisabled"
      :delete-disabled="deleteDisabled"
      :move-up-disabled="moveUpDisabled"
      :move-down-disabled="moveDownDisabled"
      @openDialog="openDialog"
      @deleteClick="deleteClick"
      @moveUpClick="moveUpClick"
      @moveDownClick="moveDownClick"
      @handelExport="handelExport"
      @synchroClick="synchroClick"
      @queryData="queryData"
    /> -->
    <filter-bar
      :config="OrganFilterConfig"
      @search-click="queryData"
      @create-click="openDialog('create')"
      @reset-click="queryData"
      @export-click="handelExport"
    />
    <list-table
      :id="id"
      ref="organTable"
      :list="list"
      :list-loading="listLoading"
      :config="OrganTableConfig"
      height="calc(100% - 157px)"
      @load-tree-data="asyncData"
      @edit-click="(row) => openDialog('edit', row)"
      @delete-click="deleteClick"
      @submit-data="editSubmit"
      @selection-change="selectionChange"
    />
    <!-- <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="OrganTableConfig"
      @load-tree-data="asyncData"
      @addIco="(row) => openDialog('create', row)"
      @editIco="(row) => openDialog('edit', row)"
      @deleteIco="deleteClick"
      @moveUpIco="moveUpClick"
      @moveDownIco="moveDownClick"
      @selectionChange="selectionChange"
    /> -->
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
import { getsysDictListById } from '@/api/hidden-danger'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import OrganButtonSearch from './components/organ-button-search/index.vue'
import { OrganTableConfig, OrganFilterConfig } from '@/data/authority-management'
import exportExcel from '@/utils/export-excel'

export default {
  components: {
    FilterBar,
    ListTable,
    Pagination,
    FormDialog,
    OrganButtonSearch
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
      OrganTableConfig,
      OrganFilterConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      multipleSelection: [], // 多选项
      deleteDisabled: true, // 批量删除置灰
      mapArr: [], // 存储异步加载的树状节点数据数组
      oldParentId: '' // 编辑节点前树状节点id
    }
  },
  created() {
    this.__fetchData()
    this.__fetchType()
  },

  methods: {
    __fetchType() {
      const query = {
        parentId: 10076
      }
      getsysDictListById(query.parentId).then(response => {
        let selectList = response.data
        for (let m in response.data) {
          this.getIterationData(selectList[m], response.data[m])
        }
        this.OrganTableConfig.columns.forEach(it => {
          if (it.field === 'deptType') {
            it.options = selectList
          }
        })
        console.log(this.OrganTableConfig);
      })
    },
    getIterationData(_m, _d) {
      _m.label = _d.dictName
      _m.value = _d.sysDictId
      _m.children = _d.sysDictList
      if (_d.sysDictList.length > 0) {
        for (let m in _d.sysDictList) {
          this.getIterationData(_m.children[m], _d.sysDictList[m])
        }
      }
    },
    // 接口获取组织机构树，更新config数据
    __updateOrganTree() {
      getOrganTree().then(response => {
        this.OrganTableConfig.columns.forEach(it => {
          if (it.field === 'parentId') {
            it.options = response.data
          }
        })
        console.log(OrganTableConfig)
      })
    },
    // 获取组织机构列表
    __fetchData() {
      this.listLoading = true
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
          if (it.parentCheck === 1) {
            it.hasChildren = true
          }
        })
        this.list = response.data.rows
        this.total = Number(response.data.records)
      })
    },

    // 异步获取树子节点数据
    asyncData(tree, treeNode, resolve) {
      // 将当前选中节点数据存储到mapArr中
      this.mapArr[tree.sysDeptId] = { tree, treeNode, resolve }

      getOrganChildTree(tree.sysDeptId).then(response => {
        const childrenTree = []
        response.data.forEach(it => {
          const item = {
            deptName: it.deptName,
            sysDeptId: Number(it.sysDeptId),
            parentId: it.parentId,
            shortName: it.shortName,
            deptType: it.deptType,
            sort: it.sort,
            createTime: it.createTime,
            remark: it.remark,
            hasChildren: it.parentCheck === 1
          }
          childrenTree.push(item)
        })
        console.log(childrenTree);
        resolve(childrenTree)
      })
    },
    // 重新触发树形表格的loadTree函数
    refreshLoadTree(parentId) {
      const mapsData = this.mapArr[parentId]

      // 如果mapsData不为undefined，则表示之前打开过树形结构
      if (mapsData) {
        const { tree, treeNode, resolve } = mapsData
        this.asyncData(tree, treeNode, resolve)
      }
      this.$refs.organTable.refreshLoadTree(parentId)
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
        form: this.OrganTableConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '800px',
        form: this.OrganTableConfig.columns
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
          this.refreshLoadTree(row.parentId)
          this.$message.success('删除成功')
          this.__fetchData()
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    // 新增
    createSubmit(submitData) {
      const query = Object.assign(submitData)
      createOrgan(query).then(response => {
        this.createDialogVisible = false
        this.$message.success('新建成功')
        this.refreshLoadTree(submitData.parentId)
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
        // 更新编辑前后父节点数据
        this.refreshLoadTree(submitData.parentId)
        this.refreshLoadTree(this.oldParentId)

        this.editDialogVisible = false
        this.$message.success('编辑成功')
        this.$refs.editDialog.resetForm()
        this.__fetchData()
      }).catch(err => {
        console.log(err)
        this.$refs.editDialog.resetSubmitBtn()
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
