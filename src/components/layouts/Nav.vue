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
                :class="$route.name === 'MainList' ? 'nav-text-main' : 'nav-text'"
                @click="$router.push({ name: 'MovieList' })"
                @mouseover="setProps('movie')"
              >영화</span
            >
            <span
                :class="$route.name === 'MainList' ? 'nav-text-main' : 'nav-text'"
                @mouseover="setProps('reservation')"
            >예매</span>
            <span
                :class="$route.name === 'MainList' ? 'nav-text-main' : 'nav-text'"
                @mouseover="setProps('theater')"
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
            <span @click="isModalVisible = true" v-if="!isAuthenticated">로그인</span>
            <span @click="$router.push({name: 'Register'})" v-if="!isAuthenticated">회원가입</span>
            <span @click="logout" v-else>로그아웃</span>
            <span v-if="isAuthenticated">알림</span>
            <span>빠른예매</span>
          </div>
        </div>
        <div
          class="space-between gnb"
          v-bind:class="{ white: this.$route.name === 'MainList' }"
        >
          <div class="space-between">
            <span
                :class="$route.name === 'MainList' ? 'nav-text-main' : 'nav-text'"
                @mouseover="setProps('event')"
            >이벤트</span>
            <span :class="$route.name === 'MainList' ? 'nav-text-main' : 'nav-text'"
            >스토어</span>
            <span
                :class="$route.name === 'MainList' ? 'nav-text-main' : 'nav-text'"
                @mouseover="setProps('gift')"
            >혜택</span>
          </div>
          <div style="margin-left: 50px;">
            <font-awesome-icon class="nav-icon" icon="calendar-alt" size="lg" />
            <font-awesome-icon icon="user" size="lg" />
          </div>
        </div>
      </div>
    </div>
    <NavBarComponent :data="props" @deleteProps="props = null" />
    <LoginModal
      v-if="isModalVisible"
      @close="isModalVisible = false">
    </LoginModal>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters(['isAuthenticated', 'currentUser'])
  },
  methods: {
    setProps (val) {
      this.props = val
    },
    logout () {
      this.$store
        .dispatch('LOGOUT')
        .then(() => this.$router.go(this.$router.currentRoute))
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
