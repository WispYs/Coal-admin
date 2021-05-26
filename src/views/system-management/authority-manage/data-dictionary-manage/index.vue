<template>
  <div class="page-container">
    <filter-bar :config="dataDictionaryFilterConfig" @search-click="queryData" @create-click="openDialog('create')" />
    <list-table
      :id="id"
      ref="organTable"
      :list="list"
      :list-loading="listLoading"
      :config="dataDictionaryConfig"
      height="calc(100% - 148px)"
      @load-tree-data="asyncData"
      @addIco="(row) => openDialog('create', row)"
      @edit-click="(row) => openDialog('edit', row)"
      @delete-click="deleteClick"
    />

    <div v-show="total>0" class="page-bottom">
      <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pagerows" @pagination="pagination" />
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
  getApplicationList,
  getDictionaryList,
  getSelectSysDict,
  updateSysDict,
  saveSysDict,
  deleteDict,
  getDictById,
  getDataDictionaryChildTree
} from '@/api/authority-management'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import {
  dataDictionaryConfig,
  dataDictionaryFilterConfig
} from '@/data/authority-management'

export default {
  components: {
    FilterBar,
    ListTable,
    Pagination,
    FormDialog
  },
  data() {
    return {
      id: 'application-manage',
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      dataDictionaryConfig,
      dataDictionaryFilterConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      list: [],
      mapArr: [], // 存储异步加载的树状节点数据数组
      oldParentId: '' // 编辑节点前树状节点id
    }
  },

  created() {
    this.__fetchData()
  },
  methods: {
    __fetchData(_filter) {
      this.listLoading = true
      const query = {
        entity: {
          parentId: 0
        },
        sort: {
          asc: ['sortNo']
        },
        keyword: _filter,
        keywordField: ['dictName', 'dictValue'],
        page: this.listQuery.page,
        pagerows: this.listQuery.pagerows
      }
      getDictionaryList(query).then(response => {
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
    pagination() {
      this.__fetchData()
    },
    // 查询数据
    queryData(filter) {
      this.__fetchData(filter.keyword)
    },
    getChildTree(id) {
      const childrenTree = []
      return new Promise((resolve, reject) => {
        getDataDictionaryChildTree(id).then(response => {
          const childrenTree = []
          response.data.forEach(it => {
            const item = {
              dictName: it.dictName,
              sysDictId: Number(it.sysDictId),
              dictValue: it.dictValue,
              parentId: it.parentId,
              sortNo: it.sortNo,
              dictType: it.dictType,
              remark: it.remark,
              hasChildren: it.parentCheck == 1
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
      this.mapArr[tree.sysDictId] = {
        tree,
        treeNode,
        resolve
      }
      const treeData = await this.getChildTree(tree.sysDictId)
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
      }else{
        treeData = await this.getChildTree(parentId)
      }
      this.$refs.organTable.refreshLoadTree(parentId,treeData)
    },
    // 初始化新建窗口配置
    initCreateConfig() {
      const arrFilter = this.dataDictionaryConfig.columns.filter((ele, index, arr) => {
        return !!ele.field.indexOf('sysDictId') && !!ele.field.indexOf('dictType')
      })
      const createConfig = Object.assign({
        title: '创建',
        width: '1000px',
        form: arrFilter
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const arrFilter = this.dataDictionaryConfig.columns.filter((ele, index, arr) => {
        return !!ele.field.indexOf('sysDictId') && !!ele.field.indexOf('dictType')
      })
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: arrFilter
      })
      return editConfig
    },
    // 打开弹窗
    async openDialog(name, row) {
      const visible = `${name}DialogVisible`
      this[visible] = true
      this.dictTree()
      if (row) {
        // 如果有数据，更新子组件的 formData
        getDictById(row.sysDictId).then(response =>{
          this.$refs.editDialog.updataForm(response.data)
        })
      }
    },
    // 接口获取数据字典树，更新config数据
    dictTree() {
      getSelectSysDict().then(response => {
        const dictList = []
        this.dataDictionaryConfig.columns.forEach(it => {
          if (it.field === 'parentId') {
            it.options = response.data
          }
        })
      })
    },
    // 删除
    deleteClick(data) {
      this.$confirm('确定删除该数据字典?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDict(data.sysDictId).then(response => {
          this.refreshLoadTree(data.parentId)
          this.__fetchData()
          this.$message.success('删除成功')
        })
      })
    },
    // submit data
    createSubmit(submitData) {
      if (!submitData.parentId) {
        submitData.parentId = 0
      }
      const query = Object.assign(submitData, {
        sortNo: Number(submitData.sortNo) || 0
      })
      saveSysDict(submitData).then(response => {
        this.createDialogVisible = false
        this.refreshLoadTree(submitData.parentId)
        this.$refs.createDialog.resetForm()
        this.__fetchData()
        this.$message.success('新建成功')
      }).catch(err => {
        this.$refs.createDialog.resetSubmitBtn()
      })
    },
    editSubmit(submitData) {
      const query = Object.assign(submitData)
      updateSysDict(query).then(response => {
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
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
