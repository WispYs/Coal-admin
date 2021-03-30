<template>
  <div class="buttons" style="margin-bottom: 16px;">
    <div class="buttons_item">
      <el-button type="primary" size="medium" @click="openDialog('create')"><i class="el-icon-plus el-icon--left" />创建
      </el-button>
      <el-button type="primary" size="medium" plain :disabled="updateDisabled" @click="openDialog('edit')"><i class="el-icon-edit el-icon--left" />编辑
      </el-button>
      <el-button type="danger" size="medium" plain :disabled="deleteDisabled" @click="deleteClick"><i class="el-icon-delete el-icon--left" />删除
      </el-button>
      <el-button size="medium" plain @click="synchroClick"><i class="el-icon-refresh el-icon--left" />同步</el-button>
    </div>
    <div class="search">
      <el-input v-model="moduleSearch" size="medium" placeholder="名称、简称"></el-input>
      <el-button type="primary" size="medium" @click="queryData">搜索</el-button>
    </div>
  </div>
</template>

<script>
  export default{
    props: {
      updateDisabled: {
        type: Boolean,
        default: false
      },
      deleteDisabled: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return{
        moduleSearch:''
      }
    },
    methods:{
      openDialog(row){
        this.$emit("openDialog",row)
      },
      deleteClick(){
        this.$emit("deleteClick");
      },
      synchroClick(){
        this.$emit("synchroClick")
      },
      queryData(){
        this.$emit("queryData",this.moduleSearch)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .buttons {
    margin-bottom: 16px;

    .buttons_item {
      display: inline-block;
    }

    .search {
      display: inline-block;
      float: right;

      .el-input {
        display: inline-block;
        width: 200px;
      }

      .el-button {
        display: inline-block;
        margin-left: 20px;
      }
    }
  }
</style>
