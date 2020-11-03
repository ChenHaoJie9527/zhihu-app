<template>
  <div class="create-post-page">
    <h3>{{isEdiMonted? '编辑文章' : '新建文章'}}</h3>
    <Uploader
      action="/upload"
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
      :beforeUpload="uploadCheck"
      @file-uploaded="handFileUpload"
      :uploader="currentUploadValue"
    >
      <template #loading>
        <div style="display: flex; flex-direction: column; align-items: center">
          <div class="spinner-border text-secondary" role="status"></div>
          <p class="sr-only">Loading...</p>
        </div>
      </template>
      <template #uploaded="dataProps">
        <img id="uploadedImg" :src="dataProps.uploadedData.data.url" alt="" />
      </template>
    </Uploader>

    <ValidateForm @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <ValidateInput
          placeholder="请输入文章标题"
          type="text"
          v-model="titleVal"
          :rules="titleRules"
        ></ValidateInput>
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <ValidatePassowrd
          type="text"
          tag="textarea"
          placeholder="请输入文章详情"
          v-model="contentVal"
          :rules="contentRules"
        ></ValidatePassowrd>
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">{{isEdiMonted ? '更新文章' : '发表文章'}}</button>
      </template>
    </ValidateForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import ValidateForm from "../components/ValidateForm.vue";
import ValidateInput, { RulesProp } from "../components/ValidateInput.vue";
import { beforUploadCheck } from "../hooks/Hleper";
import { useRouter, useRoute } from "vue-router";
import createMessage from "../hooks/createMessage";
import ValidatePassowrd, {
  RulesPropType,
} from "../components/ValidatePassword.vue";
import { useStore } from "vuex";
import {
  GlobalDataProps,
  PostProps,
  RespontenProps,
  AvatarType,
} from "../store";
import Uploader from "../components/Uploader.vue";
export default defineComponent({
  name: "create",
  components: {
    ValidateForm,
    ValidateInput,
    ValidatePassowrd,
    Uploader,
  },
  setup() {
    const titleVal = ref("");
    const contentVal = ref("");
    const store = useStore<GlobalDataProps>();
    const router = useRouter();
    const route = useRoute();
    const isEdiMonted = !!route.query.id; //将数值类型进行转译成布尔类型
    const titleRules: RulesProp = [
      {
        type: "required",
        message: "文章标题不能为空",
      },
    ];
    const contentRules: RulesPropType = [
      {
        type: "text",
        message: "文章详情不能为空",
      },
    ];
    let imageId = "";
    const handFileUpload = (rawData: RespontenProps<AvatarType>) => {
      if (rawData.data._id) {
        imageId = rawData.data._id;
      }
    };
    const currentUploadValue = ref();
    onMounted(() => {
      if (isEdiMonted) {
        store
          .dispatch("fetchPost", route.query.id)
          .then((rawData: RespontenProps<PostProps>) => {
            if (rawData.data.image) {
              currentUploadValue.value = { data: rawData.data.image };
            }
            if (typeof rawData.data.title !== "undefined") {
              titleVal.value = rawData.data.title;
            }
            if (typeof rawData.data.content !== "undefined") {
              contentVal.value = rawData.data.content;
            }
          });
      }
    });
    const onFormSubmit = (val: boolean) => {
      if (val) {
        const { column, _id } = store.state.user;
        if (column) {
          const newPost: PostProps = {
            title: titleVal.value,
            content: contentVal.value,
            column,
            author: _id,
          };
          if (imageId) {
            newPost.image = imageId;
          }
          const actionName = isEdiMonted ? "updatePost" : "createPost";
          const senData = isEdiMonted
            ? {
                id: route.query.id,
                payload: newPost,
              }
            : newPost;
          store.dispatch(actionName, senData).then(() => {
            createMessage("发表成功，2秒后跳转到文章详情", "success");
            setTimeout(() => {
              router.push({
                name: "column",
                params: {
                  id: column,
                },
              });
            });
          });
        }
      }
    };
    const uploadCheck = (file: File) => {
      const res = beforUploadCheck(file, {
        format: ["image/jpeg", "image/png", "image/gif"],
        size: 1,
      });
      const { passed, error } = res;
      if (error === "format") {
        console.log("format");
        createMessage("上传图片只能是JPG/PNG格式！", "error");
      }
      if (error === "size") {
        console.log("size");
        createMessage("上传图片大小不能超过1MB！", "error");
      }
      return passed;
    };
    return {
      onFormSubmit,
      titleVal,
      contentVal,
      titleRules,
      contentRules,
      uploadCheck,
      handFileUpload,
      isEdiMonted,
      currentUploadValue,
    };
  },
});
</script>

<style scoped>
#uploadedImg {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>