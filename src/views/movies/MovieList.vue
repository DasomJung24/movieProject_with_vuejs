<template>
  <div>
    <h1 style="font-weight: 500">전체영화</h1>
    <ul class="movie-tab">
      <li class="active">박스오피스</li>
      <li>상영예정작</li>
      <li>특별상영</li>
      <li>필름소사이어티</li>
      <li>클래식소사이어티</li>
    </ul>
    <div class="tab-search">
      <div style="padding: 5px;">
        <label class="switch">
          <input type="checkbox" />
          <span class="slider round"></span>
        </label>
        <span style="margin-right: 20px;">개봉작만</span>
        <span
          ><span style="font-weight: bold;">{{ total }}</span>개의 영화가
          검색되었습니다.</span
        >
      </div>
      <div style="position: relative;">
        <input
          class="title-search"
          placeholder="영화명 검색"
        /><font-awesome-icon
          style="position: absolute; top: 10; right: 10;"
          icon="search"
          size="1x"
          color="grey"
        />
      </div>
    </div>
    <div style="margin-bottom: 80px;">
      <MovieList :movies="movies"/>
      <button v-if="page" @click="moreMovie" class="more-btn">더보기 <font-awesome-icon icon="chevron-down" size="1x" color="gray" /></button>
    </div>
  </div>
</template>
<script>
import MovieList from '@/components/cards/MovieListCard.vue'
export default {
  data () {
    return {
      page: 1,
      perPage: 20,
      total: 0,
      movies: []
    }
  },
  components: {
    MovieList
  },
  created () {
    this.getList()
  },
  // watch: {
  //   '$route.query' (query) {
  //     this.page = parseInt(query.page) || 1
  //     this.perPage = parseInt(query.per_page) || 10
  //     this.getList()
  //   }
  // },
  methods: {
    async getList () {
      const params = {
        page: this.page,
        per_page: this.perPage
      }
      const { data } = await this.axios.get('movies', { params })
      this.total = data.count
      this.movies.push.apply(this.movies, data.results)
      this.page = data.next
    },
    moreMovie () {
      this.getList()
    }
  }
}
</script>
