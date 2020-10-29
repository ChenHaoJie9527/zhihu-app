<template>
  <teleport to="#message">
    <div
      class="alert message-info fixed-top w-50 mx-auto d-flex justify-content-between mt-2"
      :class="classObj"
      v-if="isShow"
    >
      <span>{{ message }}</span>
       <button type="button" class="btn-close" aria-label="Close" @click.prevent="hide"></button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import useDomCreate from "../hooks/useDomCreate";
export type MessageProps = "default" | "success" | "error";
export interface StyleProps {
  "alert-success": boolean;
  "alert-danger": boolean;
  "alert-default": boolean;
}
export default defineComponent({
  name: "Message",
  props: {
    message: String,
    type: {
      type: String as PropType<MessageProps>,
      defualt: "default",
    },
  },
  emits: ["close-message"],
  setup(props, context) {
    const node = document.createElement("div");
    useDomCreate(node);
    // class样式类
    const classObj: StyleProps = {
      "alert-success": props.type === "success",
      "alert-danger": props.type === "error",
      "alert-default": props.type === "default",
    };
    const isShow = ref(true);
    const hide = () => {
      isShow.value = false;
      context.emit("close-message", true);
    };
    return {
      isShow,
      classObj,
      hide,
    };
  },
});
</script>

<style scoped>

</style>