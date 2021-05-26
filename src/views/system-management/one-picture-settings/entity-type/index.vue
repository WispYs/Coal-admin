<template>
  <div class="page-container">
    <filter-bar
      :config="EntityTypeFilterConfig"
      @search-click="queryData"
      @create-click="openDialog('create')"
      @reset-click="queryData"
      @refresh-click="queryData"
    />
    <list-table
      :id="id"
      ref="organTable"
      :list="list"
      :list-loading="listLoading"
      :config="EntityTypeTableConfig"
      height="calc(100% - 157px)"
      @edit-click="(row) => openDialog('edit', row)"
      @delete-click="deleteClick"
      @submit-data="editSubmit"
      @selection-change="selectionChange"
    />

    <div v-show="total>0" class="page-bottom">
      <!-- <el-button
        class="page-bottom__delete"
        type="warning"
        size="small"
        plain
        :disabled="deleteDisabled"
        @click="deleteBatches"
      >
        <i class="el-icon-delete el-icon--left" />批量删除
      </el-button> -->
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
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FormDialog from '@/components/FormDialog'
import {
  EntityTypeTableConfig,
  EntityTypeFilterConfig
} from '@/data/one-picture-settings'
import {
  delObject,
  saveObject,
  updateObject,
  getObjectByPage,
  getSysEntityTypePageTree,
  getObjectById,
  deleteBatches,
  getSysEntityTypeTree
} from '@/api/one-picture-settings'
export default {
  components: { FilterBar, ListTable, Pagination, FormDialog },
  data() {
    return {
      id: 'entity-type',
      bussiness: 'sysEntityType',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      EntityTypeFilterConfig,
      EntityTypeTableConfig,
      createDialogVisible: false,
      editDialogVisible: false,
      multipleSelection: [], // 多选项
      deleteDisabled: true, // 批量删除置灰
      accidentType: [],
      mapArr: []
    }
  },
  created() {
    this.__updateOrganTree()
    this.__fetchData()
  },
  methods: {
    // 接口获取组织机构树，更新config数据
    __updateOrganTree() {
      getSysEntityTypeTree().then(response => {
        this.formatData(response.data)
        EntityTypeTableConfig.columns.forEach(it => {
          if (it.field === 'parentId') {
            it.options = response.data
          }
        })
      })
    },
    formatData(data) {
      data.forEach(d => {
        d.value = Number(d.value)
        if (d.children.length > 0) {
          this.formatData(d.children)
        }
      })
    },
    // 获取组织机构列表
    __fetchData() {
      this.listLoading = true
      const filter = {
        ...this.filter,
        keywordField: ['label', 'value']
      }
      const query = Object.assign(this.listQuery, filter)
      getSysEntityTypePageTree(query, this.bussiness).then(response => {
        this.listLoading = false
        // console.log(response.data)
        // 使用同步加载需要去除
        response.data.rows.forEach(r => {
          delete r.hasChildren
        })
        this.list = response.data.rows
        this.total = Number(response.data.records)

        if (this.listQuery.page > 1 && !this.list.length) {
          this.listQuery.page--
          this.__fetchData()
        }
      })
    },
    // 异步获取树子节点数据
    asyncData(tree, treeNode, resolve) {
      this.mapArr[tree['parentId']] = { tree, treeNode, resolve }
      const data = {
        entity: {
          parentId: tree.value
        }
      }
      getObjectByPage(data, this.bussiness).then(response => {
        const childrenTree = []
        response.data.rows.forEach(it => {
          const item = {
            beginTime: it.beginTime,
            code: it.code,
            delFlag: it.delFlag,
            name: it.name,
            orderNum: it.orderNum,
            parentId: it.parentId,
            remark: it.remark,
            hasChildren: it.hasChildren,
            value: it.value
          }
          childrenTree.push(item)
        })
        resolve(childrenTree)
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
    // 重新触发树形表格的loadTree函数
    refreshLoadTree(parentId) {
      const mapsData = this.mapArr[parentId]
      console.log('mapArr[parentId]', mapsData)
      console.log('mapArr', this.mapArr)
      console.log('parentId', parentId)
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
        width: '1000px',
        form: this.EntityTypeTableConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '1000px',
        form: this.EntityTypeTableConfig.columns
      })
      return editConfig
    },
    // 打开弹窗
    openDialog(name, row) {
      // console.log(name, row)
      const visible = `${name}DialogVisible`
      this[visible] = true

      this.__updateOrganTree()

      if (row) {
        getObjectById(row['value'], this.bussiness).then(response => {
          const res = response.data
          res['label'] = res['typeName']
          const info = Object.assign(response.data, {
            parentId: Number(res.parentId) || 0,
            code: Number(res.code),
            // value: Number(res.value),
            value: Number(res.value)
          })
          this.oldParentId = info.parentId
          this.$refs.editDialog.updataForm(info)
        })
      }
    },
    // 删除
    deleteClick(row) {
      this.$confirm('确定删除该站点?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delObject(row['value'], this.bussiness).then(response => {
          this.$message.success('删除成功')
          this.__fetchData()
        })
      })
    },
    // 新建
    createSubmit(submitData) {
      const query = Object.assign(submitData, {
        orderNum: Number(submitData.orderNum) || 0
      })
      if (!submitData.parentId) {
        submitData.parentId = 0
      }
      submitData['typeName'] = submitData['label']
      console.log('onSubmit formData', submitData)
      saveObject(query, this.bussiness).then(response => {
        this.__fetchData()
        this.createDialogVisible = false
        this.$message.success('新建成功')
        this.$refs.createDialog.resetForm()
        // this.__fetchData()
      }).catch(err => {
        console.log(err)
        this.$refs.createDialog.resetSubmitBtn()
      })
    },
    // 编辑
    editSubmit(submitData) {
      // console.log(submitData)
      if (!submitData.parentId) {
        submitData.parentId = 0
      }
      submitData['typeName'] = submitData['label']
      const query = Object.assign(submitData)
      updateObject(query, this.bussiness).then(response => {
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
      // console.log(this.multipleSelection)
    },

    // 批量删除
    deleteBatches() {
      const arr = []
      this.multipleSelection.forEach(m => arr.push(m[`${this.bussiness}Id`]))
      if (arr.length === 0) {
        this.$message.warning('请选择所删除的文件')
        return false
      }
      this.$confirm('确定删除所选中文件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBatches(arr, this.bussiness).then(res => {
          this.$message.success('删除成功')
          this.__fetchData()
        })
      })
    }

  }
}
</script>

<style>

</style>
