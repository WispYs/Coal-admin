<template>
  <div class="calendar-wrapper">
    <el-calendar id="calendar" v-model="nowDate">
      <template slot="dateCell" slot-scope="{date, data}">
        <!-- 日历日程 -->
        <div :class="eventDate.indexOf(data.day)!=-1 ? 'has-event' : ''">
          <div class="calendar-day">{{ data.day.split('-').slice(2).join('-') }}</div>
          <div v-for="(item, index) in calendarData" :key="index">
            <div v-if="(item.date.split('-')[0]).indexOf(data.day.split('-')[0])!=-1">
              <div v-if="(item.date.split('-')[1]).indexOf(data.day.split('-')[1])!=-1">
                <div v-if="(item.date.split('-')[2]).indexOf(data.day.split('-')[2])!=-1">
                  <div class="event-content" @click="eventClick(item)">
                    <div v-for="(it, i) in handleEvent(item.title)" :key="i" class="event-title" :title="it">{{ it }}</div>
                    <b v-if="item.title.length > 3">+{{ item.title.length - 3 }} more</b>
                  </div>
                </div>
                <div v-else />
              </div>
              <div v-else />
            </div>
            <div v-else />
          </div>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  props: {
    calendarData: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      nowDate: new Date()
    }
  },
  computed: {
    // 有事件的日程
    eventDate() {
      const eventArr = []
      for (const i in this.calendarData) {
        eventArr.push(this.calendarData[i].date)
      }
      return eventArr
    }
  },

  methods: {
    // 日程点击
    eventClick(item) {
      console.log(item)
      this.$emit('event-click', item)
    },
    // 截取事件前三个展示，多余的显示more
    handleEvent(title) {
      if (title.length > 3) title = title.slice(0, 3)
      return title
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/theme.scss';
@import '~@/assets/styles/variables.scss';
.calendar-wrapper {
  padding: 20px;
  ::v-deep {
    .el-calendar-table .el-calendar-day {
      height: 105px;
    }
  }
}

.calendar-day{
  text-align: right;
  color: #202535;
  line-height: 26px;
  font-size: 14px;
}
.has-event {
  .calendar-day {
    font-weight: bold;
    font-size: 16px;
    @include primaryColor($primaryColor);
  }
}
.event-content {
  height: 67px;
  overflow: hidden;
  font-size: 12px;
}
.event-title{
  color: #666;
  font-size: 10px;
  line-height: 16px;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-top: 1px;
  color: #fff;
  padding: 0 6px;
  @include primaryBg($primaryColor);
  border-radius: 4px;
}
</style>
