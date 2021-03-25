<template>
  <el-table :data="list" style="width: 100%">
    <el-table-column align="center" label="序号" width="95" fixed>
      <template slot-scope="scope">
        {{ scope.$index+1 }}
      </template>
    </el-table-column>
    <el-table-column v-for="(item,index) in TableConfig.columns" :key='index' :prop="item.field" :label="item.label">
    </el-table-column>
  </el-table>
</template>

<script>
  export default{
    props: {
      list: {
        type: Array,
        default: () => []
      },
      TableConfig: {
        type: Object,
        default: () => ({})
      }
    },
    data(){
      return{

      }
    },
    created(){
      console.log(this.TableConfig);
    }
  }
</script>

<style>
</style>
