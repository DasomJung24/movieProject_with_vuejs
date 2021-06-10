<template>
  <div v-bind:class="$route.name === 'MainList' ? 'main-nav' : 'nav'">
    <div class="nav-container space-between">
      <div class="flex">
        <div
          class="nav-top-l"
          v-bind:class="{ grey: this.$route.name === 'MainList' }"
        >
          <span>VIP LOUNGE</span>
          <span>멤버십</span>
          <span>고객센터</span>
        </div>
        <div
          class="space-between gnb"
          v-bind:class="{ white: this.$route.name === 'MainList' }"
        >
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
      <div class="nav-main" @click="$router.push({ name: 'Main' })">
        <img
          v-if="$route.name === 'MainList'"
          src="@/assets/logo-white_new.png"
        />
        <img v-else src="@/assets/mega-logo.png" />
      </div>
      <div class="flex">
        <div>
          <div
            class="nav-top-r"
            v-bind:class="{ grey: this.$route.name === 'MainList' }"
          >
            <span>로그인</span>
            <span>회원가입</span>
            <span>빠른예매</span>
          </div>
        </div>
        <div
          class="space-between gnb"
          v-bind:class="{ white: this.$route.name === 'MainList' }"
        >
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
  name: 'Nav',
  data () {
    return {}
  },
  methods: {}
}
</script>
