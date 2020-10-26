<template>
  <div class="file-upload">
    <button class="btn btn-primary" @click.prevent="triggerUploader">
      <span v-if="fileStatus == 'loading'">正在上传...</span>
      <span v-else-if="fileStatus == 'success'">上传成功</span>
      <span v-else>点击上传</span>
    </button>
    <input
      type="file"
      class="file-input d-none"
      ref="fileInput"
      @change="onUploader"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
type UploaderStatus = "ready" | "loading" | "success" | "error";
export default defineComponent({
  name: "uploader",
  props: {
    action: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const fileInput = ref<null | HTMLInputElement>(null);
    const fileStatus = ref<UploaderStatus>("ready");
    const triggerUploader = () => {
      if (fileInput.value) {
        fileInput.value.click();
      }
    };
    const onUploader = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        fileStatus.value = "loading";
        const files = Array.from(target.files);
        const formData = new FormData();
        formData.append("file", files[0]);
        const res = axios.post(props.action, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        res
          .then((res) => {
            fileStatus.value = "success";
            console.log(res);
          })
          .catch((e) => {
            fileStatus.value = "error";
            console.log(e);
          })
          .finally(() => {
            if (fileInput.value) {
              const val = fileInput.value;
              val.value = "";
            }
          });
      }
    };
    return {
      onUploader,
      triggerUploader,
      fileInput,
      fileStatus,
    };
  },
});
</script>

<style scoped>
</style>