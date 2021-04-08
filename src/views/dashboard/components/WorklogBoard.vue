<template>
  <div class="swiper-content">
    <div class="worklog-board">
      <table border="1">
        <tr>
          <td width="100">矿总值班</td>
          <td class="text-left">张进松</td>
          <td>副值班</td>
          <td class="text-left">李德清</td>
        </tr>
        <tr>
          <td>带班</td>
          <td colspan="3" class="text-paragraph">
            <div>王新一、钟欣桐、李维嘉、王伯俊、周子轩、顾伟通、龙晨晨</div>
          </td>
        </tr>
        <tr>
          <td>备注</td>
          <td colspan="3" class="text-paragraph">
            <div>雨季“三防”期间，值班要同时兼任“三防”工作，并及时组织人力、 物力完成抢险任务</div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/theme.scss';

.worklog-board {
  padding:52px 20px 10px;
  overflow: hidden;
  table {
    text-align: center;
    border: 1px solid $borderColor;
    line-height: 24px;
    height: 175px;
    font-size: 13px;
    border-collapse: collapse;
    td {
      padding: 12px 0;
    }
    .text-left {
      text-align: left;
      padding: 12px 10px;
    }
    .text-paragraph {
      text-align: left;
      padding: 7px 10px;
      height: 48px;
      div {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

    }
  }
}

</style>
