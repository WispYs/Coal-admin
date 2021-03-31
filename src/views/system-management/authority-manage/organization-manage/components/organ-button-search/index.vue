<template>
  <div class="buttons">
    <div class="buttons_item">
      <el-button type="primary" size="medium" @click="openDialog('create')"><i class="el-icon-plus el-icon--left" />新建
      </el-button>
      <el-button type="primary" size="medium" plain :disabled="updateDisabled" @click="openDialog('edit')"><i class="el-icon-edit el-icon--left" />编辑
      </el-button>
      <el-button type="danger" size="medium" plain :disabled="deleteDisabled" @click="deleteClick"><i class="el-icon-delete el-icon--left" />删除
      </el-button>
      <el-button type="warning" size="medium" plain :disabled="moveUpDisabled" @click="moveUpClick"><i class="el-icon-top el-icon--left" />上移</el-button>
      <el-button type="info" size="medium" plain :disabled="moveDownDisabled" @click="moveDownClick"><i class="el-icon-bottom el-icon--left" />下移</el-button>
      <el-button type="danger" size="medium" plain @click="handelExport"><i class="el-icon-download el-icon--left" />导出</el-button>
      <el-button size="medium" plain @click="synchroClick"><i class="el-icon-refresh el-icon--left" />同步</el-button>
    </div>
    <div class="search">
      <el-input v-model="institutionSearch" size="medium" placeholder="名称、简称"></el-input>
      <el-button type="primary" size="medium" @click="queryData">搜索</el-button>
    </div>
  </div>
</template>

<script>
  export default{
    props:{
      updateDisabled:{
        type: Boolean,
        default: true
      },
      deleteDisabled:{
        type: Boolean,
        default: true
      },
      moveUpDisabled:{
        type: Boolean,
        default: true
      },
      moveDownDisabled:{
        type: Boolean,
        default: true
      }
    },
    data(){
      return{
        institutionSearch:''
      }
    },
    created() {

    },
    methods:{
      openDialog(_data){
        this.$emit("openDialog",_data)
      },
      deleteClick(){
        this.$emit("deleteClick")
      },
      moveUpClick(){
        this.$emit("moveUpClick")
      },
      moveDownClick(){
        this.$emit("moveDownClick")
      },
      handelExport(){
        this.$emit("handelExport")
      },
      synchroClick(){
        this.$emit("synchroClick")
      },
      queryData(){
        this.$emit("queryData",this.institutionSearch)
        this.institutionSearch = ''
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
