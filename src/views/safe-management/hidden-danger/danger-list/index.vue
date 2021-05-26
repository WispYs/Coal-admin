<template>
  <div class="page-container has-tree" :class="treeExtend ? 'open-tree' : 'close-tree'">
    <tree-bar :tree-data="treeData" @extend-click="treeExtend = !treeExtend" @checkChange="checkChange" />
    <div class="tree-form-container">
      <span class="tree-extend-btn" @click="treeExtend = !treeExtend">
        <i :class="treeExtend ? 'el-icon-d-arrow-left': 'el-icon-d-arrow-right'" />
      </span>
      <filter-bar :config="dangerListFilterConfig" @search-click="queryData" style="display: inline-block;"/>
      <list-table :id="id" :list="list" :list-loading="listLoading" :config="dangerListTableConfig" height="calc(100% - 157px)" @other-click="otherClick"/>
      <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pagerows"
        @pagination="pagination" />
      <detailed-information ref="threeViolationsDetailed" :dialog-visible="detailedInformationDisabled"
          @close-dialog="detailedInformationDisabled = false">
      </detailed-information>
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
import DetailedInformation from './components/detailed-information'
export default {
  components:{
    FilterBar,
    ListTable,
    Pagination,
    TreeBar,
    DetailedInformation
  },
  data() {
    return {
      id:'dangerList',
      dangerListFilterConfig,
      dangerListTableConfig,
      listLoading: true,
      filter: {}, // 筛选项
      total: 0,
      listQuery: {
        page: 1,
        pagerows: 10
      },
      treeData: {
        title: '所有状态',
        checkbox: true,
        list: []
      },
      treeExtend: true,
      list: [],
      state:[],
      detailedInformationDisabled: false,
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
          this.dangerListTableConfig.columns.forEach(it => {
            if (query[q].parentId == 10115) {
              if(it.field === 'hiddenStatus'){
                it.options = selectList
                this.treeData.list = selectList
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
          ...this.state
        ],
        pageEntity:{
          page: this.listQuery.page,
          pagerows: this.listQuery.pagerows,
          keyword: this.filter.name,
          keywordField:['hiddenContent','rectifyPlan']
        }
      }
      getHiddenRegisterDetailList(query).then(response =>{
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
    checkChange(_data){
      console.log(_data);
      this.state = _data
      this.__fetchData()
    },
    queryData(fliter){
      this.filter = Object.assign(this.filter, fliter)
      this.__fetchData()
    },
    otherClick(row, index, item){
      this.$refs.threeViolationsDetailed.__fetchData(row.aqglHiddenRegisterId)
      this.detailedInformationDisabled = true
    },
    pagination() {
      this.__fetchData()
    },
  }
}
</script>
<style lang="scss" scoped>

</style>
