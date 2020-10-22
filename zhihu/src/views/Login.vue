<template>
  <div class="login-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">登录到知乎</h5>
    <ValidateForm @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <ValidateInputs
          :rules="emailRules"
          v-model="inputRef"
          placeholder="请输入邮箱地址"
          type="text"
          ref="validateEmailRef"
        ></ValidateInputs>
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <ValidatePassword
          :rules="passRules"
          v-model="passwordRef1"
          placeholder="请输入密码"
          type="password"
          ref="validatePasswordRef"
        ></ValidatePassword>
      </div>
      <template v-slot:submit>
        <span class="btn btn-danger">提交Submit</span>
      </template>
    </ValidateForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import { useRouter } from "vue-router";
import ValidateForm from "../components/ValidateForm.vue";
import ValidateInputs, { RulesProp } from "../components/ValidateInput.vue";
import ValidatePassword, {
  RulesPropType,
} from "../components/ValidatePassword.vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "../store";
interface PayloadProps {
  email: Ref<any>;
  password: Ref<any>;
}
export default defineComponent({
  name: "login",
  components: {
    ValidateForm,
    ValidateInputs,
    ValidatePassword,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const inputRef = ref();
    const passwordRef1 = ref();
    const router = useRouter();
    const onFormSubmit = (val: boolean) => {
      if (val) {
        const payload: PayloadProps = {
          email: inputRef.value,
          password: passwordRef1.value,
        };
        store
          .dispatch("loginAndFetchCurrentUser", payload)
          .then((res) => {
            router.push({
              name: "home",
            });
          })
          .catch((e) => {
            console.log(e);
          });
      }
    };
    const emailRules: RulesProp = [
      {
        type: "required",
        message: "电子邮箱地址不能为空",
      },
      {
        type: "email",
        message: "请输入正确的电子邮箱格式",
      },
    ];

    const passRules: RulesPropType = [
      {
        type: "required",
        message: "密码不能为空",
      },
      {
        type: "password",
        message: "密码格式不对",
      },
    ];

    const validateEmailRef = ref<any>();
    const validatePasswordRef = ref<any>();

    return {
      inputRef,
      passwordRef1,
      onFormSubmit,
      emailRules,
      passRules,
      validateEmailRef,
      validatePasswordRef,
    };
  },
});
</script>

<style scoped>
</style>