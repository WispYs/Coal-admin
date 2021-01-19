<template>
  <div class="filter-bar">
    <div v-for="(item, index) in config.filters" :key="index" class="filter-bar__item">
      <label>{{ item.label }}：</label>
      <!-- input  -->
      <el-input
        v-if="item.layout === 'Text'"
        v-model="filterForm[item.field]"
        class="filter-item"
        :style="`width:${item.width}px`"
        :placeholder="item.placeholder"
        suffix-icon="el-icon-search"
      />
      <!-- select  -->
      <el-select
        v-if="item.layout === 'Select'"
        v-model="filterForm[item.field]"
        :style="`width:${item.width}px`"
        :placeholder="item.placeholder"
      >
        <el-option
          v-for="it in item.options"
          :key="it.value"
          :label="it.label"
          :value="it.value"
        />
      </el-select>
      <!-- date-picker  -->
      <el-date-picker
        v-if="item.layout === 'DateTime'"
        v-model="filterForm[item.field]"
        class="filter-item"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        value-format="yyyy-MM-dd"
      />
    </div>
    <div v-if="config.actions && config.actions.length > 0" class="filter-bar__item">
      <el-button v-if="config.actions.indexOf('search') > -1" type="primary" size="medium" @click="search()">搜索</el-button>
      <el-button v-if="config.actions.indexOf('reset') > -1" type="primary" size="medium" @click="reset()">重置</el-button>
      <el-button v-if="config.actions.indexOf('create') > -1" type="primary" size="medium" @click="reset()">新建</el-button>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      filterForm: {}, // 筛选项表单字段
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
      this.$emit('search-click', this.__getFilter())
    },
    reset() {
      this.__initFilter()
      this.$emit('reset-click', this.__getFilter())
    }
  }
}
</script>

<style lang="scss" scoped>
  .filter-bar {
    margin: 20px 0;
    &__item {
      display: inline-block;
      margin: 0 40px 15px 0;
      font-size: 14px;
      label {
        font-weight: normal;
        font-size: 14px;
        margin-right: 4px;
      }
    }
  }
</style>
