<template>
  <div class="page-container report-table">
    <!-- <div class="report-button">
      <el-button type="primary" size="small"
        ><i class="el-icon-upload2 el-icon--left" />导出</el-button
      >
    </div> -->
    <div class="top">
      <span class="data-picker"
        >日期：<el-select v-model="value" size="small" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option> </el-select
      ></span>
    </div>

    <h2 class="title">2020年 原煤产量月度分解计划表</h2>
    <h4 style="text-align: center;">单位：日产：吨，月产(全年合计)：万吨</h4>

    <el-table
      :span-method="objectSpanMethod"
      class="table-row"
      :cell-class-name="cell"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column prop="db" label="队别"> </el-table-column>
      <el-table-column prop="gzm" label="工作面"> </el-table-column>

      <el-table-column prop="startTime" label="开始时间"> </el-table-column>
      <el-table-column prop="endTime" label="结束时间"> </el-table-column>

      <el-table-column label="1月份">
        <el-table-column prop="_1dayYield" label="日产"> </el-table-column>
        <el-table-column prop="_1monthYield" label="月产"> </el-table-column>
      </el-table-column>
      <el-table-column label="2月份">
        <el-table-column prop="_2dayYield" label="日产"> </el-table-column>
        <el-table-column prop="_2monthYield" label="月产"> </el-table-column>
      </el-table-column>
      <el-table-column label="3月份">
        <el-table-column prop="_3dayYield" label="日产"> </el-table-column>
        <el-table-column prop="_3monthYield" label="月产"> </el-table-column>
      </el-table-column>
      <el-table-column label="4月份">
        <el-table-column prop="_4dayYield" label="日产"> </el-table-column>
        <el-table-column prop="_4monthYield" label="月产"> </el-table-column>
      </el-table-column>
      <el-table-column label="5月份">
        <el-table-column prop="_5dayYield" label="日产"> </el-table-column>
        <el-table-column prop="_5monthYield" label="月产"> </el-table-column>
      </el-table-column>
      <el-table-column label="6月份">
        <el-table-column prop="_6dayYield" label="日产"> </el-table-column>
        <el-table-column prop="_6monthYield" label="月产"> </el-table-column>
      </el-table-column>
      <el-table-column label="7月份">
        <el-table-column prop="_7dayYield" label="日产"> </el-table-column>
        <el-table-column prop="_7monthYield" label="月产"> </el-table-column>
      </el-table-column>
      <el-table-column label="8月份">
        <el-table-column prop="_8dayYield" label="日产"> </el-table-column>
        <el-table-column prop="_8monthYield" label="月产"> </el-table-column>
      </el-table-column>
      <el-table-column label="9月份">
        <el-table-column prop="_9dayYield" label="日产"> </el-table-column>
        <el-table-column prop="_9monthYield" label="月产"> </el-table-column>
      </el-table-column>
      <el-table-column label="10月份">
        <el-table-column prop="_10dayYield" label="日产"> </el-table-column>
        <el-table-column prop="_10monthYield" label="月产"> </el-table-column>
      </el-table-column>
      <el-table-column label="11月份">
        <el-table-column prop="_11dayYield" label="日产"> </el-table-column>
        <el-table-column prop="_11monthYield" label="月产"> </el-table-column>
      </el-table-column>
      <el-table-column label="12月份">
        <el-table-column prop="_12dayYield" label="日产"> </el-table-column>
        <el-table-column prop="_12monthYield" label="月产"> </el-table-column>
      </el-table-column>

      <el-table-column prop="yearAll" label="全年合计"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  // name: "工作面接续年计划表",
  data() {
    return {
      value: "",
      options: [
        {
          value: "2020",
          label: "2020"
        }
      ],
      tableData: [
        {
          db: "矿井产量",
          gzm: "1124(3)工作面",
          startTime: "",
          endTime: "",
          _1dayYield: "3.03",
          _1yearYield: "75.7",
          _2dayYield: "3.03",
          _2yearYield: "68",
          _3dayYield: "",
          _3yearYield: "",
          _4dayYield: "",
          _4yearYield: "",
          _5dayYield: "",
          _5yearYield: "",
          _6dayYield: "3.02",
          _6yearYield: "85.5",
          _7dayYield: "",
          _7yearYield: "",
          _8dayYield: "",
          _8yearYield: "",
          _9dayYield: "",
          _9yearYield: "",
          _10dayYield: "",
          _10yearYield: "",
          _11dayYield: "",
          _11yearYield: "",
          _12dayYield: "",
          _12yearYield: ""
        },
        {
          db: "回采产量",
          gzm: "1124(3)工作面",
          startTime: "",
          endTime: "",
          _1dayYield: "3.03",
          _1yearYield: "75.7",
          _2dayYield: "3.03",
          _2yearYield: "68",
          _3dayYield: "",
          _3yearYield: "",
          _4dayYield: "",
          _4yearYield: "",
          _5dayYield: "",
          _5yearYield: "",
          _6dayYield: "3.02",
          _6yearYield: "85.5",
          _7dayYield: "",
          _7yearYield: "",
          _8dayYield: "",
          _8yearYield: "",
          _9dayYield: "",
          _9yearYield: "",
          _10dayYield: "",
          _10yearYield: "",
          _11dayYield: "",
          _11yearYield: "",
          _12dayYield: "",
          _12yearYield: ""
        },
        {
          db: "掘进煤量",
          gzm: "1124(3)工作面",
          startTime: "",
          endTime: "",
          _1dayYield: "3.03",
          _1yearYield: "75.7",
          _2dayYield: "3.03",
          _2yearYield: "68",
          _3dayYield: "",
          _3yearYield: "",
          _4dayYield: "",
          _4yearYield: "",
          _5dayYield: "",
          _5yearYield: "",
          _6dayYield: "3.02",
          _6yearYield: "85.5",
          _7dayYield: "",
          _7yearYield: "",
          _8dayYield: "",
          _8yearYield: "",
          _9dayYield: "",
          _9yearYield: "",
          _10dayYield: "",
          _10yearYield: "",
          _11dayYield: "",
          _11yearYield: "",
          _12dayYield: "",
          _12yearYield: ""
        },
        {
          db: "综采一队",
          gzm: "1124(3)工作面1",
          startTime: "",
          endTime: "",
          _1dayYield: "3.03",
          _1yearYield: "75.7",
          _2dayYield: "3.03",
          _2yearYield: "68",
          _3dayYield: "",
          _3yearYield: "",
          _4dayYield: "",
          _4yearYield: "",
          _5dayYield: "",
          _5yearYield: "",
          _6dayYield: "3.02",
          _6yearYield: "85.5",
          _7dayYield: "",
          _7yearYield: "",
          _8dayYield: "",
          _8yearYield: "",
          _9dayYield: "",
          _9yearYield: "",
          _10dayYield: "",
          _10yearYield: "",
          _11dayYield: "",
          _11yearYield: "",
          _12dayYield: "",
          _12yearYield: ""
        },
        {
          db: "综采一队",
          gzm: "1124(3)工作面2",
          startTime: "",
          endTime: "",
          _1dayYield: "3.03",
          _1yearYield: "75.7",
          _2dayYield: "3.03",
          _2yearYield: "68",
          _3dayYield: "",
          _3yearYield: "",
          _4dayYield: "",
          _4yearYield: "",
          _5dayYield: "",
          _5yearYield: "",
          _6dayYield: "3.02",
          _6yearYield: "85.5",
          _7dayYield: "",
          _7yearYield: "",
          _8dayYield: "",
          _8yearYield: "",
          _9dayYield: "",
          _9yearYield: "",
          _10dayYield: "",
          _10yearYield: "",
          _11dayYield: "",
          _11yearYield: "",
          _12dayYield: "",
          _12yearYield: ""
        },
        {
          db: "综采二队",
          gzm: "1124(3)工作面1",
          startTime: "",
          endTime: "",
          _1dayYield: "3.03",
          _1yearYield: "75.7",
          _2dayYield: "3.03",
          _2yearYield: "68",
          _3dayYield: "",
          _3yearYield: "",
          _4dayYield: "",
          _4yearYield: "",
          _5dayYield: "",
          _5yearYield: "",
          _6dayYield: "3.02",
          _6yearYield: "85.5",
          _7dayYield: "",
          _7yearYield: "",
          _8dayYield: "",
          _8yearYield: "",
          _9dayYield: "",
          _9yearYield: "",
          _10dayYield: "",
          _10yearYield: "",
          _11dayYield: "",
          _11yearYield: "",
          _12dayYield: "",
          _12yearYield: ""
        },
        {
          db: "综采二队",
          gzm: "1124(3)工作面2",
          startTime: "",
          endTime: "",
          _1dayYield: "3.03",
          _1yearYield: "75.7",
          _2dayYield: "3.03",
          _2yearYield: "68",
          _3dayYield: "",
          _3yearYield: "",
          _4dayYield: "",
          _4yearYield: "",
          _5dayYield: "",
          _5yearYield: "",
          _6dayYield: "3.02",
          _6yearYield: "85.5",
          _7dayYield: "",
          _7yearYield: "",
          _8dayYield: "",
          _8yearYield: "",
          _9dayYield: "",
          _9yearYield: "",
          _10dayYield: "",
          _10yearYield: "",
          _11dayYield: "",
          _11yearYield: "",
          _12dayYield: "",
          _12yearYield: ""
        },
        {
          db: "综采三队",
          gzm: "1124(3)工作面1",
          startTime: "",
          endTime: "",
          _1dayYield: "3.03",
          _1yearYield: "75.7",
          _2dayYield: "3.03",
          _2yearYield: "68",
          _3dayYield: "",
          _3yearYield: "",
          _4dayYield: "",
          _4yearYield: "",
          _5dayYield: "",
          _5yearYield: "",
          _6dayYield: "3.02",
          _6yearYield: "85.5",
          _7dayYield: "",
          _7yearYield: "",
          _8dayYield: "",
          _8yearYield: "",
          _9dayYield: "",
          _9yearYield: "",
          _10dayYield: "",
          _10yearYield: "",
          _11dayYield: "",
          _11yearYield: "",
          _12dayYield: "",
          _12yearYield: ""
        },
        {
          db: "综采三队",
          gzm: "1124(3)工作面2",
          startTime: "",
          endTime: "",
          _1dayYield: "3.03",
          _1yearYield: "75.7",
          _2dayYield: "3.03",
          _2yearYield: "68",
          _3dayYield: "",
          _3yearYield: "",
          _4dayYield: "",
          _4yearYield: "",
          _5dayYield: "",
          _5yearYield: "",
          _6dayYield: "3.02",
          _6yearYield: "85.5",
          _7dayYield: "",
          _7yearYield: "",
          _8dayYield: "",
          _8yearYield: "",
          _9dayYield: "",
          _9yearYield: "",
          _10dayYield: "",
          _10yearYield: "",
          _11dayYield: "",
          _11yearYield: "",
          _12dayYield: "",
          _12yearYield: ""
        },
        {
          db: "掘进煤(含其他煤)",
          gzm: "",
          startTime: "",
          endTime: "",
          _1dayYield: "3.03",
          _1yearYield: "75.7",
          _2dayYield: "3.03",
          _2yearYield: "68",
          _3dayYield: "",
          _3yearYield: "",
          _4dayYield: "",
          _4yearYield: "",
          _5dayYield: "",
          _5yearYield: "",
          _6dayYield: "3.02",
          _6yearYield: "85.5",
          _7dayYield: "",
          _7yearYield: "",
          _8dayYield: "",
          _8yearYield: "",
          _9dayYield: "",
          _9yearYield: "",
          _10dayYield: "",
          _10yearYield: "",
          _11dayYield: "",
          _11yearYield: "",
          _12dayYield: "",
          _12yearYield: ""
        },
        {
          db: "说明",
          gzm: "",
          startTime: "",
          endTime: "",
          _1dayYield: "3.03",
          _1yearYield: "75.7",
          _2dayYield: "3.03",
          _2yearYield: "68",
          _3dayYield: "",
          _3yearYield: "",
          _4dayYield: "",
          _4yearYield: "",
          _5dayYield: "",
          _5yearYield: "",
          _6dayYield: "3.02",
          _6yearYield: "85.5",
          _7dayYield: "",
          _7yearYield: "",
          _8dayYield: "",
          _8yearYield: "",
          _9dayYield: "",
          _9yearYield: "",
          _10dayYield: "",
          _10yearYield: "",
          _11dayYield: "",
          _11yearYield: "",
          _12dayYield: "",
          _12yearYield: ""
        },
        {
          db: "说明",
          gzm: "",
          startTime: "",
          endTime: "",
          _1dayYield: "3.03",
          _1yearYield: "75.7",
          _2dayYield: "3.03",
          _2yearYield: "68",
          _3dayYield: "",
          _3yearYield: "",
          _4dayYield: "",
          _4yearYield: "",
          _5dayYield: "",
          _5yearYield: "",
          _6dayYield: "3.02",
          _6yearYield: "85.5",
          _7dayYield: "",
          _7yearYield: "",
          _8dayYield: "",
          _8yearYield: "",
          _9dayYield: "",
          _9yearYield: "",
          _10dayYield: "",
          _10yearYield: "",
          _11dayYield: "",
          _11yearYield: "",
          _12dayYield: "",
          _12yearYield: ""
        }
      ]
    };
  },
  mounted() {
    // console.log(this.tableData.length);
  },
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 && rowIndex > 2) {
        if (rowIndex % 2 === 1) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    cell({ row, column, rowIndex, columnIndex }) {
      // if (2 < rowIndex && columnIndex < 28) {
      //   return "bacColorf3d7ab";
      // }
    }
  }
};
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
}
.title {
  text-align: center;
  margin: 20px auto;
}
.data-picker {
  margin: 0 10px;
}
.table-row {
  text-align: center;
}
::v-deep .el-table tbody tr:hover > td {
  pointer-events: none;
}
::v-deep .el-table th > .cell {
  text-align: center !important;
}
</style>
