<template>
  <div class="nav">
    <div class="nav-container space-between">
      <div class="flex">
        <div class="nav-top-l">
          <span>VIP LOUNGE</span>
          <span>멤버십</span>
          <span>고객센터</span>
        </div>
        <div class="space-between white gnb">
          <div style="margin-right: 50px;">
            <font-awesome-icon class="nav-icon" icon="bars" size="lg" />
            <font-awesome-icon icon="search" size="lg" />
          </div>
          <div class="space-between">
            <span class="nav-text" @click="$router.push({ name: 'MovieList' })"
              >영화</span
            >
            <span class="nav-text">예매</span>
            <span class="nav-text">극장</span>
          </div>
        </div>
      </div>
      <div class="nav-main">
        <img src="@/assets/logo-white_new.png" />
      </div>
      <div class="flex">
        <div>
          <div class="nav-top-r">
            <span>로그인</span>
            <span>회원가입</span>
            <span>빠른예매</span>
          </div>
        </div>
        <div class="space-between white gnb">
          <div class="space-between">
            <span class="nav-text">이벤트</span>
            <span class="nav-text">스토어</span>
            <span class="nav-text">혜택</span>
          </div>
          <div style="margin-left: 50px;">
            <font-awesome-icon class="nav-icon" icon="calendar-alt" size="lg" />
            <font-awesome-icon icon="user" size="lg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>
