<template>
  <div class="column=detail-page w-75 mx-auto">
    <div class="column-info row bm-4 pb-4 align-items-center" v-if="column">
      <div class="col-3 text-center">
        <img
          :src="column.avatar && (column.avatar.url || column.avatar.tacitlyUrl)"
          :alt="column.title"
          class="rounded-circle border w-100"
        />
      </div>
      <div class="col-9">
        <h4>{{ column.title }}</h4>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>
    <PostList :list="list"></PostList>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { addColumnAvatar } from "../hooks/Hleper";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import PostList from "../components/PostList.vue";
import { GlobalDataProps, ColumnProps } from "../store";
export default defineComponent({
  name: "ColumnDetail",
  components: {
    PostList,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const route = useRoute();
    const currenID = route.params.id;
    onMounted(() => {
      store.dispatch("fetchColumn", currenID);
      store.dispatch("fetchPosts", currenID);
    });
    const column = computed(() => {
      const selectColumn = store.getters.getColumnsById(currenID) as| ColumnProps;
      if (selectColumn) {
        addColumnAvatar(selectColumn, 100, 100);
      }
      return selectColumn;
    });
    const list = computed(() => store.getters.getList(currenID));
    return {
      column,
      list,
    };
  },
});
</script>

<style scoped>
</style>