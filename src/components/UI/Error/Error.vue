<template>
  <div class="error-container">
    <div class="error-message">
      {{ messageText }}
    </div>
    <div class="error-message">
      {{ errorDescription }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error',

  props: {
    messageText: {
      type: String,
      default: null
    },
    errorDescription: {
      type: Error,
      default: ''
    }
  }
}
</script>

<style scoped>
.error-container {
  width: 300px;
  height: 100px;
  text-align: center;
  border-radius: 35px;
  background: rgba(255, 0, 0, .5);
  position: absolute;
  top: 40%;
  left: 50%;
}

.error-message {
  position: relative;
  padding: 3px;
}
</style>
