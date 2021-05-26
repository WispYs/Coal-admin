<template>
  <div class="page-container has-tree" :class="treeExtend ? 'open-tree' : 'close-tree'">
    <tree-bar :tree-data="treeData" @extend-click="treeExtend = !treeExtend" @handleNodeClick="handleNodeClick" />
    <div class="tree-form-container">
      <span class="tree-extend-btn" @click="treeExtend = !treeExtend">
        <i :class="treeExtend ? 'el-icon-d-arrow-left': 'el-icon-d-arrow-right'" />
      </span>
      <div class="filter-bar">
        <filter-bar :config="reformFilterConfig" style="display: inline-block;" @search-click="queryData" />
      </div>
      <!-- 表格 -->
      <list-table
        :id="id"
        :list="list"
        :list-loading="listLoading"
        :config="supervisionTableConfig"
        height="calc(100% - 157px)"
        @other-click="otherClick"
      />
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.pagerows"
        @pagination="__fetchData"
      />
    </div>
  </div>
</template>
<script>
import {
  getsysDictListById,
  getHiddenRegisterDetailList,
  updateSuperviseStatus
} from '@/api/hidden-danger'
import {
  getAqglHiddenTissueTree
} from '@/api/organization'
import {
  getOrganTree
} from '@/api/authority-management'
import {
  supervisionTableConfig,
  reformFilterConfig
} from '@/data/hidden-danger'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import FilterBar from '@/components/FilterBar'
import TreeBar from '@/components/TreeBar'
export default {
  components: {
    ListTable,
    Pagination,
    FilterBar,
    TreeBar
  },
  data() {
    return {
      id: 'reform',
      listLoading: true,
      supervisionTableConfig,
      reformFilterConfig,
      list: [],
      listQuery: {
        page: 1,
        pagerows: 10
      },
      total: 1,
      filter: {},
      selectCheckbox: {},
      treeData: {
        title: '所有督办',
        list: [{
          value: 1,
          label: '已督办'
        }, {
          value: 2,
          label: '未督办'
        }]
      },
      treeExtend: true,
      hiddenStatus: ['10116', '10118', '10119'],
      superviseStatus: '' // 督办状态
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
        this.supervisionTableConfig.columns.forEach(it => {
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
        this.supervisionTableConfig.columns.forEach(it => {
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
          this.supervisionTableConfig.columns.forEach(it => {
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
      const query = {
        hiddenStatus: ['10116', '10118'],
        pageEntity: {
          page: this.listQuery.page,
          pagerows: this.listQuery.pagerows,
          entity: {
            superviseStatus: this.superviseStatus
          },
          keyword: this.filter.name,
          keywordField: ['hiddenContent', 'rectifyPlan']
        }
      }
      getHiddenRegisterDetailList(query).then(response => {
        if (response.data.rows.length > 0) {
          console.log(response)
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
      console.log(this.filter)
      this.__fetchData()
    },
    hiddenAcceptance(_data) {
      if (this.selectCheckbox.superviseStatus == _data) {
        this.$message.info('当前状态已为' + _data)
        return
      }
      const query = {
        aqglHiddenRegisterId: this.selectCheckbox.aqglHiddenRegisterId,
        superviseStatus: _data
      }
      updateSuperviseStatus(query).then(response => {
        this.__fetchData()
      })
    },
    handleNodeClick(data) {
      this.superviseStatus = data.label
      this.__fetchData()
    },
    otherClick(data, index, name) {
      this.selectCheckbox = data
      if (name == '督办隐患') {
        this.hiddenAcceptance('已督办')
      } else if (name == '取消督办') {
        this.hiddenAcceptance('未督办')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
