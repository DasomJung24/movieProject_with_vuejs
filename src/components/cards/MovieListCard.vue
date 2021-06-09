<template>
  <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 60px 60px;">
    <div v-for="(item, index) in data" :key="item.id">
      <div style="position: relative;">
        <img :src="item.img" width="230px">
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
          <span style="font-size: 20px; margin-left: 10px;">{{ item.title }}</span>
        </div>
      </div>
      <div style="display: flex; margin-top: 5px;">
        <span style="padding-right: 5px;">예매율 {{ item.ticketing_rate }}%</span>
        <div style="height: 13px; border-right: 1px solid #ddd; margin-top: 2px;"></div>
        <span style="padding-left: 5px;">개봉일 {{ item.opening_date | toKstDate }}</span>
      </div>
      <div style="display: flex; margin-top: 7px; height: 35px;">
        <button class="movie-like-btn"><font-awesome-icon
            :icon="['far', 'heart']"
            size="lg"
            color="grey"
        /><span class="heart purple">{{ item.like_count }}</span></button>
          <button class="movie-reserve-btn">예매</button>
          <button class="movie-dolby-btn"><img src="@/assets/dolby-btn.png"></button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: [
        {
          id: 1,
          img: "https://img.megabox.co.kr/SharedImg/2021/05/12/J7vthd2FWEXswHD67dL2rQrMW4uhJQUF_420.jpg",
          title: '크루엘라',
          audience_rating: '12세관람가',
          ticketing_rate: '15.2',
          like_count: 30,
          opening_date: '2021-05-26'
        },
        {
          id: 2,
          img: "https://img.megabox.co.kr/SharedImg/2021/05/12/J7vthd2FWEXswHD67dL2rQrMW4uhJQUF_420.jpg",
          title: '크루엘라',
          audience_rating: '15세관람가',
          ticketing_rate: '15.2',
          like_count: 30,
          opening_date: '2021-05-26'
        },
        {
          id: 3,
          img: "https://img.megabox.co.kr/SharedImg/2021/05/12/J7vthd2FWEXswHD67dL2rQrMW4uhJQUF_420.jpg",
          title: '크루엘라',
          audience_rating: '전체관람가',
          ticketing_rate: '15.2',
          like_count: 30,
          opening_date: '2021-05-26'
        },
        {
          id: 4,
          img: "https://img.megabox.co.kr/SharedImg/2021/05/12/J7vthd2FWEXswHD67dL2rQrMW4uhJQUF_420.jpg",
          title: '크루엘라',
          audience_rating: '청소년관람불가',
          ticketing_rate: '15.2',
          like_count: 30,
          opening_date: '2021-05-26'
        },
        {
          id: 5,
          img: "https://img.megabox.co.kr/SharedImg/2021/05/12/J7vthd2FWEXswHD67dL2rQrMW4uhJQUF_420.jpg",
          title: '크루엘라',
          audience_rating: '12세관람가',
          ticketing_rate: '15.2',
          like_count: 30,
          opening_date: '2021-05-26'
        },
        {
          id: 6,
          img: "https://img.megabox.co.kr/SharedImg/2021/05/12/J7vthd2FWEXswHD67dL2rQrMW4uhJQUF_420.jpg",
          title: '크루엘라',
          audience_rating: '12세관람가',
          ticketing_rate: '15.2',
          like_count: 30,
          opening_date: '2021-05-26'
        }
      ]
    }
  },
  methods: {
  }
}
</script>