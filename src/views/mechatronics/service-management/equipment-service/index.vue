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
            placeholder="故障主题、故障情况"
            suffix-icon="el-icon-search"
          />
        </div>
        <div class="filter-bar__item">
          <el-button type="primary" size="medium" @click="search()"
            >搜索</el-button
          >
          <el-button type="primary" size="medium" @click="search()"
            ><i class="el-icon-plus el-icon--left" />突发故障</el-button
          >
          <el-button type="primary" size="medium" @click="search()"
            ><i class="el-icon-search el-icon--left" />查看备品备件</el-button
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
        <el-table-column prop="type" align="center" label="类别" />
        <el-table-column prop="title" align="center" label="故障主题" />
        <el-table-column prop="phenomenon" align="center" label="故障情况" />
        <el-table-column prop="status" align="center" label="状态" />
        <el-table-column prop="resolve" align="center" label="处理过程" />
        <el-table-column prop="result" align="center" label="处理结果" />
        <el-table-column prop="person" align="center" label="处理人" />
        <el-table-column prop="date" align="center" label="处理时间" />
        <el-table-column prop="file" align="center" label="附件" />

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
          title: "",
          status: "",
          resolve: "",
          result: "",
          file: "",
          date: "2021.01.25",
          person: "超级管理员"
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
