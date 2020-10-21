<template>
  <div class="loading-container">
    <div class="loading-content">
      <div class="spinner-border text-primary" role="status"></div>
      <span class="sr-only">加载中...</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Loading",
  props: {
    text: {
      type: String,
      defualt: "",
    },
    background: {
      type: String,
    },
  },
});
</script>

<style scoped>
.loading-container {
  background: rgba(255, 255, 255, 0.5);
  z-index: 999;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loading-content {
  text-align: center;
}
</style>

