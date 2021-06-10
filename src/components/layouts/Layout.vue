<template>
  <div>
    <div v-bind:class="{ backUrl: this.$route.name === 'MainList' }">
      <div v-bind:class="{ backLayer: this.$route.name === 'MainList' }">
        <Nav />
        <div class="main-container">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Layout',
  data () {
    return {}
  },
  components: {
    Nav: () => import('@/components/layouts/Nav.vue')
  }
}
</script>
