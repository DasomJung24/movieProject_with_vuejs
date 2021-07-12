<template>
  <div class="calendar">
    <div class="calendar-month">
      {{ dateList[0][0] }}.{{ dateList[0][1] }}
    </div>
    <font-awesome-icon icon="chevron-left" class="ca-left-arrow" color="#aaa" @click="prev"/>
      <transition-group
          tag="div"
          name="back ? 'slideBack' : 'slide'"
          class="horizontal-calendar">
        <div
            v-for="(date, index) in dateList"
            :key="date[2]"
            :class="[
                date[3] === 'Saturday' ? 'blue' : '',
                date[3] === 'Sunday' ? 'red' : '',
                date[2] === selectedDay ? 'select-day' : ''
               ]"
            @click="handleDay(date)"
            style="position: relative;"
        >
          <span>{{ date[2] }}</span>
          <span>&#183;</span>
          <span v-if="index===0" key="index">오늘</span>
          <span v-else-if="index===1" key="index">내일</span>
          <span v-else key="index">{{ date[3]|translateDay }}</span>
        </div>
      </transition-group>
    <font-awesome-icon icon="chevron-right" class="ca-right-arrow" color="#aaa" @click="next"/>
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
      back: false,
      dist: 0,
      tempDateList: []
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
    },
    next () {
      this.back = false
      this.tempDateList.push(this.dateList.shift())
    },
    prev () {
      this.back = true
      this.dateList.unshift(this.tempDateList.pop())
    },
    async handleDay (selectedDate) {
      this.selectedDay = selectedDate[2]
      const params = { date: selectedDate[0] + '-' + selectedDate[1] + '-' + selectedDate[2] }
      const { data } = await this.axios.get('theaters/screenings', { params })
      console.log(data)
      this.$emit('movieListForDay', data)
    }
  }
}
</script>
