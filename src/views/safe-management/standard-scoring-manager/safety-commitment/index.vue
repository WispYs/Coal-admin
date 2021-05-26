<template>
  <div class="page-container">
    <filter-bar
      :config="StandardizedScorecFilteConfig"
      @create-click="openDialog('create')"
    />
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="StandardizedScoreConfig"
      height="calc(100% - 157px)"
      @edit-click="(row) => openDialog('edit', row)"
      @delete-click="deleteClick"
      @other-click="otherClick"
    />
  </div>
</template>

<script>
import FilterBar from '@/components/FilterBar'
import ListTable from '@/components/ListTable'
import {
    StandardizedScoreConfig,
    StandardizedScorecFilteConfig
  } from '@/data/hidden-danger'

export default {
  components: {
    FilterBar,
    ListTable
  },
  data() {
    return {
      id: '',
      list:[{
        evaluateDate: '2021-05-06',
        major: '采掘',
        fraction: 95,
        unit: '顾桥煤矿',
        inputDate:'2021-05-06',
        enteredBy: '超级管理员'
      },{
        evaluateDate: '2021-05-06',
        major: '采煤',
        fraction: 97,
        unit: '顾桥煤矿',
        inputDate:'2021-05-06',
        enteredBy: '超级管理员'
      },{
        evaluateDate: '2021-05-07',
        major: '安全风险分级管控',
        fraction: 99,
        unit: '顾桥煤矿',
        inputDate:'2021-05-07',
        enteredBy: '超级管理员'
      }],
      listLoading: false,
      StandardizedScoreConfig,
      StandardizedScorecFilteConfig
    }
  },
  methods: {
    // 打开弹窗
    openDialog(name, row) {
      this.$message.info("敬请期待")
    },
    deleteClick(){
      this.$message.info("敬请期待")
    },
    otherClick(){
      this.$message.info("敬请期待")
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
