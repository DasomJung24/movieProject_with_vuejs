<template>
  <div class="space-between box-office">
    <div v-for="(item, index) in movies" :key="item.id">
      <div class="p-relative">
        <img :src="handleImageSrc(item)" class="image" />
        <div class="img-num">
          <h1>{{ index + 1 }}</h1>
        </div>
        <div class="img-cover">
          {{ item.content | contentLength }}
        </div>
      </div>
      <div class="button-flex">
        <button class="like-btn" @click="like(item.id, item.user_like)">
          <font-awesome-icon
            v-if="!item.user_like"
            :icon="['far', 'heart']"
            size="lg"
            color="white"
          />
          <font-awesome-icon v-else icon="heart" size="lg" color="#037b94" />
          <span class="white heart">{{ item.like_count }}</span>
        </button>
        <button class="reserve-btn">예매</button>
      </div>
    </div>
    <Modal
      v-show="isModalVisible"
      @close="closeModal"
    >
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
    ...mapGetters(['currentUser', 'isAuthenticated'])
  },
  components: {
    Modal
  },
  methods: {
    closeModal () {
      this.isModalVisible = false
    },
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
      return movie.images.filter(a => a.type === 1).pop().url
    }
  }
}
</script>
