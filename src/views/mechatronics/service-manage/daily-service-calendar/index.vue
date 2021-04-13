<template>
  <div class="page-container">
    <calendar :calendar-data="calendarData" @event-click="eventClick" />
  </div>
</template>
<script>
import Calendar from '@/components/Calendar'

export default {
  components: { Calendar },
  data() {
    return {
      calendarData: [
        { 'date': '2021-04-14', 'title': ['副井井筒', '电气部分', '绞车滚筒', '绞车滚筒', '绞车滚筒'] },
        { 'date': '2021-04-16', 'title': ['副井井筒', '电气部分'] },
        { 'date': '2021-04-01', 'title': ['副井井筒', '电气部分', '绞车滚筒'] }
      ]
    }
  },

  methods: {
    // 日程点击事件
    eventClick(value) {
      this.$router.push({ path: '/mechatronics/service-manage/daily-service-manage', query: { date: value.date }})
    }

  }
}
</script>
<style lang="scss" scoped>

</style>
