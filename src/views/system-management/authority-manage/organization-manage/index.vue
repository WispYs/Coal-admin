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
      :list="list"
      :list-loading="listLoading"
      :config="OrganTableConfig"
      @load-tree-data="asyncData"
      @edit-click="(row) => openDialog('edit', row)"
      @delete-click="deleteClick"
      @submit-data="editSubmit"
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
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pagerows"
      @pagination="__fetchData"
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
import { getOrganList, createOrgan, getOrganInfo, editOrgan, getOrganTree, getOrganChildTree, delOrgan } from '@/api/authority-management'
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
      updateDisabled: true,
      deleteDisabled: true,
      institutionSearch: '',
      moveUpDisabled: true,
      moveDownDisabled: true,
      selectData: []
    }
  },
  created() {
    this.__fetchData()
  },
  mounted() {

  },
  methods: {
    // 接口获取组织机构树，更新config数据
    __updateOrganTree() {
      getOrganTree().then(response => {
        OrganTableConfig.columns.forEach(it => {
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
      const filter = {
        ...this.filter,
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

    //
    getChild() {

    },

    // 异步获取树子节点数据
    asyncData(tree, treeNode, resolve) {
      console.log(tree, treeNode, resolve)
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
            remark: it.remark
          }
          childrenTree.push(item)
        })
        console.log(childrenTree.splice(-2))
        resolve(childrenTree.splice(-2))
      })
      // setTimeout(() => {
      //   resolve([{
      //     deptName: '矿领导',
      //     deptId: '001010',
      //     shortName: '矿领导',
      //     deptType: 3,
      //     sort: 2,
      //     createTime: '2020.07.21'
      //   }, {
      //     deptName: '办公室',
      //     deptId: '001012',
      //     shortName: '办公室',
      //     deptType: 2,
      //     sort: 186,
      //     createTime: '2020.12.19'
      //   }])
      // }, 1000)
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
        delOrgan(row.sysUserId).then(response => {
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
    // submit edit
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
    // 同步
    synchroClick() {
      this.__fetchData()
      this.$message.success('同步成功')
    },
    // 上移
    moveUpClick(row, index) {
      if (row && index) {
        this.list[index] = this.list[index - 1]
        this.list[index - 1] = row
      } else {
        let _index
        for (const d in this.list) {
          console.log(d)
          if (this.list[d].name == this.selectData[0].name) {
            _index = d
            break
          }
        }
        if (_index == 0) {
          this.$message.error('该数据已经位于最前面,不能再上移了哈')
          return
        } else {
          this.list[_index] = this.list[_index - 1]
          this.list[_index - 1] = this.selectData[0]
        }
      }
      this.$message.success('上移成功')
      this.__fetchData()
    },
    // 下移
    moveDownClick(row, index) {
      this.list[index] = this.list[index + 1]
      this.list[index + 1] = row
      this.$message.success('下移成功')
      this.__fetchData()
    },
    // 点击checkbox触发
    selectionChange(_data) {
      this.selectData = _data
      console.log(_data)
      if (this.selectData.length > 0) {
        this.deleteDisabled = false
        if (this.selectData.length == 1) {
          this.updateDisabled = false
          this.moveDownDisabled = false
          this.moveUpDisabled = false
        } else {
          this.updateDisabled = true
          this.moveDownDisabled = true
          this.moveUpDisabled = true
        }
      } else {
        this.deleteDisabled = true
        this.updateDisabled = true
        this.moveDownDisabled = true
        this.moveUpDisabled = true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
