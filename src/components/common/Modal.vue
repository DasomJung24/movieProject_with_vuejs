<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          알림
        </slot>
        <button
          type="button"
          class="btn-close"
          @click="close"
        >
          X
        </button>
      </header>
      <section class="modal-body">
        <slot name="body">
        </slot>
      </section>
      <footer class="modal-footer">
        <button
          type="button"
          class="btn-confirm"
          @click="close"
        >
          확인
        </button>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Modal',
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>
