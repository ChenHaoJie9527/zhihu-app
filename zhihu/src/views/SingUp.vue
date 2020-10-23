<template>
  <div class="signup-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">注册知乎账号</h5>
    <ValidateForm @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <ValidateInput
          :rules="emailRules"
          v-model="formData.email"
        ></ValidateInput>
      </div>
      <div class="mb-3">
        <label class="form-label">昵称</label>
        <ValidateNickName
          :rules="nameRules"
          v-model="formData.nickName"
        ></ValidateNickName>
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <ValidatePassword
          :rules="passwordRules"
          v-model="formData.password"
        ></ValidatePassword>
      </div>
      <div class="mb-3">
        <label class="form-label">重复密码</label>
        <ValidatePassword
          :rules="repeatPasswordRules"
          v-model="formData.repeatPassword"
        ></ValidatePassword>
      </div>
      <template #submit>
        <button
          type="submit"
          class="btn btn-primary btn-block btn-large"
        >注册</button>
      </template>
    </ValidateForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import ValidateInput, { RulesProp } from "../components/ValidateInput.vue";
import ValidatePassword, {
  RulesPropType,
} from "../components/ValidatePassword.vue";
import ValidateForm from "../components/ValidateForm.vue";
import ValidateNickName, {
  RulesProps,
} from "../components/ValidateNickname.vue";
import axios from "axios";
import { useRouter } from "vue-router";
import CreateMessage from "../hooks/createMessage";
interface FormDataProps {
  email: string;
  nickName: string;
  password: string;
  repeatPassword: string;
}
interface PayloadProps {
  email: string;
  nickName: string;
  password: string;
}
export default defineComponent({
  name: "SingUp",
  components: {
    ValidateInput,
    ValidatePassword,
    ValidateForm,
    ValidateNickName,
  },
  setup() {
    const router = useRouter();
    const formData = reactive<FormDataProps>({
      email: "",
      nickName: "",
      password: "",
      repeatPassword: "",
    });
    const emailRules: RulesProp = [
      {
        type: "required",
        message: "电子邮箱不能为空",
      },
      {
        type: "email",
        message: "请输入正确的电子邮箱格式",
      },
    ];
    const nameRules: RulesProps = [
      {
        type: "required",
        message: "昵称不能为空",
      },
    ];
    const passwordRules: RulesPropType = [
      {
        type: "required",
        message: "密码不能为空",
      },
    ];
    const repeatPasswordRules: RulesPropType = [
      {
        type: "required",
        message: "重复密码不能为空",
      },
      {
        type: "custom",
        validator: () => {
          return formData.password === formData.repeatPassword;
        },
        message: "密码不相同",
      },
    ];

    const onFormSubmit = (val: boolean) => {
      console.log(val);
      if (val) {
        const payload: PayloadProps = {
          email: formData.email,
          password: formData.password,
          nickName: formData.nickName,
        };
        axios
          .post("/user/", payload)
          .then((res) => {
            CreateMessage("注册成功，正在跳转登录页面", "success");
            setTimeout(() => {
              router.push({
                name: "login",
              });
            });
          })
          .catch((e) => {
            console.log(e);
          });
      }
      return;
    };
    return {
      onFormSubmit,
      formData,
      emailRules,
      nameRules,
      passwordRules,
      repeatPasswordRules,
    };
  },
});
</script>

<style scoped>
</style>