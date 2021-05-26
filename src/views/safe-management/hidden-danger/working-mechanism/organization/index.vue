<template>
  <div class="page-container">
    <filter-bar
      :config="HiddenTissueFilterConfig"
      @search-click="queryData"
      @create-click="openDialog('create')"
      @reset-click="queryData"
    />
    <list-table
      :id="id"
      ref="organTable"
      :list="list"
      :list-loading="listLoading"
      :config="HiddenTissueConfig"
      height="calc(100% - 157px)"
      @load-tree-data="asyncData"
      @edit-click="(row) => openDialog('edit', row)"
      @delete-click="deleteClick"
      @submit-data="editSubmit"
    />
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pagerows"
      @pagination="pagination"
    />
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
  getAqglHiddenTissue,
  getAqglHiddenTissueTree,
  getHiddenTissueChildTree,
  saveAqglHiddenTissue,
  updateaqglHiddenTissue,
  deleteaqglHiddenTissue,
  getAqglHiddenTissueById
} from '@/api/organization'
import {
  getsysDictListById
} from '@/api/hidden-danger'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import {
  HiddenTissueConfig,
  HiddenTissueFilterConfig
} from '@/data/organization'
export default {
  components: {
    FilterBar,
    ListTable,
    Pagination,
    FormDialog
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
      HiddenTissueFilterConfig,
      HiddenTissueConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      riskFilterList: [],
      mapArr: [], // 存储异步加载的树状节点数据数组
      oldParentId: '' // 编辑节点前树状节点id
    }
  },
  created() {
    this.__fetchData()
    this.__fetchSelectList()
  },
  methods: {
    __fetchSelectList() {
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
        this.HiddenTissueConfig.columns.forEach(it => {
          if (it.field === 'unitId') {
            it.options = selectList
          }
        })
      })
    },
    __fetchData(_filter) {
      this.listLoading = true
      const query = {
        page: this.listQuery.page,
        pagerows: this.listQuery.pagerows,
        entity: {
          parentId: 0
        },
        keyword: _filter,
        keywordField: ['company'],
        sort: {
          asc: ['orderNum']
        }
      }
      getAqglHiddenTissue(query).then(response => {
        if (response.data.rows.length > 0) {
          response.data.rows.forEach(it => {
            if (it.parentCheck === 1) {
              it.hasChildren = true
            }
          })
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
    getChildTree(id) {
      const childrenTree = []
      return new Promise((resolve, reject) => {
        getHiddenTissueChildTree(id).then(response => {
          response.data.forEach(it => {
            const item = {
              aqglHiddenTissueId: it.aqglHiddenTissueId,
              company: it.company,
              code: Number(it.code),
              unitId: it.unitId,
              orderNum: it.orderNum,
              parentId: it.parentId,
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
    async asyncData(tree, treeNode, resolve) {
      // 将当前选中节点数据存储到mapArr中
      this.mapArr[tree.aqglHiddenTissueId] = {
        tree,
        treeNode,
        resolve
      }
      const treeData = await this.getChildTree(tree.aqglHiddenTissueId)
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
      } else{
        treeData = await this.getChildTree(parentId)
      }
      this.$refs.organTable.refreshLoadTree(parentId,treeData)
    },
    // 获取对应隐患组织下的子组织树,不传代表查全部隐患组织树
    __getHiddenTissueTree() {
      const query = {
        aqglHiddenTissueId: ''
      }
      getAqglHiddenTissueTree(query).then(response => {
        this.HiddenTissueConfig.columns.forEach(it => {
          if (it.field === 'parentId') {
            it.options = response.data
          }
        })
      })
    },
    // 查询数据
    queryData(filter) {
      this.__fetchData(filter.name)
    },
    pagination(data) {
      this.listQuery.page = data.page
      this.listQuery.pagerows = data.pagerows
      this.__fetchData()
    },
    // 初始化新建窗口配置
    initCreateConfig() {
      const createConfig = Object.assign({
        title: '新建',
        width: '1000px',
        form: this.HiddenTissueConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.HiddenTissueConfig.columns
      })
      return editConfig
    },
    // 打开弹窗
    async openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true
      this.__getHiddenTissueTree()
      if (row) {
        getAqglHiddenTissueById(row.aqglHiddenTissueId).then(response => {
          const info = Object.assign(response.data)
          this.oldParentId = info.parentId
          this.$refs.editDialog.updataForm(info)
        })
      }
    },
    // 删除
    deleteClick(row) {
      this.$confirm('确定删除该组织结构?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteaqglHiddenTissue(row.aqglHiddenTissueId).then(response => {
          this.refreshLoadTree(row.parentId)
          this.$message.success('删除成功')
          this.__fetchData()
        })
      }).catch((err) => {
        console.log(err)
        this.$message.info('已取消删除')
      })
    },
    // submit data
    createSubmit(submitData) {
      if (!submitData.parentId) {
        submitData.parentId = 0
      }
      const query = Object.assign(submitData)
      saveAqglHiddenTissue(query).then(response => {
        this.refreshLoadTree(query.parentId)
        this.__fetchData()
        this.$refs.createDialog.resetForm()
        this.createDialogVisible = false
        this.$message.success('新建成功')
      }).catch(err => {
        this.$refs.createDialog.resetSubmitBtn()
      })
    },
    editSubmit(submitData) {
      if (!submitData.parentId) {
        submitData.parentId = 0
      }
      const query = Object.assign(submitData)
      updateaqglHiddenTissue(query).then(response => {
        // 更新编辑前后父节点数据
        this.refreshLoadTree(query.parentId)
        this.refreshLoadTree(this.oldParentId)
        this.__fetchData()
        this.$refs.editDialog.resetForm()
        this.editDialogVisible = false
        this.$message.success('编辑成功')
      }).catch(err => {
        this.$refs.editDialog.resetSubmitBtn()
      })
    }
  }
}
</script>
