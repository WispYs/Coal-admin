<template>
  <el-dialog :title="config.title" :visible.sync="dialogVisible" :width="config.width || '500px'"
    :before-close="closeDialog">
    <div style="height: 100%;">
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="6"><el-button @click="menuClick('module')">模块组</el-button></el-col>
        <el-col :span="6"><el-button @click="menuClick('page')">页面</el-button></el-col>
        <el-col :span="6"><el-button @click="menuClick('uploadPage')">上传页面</el-button></el-col>
      </el-row>
    </div>
  </el-dialog>
</template>
<script>
  import ListTable from '@/components/ListTable'
  import Pagination from '@/components/Pagination'
  import {
    memberConfig
  } from '@/data/authority-management'
  export default {
    components: {
      ListTable,
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
      // 弹窗表单
      // formData: {
      //   type: Object,
      //   default: () => ({})
      // }
    },
    data() {
      return {
        formData: {}, // 弹窗表单
        content: '',
        id: 'member',
        deleteDisabled: true,
        memberConfig,
        listLoading: false,
        total: 0,
        listQuery: {
          page: 1,
          size: 10
        }
      }
    },
    created() {

    },
    methods: {
      // 关闭页面
      closeDialog(){
        this.$emit("closeDialog");
      },
      // 点击模块、页面、上传页面触发
     menuClick(row){
        this.$emit("menuClick",row);
     }
    }
  }
</script>
<style lang="scss" scoped>
  .row-bg{
    .el-col-6{

      .el-button{
        width: 120px;
        border: 1px solid #ccc;
        height: 120px;
        text-align: center;
        margin: 100% 0;
      }
    }
  }
</style>
