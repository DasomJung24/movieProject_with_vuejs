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
            <span
                class="nav-text"
                @click="$router.push({ name: 'MovieList' })"
                @mouseover="setProps('movie')"
                @mouseout="props = null"
              >영화</span
            >
            <span
                class="nav-text"
                @mouseover="setProps('reservation')"
                @mouseout="props = null"
            >예매</span>
            <span
                class="nav-text"
                @mouseover="setProps('theater')"
                @mouseout="props = null"
            >극장</span>
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
            <span @click="isModalVisible = true">로그인</span>
            <span @click="$router.push({name: 'Register'})">회원가입</span>
            <span>빠른예매</span>
          </div>
        </div>
        <div
          class="space-between gnb"
          v-bind:class="{ white: this.$route.name === 'MainList' }"
        >
          <div class="space-between">
            <span
                class="nav-text"
                @mouseover="setProps('event')"
                @mouseout="props = null"
            >이벤트</span>
            <span class="nav-text">스토어</span>
            <span
                class="nav-text"
                @mouseover="setProps('gift')"
                @mouseout="props = null"
            >혜택</span>
          </div>
          <div style="margin-left: 50px;">
            <font-awesome-icon class="nav-icon" icon="calendar-alt" size="lg" />
            <font-awesome-icon icon="user" size="lg" />
          </div>
        </div>
      </div>
    </div>
    <NavBarComponent :data="props"/>
    <LoginModal
      v-if="isModalVisible"
      @close="isModalVisible = false">
    </LoginModal>
  </div>
</template>
<script>
import NavBarComponent from './NavBar.vue'
import LoginModal from '../common/LoginModal'
export default {
  name: 'Nav',
  components: {
    NavBarComponent,
    LoginModal
  },
  data () {
    return {
      props: '',
      isModalVisible: false
    }
  },
  methods: {
    setProps (val) {
      this.props = val
    }
  }
}
</script>
