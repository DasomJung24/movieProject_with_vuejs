<template>
  <div style="background-color: #F5F5F5;">
    <div style="width: 55%; text-align: center; margin: 0 auto; background-color: #fff;">
      <div style="padding: 70px;">
        <img src="@/assets/mega-logo.png" />
        <div style="text-align: left; margin-top: 50px; border-top: 1px solid #ddd; padding-top:40px; padding-bottom: 20px;">
          <span>회원정보를 입력해주세요.</span>
        </div>
        <div class="register-form">
          <div>
            <div class="label">이메일 주소</div>
            <div>
              <input class="register-input" placeholder="이메일주소를 입력해 주세요." v-model="form.email" />
            </div>
            <button class="email-btn" @click="confirmEmail">중복확인</button>
          </div>
          <div>
            <div class="label">이름</div>
            <div><input class="register-input" placeholder="이름을 입력해 주세요." v-model="form.name"/></div>
          </div>
          <div>
            <div class="label">휴대폰 번호</div>
            <div><input class="register-input" placeholder="휴대폰번호를 입력해 주세요.( '-' 없이 )" v-model="form.phone_number"/></div>
          </div>
          <div>
            <div class="label">생년월일</div>
            <div><input class="register-input" placeholder="생년월일을 입력해 주세요.( 예: 1990-12-01 )" v-model="form.birth"/></div>
          </div>
          <div>
            <div class="label">비밀번호</div>
            <div><input class="register-input" placeholder="영문,숫자,특수기호 중 2가지 이상 조합" v-model="form.password"/></div>
          </div>
          <div>
            <div class="label">비밀번호 확인</div>
            <div><input class="register-input" placeholder="영문,숫자,특수기호 중 2가지 이상 조합" /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        email: '',
        name: '',
        phone_number: '',
        birth: '',
        password: ''
      }
    }
  },
  methods: {
    async confirmEmail () {
      const params = {
        email: this.form.email
      }
      const { data } = await this.axios.post('confirm-email', { params })
      console.log(data)
    }
  }
}
</script>
