<template>
  <div class="container">
    <GlobalHearder :user="currentUser"></GlobalHearder>
    <ColumnList :list="testData" v-if="false"></ColumnList>
    <div class="mb-3" v-if="false">
      <label class="form-label">邮箱地址</label>
      <ValidateInputs
        :rules="emailRules"
        v-model="inputRef"
        placeholder="请输入邮箱地址"
        type="text"
      ></ValidateInputs>
    </div>
    <div class="mb-3" v-if="false">
      <label class="form-label">密码</label>
      <ValidatePassword
        :rules="passRules"
        v-model="passwordRef1"
        placeholder="请输入密码"
        type="password"
      ></ValidatePassword>
    </div>
    <ValidateForm @form-submit="onFormSubmit" v-if="true">
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
      <button type="submit" class="btn btn-primary" v-if="false">提交</button>
      <template v-slot:submit>
        <span class="btn btn-danger">提交Submit</span>
      </template>
    </ValidateForm>
  </div>
</template>

<script lang="ts">
import "bootstrap/dist/css/bootstrap.min.css";
import { defineComponent, reactive, ref } from "vue";
import ColumnList, { ColumnProps } from "./components/ColumnList.vue";
import GlobalHearder, { UserProps } from "./components/GlobalHearder.vue";
import ValidateInputs, { RulesProp } from "./components/ValidateInput.vue";
import ValidatePassword, {
  RulesPropType,
} from "./components/ValidatePassword.vue";
import ValidateForm from "./components/ValidateForm.vue";
const testData: ColumnProps[] = [
  {
    id: 1,
    title: "test1专栏",
    description: "这是的test1专栏，有一段非常有意思的简介，可以更新一下欧",
    avatar:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100",
  },
  {
    id: 2,
    title: "test2专栏",
    description: "这是的test2专栏，有一段非常有意思的简介，可以更新一下欧",
    avatar:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100",
  },
  {
    id: 3,
    title: "test3专栏",
    description: "这是的test3专栏，有一段非常有意思的简介，可以更新一下欧",
    avatar:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100",
  },
  {
    id: 4,
    title: "test4专栏",
    description: "这是的test4专栏，有一段非常有意思的简介，可以更新一下欧",
    // avatar:
    //   "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100",
  },
];

const currentUser: UserProps = {
  isLogin: true,
  name: "CHJ",
};
const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
interface EmailProps {
  val: string;
  message: string;
  error: boolean;
}
interface RulesType {
  type?: string;
  message?: string;
}
interface ValidateEmailType {
  validateInput?(): boolean;
  updateValue?(): void;
  rules?: Array<RulesType>;
  modelValue?: string;
  inputRef?: any;
}
export default defineComponent({
  name: "App",
  components: {
    ColumnList,
    GlobalHearder,
    ValidateInputs,
    ValidatePassword,
    ValidateForm,
  },
  setup() {
    const inputRef = ref();
    const passwordRef1 = ref();
    const validateEmailRef = ref<any>();
    const validatePasswordRef = ref<any>();
    const emailRef = reactive<EmailProps>({
      val: "",
      message: "",
      error: false,
    });
    const onFormSubmit = (val: boolean) => {
      console.log(val);
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

    const validateEmail = () => {
      if (emailRef.val.trim() === "") {
        emailRef.error = true;
        emailRef.message = "can not be empty";
      } else if (!emailReg.test(emailRef.val)) {
        emailRef.error = true;
        emailRef.message = "should be valid email";
      }
    };
    return {
      testData,
      currentUser,
      emailRef,
      emailRules,
      inputRef,
      validateEmail,
      passwordRef1,
      passRules,
      onFormSubmit,
      validateEmailRef,
      validatePasswordRef,
    };
  },
});
</script>

<style>
</style>
