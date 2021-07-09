<template>
  <div :class="$route.name === 'MainList' ? 'nav-bar-main' : 'nav-bar'" @mouseleave="handleProps">
    <div>
      <div class="movie-bar" v-if="data === 'movie'">
        <div v-for="movie in movies" :key="movie" @click="handleMovie(movie)">
          <span class="nav-bar-text">{{ movie }}</span>
        </div>
      </div>
      <div class="reservation-bar" v-if="data === 'reservation'">
        <div v-for="reservation in reservations" :key="reservation">
          <span class="nav-bar-text">{{ reservation }}</span>
        </div>
      </div>
      <div class="theater-bar" v-if="data === 'theater'">
        <div v-for="theater in theaters" :key="theater">
          <span class="nav-bar-text">{{ theater }}</span>
        </div>
      </div>
      <div class="event-bar" v-if="data === 'event'">
        <div v-for="event in events" :key="event">
          <span class="nav-bar-text">{{ event }}</span>
        </div>
      </div>
      <div class="gift-bar" v-if="data === 'gift'">
        <div v-for="gift in gifts" :key="gift">
          <span class="nav-bar-text">{{ gift }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NavBarComponent',
  props: { data: String },
  data () {
    return {
      movies: ['전체영화', 'N스크린', '큐레이션', '무비포스트'],
      reservations: ['빠른예매', '상영시간표', '더 부티크 프라이빗 예매'],
      theaters: ['전체극장', '특별관'],
      events: ['진행중 이벤트', '지난 이벤트', '당첨자발표'],
      gifts: ['메가박스 멤버십', '제휴/할인']
    }
  },
  methods: {
    handleProps () {
      this.$emit('deleteProps')
    },
    handleMovie (movie) {
      if (movie === '전체영화') {
        this.$router.push({ name: 'MovieList' })
      }
    }
  }
}
</script>
