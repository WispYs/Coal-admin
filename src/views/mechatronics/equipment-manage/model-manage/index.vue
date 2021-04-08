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
            placeholder="请输入设备类型"
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
        <el-table-column prop="name" align="center" label="设备类型名称" />
        <el-table-column prop="code" align="center" label="设备类型编码" />
        <el-table-column prop="unit" align="center" label="单位" />
        <el-table-column prop="model" align="center" label="规格型号" />
        <el-table-column prop="createTime" align="center" label="录入时间" />
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
          name: "采煤机",
          code: "02",
          unit: "台",
          model: "GQ022114",
          createTime: "2021.01.25",
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
