<template>
  <div>
    <div class="p-relative detail">
      <div class="detail-img-box">
      <img :src="backUrl" class="detail-img"/>
      </div>
      <FixBreadcrumb v-if="scroll >= 475" :data="breadcrumb" />
      <div v-if="scroll >= 475" class="detail-bread-crumb">
        <img :src="backUrl" width="100%" style="filter: brightness(30%); "/>
        <div class="detail-bread-crumb-content">
          <div>{{ movie.title }}</div>
          <div class="detail-bread-crumb-btn">
            <button>
              <font-awesome-icon :icon="['far', 'heart']" size="lg" color="#fff"/>
              {{ movie.like_count }}
            </button>
            <button>
              <font-awesome-icon icon="share-alt" size="lg" color="#aaa" />
            </button>
            <button>예매</button>
          </div>
        </div>
      </div>
      <div v-if="scroll >= 515" class="detail-bread-crumb-tab">
        <ul>
          <li @click="setActive('main-content')" :class="{active: isActive('main-content')}">주요정보</li>
          <li @click="setActive('realReview')" :class="{active: isActive('realReview')}">실관람평</li>
          <li @click="setActive('moviePost')" :class="{active: isActive('moviePost')}">무비포스트</li>
          <li @click="setActive('nextAndStill')" :class="{active: isActive('nextAndStill')}">예고편/스틸컷</li>
        </ul>
      </div>
      <div class="detail-box">
        <div class="detail-left-box">
          <div>
            <div class="detail-tag">
              <p v-for="tag in movie.tag" :key="tag">
                <span style="margin-right: 5px;">#{{ tag }}</span>
              </p>
            </div>
            <p class="white detail-title">{{ movie.title }}</p>
            <p class="white detail-e-title">{{ movie.english_title }}</p>
            <button class="detail-like">
              <font-awesome-icon :icon="['far', 'heart']" size="lg" color="#fff"/>
              <span style="margin-left: 5px;" class="white">{{ movie.like_count }}</span>
            </button>
            <button class="detail-share">
              <font-awesome-icon icon="share-alt" size="lg" color="#fff" />
              <span style="margin-left: 5px;" class="white">공유하기</span>
            </button>
          </div>
          <div class="detail-bottom-box">
            <div>
              <p class="bottom-text">실관람 평점</p>
              <p style="display: flex; align-items: center;">
                <font-awesome-icon icon="book-open" size="lg" color="#aaa" />
                <span class="detail-rate">9.4</span>
              </p>
            </div>
            <div>
              <p class="bottom-text">예매율</p>
              <div style="display: flex;">
                <p style="display: flex; align-items: center;">
                  <font-awesome-icon icon="ticket-alt" size="lg" color="#aaa" />
                </p>
                <p>
                  <span class="detail-ticket white">4</span>
                  <span class="bottom-text" style="margin-left: 5px;">위({{ movie.ticketing_rate }}%)</span>
                </p>
              </div>
            </div>
            <div>
              <p class="bottom-text">누적관객수</p>
              <div style="display: flex;">
                <p style="display: flex; align-items: center;">
                  <font-awesome-icon icon="users" size="lg" color="#aaa" />
                </p>
                <p>
                  <span class="detail-audience white">1,324,333</span>
                  <span class="bottom-text" style="margin-left: 5px;">명</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="p-relative">
          <div class="rating-img">
            <img v-if="movie.audience_rating === '전체관람가'" src="@/assets/green-rating.png" />
            <img v-else-if="movie.audience_rating === '12세이상관람가'" src="@/assets/blue-rating.png" />
            <img v-else-if="movie.audience_rating === '15세이상관람가'" src="@/assets/yellow-rating.png" />
            <img v-else src="@/assets/red-rating.png" />
          </div>
          <img :src="mainUrl" style="border-radius: 10px;" width="250" />
          <div class="detail-right-btn">
            <button>예매</button>
            <button><img src="@/assets/dolby-btn.png" /></button>
          </div>
        </div>
      </div>
      <div class="detail-middle">
        <div class="detail-middle-box">
          <ul class="movie-tab">
            <li @click="setActive('main-content')" :class="{active: isActive('main-content')}">주요정보</li>
            <li @click="setActive('realReview')" :class="{active: isActive('realReview')}">실관람평</li>
            <li @click="setActive('moviePost')" :class="{active: isActive('moviePost')}">무비포스트</li>
            <li @click="setActive('nextAndStill')" :class="{active: isActive('nextAndStill')}">예고편/스틸컷</li>
          </ul>
          <div class="main-detail">
            <p>{{ movie.mainContent }}</p>
            <div v-if="!isMore" @click="isMore = true">
              {{ movie.firstContent }}
              <br><br>
              <button class="detail-more">
                더보기
                <font-awesome-icon icon="chevron-down" color="#aaa" />
              </button>
            </div>
            <div v-for="(item, index) in movie.content" :key="item" v-else @click="isMore = false">
              {{ item }}
              <br><br>
              <button v-if="index === movie.content.length - 1" class="detail-more">
                닫기
                <font-awesome-icon icon="chevron-up" color="#aaa" />
              </button>
            </div>
          </div>
          <div>
            <p>
              상영타입:
              <span v-for="(item, index) in movie.type" :key="item">
                {{ item }}
                <span v-if="index !== movie.type.length - 1">,</span>
              </span>
            </p>
            <div class="mini-detail">
              <p>
                감독:
                <span v-for="(item, index) in movie.director" :key="item">
                  {{ item }}
                  <span v-if="index !== movie.director.length - 1">,</span>
                </span>
              </p>
              <p>
                장르:
                <span v-for="(item, index) in movie.genre" :key="item">
                  {{ item }}
                  <span v-if="index !== movie.genre.length - 1">,</span>
                </span>
                <span>/{{ movie.running_time }}분</span>
              </p>
              <p>
                <span>등급:{{ movie.audience_rating }}</span>
              </p>
              <p>
                <span>개봉일:{{ movie.opening_date | toKstDate }}</span>
              </p>
            </div>
            <p>
              출연진:
              <span v-for="(item, index) in movie.actor" :key="item">
                {{ item }}
                <span v-if="index !== movie.actor.length - 1">,</span>
              </span>
            </p>
          </div>
          <div class="detail-result-box">
            <div>
              <p>관람포인트</p>
              <p>배우/영상미</p>
            </div>
            <div>
              <p>실관람 평점</p>
              <p>9.4</p>
            </div>
            <div>
              <p>예매율</p>
              <p>{{ movie.ticketing_rate }}</p>
            </div>
            <div>
              <p>일자별관객수</p>
              <p>1,315,444</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FixBreadcrumb from '../../components/FixBreadcrumb'
export default {
  data () {
    return {
      id: this.$route.params.id || null,
      movie: {},
      backUrl: '',
      mainUrl: '',
      activeItem: 'main-content',
      isMore: false,
      scroll: '',
      breadcrumb: ['영화', '전체영화', '박스오피스']
    }
  },
  created () {
    this.getMovie()
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },
  components: {
    FixBreadcrumb
  },
  methods: {
    async getMovie () {
      const { data } = await this.axios.get(`movies/${this.id}`)
      this.movie = data
      this.backUrl = data.images.filter(i => i.type === 2).pop().url
      this.mainUrl = data.images.filter(i => i.type === 1).pop().url
      this.movie.content = data.content.split('\n')
      this.movie.mainContent = this.movie.content.shift()
      this.movie.firstContent = this.movie.content[0]
      console.log(this.movie)
    },
    setActive (val) {
      this.activeItem = val
    },
    isActive (val) {
      return this.activeItem === val
    },
    onScroll (e) {
      this.scroll = window.top.scrollY
      console.log(this.scroll)
    }
  }
}
</script>
