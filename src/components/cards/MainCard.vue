<template>
  <div class="space-between box-office">
    <div v-for="(item, index) in movies" :key="item.id">
      <div class="img-card">
        <img :src="item.image" class="image" />
        <div class="img-num">
          <h1>{{ index + 1 }}</h1>
        </div>
        <div class="img-cover">
          {{ item.content | contentLength }}
        </div>
      </div>
      <div class="button-flex">
        <button class="like-btn">
          <font-awesome-icon
            :icon="['far', 'heart']"
            size="lg"
            color="white"
          /><span class="white heart">{{ item.like_count }}</span>
        </button>
        <button class="reserve-btn">예매</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: { movies: Array },
  data () {
    return {}
  },
  methods: {}
}
</script>
