<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <validateForm @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题</label>
        <ValidateInput
          rows="10"
          placeholder="请输入文章标题"
          type="text"
          v-model="titleVal"
          :rules="titleRules"
        ></ValidateInput>
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情:</label>
        <ValidatePassword
          rows="10"
          tag="textarea"
          type="text"
          placeholder="请输入文章详情"
          v-model="contentVal"
          :rules="contentRules"
        ></ValidatePassword>
      </div>
      <template #submit>
        <button class="btn btn-primary btn-dark">创建</button>
      </template>
    </validateForm>
  </div>
</template>

<script lang="ts">
import validateForm from "../components/ValidateForm.vue";
import ValidateInput, { RulesProp } from "../components/ValidateInput.vue";
import ValidatePassword, {
  RulesPropType,
} from "../components/ValidatePassword.vue";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { PostProps, GlobalDataProps } from "../store";
export default defineComponent({
  name: "CreatePost",
  components: {
    validateForm,
    ValidateInput,
    ValidatePassword,
  },
  setup() {
    const titleVal = ref("");
    const contentVal = ref("");
    const router = useRouter();
    const store = useStore<GlobalDataProps>();
    const titleRules: RulesProp = [
      {
        type: "required",
        message: "文章不能为空",
      },
    ];
    const contentRules: RulesPropType = [
      {
        type: "password",
        message: "文章详情不能为空",
      },
    ];
    const onFormSubmit = (val: boolean) => {
      if (val) {
        const { columnId } = store.state.user;
        if (columnId) {
          const newPost: PostProps = {
            id: new Date().getTime(),
            title: titleVal.value,
            content: contentVal.value,
            columnId,
            createdAt: new Date().toLocaleString(),
          };
          store.commit("createPost", newPost);
          router.push({
            name: "column",
            params: {
              id: columnId
            }
          });
          // store.commit("login");
        }
      }
    };
    return {
      titleVal,
      contentVal,
      onFormSubmit,
      titleRules,
      contentRules,
    };
  },
});
</script>

<style>
</style>