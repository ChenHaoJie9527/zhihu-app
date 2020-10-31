<template>
  <teleport to="#modal">
    <div
      class="modal fade d-block"
      id="staticBackdrop"
      data-backdrop="static"
      data-keyboard="false"
      tabindex="-1"
      role="dialog"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
      v-if="visible"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">{{ title }}</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true" @click.prevent="onClose">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot>123123</slot>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click.prevent="onClose"
            >
              取消
            </button>
            <button type="button" class="btn btn-primary" @click.prevent="onConfirm">确定</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useDomCreate from "../hooks/useDomCreate";
export default defineComponent({
  name: "modal",
  props: {
    title: String,
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["modal-on-close", "modal-on-confirm"], //事件集合
  setup(props, context) {
    useDomCreate("modal");
    const onClose = () => {
        context.emit("modal-on-close");
    };
    const onConfirm = () => {
        context.emit("modal-on-confirm");
    };
    return {
      onClose,
      onConfirm,
    };
  },
});
</script>

<style>
</style>