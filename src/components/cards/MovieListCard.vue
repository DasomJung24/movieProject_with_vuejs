<template>
  <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 60px 60px;">
    <div v-for="(item, index) in movies" :key="item.id">
      <div style="position: relative;">
        <img :src="handleImageSrc(item)" width="230px">
        <div class="img-num">
          <h1>{{ index + 1 }}</h1>
        </div>
      </div>
      <div style="display: flex; margin-top: 15px;">
        <div>
          <img v-if="item.audience_rating === '청소년관람불가'" src="@/assets/red-rating.png">
          <img v-else-if="item.audience_rating === '12세관람가'" src="@/assets/blue-rating.png">
          <img v-else-if="item.audience_rating === '15세관람가'" src="@/assets/yellow-rating.png">
          <img v-else src="@/assets/green-rating.png">
        </div>
        <div>
          <span style="font-size: 20px; margin-left: 10px;">{{ item.title | titleLength }}</span>
        </div>
      </div>
      <div style="display: flex; margin-top: 5px;">
        <span style="padding-right: 5px;">예매율 {{ item.ticketing_rate }}%</span>
        <div style="height: 13px; border-right: 1px solid #ddd; margin-top: 2px;"></div>
        <span style="padding-left: 5px;">개봉일 {{ item.opening_date | toKstDate }}</span>
      </div>
      <div style="display: flex; margin-top: 7px; height: 35px;">
        <button @click="like(item.id, item.user_like)" class="movie-like-btn">
          <font-awesome-icon
            v-if="!item.user_like"
            :icon="['far', 'heart']"
            size="lg"
            color="grey"
        />
          <font-awesome-icon v-else icon="heart" size="lg" color="#037b94" />
          <span class="heart purple">{{ item.like_count }}</span></button>
          <button class="movie-reserve-btn">예매</button>
          <button class="movie-dolby-btn"><img src="@/assets/dolby-btn.png"></button>
      </div>
    </div>
    <Modal
      v-show="isModalVisible"
      @close="closeModal">
      <template v-slot:body>
        로그인 후 이용가능한 서비스입니다.
      </template>
      <template v-slot:footer>
        <button @click="isModalVisible = false" class="theater-btn">확인</button>
      </template>
    </Modal>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Modal from '@/components/common/Modal.vue'
export default {
  props: { movies: Array },
  data () {
    return {
      isModalVisible: false
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  components: {
    Modal
  },
  methods: {
    async like (movieId, userLike) {
      if (!this.isAuthenticated) {
        this.isModalVisible = true
        return
      }

      if (userLike) {
        const { status } = await this.axios.delete(`movies/${movieId}/likes`)
        if (status === 204) {
          this.$emit('deleteLike', movieId)
        }
      } else {
        const { status } = await this.axios.post(`movies/${movieId}/likes`)
        if (status === 201) {
          this.$emit('clickLike', movieId)
        }
      }
    },
    handleImageSrc (movie) {
      return movie.images.filter(i => i.type === 1).pop().url
    },
    closeModal () {
      this.isModalVisible = false
    }
  }
}
</script>
