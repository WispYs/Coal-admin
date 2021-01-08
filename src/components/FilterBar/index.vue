<template>
  <div class="filter-bar">
    <div class="filter-bar__item">
      <label>关键字：</label>
      <el-input v-model="keywords" class="filter-item" style="width: 150px" placeholder="输入关键字" suffix-icon="el-icon-search" />
    </div>
    <div class="filter-bar__item">
      <label>项目状态：</label>
      <el-select v-model="status" placeholder="请选择项目状态" style="width: 150px">
        <el-option
          v-for="item in statusOption"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="filter-bar__item">
      <label>开始时间：</label>
      <el-date-picker
        v-model="time"
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
    <div class="filter-bar__item">
      <el-button type="primary" size="medium" @click="search()">搜索</el-button>
      <el-button type="primary" size="medium" @click="reset()">重置</el-button>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      keywords: '',
      time: '',
      startTime: '',
      endTime: '',
      status: '',
      statusOption: [
        {
          value: 1,
          label: '已完成'
        }, {
          value: 2,
          label: '进行中'
        }, {
          value: 3,
          label: '未开始'
        }, {
          value: 4,
          label: '已搁置'
        }
      ],
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
  mounted() {

  },
  methods: {
    __initFilter() {
      this.keywords = ''
      this.startTime = ''
      this.endTime = ''
      this.time = ''
      this.status = ''
    },

    __getFilter() {
      return {
        keywords: this.keywords,
        startTime: this.time[0] ? this.time[0] : '',
        endTime: this.time[0] ? this.time[1] : '',
        status: this.status
      }
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
