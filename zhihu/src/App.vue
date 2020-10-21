<template>
  <div class="container">
    <GlobalHearder :user="currentUser"></GlobalHearder>
    <Loading v-if="isLoading"></Loading>
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
import { computed, defineComponent } from "vue";
import GlobalHearder from "./components/GlobalHearder.vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "./store";
import Loading from "./components/Loading.vue";
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
    Loading
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const currentUser = computed(() => store.state.user);
    const isLoading = computed(()=> store.getters.getLoading());
    return {
      currentUser,
      isLoading
    };
  },
});
</script>

<style>
</style>
