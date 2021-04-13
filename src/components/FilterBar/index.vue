<template>
  <div class="filter-bar">
    <div v-for="(item, index) in config.filters" :key="index" class="filter-bar__item">
      <label>{{ item.label }}：</label>
      <!-- input  -->
      <el-input
        v-if="item.layout === 'Text'"
        v-model="filterForm[item.field]"
        class="filter-item"
        size="medium"
        :style="`width:${item.width}px`"
        :placeholder="item.placeholder"
        @change="search()"
      >
        <el-button slot="append" icon="el-icon-search" @click="search()" />
      </el-input>

      <!-- select  -->
      <el-select
        v-if="item.layout === 'Select'"
        v-model="filterForm[item.field]"
        size="medium"
        clearable
        :style="`width:${item.width}px`"
        :placeholder="item.placeholder"
        @change="search()"
      >
        <el-option
          v-for="it in item.options"
          :key="it.value"
          :label="it.label"
          :value="it.value"
        />
      </el-select>

      <!-- tree-select  -->
      <tree-select
        v-if="item.layout === 'TreeSelect'"
        v-model="filterForm[item.field]"
        ref="treeSelect"
        class="form-item"
        :value="filterForm[item.field]"
        :placeholder="item.placeholder"
        :options="item.options"
        :clearable="true"
        :accordion="false"
        @tree-select="value => getTreeSelect(value,item.field)"
      />

      <!-- date-picker  -->
      <el-date-picker
        v-if="item.layout === 'DateTime'"
        v-model="filterForm[item.field]"
        size="medium"
        class="filter-item"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        value-format="yyyy-MM-dd"
        @change="search()"
      />

      <el-date-picker
        v-if="item.layout === 'date'"
        v-model="filterForm[item.field]"
        size="medium"
        type="datetime"
        placeholder="选择日期时间"
        @change="search()"
      />

    </div>
    <div v-if="config.actions && config.actions.length > 0" class="filter-bar__item">
      <!-- <el-button v-if="config.actions.indexOf('search') > -1" type="primary" size="medium" icon="el-icon-search" @click="search()" /> -->
      <!-- <el-button v-if="config.actions.indexOf('search') > -1" type="primary" size="medium" @click="search()">搜索</el-button> -->
      <!-- <el-button v-if="config.actions.indexOf('reset') > -1" type="primary" size="medium" @click="reset()">重置</el-button> -->
      <!-- <el-button v-if="config.actions.indexOf('create') > -1" type="primary" size="medium" @click="create()">新建</el-button> -->
      <el-button v-if="config.actions.indexOf('create') > -1" type="primary" size="medium" icon="el-icon-plus" @click="create()">新建</el-button>
      <el-button v-if="config.actions.indexOf('export') > -1" type="primary" size="medium" icon="el-icon-download" @click="exportExcel()">导出</el-button>
      <el-button v-if="config.actions.indexOf('identificationEnd') > -1" type="primary" size="medium" icon="el-icon-circle-close" @click="identificationEnd()">辨识结束</el-button>
    </div>
    <!-- <div v-if="config.actions && config.actions.length > 0" class="filter-bar__item" style="display:block;">
      <el-button v-if="config.actions.indexOf('delete') > -1" type="danger" size="medium" plain @click="deleteBatches()">批量删除</el-button>

    </div> -->

  </div>
</template>

<script>
import TreeSelect from '@/components/TreeSelect'
export default {
  components: { TreeSelect },
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      filterForm: {}, // 筛选项表单
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  created() {
    const { filters } = { ...this.config }
    const obj = {}
    filters.forEach(item => {
      obj[item.field] = ''
    })
    this.filterForm = Object.assign({}, obj)
  },
  methods: {
    __initFilter() {
      Object.keys(this.filterForm).forEach(key => { this.filterForm[key] = '' })
    },

    __getFilter() {
      // 时间段需要分开成两个参数
      return Object.assign({}, this.filterForm)
    },

    search() {
      // console.log(this.filterForm);
      this.$emit('search-click', this.__getFilter(), this.filterForm)
    },
    reset() {
      this.__initFilter()
      this.$emit('reset-click', this.__getFilter())
    },
    create() {
      this.$emit('create-click')
    },
    exportExcel() {
      this.$emit('export-click')
    },
    identificationEnd(){
      this.$emit('identificationEnd')
    },
    deleteBatches() {
      // this.$emit('delete-batch')
      // 没时间调用每个页面删除方法，后续添加
      this.$confirm('确定删除所选中项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功')
      })
    },
    getTreeSelect(value, field) {
      console.log(value);
      if(!value){
        this.filterForm.sysDeptId= ''
      }else{
        this.filterForm.sysDeptId = Number(value)
      }
      this.$emit('search-click', this.__getFilter(), this.filterForm)
    }
  }
}
</script>

<style lang="scss" scoped>
  .filter-bar {
    margin-bottom: 10px;
    &__item {
      display: inline-block;
      margin: 0 20px 15px 0;
      font-size: 14px;
      label {
        font-weight: normal;
        font-size: 14px;
        margin-right: 4px;
      }
    }
  }
</style>
