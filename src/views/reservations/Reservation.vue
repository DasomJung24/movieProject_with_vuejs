<template>
  <div>
    <FixBreadcrumb v-if="scroll >= 90" :data="breadcrumb" />
    <Breadcrumb :data="breadcrumb" />
    <div class="main-container">
      <h1 style="font-weight: 500">빠른예매</h1>
      <div class="reservation-box">
        <div class="re-calendar-bar">
          <HorizontalCalendar @movieListForDay="movieListForDay"/>
          <div>
            <font-awesome-icon icon="calendar-alt" size="lg" color="#666" class="re-font"/>
          </div>
        </div>
        <div class="re-bottom-box">
          <div>
            <p>영화</p>
            <ul class="re-movie-tab">
              <li @click="setActiveMovie('total')" :class="{active: isActiveMovie('total')}">전체</li>
              <li>큐레이션</li>
            </ul>
            <div class="re-movie">
              <div
                  v-for="movie in movieList"
                  :key="movie.id"
                  :class="[clickedMovie === movie.id ? 'click' : '', movie.isDay ? '' : 'opacity']"
                  @click="handleMovie(movie.id)"
              >
                <div>
                  <img v-if="movie.audience_rating === '전체관람가'" src="@/assets/green-rating.png" width="20" />
                  <img v-else-if="movie.audience_rating === '12세이상관람가'" src="@/assets/blue-rating.png" width="20" />
                  <img v-else-if="movie.audience_rating === '15세이상관람가'" src="@/assets/yellow-rating.png" width="20" />
                  <img v-else src="@/assets/red-rating.png" width="20" />
                  <p class="re-movie-title">{{ movie.title|movieTitleLength }}</p>
                </div>
                <font-awesome-icon v-if="!movie.user_like" :icon="['far', 'heart']" color="#ddd" size="sm"/>
                <font-awesome-icon v-else icon="heart" />
              </div>
            </div>
            <div v-if="!selectedMovie" class="re-movie-box">
              <div>
                <p>모든영화</p>
                <p>목록에서 영화를 선택하세요.</p>
              </div>
            </div>
            <div v-else class="select-movie-box">
              <div v-for="index in 3" :key="index" class="select-movies">
                <img v-if="selectedMovieList[index-1]" :src="handleSrc(index - 1)" width="60px" height="88px"/>
                <span v-else>+</span>
              </div>
            </div>
          </div>
          <div>
            <p>극장</p>
            <ul class="re-theater-tab">
              <li @click="setActiveTheater('total')" :class="{active: isActiveTheater('total')}">전체</li>
              <li>특별관</li>
            </ul>
            <div class="re-theater">
              <div>
                <p
                    v-for="(item, key) in theaterList"
                    :key="key"
                    :class="clickedKey === key ? 'back-grey' : ''"
                    @click="handleTheaters(key)"
                >{{ key }}({{ item.length }})</p>
              </div>
              <div v-if="theaters" >
                <p
                    v-for="item in theaters"
                    :key="item.id"
                    :class="clickedTheater === item.id ? 'click' : ''"
                    @click="handleTheater(item.id, item.name)"
                >{{ item.name }}</p>
              </div>
            </div>
            <div v-if="!selectedTheater" class="re-movie-box">
              <div>
                <p>전체극장</p>
                <p>목록에서 극장을 선택하세요.</p>
              </div>
            </div>
            <div v-else class="select-theater-box">
              <div
                  v-for="index in 3"
                  :key="index" class="select-theaters"
                  :class="selectedTheaterList[index - 1] ? 'background-eee' : ''"
              >
                <div v-if="selectedTheaterList[index - 1]" class="theater-x">x</div>
                <div v-if="selectedTheaterList[index - 1]">
                  {{ selectedTheaterList[index - 1] }}
                </div>
                <span v-else>+</span>
              </div>
            </div>
          </div>
          <div>
            <div class="re-time-line-title">
              <p>시간</p>
              <div>
                <font-awesome-icon :icon="['far', 'sun']" color="#FFD700" size="sm" />
                <span>조조</span>
                <font-awesome-icon icon="mug-hot" color="#8B4513" size="sm" />
                <span>브런치</span>
                <font-awesome-icon :icon="['far', 'moon']" color="#00BFFF" size="sm" />
                <span>심야</span>
              </div>
            </div>
            <div class="re-time-line">
              <font-awesome-icon icon="chevron-left" color="#aaa" />
              <ul class="re-time-tab">
                <li>00</li>
                <li>01</li>
                <li>02</li>
                <li>03</li>
                <li>04</li>
                <li>05</li>
                <li>06</li>
                <li>07</li>
                <li>08</li>
                <li>09</li>
              </ul>
              <font-awesome-icon icon="chevron-right" color="#aaa" />
            </div>
            <div class="re-time-line-box">
              <div>
                <font-awesome-icon icon="film" color="#aaa" size="3x"/>
                <p class="re-time-line-text">영화와 극장을 선택하시면</p>
                <p>상영시간표를 비교하여 볼 수 있습니다.</p>
              </div>
            </div>
          </div>
        </div>
        <div></div>
        <div></div>
      </div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>
<script>
import Breadcrumb from '../../components/Breadcrumb'
import FixBreadcrumb from '../../components/FixBreadcrumb'
import HorizontalCalendar from '../../components/HorizontalCalendar'
import moment from 'moment'
export default {
  components: {
    Breadcrumb,
    FixBreadcrumb,
    HorizontalCalendar
  },
  data () {
    return {
      breadcrumb: ['예매', '빠른예매'],
      scroll: '',
      dayList: { 0: '일', 1: '월', 2: '화', 3: '수', 4: '목', 5: '금', 6: '토' },
      setActiveMovieItem: 'total',
      setActiveTheaterItem: 'total',
      movieList: [],
      selectedMovie: false,
      theaterList: {},
      selectedTheater: false,
      theaters: [],
      clickedKey: '',
      clickedMovie: '',
      clickedTheater: '',
      selectedMovieList: [],
      selectedMovieIds: [],
      selectedTheaterList: [],
      selectedTheaterIds: [],
      reDay: '2021-07-02',
      moviesForDay: [],
      firstClick: false,
      selectedDate: ''
    }
  },
  created () {
    this.getMovieList()
    this.getTheaterList()
    this.getDay()
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll (e) {
      this.scroll = window.top.scrollY
    },
    getDay () {
      const day = moment().format('YYYY-MM-D')
      this.selectedDate = day
    },
    async getMovieList () {
      const params = {
        is_open: true,
        list: true
      }
      const { data } = await this.axios.get('movies', { params })
      this.movieList = data.map(i => ({ ...i, isDay: true }))
    },
    async getTheaterList () {
      const { data } = await this.axios.get('theaters')
      this.theaterList = data
    },
    async getDayMovieList (id) {
      const params = { date: this.reDay }
      const { data } = await this.axios.get('theaters/movies', { params })
      this.moviesForDay = data
      for (var i = 0; i < this.movieList.length; i++) {
        const movieId = this.movieList[i].id
        const isActive = this.moviesForDay.filter(i => i.movie_id === movieId)
        this.movieList[i].isDay = !!isActive.length
      }
      this.firstClick = true
      this.handleMovie(id)
    },
    setActiveMovie (val) {
      this.setActiveMovieItem = val
    },
    setActiveTheater (val) {
      this.setActiveTheaterItem = val
    },
    isActiveMovie (val) {
      return this.setActiveMovieItem === val
    },
    isActiveTheater (val) {
      return this.setActiveTheaterItem === val
    },
    handleTheaters (key) {
      this.theaters = this.theaterList[key]
      this.clickedKey = key
    },
    async handleMovie (id) {
      if (!this.firstClick) {
        this.getDayMovieList(id)
      } else {
        const movie = this.movieList.filter(i => i.id === id)
        if (!movie[0].isDay) {
          return alert('해당 날짜에 예매할 수 있는 영화가 아닙니다.')
        }
        this.selectedMovie = true
        this.clickedMovie = id
        const movieId = this.selectedMovieIds.filter(i => i === id)
        if (movieId.length) {
          alert('이미 선택한 영화입니다.')
        } else {
          this.selectedMovieIds.push(id)
          const imageList = this.movieList.filter(i => i.id === id)[0].images
          for (var j = 0; j < imageList.length; j++) {
            if (imageList[j].type === 1) {
              this.selectedMovieList.push(imageList[j].url)
            }
          }
          const params = {
            movie_ids: this.selectedMovieIds,
            date: this.selectedDate
          }
          const { data } = await this.axios.get('theaters/screenings', { params })
          console.log(data)
        }
      }
    },
    async handleTheater (id, name) {
      this.selectedTheater = true
      this.clickedTheater = id
      const TheaterId = this.selectedTheaterIds.filter(i => i === id)
      if (TheaterId.length) {
        alert('이미 선택한 극장입니다.')
      } else {
        this.selectedTheaterIds.push(id)
        this.selectedTheaterList.push(name)
        const params = {
          movie_ids: this.selectedMovieIds,
          theater_ids: this.selectedTheaterIds,
          date: '2021-07-01'
        }
        const { data } = await this.axios.get('theaters/screenings', { params })
        console.log(data)
      }
    },
    handleSrc (i) {
      return this.selectedMovieList[i]
    },
    async movieListForDay (dataOb) {
      console.log(dataOb)
      const movieList = dataOb.data
      this.selectedDate = dataOb.date
      if (this.selectedDate === this.getDay()) {
        this.getMovieList()
        return
      }
      this.movieList = []
      const { data } = await this.axios.get(`movies?is_open=${this.selectedDate}&list=true`)
      for (var i = 0; i < data.length; i++) {
        const movie = movieList.filter(p => p.movie_id === data[i].id)
        if (movie.length) {
          this.movieList.push(data[i])
        }
      }
      console.log(this.movieList)
      this.movieList = this.movieList.map(i => ({ ...i, isDay: true }))
    }
  }
}
</script>
