<template>
  <div class="home-page text-center container">
    <section class="row py-1g-5">
      <div class="col-lg-6 col-md-8 mx-auto">
        <img src="../assets/callout.svg" alt="callout" class="w-50" />
        <h2 class="font-weight-light">随心写作，自由表达</h2>
        <p>
          <router-link to="/create" class="btn btn-primary my-2">开始写文章</router-link>
        </p>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <ColumnList :list="list"></ColumnList>
    <button
      class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25"
      @click.prevent="loadMorePage"
      v-if="!isLastPage"
    >
      加载更多
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import ColumnList from "../components/ColumnList.vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "../store";
// import CreateMessage from "../hooks/createMessage";
import { useLoadMore } from "../hooks/useLoadMore";
export default defineComponent({
  name: "home",
  components: {
    ColumnList,
  },

  setup() {
    const store = useStore<GlobalDataProps>();
    onMounted(() => {
      store.dispatch("fetchColumns", { pageSize: 3 });
    });
    const currentPage = computed(() => store.state.columns.currentPage);
    const list = computed(() => {
      return store.getters.getColumns;
    });
    const total = computed(() => {
      return store.state.columns.total;
    });
    const { loadMorePage, isLastPage } = useLoadMore("fetchColumns", total, {
      currentPage: currentPage.value ? currentPage.value + 1 : 2,
      pageSize: 3,
    });
    return {
      list,
      loadMorePage,
      isLastPage,
    };
  },
});
</script>

<style scoped>
</style>