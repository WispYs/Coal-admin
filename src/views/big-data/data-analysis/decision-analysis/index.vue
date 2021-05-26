<template>
  <div class="big-data">
    <top-nav :nav-menu="nav" />
    <div class="big-data__content">
      <div class="decision-wrapper">
        <div class="decision-content con-left">
          <product-status class="decision-content__item" />
          <footage-status class="decision-content__item" />
          <work-condition class="decision-content__item" />
        </div>
        <div class="decision-content con-center">
          <decision-main class="decision-content__item" />
          <equip-consume class="decision-content__item" />
          <equip-curve class="decision-content__item" />
          <run-time class="decision-content__item" />
          <load-rate class="decision-content__item" />
          <run-failure class="decision-content__item" />
        </div>
        <div class="decision-content con-right">
          <safety-standard class="decision-content__item" />
          <security-status class="decision-content__item" />
          <hidden-danger class="decision-content__item" />
          <safety-diagnosis class="decision-content__item" />
          <emergency-plan class="decision-content__item" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TopNav from '../components/TopNav'
import ProductStatus from './components/ProductStatus'
import FootageStatus from './components/FootageStatus'
import WorkCondition from './components/WorkCondition'
import SafetyStandard from './components/SafetyStandard'
import SecurityStatus from './components/SecurityStatus'
import HiddenDanger from './components/HiddenDanger'
import SafetyDiagnosis from './components/SafetyDiagnosis'
import EmergencyPlan from './components/EmergencyPlan'
import DecisionMain from './components/DecisionMain'
import EquipConsume from './components/EquipConsume'
import EquipCurve from './components/EquipCurve'
import RunTime from './components/RunTime'
import LoadRate from './components/LoadRate'
import RunFailure from './components/RunFailure'

export default {
  components: {
    TopNav,
    ProductStatus,
    FootageStatus,
    WorkCondition,
    SafetyStandard,
    SecurityStatus,
    HiddenDanger,
    SafetyDiagnosis,
    EmergencyPlan,
    DecisionMain,
    EquipConsume,
    EquipCurve,
    RunTime,
    LoadRate,
    RunFailure
  },
  data() {
    return {
      nav: []

    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/mixin.scss';

.big-data {
  width: 100%;
  height:100%;
  background: url('~@/assets/images/big-data_banner.jpg') no-repeat;
  background-size: cover;
  position: relative;
  overflow: auto;
  &__content {
    margin-top: .95rem;
    padding: .3rem;
    color: #fff;
  }
}

</style>
<style lang="scss">
@import '~@/assets/styles/mixin.scss';
.decision-wrapper {
  @include clearfix;
  .decision-content {
    float: left;
    height: 9.4rem;
    padding: .06rem;
    border: 1px solid #22305b;
    border-radius: 4px;
    &.con-left {
      margin-right: .2rem;
      width: 4.5rem;
    }
    &.con-right {
      float: right;
      width: 4.5rem;
    }
    &.con-center {
      width: 9.2rem;
    }
    &__item {
      .item-title {
        position: relative;
        height: .36rem;
        line-height: .36rem;
        color: #1fefff;
        padding-left: .16rem;
        background: #002a67;
        &.no-select {
          p {
            @include ellipsis(100%);
          }
        }
        p {
          @include ellipsis(calc(100% - 1.3rem));
          float: left;
          height: .36rem;
          line-height: .36rem;
          font-size: .2rem;
        }
        .title-select {
          float: right;
          cursor: pointer;
          background: #002a67;
          &.el-select {
            .el-input__inner {
              background: transparent;
              border: none;
              max-width: 1.5rem;
              height: .36rem;
              line-height: .36rem;
              color: #1fefff;
              font-size: .16rem;
              padding: 0;
              padding-right: 25px;
              text-align: right;
            }
            .el-input__suffix {
              right: 0;
              background: #002a67;
              .el-input__icon {
                line-height: .36rem;
              }
            }
          }

        }
        &::before {
          position: absolute;
          top: 0;
          left: 0;
          content: '';
          width: 3px;
          height: 100%;
          background: #1fefff;
        }
      }
      .item-content {
        padding: .1rem .05rem;
      }
    }
  }
}
.decision__select {
  background: #0f1b34;
  border: 1px solid #002a67;
  .el-scrollbar__wrap {
    overflow: hidden;
  }
  .el-select-dropdown__item {
    color: #1fefff;
    font-size: .16rem;
  }
  .el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
    background: #002a67;
  }
  .el-select-dropdown__item.selected {
    color: #1fefff;
    font-weight: bold;
    font-size: .17rem;

  }
  .popper__arrow, .popper__arrow::after {
    border-bottom-color: #002a67!important;
  }
}
</style>
