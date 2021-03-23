<template>
  <div class="page-container mult-table">

    <el-table
      id="mult-table"
      v-loading="listLoading"
      :data="list"
      :header-cell-class-name="headerCellClassName"
    >
      <el-table-column
        prop="team"
        width="120"
      />
      <el-table-column
        prop="addr"
        label="工作地点"
      />
      <el-table-column v-for="(column,index) in columns" :key="index" :label="column.title" align="center">
        <el-table-column
          v-for="(item,i) in column.childrens"
          :key="i"
          :prop="`groups[${index}].${item.field}`"
          :label="item.name"
          width="92"
          align="center"
        />
      </el-table-column>
    </el-table>
  </div>

</template>
<script>
import { getMultList } from '@/api/table'

export default {
  data() {
    return {
      id: 'mult-table',
      columns: [
        {
          title: '第一班',
          childrens: [
            {
              field: 'monitor',
              name: '跟班班长'
            }, {
              field: 'count',
              name: '出勤人数'
            }, {
              field: 'workload',
              name: '当班工作量'
            }, {
              field: 'workplan',
              name: '当日计划'
            }
          ]
        }, {
          title: '第二班',
          childrens: [
            {
              field: 'monitor',
              name: '跟班班长'
            }, {
              field: 'count',
              name: '出勤人数'
            }, {
              field: 'workload',
              name: '当班工作量'
            }, {
              field: 'workplan',
              name: '当日计划'
            }
          ]
        }, {
          title: '第三班',
          childrens: [
            {
              field: 'monitor',
              name: '跟班班长'
            }, {
              field: 'count',
              name: '出勤人数'
            }, {
              field: 'workload',
              name: '当班工作量'
            }, {
              field: 'workplan',
              name: '当日计划'
            }
          ]
        }
      ],
      list: [],
      listLoading: false
    }
  },
  mounted() {
    this.__fetchData()
  },
  methods: {
    __fetchData() {
      getMultList().then(response => {
        this.list = response.data.items
        this.listLoading = false
        console.log(this.list)
      })
    },
    // 单元格的style回调方法
    headerCellClassName(row) {
      if (row.rowIndex === 0 && row.columnIndex === 0) {
        return 'th-slash'
      }
    }
  }
}
</script>
<style lang="scss">
  .mult-table {
    padding-top: 40px;
    margin: 0 auto;

    .el-table {
      .th-slash {
        position: relative;

        .cell {
          position: absolute;
          top: 0;
          left: 0;
          width: 150px;   // 根据勾股定理计算得出长度和旋转角度
          height: 1px;
          background-color: #EBEEF5;
          display: block;
          text-align: center;
          transform: rotate(38deg);
          transform-origin: top left;
          -ms-transform: rotate(38deg);
          -ms-transform-origin: top left;
          -webkit-transform: rotate(38deg);
          -webkit-transform-origin: top left;
        }
        &:before {
          content: '单位';
          position: absolute;
          left: 0;
          bottom: 15px; // padding-top + 行高差值/2    12 + (22 - 16)/2
          width: 50px;
          text-align: center;
        }
        &:after {
          content: '项目';
          position: absolute;
          right: 0;
          top: 15px;
          width: 50px;
          text-align: center;
        }
      }
    }

  }
</style>
