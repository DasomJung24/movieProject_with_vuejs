<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <span>로그인</span>
        <button
            type="button"
            class="btn-close"
            @click="close"
        >
          X
        </button>
      </header>
      <section class="modal-body">
        <div class="login-box-all">
          <div class="login-box">
            <input class="login-input" placeholder="이메일" v-model="credentials.email" />
            <input class="login-input" placeholder="비밀번호" v-model="credentials.password" />
            <div class="simple-login">
              <div>
                <input type="checkbox" style="margin-right: 5px;"><label class="save-email">아이디 저장</label>
              </div>
              <p>휴대폰 간편로그인<span class="advertise">광고</span></p>
            </div>
            <button
                @click="login"
                class="login-btn"
                :class="credentials.email && credentials.password ? 'login-btn-active' : 'login-btn-grey'"
            >로그인</button>
            <div class="login-bottom">
              <p>ID/PW 찾기</p>
              <p>회원가입</p>
              <p>비회원 예매확인</p>
            </div>
            <div class="login-social">
              <img src="https://www.megabox.co.kr/static/pc/images/member/ico-facebook.png">
              <img src="https://www.megabox.co.kr/static/pc/images/member/ico-naver.png">
              <img src="https://www.megabox.co.kr/static/pc/images/member/ico-kakao.png">
              <img src="https://www.megabox.co.kr/static/pc/images/member/ico-payco.png">
            </div>
          </div>
          <div>
            <img src="https://mlink-cdn.netinsight.co.kr/2021/06/10/00bec83b9a6cc5f596791c4ff455abb1.jpg">
          </div>
        </div>
      </section>
      <footer class="modal-footer">
        <slot name="footer">
        </slot>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Modal',
  data () {
    return {
      credentials: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    async login () {
      const { status } = await this.$store.dispatch('LOGIN', this.credentials)
      if (status === 200) {
        this.$router.go(this.$router.currentRoute)
      }
    }
  }
}
</script>
