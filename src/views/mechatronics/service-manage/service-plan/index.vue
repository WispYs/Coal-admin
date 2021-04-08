<template>
  <div
    class="page-container has-tree"
    :class="treeExtend ? 'open-tree' : 'close-tree'"
  >
    <tree-bar :tree-data="treeData" @extend-click="treeExtend = !treeExtend" />

    <div class="tree-form-container">
      <div class="filter-bar">
        <div class="filter-bar__item">
          <label>关键字：</label>
          <el-input
            v-model="keywords"
            class="filter-item"
            style="width:200px"
            placeholder="所属场所、检修位置"
            suffix-icon="el-icon-search"
          />
        </div>
        <div class="filter-bar__item">
          <el-button type="primary" size="medium" @click="search()"
            >搜索</el-button
          >
        </div>
      </div>
      <el-table
        :data="tableData"
        border
        fit
        :cell-style="cellStyle"
        header-cell-class-name="pre-line"
      >
        <el-table-column align="center" label="序号" width="95" fixed>
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          prop="site"
          align="center"
          label="所属场所"
          width="150px"
        />
        <el-table-column prop="name" align="center" label="设备名称" />
        <el-table-column
          prop="content"
          align="center"
          label="维检内容"
          width="220px"
        />
        <el-table-column prop="date" align="center" label="检修时间" />
        <el-table-column prop="period" align="center" label="检修周期" />
        <el-table-column prop="earlyDay" align="center" label="管理预警天数" />
        <el-table-column prop="alarmDay" align="center" label="管理报警天数" />
        <el-table-column prop="person" align="center" label="责任人" />
        <el-table-column prop="remark" align="center" label="备注" />
        <el-table-column fixed="right" label="操作" width="160" align="center">
          <el-button type="text" size="small" @click="edit()">编辑</el-button>
          <el-button
            type="text"
            size="small"
            style="color: #f56c6c"
            @click="del()"
            >删除</el-button
          >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import TreeBar from "@/components/TreeBar";
export default {
  components: { TreeBar },
  data() {
    return {
      treeExtend: true,
      treeData: {
        title: "选择专业",
        list: [
          {
            label: "专业",
            children: [
              {
                label: "安检"
              },
              {
                label: "采煤"
              },
              {
                label: "掘进（中央区）"
              },
              {
                label: "掘进（南区）"
              },
              {
                label: "机电运输"
              },
              {
                label: "一通三防"
              },
              {
                label: "地面设施"
              },
              {
                label: "维护"
              },
              {
                label: "地质灾害防治"
              }
            ]
          }
        ]
      },
      keywords: "",
      tableData: [
        {
          site: "中央区主井提升机房",
          name: "主电机碳刷",
          content: "请您及时人员对副井主电机碳刷...",
          date: "2021.01.25",
          period: "月",
          earlyDay: 10,
          alarmDay: 5,
          person: "超级管理员",
          remark: ""
        }
      ]
    };
  },
  methods: {
    search() {
      console.log(this.keywords);
    },
    edit() {
      console.log("edit");
    },
    del() {
      console.log("del");
    },
    // 表格单元格样式
    cellStyle() {
      return "font-size: 13px";
    }
  }
};
</script>
<style lang="scss" scoped>
.filter-bar {
  margin-bottom: 10px;
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
