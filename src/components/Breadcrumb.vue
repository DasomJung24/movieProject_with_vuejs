<template>
  <div class="bread-crumb">
    <div>
      <font-awesome-icon icon="home" color="#aaa"/>
      <div v-for="item in data" :key="item" class="bread-crumb-text">
        <p>></p>
        <p style="color: #595959;">{{ item }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: { data: Array }
}
</script>
