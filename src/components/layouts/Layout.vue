<template>
  <div>
    <div class="back-url">
      <div class="back-layer">
        <Nav />
        <div class="card-container">
          <div class="box">
            <p style="padding-bottom: 5px; ">박스오피스</p>
            <div class="more-movie">더 많은 영화보기 +</div>
          </div>
          <MainMovie />
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
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Layout",
  data() {
    return {};
  },
  components: {
    Nav: () => import("@/components/layouts/Nav.vue"),
    MainMovie: () => import("@/components/cards/MainCard.vue"),
  },
};
</script>
