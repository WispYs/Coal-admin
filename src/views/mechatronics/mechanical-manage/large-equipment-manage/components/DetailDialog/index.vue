<template>
  <el-dialog
    :title="config.title"
    :visible.sync="dialogVisible"
    :width="config.width || '500px'"
    :before-close="closeDialog"
    class="detail-dialog"
  >
    <div style="padding: 20px;height: 100%">
      <filter-bar
        :config="config.filter"
        @search-click="queryData"
        @create-click="openDialog('createDetail')"
        @reset-click="queryData"
      />
      <list-table
        :id="id"
        :list="list"
        :list-loading="listLoading"
        :config="config.form"
        height="calc(100% - 137px)"
        @edit-click="(row) => openDialog('editDetail', row)"
        @delete-click="deleteClick"
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

    </div>

  </el-dialog>
</template>
<script>
import { getEquipmentAreaList, delEquipmentArea } from '@/api/mechatronics'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'

export default {
  components: {
    ListTable,
    FilterBar,
    Pagination
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    // 弹窗配置项
    config: {
      type: Object,
      default: () => ({})
    }

  },
  data() {
    return {
      id: 'large-equip-detail',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: false,
      multipleSelection: [], // 多选项
      deleteDisabled: true, // 批量删除置灰

      keyword: '',
      content: '',
      selectMember: [],
      sysDeptId: ''
    }
  },
  created() {
    // this.__fetchData()
  },
  methods: {
    __fetchData() {
      this.listLoading = true
      const filter = {
        ...this.filter,
        keywordField: ['workNumber', 'loginName', 'userName']
      }
      const query = Object.assign(this.listQuery, filter)
      getEquipmentAreaList(query).then(response => {
        this.listLoading = false
        this.list = response.data.rows
        this.total = Number(response.data.records)
      })
    },
    // 查询数据
    queryData(filter) {
      this.filter = Object.assign(this.filter, filter)
      console.log(this.filter)
      this.__fetchData()
    },

    // 打开弹窗
    openDialog(name, row) {
      this.$emit('open-dialog', name, row)
    },
    // 删除
    deleteClick(row) {
      this.$confirm('确定删除该属性?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功')
        delEquipmentArea(row.id).then(response => {
          console.log(response)
          this.$message.success('删除成功')
          this.__fetchData()
        })
      })
    },

    closeDialog() {
      this.filter = {}
      this.$emit('close-dialog')
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
        this.$message.warning('请选择所删除的属性')
        return false
      }
      this.$confirm('确定删除所选中属性?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(selectId)
        this.__fetchData()
        this.$message.success('删除成功')
      })
    },
    handleNodeClick(data) {
      this.$emit('treeClick', data)
      console.log(data)
    }

  }
}
</script>
<style lang="scss" scoped>
.detail-dialog {
  ::v-deep .el-dialog {
    height: calc(85vh - 50px);
    .el-dialog__body {
      height: calc(85vh - 105px);
    }
    // .el-dialog__footer {
    //   padding: 0 20px;
    // }
  }
}
</style>
