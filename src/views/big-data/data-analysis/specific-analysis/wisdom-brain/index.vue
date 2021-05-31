<template>
  <div class="wisdom-brain">
    <div class="wisdom-brain__top">
      <equip-preview :data="equipPreviewData" />
      <video-capture :data="videoData" />
      <wisdom-type :data="wisdomTypeData" />
    </div>
    <div class="wisdom-brain__bottom">
      <people-stay :data="peopleStayData" />
      <break-rule :data="breakRuleData" />
      <foreign-discern :data="foreignDiscernData" />
    </div>
  </div>
</template>
<script>
import EquipPreview from './components/EquipPreview'
import VideoCapture from './components/VideoCapture'
import WisdomType from './components/WisdomType'
import PeopleStay from './components/PeopleStay'
import BreakRule from './components/BreakRule'
import ForeignDiscern from './components/ForeignDiscern'

export default {
  components: { EquipPreview, VideoCapture, WisdomType, PeopleStay, BreakRule, ForeignDiscern },
  data() {
    return {
      equipPreviewData: [
        { value: 8, label: '智能识别中' },
        { value: 13, label: '智能分析设备' },
        { value: 0, label: '智能识别异常设备' }
      ],
      videoData: [
        require('@/assets/images/big-data_decision_emergency_1.png'),
        require('@/assets/images/big-data_decision_emergency_2.png'),
        require('@/assets/images/big-data_decision_emergency_1.png'),
        require('@/assets/images/big-data_decision_emergency_2.png'),
        require('@/assets/images/big-data_decision_emergency_1.png'),
        require('@/assets/images/big-data_decision_emergency_2.png')
      ],
      wisdomTypeData: {
        value: 976,
        label: '总个数',
        list: [
          { value: 653, label: '人员滞留' },
          { value: 218, label: '异物识别' },
          { value: 105, label: '违章行为' }
        ]
      },
      peopleStayData: {
        config: [
          { label: '违章类型', field: 'type' },
          { label: '地点', field: 'addr' },
          { label: '数量', field: 'num', align: 'center' }
        ],
        value: [
          { type: '人员滞留', addr: '中央区13槽下山', num: 24 },
          { type: '人员滞留', addr: '中央区上井口出车测', num: 36 },
          { type: '人员滞留', addr: '中央区13槽山下下口', num: 14 },
          { type: '人员滞留', addr: '中央区13槽山下上口', num: 45 }
        ]
      },
      breakRuleData: {
        config: [
          { label: '违章类型', field: 'type' },
          { label: '地点', field: 'addr' },
          { label: '数量', field: 'num', align: 'center' }
        ],
        value: [
          { type: '行车不行人', addr: '中央区13槽下山', num: 26 },
          { type: '行车不行人', addr: '中央区上井口出车测', num: 35 },
          { type: '行车不行人', addr: '中央区上井口出车测', num: 14 },
          { type: '行车不行人', addr: '中央区13槽下山', num: 59 }
        ]
      },
      foreignDiscernData: {
        config: [
          { label: '报警类型', field: 'type' },
          { label: '地点', field: 'addr' },
          { label: '数量', field: 'num', align: 'center' }
        ],
        value: [
          { type: '车辆滞留', addr: '中央区上井口出车测', num: 11 },
          { type: '车辆滞留', addr: '中央区上井口出车测', num: 14 },
          { type: '车辆滞留', addr: '中央区上井口出车测', num: 19 },
          { type: '车辆滞留', addr: '中央区上井口出车测', num: 21 }
        ]
      }
    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/mixin.scss';
.wisdom-brain {
  height: 9rem;
  &__top {
    height: 5.9rem;
    margin-bottom: .3rem;
  }
  &__bottom {
    height: 2.8rem;
  }
}

</style>
<style lang="scss">
@import '~@/assets/styles/mixin.scss';
.wisdom-brain {
  .item-title {
    position: relative;
    height: .48rem;
    line-height: .48rem;
    color: #1fefff;
    padding-left: .16rem;
    &.has-sum {
      p {
        @include ellipsis(calc(100% - 1.2rem));
      }
    }
    p {
      @include ellipsis(100%);
      float: left;
      height: .48rem;
      line-height: .48rem;
      font-size: .2rem;
    }
    .title-sum {
      @include ellipsis(100%);
      float: right;
      font-size: .16rem;
      width: 1.2rem;
    }
  }
  .item-content {
    padding: .1rem;
    height: calc(100% - .48rem);
  }
}

</style>
