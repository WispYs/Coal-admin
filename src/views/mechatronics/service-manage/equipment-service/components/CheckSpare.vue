<template>
  <el-dialog
    title="查看备品备件"
    :visible.sync="dialogVisible"
    width="800px"
    :before-close="closeDialog"
    class="check-spare-wrapper"
  >
    <div class="check-spare-container">
      <div class="filter-bar">
        <div class="filter-bar__item">
          <label>关键字：</label>
          <el-input
            v-model="keyword"
            class="filter-item"
            size="medium"
            style="width:200px"
            placeholder="材料名称，使用地点，存放位置"
            @change="queryData"
          />
        </div>
        <div class="filter-bar__item">
          <el-button type="primary" size="medium" @click="queryData">搜索</el-button>
        </div>
      </div>
      <list-table
        :list="list"
        :list-loading="listLoading"
        :config="CheckSpareTableConfig"
        height="calc(100% - 157px)"
      />
      <pagination
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.pagerows"
        @pagination="__fetchData"
      />

    </div>
    <span slot="footer" class="dialog-footer" />
  </el-dialog>

</template>
<script>
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import { getSparePartList } from '@/api/mechatronics'
import { CheckSpareTableConfig } from '@/data/mechatronics'

export default {
  components: { ListTable, Pagination },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      keyword: '',
      listLoading: true,
      CheckSpareTableConfig

    }
  },
  created() {
    this.__fetchData()
  },
  methods: {
    __fetchData() {
      this.listLoading = true
      const filter = {
        ...this.filter,
        keywordField: ['workNumber', 'loginName', 'userName']
      }
      const query = Object.assign(this.listQuery, filter)
      getSparePartList(query).then(response => {
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
    // 更新父组件 xxxxxDialogVisible 的值
    closeDialog() {
      this.$emit('close-dialog')
    },

    // 更新数据
    updataForm(data) {
      this.progressData = Object.assign(this.progressData, data)
    }

  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/theme.scss';
@import '~@/assets/styles/variables.scss';
.check-spare-wrapper {
  ::v-deep {
    .el-dialog {
      height: calc(85vh - 50px);
      .el-dialog__body{
        height: calc(100% - 85px);
        max-height: calc(100% - 85px);
      }
    }
  }
}
.check-spare-container {
  height: 100%;
  padding: 20px 30px 0;
  .filter-bar {
    margin-bottom: 10px;
    &__item {
      display: inline-block;
      margin: 0 20px 15px 0;
      font-size: 14px;
      label {
        font-weight: normal;
        font-size: 14px;
        margin-right: 4px;
      }
    }
  }
}

</style>
