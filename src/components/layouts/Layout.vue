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
