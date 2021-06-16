<template>
  <div style="background-color: #F5F5F5;">
    <div style="width: 710px; text-align: center; margin: 0 auto; background-color: #fff;">
      <div style="padding: 70px;">
        <img src="@/assets/mega-logo.png" />
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
                <input type="radio" value="true" v-model="form.is_unmanned_ticket" style="margin-right: 3px;">
                <label for="true" style="margin-right: 10px;">사용</label>
                <input type="radio" value="false" v-model="form.is_unmanned_ticket" style="margin-right: 3px;">
                <label for="false" style="margin-right: 10px;">사용안함</label>
                </div>
                  <p style="font-size: 14px; margin-top: 10px;">'생년월일 + 휴대폰번호' 로 티켓출력</p>
              </div>
            </div>
            <div>
              <div class="label">나만의 메가박스</div>
              <div style="width: calc(100% - 180px); display: flex; align-items: center;">
                <span>자주 방문하는 메가박스를 등록해주세요!</span>
                <button class="my-megabox-btn" @click="isModalVisible = true">설정</button>
              </div>
            </div>
          </div>
        </ValidationObserver>
      </div>
    </div>
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
            <button class="theater-btn">등록</button>
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
        is_unmanned_ticket: true
      },
      isModalVisible: false,
      modalContent: '',
      passwordConfirm: '',
      emailConfirm: false,
      cityList: {},
      theaterList: [],
      citySelected: '서울',
      theaterSelected: '',
      selectedTheaters: [{ id: 1, value: '+' }, { id: 2, value: '+' }, { id: 3, value: '+' }]
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
    }
  }
}
</script>
