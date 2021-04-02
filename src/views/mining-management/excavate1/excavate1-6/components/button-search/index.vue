<template>
  <div class="buttons">
    <div class="buttons_item">
      <div class="search">
        <el-input v-model="personSearch" size="medium" placeholder="水平名称"></el-input>
        <el-button type="primary" size="medium" @click="startSearch(personSearch)"><i class="el-icon-search el-icon--left" />搜索</el-button>
      </div>
      <el-button type="primary" size="medium" @click="addClick"><i class="el-icon-circle-plus-outline el-icon--left" />添加
      </el-button>
      <el-button type="primary" size="medium" @click="synchroClick"><i class="el-icon-refresh el-icon--left" />同步</el-button>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        personSearch:''
      }
    },
    created() {

    },
    methods:{
      startSearch(_data){
        this.$emit("startSearch",_data);
      },
      addClick(){
        this.$emit("addClick")
      },
      synchroClick(){
        this.$emit("synchroClick")
      }
    }
  }
</script>

<style lang="scss" scoped>
  .buttons {
    margin-bottom: 16px;
    margin-left: 16px;

    .buttons_item {
      display: inline-block;
    }

    .el-button {
      display: inline-block;
      margin-left: 20px;
    }

    .search {
      display: inline-block;

      .el-input {
        display: inline-block;
        width: 240px;
      }
    }
  }
</style>

