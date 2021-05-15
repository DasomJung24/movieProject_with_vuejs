<template>
  <div>
    <div class="back-url"></div>
    <Nav />
  </div>
</template>
<script>
export default {
  name: "Layout",
  data() {
    return {};
  },
  components: {
    Nav: () => import("@/components/layouts/Nav.vue"),
  },
};
</script>
