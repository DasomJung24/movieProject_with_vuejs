<template>
  <div class="calendar">
    <div class="calendar-month">
      {{ dateList[0][0] }}.{{ dateList[0][1] }}
    </div>
    <font-awesome-icon icon="chevron-left" class="ca-left-arrow" color="#aaa"/>
      <div class="horizontal-calendar">
        <div
            v-for="(date, index) in dateList"
            :key="date[2]"
            :class="[
                date[3] === 'Saturday' ? 'blue' : '',
                date[3] === 'Sunday' ? 'red' : '',
                date[2] === selectedDay ? 'select-day' : ''
               ]"
            @click="selectedDay = date[2]"
        >
          <span>{{ date[2] }}</span>
          <span>&#183;</span>
          <span v-if="index===0">오늘</span>
          <span v-else-if="index===1">내일</span>
          <span v-else>{{ date[3]|translateDay }}</span>
        </div>
    </div>
    <font-awesome-icon icon="chevron-right" class="ca-right-arrow" color="#aaa" />
  </div>
</template>
<script>
import moment from 'moment'
export default {
  created () {
    this.makeDateList()
  },
  data () {
    return {
      dateList: [],
      selectedDay: '12',
      rightOn: false,
      leftOn: false
    }
  },
  methods: {
    makeDateList () {
      const t = moment().format('YYYY,MM,D,dddd').split(',')
      this.dateList.push(t)
      for (var i = 1; i < 21; i++) {
        this.dateList.push(
          moment(this.dateList[-1]).add(i, 'days').format('YYYY,MM,DD,dddd').split(',')
        )
      }
    }
  }
}
</script>
