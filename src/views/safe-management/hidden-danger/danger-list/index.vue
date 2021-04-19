<template>
  <div class="page-container has-tree" :class="treeExtend ? 'open-tree' : 'close-tree'">
    <tree-bar :tree-data="treeData" @extend-click="treeExtend = !treeExtend" @handleNodeClick="handleNodeClick" />
    <div class="tree-form-container">
      <span class="tree-extend-btn" @click="treeExtend = !treeExtend">
        <i :class="treeExtend ? 'el-icon-d-arrow-left': 'el-icon-d-arrow-right'" />
      </span>
      <filter-bar :config="dangerListFilterConfig" @search-click="queryData" style="display: inline-block;"/>
      <list-table :id="id" :list="list" :list-loading="listLoading" :config="dangerListTableConfig"/>
      <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pagerows"
        @pagination="pagination" />
    </div>
  </div>
</template>
<script>
import { getsysDictListById,getHiddenRegisterDetailList } from '@/api/hidden-danger'
import { getAqglHiddenTissueTree } from '@/api/organization'
import { getOrganTree } from '@/api/authority-management'
import { dangerListFilterConfig,dangerListTableConfig } from '@/data/hidden-danger'
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import TreeBar from '@/components/TreeBar'
export default {
  components:{
    FilterBar,
    ListTable,
    Pagination,
    TreeBar
  },
  data() {
    return {
      id:'dangerList',
      dangerListFilterConfig,
      dangerListTableConfig,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      treeData: {
        title: '所有状态',
        list: []
      },
      treeExtend: true,
      keywords: '',
      list: [],
      filter:''
    }
  },
  created() {
    this.__fetchHiddenUnit()
    this.__fetchUnit()
    this.__fetchData()
    this.__fetchSelectList()
  },
  methods: {
    __fetchUnit(){
      getOrganTree().then(response => {
        // 更新新增、编辑config数据
        this.dangerListTableConfig.columns.forEach(it => {
          if(it.field === 'reviewUnitId'){
            it.options = response.data
          }
        })
      })
    },
    __fetchHiddenUnit(){
      const query = {
        aqglHiddenTissueId: ''
      }
      getAqglHiddenTissueTree(query).then(response => {
        this.dangerListTableConfig.columns.forEach(it => {
          if (it.field === 'hiddenDeptId') {
            it.options = response.data
          }
        })
      })
    },
    __fetchSelectList() {
      const query = [{
        // 隐患状态
        parentId: 10115
      },{
        // 检测地点
        parentId: 10042
      },{
        // 检测地点
        parentId: 10106
      }]
      for (let q in query) {
        getsysDictListById(query[q].parentId).then(response => {
          let selectList = response.data
          for (let m in response.data) {
            this.getIterationData(selectList[m], response.data[m])
          }
          this.treeData.list = selectList
          this.dangerListTableConfig.columns.forEach(it => {
            if (query[q].parentId == 10115) {
              if(it.field === 'hiddenStatus'){
                it.options = selectList
              }
            }else if(query[q].parentId == 10042){
              if(it.field === 'examinePathId'){
                it.options = selectList
              }
            }else if(query[q].parentId == 10106){
              if(it.field === 'hiddenGrade'){
                it.options = selectList
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
    __fetchData(){
      const query = {
        hiddenStatus:[

        ],
        pageEntity:{
          page:1,
          pagerows:10,
          keyword: this.filter.name,
          keywordField:['hiddenStatus','hiddenGrade']
        }
      }
      getHiddenRegisterDetailList(query).then(response =>{
        console.log(response);
        this.listLoading = false
        this.list = response.data.rows
        this.total = Number(response.data.records)
      })
    },
    handleNodeClick(){

    },
    queryData(fliter){
      this.filter = Object.assign(this.filter, filter)
      this.__fetchData()
    },
    openDialog(){

    },
    pagination(){

    }
  }
}
</script>
<style lang="scss" scoped>

</style>
