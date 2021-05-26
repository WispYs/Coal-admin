<template>
  <div class="page-container">
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
      <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pagerows" @pagination="__fetchData" />
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
  getOrganList,
  createOrgan,
  getOrganInfo,
  editOrgan,
  getOrganTree,
  getOrganChildTree,
  delOrgan
} from '@/api/authority-management'
import {
  getsysDictListById
} from '@/api/hidden-danger'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import {
  OrganTableConfig,
  OrganFilterConfig
} from '@/data/authority-management'
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
        const selectList = []
        for (const m in response.data) {
          selectList.push({
            value: response.data[m].sysDictId,
            label: response.data[m].dictName
          })
        }
        OrganTableConfig.columns.forEach(it => {
          if (it.field === 'deptType') {
            it.options = selectList
          }
        })
      })
    },
    // 接口获取组织机构树，更新config数据
    __updateOrganTree() {
      getOrganTree().then(response => {
        this.OrganTableConfig.columns.forEach(it => {
          if (it.field === 'parentId') {
            it.options = response.data
          }
        })
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
        ...{
          entity
        },
        keywordField: ['deptName', 'shortName']
      }
      const query = Object.assign(this.listQuery, filter)
      getOrganList(query).then(response => {
        if (response.data.rows.length > 0) {
          this.listLoading = false
          response.data.rows.forEach(it => {
            if (it.parentCheck === 1) {
              it.hasChildren = true
            }
          })
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
    getChildTree(id) {
      const childrenTree = []
      return new Promise((resolve, reject) => {
        getOrganChildTree(id).then(response => {
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
          resolve(childrenTree)
        }).catch(err => {
          reject(err)
        })
      })
    },

    // 异步获取树子节点数据
    async asyncData(tree, treeNode, resolve) {
      // 将当前选中节点数据存储到mapArr中
      this.mapArr[tree.sysDeptId] = {
        tree,
        treeNode,
        resolve
      }
      const treeData = await this.getChildTree(tree.sysDeptId)
      resolve(treeData)
      return treeData
    },
    // 重新触发树形表格的loadTree函数
    async refreshLoadTree(parentId) {
      const mapsData = this.mapArr[parentId]
      let treeData = []
      // 如果mapsData不为undefined，则表示之前打开过树形结构
      if (mapsData) {
        const {
          tree,
          treeNode,
          resolve
        } = mapsData
        treeData = this.asyncData(tree, treeNode, resolve)
      } else {
        treeData = await this.getChildTree(parentId)
      }
      this.$refs.organTable.refreshLoadTree(parentId, treeData)
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
        form: this.OrganTableConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.OrganTableConfig.columns
      })
      return editConfig
    },
    // 打开弹窗
    async openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true

      // 接口获取组织机构树，更新config数据
      this.__updateOrganTree()
      // 如果有数据，更新子组件的 formData
      if (row) {
        getOrganInfo(row.sysDeptId).then(response => {
          const info = Object.assign(response.data)
          // 记录编辑前的父节点id，用于编辑节点后更新数据
          this.oldParentId = info.parentId
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
      }).catch((err) => {
        console.log(err)
        this.$message.info('已取消删除')
      })
    },
    // 新增
    createSubmit(submitData) {
      if (!submitData.parentId) {
        submitData.parentId = 0
      }
      const query = Object.assign(submitData)
      createOrgan(query).then(response => {
        this.createDialogVisible = false
        this.$message.success('新建成功')
        this.refreshLoadTree(submitData.parentId)
        this.$refs.createDialog.resetForm()
        this.__fetchData()
      }).catch(err => {
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
        this.$refs.editDialog.resetSubmitBtn()
      })
    },
    // 定义导出Excel表格事件
    handelExport() {
      this.$message.info('敬请期待')
      return
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
    },

    // 批量删除
    deleteBatches() {
      const selectId = []
      this.multipleSelection.forEach(it => selectId.push(it.id))
      if (selectId.length === 0) {
        this.$message.warning('请选择所删除的文件')
        return false
      }
      this.$confirm('确定删除所选中文件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.__fetchData()
        this.$message.success('删除成功')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
