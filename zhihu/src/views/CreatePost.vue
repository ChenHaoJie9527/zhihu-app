<template>
  <div class="create-post-page">
    <h3>新建文章</h3>
    <input type="file" name="file" @change.prevent="onChangeFile" />
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
        <button class="btn btn-primary btn-large">创建文章</button>
      </template>
    </ValidateForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ValidateForm from "../components/ValidateForm.vue";
import ValidateInput, { RulesProp } from "../components/ValidateInput.vue";
import { useRouter } from "vue-router";
import ValidatePassowrd, {
  RulesPropType,
} from "../components/ValidatePassword.vue";
import { useStore } from "vuex";
import { GlobalDataProps, PostProps } from "../store";
import axios from "axios";
export default defineComponent({
  name: "create",
  components: {
    ValidateForm,
    ValidateInput,
    ValidatePassowrd,
  },
  setup() {
    const titleVal = ref("");
    const contentVal = ref("");
    const store = useStore<GlobalDataProps>();
    const router = useRouter();
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
    const onFormSubmit = (val: boolean) => {
      if (val) {
        const { column } = store.state.user;
        if (column) {
          const newPost: PostProps = {
            _id: new Date().getTime(),
            title: titleVal.value,
            content: contentVal.value,
            column: "",
            createAt: new Date().toLocaleString(),
          };
          store.commit("createPost", newPost);
          router.push({
            name: "column",
            params: {
              id: column,
            },
          });
        }
      }
    };
    const onChangeFile = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const files = target.files;
      if (files) {
        const uploaderFiles = files[0];
        const formData = new FormData();
        formData.append(uploaderFiles.name, uploaderFiles);
        axios
          .post("/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log(res);
          });
      }
    };
    return {
      onFormSubmit,
      titleVal,
      contentVal,
      titleRules,
      contentRules,
      onChangeFile,
    };
  },
});
</script>

<style>
</style>