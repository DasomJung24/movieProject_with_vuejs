<template>
  <div>
    <FixBreadcrumb v-if="scroll >= 90" :data="breadcrumb" />
    <div v-if="scroll >= 190" class="movie-fixed-menu">
      <ul>
        <li @click="setActive('box_office')" :class="{active: isActive('box_office')}">박스오피스</li>
        <li @click="setActive('not_open')" :class="{active: isActive('not_open')}">상영예정작</li>
        <li @click="setActive('special')" :class="{active: isActive('special')}">특별상영</li>
        <li @click="setActive('film')" :class="{active: isActive('film')}">필름소사이어티</li>
        <li @click="setActive('classic')" :class="{active: isActive('classic')}">클래식소사이어티</li>
      </ul>
    </div>
    <Breadcrumb :data="breadcrumb" />
    <div class="main-container">
      <h1 style="font-weight: 500">전체영화</h1>
      <ul class="movie-tab">
        <li @click="setActive('box_office')" :class="{active: isActive('box_office')}">박스오피스</li>
        <li @click="setActive('not_open')" :class="{active: isActive('not_open')}">상영예정작</li>
        <li @click="setActive('special')" :class="{active: isActive('special')}">특별상영</li>
        <li @click="setActive('film')" :class="{active: isActive('film')}">필름소사이어티</li>
        <li @click="setActive('classic')" :class="{active: isActive('classic')}">클래식소사이어티</li>
        <li v-if="isAuthenticated" @click="setActive('favorite')" :class="{active: isActive('favorite')}">
          <span style="font-weight: bold; color: #339eb2;">{{ currentUser.name }}</span>님 선호 장르 영화
        </li>
      </ul>
      <div class="tab-search">
        <div style="padding: 5px;">
          <label class="switch" v-if="activeItem !== 'not_open'">
            <input type="checkbox" @click="changeIsOpen" />
            <span class="slider round"></span>
          </label>
          <span
              @click="setOrder('date')"
              :class="{order: isOrder('date')}"
              v-if="activeItem === 'not_open'"
              style="padding-right: 10px; border-right: 1px solid #ddd; cursor: pointer;"
          >개봉일순</span>
          <span
              @click="setOrder('string')"
              :class="{order: isOrder('string')}"
              v-if="activeItem === 'not_open'"
              style="padding-left: 10px; margin-right: 30px; cursor: pointer;"
          >가나다순</span>
          <span v-if="activeItem !== 'not_open'" style="margin-right: 20px;">개봉작만</span>
          <span
            ><span style="font-weight: bold;">{{ total }}</span>개의 영화가
            검색되었습니다.</span
          >
        </div>
        <div style="position: relative;">
          <input
            class="title-search"
            placeholder="영화명 검색"
            v-model="title"
            v-on:keyup.enter="searchTitle"
          /><font-awesome-icon
            style="position: absolute; top: 10; right: 10; cursor: pointer;"
            icon="search"
            size="1x"
            color="grey"
            @click="searchTitle"
          />
        </div>
      </div>
      <div style="margin-bottom: 80px;">
        <MovieList :movies="movies" @deleteLike="deleteLike" @clickLike="clickLike" />
        <button v-if="nextPage" @click="moreMovie" class="more-btn">더보기 <font-awesome-icon icon="chevron-down" size="1x" color="gray" /></button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import MovieList from '@/components/cards/MovieListCard.vue'
import Breadcrumb from '../../components/Breadcrumb'
import FixBreadcrumb from '../../components/FixBreadcrumb'
export default {
  data () {
    return {
      page: 1,
      perPage: 20,
      total: 0,
      movies: [],
      title: '',
      isOpen: false,
      activeItem: 'box_office',
      nextPage: null,
      activeOrder: 'date',
      beforeResults: [],
      breadcrumb: ['영화', '전체영화'],
      scroll: ''
    }
  },
  components: {
    MovieList,
    Breadcrumb,
    FixBreadcrumb
  },
  created () {
    this.getList()
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },
  computed: {
    ...mapGetters(['currentUser', 'isAuthenticated'])
  },
  methods: {
    onScroll (e) {
      this.scroll = window.top.scrollY
    },
    async getList () {
      const params = {
        page: this.page,
        per_page: this.perPage,
        is_open: this.isOpen,
        active_type: this.activeItem
      }
      const { data } = await this.axios.get('movies', { params })
      this.total = data.count
      this.movies.push.apply(this.movies, data.results)
      this.nextPage = data.next
    },
    moreMovie () {
      this.page += 1
      this.getList()
    },
    async searchTitle () {
      const params = {
        page: this.page,
        per_page: this.perPage,
        title: this.title
      }
      const { data } = await this.axios.get('movies', { params })
      this.total = data.count
      this.movies = data.results
    },
    async changeIsOpen () {
      const params = {
        page: this.page,
        per_page: this.perPage
      }
      this.isOpen = !this.isOpen
      params.is_open = this.isOpen
      const { data } = await this.axios.get('movies', { params })
      this.total = data.count
      this.movies = data.results
    },
    async setActive (val) {
      this.activeItem = val
      this.page = 1
      const params = {
        page: this.page,
        per_page: this.perPage,
        active_type: this.activeItem
      }
      const { data } = await this.axios.get('movies', { params })
      this.total = data.count
      this.movies = data.results
      this.nextPage = data.next
    },
    isActive (val) {
      return this.activeItem === val
    },
    async setOrder (val) {
      this.activeOrder = val
      this.page = 1
      const params = {
        page: this.page,
        per_page: this.perPage,
        active_type: this.activeItem,
        active_order: this.activeOrder
      }
      const { data } = await this.axios.get('movies', { params })
      this.total = data.count
      this.movies = data.results
      this.nextPage = data.next
    },
    isOrder (val) {
      return this.activeOrder === val
    },
    deleteLike (movieId) {
      this.movies = this.movies.map(
        i => i.id !== movieId ? i : { ...i, like_count: i.like_count - 1, user_like: false }
      )
    },
    clickLike (movieId) {
      this.movies = this.movies.map(
        i => i.id !== movieId ? i : { ...i, like_count: i.like_count + 1, user_like: true }
      )
    }
  }
}
</script>
