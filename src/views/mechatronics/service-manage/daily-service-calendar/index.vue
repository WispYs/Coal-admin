<template>
  <div class="page-container">
    <calendar :calendar-data="calendarData" @event-click="eventClick" />
  </div>
</template>
<script>
import Calendar from '@/components/Calendar'
import { getServicePlanList } from '@/api/mechatronics'
import { parseTime } from '@/utils'

export default {
  components: { Calendar },
  data() {
    return {
      calendarData: [
        // { 'date': '2021-04-14', 'title': ['副井井筒', '电气部分', '绞车滚筒', '绞车滚筒', '绞车滚筒'] },
        // { 'date': '2021-04-16', 'title': ['副井井筒', '电气部分'] },
        // { 'date': '2021-04-01', 'title': ['副井井筒', '电气部分', '绞车滚筒'] }
      ]
    }
  },

  created() {
    this.__fetchData()
  },

  methods: {
    __fetchData() {
      getServicePlanList({ page: 1, pagerows: 1000 }).then(response => {
        // 获取的日程对象
        const getCalendarData = {}
        response.data.rows.forEach(it => {
          const date = parseTime(it.oveTime)
          // 将数据存在对象中
          if (!getCalendarData[date]) {
            getCalendarData[date] = {
              date,
              title: []
            }
          }
          getCalendarData[date].title.push(it.deviceName)
        })
        console.log(getCalendarData)
        this.calendarData = Object.values(getCalendarData)
      })
    },
    // 日程点击事件
    eventClick(value) {
      this.$router.push({ path: '/mechatronics/service-manage/daily-service-manage', query: { date: value.date }})
    }

  }
}
</script>
<style lang="scss" scoped>

</style>
