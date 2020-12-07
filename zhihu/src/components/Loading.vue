<template>
  <teleport to="#loading">
    <div class="loading-container" :style="{ backgroundColor: background }">
      <div class="loading-content">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="text-primary small">{{ text || "loading" }}...</p>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from "vue";
export default defineComponent({
  name: "Loading",
  props: {
    text: {
      type: String,
      defualt: "",
    },
    background: {
      type: String,
      defualt: "",
    },
  },
  setup(props) {
    const loadingNode = document.createElement("div");
    loadingNode.id = "loading";
    document.body.appendChild(loadingNode);
    onUnmounted(() => {
      document.body.removeChild(loadingNode);
    });
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

