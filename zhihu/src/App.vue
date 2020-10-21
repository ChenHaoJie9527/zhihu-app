<template>
  <div class="container">
    <GlobalHearder :user="currentUser"></GlobalHearder>
    <router-view></router-view>
    <ColumnList :list="testData" v-if="false"></ColumnList>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2020 者也专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts">
import "bootstrap/dist/css/bootstrap.min.css";
import { computed, defineComponent, reactive, ref } from "vue";
import ColumnList, { ColumnProps } from "./components/ColumnList.vue";
import GlobalHearder, { UserProps } from "./components/GlobalHearder.vue";
import { useStore } from "vuex";
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
  validateInput(): boolean;
  updateValue(): void;
  rules: Array<RulesType>;
  modelValue: string;
  inputRef: any;
}
export default defineComponent({
  name: "App",
  components: {
    ColumnList,
    GlobalHearder,
  },
  setup() {
    const store = useStore();
    const currentUser = computed(() => {
      return store.state.user;
    });
    const emailRef = reactive<EmailProps>({
      val: "",
      message: "",
      error: false,
    });
    return {
      testData,
      currentUser,
      emailRef,
    };
  },
});
</script>

<style>
</style>
