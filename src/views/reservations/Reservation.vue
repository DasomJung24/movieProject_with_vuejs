<template>
  <div>
    <FixBreadcrumb v-if="scroll >= 90" :data="breadcrumb" />
    <Breadcrumb :data="breadcrumb" />
    <div class="main-container">
      <h1 style="font-weight: 500">빠른예매</h1>
      <div class="reservation-box">
        <div class="re-calendar-bar">
          <font-awesome-icon icon="chevron-left" color="#aaa" class="re-font"/>
          <ul class="re-calendar">
            <li v-for="i in 14" :key="i">{{ i }}</li>
          </ul>
          <font-awesome-icon icon="chevron-right" color="#aaa" class="re-font"/>
          <font-awesome-icon icon="calendar-alt" size="lg" color="#595959" class="re-font"/>
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
                  :class="clickedMovie === movie.id ? 'click' : ''"
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
export default {
  components: {
    Breadcrumb,
    FixBreadcrumb
  },
  data () {
    return {
      breadcrumb: ['예매', '빠른예매'],
      scroll: '',
      date: null,
      month: null,
      year: null,
      day: null,
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
      selectedTheaterIds: []
    }
  },
  created () {
    // this.getScreening()
    this.getMovieList()
    this.getTheaterList()
    this.getToday()
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
      console.log(this.scroll)
    },
    getToday () {
      var today = new Date()
      const i = today.getDay()
      this.day = this.dayList[i]
      this.date = today.getDate()
      if (this.date < 10) {
        this.date = '0' + this.date
      }
      this.month = today.getMonth() + 1
      if (this.month < 10) {
        this.month = '0' + this.month
      }
      this.year = today.getFullYear()
      today = this.year + '-' + this.month + '-' + this.date
      console.log(today)
    },
    // async getScreening () {
    //   const { data } = await this.axios.get('theaters/screenings')
    //   console.log(data)
    // },
    async getMovieList () {
      const { data } = await this.axios.get('movies?is_open=true&list=true')
      this.movieList = data
    },
    async getTheaterList () {
      const { data } = await this.axios.get('theaters')
      this.theaterList = data
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
    handleMovie (id) {
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
      }
    },
    handleTheater (id, name) {
      this.selectedTheater = true
      this.clickedTheater = id
      const TheaterId = this.selectedTheaterIds.filter(i => i === id)
      if (TheaterId.length) {
        alert('이미 선택한 극장입니다.')
      } else {
        this.selectedTheaterIds.push(id)
        this.selectedTheaterList.push(name)
      }
    },
    handleSrc (i) {
      return this.selectedMovieList[i]
    }
  }
}
</script>
