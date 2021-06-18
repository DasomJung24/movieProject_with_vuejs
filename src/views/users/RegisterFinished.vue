<template>
  <div class="finished-div">
    <h1>회원가입을 축하드립니다!</h1>
    <div style="margin-top: 50px;">
      <button @click="$router.push({name: 'Main'})" class="to-main-btn">홈으로</button>
      <button class="to-login-btn" @click="isModalVisible = true">로그인</button>
    </div>
    <LoginModal
      v-if="isModalVisible"
      @close="isModalVisible = false" />
  </div>
</template>
<script>
import LoginModal from '../../components/common/LoginModal'
export default {
  data () {
    return {
      isModalVisible: false
    }
  },
  components: {
    LoginModal
  }
}
</script>
