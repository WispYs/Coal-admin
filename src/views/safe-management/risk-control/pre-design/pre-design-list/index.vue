<template>
  <div class="page-container has-tree" :class="treeExtend ? 'open-tree' : 'close-tree'">
    <tree-bar :tree-data="treeData" @extend-click="treeExtend = !treeExtend" @handleNodeClick="handleNodeClick"/>
    <div class="tree-form-container">
      <span class="tree-extend-btn" @click="treeExtend = !treeExtend">
        <i :class="treeExtend ? 'el-icon-d-arrow-left': 'el-icon-d-arrow-right'" />
      </span>
      <filter-bar
        :config="PreDesignFilterConfig"
        @identificationEnd="identificationEnd"
        @search-click="queryData"
        @create-click="openDialog('create')"
        @reset-click="queryData"
      />
      <list-table
        :id="id"
        :list="list"
        :list-loading="listLoading"
        :config="PreDesignTableConfig"
        @selection-change="selectionChange"
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
import { getAqglRiskIdentifyList } from '@/api/assessment-library'
import {
    getsysDictListById,
    endRiskRecognize
  } from '@/api/hidden-danger'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import TreeBar from '@/components/TreeBar'
import { PreDesignTableConfig, PreDesignFilterConfig } from '@/data/pre-design-list'

export default {
  components: { FilterBar, ListTable, Pagination, TreeBar },
  data() {
    return {
      id: 'assessment-library',
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      PreDesignFilterConfig,
      PreDesignTableConfig,
      treeExtend: true,
      treeData: {
        title: '选择专业',
        list: []
      },
      checkBox: []
    }
  },
  created() {
    this.__fetchSelectList()
    this.__fetchData()
  },
  methods: {
    __fetchSelectList() {
      const query = [{
        parentId: 10028
      }, {
        parentId: 10042
      }, {
        parentId: 18
      }, {
        parentId: 10054
      }, {
        parentId: 10060
      }, {
        parentId: 10066
      }, {
        parentId: 17
      }]
      for (let q in query) {
        getsysDictListById(query[q].parentId).then(response => {
          let selectList = response.data
          for (let m in response.data) {
            this.getIterationData(selectList[m], response.data[m])
          }
          this.PreDesignTableConfig.columns.forEach(it => {
            if (query[q].parentId == 10028) {
              if (it.field === 'majorId') {
                this.treeData.list = selectList
                it.options = selectList
              }
            } else if (query[q].parentId == 10042) {
              if (it.field === 'riskId') {
                it.options = selectList
              }
            } else if (query[q].parentId == 18) {
              if (it.field === 'riskTypeId') {
                it.options = selectList
              }
            } else if (query[q].parentId == 10054) {
              if (it.field === 'accidentPossibilityId') {
                it.options = selectList
              }
            } else if (query[q].parentId == 10060) {
              if (it.field === 'accidentHappensId') {
                it.options = selectList
              }
            } else if (query[q].parentId == 10066) {
              if (it.field === 'identifyTheTypeId') {
                it.options = selectList
              }
            } else if (query[q].parentId == 17) {
              if (it.field === 'riskGradeId') {
                it.options = selectList
                console.log(it);
              }
            }
          })
        })
      }
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
    __fetchData() {
      this.listLoading = true
      const query = {
        page: this.listQuery.page,
        pagerows: this.listQuery.pagerows,
        entity: {
          identifyTheTypeId: "10067",
          majorId: this.filter.majorId
        },
        keyword: this.filter.name,
        keywordField:['riskUserName']
      }
      getAqglRiskIdentifyList(query).then(response => {
        console.log(response);
        this.listLoading = false
        this.list = response.data.rows
        this.total = Number(response.data.records)
        console.log(this.list,this.total);
      })
    },
    // 查询数据
    queryData(filter) {
      this.filter = Object.assign(this.filter, filter)
      this.__fetchData()
    },
    selectionChange(row){
      this.checkBox = row
    },
    // 点击树形菜单时触发
    handleNodeClick(data) {
      const majorId = data.value
      this.filter = Object.assign(this.filter, { majorId })
      this.__fetchData()
    },
    // 点击辨识结束按钮触发
    identificationEnd() {
      endRiskRecognize(this.checkBox[0].aqglRiskIdentifyId).then(response =>{
        this.__fetchData()
        this.$message.success("辨识结束")
      })
    }
  }
}
</script>
