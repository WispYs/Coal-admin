<template>
  <div class="page-container">
    <div class="buttons">
      <div class="buttons_item">
        <el-button size="medium" plain @click="synchroClick"><i class="el-icon-refresh el-icon--left" />同步</el-button>
      </div>
      <div class="search">
        <el-input v-model="dataDictionary" size="medium" placeholder="工号、姓名、登录名"></el-input>
        <el-button type="primary" size="medium" @click="queryData(dataDictionary)">搜索</el-button>
      </div>
    </div>
    <list-table
      :id="id"
      :list="list"
      :list-loading="listLoading"
      :config="NewsConfig"
    />
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
      @pagination="__fetchData"
    />
  </div>
</template>

<script>
import { getApplicationList } from '@/api/authority-management'
import ListTable from '@/components/ListTable'
import Pagination from '@/components/Pagination'
import { NewsConfig } from '@/data/authority-management'

export default {
  components: { ListTable, Pagination },
  data() {
    return {
      id: '',
      total: 0,
      listQuery: {
        page: 1,
        size: 10
      },
      filter: {}, // 筛选项
      listLoading: true,
      NewsConfig,
      dataDictionary:'',
      list:[{
        title:'系统报警',
        content:'当前1127(1)运顺底板替(掘进101队)局扇,共4风扇,开启0风扇,1127(1)运顺底板替(掘进101队)局扇停机报警',
        newsType:'系统报警',
        newsLevel:'报警',
        count:'4637',
        createDate:'2021-03-29',
        lastUpdated:'2021-03-29',
        state:'未读',
        reader: '李四',
        readTime:''
      },{
        title:'系统报警',
        content:'当前1125(3)轨顺(掘进102队)局扇,共4风扇,开启0风扇,1125(3)轨顺(掘进102队)局扇停机报警',
        newsType:'系统报警',
        newsLevel:'报警',
        count:'4637',
        createDate:'2021-03-29',
        lastUpdated:'2021-03-29',
        state:'未读',
        reader: '李四',
        readTime:''
      },{
        title:'系统报警',
        content:'当前J106局扇,共4风扇,开启0风扇,J106局扇停机报警',
        newsType:'系统报警',
        newsLevel:'报警',
        count:'4637',
        createDate:'2021-03-29',
        lastUpdated:'2021-03-29',
        state:'未读',
        reader: '李四',
        readTime:''
      },{
        title:'档案资料借阅申请流程消息',
        content:'档案资料借阅申请流程待处理',
        newsType:'科技项目流程消息',
        newsLevel:'协同',
        count:'1',
        createDate:'2021-03-29',
        lastUpdated:'2021-03-29',
        state:'未读',
        reader: '李四',
        readTime:''
      }]
    }
  },

  created() {
    this.__fetchData()
  },
  methods: {
    __fetchData() {
      // this.listLoading = true
      // const query = Object.assign(this.listQuery, this.filter)
      // getApplicationList(query).then(response => {
      //   this.listLoading = false
      //   this.list = response.data.items
      //   this.total = response.data.total
      // })
      this.listLoading = false;
      this.total = this.list.length;
    },
    // 查询数据
    queryData(filter) {
      if(!!filter){
        this.$message.success("查询成功")
        this.filter = Object.assign(this.filter, filter)
        this.__fetchData()
      }else{
        this.$message.error("请输入查询内容");
      }

    },
    // 初始化新建窗口配置
    initCreateConfig() {
      const createConfig = Object.assign({
        title: '新建',
        width: '500px',
        form: this.NewsConfig.columns
      })
      return createConfig
    },
    // 初始化编辑窗口配置
    initEditConfig() {
      const editConfig = Object.assign({
        title: '编辑',
        width: '500px',
        form: this.NewsConfig.columns
      })
      return editConfig
    },
    // 同步
    synchroClick(){
      this.$message.success("同步成功");
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
