<template>
  <div class="container">
    <GlobalHearder :user="currentUser"></GlobalHearder>
    <ColumnList :list="testData" v-if="false"></ColumnList>
    <div class="mb-3">
      <label class="form-label">邮箱地址</label>
      <ValidateInput :rules="emailRules" v-model="inputRef"></ValidateInput>
      {{inputRef}}
    </div>
    <form action="" v-if="false">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email 地址</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model="emailRef.val"
          @blur="validateEmail"
        />
        <div id="emailHelp" class="form-text" v-if="emailRef.error">
          {{ emailRef.message }}
        </div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">密码</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import "bootstrap/dist/css/bootstrap.min.css";
import { defineComponent, reactive, ref } from "vue";
import ColumnList, { ColumnProps } from "./components/ColumnList.vue";
import GlobalHearder, { UserProps } from "./components/GlobalHearder.vue";
import ValidateInput, { RulesProp } from "./components/ValidateInput.vue";
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
export default defineComponent({
  name: "App",
  components: {
    ColumnList,
    GlobalHearder,
    ValidateInput
  },
  props: {},
  setup() {
    const inputRef = ref("123123");
    const emailRef = reactive<EmailProps>({
      val: "",
      message: "",
      error: false,
    });
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
      validateEmail,
      emailRules,
      inputRef
    };
  },
});
</script>

<style>
</style>
