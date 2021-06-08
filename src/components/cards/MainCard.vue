<template>
  <div class="space-between box-office">
    <div v-for="(item, index) in data" :key="item.id">
      <div style="position: relative;">
        <img :src="item.image" class="image" />
        <div class="img-num">
          <h1>{{ index + 1 }}</h1>
        </div>
      </div>
      <div class="button-flex">
        <button class="like-btn">
          <font-awesome-icon
            :icon="['far', 'heart']"
            size="lg"
            color="white"
          /><span class="white heart">{{ item.like }}</span>
        </button>
        <button class="reserve-btn">예매</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          id: 0,
          image:
            "https://img.megabox.co.kr/SharedImg/2021/05/10/n0XVEiJdSsiOSlJb8f9lmKSBWVDN6hJW_420.jpg",
          like: 339,
          detail:
            "기다림은 끝났다! 전 세계가 기다려온 단 하나의 액션블록버스터! 도미닉(빈 디젤)은 자신과 가장 가까웠던 형제 \
          제이콥(존 시나)이 사이퍼(샤를리즈 테론)와 연합해 전 세계를 위기로 빠트릴 위험천만한 계획을 세운다는 사실을 알게 되고, \
          이를 막기 위해 다시 한 번 패밀리들을 소환한다. 가장 가까운 자가 한순간, 가장 위험한 적이 된 상황 도미닉과 패밀리들은 \
          이에 반격할 놀라운 컴백과 작전을 세우고 지상도, 상공도, 국경도 경계가 없는 불가능한 대결이 시작되는데…",
        },
        {
          id: 1,
          image:
            "https://img.megabox.co.kr/SharedImg/2021/05/10/n0XVEiJdSsiOSlJb8f9lmKSBWVDN6hJW_420.jpg",
          like: 129,
          detail:
            "기다림은 끝났다! 전 세계가 기다려온 단 하나의 액션블록버스터! 도미닉(빈 디젤)은 자신과 가장 가까웠던 형제 \
          제이콥(존 시나)이 사이퍼(샤를리즈 테론)와 연합해 전 세계를 위기로 빠트릴 위험천만한 계획을 세운다는 사실을 알게 되고, \
          이를 막기 위해 다시 한 번 패밀리들을 소환한다. 가장 가까운 자가 한순간, 가장 위험한 적이 된 상황 도미닉과 패밀리들은 \
          이에 반격할 놀라운 컴백과 작전을 세우고 지상도, 상공도, 국경도 경계가 없는 불가능한 대결이 시작되는데…",
        },
        {
          id: 2,
          image:
            "https://img.megabox.co.kr/SharedImg/2021/05/10/n0XVEiJdSsiOSlJb8f9lmKSBWVDN6hJW_420.jpg",
          like: 118,
          detail:
            "기다림은 끝났다! 전 세계가 기다려온 단 하나의 액션블록버스터! 도미닉(빈 디젤)은 자신과 가장 가까웠던 형제 \
          제이콥(존 시나)이 사이퍼(샤를리즈 테론)와 연합해 전 세계를 위기로 빠트릴 위험천만한 계획을 세운다는 사실을 알게 되고, \
          이를 막기 위해 다시 한 번 패밀리들을 소환한다. 가장 가까운 자가 한순간, 가장 위험한 적이 된 상황 도미닉과 패밀리들은 \
          이에 반격할 놀라운 컴백과 작전을 세우고 지상도, 상공도, 국경도 경계가 없는 불가능한 대결이 시작되는데…",
        },
        {
          id: 3,
          image:
            "https://img.megabox.co.kr/SharedImg/2021/05/10/n0XVEiJdSsiOSlJb8f9lmKSBWVDN6hJW_420.jpg",
          like: 96,
          detail:
            "기다림은 끝났다! 전 세계가 기다려온 단 하나의 액션블록버스터! 도미닉(빈 디젤)은 자신과 가장 가까웠던 형제 \
          제이콥(존 시나)이 사이퍼(샤를리즈 테론)와 연합해 전 세계를 위기로 빠트릴 위험천만한 계획을 세운다는 사실을 알게 되고, \
          이를 막기 위해 다시 한 번 패밀리들을 소환한다. 가장 가까운 자가 한순간, 가장 위험한 적이 된 상황 도미닉과 패밀리들은 \
          이에 반격할 놀라운 컴백과 작전을 세우고 지상도, 상공도, 국경도 경계가 없는 불가능한 대결이 시작되는데…",
        },
      ],
    };
  },
  methods: {},
};
</script>
