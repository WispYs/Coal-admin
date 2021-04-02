<template>
  <div class="buttons">
    <div class="buttons_item">
      <el-button type="primary" size="medium" @click="openDialog('create')"><i class="el-icon-plus el-icon--left" />创建
      </el-button>
      <el-button type="primary" size="medium" plain :disabled="updateDisabled" @click="openDialog('edit')"><i class="el-icon-edit el-icon--left" />编辑
      </el-button>
      <el-button type="danger" size="medium" plain :disabled="deleteDisabled" @click="deletePersonnel"><i class="el-icon-delete el-icon--left" />删除
      </el-button>
      <el-button size="medium" plain @click="synchroClick"><i class="el-icon-refresh el-icon--left" />同步</el-button>
    </div>
    <div class="search">
      <el-input v-model="personSearch" size="medium" placeholder="工号、姓名、登录名" />
      <el-button type="primary" size="medium" @click="startSearch(personSearch)">搜索</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    updateDisabled: {
      type: Boolean,
      default: true
    },
    deleteDisabled: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      personSearch: ''
    }
  },
  created() {

  },
  methods: {
    openDialog(_data) {
      this.$emit('openDialog', _data)
    },
    deletePersonnel() {
      this.$emit('deletePersonnel')
    },
    synchroClick() {
      this.$emit('synchroClick')
    },
    startSearch(_data) {
      this.$emit('startSearch', _data)
      this.personSearch = ''
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
        width: 240px;
      }

      .el-button {
        display: inline-block;
        margin-left: 20px;
      }
    }
  }
</style>
