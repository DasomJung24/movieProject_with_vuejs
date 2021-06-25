<template>
  <div class="fix-bread-crumb">
    <div>
      <font-awesome-icon icon="home" color="#aaa"/>
      <div v-for="item in data" :key="item" class="fix-bread-crumb-text">
        <p>></p>
        <p style="color: #fff;">{{ item }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: { data: Array }
}
</script>
