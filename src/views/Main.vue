<template>
  <div>
    <div class="box">
      <div>
        <span style="border-bottom: 2px solid #595959; padding-bottom: 5px; font-size: 16px;"
          >박스오피스</span
        >
      </div>
      <div class="more-movie" @click="$router.push({ name: 'MovieList' })"><span>더 많은 영화보기</span> +</div>
    </div>
    <MainMovie :movies="movies"/>
    <div class="bottom-bar">
      <div>
        <input
          class="movie-input"
          placeholder="영화명을 입력해주세요"
        /><font-awesome-icon icon="search" size="lg" color="grey" />
      </div>
      <div>
        <font-awesome-icon
          :icon="['far', 'calendar-alt']"
          size="lg"
          color="grey"
        /><span style="color: #fff; margin-left: 10px;">상영시간표</span>
      </div>
      <div>
        <font-awesome-icon icon="film" size="lg" color="grey" />
        <span style="color: #fff; margin-left: 10px;">박스오피스</span>
      </div>
      <div>
        <font-awesome-icon icon="ticket-alt" size="lg" color="grey" />
        <span style="color: #fff; margin-left: 10px;">빠른예매</span>
      </div>
    </div>
  </div>
</template>
<script>
import MainMovie from '@/components/cards/MainCard.vue'
export default {
  data () {
    return {
      movies: []
    }
  },
  created () {
    this.getMovies()
  },
  components: {
    MainMovie
  },
  methods: {
    async getMovies () {
      const params = { main: true }
      const { data } = await this.axios.get('movies', { params })
      this.movies = data.results
    }
  }
}
</script>
