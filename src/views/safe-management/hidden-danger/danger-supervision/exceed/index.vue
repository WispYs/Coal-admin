<template>
  <div class="page-container">
    <div class="filter-bar">
      <filter-bar :config="reformFilterConfig" style="display: inline-block;" @search-click="queryData" />
    </div>
    <!-- 表格 -->
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="delayApprovalTableConfig"
      height="calc(100% - 157px)"
    />
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pagerows"
      @pagination="__fetchData"
    />
  </div>
</template>
<script>
import {
  getHiddenRegisterDetailList,
  getsysDictListById
} from '@/api/hidden-danger'
import {
  getAqglHiddenTissueTree
} from '@/api/organization'
import {
  getOrganTree
} from '@/api/authority-management'
import ListTable from '@/components/ListTable'
import { delayApprovalTableConfig, reformFilterConfig } from '@/data/hidden-danger'
import Pagination from '@/components/Pagination'
import FilterBar from '@/components/FilterBar'
export default {
  components: {
    ListTable,
    Pagination,
    FilterBar
  },
  data() {
    return {
      id: 'reform',
      listLoading: true,
      delayApprovalTableConfig,
      reformFilterConfig,
      list: [],
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {},
      total: 1
    }
  },
  created() {
    this.__fetchHiddenUnit()
    this.__fetchSelectList()
    this.__fetchUnit()
    this.__fetchData()
  },
  methods: {
    __fetchUnit() {
      getOrganTree().then(response => {
        // 更新新增、编辑config数据
        this.delayApprovalTableConfig.columns.forEach(it => {
          if (it.field === 'examineUnit') {
            it.options = response.data
          } else if (it.field === 'reviewUnitId') {
            it.options = response.data
          }
        })
      })
    },
    __fetchHiddenUnit() {
      const query = {
        aqglHiddenTissueId: ''
      }
      getAqglHiddenTissueTree(query).then(response => {
        this.delayApprovalTableConfig.columns.forEach(it => {
          if (it.field === 'hiddenDeptId') {
            it.options = response.data
          }
        })
      })
    },
    __fetchSelectList() {
      const query = [{
        parentId: 10088
      }, {
        parentId: 10092
      }, {
        parentId: 10042
      }, {
        parentId: 10097
      }, {
        parentId: 10106
      }, {
        // 隐患状态
        parentId: 10115
      }]
      for (const q in query) {
        getsysDictListById(query[q].parentId).then(response => {
          const selectList = []
          for (const m in response.data) {
            selectList.push({
              value: response.data[m].sysDictId,
              label: response.data[m].dictName
            })
          }
          this.delayApprovalTableConfig.columns.forEach(it => {
            if (query[q].parentId == 10088) {
              if (it.field === 'examineShiftId') {
                it.options = selectList
                console.log(it)
              }
            } else if (query[q].parentId == 10092) {
              if (it.field === 'examineTypeId') {
                it.options = selectList
              }
            } else if (query[q].parentId == 10042) {
              if (it.field === 'examinePathId') {
                it.options = selectList
              }
            } else if (query[q].parentId == 10097) {
              if (it.field === 'hiddenTypeId') {
                it.options = selectList
              }
            } else if (query[q].parentId == 10106) {
              if (it.field === 'hiddenGrade') {
                it.options = selectList
              }
            } else if (query[q].parentId == 10115) {
              if (it.field === 'hiddenStatus') {
                it.options = selectList
              }
            }
          })
        })
      }
    },
    __fetchData() {
      this.listLoading = false
      // 当前时间
      const date = new Date().toLocaleDateString().replace(/\//g, '-')
      const query = {
        hiddenStatus: ['10116', '10118'],
        pageEntity: {
          page: this.listQuery.page,
          pagerows: this.listQuery.pagerows,
          dateField: [['xgTime', null, date]],
          keyword: this.filter.name,
          keywordField: ['hiddenContent', 'rectifyPlan']
        }
      }
      getHiddenRegisterDetailList(query).then(response => {
        if (response.data.rows.length > 0) {
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
    queryData(filter) {
      this.filter = Object.assign(this.filter, filter)
      this.__fetchData()
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
  .filter-bar {
    margin-bottom: 10px;
    &__item {
      display: inline-block;
      margin: 0 40px 15px 0;
      font-size: 14px;
      label {
        font-weight: normal;
        font-size: 14px;
        margin-right: 4px;
      }
    }
  }
  .color-lump {
    padding: 10px 20px;
    color: $whiteColor;
    &.green {
      background: $greenColor;
    }
    &.blue {
      background: $primaryColor;
    }
    &.orange {
      background: $orangeColor;
    }
    &.red {
      background: $redColor;
    }
  }
  .filter_button{
    margin: 0 22px 15px 0;
  }
</style>
