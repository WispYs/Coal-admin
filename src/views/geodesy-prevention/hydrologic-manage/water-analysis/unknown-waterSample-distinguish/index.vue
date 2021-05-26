<template>
  <div class="unknown_content">
    <el-container>
      <el-aside class="content_aside" width="260px">
        <div class="aside_title">按提示输入各离子浓度(mg/L)</div>
        <div class="aside_content">
          <el-row class="condition_main">
            <el-col :span="9" class="asibe_label">
              <div class="asibe_label_item">Na+&K+:</div>
            </el-col>
            <el-col :span="15" class="asibe_input">
              <el-input v-model="conditionForm.na"></el-input>
            </el-col>
          </el-row>
          <el-row class="condition_main">
            <el-col :span="9" class="asibe_label">
              <div class="asibe_label_item">Ca2+:</div>
            </el-col>
            <el-col :span="15" class="asibe_input">
              <el-input v-model="conditionForm.ca"></el-input>
            </el-col>
          </el-row>
          <el-row class="condition_main">
            <el-col :span="9" class="asibe_label">
              <div class="asibe_label_item">Mg2+:</div>
            </el-col>
            <el-col :span="15" class="asibe_input">
              <el-input v-model="conditionForm.mg"></el-input>
            </el-col>
          </el-row>
          <el-row class="condition_main">
            <el-col :span="9" class="asibe_label">
              <div class="asibe_label_item">Cl-:</div>
            </el-col>
            <el-col :span="15" class="asibe_input">
              <el-input v-model="conditionForm.cl"></el-input>
            </el-col>
          </el-row>
          <el-row class="condition_main">
            <el-col :span="9" class="asibe_label">
              <div class="asibe_label_item">SO42-:</div>
            </el-col>
            <el-col :span="15" class="asibe_input">
              <el-input v-model="conditionForm.so"></el-input>
            </el-col>
          </el-row>
          <el-row class="condition_main">
            <el-col :span="9" class="asibe_label">
              <div class="asibe_label_item">HCO3-:</div>
            </el-col>
            <el-col :span="15" class="asibe_input">
              <el-input v-model="conditionForm.hco"></el-input>
            </el-col>
          </el-row>
        </div>
        <div class="condition_button">
          <el-row>
            <el-button class="button_item" type="primary" plain @click="startAnalysis">开始分析</el-button>
            <el-button class="button_item" @click="download">下载</el-button>
          </el-row>
        </div>
      </el-aside>
      <el-main class="content_main">
        <div class="main_title">
          基于K-Means聚类分析的涌水水源判别
        </div>
        <el-table :data="tableData" class="main_table" height="360px">
          <el-table-column prop="water" label="水质名称" align="center" style="height: 30px;">
          </el-table-column>
          <el-table-column prop="na" label="Na+&K+" align="center">
          </el-table-column>
          <el-table-column prop="ca" label="Ca2+" align="center">
          </el-table-column>
          <el-table-column prop="mg" label="Mg2+" align="center">
          </el-table-column>
          <el-table-column prop="cl" label="Cl-" align="center">
          </el-table-column>
          <el-table-column prop="so" label="SO42-" align="center">
          </el-table-column>
          <el-table-column prop="hco" label="HCO3-" align="center">
          </el-table-column>
        </el-table>
        <div class="main_conclusion">
          <h3 class="conclusion_title">结论</h3>
          <p class="conclusion">初步分析认为该水样与【太灰-十北C3-Ⅲ,取样地点或钻孔:太灰,相似度:94.99%】【十北下含,取样地点或钻孔:下含,相似度：95.88%】【太灰-水34,取样地点或钻孔:太灰,相似度:91.44%】【太灰-水20,取样地点或钻孔:太灰,相似度:99.48%】【太灰-XLZK2,取样地点或钻孔:太灰,相似度:99.39%】【太灰-水21,取样地点或钻孔:相似度:99.51%】水样属同类水样。欲获得更准确结果,可以尝试综合方法-所得结果进行判断或进行多次聚类后取可信结果</p>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          water: '太灰-水18',
          na: '861.97',
          ca: '34.01',
          mg: '28.37',
          cl: '1029.88',
          so: '246.29',
          hco: '414.93'
        }, {
          water: '水4孔',
          na: '1566.13',
          ca: '46.49',
          mg: '11.67',
          cl: '1988.75',
          so: '172.91',
          hco: '341.71'
        }, {
          water: '水16孔',
          na: '85.13',
          ca: '13.73',
          mg: '1.15',
          cl: '76.74',
          so: '13.73',
          hco: '9.53'
        }, {
          water: '太灰-水20',
          na: '36.04',
          ca: '2.03',
          mg: '3.45',
          cl: '26.43',
          so: '9.09',
          hco: '5.35'
        }, {
          water: '太灰-XLZL1',
          na: '65.01',
          ca: '22.95',
          mg: '12.02',
          cl: '6.67',
          so: '1.89',
          hco: '91.44'
        }, {
          water: '太灰-十五C3-Ⅲ',
          na: '36.04',
          ca: '2.03',
          mg: '3.45',
          cl: '26.43',
          so: '9.09',
          hco: '5.35'
        }],
        conditionForm: {
          na: '21',
          ca: '21',
          mg: '12',
          cl: '12',
          so: '12',
          hco: '12'
        }
      }
    },
    methods:{
      startAnalysis(){
        this.$message.info("敬请期待")
      },
      download(){
        this.$message.info("敬请期待")
      }
    }
  }
</script>

<style lang="scss">
  .condition_main {
    .asibe_input {
      .el-input {
        .el-input__inner {
          height: 30px;
        }
      }
    }
  }
</style>
<style lang="scss" scoped>
  .unknown_content {
    width: calc(100% - 30px);
    margin: 20px auto 30px;
    text-align: center;

    .content_aside {
      background-color: #D6DFE7;

      .aside_title {
        height: 60px;
        line-height: 60px;
      }

      .aside_content {
        .condition_main {
          width: calc(100% - 30px);
          margin: 12px auto 12px;

          .asibe_label {
            background-color: #F7F7FF;
            border-radius: 4px;

            .asibe_label_item {
              height: 30px;
              line-height: 30px;
            }
          }
        }
      }

      .condition_button {
        margin: 30px auto;

        .button_item {
          width: 100px;
          display: block;
          margin: 0 auto 12px;
        }
      }
    }

    .content_main {
      background-color: #B5C3D6;
      padding: 0;

      .main_title {
        height: 60px;
        line-height: 60px;
      }

      .main_table {
        width: 100%;
        border: 16px solid #F7F7FF;
        border-bottom: 0px;
      }
      .main_conclusion{
        .conclusion_title{
          margin: 10px;
        }
        .conclusion{
          width: calc(100% - 60px);
          margin: 0 auto 30px;
        }
      }
    }
  }
</style>
