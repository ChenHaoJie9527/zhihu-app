<template>
  <div class="container">
    <GlobalHearder :user="currentUser" @log-out="onCloseOut"></GlobalHearder>
    <Loading
      v-if="isLoading"
      text="拼命加载中"
      background="rgba(0,0,0,0.8)"
    ></Loading>
    <router-view></router-view>
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
import { computed, defineComponent, onMounted, watch } from "vue";
import GlobalHearder from "./components/GlobalHearder.vue";
import { useStore } from "vuex";
import { GlobalDataProps, UserProps } from "./store";
import Loading from "./components/Loading.vue";
import axios from "axios";
import CreateMessage from "./hooks/createMessage";
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
    GlobalHearder,
    Loading,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const currentUser = computed<UserProps>(() => store.state.user);
    const isLoading = computed(() => store.getters.getLoading());
    const token = computed(() => store.state.token);
    onMounted(() => {
      if (!store.state.user.isLogin && token.value) {
        axios.defaults.headers.common.Authorization = `Bearer ${token.value}`;
        store.dispatch("fetchCurrentUser");
      }
    });
    const error = computed(() => store.state.error);
    watch(error, () => {
      const { status, message } = error.value;
      if (status && message) {
        CreateMessage(message, "error");
      }
    });
    const onCloseOut = (val: boolean) => {
      store.state.user.isLogin = val;
      store.commit("logout");
    };
    return {
      currentUser,
      isLoading,
      error,
      onCloseOut,
    };
  },
});
</script>

<style>
</style>
