<template>
  <div class="file-upload">
    <div class="file-upload-container" @click.prevent="triggerUploader">
      <slot v-if="fileStatus == 'loading'" name="loading">
        <button class="btn btn-primary" disabled>正在上传...</button>
      </slot>
      <slot
        v-else-if="fileStatus == 'success'"
        name="uploaded"
        :uploadedData="uploadedData"
      >
        <button class="btn btn-primary">上传成功</button>
      </slot>
      <slot v-else-if="fileStatus == 'none'">
        <button class=" d-none">点击上传</button>
      </slot>
      <slot v-else name="default">
        <button class="btn btn-primary">点击上传</button>
      </slot>
    </div>
    <slot name="repeatUpload" v-if="repeatUploadStatus == 'repeatUpload'">
      <button class="btn btn-primary" @click.prevent="triggerUploader">
        重新上传
      </button>
    </slot>
    <slot name="remove" v-if="removeUploaded == 'remove'">
      <button class="btn btn-dark" @click.prevent="onRemoveUploaded">点击删除</button>
    </slot>
    <input
      type="file"
      class="file-input d-none"
      ref="fileInput"
      @change="onUploader"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import axios from "axios";
type UploaderStatus = "ready" | "loading" | "success" | "error" | "repeatUpload" | "remove" | "none";
type ChangeFunc = (file: File) => boolean;
export default defineComponent({
  name: "uploader",
  props: {
    action: {
      type: String,
      required: true,
    },
    beforeUpload: {
      type: Function as PropType<ChangeFunc>,
    },
  },
  emits: ["file-uploaded", "file-uploader-error"],
  setup(props, context) {
    const uploadedData = ref();
    const fileInput = ref<null | HTMLInputElement>(null);
    const fileStatus = ref<UploaderStatus>("ready");
    const repeatUploadStatus = ref<UploaderStatus>();
    const removeUploaded = ref<UploaderStatus>();
    const triggerUploader = () => {
      if (fileInput.value) {
        fileInput.value.click();
      }
    };
    const onRemoveUploaded = ()=> {
      fileStatus.value = "none";
    }
    const onUploader = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        const files = Array.from(target.files);
        if (props.beforeUpload) {
          const reslut = props.beforeUpload(files[0]);
          if (!reslut) {
            return;
          }
        }
        fileStatus.value = "loading";
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
            repeatUploadStatus.value = "repeatUpload";
            removeUploaded.value = "remove";
            uploadedData.value = res.data;
            context.emit("file-uploaded", res.data);
          })
          .catch((e) => {
            fileStatus.value = "error";
            context.emit("file-uploader-error", { e });
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
      uploadedData,
      repeatUploadStatus,
      removeUploaded,
      onRemoveUploaded
    };
  },
});
</script>

<style scoped>
</style>