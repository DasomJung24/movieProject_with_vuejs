<template>
  <div>
    <div style="text-align: left; margin-top: 50px; border-top: 1px solid #ddd; padding-top:40px; padding-bottom: 20px;">
      <span>회원정보를 입력해주세요.</span>
    </div>
    <ValidationObserver>
      <div class="register-form">
        <div>
          <div class="label">이메일 주소</div>
          <div>
            <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
              <input
                  class="register-input"
                  placeholder="이메일주소를 입력해 주세요."
                  v-model="form.email"
              />
              <p>{{ errors[0] }}</p>
            </ValidationProvider>
          </div>
          <button class="email-btn" @click="confirmEmail">중복확인</button>
        </div>
        <div>
          <div class="label">이름</div>
          <div>
            <ValidationProvider name="name" rules="required" v-slot="{ errors }">
              <input
                  class="register-input"
                  placeholder="이름을 입력해 주세요."
                  v-model="form.name"
              />
              <p>{{ errors[0] }}</p>
            </ValidationProvider>
          </div>
        </div>
        <div>
          <div class="label">휴대폰 번호</div>
          <div>
            <ValidationProvider name="phone_number" rules="required|min:10|max:11|integer" v-slot="{ errors }">
              <input
                  class="register-input"
                  placeholder="휴대폰번호를 입력해 주세요.( '-' 없이 )"
                  v-model="form.phone_number"
              />
              <p>{{ errors[0] }}</p>
            </ValidationProvider>
          </div>
        </div>
        <div>
          <div class="label">생년월일</div>
          <div>
              <input
                  type="date"
                  class="register-input"
                  v-model="form.birth"
              />
          </div>
        </div>
        <div>
          <div class="label">비밀번호</div>
          <div>
            <ValidationProvider name="password" rules="required|min:8|password_pattern" v-slot="{ errors }">
              <input
                  type="password"
                  class="register-input"
                  placeholder="영문,숫자 조합하여 8자리 이상 입력해주세요."
                  v-model="form.password"
              />
              <p>{{ errors[0] }}</p>
            </ValidationProvider>
          </div>
        </div>
        <div>
          <div class="label">비밀번호 확인</div>
          <div>
            <ValidationProvider name="confirm" rules="required|password:@password" v-slot="{ errors }">
              <input
                  type="password"
                  class="register-input"
                  placeholder="영문,숫자 조합하여 8자리 이상 입력해주세요."
                  v-model="passwordConfirm"
              />
              <p>{{ errors[0] }}</p>
            </ValidationProvider>
          </div>
        </div>
        <div>
          <div class="label">무인발권기 기능 설정</div>
          <div style="width: calc(100% - 180px); display: flex; flex-direction: column; justify-content: center;">
            <div>
            <input type="radio" :value="true" v-model="form.is_unmanned_ticket" style="margin-right: 3px;">
            <label for="true" style="margin-right: 10px;">사용</label>
            <input type="radio" :value="false" v-model="form.is_unmanned_ticket" style="margin-right: 3px;">
            <label for="false" style="margin-right: 10px;">사용안함</label>
            </div>
              <p style="font-size: 14px; margin-top: 10px;">'생년월일 + 휴대폰번호' 로 티켓출력</p>
          </div>
        </div>
        <div>
          <div class="label">나만의 메가박스</div>
          <div style="width: calc(100% - 180px); display: flex; align-items: center;">
            <span v-if="!isRegister">자주 방문하는 메가박스를 등록해주세요!</span>
            <span v-else v-for="(theater, index) in form.theaters" :key="theater.id">
              {{ theater.name }}
              <span v-if="index + 1 !== form.theaters.length">,</span>
            </span>
            <button class="my-megabox-btn" @click="isModalVisible = true">설정</button>
          </div>
        </div>
      </div>
    </ValidationObserver>
    <div style="border: 1px solid #eee; border-radius: 10px; margin-top: 40px; text-align: left; padding-bottom: 30px;">
      <div style="border-bottom: 1px solid #eee; font-size: 18px; padding: 15px 20px;">
        마케팅 활용을 위한 개인정보 수집 이용 안내(선택)
      </div>
      <div style="padding: 0 20px;">
        <p style="font-size: 15px; margin-top: 30px;">수집목적</p>
        <p style="font-size: 14px; margin-top: 10px; color: #666666;">고객맞춤형 상품 및 서비스 추천, 당사 신규 상품/서비스 안내 및 권유, 사은/할인 행사 등 각종 이벤트 정보 등의 안내 및 권유</p>
        <p style="font-size: 15px; margin-top: 30px;">수집항목</p>
        <p style="font-size: 14px; margin-top: 10px; color: #666666;">이메일, 휴대폰번호, 주소, 생년월일, 선호영화관, 문자/이메일/앱푸쉬 정보수신동의여부, 서비스 이용기록, 포인트 적립 및 사용정보, 접속로그</p>
        <p style="font-size: 15px; margin-top: 30px;">보유기간</p>
        <span style="font-size: 14px; margin-top: 10px; color: #666666;">회원 탈퇴 시 혹은 이용 목적 달성 시 까지</span>
        <div style="margin: 30px 0;" class="box-div">
          <input type="radio" :value="true" v-model="form.is_marketing" class="box-check">
          <label for="true" class="box-text">동의</label>
          <input type="radio" :value="false" v-model="form.is_marketing" class="box-check">
          <label for="false" class="box-text">미동의</label>
        </div>
        <p style="font-size: 15px; margin-top: 30px;">혜택 수신설정</p>
        <div style="margin: 10px 0;" class="box-div">
          <input type="checkbox" value="true" v-model="form.receive_settings.alarm"  class="box-check">
          <label for="alarm" class="box-text">알람</label>
          <input type="checkbox" value="true" v-model="form.receive_settings.sms" class="box-check">
          <label for="sms" class="box-text">SMS</label>
          <input type="checkbox" value="true" v-model="form.receive_settings.email" class="box-check">
          <label for="email" class="box-text">이메일</label>
        </div>
        <p style="font-size: 15px; margin-top: 20px;">이벤트, 신규 서비스, 할인 혜택 등의 소식을 전해 드립니다.</p>
        <p style="font-size: 15px;">(소멸포인트 및 공지성 안내 또는 거래정보와 관련된 내용은 수신 동의 여부와 상관없이 발송됩니다.)</p>
      </div>
    </div>
    <button @click="submitRegister" class="user-register-btn">회원가입</button>
    <div>
      <Modal
        v-show="isModalVisible"
        @close="closeModal"
      >
        <template v-slot:header>
          <span v-if="!emailConfirm">선호극장 관리</span>
        </template>
        <template v-slot:body>
          <div v-if="emailConfirm">
            <span>{{ modalContent }}</span>
          </div>
          <div v-else>
            <div class="select-modal">
              <select v-model="citySelected" @change="cityChanged" name="cities" class="select-box">
                <option v-for="(item, key) in cityList" :key="key">{{ key }}</option>
              </select>
              <select name="theaters" v-if="theaterList" v-model="theaterSelected" class="select-box">
                <option v-for="theater in theaterList" :key="theater.id">{{ theater.name }}</option>
              </select>
              <button @click="addTheater" class="add-btn">추가</button>
            </div>
            <div style="display: flex; justify-content: center; margin-top: 20px; margin-bottom: 30px;">
              <div
                  v-for="theater in selectedTheaters"
                  :key="theater.id"
                  class="add-div"
                  :class="theater.value !== '+' ? 'add-div-2' : ''"
              >{{ theater.value }}
                <div v-if="theater.value !== '+'" class="theater-delete" @click="deleteTheater(theater.value)">x</div>
              </div>
            </div>
          </div>
        </template>
        <template v-slot:footer>
          <div v-if="!emailConfirm">
            <button @click="theaterCancel" class="theater-cancel">취소</button>
            <button @click="submitTheaters" class="theater-btn">등록</button>
          </div>
          <div v-else>
            <button type="button" class="btn-confirm" @click="closeModal">확인</button>
          </div>
        </template>
      </Modal>
    </div>
  </div>
</template>
<script>
import Modal from '@/components/common/Modal.vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
  data () {
    return {
      form: {
        email: '',
        name: '',
        phone_number: '',
        birth: '',
        password: '',
        is_unmanned_ticket: true,
        is_marketing: false,
        receive_settings: { alarm: false, sms: false, email: false },
        theaters: []
      },
      isModalVisible: false,
      modalContent: '',
      passwordConfirm: '',
      emailConfirm: false,
      cityList: {},
      theaterList: [],
      citySelected: '서울',
      theaterSelected: '',
      selectedTheaters: [{ id: 1, value: '+' }, { id: 2, value: '+' }, { id: 3, value: '+' }],
      isRegister: false
    }
  },
  created () {
    this.getTheaterList()
  },
  components: {
    Modal,
    ValidationObserver,
    ValidationProvider
  },
  methods: {
    async confirmEmail () {
      const { data } = await this.axios.post('confirm-email', { email: this.form.email })
      if (data.email) {
        this.modalContent = '이미 사용중인 이메일입니다.'
      } else {
        this.modalContent = '사용가능한 이메일입니다.'
      }
      this.isModalVisible = true
      this.emailConfirm = true
    },
    closeModal () {
      this.isModalVisible = false
      this.emailConfirm = false
    },
    async getTheaterList () {
      const { data } = await this.axios.get('theaters')
      this.cityList = data
      this.theaterList = data['서울']
      this.emailConfirm = false
    },
    cityChanged () {
      this.theaterList = this.cityList[this.citySelected]
    },
    addTheater () {
      for (var i = 0; i < this.selectedTheaters.length; i++) {
        if (this.selectedTheaters[i].value === '+') {
          this.selectedTheaters[i].value = this.theaterSelected
          break
        }
      }
      const a = this.theaterList.filter(i => i.name === this.theaterSelected)
      this.form.theaters.push.apply(this.form.theaters, a)
    },
    deleteTheater (value) {
      this.selectedTheaters = this.selectedTheaters.map(
        i => i.value === value ? { ...i, value: '+' } : i
      )
    },
    theaterCancel () {
      this.isModalVisible = false
      this.selectedTheaters = this.selectedTheaters.map(
        i => i.value !== '+' ? { ...i, value: '+' } : i
      )
      this.citySelected = '서울'
      this.theaterSelected = ''
      this.theaterList = this.cityList['서울']
      this.form.theaters = []
    },
    submitTheaters () {
      this.isRegister = true
      this.isModalVisible = false
    },
    submitRegister () {
      // const { status } = await this.axios.post('signup', this.form)
      // if (status === 201) {
      //   this.$router.push({ name: 'RegisterFinished' })
      // }
      this.$router.push({ name: 'RegisterFinished' })
    }
  }
}
</script>
