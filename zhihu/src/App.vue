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
import ColumnList from "./components/ColumnList.vue";
import GlobalHearder, { UserProps } from "./components/GlobalHearder.vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "./store";
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
    const emailRef = reactive<EmailProps>({
      val: "",
      message: "",
      error: false,
    });
    const store = useStore<GlobalDataProps>();
    const currentUser = computed(() => {
      return store.state.user;
    });
    const testData = store.state.columns;
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
